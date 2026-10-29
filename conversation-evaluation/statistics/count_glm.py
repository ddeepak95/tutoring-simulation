"""Offline count-regression pilot; never calls an LLM or writes to Supabase."""
import argparse
import hashlib
import itertools
import json
import platform
import warnings
from pathlib import Path

import numpy as np
import pandas as pd
import scipy
from scipy.stats import norm
import statsmodels
import statsmodels.api as sm

FEATURES = ["questions", "examples", "social_cues"]


def validate_snapshot(snapshot):
    if snapshot.get("format_version") != "count-glm-input/1":
        raise ValueError("Unsupported input format")
    rows = snapshot["rows"]
    if not rows:
        raise ValueError("No conversations supplied")
    ids = [r["conversation_id"] for r in rows]
    if len(ids) != len(set(ids)):
        raise ValueError("Duplicate conversation; repeated evaluations are not observations")
    features = [f["key"] for f in snapshot["features"]]
    for r in rows:
        if not r.get("baseline_id") or r.get("prompt_version") != snapshot["prompt_version"] or r.get("rubric_hash") != snapshot["rubric_hash"] or r.get("evaluator") != snapshot["evaluator"]:
            raise ValueError("Missing or incompatible evaluation")
        if set(r["counts"]) != set(features) or any(type(v) is not int or v < 0 for v in r["counts"].values()):
            raise ValueError("Missing or invalid feature counts")
        if r["model"] not in ["gpt", "deepseek"] or r["language"] not in ["en", "ta"]:
            raise ValueError("Unknown model or language")
    topics = sorted({r["topic"] for r in rows})
    counts = pd.DataFrame(rows).groupby(["topic", "language", "model"]).size()
    expected = list(itertools.product(topics, ["en", "ta"], ["deepseek", "gpt"]))
    if not topics or any(counts.get(k, 0) != 5 for k in expected):
        raise ValueError("Expected five independent conversations in every topic/language/model cell")
    return pd.DataFrame([{**{k: v for k, v in r.items() if k != "counts"}, **r["counts"]} for r in rows]), topics


def design(data, topics):
    x = pd.DataFrame({"intercept": np.ones(len(data)), "english": (data.language == "en").astype(float), "gpt": (data.model == "gpt").astype(float)})
    x["english_gpt"] = x.english * x.gpt
    for topic in topics[1:]:
        x["topic:" + topic] = (data.topic == topic).astype(float)
    return x


def contrast(beta, covariance, weights):
    weights = np.asarray(weights, dtype=float)
    estimate = float(weights @ beta)
    variance = float(weights @ covariance @ weights)
    if variance <= 0 or not np.isfinite(variance):
        raise ValueError("Contrast variance unavailable")
    se = np.sqrt(variance)
    return {"log_ratio": estimate, "se": float(se), "ratio": float(np.exp(estimate)), "ci_low": float(np.exp(estimate - 1.95996398454 * se)), "ci_high": float(np.exp(estimate + 1.95996398454 * se)), "p_unadjusted": float(2 * norm.sf(abs(estimate / se)))}


