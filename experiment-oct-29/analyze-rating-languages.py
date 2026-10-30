"""Compare original-language and English-text rating scores without new API calls.

Inference is conditional on the seven selected models and six selected topics.
The three tries in a model/topic/language cell are independent generations.
"""

from __future__ import annotations

import csv
import hashlib
import html
import itertools
import json
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
REPORTS = ROOT / "run-01" / "reports"
LANGUAGES = ("en", "th", "ta", "zh", "hi", "bn", "kn")
RESAMPLES = 9999
BOOTSTRAPS = 5000
SEED = 20261029


def holm(p_values):
    """Holm adjusted p-values in the input order."""
    order = np.argsort(p_values)
    result = [0.0] * len(p_values)
    running = 0.0
    for position, index in enumerate(order):
        running = max(running, (len(order) - position) * float(p_values[index]))
        result[index] = min(1.0, running)
    return result


def read_snapshot(name):
    raw = (REPORTS / name).read_bytes()
    return json.loads(raw), hashlib.sha256(raw).hexdigest()


def build_cells(snapshot, *, original_ids=None):
    models = snapshot["models"]
    topics = snapshot["topics"]
    cells = defaultdict(dict)
    for row in snapshot["conversations"]:
        key = (row["model"], row["topic"], row["language"])
        number = row["try"]
        if key[0] not in models or key[1] not in topics or key[2] not in LANGUAGES:
            raise ValueError(f"Unexpected cell {key}")
        if number in cells[key] or number not in (1, 2, 3):
            raise ValueError(f"Duplicate or unexpected try for {key}: {number}")
        if original_ids is not None:
            if row["language"] == "en":
                source = original_ids.get(row["id"])
                if row["cohort_role"] != "english_original_reference" or source is None or source["combined_score"] != row["combined_score"]:
                    raise ValueError("English reference has changed")
            else:
                source = original_ids.get(row["source_id"])
                if row["cohort_role"] != "english_translation" or source is None:
                    raise ValueError("Translation source is missing")
                if any(row[field] != source[field] for field in ("model", "topic", "language", "try")):
                    raise ValueError("Translation source metadata differs")
        score = row["combined_score"]
        if score is None or not np.isfinite(score) or not 1 <= score <= 5:
            raise ValueError(f"Invalid combined score for {row['id']}")
        cells[key][number] = float(score)
    expected = len(models) * len(topics) * len(LANGUAGES)
    if len(cells) != expected or any(len(tries) != 3 for tries in cells.values()):
        raise ValueError(f"Expected {expected} complete three-try cells; found {len(cells)}")
    return np.array([[[[cells[(model, topic, lang)][number] for number in (1, 2, 3)]
                       for lang in LANGUAGES] for topic in topics] for model in models], dtype=float)


def omnibus_statistic(cell_means):
    """Spread of marginal language means after blocking by model and topic."""
    language_means = cell_means.mean(axis=(0, 1))
    return float(np.sum((language_means - language_means.mean()) ** 2))


