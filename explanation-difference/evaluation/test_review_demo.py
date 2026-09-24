import copy
import unittest
import review_demo


class ReviewTests(unittest.TestCase):
    def fixture(self):
        passages = [{'id': 'p1', 'text': "Let's break it down:"}]
        original = {'subtopics': [], 'instances': [{'id':'i1','kind':'worked_example','label':'Example','passage_ids':['p1']}],
                    'annotations':[{'passage_id':'p1','primary_function':'WORKED','secondary_functions':['STRUCTURAL'],
                                    'formats':['prose'],'subtopic_ids':[],'instance_ids':['i1'],
                                    'attributes':{'step_role':'setup'},'rationale':'Setup','review_flags':[]}]}
        review = {'reviewed_passage_ids':['p1'], 'unresolved':[], 'changes':[
            {'passage_id':'p1','updates':{'primary_function':'STRUCTURAL','secondary_functions':[], 'attributes':{}},
             'rule_ids':['R1'],'reason':'No problem content'}]}
        return passages, original, review

    def test_patch_preserves_original_and_instance(self):
        passages, original, review = self.fixture()
        saved = copy.deepcopy(original)
        revised, changes = review_demo.apply_review(original, passages, review)
        self.assertEqual(original, saved)
        self.assertEqual(revised['annotations'][0]['instance_ids'], ['i1'])
        self.assertEqual(revised['annotations'][0]['primary_function'], 'STRUCTURAL')
        self.assertEqual(changes[0]['before'], original['annotations'][0])

    def test_forbids_link_changes_and_incomplete_review(self):
        passages, original, review = self.fixture()
        review['changes'][0]['updates']['instance_ids'] = []
        with self.assertRaises(ValueError):
            review_demo.apply_review(original, passages, review)
        review['changes'] = []
        review['reviewed_passage_ids'] = []
        with self.assertRaises(ValueError):
            review_demo.apply_review(original, passages, review)


if __name__ == '__main__':
    unittest.main()
