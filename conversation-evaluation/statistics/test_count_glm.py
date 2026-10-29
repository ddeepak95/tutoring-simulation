import copy
import itertools
import unittest

import numpy as np
import pandas as pd

from count_glm import contrast, design, fit_feature, validate_snapshot


class CountGlmTests(unittest.TestCase):
    def snapshot(self):
        return {"format_version": "count-glm-input/1", "features": [{"key": "questions", "name": "Questions"}], "prompt_version": "v19", "rubric_hash": "current", "evaluator": "argon", "rows": [{"conversation_id": str(i), "baseline_id": "b" + str(i), "prompt_version": "v19", "rubric_hash": "current", "evaluator": "argon", "topic": topic, "language": language, "model": model, "counts": {"questions": attempt}} for i, (topic, language, model, attempt) in enumerate(itertools.product(["a", "b"], ["en", "ta"], ["deepseek", "gpt"], range(5)))]}

    def test_requires_complete_compatible_independent_evaluations(self):
        source = self.snapshot()
        frame, topics = validate_snapshot(source)
        self.assertEqual((len(frame), topics), (40, ["a", "b"]))
        self.assertEqual(frame.questions.min(), 0)  # Genuine evaluated absences stay zero.
        changes = [lambda x: x["rows"].pop(), lambda x: x["rows"].append(copy.deepcopy(x["rows"][0])), lambda x: x["rows"][0].update(baseline_id=None), lambda x: x["rows"][0].update(prompt_version="old"), lambda x: x["rows"][0].update(rubric_hash="old"), lambda x: x["rows"][0].update(counts={}), lambda x: x["rows"][0].update(counts={"questions": -1})]
        for change in changes:
            bad = copy.deepcopy(source)
            change(bad)
            with self.assertRaises(ValueError):
                validate_snapshot(bad)

    def test_reference_and_interaction_contrasts_have_correct_direction(self):
        beta = np.log([2, 3, 5, 7])
        covariance = np.eye(4) * .04
        self.assertAlmostEqual(contrast(beta, covariance, [0, 1, 0, 0])["ratio"], 3)
        self.assertAlmostEqual(contrast(beta, covariance, [0, 1, 0, 1])["ratio"], 21)
        self.assertAlmostEqual(contrast(beta, covariance, [0, 0, 1, 1])["ratio"], 35)
        self.assertAlmostEqual(contrast(beta, covariance, [0, 0, 0, 1])["ratio"], 7)
        result = contrast(np.zeros(4), covariance, [0, 1, 0, 0])
        self.assertEqual(result["p_unadjusted"], 1)
        self.assertLess(result["ci_low"], 1)
        self.assertGreater(result["ci_high"], 1)

    def test_full_rank_design_and_estimable_overdispersed_counts(self):
        rows = []
        # Known additive log-mean structure, with substantial within-cell variation.
        for topic, language, model, replicate in itertools.product(["a", "b"], ["en", "ta"], ["deepseek", "gpt"], range(5)):
            count = [1, 1, 2, 4, 12][replicate] * (2 if language == "en" else 1) * (3 if model == "gpt" else 1) * (2 if topic == "b" else 1)
            rows.append({"conversation_id": str(len(rows)), "topic": topic, "language": language, "model": model, "questions": count})
        data = pd.DataFrame(rows)
        x = design(data, ["a", "b"])
        self.assertEqual(np.linalg.matrix_rank(x), 5)
        result, residuals = fit_feature(data, x, ["a", "b"], "questions")
        self.assertEqual(result["family"], "negative_binomial_NB2")
        self.assertTrue(result["models"]["negative_binomial_NB2"]["converged"])
        for model in ["GPT", "DeepSeek"]:
            self.assertAlmostEqual(result["contrasts"]["English/Tamil within " + model]["ratio"], 2, places=3)
        self.assertAlmostEqual(result["contrasts"]["Interaction: GPT language ratio / DeepSeek language ratio"]["ratio"], 1, places=3)
        self.assertEqual(len(residuals), len(data))
        self.assertEqual(len(result["predicted_counts_equal_topic_weight"]), 4)
        data["questions"] = 0
        self.assertEqual(fit_feature(data, x, ["a", "b"], "questions")[0]["status"], "insufficient variation")

    def test_sparse_boundaries_do_not_produce_misleading_wald_claims(self):
        data, topics = validate_snapshot(self.snapshot())
        x = design(data, topics)
        data.loc[(data.model == "gpt") & (data.language == "en"), "questions"] = 0
        result, residuals = fit_feature(data, x, topics, "questions")
        self.assertEqual(result["status"], "not estimable")
        self.assertIn(["gpt", "en"], result["zero_count_cells"])
        self.assertNotIn("contrasts", result)
        self.assertEqual(residuals, [])
        data, topics = validate_snapshot(self.snapshot())
        data.loc[data.topic == "b", "questions"] = 0
        result, _ = fit_feature(data, x, topics, "questions")
        self.assertEqual(result["zero_count_topics"], ["b"])
        self.assertEqual(result["status"], "not estimable")


if __name__ == "__main__":
    unittest.main()
