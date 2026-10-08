import unittest
from pathlib import Path
from conversation_identity import ROOT, original_uid, translation_uid


class ConversationIdentityTests(unittest.TestCase):
    def test_original_ids_are_stable_and_distinct_across_runs(self):
        first = ROOT / "simulated-conversation-openrouter/outputs/run-a/topic__en/conversation.json"
        second = ROOT / "simulated-conversation-openrouter/outputs/run-b/topic__en/conversation.json"
        self.assertEqual(original_uid(first), original_uid(first))
        self.assertNotEqual(original_uid(first), original_uid(second))

    def test_original_translation_draft_and_review_have_distinct_ids(self):
        source = original_uid(ROOT / "source.json")
        value = {"messages": [{"turn_id": "t1", "text": "H₂ = 74 pm"}]}
        variants = ["conversation.english.json", "conversation.comparative.english.draft.json", "conversation.comparative.english.json"]
        ids = [translation_uid(source, variant, value) for variant in variants]
        self.assertEqual(len(set([source] + ids)), 4)
        self.assertEqual(ids[0], translation_uid(source, variants[0], value))
        self.assertNotEqual(ids[0], translation_uid(source, variants[0], {"messages": [{"text": "changed translation"}]}))


if __name__ == "__main__":
    unittest.main()