def analyze_cohort(values, models, seed=SEED, resamples=RESAMPLES, bootstraps=BOOTSTRAPS):
    if values.ndim != 4 or values.shape[2:] != (7, 3):
        raise ValueError("Expected models × topics × seven languages × three tries")
    model_count, topic_count = values.shape[:2]
    if len(models) != model_count:
        raise ValueError("Model list differs from values")
    rng = np.random.default_rng(seed)
    means = values.mean(axis=3)
    observed = omnibus_statistic(means)
    observed_model = np.sum((means.mean(axis=1) - means.mean(axis=(1, 2))[:, None]) ** 2, axis=1)
    global_extreme = 0
    model_extreme = np.zeros(model_count, dtype=int)
    flat = values.reshape(model_count, topic_count, 21)
    for _ in range(resamples):
        shuffled = np.empty_like(flat)
        for model_index in range(model_count):
            for topic_index in range(topic_count):
                shuffled[model_index, topic_index] = flat[model_index, topic_index, rng.permutation(21)]
        perm_means = shuffled.reshape(model_count, topic_count, 7, 3).mean(axis=3)
        global_extreme += omnibus_statistic(perm_means) >= observed - 1e-12
        model_stats = np.sum((perm_means.mean(axis=1) - perm_means.mean(axis=(1, 2))[:, None]) ** 2, axis=1)
        model_extreme += model_stats >= observed_model - 1e-12
    overall_p = (global_extreme + 1) / (resamples + 1)
    model_p = (model_extreme + 1) / (resamples + 1)

    # Bootstrap tries inside each fixed model/topic/language cell. These intervals
    # describe repeat-generation uncertainty for the selected topics and models.
    bootstrap_means = np.empty((bootstraps, 7))
    for start in range(0, bootstraps, 250):
        size = min(250, bootstraps - start)
        picks = rng.integers(0, 3, size=(size, model_count, topic_count, 7, 3))
        repeated = np.broadcast_to(values, (size,) + values.shape)
        bootstrap_means[start:start + size] = np.take_along_axis(repeated, picks, axis=-1).mean(axis=(1, 2, 4))

    # Pairwise permutations repartition the six independent tries in each
    # model/topic block. Try 1 in one language is not paired with try 1 in another.
    partitions = np.array(list(itertools.combinations(range(6), 3)), dtype=int)
    complementary = np.array([[index for index in range(6) if index not in group] for group in partitions])
    pairs = []
    for left, right in itertools.combinations(range(7), 2):
        six = values[:, :, [left, right], :].reshape(-1, 6)
        possible = six[:, partitions].mean(axis=2) - six[:, complementary].mean(axis=2)
        difference = float(means[:, :, left].mean() - means[:, :, right].mean())
        draws = rng.integers(0, len(partitions), size=(resamples, len(six)))
        null = possible[np.arange(len(six))[None, :], draws].mean(axis=1)
        p = (1 + int(np.count_nonzero(np.abs(null) >= abs(difference) - 1e-12))) / (resamples + 1)
        low, high = np.quantile(bootstrap_means[:, left] - bootstrap_means[:, right], [0.025, 0.975])
        pairs.append({"left": LANGUAGES[left], "right": LANGUAGES[right], "difference": difference,
                      "ci95": [float(low), float(high)], "p": p})
    for row, adjusted in zip(pairs, holm([row["p"] for row in pairs])):
        row["p_holm"] = adjusted
        row["significant"] = adjusted < 0.05

    language_rows = []
    marginal = means.mean(axis=(0, 1))
    for index, lang in enumerate(LANGUAGES):
        low, high = np.quantile(bootstrap_means[:, index], [0.025, 0.975])
        language_rows.append({"language": lang, "mean": float(marginal[index]),
                              "ci95": [float(low), float(high)], "n": model_count * topic_count * 3})
    model_rows = []
    for index, model in enumerate(models):
        scores = means[index].mean(axis=0)
        model_rows.append({"model": model, "p": float(model_p[index]),
                           "language_means": {lang: float(scores[position]) for position, lang in enumerate(LANGUAGES)}})
    for row, adjusted in zip(model_rows, holm(model_p)):
        row["p_holm"] = adjusted
    return {"overall": {"statistic": observed, "p": overall_p}, "languages": language_rows,
            "pairs": pairs, "models": model_rows, "blocks": model_count * topic_count,
            "resamples": resamples, "bootstraps": bootstraps}


