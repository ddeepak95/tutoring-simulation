"""Offline tests: no network calls or credentials required."""
import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("rubric_pipeline", HERE / "run.py")
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.source = self.root / "conversation.json"
        self.transcript = {
            "conversation_id": "chemistry",
            "metadata": {"native_language": "Tamil"},
            "messages": [
                {"turn_id": "s1", "speaker": "student", "text": "விளக்கவும்"},
                {"turn_id": "t1", "speaker": "tutor", "text": "அணு அணு. A coefficient multiplies the formula."},
                {"turn_id": "s2", "speaker": "student", "text": "FUTURE_ONLY_CONFUSION"},
            ],
        }
        pipeline.save_json(self.source, self.transcript)
        self.conversation = pipeline.normalize(self.source)
        self.schema = pipeline.read_json(pipeline.LEGACY_SCHEMA)
        self.rubric = pipeline.LEGACY_RUBRIC.read_text(encoding="utf-8")
        self.tasks = pipeline.tasks_for(self.conversation, self.rubric, self.schema)
        self.settings = pipeline.read_json(HERE / "config.json")
        self.settings["model"] = "test/evaluator"

    def legacy_main(self, args, call=None):
        return pipeline.main(args + ["--schema", str(pipeline.LEGACY_SCHEMA),
                                     "--rubric", str(pipeline.LEGACY_RUBRIC),
                                     "--prompt", str(HERE / "prompts/evaluator.md")], call)

    def evidence(self, **updates):
        value = dict(turn_id="t1", quote="அணு", occurrence=2, concept_ids=["c1"])
        value.update(updates)
        return value

    def local(self):
        names = self.schema["properties"]["explanation_evaluations"]["items"]["properties"]["instructional_characteristics"]["properties"]
        judgments = {name: dict(status="absent", rationale="Not present in this response.", evidence=[])
                     for name in names}
        for name in ("maintains_focus", "connects_ideas_coherently"):
            judgments[name] = dict(status="meets", rationale="The response is focused and connected.",
                                   evidence=[self.evidence()])
        return {
            "inventory": {"turn_id": "t1", "contains_explanation": True, "reason": "Explains a coefficient."},
            "evaluation": {
                "turn_id": "t1",
                "concepts": [{"concept_id": "c1", "label": "Coefficient",
                              "label_source": "evaluator_generated", "title_span": None,
                              "content_spans": [self.evidence()]}],
                "features": {"examples": [], "analogies_or_models": [], "cultural_references": [],
                             "real_world_connections": [], "questions_or_hints": [],
                             "summary": {"present": False, "evidence": []}},
                "instructional_characteristics": judgments,
                "technical_accuracy": {"status": "no_identified_error", "rationale": "No error identified.",
                                       "evidence": [self.evidence()], "corrections": None},
            },
            "limitations": [],
        }

    def holistic(self):
        names = self.schema["properties"]["conversation_evaluation"]["properties"]
        return dict(conversation_evaluation={
            name: dict(status="insufficient_evidence", score=None,
                       rationale="No tutor follow-up is recorded.", evidence=[])
            for name in names}, limitations=["Brief dialogue."])

    def fake_call(self, messages, settings):
        data = json.loads(messages[1]["content"])
        value = self.local() if data["stage"] == "local" else self.holistic()
        return dict(text=json.dumps(value, ensure_ascii=False), usage={"total_tokens": 10})

    def test_no_future_leakage_or_simulator_instructions(self):
        self.assertNotIn("FUTURE_ONLY_CONFUSION", json.dumps(self.tasks[0]["messages"]))
        self.assertIn("FUTURE_ONLY_CONFUSION", json.dumps(self.tasks[-1]["messages"]))
        self.transcript["configuration"] = {"system_prompts": {"student": "SECRET_SIMULATOR_STATE"}}
        pipeline.save_json(self.source, self.transcript)
        c = pipeline.normalize(self.source)
        self.assertNotIn("SECRET_SIMULATOR_STATE", json.dumps(pipeline.tasks_for(c, self.rubric, self.schema)))

    def test_tamil_exact_occurrence_and_invalid_quote(self):
        pipeline.validate_stage(self.local(), self.tasks[0])
        bad = self.local()
        bad["evaluation"]["concepts"][0]["content_spans"][0]["occurrence"] = 3
        with self.assertRaisesRegex(ValueError, "Quote occurrence"):
            pipeline.validate_stage(bad, self.tasks[0])
        with self.assertRaises(ValueError):
            pipeline.validate_evidence(self.evidence(quote="translated atom"), self.conversation["messages"], ["c1"])

    def test_future_evidence_rejected(self):
        bad = self.local()
        bad["evaluation"]["technical_accuracy"]["evidence"] = [
            self.evidence(turn_id="s2", quote="FUTURE_ONLY_CONFUSION")]
        with self.assertRaisesRegex(ValueError, "future"):
            pipeline.validate_stage(bad, self.tasks[0])

    def test_concept_reference_and_span_scope(self):
        bad = self.local()
        bad["evaluation"]["concepts"][0]["content_spans"][0]["concept_ids"] = ["unknown"]
        with self.assertRaisesRegex(ValueError, "concept"):
            pipeline.validate_stage(bad, self.tasks[0])
        bad = self.local()
        bad["evaluation"]["concepts"][0]["content_spans"][0].update(
            turn_id="s1", quote="விளக்கவும்", occurrence=1)
        with self.assertRaisesRegex(ValueError, "evaluated response"):
            pipeline.validate_stage(bad, self.tasks[0])

    def test_nonexplanatory_turn_is_inventoried(self):
        local = dict(inventory=dict(turn_id="t1", contains_explanation=False, reason="Greeting."),
                     evaluation=None, limitations=[])
        pipeline.validate_stage(local, self.tasks[0])
        result = pipeline.assemble(self.conversation, [local, self.holistic()], self.schema)
        self.assertEqual(len(result["tutor_turn_inventory"]), 1)
        self.assertEqual(result["explanation_evaluations"], [])
        local["evaluation"] = self.local()["evaluation"]
        with self.assertRaisesRegex(ValueError, "classification"):
            pipeline.validate_stage(local, self.tasks[0])

    def test_summary_and_score_rules(self):
        bad = self.local()
        bad["evaluation"]["features"]["summary"]["present"] = True
        with self.assertRaisesRegex(ValueError, "Summary"):
            pipeline.validate_stage(bad, self.tasks[0])
        holistic = self.holistic()
        holistic["conversation_evaluation"]["responsiveness"]["score"] = 0
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(holistic, self.tasks[-1])
        holistic = self.holistic()
        holistic["conversation_evaluation"]["responsiveness"]["evidence"] = [self.evidence()]
        with self.assertRaisesRegex(ValueError, "concept"):
            pipeline.validate_stage(holistic, self.tasks[-1])

    def test_repair_and_resume_cache(self):
        calls = []
        def call(messages, settings):
            calls.append(copy.deepcopy(messages))
            return {"text": "not json" if len(calls) == 1 else json.dumps(self.local()), "usage": {}}
        result = pipeline.run_stage(self.tasks[0], self.root / "stage", self.settings, call)
        self.assertEqual(len(calls), 2)
        self.assertIn("Validation error", calls[-1][-1]["content"])
        cached = pipeline.run_stage(self.tasks[0], self.root / "stage", self.settings,
                                    lambda *_: self.fail("Should use cache"), resume=True)
        self.assertEqual(result, cached)

    def test_invalid_cached_stage_regenerated(self):
        folder = self.root / "cached"
        pipeline.save_json(folder / self.tasks[0]["name"] / "validated.json", {})
        result = pipeline.run_stage(self.tasks[0], folder, self.settings, self.fake_call, resume=True)
        self.assertEqual(result, self.local())
        self.assertTrue((folder / self.tasks[0]["name"] / "rejected_cache.json").exists())

    def test_batch_continues_after_failed_conversation(self):
        second = self.root / "second.json"
        other = copy.deepcopy(self.transcript)
        other["conversation_id"] = "other"
        pipeline.save_json(second, other)
        output = self.root / "batch"
        calls = []
        def call(messages, settings):
            calls.append(True)
            if len(calls) == 1:
                raise RuntimeError("Simulated API failure")
            return self.fake_call(messages, settings)
        code = self.legacy_main([str(self.source), str(second), "--output", str(output)], call)
        self.assertEqual(code, 1)
        statuses = [r["status"] for r in pipeline.read_json(output / "run_status.json")]
        self.assertEqual(statuses, ["failed", "completed"])

    def test_invalid_output_never_saved_as_valid(self):
        with self.assertRaises(ValueError):
            pipeline.run_stage(self.tasks[0], self.root / "stage", self.settings,
                               lambda *_: {"text": "{}"})
        self.assertFalse((self.root / "stage" / self.tasks[0]["name"] / "validated.json").exists())

    def test_end_to_end_and_resume(self):
        output = self.root / "output"
        args = [str(self.source), "--output", str(output), "--model", "test/evaluator"]
        self.assertEqual(self.legacy_main(args, self.fake_call), 0)
        records = pipeline.read_json(output / "run_status.json")
        result = pipeline.read_json(Path(records[0]["folder"]) / "evaluation.json")
        pipeline.schema_validate(result, self.schema)
        self.assertEqual(result["metadata"]["native_language"], "Tamil")
        self.assertTrue((output / "summary.csv").exists())
        self.assertEqual(self.legacy_main(args + ["--resume"],
                                      lambda *_: self.fail("Resume made a call")), 0)
        self.assertEqual(self.legacy_main(args), 1)
        self.transcript["messages"][0]["text"] += " changed"
        pipeline.save_json(self.source, self.transcript)
        self.assertEqual(self.legacy_main(args + ["--resume"], self.fake_call), 1)

    def test_dry_run_never_calls_api(self):
        output = self.root / "dry"
        self.assertEqual(self.legacy_main([str(self.source), "--dry-run", "--output", str(output)],
                                      lambda *_: self.fail("Dry run called API")), 0)
        self.assertEqual(pipeline.read_json(output / "run_status.json")[0]["status"], "prepared")

    def test_reject_incomplete_and_duplicate_ids(self):
        self.transcript["status"] = "failed"
        pipeline.save_json(self.source, self.transcript)
        with self.assertRaises(ValueError):
            pipeline.normalize(self.source)
        self.transcript["status"] = "completed"
        self.transcript["messages"][1]["turn_id"] = "s1"
        pipeline.save_json(self.source, self.transcript)
        with self.assertRaisesRegex(ValueError, "duplicate"):
            pipeline.normalize(self.source)

    def test_multiple_tutor_histories(self):
        self.transcript["messages"].append({"turn_id": "t2", "speaker": "tutor", "text": "Second explanation."})
        pipeline.save_json(self.source, self.transcript)
        tasks = pipeline.tasks_for(pipeline.normalize(self.source), self.rubric, self.schema)
        self.assertEqual(len(tasks), 3)
        self.assertEqual(len(tasks[0]["data"]["messages"]), 2)
        self.assertEqual(len(tasks[1]["data"]["messages"]), 4)

    def test_markdown_sibling_discovery_and_deduplication(self):
        md = self.source.with_suffix(".md")
        md.write_text("unused", encoding="utf-8")
        self.assertEqual(pipeline.discover([md, self.root, self.source]), [self.source.resolve()])

    def test_transport_retries_and_incomplete_output(self):
        import requests
        from unittest.mock import Mock
        transient = Mock(status_code=429)
        success = Mock(status_code=200)
        success.json.return_value = {"candidates": [{"finishReason": "STOP", "content": {"parts": [{"text": "{}"}]}}], "usageMetadata": {"totalTokenCount": 5}}
        with patch.dict(pipeline.os.environ, {"GEMINI_API_KEY": "test-key"}), \
             patch.object(requests, "post", side_effect=[transient, success]) as post, \
             patch.object(pipeline.time, "sleep"):
            self.assertEqual(pipeline.request_api([], dict(self.settings, model="google/gemini-3.8-flash"))["text"], "{}")
            self.assertEqual(post.call_count, 2)
        success.json.return_value["candidates"][0]["finishReason"] = "MAX_TOKENS"
        with patch.dict(pipeline.os.environ, {"GEMINI_API_KEY": "test-key"}), \
             patch.object(requests, "post", return_value=success):
            with self.assertRaisesRegex(RuntimeError, "incomplete"):
                pipeline.request_api([], dict(self.settings, model="google/gemini-3.8-flash"))


    def v2_fixture(self):
        schema = pipeline.read_json(HERE / "schemas/evaluator-v2.schema.json")
        prompt = (HERE / "prompts/evaluator-v2.md").read_text(encoding="utf-8")
        tasks = pipeline.tasks_for(self.conversation, prompt, schema, prompt)
        value = self.local()
        evaluation = value["evaluation"]
        props = schema["properties"]["explanation_evaluations"]["items"]["properties"]
        evaluation["instructional_characteristics"] = {
            name: dict(status="absent", rationale="Not present.", evidence=[])
            for name in props["instructional_characteristics"]["properties"]}
        evaluation["response_quality"] = {
            name: dict(status="insufficient_evidence", rationale="Context is unavailable.", evidence=[])
            for name in props["response_quality"]["properties"]}
        evaluation["features"]["resources"] = []
        evaluation["features"]["instructional_structure"] = dict(
            status="not_applicable", rationale="No example ordering.", evidence=[])
        evaluation["language_mechanics"] = dict(status="no_identified_error",
            rationale="No errors identified.", evidence=[], corrections=None)
        return schema, prompt, tasks, value

    def test_v2_schema_detection_and_quality_are_separate(self):
        schema, prompt, tasks, value = self.v2_fixture()
        pipeline.validate_stage(value, tasks[0])
        self.assertNotIn("FUTURE_ONLY_CONFUSION", json.dumps(tasks[0]["messages"]))
        self.assertIn("FUTURE_ONLY_CONFUSION", json.dumps(tasks[-1]["messages"]))
        self.assertIn("Language mechanics", tasks[0]["messages"][0]["content"])
        self.assertNotIn("### 6. Language mechanics", tasks[-1]["messages"][0]["content"])
        value["evaluation"]["instructional_characteristics"]["reviews_prerequisites"]["status"] = "not_applicable"
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, tasks[0])

    def test_v2_language_error_requires_target_evidence(self):
        schema, prompt, tasks, value = self.v2_fixture()
        value["evaluation"]["language_mechanics"].update(status="minor_error", evidence=[
            self.evidence(turn_id="s1", quote=self.conversation["messages"][0]["text"], occurrence=1)])
        with self.assertRaisesRegex(ValueError, "current response"):
            pipeline.validate_stage(value, tasks[0])
        value["evaluation"]["language_mechanics"]["evidence"] = [self.evidence()]
        pipeline.validate_stage(value, tasks[0])

    def test_v2_end_to_end_report_and_resume_prompt_fingerprint(self):
        schema, prompt, tasks, local = self.v2_fixture()
        prompt_path = self.root / "evaluator-v2.md"
        prompt_path.write_text(prompt, encoding="utf-8")
        output = self.root / "v2-output"
        args = [str(self.source), "--output", str(output), "--model", "test/evaluator",
                "--prompt", str(prompt_path), "--schema", str(HERE / "schemas/evaluator-v2.schema.json"),
                "--rubric", str(HERE / "prompts/evaluator-v2.md")]
        def call(messages, settings):
            data = json.loads(messages[1]["content"])
            return {"text": json.dumps(local if data["stage"] == "local" else self.holistic())}
        self.assertEqual(pipeline.main(args, call), 0)
        self.assertEqual((output / "evaluator.md").read_text(encoding="utf-8"), prompt)
        record = pipeline.read_json(output / "run_status.json")[0]
        result = pipeline.read_json(Path(record["folder"]) / "evaluation.json")
        pipeline.schema_validate(result, schema)
        report = (Path(record["folder"]) / "report.md").read_text(encoding="utf-8")
        for expected in ("level_alignment", "Language mechanics", "Resources", "Instructional structure"):
            self.assertIn(expected, report)
        self.assertIn("scope_and_detail", (output / "summary.csv").read_text(encoding="utf-8-sig"))
        self.assertEqual(pipeline.main(args + ["--resume"], lambda *_: self.fail("Called API")), 0)
        prompt_path.write_text(prompt + "\nChanged prompt.\n", encoding="utf-8")
        self.assertEqual(pipeline.main(args + ["--resume"], lambda *_: self.fail("Called API")), 1)


if __name__ == "__main__":
    unittest.main()
