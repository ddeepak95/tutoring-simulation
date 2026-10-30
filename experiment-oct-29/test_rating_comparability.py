import unittest
import numpy as np
from scipy import stats
from rating_comparability_stats import holm, independent_estimate, paired_estimate, tost


class ComparabilityTests(unittest.TestCase):
    def test_single_topic_matches_scipy_paired(self):
        left = [2, 3, 4, 4, 5]
        right = [3, 3, 4.5, 4, 4.5]
        result = paired_estimate([(left, right)])
        reference = stats.ttest_rel(right, left)
        self.assertAlmostEqual(result["difference_p"], reference.pvalue)
        self.assertAlmostEqual(result["df"], reference.df)
        np.testing.assert_allclose(result["ci95"], reference.confidence_interval())

    def test_single_topic_matches_scipy_welch(self):
        left, right = [2, 3, 3, 4], [3, 4, 5, 4, 5]
        result = independent_estimate([(left, right)])
        reference = stats.ttest_ind(right, left, equal_var=False)
        self.assertAlmostEqual(result["difference_p"], reference.pvalue)
        self.assertAlmostEqual(result["df"], reference.df)
        np.testing.assert_allclose(result["ci95"], reference.confidence_interval())

    def test_topic_offsets_do_not_change_contrast(self):
        blocks = [([1, 2, 3], [2, 2, 3]), ([2, 4, 3], [3, 4, 4])]
        shifted = [(np.asarray(left) + offset, np.asarray(right) + offset)
                   for (left, right), offset in zip(blocks, [100, -30])]
        for estimate in [paired_estimate, independent_estimate]:
            for key in ["difference", "se", "df", "difference_p"]:
                self.assertAlmostEqual(estimate(blocks)[key], estimate(shifted)[key])

    def test_tost_matches_confidence_interval_rule(self):
        estimate = independent_estimate([([3.9, 4, 4.1], [3.95, 4.05, 4.15])])
        for margin in [.01, .1, .3]:
            equivalent = estimate["ci90"][0] > -margin and estimate["ci90"][1] < margin
            self.assertEqual(tost(estimate, margin)["p"] < .05, equivalent)
        self.assertLessEqual(tost(estimate, .3)["p"], tost(estimate, .1)["p"])

    def test_zero_variance_is_not_declared_equivalent(self):
        estimate = independent_estimate([([5, 5, 5], [5, 5, 5])])
        self.assertIsNone(tost(estimate, .2)["p"])
        self.assertIsNotNone(estimate["unavailable_reason"])

    def test_holm_omits_unavailable_tests(self):
        self.assertEqual(holm([.01, None, .04]), [.02, None, .04])


if __name__ == "__main__":
    unittest.main()