def fit_feature(data, x, topics, feature):
    y = data[feature].to_numpy(dtype=float)
    if y.sum() == 0 or len(np.unique(y)) < 2:
        return {"feature": feature, "status": "insufficient variation", "reason": "No variation in conversation counts."}, []
    zero_cells = [list(k) for k, g in data.groupby(["model", "language"]) if g[feature].sum() == 0]
    zero_topics = [str(k) for k, g in data.groupby("topic") if g[feature].sum() == 0]
    if zero_cells or zero_topics:
        return {"feature": feature, "status": "not estimable", "reason": "An all-zero model/language cell or topic puts the unpenalized full model on a boundary; no finite full-model Wald inference is reported.", "zero_count_cells": zero_cells, "zero_count_topics": zero_topics}, []
    contrasts = {
        "English/Tamil within DeepSeek": [0, 1, 0, 0],
        "English/Tamil within GPT": [0, 1, 0, 1],
        "GPT/DeepSeek within Tamil": [0, 0, 1, 0],
        "GPT/DeepSeek within English": [0, 0, 1, 1],
        "Interaction: GPT language ratio / DeepSeek language ratio": [0, 0, 0, 1],
    }
    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        poisson = sm.GLM(y, x, family=sm.families.Poisson()).fit(cov_type="HC0")
        if not poisson.converged or not np.isfinite(np.asarray(poisson.params)).all() or not np.isfinite(np.asarray(poisson.cov_params())).all():
            raise ValueError("Poisson fit or covariance is invalid")
        p = x.shape[1]
        models = {"poisson_HC0": {"aic": float(poisson.aic), "pearson_dispersion": float(poisson.pearson_chi2 / poisson.df_resid), "converged": bool(poisson.converged)}}
        beta = np.asarray(poisson.params)
        covariance = np.asarray(poisson.cov_params())
        primary, alpha = "poisson_HC0_fallback", 0.0
        try:
            nb = sm.NegativeBinomial(y, x, loglike_method="nb2").fit(method="bfgs", maxiter=2000, disp=False)
            nb_beta = np.asarray(nb.params)[:p]
            alpha_candidate = float(np.asarray(nb.params)[-1])
            converged = bool(nb.mle_retvals.get("converged", False))
            models["negative_binomial_NB2"] = {"aic": float(nb.aic), "alpha": alpha_candidate, "converged": converged, "valid": False}
            nb_covariance = np.asarray(nb.cov_params())[:p, :p]
            valid = converged and alpha_candidate > 1e-6 and np.isfinite(nb_beta).all() and np.isfinite(nb_covariance).all() and np.linalg.eigvalsh(nb_covariance).min() > 0
            models["negative_binomial_NB2"] = {"aic": float(nb.aic), "alpha": alpha_candidate, "converged": converged, "valid": bool(valid)}
            if valid:
                beta, covariance, alpha, primary = nb_beta, nb_covariance, alpha_candidate, "negative_binomial_NB2"
            else:
                models["negative_binomial_NB2"]["limitation"] = "Boundary dispersion, nonconvergence, or invalid coefficient covariance; use explicitly labeled Poisson HC0 fallback."
        except (ValueError, np.linalg.LinAlgError, FloatingPointError) as error:
            models.setdefault("negative_binomial_NB2", {"valid": False})["error"] = str(error)
        sensitivity = {label: contrast(np.asarray(poisson.params), np.asarray(poisson.cov_params()), weights + [0] * (p - 4)) for label, weights in contrasts.items()}
        effects = {label: contrast(beta, covariance, weights + [0] * (p - 4)) for label, weights in contrasts.items()}
        predictions = []
        for model, language in itertools.product(["deepseek", "gpt"], ["ta", "en"]):
            grid = pd.DataFrame({"topic": topics, "model": model, "language": language})
            gx = design(grid, topics).to_numpy()
            means = np.exp(gx @ beta)
            mean = float(means.mean())
            gradient = (gx * means[:, None]).sum(axis=0) / means.sum()
            se_log_mean = np.sqrt(float(gradient @ covariance @ gradient))
            predictions.append({"model": model, "language": language, "mean": mean, "ci_low": float(np.exp(np.log(mean) - 1.95996398454 * se_log_mean)), "ci_high": float(np.exp(np.log(mean) + 1.95996398454 * se_log_mean))})
        mu = np.exp(x.to_numpy() @ beta)
        variance = mu + alpha * mu**2
        residual = (y - mu) / np.sqrt(variance)
        expected_zero = np.exp(-mu) if alpha == 0 else (1 + alpha * mu)**(-1 / alpha)
        diagnostics = {"pearson_dispersion_primary": float(np.sum(residual**2) / (len(y) - p)), "observed_zero_fraction": float(np.mean(y == 0)), "expected_zero_fraction": float(expected_zero.mean()), "max_absolute_pearson_residual": float(np.abs(residual).max()), "zero_count_cells": [list(k) for k, g in data.groupby(["model", "language"]) if g[feature].sum() == 0]}
    residual_rows = [{"feature": feature, "conversation_id": r.conversation_id, "topic": r.topic, "model": r.model, "language": r.language, "observed": int(y[i]), "fitted": float(mu[i]), "pearson_residual": float(residual[i])} for i, r in data.iterrows()]
    return {"feature": feature, "status": "fitted", "family": primary, "models": models, "contrasts": effects, "poisson_HC0_sensitivity": sensitivity, "predicted_counts_equal_topic_weight": predictions, "diagnostics": diagnostics, "warnings": list(dict.fromkeys(str(w.message) for w in caught))}, residual_rows


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    selection = parser.add_mutually_exclusive_group()
    selection.add_argument("--features", nargs="+")
    selection.add_argument("--all-features", action="store_true")
    args = parser.parse_args()
    raw = args.input.read_bytes()
    snapshot = json.loads(raw)
    data, topics = validate_snapshot(snapshot)
    x = design(data, topics)
    if np.linalg.matrix_rank(x) != x.shape[1]:
        raise ValueError("Model design is rank deficient")
    features = [f["key"] for f in snapshot["features"]] if args.all_features else args.features or FEATURES
    unknown = set(features) - {f["key"] for f in snapshot["features"]}
    if unknown:
        raise ValueError(f"Unknown features: {unknown}")
    results, residuals = [], []
    for feature in features:
        try:
            result, rows = fit_feature(data, x, topics, feature)
            json.dumps(result, allow_nan=False)
        except (ValueError, np.linalg.LinAlgError, FloatingPointError, OverflowError) as error:
            result, rows = {"feature": feature, "status": "fit failed", "reason": str(error)}, []
        results.append(result)
        residuals.extend(rows)
    args.output.mkdir(parents=True, exist_ok=True)
    metadata = {k: v for k, v in snapshot.items() if k != "rows"}
    report = {"analysis_version": "fixed-topic-count-glm/1", "formula": "count ~ english * gpt + topic", "observations": len(data), "topics": topics, "design_columns": list(x.columns), "input_sha256": hashlib.sha256(raw).hexdigest(), "input_provenance": metadata, "versions": {"python": platform.python_version(), "statsmodels": statsmodels.__version__, "numpy": np.__version__, "pandas": pd.__version__, "scipy": scipy.__version__}, "inference": "Exploratory two-sided asymptotic Wald tests and 95% confidence intervals; unadjusted p-values. Raw conversation totals, no length offset. NB2 dispersion estimated by maximum likelihood; Poisson HC0 is a sensitivity analysis or explicitly flagged fallback. Topic is fixed, not random. Language/model effects assumed constant across selected topics apart from language-by-model interaction.", "results": results}
    (args.output / "results.json").write_text(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False), encoding="utf-8")
    data.to_csv(args.output / "counts.csv", index=False)
    pd.DataFrame(residuals).to_csv(args.output / "residuals.csv", index=False)
    effects = [{"feature": r["feature"], "family": r["family"], "contrast": name, **value} for r in results if r["status"] == "fitted" for name, value in r["contrasts"].items()]
    pd.DataFrame(effects).to_csv(args.output / "contrasts.csv", index=False)
    lines = ["# Count GLM analysis", "", f"{len(data)} conversations; {len(topics)} topics; {len(features)} features; five tries per model/language/topic cell.", "", "Model: `count ~ language * model + topic`, log link; topic fixed effects. NB2 is primary when valid, with Poisson HC0 sensitivity. No response-length offset. P-values are unadjusted, two-sided, asymptotic Wald values.", "", "Ratios above 1 indicate more occurrences in English than Tamil. Confidence intervals are model-based and conditional on these topics.", "", "All-zero cells or topics are flagged as not estimable for this full unpenalized model; no topics are silently dropped and no artificial pseudocounts are added.", "", "| Feature | Family | Model | English/Tamil ratio | 95% CI | p (unadjusted) |", "|---|---|---|---:|---|---:|"]
    for r in results:
        if r["status"] != "fitted":
            lines.append(f"| {r['feature']} | {r['status']} | — | — | — | — |")
            continue
        for model, label in [("DeepSeek", "English/Tamil within DeepSeek"), ("GPT Sol", "English/Tamil within GPT")]:
            e = r["contrasts"][label]
            lines.append(f"| {r['feature']} | {r['family']} | {model} | {e['ratio']:.3f} | {e['ci_low']:.3f}–{e['ci_high']:.3f} | {e['p_unadjusted']:.4g} |")
    lines.extend(["", "## Diagnostics and sensitivity", ""])
    for r in results:
        if r["status"] == "fitted":
            interaction = r["contrasts"]["Interaction: GPT language ratio / DeepSeek language ratio"]
            lines.extend([f"### {r['feature']}", "", f"Interaction ratio: {interaction['ratio']:.3f}; 95% CI {interaction['ci_low']:.3f}–{interaction['ci_high']:.3f}; p={interaction['p_unadjusted']:.4g}.", "", "```json", json.dumps({"models": r["models"], "diagnostics": r["diagnostics"], "warnings": r["warnings"]}, indent=2), "```", ""])
        else:
            lines.extend([f"### {r['feature']}", "", "```json", json.dumps(r, indent=2), "```", ""])
    lines.extend(["Predicted counts and robust Poisson sensitivity contrasts are in results.json. Conversation-level residuals are in residuals.csv. Inspect outliers, zero patterns, and sensitivity before substantive claims; this pilot does not validate evaluator accuracy or establish generalization to unobserved topics.", ""])
    (args.output / "report.md").write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"output": str(args.output), "observations": len(data), "features": [{"feature": r["feature"], "status": r["status"], "family": r.get("family")} for r in results]}))


if __name__ == "__main__":
    main()
