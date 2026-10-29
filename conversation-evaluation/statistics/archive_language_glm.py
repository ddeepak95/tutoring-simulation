"""Explore English/Tamil feature-count differences in a balanced archive snapshot.

One observation is one original conversation. This script is read-only with respect
to the archive and never calls a model or database.
"""
import argparse
import json
import math
import platform
from pathlib import Path

import numpy as np
import pandas as pd
import scipy
from scipy.stats import chi2, norm
import statsmodels
import statsmodels.api as sm

FOCUS_CATEGORIES = {"Explanatory & Pedagogical Devices", "Conversational & Tutoring Moves"}


def read_jsonl(file):
    with file.open(encoding="utf-8") as stream:
        for number, line in enumerate(stream, 1):
            if line.strip():
                try:
                    yield json.loads(line)
                except json.JSONDecodeError as error:
                    raise ValueError(f"{file}:{number}: {error}") from error


def load_snapshot(archive):
    index = list(read_jsonl(archive / "index.jsonl"))
    if len({item["id"] for item in index}) != len(index):
        raise ValueError("Duplicate conversation in archive index")
    chosen = {}
    for baseline in read_jsonl(archive / "database" / "llm_baselines.jsonl"):
        if baseline.get("prompt_version") != "instructional-section-items/19":
            continue
        old = chosen.get(baseline["conversation_id"])
        if old is None or baseline["created_at"] > old["created_at"]:
            chosen[baseline["conversation_id"]] = baseline
    if set(chosen) != {item["id"] for item in index}:
        raise ValueError("Every indexed conversation must have one current v19 evaluation")
    rubric_hashes = {baseline["rubric_hash"] for baseline in chosen.values()}
    prompt_hashes = {baseline["prompt_sha256"] for baseline in chosen.values()}
    evaluators = {baseline["model"] for baseline in chosen.values()}
    if len(rubric_hashes) != 1 or len(prompt_hashes) != 1 or evaluators != {"google/gemini-4-argon"}:
        raise ValueError("Mixed rubric, prompt, or evaluator versions")
    rubric_hash = next(iter(rubric_hashes))
    snapshots = [item["snapshot"] for item in read_jsonl(archive / "database" / "rubric_versions.jsonl") if item["hash"] == rubric_hash]
    if len(snapshots) != 1:
        raise ValueError("Current rubric snapshot unavailable or duplicated")
    features = [(item["key"], item["name"], item["category"]) for item in snapshots[0]["rubric"]]
    keys = {key for key, _, _ in features}
    if len(features) != 24 or len(keys) != 24:
        raise ValueError("Expected 24 distinct rubric features")
    rows = []
    for item in index:
        baseline = chosen[item["id"]]
        counts = dict.fromkeys(keys, 0)
        seen = set()
        for annotation in baseline["annotations"]:
            key = annotation["feature"]
            count = annotation["entry"]["count"]
            if key not in counts or type(count) is not int or count < 0:
                raise ValueError(f"Invalid annotation on {item['id']}: {key}")
            pair = (annotation["section_id"], key)
            if pair in seen:
                raise ValueError(f"Duplicate section/feature annotation on {item['id']}: {pair}")
            seen.add(pair)
            counts[key] += count
        rows.append({"conversation_id": item["id"], "topic": item["topic_id"], "model": item["model"],
                     "language": item["language"], "baseline_id": baseline["id"], **counts})
    data = pd.DataFrame(rows)
    cell_sizes = data.groupby(["topic", "model", "language"]).size()
    topics = sorted(data.topic.unique())
    models = sorted(data.model.unique())
    if sorted(data.language.unique()) != ["en", "ta"] or len(topics) != 35 or len(models) != 9 or len(cell_sizes) != 35 * 9 * 2 or not (cell_sizes == 5).all():
        raise ValueError("Archive is not a complete 35-topic, nine-model, two-language, five-try design")
    provenance = {"archive": str(archive), "conversations": len(data), "topics": topics, "models": models,
                  "rubric_hash": rubric_hash, "prompt_sha256": next(iter(prompt_hashes)),
                  "prompt_version": "instructional-section-items/19", "evaluator": next(iter(evaluators)),
                  "features": [{"key": key, "name": name, "category": category} for key, name, category in features]}
    return data, provenance


