"""Analyze saved scores only; no database writes or evaluator requests."""
import csv
import hashlib
import io
import json
from pathlib import Path
import subprocess
from datetime import datetime, timezone
import numpy as np
import scipy
from rating_comparability_stats import holm, independent_estimate, paired_estimate, tost

ROOT = Path(__file__).resolve().parent
REPORTS = ROOT / "run-01" / "reports"
MARGINS = [.1, .2, .3]


def read_snapshot(name):
    raw = (REPORTS / name).read_bytes()
    return json.loads(raw), hashlib.sha256(raw).hexdigest()


def score(row, key):
    return row["combined_score"] if key == "combined" else row["scores"][key]


def finite(value):
    return value is not None and bool(np.isfinite(value))


def available(row):
    return frozenset(key for key, value in row["scores"].items() if finite(value))


def write_csv(name, records):
    if not records:
        return
    buffer = io.StringIO(newline="")
    writer = csv.DictWriter(buffer, fieldnames=list(records[0]))
    writer.writeheader()
    writer.writerows(records)
    (REPORTS / name).write_text(buffer.getvalue(), encoding="utf-8")


def main():
    original, original_hash = read_snapshot("all-rating-tables.json")
    translated, translated_hash = read_snapshot("combined-translated-rating-scores.json")
    if original["prompt_version"] != "marker-free-turn-ratings/4" or original["rubric_hash"] != translated["rubric_hash"]:
        raise ValueError("Rubric snapshots differ")
    originals = {row["id"]: row for row in original["conversations"]}
    if len(originals) != 882:
        raise ValueError("Expected 882 unique originals")
    translations = [row for row in translated["conversations"] if row["cohort_role"] == "english_translation"]
    references = [row for row in translated["conversations"] if row["cohort_role"] == "english_original_reference"]
    if len(translations) != 756 or len(references) != 126 or len({row["source_id"] for row in translations}) != 756:
        raise ValueError("Translation inventory differs")
    for row in references:
        old = originals[row["id"]]
        if row["language"] != "en" or row["scores"] != old["scores"] or row["combined_score"] != old["combined_score"]:
            raise ValueError("Original English reference changed")
    pairs = []
    for right in translations:
        left = originals[right["source_id"]]
        if any(left[key] != right[key] for key in ["model", "language", "topic", "try"]) or left["language"] == "en":
            raise ValueError("Source/translation pair metadata differ")
        pairs.append((left, right))
    models, topics = original["models"], original["topics"]
    languages = [language for language in original["languages"] if language != "en"]
    criteria = [{"key": "combined", "label": "Combined score"}, *original["dimensions"]]
    paired_results, equivalence_results, pair_scores = [], [], []
    for criterion in criteria:
        key = criterion["key"]
        paired_family, independent_family = [], []
        for model in models:
            english = [row for row in originals.values() if row["model"] == model and row["language"] == "en"]
            for language in languages:
                matches = [(left, right) for left, right in pairs if left["model"] == model and left["language"] == language]
                if len(matches) != 18 or len(english) != 18:
                    raise ValueError("Expected 18 source/translation pairs and 18 English originals per cell")
                paired_blocks, independent_blocks, paired_topics, independent_topics = [], [], [], []
                for topic in topics:
                    valid_pairs = [(score(left, key), score(right, key)) for left, right in matches
                                   if left["topic"] == topic and finite(score(left, key)) and finite(score(right, key))]
                    if len(valid_pairs) >= 2:
                        paired_blocks.append(([left for left, _ in valid_pairs], [right for _, right in valid_pairs]))
                        paired_topics.append(topic)
                    left_values = [score(row, key) for row in english if row["topic"] == topic and finite(score(row, key))]
                    right_values = [score(right, key) for _, right in matches if right["topic"] == topic and finite(score(right, key))]
                    if len(left_values) >= 2 and len(right_values) >= 2:
                        independent_blocks.append((left_values, right_values))
                        independent_topics.append(topic)
                paired_row = dict(model=model, language=language, criterion=key, estimate=paired_estimate(paired_blocks),
                                  included_topics=paired_topics, excluded_topics=[topic for topic in topics if topic not in paired_topics],
                                  complete_pairs=sum(finite(score(left, key)) and finite(score(right, key)) for left, right in matches),
                                  available_question_set_mismatches=sum(available(left) != available(right) for left, right in matches))
                independent_row = dict(model=model, language=language, criterion=key, estimate=independent_estimate(independent_blocks),
                                       included_topics=independent_topics, excluded_topics=[topic for topic in topics if topic not in independent_topics])
                independent_row["equivalence"] = [tost(independent_row["estimate"], margin) for margin in MARGINS]
                paired_family.append(paired_row)
                independent_family.append(independent_row)
                for left, right in matches:
                    left_score, right_score = score(left, key), score(right, key)
                    pair_scores.append(dict(model=model, source_language=language, topic=left["topic"], try_number=left["try"],
                                            source_id=left["id"], translation_id=right["id"], criterion=key,
                                            original_score=left_score, translation_score=right_score,
                                            difference=right_score-left_score if finite(left_score) and finite(right_score) else None))
        for family in [paired_family, independent_family]:
            adjusted = holm([row["estimate"]["difference_p"] for row in family])
            for row, adjusted_p in zip(family, adjusted):
                row["difference_p_adjusted"] = adjusted_p
                row["difference_detected"] = adjusted_p is not None and adjusted_p < .05
        for index, margin in enumerate(MARGINS):
            adjusted = holm([row["equivalence"][index]["p"] for row in independent_family])
            for row, adjusted_p in zip(independent_family, adjusted):
                row["equivalence"][index].update(adjusted_p=adjusted_p, equivalent=adjusted_p is not None and adjusted_p < .05)
        paired_results.extend(paired_family)
        equivalence_results.extend(independent_family)
    report = dict(format_version="rating-comparability/1", generated_at=datetime.now(timezone.utc).isoformat(),
                  prompt_version=original["prompt_version"], rubric_hash=original["rubric_hash"],
                  source_hashes={"all-rating-tables.json": original_hash, "combined-translated-rating-scores.json": translated_hash},
                  software={"numpy": np.__version__, "scipy": scipy.__version__}, models=models, languages=languages,
                  language_names=original["language_names"], topics=topics, topic_names=original["topic_names"], criteria=criteria,
                  margins=MARGINS, original_translation_pairs=756, english_originals=126,
                  paired=paired_results, equivalence=equivalence_results,
                  sources={"equivalence": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5502906/",
                           "variance_degrees_of_freedom": "https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/welchsat.htm"})
    (REPORTS / "rating-comparability.json").write_text(json.dumps(report, indent=2, allow_nan=False)+"\n", encoding="utf-8")
    write_csv("rating-comparability-pair-scores.csv", pair_scores)
    paired_csv, equivalence_csv = [], []
    for row in paired_results:
        estimate = row["estimate"]
        paired_csv.append(dict(model=row["model"], source_language=row["language"], criterion=row["criterion"],
                               pairs=estimate["n_left"], topics=estimate["topics"], original_mean=estimate["left_mean"], translation_mean=estimate["right_mean"],
                               change=estimate["difference"], ci95_low=(estimate["ci95"] or [None, None])[0], ci95_high=(estimate["ci95"] or [None, None])[1],
                               mae=estimate.get("mae"), raw_p=estimate["difference_p"], holm_p=row["difference_p_adjusted"], difference_detected=row["difference_detected"],
                               unavailable_reason=estimate["unavailable_reason"]))
    for row in equivalence_results:
        estimate = row["estimate"]
        for equivalent in row["equivalence"]:
            equivalence_csv.append(dict(model=row["model"], source_language=row["language"], criterion=row["criterion"],
                                       english_n=estimate["n_left"], translated_n=estimate["n_right"], topics=estimate["topics"],
                                       english_mean=estimate["left_mean"], translation_mean=estimate["right_mean"], difference=estimate["difference"],
                                       ci90_low=(estimate["ci90"] or [None, None])[0], ci90_high=(estimate["ci90"] or [None, None])[1],
                                       margin=equivalent["margin"], tost_p=equivalent["p"], holm_p=equivalent["adjusted_p"],
                                       equivalent=equivalent["equivalent"], unavailable_reason=estimate["unavailable_reason"]))
    write_csv("rating-comparability-paired-tests.csv", paired_csv)
    write_csv("rating-comparability-equivalence-tests.csv", equivalence_csv)
    subprocess.run(["node", str(ROOT / "render-rating-comparability.mjs")], check=True)
    combined_pairs = [row for row in paired_results if row["criterion"] == "combined"]
    combined_equivalence = [row for row in equivalence_results if row["criterion"] == "combined"]
    print(json.dumps(dict(pairs=756, paired_changes_detected=sum(row["difference_detected"] for row in combined_pairs),
                          equivalence_established={str(margin): sum(row["equivalence"][index]["equivalent"] for row in combined_equivalence)
                                                   for index, margin in enumerate(MARGINS)},
                          comparisons=42, report=str(REPORTS / "rating-comparability.html"))))


if __name__ == "__main__":
    main()
