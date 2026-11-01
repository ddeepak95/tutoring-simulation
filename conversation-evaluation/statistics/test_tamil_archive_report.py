import unittest
import numpy as np
from tamil_archive_report import holm, paired_topic_tests, model_topic_tests


class TamilArchiveStatisticsTests(unittest.TestCase):
    def test_holm_preserves_original_order(self):
        np.testing.assert_allclose(holm([.04,.001,.02]),[.04,.003,.04])

    def test_exact_three_topic_label_swaps(self):
        result=paired_topic_tests(np.array([[1.,0.],[1.,0.],[1.,0.]]),draws=99)
        self.assertEqual(result[0]['p'],.25)
        self.assertEqual(result[0]['permutations'],8)
        self.assertTrue(result[0]['exact'])
        self.assertEqual(result[1]['p'],1.)
        self.assertEqual(result[1]['ci95'],[0.,0.])

    def test_language_reversal_preserves_p_and_reverses_effect(self):
        values=np.array([[1.],[2.],[-1.],[3.]])
        a=paired_topic_tests(values,draws=99,label='reverse')[0]
        b=paired_topic_tests(-values,draws=99,label='reverse')[0]
        self.assertEqual(a['p'],b['p'])
        self.assertEqual(a['difference'],-b['difference'])
        np.testing.assert_allclose(a['ci95'],[-b['ci95'][1],-b['ci95'][0]])

    def test_topic_effect_alone_is_not_a_model_effect(self):
        matrix=np.repeat(np.arange(6)[:,None,None],3,axis=1)
        result=model_topic_tests(matrix,draws=499)[0]
        self.assertEqual(result['statistic'],0.)
        self.assertEqual(result['p'],1.)

    def test_strong_model_difference_is_detected(self):
        matrix=np.tile(np.array([0.,5.,10.])[None,:,None],(8,1,1))
        result=model_topic_tests(matrix,draws=1999)[0]
        self.assertLess(result['p'],.01)
        self.assertGreater(result['p'],0.)

    def test_invalid_matrices_are_rejected(self):
        with self.assertRaises(ValueError):paired_topic_tests(np.zeros(3))
        with self.assertRaises(ValueError):model_topic_tests(np.full((3,2,1),np.nan))


if __name__=='__main__':unittest.main()