def make_design(data, models, topics):
    columns = {"intercept": np.ones(len(data)), "english": (data.language == "en").to_numpy(dtype=float)}
    for model in models[1:]:
        indicator = (data.model == model).to_numpy(dtype=float)
        columns[f"model:{model}"] = indicator
        columns[f"english:model:{model}"] = columns["english"] * indicator
    for topic in topics[1:]:
        columns[f"topic:{topic}"] = (data.topic == topic).to_numpy(dtype=float)
    return pd.DataFrame(columns, index=data.index)


def effect(beta, covariance, weights):
    estimate = float(weights @ beta)
    variance = float(weights @ covariance @ weights)
    if not np.isfinite(variance) or variance <= 0:
        return None
    se = math.sqrt(variance)
    return {"ratio": float(np.exp(estimate)), "ci_low": float(np.exp(estimate - 1.95996398454 * se)),
            "ci_high": float(np.exp(estimate + 1.95996398454 * se)),
            "p_unadjusted": float(2 * norm.sf(abs(estimate / se)))}


def fit_feature(data, feature, name, exposure=None):
    total = int(data[feature].sum())
    base = {"feature": feature, "name": name, "total_count": total,
            "english_mean": float(data.loc[data.language == "en", feature].mean()),
            "tamil_mean": float(data.loc[data.language == "ta", feature].mean())}
    if total == 0:
        return {**base, "status": "all zero"}, []
    cells = data.groupby(["model", "language"])[feature].sum()
    models = sorted(m for m in data.model.unique() if cells.loc[m, "en"] > 0 and cells.loc[m, "ta"] > 0)
    excluded = sorted(set(data.model.unique()) - set(models))
    if not models:
        return {**base, "status": "not estimable", "reason": "No model has nonzero counts in both languages", "excluded_models": excluded}, []
    subset = data[data.model.isin(models)].copy()
    topic_totals = subset.groupby("topic")[feature].sum()
    topics = sorted(topic_totals[topic_totals > 0].index)
    excluded_topics = sorted(set(data.topic.unique()) - set(topics))
    if len(topics) < 4:
        return {**base, "status": "not estimable", "reason": "Fewer than four topics contain the feature", "excluded_models": excluded, "excluded_topics": excluded_topics}, []
    subset = subset[subset.topic.isin(topics)]
    x = make_design(subset, models, topics)
    if np.linalg.matrix_rank(x) != x.shape[1]:
        return {**base, "status": "not estimable", "reason": "Rank deficient design", "excluded_models": excluded, "excluded_topics": excluded_topics}, []
    y = subset[feature].to_numpy(dtype=float)
    try:
        offset = np.log(subset[exposure].to_numpy(dtype=float)) if exposure else None
        fit = sm.GLM(y, x, family=sm.families.Poisson(), offset=offset).fit(
            maxiter=150, cov_type="cluster", cov_kwds={"groups": subset.topic, "use_correction": True})
        beta = np.asarray(fit.params, dtype=float)
        covariance = np.asarray(fit.cov_params(), dtype=float)
        if not fit.converged or not np.isfinite(beta).all() or not np.isfinite(covariance).all():
            raise ValueError("Nonconverged or nonfinite fit/covariance")
        effects = []
        unavailable_models = []
        weights = []
        for model in models:
            w = np.zeros(len(x.columns))
            w[x.columns.get_loc("english")] = 1
            if model != models[0]:
                w[x.columns.get_loc(f"english:model:{model}")] = 1
            weights.append(w)
            contrast = effect(beta, covariance, w)
            if contrast is None:
                unavailable_models.append(model)
                continue
            effects.append({"feature": feature, "model": model, "english_mean": float(data.loc[(data.model == model) & (data.language == "en"), feature].mean()),
                            "tamil_mean": float(data.loc[(data.model == model) & (data.language == "ta"), feature].mean()), **contrast})
        pooled = effect(beta, covariance, np.mean(weights, axis=0))
        if not effects:
            raise ValueError("No model has a valid contrast variance")
        interaction = None
        if len(models) > 1:
            positions = [x.columns.get_loc(f"english:model:{model}") for model in models[1:]]
            vector = beta[positions]
            block = covariance[np.ix_(positions, positions)]
            rank = int(np.linalg.matrix_rank(block))
            if rank == len(positions):
                statistic = float(vector @ np.linalg.solve(block, vector))
                interaction = {"chi_square": statistic, "df": len(positions), "p_unadjusted": float(chi2.sf(statistic, len(positions)))}
        dispersion = float(fit.pearson_chi2 / fit.df_resid)
        return {**base, "status": "fitted" if not unavailable_models else "partly fitted", "family": "Poisson GLM, topic-cluster robust SE",
                "models_fitted": models, "topics_fitted": len(topics), "excluded_models": excluded,
                "excluded_topics": excluded_topics, "unavailable_model_contrasts": unavailable_models,
                "pooled_equal_model_log_ratio": pooled,
                "language_by_model_interaction": interaction, "pearson_dispersion": dispersion,
                "observed_zero_fraction": float(np.mean(y == 0)), "observations_fitted": len(subset)}, effects
    except (ValueError, np.linalg.LinAlgError, FloatingPointError, OverflowError) as error:
        return {**base, "status": "fit failed", "reason": str(error), "excluded_models": excluded, "excluded_topics": excluded_topics}, []