def write_csv(name, rows):
    with (REPORTS / name).open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def render(result):
    names = result["language_names"]
    esc = html.escape
    out = ["<!doctype html><html lang='en'><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>",
           "<title>Language comparison of combined ratings</title>",
           "<style>body{font:16px/1.5 system-ui,sans-serif;color:#18232c;background:#f7f9fb;max-width:1200px;margin:2rem auto;padding:0 1rem}h1,h2{line-height:1.2}section{background:white;border:1px solid #d7dfe7;border-radius:12px;padding:1.3rem;margin:1.3rem 0;overflow:auto}table{border-collapse:collapse;width:100%;white-space:nowrap}th,td{padding:.55rem .7rem;border-bottom:1px solid #dce3ea;text-align:right}th:first-child,td:first-child{text-align:left;position:sticky;left:0;background:white}thead th{position:sticky;top:0;background:#edf3f8}a{color:#155b91}small,.muted{color:#52606d}.yes{font-weight:700;color:#14603e}code{white-space:normal}</style>",
           "<h1>Language comparison of combined ratings</h1>",
           "<p>Original-language and English-text cohorts are analyzed separately. Each has 882 conversations: seven models × six topics × seven languages × three tries. The English-text cohort contains 756 translations and 126 unchanged English originals.</p>",
           "<p><a href='combined-rating-comparison.html'>Existing combined-score report</a> · <a href='rating-language-comparison.json'>Analysis JSON</a> · <a href='rating-language-pairs.csv'>All pairwise results CSV</a></p>"]
    for cohort_key, title in (("originals", "Original-language conversations"), ("english_text", "English-text conversations")):
        cohort = result[cohort_key]
        out.append(f"<section><h2>{title}</h2><p>Overall blocked permutation test: <strong>p = {cohort['overall']['p']:.4g}</strong> ({cohort['resamples']:,} resamples). A significant result says at least one language differs.</p>")
        out.append("<h3>All models and topics</h3><table><thead><tr><th>Language</th><th>Mean score / 5</th><th>95% CI</th><th>Conversations</th></tr></thead><tbody>")
        for row in sorted(cohort["languages"], key=lambda x: -x["mean"]):
            label = names[row["language"]] + (" (original)" if cohort_key == "english_text" and row["language"] == "en" else " → English" if cohort_key == "english_text" else "")
            out.append(f"<tr><td>{esc(label)}</td><td>{row['mean']:.3f}</td><td>{row['ci95'][0]:.3f} to {row['ci95'][1]:.3f}</td><td>{row['n']}</td></tr>")
        out.append("</tbody></table><p class='muted'>Intervals resample tries within the selected model–topic–language cells. They do not represent uncertainty about new models or topics.</p>")
        out.append("<h3>Language pairs</h3><p>Positive difference means the first language scored higher. Holm correction covers 21 pairs within this cohort. Confidence intervals are pointwise and are not multiplicity adjusted.</p>")
        out.append("<table><thead><tr><th>First</th><th>Second</th><th>Difference</th><th>95% CI</th><th>Raw p</th><th>Holm p</th><th>Result</th></tr></thead><tbody>")
        for row in sorted(cohort["pairs"], key=lambda x: x["p_holm"]):
            result_text = "Significant" if row["significant"] else "—"
            cls = " class='yes'" if row["significant"] else ""
            out.append(f"<tr><td>{esc(names[row['left']])}</td><td>{esc(names[row['right']])}</td><td>{row['difference']:+.3f}</td><td>{row['ci95'][0]:+.3f} to {row['ci95'][1]:+.3f}</td><td>{row['p']:.4g}</td><td>{row['p_holm']:.4g}</td><td{cls}>{result_text}</td></tr>")
        out.append("</tbody></table><h3>Within each model</h3><p>Omnibus language p-values are adjusted across seven models. These tests show variation within a model; they do not test whether language effects differ between models.</p>")
        out.append("<table><thead><tr><th>Model</th>" + "".join(f"<th>{esc(names[lang])}</th>" for lang in LANGUAGES) + "<th>Raw p</th><th>Holm p</th></tr></thead><tbody>")
        for row in cohort["models"]:
            out.append(f"<tr><td>{esc(row['model'])}</td>" + "".join(f"<td>{row['language_means'][lang]:.3f}</td>" for lang in LANGUAGES) + f"<td>{row['p']:.4g}</td><td>{row['p_holm']:.4g}</td></tr>")
        out.append("</tbody></table></section>")
    out.append("<section><h2>How to read this</h2><p>The statistical unit is a complete conversation. Each test preserves model and topic: it shuffles language assignments among the 21 independent conversations within each model–topic block. Try numbers are not paired across languages. The omnibus statistic is the spread of seven marginal language means; pairwise tests repartition only the six tries of the two languages being compared within each block. P-values use (extreme + 1)/(resamples + 1). The selected models and topics are fixed; inference to other models or topics needs a broader sample.</p><p>The English-text set reuses English originals and linked translations. Differences there include translation and evaluator effects; the two cohorts are not independent replications. One Gemini evaluator produced all scores, so language-dependent judge behavior remains a limitation.</p>")
    out.append("<p>Source snapshots: <code>all-rating-tables.json</code> and <code>combined-translated-rating-scores.json</code>. Prompt <code>" + esc(result["prompt_version"]) + "</code>; rubric hash <code>" + esc(result["rubric_hash"]) + "</code>.</p></section></html>")
    return "\n".join(out)


