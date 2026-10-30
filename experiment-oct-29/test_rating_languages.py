"""Focused checks for the blocked language comparison."""

import importlib.util
import unittest
from pathlib import Path

import numpy as np


SPEC = importlib.util.spec_from_file_location(
    "analyze_rating_languages", Path(__file__).with_name("analyze-rating-languages.py")
)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class LanguageComparisonTests(unittest.TestCase):
    def test_holm_preserves_order_and_monotonicity(self):
        self.assertEqual(MODULE.holm([0.04, 0.001, 0.03]), [0.06, 0.003, 0.06])

    def test_equal_languages_have_no_effect_even_when_blocks_differ(self):
        values = np.ones((2, 3, 7, 3))
        for model in range(2):
            for topic in range(3):
                values[model, topic] *= 1 + model + topic / 10
        result = MODULE.analyze_cohort(values, ["m1", "m2"], resamples=199, bootstraps=100)
        self.assertEqual(result["overall"]["p"], 1)
        self.assertTrue(all(pair["p"] == 1 and not pair["significant"] for pair in result["pairs"]))

    def test_language_effect_survives_model_and_topic_offsets(self):
        rng = np.random.default_rng(17)
        base = rng.normal(3, 0.05, size=(2, 3, 7, 3))
        base += np.array([0, 0.3])[:, None, None, None]
        base += np.array([0, 0.2, -0.2])[None, :, None, None]
        base[:, :, 0] += 1
        result = MODULE.analyze_cohort(base, ["m1", "m2"], resamples=999, bootstraps=100)
        self.assertLess(result["overall"]["p"], 0.05)
        self.assertGreater(result["languages"][0]["mean"], result["languages"][1]["mean"])
        self.assertEqual(len(result["pairs"]), 21)

    def test_requires_three_tries_in_every_cell(self):
        models = ["m"]
        topics = ["t"]
        rows = [
            {"id": f"{lang}-{attempt}", "model": "m", "topic": "t", "language": lang,
             "try": attempt, "combined_score": 3.0}
            for lang in MODULE.LANGUAGES for attempt in (1, 2, 3)
        ]
        snapshot = {"models": models, "topics": topics, "conversations": rows[:-1]}
        with self.assertRaisesRegex(ValueError, "complete three-try cells"):
            MODULE.build_cells(snapshot)


if __name__ == "__main__":
    unittest.main()