def fmt(value):
    return "—" if value is None else f"{value:.3g}"


def write_report(output, provenance, results, contrasts):
    categories = provenance.get("selected_categories")
    scope = f"{len(results)} features in {', '.join(categories)}" if categories else f"all {len(results)} rubric features"
    exposure = provenance.get("exposure")
    model_text = (f"Counts are adjusted for tutor-output {exposure} with a log offset. Ratios compare occurrences per {exposure}."
                  if exposure else "No response-length offset is used: results compare absolute counts per conversation.")
    lines = ["# English–Tamil feature-count GLM", "",
             f"{provenance['conversations']:,} original conversations; {len(provenance['topics'])} topics; {len(provenance['models'])} models; five tries per topic/model/language cell. This report covers {scope}. Evaluations use {provenance['evaluator']} and section prompt v19 with one rubric hash.", "",
             f"Each feature is fitted separately with a log-link Poisson GLM: `count ~ language × model + topic`. Topic is a fixed effect. Standard errors are clustered by topic (35 clusters) to account for within-topic dependence and overdispersion. {model_text} Ratios above 1 mean more occurrences in English. The pooled ratio is the equal-model average *log* ratio across models that have nonzero counts in both languages. It is not a separate test for each topic.", "",
             f"P-values and 95% CIs are exploratory, asymptotic and unadjusted for the {len(results)} selected features and within-model contrasts. Topic fixed effects condition inference on these topics. Differences in response length and language drift can affect counts. All-zero model/language cells and all-zero topics are excluded *for that feature only* and listed in results.json; sparse features may be inestimable.", "",
             "## Feature-level results", "",
             "| Feature | EN mean count | TA mean count | English/Tamil ratio | 95% CI | p (unadjusted) | Interaction p | Status |",
             "|---|---:|---:|---:|---:|---:|---:|---|",]
    for r in results:
        pooled = r.get("pooled_equal_model_log_ratio") or {}
        ci = f"{fmt(pooled['ci_low'])}–{fmt(pooled['ci_high'])}" if pooled else "—"
        interaction = r.get("language_by_model_interaction") or {}
        lines.append(f"| {r['name']} | {r['english_mean']:.2f} | {r['tamil_mean']:.2f} | {fmt(pooled.get('ratio'))} | {ci} | {fmt(pooled.get('p_unadjusted'))} | {fmt(interaction.get('p_unadjusted'))} | {r['status']} |")
    significant = sorted((c for c in contrasts if c["p_unadjusted"] < 0.05), key=lambda c: (c["feature"], c["p_unadjusted"]))
    lines += ["", "## Within-model English–Tamil contrasts with p < 0.05", "",
              "These are unadjusted exploratory results; the complete set of within-model contrasts is in `contrasts.csv`.", "",
              "| Feature | Model | EN mean | TA mean | English/Tamil ratio | 95% CI | p |",
              "|---|---|---:|---:|---:|---:|---:|"]
    for c in significant:
        lines.append(f"| {c['feature']} | {c['model']} | {c['english_mean']:.2f} | {c['tamil_mean']:.2f} | {c['ratio']:.3f} | {c['ci_low']:.3f}–{c['ci_high']:.3f} | {c['p_unadjusted']:.3g} |")
    if not significant:
        lines.append("| None | — | — | — | — | — | — |")
    lines += ["", "## Diagnostics", "", "The per-feature Pearson dispersion, observed zero fraction, fitted topics, excluded cells, and interaction tests are in `results.json`. Large dispersion or sparse cells warrant cautious interpretation. The raw per-conversation totals are in `counts.csv`.", ""]
    (output / "report.md").write_text("\n".join(lines), encoding="utf-8")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--focus", choices=["pedagogical-conversational"],
                        help="Fit only Explanatory & Pedagogical Devices and Conversational & Tutoring Moves")
    parser.add_argument("--lengths", type=Path, help="CSV with conversation_id, graphemes, and words")
    parser.add_argument("--exposure", choices=["graphemes", "words"], help="Tutor-output length used as a log offset")
    args = parser.parse_args()
    if bool(args.lengths) != bool(args.exposure):
        parser.error("--lengths and --exposure must be supplied together")
    data, provenance = load_snapshot(args.archive)
    if args.lengths:
        lengths = pd.read_csv(args.lengths)
        if lengths.conversation_id.duplicated().any() or set(lengths.conversation_id) != set(data.conversation_id):
            raise ValueError("Length file must contain each conversation exactly once")
        data = data.merge(lengths, on="conversation_id", validate="one_to_one")
        if not np.isfinite(data[args.exposure]).all() or (data[args.exposure] <= 0).any():
            raise ValueError("Exposure must be positive and finite")
        provenance["exposure"] = args.exposure
        provenance["lengths_file"] = str(args.lengths)
    if args.focus:
        provenance["features"] = [feature for feature in provenance["features"] if feature["category"] in FOCUS_CATEGORIES]
        provenance["selected_categories"] = sorted(FOCUS_CATEGORIES)
        if len(provenance["features"]) != 13:
            raise ValueError("Expected exactly 13 pedagogical and conversational features")
    results, contrasts = [], []
    for feature in provenance["features"]:
        result, effects = fit_feature(data, feature["key"], feature["name"], args.exposure)
        results.append(result)
        contrasts.extend(effects)
        print(f"{feature['key']}: {result['status']}", flush=True)
    args.output.mkdir(parents=True, exist_ok=True)
    data.to_csv(args.output / "counts.csv", index=False)
    pd.DataFrame(contrasts).to_csv(args.output / "contrasts.csv", index=False)
    report = {"analysis_version": "archive-language-count-glm/1", "provenance": provenance,
              "formula": "count ~ english * model + topic" + (f" + offset(log({args.exposure}))" if args.exposure else ""),
              "inference": "Poisson GLM with cluster-robust SE by topic; exploratory unadjusted two-sided Wald tests; " + (f"log {args.exposure} exposure offset" if args.exposure else "no length offset"),
              "versions": {"python": platform.python_version(), "numpy": np.__version__, "pandas": pd.__version__, "scipy": scipy.__version__, "statsmodels": statsmodels.__version__},
              "results": results, "contrasts": contrasts}
    (args.output / "results.json").write_text(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False), encoding="utf-8")
    write_report(args.output, provenance, results, contrasts)
    print(json.dumps({"output": str(args.output), "fitted": sum(r["status"] == "fitted" for r in results), "significant_within_model": sum(c["p_unadjusted"] < .05 for c in contrasts)}))


if __name__ == "__main__":
    main()
