"""Offline checks for the replacement quantity rubric."""
import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("item_pipeline", HERE / "run.py")
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)


class SectionItemTests(unittest.TestCase):
    def test_new_schema_uses_single_conversation_stage_and_quantity_validation(self):
        with tempfile.TemporaryDirectory() as temporary:
            source = Path(temporary) / "conversation.json"
            source.write_text(json.dumps({"configuration": {"id": "items__en", "topic_id": "items", "topic_name": "Items", "language": "English"}, "messages": [{"turn_id": "t1", "speaker": "tutor", "text": "# Practice\n\nAn example. x = 1."}]}), encoding="utf-8")
            conversation = pipeline.normalize(source)
            schema = pipeline.read_json(pipeline.SCHEMA)
            task, = pipeline.tasks_for(conversation, "", schema)
            self.assertTrue(pipeline.is_v3(schema))
            self.assertEqual(schema["properties"]["rubric_version"]["const"], "3.1")
            rating = {"status": "scored", "score": 2, "reason": "Supported.", "evidence": [{"turn_id": "t1", "quote": "An example.", "occurrence": 1}]}
            result = {"rubric_version": "3.1", "conversation_id": conversation["conversation_id"], "learning_topic": conversation["learning_topic"], "instructional_features": {key: [] for key in schema["properties"]["instructional_features"]["properties"]}, "pedagogical_characteristics": {key: copy.deepcopy(rating) for key in schema["properties"]["pedagogical_characteristics"]["properties"]}, "conversation_quality": {key: copy.deepcopy(rating) for key in schema["properties"]["conversation_quality"]["properties"]}, "errors": {"error": []}, "verification_needed": [], "limitations": []}
            result["pedagogical_characteristics"]["instructional_sequence"] = {"value": "Not determinable", "reason": "No sequence.", "evidence": []}
            result["instructional_features"]["examples"] = [{"category": "Content", "count": 3, "turn_locations": ["t1"]}]
            result["instructional_features"]["equations"] = [{"category": "Textual Representations", "count": 2, "turn_locations": ["t1"]}]
            result["instructional_features"]["questions"] = [{"category": "Content", "count": 1, "turn_locations": ["t1"]}]
            pipeline.validate_stage(result, task)
            result["instructional_features"]["examples"][0]["llm_evidence"] = "Three visible examples."
            pipeline.validate_stage(result, task)
            for evidence in ["", "two\nlines", "x" * 1001, None]:
                bad = copy.deepcopy(result)
                bad["instructional_features"]["examples"][0]["llm_evidence"] = evidence
                with self.assertRaises(ValueError):
                    pipeline.validate_stage(bad, task)
            for invalid in [0, 1001, 1.5]:
                bad = copy.deepcopy(result)
                bad["instructional_features"]["examples"][0]["count"] = invalid
                with self.assertRaises(ValueError):
                    pipeline.validate_stage(bad, task)
            bad = copy.deepcopy(result)
            bad["instructional_features"]["examples"][0]["category"] = "Multimedia"
            with self.assertRaises(ValueError):
                pipeline.validate_stage(bad, task)
            pipeline.write_report(Path(temporary), result)
            self.assertIn("**count**: 3", (Path(temporary) / "report.md").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
