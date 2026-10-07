"""Offline contract and end-to-end tests; all model responses are mocked."""
import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("comparative_runner", Path(__file__).with_name("run.py"))
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.paths = [self.source("en", "English"), self.source("ta", "Tamil")]
        self.pair = runner.discover_pairs(self.paths)[0]
        self.res = runner.resources()
        base = dict(model="mock/model", max_tokens=16000, timeout=10, http_retries=0, repair_attempts=0, reasoning=None)
        self.settings = {name: dict(base) for name in ("translation", "review", "extraction", "judge")}
        self.calls = []

    def source(self, name, language, topic="test-topic", model="tutor/model"):
        path = self.root / name / "conversation.json"
        value = dict(status="completed", conversation_id=name, configuration=dict(
            topic_id=topic, topic_name="Covalent radius", language=language,
            models=dict(tutor=dict(model=model), student=dict(model="student/model")),
            system_prompts=dict(tutor="Teach a high school learner.", student="HIDDEN_STUDENT_STATE")),
            messages=[dict(role="assistant", content="A statement 2. Ready?"),
                      dict(role="user", content="Explain more."),
                      dict(role="assistant", content="A further statement 4.")])
        runner.shared.save_json(path, value)
        return path

    def response(self, data):
        if data["stage"] == "translation":
            return dict(segments=[dict(id=s["id"], text="English: " + s["text"]) for s in data["segments"]])
        if data["stage"] == "translation_review":
            segments = [dict(id=s["id"], text=s["draft_english"]) for s in data["segments"]]
            segments[0]["text"] = segments[0]["text"].replace("English:", "Reviewed:")
            return dict(segments=segments, changes=[dict(segment_id=segments[0]["id"], reason="Closer rendering of source wording.")])
        if data["stage"] == "extraction":
            features = {k: [] for k in self.res["schemas"]["extraction"]["properties"]["instructional_features"]["properties"]}
            for turn in data["messages"]:
                if turn["speaker"] == "tutor" and "Ready?" in turn["text"]:
                    features["questions"].append(dict(question="Ready?", question_type="Instructional", concept_checked=None, turn_locations=[turn["turn_id"]]))
            return dict(rubric_version="3.0", conversation_id=data["conversation_id"], learning_topic=data["learning_topic"],
                instructional_features=features, pedagogical_characteristics=dict(instructional_sequence=dict(
                    value="Not determinable", reason="No rule/example pattern established.", evidence=[])),
                errors=dict(error=[]), verification_needed=[], limitations=[])
        items = {}
        english_label = next(label for label, c in data["candidates"].items() if "original" in c and c["original"]["language"] == "English")
        for key in runner.GROUPS[data["group"]]:
            evidence = []
            for label, candidate in data["candidates"].items():
                version = "original" if "original" in candidate else "reviewed_english"
                turn = candidate[version]["messages"][0]
                evidence.append(dict(conversation=label, version=version, turn_id=turn["turn_id"], quote=turn["text"], occurrence=1))
            items[key] = dict(outcome=english_label, reason="English better satisfies this criterion in the mock example.", evidence=evidence)
        return dict(items=items, limitations=[])

    def mock(self, messages, settings):
        self.calls.append(copy.deepcopy(messages))
        data = json.loads(messages[1]["content"])
        return dict(text=json.dumps(self.response(data), ensure_ascii=False), usage=dict(total_tokens=1), model="mock/model")

    def evaluate(self, **kwargs):
        return runner.evaluate_pair(self.pair, self.root / "output", self.res, self.settings, call=self.mock, **kwargs)

    def test_nine_calls_originals_unchanged_and_separate_outputs(self):
        before = [p.read_bytes() for p in self.paths]
        result = self.evaluate()
        self.assertEqual(result["status"], "complete")
        self.assertEqual(len(self.calls), 9)
        self.assertEqual(before, [p.read_bytes() for p in self.paths])
        self.assertFalse(self.paths[0].with_name("conversation.comparative.english.json").exists())
        for suffix in (".comparative.english.draft.json", ".comparative.english.draft.md", ".comparative.english.json", ".comparative.english.md"):
            self.assertTrue(self.paths[1].with_name("conversation" + suffix).exists())
        for variant in runner.VARIANTS:
            self.assertEqual(result["metrics"][variant]["question_types"], {"Knowledge-checking": 0, "Instructional": 1})
        for group in runner.GROUPS:
            for item in result["comparisons"][group].values():
                self.assertEqual(item["outcome"], "english_original")
                self.assertEqual(item["order_agreement"], "agreed")

    def test_independent_judge_and_extraction_requests(self):
        self.evaluate()
        for messages in self.calls:
            data = json.loads(messages[1]["content"])
            self.assertNotIn("HIDDEN_STUDENT_STATE", messages[1]["content"])
            if data["stage"] == "comparison":
                text = messages[1]["content"]
                for forbidden in ("instructional_features", "extractions", "normalized_outcome", "tutor/model", str(self.paths[0])):
                    self.assertNotIn(forbidden, text)
                self.assertEqual(set(data["candidates"]), {"A", "B"})
                self.assertEqual(sum("reviewed_english" in c for c in data["candidates"].values()), 1)
            if data["stage"] == "extraction":
                self.assertNotIn("candidates", data)
                self.assertNotIn("extractions", data)
                self.assertEqual(len(data["messages"]), 3)

    def test_pairing_requires_explicit_resolution(self):
        duplicate = self.source("en2", "English")
        with self.assertRaisesRegex(ValueError, "Ambiguous"):
            runner.discover_pairs(self.paths + [duplicate])
        missing = self.source("ta2", "Tamil", topic=None)
        with self.assertRaisesRegex(ValueError, "topic_id"):
            runner.discover_pairs([self.paths[0], missing])
        different_model = self.source("ta3", "Tamil", model="different/model")
        with self.assertRaisesRegex(ValueError, "unmatched"):
            runner.discover_pairs([self.paths[0], different_model])
        manifest = self.root / "pairs.json"
        runner.shared.save_json(manifest, dict(pairs=[dict(english="en/conversation.json", non_english="ta2/conversation.json")]))
        self.assertEqual(len(runner.discover_pairs([], manifest)), 1)

    def test_translation_validation_preserves_ids_numbers_and_formulas(self):
        conversation = copy.deepcopy(self.pair["non_english"]["conversation"])
        conversation["messages"][0]["text"] = r"2 and \(x = 4\)"
        task = runner.shared.translation_task(conversation, self.res["prompts"]["translation"])
        value = self.response(task["data"])
        runner.validate(value, task)
        for change in (lambda v: v["segments"].reverse(),
                       lambda v: v["segments"][0].update(text="English: 3 and \\(x = 4\\)"),
                       lambda v: v["segments"][0].update(text="English: 2 and \\(x = 4 + 0\\)")):
            bad = copy.deepcopy(value)
            change(bad)
            with self.assertRaises(ValueError):
                runner.validate(bad, task)

    def test_review_change_log_is_exact(self):
        translation = runner.shared.translation_task(self.pair["non_english"]["conversation"], self.res["prompts"]["translation"])
        review = runner.review_task(translation, self.response(translation["data"]), self.res)
        value = self.response(review["data"])
        runner.validate(value, review)
        for changes in ([], value["changes"] * 2, [dict(segment_id="nonexistent", reason="Change")]):
            bad = dict(value, changes=changes)
            with self.assertRaisesRegex(ValueError, "changed segments"):
                runner.validate(bad, review)

    def test_dollar_delimited_math_and_repeated_formulas_are_preserved(self):
        conversation = copy.deepcopy(self.pair["non_english"]["conversation"])
        conversation["messages"][0]["text"] = r"Use $x^2$ and \(x\), then \(x\)."
        stage = runner.shared.translation_task(conversation, self.res["prompts"]["translation"])
        value = self.response(stage["data"])
        runner.validate(value, stage)
        for changed in (r"Use $y^2$ and \(x\), then \(x\).", r"Use $x^2$ and \(x\), then x."):
            bad = copy.deepcopy(value)
            bad["segments"][0]["text"] = changed
            with self.assertRaisesRegex(ValueError, "mathematical expression"):
                runner.validate(bad, stage)

    def test_exact_evidence_disambiguates_version_and_conversation(self):
        first, second = (self.pair[k]["conversation"] for k in ("english", "non_english"))
        reviewed = copy.deepcopy(second)
        reviewed["messages"][0]["text"] = "Different English text 2. Ready?"
        stage = runner.judge_task(first, second, reviewed, "conversation_quality", False, self.res)
        value = self.response(stage["data"])
        runner.validate(value, stage)
        evidence = value["items"]["responsiveness"]["evidence"][1]
        evidence["version"] = "reviewed_english"
        with self.assertRaisesRegex(ValueError, "Invalid evidence"):
            runner.validate(value, stage)
        evidence.update(conversation="A", version="reviewed_english")
        with self.assertRaisesRegex(ValueError, "unavailable"):
            runner.validate(value, stage)

    def test_question_inventory_and_attributes_are_retained(self):
        stage = runner.extraction_task(self.pair["english"]["conversation"], "english_original", self.res)
        value = self.response(stage["data"])
        value["instructional_features"]["questions"] = []
        with self.assertRaisesRegex(ValueError, "question"):
            runner.validate(value, stage)
        value = self.response(stage["data"])
        value["instructional_features"]["questions"][0]["concept_checked"] = "Concept"
        with self.assertRaisesRegex(ValueError, "null"):
            runner.validate(value, stage)
        value = self.response(stage["data"])
        value["errors"]["error"] = [dict(error="Wrong claim", evidence="Not in source", explanation="Incorrect", correction_status="Not corrected", turn_locations=["turn_0001"])]
        with self.assertRaisesRegex(ValueError, "exact question or error evidence"):
            runner.validate(value, stage)

    def test_comparison_reports_all_invalid_evidence_in_one_repair(self):
        first, second = (self.pair[k]["conversation"] for k in ("english", "non_english"))
        stage = runner.judge_task(first, second, second, "conversation_quality", False, self.res)
        value = self.response(stage["data"])
        value["items"]["responsiveness"]["evidence"][0]["quote"] = "missing responsiveness"
        value["items"]["positivity_of_tone"]["evidence"][0]["quote"] = "missing positivity"
        with self.assertRaises(ValueError) as error:
            runner.validate(value, stage)
        self.assertIn("missing responsiveness", str(error.exception))
        self.assertIn("missing positivity", str(error.exception))

    def test_ties_insufficient_evidence_and_order_disagreement(self):
        group = "conversation_quality"
        def order(outcome):
            return dict(items={key: dict(outcome=outcome, reason="Reason", evidence=[]) for key in runner.GROUPS[group]}, limitations=[])
        for outcome in ("tie", "not_applicable", "insufficient_evidence"):
            result = runner.consolidate(group, dict(AB=order(outcome), BA=order(outcome)), ("en", "ta"))
            self.assertTrue(all(v["outcome"] == outcome and v["order_agreement"] == "agreed" for v in result.values()))
        result = runner.consolidate(group, dict(AB=order("A"), BA=order("A")), ("en", "ta"))
        self.assertTrue(all(v["outcome"] is None and v["order_agreement"] == "order_disagreement" for v in result.values()))
        result = runner.consolidate(group, dict(AB=order("A"), BA=None), ("en", "ta"))
        self.assertTrue(all(v["order_agreement"] == "missing" for v in result.values()))

    def test_extraction_failure_does_not_block_judging(self):
        original_mock = self.mock
        def call(messages, settings):
            data = json.loads(messages[1]["content"])
            if data["stage"] == "extraction" and data["evaluation_variant"] == "non_english_original":
                self.calls.append(copy.deepcopy(messages))
                return dict(text="{}")
            return original_mock(messages, settings)
        result = runner.evaluate_pair(self.pair, self.root / "output", self.res, self.settings, call=call)
        self.assertEqual(result["status"], "incomplete")
        self.assertIsNone(result["metrics"]["non_english_original"])
        self.assertEqual(sum(json.loads(m[1]["content"])["stage"] == "comparison" for m in self.calls), 4)
        runner.write_csv(self.root, [result])
        text = (self.root / "features.csv").read_text(encoding="utf-8-sig")
        self.assertIn("non_english_original,missing,errors,", text)

    def test_translation_review_failure_blocks_comparison(self):
        original_mock = self.mock
        def call(messages, settings):
            if json.loads(messages[1]["content"])["stage"] == "translation_review":
                self.calls.append(copy.deepcopy(messages))
                return dict(text="{}")
            return original_mock(messages, settings)
        result = runner.evaluate_pair(self.pair, self.root / "output", self.res, self.settings, call=call)
        self.assertEqual(result["status"], "incomplete")
        self.assertFalse(any(json.loads(m[1]["content"])["stage"] == "comparison" for m in self.calls))
        self.assertIsNone(result["metrics"]["reviewed_english"])

    def test_resume_reuses_and_invalidates_changed_dependencies(self):
        self.evaluate()
        self.calls.clear()
        self.evaluate(resume=True)
        self.assertEqual(self.calls, [])
        self.settings["judge"]["model"] = "mock/new-judge"
        self.evaluate(resume=True)
        self.assertEqual(len(self.calls), 4)
        self.calls.clear()
        self.res["prompts"]["extraction"] += "\nAdditional extraction instruction."
        self.evaluate(resume=True)
        self.assertEqual(len(self.calls), 3)

    def test_stage_fingerprints_cover_input_and_schema(self):
        stage = runner.extraction_task(self.pair["english"]["conversation"], "english_original", self.res)
        runner.execute(stage, self.root / "single", self.settings["extraction"], self.mock)
        for mutate in (lambda t: t["schema"].update(title="New schema"),
                       lambda t: t["data"].update(learner_context="New context")):
            new_task = copy.deepcopy(stage)
            mutate(new_task)
            new_task["messages"][1]["content"] = json.dumps(new_task["data"])
            self.calls.clear()
            runner.execute(new_task, self.root / "single", self.settings["extraction"], self.mock, resume=True)
            self.assertEqual(len(self.calls), 1)

    def test_invalid_cache_is_revalidated_and_preserved(self):
        self.evaluate()
        cache = self.root / "output" / "extract_english_original" / "validated.json"
        value = runner.shared.read_json(cache)
        value["instructional_features"]["questions"] = []
        runner.shared.save_json(cache, value)
        self.calls.clear()
        self.evaluate(resume=True)
        self.assertEqual(len(self.calls), 1)
        self.assertTrue((cache.parent / "rejected_cache_01.json").exists())

    def test_resume_carries_latest_rejected_proposal_and_feedback(self):
        stage = runner.extraction_task(self.pair["english"]["conversation"], "english_original", self.res)
        self.assertEqual(stage["data"]["rubric_version"], "3.0")
        def invalid(messages, settings):
            value = self.response(json.loads(messages[1]["content"]))
            value["instructional_features"]["questions"] = []
            return dict(text=json.dumps(value))
        folder = self.root / "failed-resume"
        with self.assertRaises(ValueError):
            runner.execute(stage, folder, self.settings["extraction"], invalid)
        runner.execute(stage, folder, self.settings["extraction"], self.mock, resume=True)
        messages = self.calls[-1]
        self.assertEqual([m["role"] for m in messages], ["system", "user", "assistant", "user"])
        self.assertIn("Missing question", messages[-1]["content"])

    def test_manually_modified_translation_json_and_markdown_are_preserved(self):
        for suffix in (".json", ".md"):
            with self.subTest(suffix=suffix):
                output = self.root / "manual" / suffix[1:]
                runner.evaluate_pair(self.pair, output, self.res, self.settings, call=self.mock)
                artifact = self.paths[1].with_name("conversation.comparative.english" + suffix)
                original = artifact.read_bytes()
                if suffix == ".json":
                    value = runner.shared.read_json(artifact)
                    value["messages"][0]["text"] = "Manual edit"
                    runner.shared.save_json(artifact, value)
                else:
                    artifact.write_text("Manual edit", encoding="utf-8")
                edited = artifact.read_bytes()
                result = runner.evaluate_pair(self.pair, output, self.res, self.settings, call=self.mock, resume=True)
                self.assertEqual(result["status"], "incomplete")
                self.assertEqual(artifact.read_bytes(), edited)
                artifact.write_bytes(original)

    def test_malformed_response_repairs_are_logged(self):
        stage = runner.extraction_task(self.pair["english"]["conversation"], "english_original", self.res)
        calls = []
        def call(messages, settings):
            calls.append(messages)
            return dict(text="not JSON") if len(calls) == 1 else self.mock(messages, settings)
        settings = dict(self.settings["extraction"], repair_attempts=1)
        runner.execute(stage, self.root / "repair", settings, call)
        self.assertEqual(len(calls), 2)
        self.assertEqual(len(list((self.root / "repair" / stage["name"]).glob("attempt_*.json"))), 2)
        self.assertFalse((self.root / "repair" / stage["name"] / "validation_error.json").exists())

    def test_rubric_wording_is_exact_and_groups_have_only_their_items(self):
        blocks = runner.rubric_blocks(self.res["guide"])
        for group, items in runner.GROUPS.items():
            prompt = self.res["prompts"][group]
            for key in items:
                self.assertIn(blocks[key], prompt)
            for key in set(runner.LABELS) - set(items):
                self.assertNotIn("#### " + runner.LABELS[key] + "\n", prompt)

    def test_dry_run_calls_no_models_and_creates_no_translations(self):
        def forbidden(*args):
            self.fail("Dry run called a model")
        result = runner.evaluate_pair(self.pair, self.root / "preview", self.res, self.settings, call=forbidden, dry_run=True)
        self.assertEqual(result["status"], "preview")
        self.assertEqual(len(list((self.root / "preview").glob("*/preview.json"))), 3)
        self.assertFalse(list(self.paths[1].parent.glob("*.comparative.english*")))
        self.assertEqual(len(result["awaiting_translation_or_review"]), 6)

    def test_cli_end_to_end_resume_and_model_overrides(self):
        output = self.root / "cli"
        args = [str(p) for p in self.paths] + ["--output", str(output), "--review-model", "mock/reviewer"]
        self.assertEqual(runner.main(args, call=self.mock), 0)
        self.assertEqual(len(self.calls), 9)
        manifest = runner.shared.read_json(output / "manifest.json")
        self.assertEqual(manifest["settings"]["review"]["model"], "mock/reviewer")
        self.assertTrue((output / "differences.csv").exists())
        self.assertTrue((output / "comparisons.csv").exists())
        self.calls.clear()
        self.assertEqual(runner.main(args + ["--resume"], call=self.mock), 0)
        self.assertEqual(self.calls, [])
        self.assertEqual(runner.main(args + ["--resume", "--judge-model", "mock/judge"], call=self.mock), 0)
        self.assertEqual(len(self.calls), 4)

    def test_failed_pair_does_not_stop_later_pairs(self):
        extra = [self.source("en2", "English", topic="second"), self.source("ta2", "Tamil", topic="second")]
        def call(messages, settings):
            data = json.loads(messages[1]["content"])
            if data["stage"] == "extraction" and data["conversation_id"] == "ta":
                raise RuntimeError("Mock extraction failure")
            return self.mock(messages, settings)
        output = self.root / "batch"
        self.assertEqual(runner.main([str(p) for p in self.paths + extra] + ["--output", str(output)], call=call), 1)
        statuses = runner.shared.read_json(output / "run_status.json")
        self.assertEqual(sorted(v["status"] for v in statuses.values()), ["complete", "incomplete"])

    def test_english_only_judge_never_receives_native_transcript(self):
        first, second = (copy.deepcopy(self.pair[k]["conversation"]) for k in ("english", "non_english"))
        second["messages"][0]["text"] = "NATIVE_TRANSCRIPT_SENTINEL"
        reviewed = copy.deepcopy(second)
        reviewed["messages"][0]["text"] = "Reviewed English text."
        reviewed["metadata"]["native_language"] = "English"
        for reverse in (False, True):
            stage = runner.judge_task(first, second, reviewed, "conversation_quality", reverse, self.res, "english-only")
            self.assertNotIn("NATIVE_TRANSCRIPT_SENTINEL", stage["messages"][1]["content"])
            self.assertEqual(sorted(list(c) for c in stage["data"]["candidates"].values()), [["original"], ["reviewed_english"]])
            self.assertIn("not direct judgments of the original", stage["messages"][0]["content"])
            runner.validate(self.response(stage["data"]), stage)

    def test_english_only_reuses_upstream_with_four_new_judge_calls(self):
        donor = self.root / "donor"
        runner.evaluate_pair(self.pair, donor / self.pair["pair_id"], self.res, self.settings, call=self.mock)
        original_report = (donor / self.pair["pair_id"] / "comparison.md").read_bytes()
        self.calls.clear()
        destination = self.root / "english-only"
        result = runner.evaluate_pair(self.pair, destination, self.res, self.settings, call=self.mock,
                                     comparison_mode="english-only", reuse_root=donor)
        self.assertEqual(result["status"], "complete")
        self.assertEqual(len(self.calls), 4)
        self.assertTrue(all(json.loads(m[1]["content"])["stage"] == "comparison" for m in self.calls))
        self.assertEqual(original_report, (donor / self.pair["pair_id"] / "comparison.md").read_bytes())
        self.assertEqual(result["order_mappings"]["AB"]["B"], "reviewed_english")
        self.assertEqual(len(list(destination.glob('*/reused_from.json'))), 5)
        report = (destination / "comparison.md").read_text(encoding="utf-8")
        self.assertIn("| Item | English original | Reviewed English | Reviewed minus English |", report)
        self.assertNotIn("### non_english_original", report)


if __name__ == "__main__":
    unittest.main()