def main():
    original, original_hash = read_snapshot("all-rating-tables.json")
    english_text, translated_hash = read_snapshot("combined-translated-rating-scores.json")
    if original["rubric_hash"] != english_text["rubric_hash"] or original["prompt_version"] != english_text["prompt_version"]:
        raise ValueError("Rating prompt or rubric differs between cohorts")
    if len(original["conversations"]) != 882 or len(english_text["conversations"]) != 882:
        raise ValueError("Expected 882 conversations per cohort")
    originals = {row["id"]: row for row in original["conversations"]}
    if len(originals) != 882:
        raise ValueError("Duplicate original conversation IDs")
    translation_rows = [row for row in english_text["conversations"] if row["language"] != "en"]
    source_ids = {row["source_id"] for row in translation_rows}
    if len(translation_rows) != 756 or len(source_ids) != 756:
        raise ValueError("Expected 756 unique translation sources")
    models = original["models"]
    if models != english_text["models"] or original["topics"] != english_text["topics"]:
        raise ValueError("Cohorts have different models or topics")
    result = {"format_version": "rating-language-comparison/1", "generated_at": datetime.now(timezone.utc).isoformat(),
              "prompt_version": original["prompt_version"], "rubric_hash": original["rubric_hash"],
              "source_sha256": {"all-rating-tables.json": original_hash, "combined-translated-rating-scores.json": translated_hash},
              "models": models, "topics": original["topics"], "language_names": original["language_names"],
              "method": "Shuffle independent conversation scores within each model-topic block; Holm within each pairwise family and across seven model tests.",
              "originals": analyze_cohort(build_cells(original), models, seed=SEED),
              "english_text": analyze_cohort(build_cells(english_text, original_ids=originals), models, seed=SEED + 1)}
    (REPORTS / "rating-language-comparison.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (REPORTS / "rating-language-comparison.html").write_text(render(result), encoding="utf-8")
    rows = []
    for cohort in ("originals", "english_text"):
        for pair in result[cohort]["pairs"]:
            rows.append({"cohort": cohort, "first_language": pair["left"], "second_language": pair["right"],
                         "mean_difference": pair["difference"], "ci95_low": pair["ci95"][0],
                         "ci95_high": pair["ci95"][1], "p_raw": pair["p"], "p_holm": pair["p_holm"],
                         "significant": pair["significant"]})
    write_csv("rating-language-pairs.csv", rows)
    for cohort in ("originals", "english_text"):
        value = result[cohort]
        print(f"{cohort}: overall p={value['overall']['p']:.5g}; significant pairs={sum(row['significant'] for row in value['pairs'])}/21")


if __name__ == "__main__":
    main()
