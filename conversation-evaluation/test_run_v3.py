"""Offline v3 integration and output validation tests."""
import copy
import csv
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

HERE = Path(__file__).resolve().parent
TAMIL_TOPIC = "\u0b9a\u0b95\u0baa\u0bcd\u0baa\u0bbf\u0ba3\u0bc8\u0baa\u0bcd\u0baa\u0bc1 \u0b86\u0bb0\u0bae\u0bcd"
TAMIL_QUESTION = "\u0b87\u0ba4\u0bc1 \u0b9a\u0bb0\u0bbf\u0baf\u0bbe?"
spec = importlib.util.spec_from_file_location("v3_pipeline", HERE / "run.py")
pipeline = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pipeline)


class V3Tests(unittest.TestCase):
    def setUp(self):
        for name, value in [("SCHEMA", HERE / "schemas/evaluator-v3.0.schema.json"), ("PROMPT", HERE / "prompts/evaluator-v3.0.md")]:
            replacement = patch.object(pipeline, name, value)
            replacement.start()
            self.addCleanup(replacement.stop)
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.source = self.root / "conversation.json"
        self.transcript = {
            "configuration": {
                "id": "evaporation__en", "topic_id": "evaporation", "topic_name": "Evaporation",
                "language": "English", "first_message": "Explain evaporation.",
                "system_prompts": {"tutor": "Teach a high school student.",
                                   "student": "SECRET_STUDENT_KNOWLEDGE_STATE"}},
            "status": "completed", "messages": [
                {"turn_id": "t1", "speaker": "tutor", "text": "Evaporation only occurs at boiling temperature. atom atom."},
                {"turn_id": "s1", "speaker": "student", "text": "What about wet clothes?"},
                {"turn_id": "t2", "speaker": "tutor", "text": "Correction: evaporation occurs below boiling temperature. Why do clothes dry faster in moving air?"}]}
        pipeline.save_json(self.source, self.transcript)
        self.conversation = pipeline.normalize(self.source)
        self.schema = pipeline.read_json(HERE / "schemas/evaluator-v3.0.schema.json")
        self.prompt = pipeline.PROMPT.read_text(encoding="utf-8")
        self.tasks = pipeline.tasks_for(self.conversation, "unused reference", self.schema, self.prompt)
        self.settings = pipeline.read_json(HERE / "config.json")
        self.settings["model"] = "test/evaluator"

    def span(self, **updates):
        value = dict(turn_id="t1", quote="atom", occurrence=2)
        value.update(updates)
        return value

    def result(self):
        rating = dict(status="scored", score=2, reason="Mixed performance.", evidence=[self.span()])
        pedagogical = {name: copy.deepcopy(rating) for name in
                       self.schema["properties"]["pedagogical_characteristics"]["properties"]}
        pedagogical["instructional_sequence"] = dict(value="Not determinable", reason="No example sequence.", evidence=[])
        features = {name: [] for name in self.schema["properties"]["instructional_features"]["properties"]}
        features["questions"] = [dict(question="Why do clothes dry faster in moving air?", question_type="Knowledge-checking",
                                      concept_checked="Effect of airflow", turn_locations=["t2"])]
        return dict(rubric_version="3.0", conversation_id="evaporation__en", learning_topic="Evaporation",
                    instructional_features=features,
                    pedagogical_characteristics=pedagogical,
                    conversation_quality={name: copy.deepcopy(rating) for name in
                                          self.schema["properties"]["conversation_quality"]["properties"]},
                    errors={"error": []}, verification_needed=[], limitations=[])

    def fake_call(self, messages, settings):
        self.assertEqual(messages[0]["content"], self.prompt)
        self.assertEqual(settings["response_format"]["type"], "json_schema")
        return dict(text=json.dumps(self.result()), usage={"total_tokens": 10})

    def test_single_call_topic_and_tutor_visible_context(self):
        self.assertEqual(len(self.tasks), 1)
        task = self.tasks[0]
        self.assertEqual(task["messages"][0]["content"], self.prompt)
        self.assertNotIn("OUTPUT JSON SCHEMA", task["messages"][0]["content"])
        data = json.loads(task["messages"][1]["content"])
        self.assertEqual(data["learning_topic"], "Evaporation")
        self.assertEqual(data["topic_id"], "evaporation")
        self.assertEqual(data["tutor_context"]["opening_request"], "Explain evaporation.")
        self.assertIn("high school", data["tutor_context"]["instruction"])
        self.assertEqual(len(data["messages"]), 3)
        self.assertNotIn("SECRET_STUDENT_KNOWLEDGE_STATE", json.dumps(task))

    def test_empty_ratings_repair_names_every_affected_item(self):
        value = self.result()
        value["conversation_quality"]["responsiveness"] = {}
        value["pedagogical_characteristics"]["coherence"] = {}
        with self.assertRaises(ValueError) as caught:
            pipeline.validate_stage(value, self.tasks[0])
        self.assertIn("conversation_quality.responsiveness", str(caught.exception))
        self.assertIn("pedagogical_characteristics.coherence", str(caught.exception))
        self.assertIn("status, score, reason, and evidence", str(caught.exception))

    def test_learning_topic_copies_supplied_context_without_an_objective(self):
        value = self.result()
        pipeline.validate_stage(value, self.tasks[0])
        value["learning_topic"] = None
        with self.assertRaisesRegex(ValueError, "Learning topic differs"):
            pipeline.validate_stage(value, self.tasks[0])
        value["learning_topic"] = "Understand evaporation"
        with self.assertRaisesRegex(ValueError, "Learning topic differs"):
            pipeline.validate_stage(value, self.tasks[0])
        value["learning_topic"] = "Evaporation"
        value["learning_objective"] = "Understand evaporation"
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_learning_topic_null_only_when_no_topic_is_supplied(self):
        task = copy.deepcopy(self.tasks[0])
        task["data"]["learning_topic"] = None
        value = self.result()
        value["learning_topic"] = None
        pipeline.validate_stage(value, task)
        value["learning_topic"] = "Evaporation"
        with self.assertRaisesRegex(ValueError, "Learning topic differs"):
            pipeline.validate_stage(value, task)

    def test_score_and_status_consistency(self):
        for status, score in [("scored", None), ("Not applicable", 2), ("Insufficient evidence", 1)]:
            value = self.result()
            value["conversation_quality"]["responsiveness"].update(status=status, score=score)
            with self.assertRaisesRegex(ValueError, "score"):
                pipeline.validate_stage(value, self.tasks[0])
        value["conversation_quality"]["responsiveness"].update(status="Insufficient evidence", score=None)
        pipeline.validate_stage(value, self.tasks[0])

    def test_exact_evidence_and_locations(self):
        value = self.result()
        pipeline.validate_stage(value, self.tasks[0])
        value["conversation_quality"]["responsiveness"]["evidence"][0]["occurrence"] = 3
        with self.assertRaisesRegex(ValueError, "Quote occurrence"):
            pipeline.validate_stage(value, self.tasks[0])
        value = self.result()
        value["instructional_features"]["examples"] = [dict(example="Wet clothes", concept_illustrated="Evaporation",
                                                               detail_level="Brief", turn_locations=["unknown"])]
        with self.assertRaisesRegex(ValueError, "tutor turns"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_empty_observation_locations_and_quotes_rejected(self):
        value = self.result()
        value["instructional_features"]["examples"] = [dict(example="Wet clothes", concept_illustrated="Evaporation",
                                                               detail_level="Brief", turn_locations=[])]
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, self.tasks[0])
        value = self.result()
        value["conversation_quality"]["responsiveness"]["evidence"][0]["quote"] = ""
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_questions_and_corrected_errors(self):
        value = self.result()
        question = "Why do clothes dry faster in moving air?"
        value["instructional_features"]["questions"] = [dict(question=question, question_type="Knowledge-checking", concept_checked="Airflow", turn_locations=["t2"])]
        value["errors"]["error"] = [dict(error="Evaporation limited to boiling", evidence="Evaporation only occurs at boiling temperature.",
                                         explanation="Evaporation also occurs below boiling temperature.",
                                         correction_status="Corrected in t2", turn_locations=["t1", "t2"])]
        pipeline.validate_stage(value, self.tasks[0])
        value["errors"]["error"][0]["evidence"] = "Invented incorrect statement"
        with self.assertRaisesRegex(ValueError, "exact question or error"):
            pipeline.validate_stage(value, self.tasks[0])
        value["errors"]["error"][0]["evidence"] = "Evaporation only occurs at boiling temperature."
        value["instructional_features"]["questions"][0]["question"] = "Invented question"
        with self.assertRaisesRegex(ValueError, "exact question or error"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_all_question_functions_are_recorded_with_their_types(self):
        task = copy.deepcopy(self.tasks[0])
        task["data"]["messages"][-1]["text"] += (
            " Have you understood? What is evaporation? Evaporation is a change from liquid to gas. "
            "Any questions? Have you understood?")
        value = self.result()
        value["instructional_features"]["questions"] = [
            dict(question="Why do clothes dry faster in moving air?", question_type="Knowledge-checking",
                 concept_checked="Effect of airflow", turn_locations=["t2"])] + [
            dict(question=question, question_type="Instructional", concept_checked=None, turn_locations=["t2"])
            for question in ("Have you understood?", "What is evaporation?", "Any questions?", "Have you understood?")]
        pipeline.validate_stage(value, task)
        pipeline.write_v3_report(self.root, value)
        report = (self.root / "report.md").read_text(encoding="utf-8")
        self.assertIn("**question_type**: Instructional", report)
        self.assertIn("**concept_checked**: null", report)

    def test_question_classification_and_concept_consistency(self):
        value = self.result()
        question = dict(question="Why do clothes dry faster in moving air?", question_type="Knowledge-checking",
                        concept_checked=None, turn_locations=["t2"])
        value["instructional_features"]["questions"] = [question]
        with self.assertRaisesRegex(ValueError, "Knowledge-checking questions need concept_checked"):
            pipeline.validate_stage(value, self.tasks[0])
        question.update(question_type="Instructional", concept_checked="Airflow")
        with self.assertRaisesRegex(ValueError, "Instructional questions must use concept_checked null"):
            pipeline.validate_stage(value, self.tasks[0])
        question.update(question_type="Instructional", concept_checked=None)
        pipeline.validate_stage(value, self.tasks[0])
        question["question_type"] = "Other"
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, self.tasks[0])
        question["question_type"] = "Instructional"
        question["turn_locations"] = ["t1", "t2"]
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_current_question_guidance_matches_the_item_guidebook(self):
        table = (HERE / "human-annotation/coding-guidebook.md").read_text(encoding="utf-8")
        row = next(line for line in table.splitlines() if line.startswith("| Questions |"))
        columns = [cell.strip() for cell in row.split("|")[1:-1]]
        prompt = (HERE / "prompts/evaluator-v3.md").read_text(encoding="utf-8")
        self.assertIn(columns[1], prompt)
        self.assertIn("Category: " + columns[2], prompt)
        self.assertIn("count from 1 to 1000", prompt)

    def test_omitted_rhetorical_and_table_questions_trigger_repair(self):
        task = copy.deepcopy(self.tasks[0])
        task["data"]["messages"][-1]["text"] += (
            "\n### What is evaporation?\nEvaporation is a change from liquid to gas.\n"
            "| Can a ruler measure bond length? | Explanation |\n")
        value = self.result()
        with self.assertRaises(ValueError) as caught:
            pipeline.validate_stage(value, task)
        self.assertIn("What is evaporation?", str(caught.exception))
        self.assertIn("Can a ruler measure bond length?", str(caught.exception))
        value["instructional_features"]["questions"] += [
            dict(question=q, question_type="Instructional", concept_checked=None, turn_locations=["t2"])
            for q in ("What is evaporation?", "Can a ruler measure bond length?")]
        pipeline.validate_stage(value, task)

    def test_question_mark_notation_is_not_required_as_a_question(self):
        task = copy.deepcopy(self.tasks[0])
        task["data"]["messages"][-1]["text"] += (
            "\n```python\nvalue = '?'\n```\nThe code `x ? a : b` is notation. "
            "https://example.org/?query=1 \\(x=?\\) The symbol '?' is punctuation.")
        pipeline.validate_stage(self.result(), task)

    def test_duplicate_question_occurrence_is_rejected(self):
        value = self.result()
        value["instructional_features"]["questions"] *= 2
        with self.assertRaisesRegex(ValueError, "Duplicate question occurrence"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_questions_in_separate_table_columns_are_separate_entries(self):
        task = copy.deepcopy(self.tasks[0])
        row = "| Can a ruler measure bond length? | Why? |"
        task["data"]["messages"][-1]["text"] += "\n" + row
        value = self.result()
        value["instructional_features"]["questions"].append(dict(
            question=row, question_type="Instructional", concept_checked=None, turn_locations=["t2"]))
        with self.assertRaisesRegex(ValueError, "Combined table questions"):
            pipeline.validate_stage(value, task)
        value["instructional_features"]["questions"].pop()
        value["instructional_features"]["questions"] += [
            dict(question=q, question_type="Instructional", concept_checked=None, turn_locations=["t2"])
            for q in ("Can a ruler measure bond length?", "Why?")]
        pipeline.validate_stage(value, task)

    def test_wrong_conversation_and_sequence(self):
        value = self.result()
        value["conversation_id"] = "another"
        with self.assertRaisesRegex(ValueError, "Conversation ID"):
            pipeline.validate_stage(value, self.tasks[0])
        value = self.result()
        value["pedagogical_characteristics"]["instructional_sequence"]["value"] = "Rule \u2192 Example"
        pipeline.validate_stage(value, self.tasks[0])
        value["pedagogical_characteristics"]["instructional_sequence"]["value"] = "Rule ? Example"
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.validate_stage(value, self.tasks[0])

    def test_api_schema_inlines_ratings_without_changing_validation(self):
        original = copy.deepcopy(self.schema)
        transmitted = pipeline.response_format(self.schema)["json_schema"]["schema"]
        self.assertNotIn('"$ref"', json.dumps(transmitted))
        self.assertNotIn("$defs", transmitted)
        self.assertEqual(self.schema, original)
        fields = transmitted["properties"]["conversation_quality"]["properties"]["responsiveness"]
        self.assertEqual(set(fields["required"]), {"status", "score", "reason", "evidence"})
        pipeline.schema_validate(self.result(), transmitted)
        invalid = self.result()
        invalid["conversation_quality"]["responsiveness"] = {}
        with self.assertRaisesRegex(ValueError, "Schema"):
            pipeline.schema_validate(invalid, transmitted)

    def test_nullable_score_uses_integer_bounds_for_gemini(self):
        transmitted = pipeline.response_format(self.schema)["json_schema"]["schema"]
        for group in ("pedagogical_characteristics", "conversation_quality"):
            for name, item in transmitted["properties"][group]["properties"].items():
                if name == "instructional_sequence":
                    continue
                score = item["properties"]["score"]
                self.assertEqual(score, {"type": ["integer", "null"], "minimum": 1, "maximum": 3})
                self.assertNotIn("enum", score)
                for valid in (1, 2, 3, None):
                    pipeline.schema_validate(valid, score)
                for invalid in (-1, 0, 4, 1.5, "2", True):
                    with self.assertRaises(ValueError):
                        pipeline.schema_validate(invalid, score)

    def test_provider_recorded_for_routing_diagnostics(self):
        import requests
        success = Mock(status_code=200)
        success.json.return_value = {"provider": "Google", "choices": [
            {"finish_reason": "stop", "message": {"content": "{}"}}]}
        with patch.dict(pipeline.os.environ, {"OPENROUTER_API_KEY": "test-key"}), patch.object(requests, "post", return_value=success):
            result = pipeline.request_api([], self.settings)
        self.assertEqual(result["provider"], "Google")

    def test_transport_sends_schema_and_requires_support(self):
        import requests
        success = Mock(status_code=200)
        success.json.return_value = {"choices": [{"finish_reason": "stop", "message": {"content": "{}"}}]}
        settings = dict(self.settings, response_format=pipeline.response_format(self.schema))
        with patch.dict(pipeline.os.environ, {"OPENROUTER_API_KEY": "test-key"}), patch.object(requests, "post", return_value=success) as post:
            pipeline.request_api(self.tasks[0]["messages"], settings)
        body = post.call_args.kwargs["json"]
        self.assertEqual(body["response_format"]["json_schema"]["schema"], pipeline.response_format(self.schema)["json_schema"]["schema"])
        self.assertTrue(body["response_format"]["json_schema"]["strict"])
        self.assertTrue(body["provider"]["require_parameters"])

    def test_dry_run_end_to_end_and_resume(self):
        output = self.root / "dry"
        args = [str(self.source), "--output", str(output), "--model", "test/evaluator"]
        self.assertEqual(pipeline.main(args + ["--dry-run"], lambda *_: self.fail("Dry run called API")), 0)
        record = pipeline.read_json(output / "run_status.json")[0]
        self.assertEqual(len(pipeline.read_json(output / "run_status.json")), 1)
        self.assertEqual(record["planned_calls"], 1)
        preview = pipeline.read_json(Path(record["folder"]) / "conversation/preview.json")
        self.assertEqual(preview["response_format"]["type"], "json_schema")
        self.assertEqual(pipeline.main(args + ["--resume"], self.fake_call), 0)
        result = pipeline.read_json(Path(record["folder"]) / "evaluation.json")
        pipeline.schema_validate(result, self.schema)
        self.assertNotIn("explanation_evaluations", result)
        self.assertEqual(result["learning_topic"], "Evaporation")
        self.assertNotIn("learning_objective", result)
        report = (Path(record["folder"]) / "report.md").read_text(encoding="utf-8")
        self.assertIn("Learning topic: Evaporation", report)
        self.assertNotIn("Learning objective:", report)
        self.assertIn("Information Load Appropriateness", report)
        self.assertIn("Verification needed", report)
        summary = (output / "summary.csv").read_text(encoding="utf-8-sig")
        self.assertIn("instructional_sequence", summary)
        self.assertIn("positivity_of_tone", summary)
        self.assertEqual(pipeline.main(args + ["--resume"], lambda *_: self.fail("Resume called API")), 0)

    def test_quote_candidates_preserve_original_formatting_and_occurrence(self):
        source = "**Water** changes  into vapour. **Water** changes  into vapour."
        candidates = pipeline.exact_quote_candidates(source, "Water changes into vapour.")
        self.assertEqual(candidates, [dict(quote="Water** changes  into vapour.", occurrence=1)])
        self.assertIn(candidates[0]["quote"], source)
        self.assertEqual(pipeline.exact_quote_candidates(source, "Water freezes into vapour."), [])

    def test_noncontiguous_candidates_remain_separate(self):
        source = "The first explanation. Other content. The second explanation."
        candidates = pipeline.exact_quote_candidates(source, "first explanation...second explanation")
        self.assertEqual(len(candidates), 2)
        self.assertTrue(all(c["quote"] in source for c in candidates))

    def test_all_invalid_quotes_reported_together(self):
        value = self.result()
        value["conversation_quality"]["responsiveness"]["evidence"] = [
            self.span(quote="first invented quotation"), self.span(quote="second invented quotation")]
        with self.assertRaises(ValueError) as caught:
            pipeline.validate_stage(value, self.tasks[0])
        self.assertIn("first invented quotation", str(caught.exception))
        self.assertIn("second invented quotation", str(caught.exception))

    def test_resume_continues_rejected_output_with_all_quote_errors(self):
        folder = self.root / "rejected"
        value = self.result()
        value["conversation_quality"]["responsiveness"]["evidence"] = [self.span(quote="invented quotation")]
        pipeline.save_json(folder / "conversation/attempt_01.json", {
            "messages": self.tasks[0]["messages"], "response": {"text": json.dumps(value)}})
        def call(messages, settings):
            self.assertEqual(messages[-2]["role"], "assistant")
            self.assertIn("invented quotation", messages[-1]["content"])
            return dict(text=json.dumps(self.result()))
        pipeline.run_stage(self.tasks[0], folder, self.settings, call, resume=True)
        self.assertTrue((folder / "conversation/attempt_02.json").exists())

    def test_resume_keeps_latest_proposal_without_accumulating_old_repairs(self):
        folder = self.root / "long-repair-history"
        value = self.result()
        value["conversation_quality"]["responsiveness"]["evidence"] = [self.span(quote="invented quotation")]
        latest = json.dumps(value)
        old_messages = self.tasks[0]["messages"] + [
            {"role": "assistant", "content": "obsolete rejected output"},
            {"role": "user", "content": "obsolete repair feedback"}]
        pipeline.save_json(folder / "conversation/attempt_01.json", {
            "messages": old_messages, "response": {"text": latest}})
        def call(messages, settings):
            self.assertEqual(messages[:2], self.tasks[0]["messages"])
            self.assertEqual(len(messages), 4)
            self.assertEqual(messages[-2]["content"], latest)
            self.assertIn("invented quotation", messages[-1]["content"])
            return dict(text=json.dumps(self.result()))
        pipeline.run_stage(self.tasks[0], folder, self.settings, call, resume=True)

    def tamil_source(self):
        transcript = copy.deepcopy(self.transcript)
        transcript["configuration"].update(language="Tamil", topic_name=TAMIL_TOPIC)
        transcript["messages"][0]["text"] = TAMIL_TOPIC + " 74 pm. atom atom."
        transcript["messages"][1]["text"] = TAMIL_QUESTION
        pipeline.save_json(self.source, transcript)
        return pipeline.normalize(self.source)

    def translation_call(self, messages, settings):
        data = json.loads(messages[1]["content"])
        if data["stage"] == "translation":
            mapping = {TAMIL_TOPIC: "Covalent radius",
                       TAMIL_TOPIC + " 74 pm. atom atom.": "The covalent radius is 74 pm. atom atom.",
                       TAMIL_QUESTION: "Is that correct?"}
            value = {"segments": [dict(id=segment["id"], text=mapping.get(segment["text"], segment["text"]))
                                  for segment in data["segments"]]}
        else:
            self.assertEqual(data["language"], "English")
            self.assertEqual(data["original_language"], "Tamil")
            self.assertIn("74 pm", data["messages"][0]["text"])
            self.assertNotIn(TAMIL_TOPIC, json.dumps(data["messages"], ensure_ascii=False))
            value = self.result()
            value["conversation_id"] = data["conversation_id"]
            value["learning_topic"] = data["learning_topic"]
        return dict(text=json.dumps(value), usage={})

    def test_translation_rejects_changed_ids_numbers_and_math(self):
        conversation = self.tamil_source()
        conversation["messages"][0]["text"] += " \\(n\\lambda=2d\\sin(\\theta)\\)"
        task = pipeline.translation_task(conversation, pipeline.TRANSLATION_PROMPT.read_text(encoding="utf-8"))
        value = dict(segments=copy.deepcopy(task["data"]["segments"]))
        pipeline.validate_stage(value, task)
        bad = copy.deepcopy(value)
        bad["segments"].reverse()
        with self.assertRaisesRegex(ValueError, "IDs or order"):
            pipeline.validate_stage(bad, task)
        bad = copy.deepcopy(value)
        bad["segments"][0]["text"] = bad["segments"][0]["text"].replace("74", "37")
        with self.assertRaisesRegex(ValueError, "numbers"):
            pipeline.validate_stage(bad, task)
        bad = copy.deepcopy(value)
        bad["segments"][0]["text"] = bad["segments"][0]["text"].replace("lambda", "mu")
        with self.assertRaisesRegex(ValueError, "LaTeX"):
            pipeline.validate_stage(bad, task)
        self.assertNotIn("SECRET_STUDENT_KNOWLEDGE_STATE", json.dumps(task))

    def test_translation_dry_run_waits_for_translation_without_writing_source(self):
        self.tamil_source()
        source_text = self.source.read_text(encoding="utf-8")
        output = self.root / "translation-dry"
        args = [str(self.source), "--dry-run", "--output", str(output), "--model", "test/evaluator", "--evaluation-mode", "translated"]
        self.assertEqual(pipeline.main(args, lambda *_: self.fail("Dry run called API")), 0)
        record = pipeline.read_json(output / "run_status.json")[0]
        self.assertEqual(record["planned_calls"], 2)
        folder = Path(record["folder"])
        self.assertTrue((folder / "translation/preview.json").exists())
        self.assertEqual(pipeline.read_json(folder / "conversation/preview.json")["status"], "awaiting_translation")
        self.assertFalse(self.source.with_name("conversation.english.json").exists())
        self.assertEqual(self.source.read_text(encoding="utf-8"), source_text)

    def test_translation_precedes_evaluation_and_saves_beside_source(self):
        self.tamil_source()
        original_bytes = self.source.read_bytes()
        output = self.root / "translated-evaluation"
        stages = []
        def call(messages, settings):
            stages.append(json.loads(messages[1]["content"])["stage"])
            return self.translation_call(messages, settings)
        args = [str(self.source), "--output", str(output), "--model", "test/evaluator", "--evaluation-mode", "translated"]
        self.assertEqual(pipeline.main(args, call), 0)
        self.assertEqual(stages, ["translation", "conversation"])
        path = self.source.with_name("conversation.english.json")
        value = pipeline.read_json(path)
        self.assertEqual(path.parent, self.source.parent)
        self.assertEqual(value["metadata"]["native_language"], "English")
        self.assertEqual(value["learning_topic"], "Covalent radius")
        self.assertNotEqual(value["conversation_id"], pipeline.normalize(self.source)["conversation_id"])
        self.assertEqual(value["source_conversation_id"], pipeline.normalize(self.source)["conversation_id"])
        record = pipeline.read_json(output / "run_status.json")[0]
        evaluation = pipeline.read_json(Path(record["folder"]) / "evaluation.json")
        self.assertEqual(evaluation["learning_topic"], "Covalent radius")
        self.assertIn("74 pm", value["messages"][0]["text"])
        self.assertEqual([m["turn_id"] for m in value["messages"]], [m["turn_id"] for m in self.transcript["messages"]])
        self.assertTrue(path.with_suffix(".md").exists())
        self.assertEqual(self.source.read_bytes(), original_bytes)
        self.assertEqual(pipeline.main(args + ["--resume"], lambda *_: self.fail("Resume called API")), 0)
        second_output = self.root / "translation-cache"
        self.assertEqual(pipeline.main([str(self.source), "--output", str(second_output), "--model", "test/evaluator", "--evaluation-mode", "translated"],
                                      lambda messages, settings: self.translation_call(messages, settings)
                                      if json.loads(messages[1]["content"])["stage"] == "conversation" else self.fail("Cached translation was regenerated")), 0)

    def test_translation_failure_prevents_evaluation_and_source_artifacts(self):
        self.tamil_source()
        output = self.root / "failed-translation"
        stages = []
        def call(messages, settings):
            stages.append(json.loads(messages[1]["content"])["stage"])
            return dict(text='{"segments": []}')
        self.assertEqual(pipeline.main([str(self.source), "--output", str(output), "--model", "test/evaluator", "--evaluation-mode", "translated"], call), 1)
        self.assertTrue(all(stage == "translation" for stage in stages))
        self.assertFalse(self.source.with_name("conversation.english.json").exists())

    def test_modified_translation_cache_is_preserved(self):
        self.tamil_source()
        output = self.root / "good-translation"
        self.assertEqual(pipeline.main([str(self.source), "--output", str(output), "--model", "test/evaluator", "--evaluation-mode", "translated"], self.translation_call), 0)
        path = self.source.with_name("conversation.english.json")
        value = pipeline.read_json(path)
        value["messages"][0]["text"] = "Manually edited translation."
        pipeline.save_json(path, value)
        before = path.read_bytes()
        self.assertEqual(pipeline.main([str(self.source), "--output", str(self.root / "changed-cache"), "--model", "test/evaluator", "--evaluation-mode", "translated"],
                                      lambda *_: self.fail("Modified cache triggered API")), 1)
        self.assertEqual(path.read_bytes(), before)

    def test_repair_and_invalid_cache(self):
        folder = self.root / "repair"
        calls = []
        def call(messages, settings):
            calls.append(settings)
            value = self.result()
            if len(calls) == 1:
                value["conversation_quality"]["responsiveness"]["score"] = None
            return dict(text=json.dumps(value))
        pipeline.run_stage(self.tasks[0], folder, self.settings, call)
        self.assertEqual(len(calls), 2)
        self.assertTrue(all(c["response_format"]["json_schema"]["strict"] for c in calls))
        pipeline.save_json(folder / "conversation/validated.json", {})
        pipeline.run_stage(self.tasks[0], folder, self.settings, self.fake_call, resume=True)
        self.assertTrue((folder / "conversation/rejected_cache.json").exists())

    def original_call(self, messages, settings):
        data = json.loads(messages[1]["content"])
        self.assertEqual(data["evaluation_variant"], "original")
        self.assertEqual(data["language"], "Tamil")
        self.assertEqual(data["messages"], pipeline.normalize(self.source)["messages"])
        value = self.result()
        value["learning_topic"] = data["learning_topic"]
        return dict(text=json.dumps(value), usage={})

    def test_both_versions_are_independent_and_resume_separately(self):
        self.tamil_source()
        stages = []
        def call(messages, settings):
            data = json.loads(messages[1]["content"])
            stages.append((data["stage"], data.get("evaluation_variant")))
            if data.get("evaluation_variant") == "original":
                return self.original_call(messages, settings)
            self.assertNotIn('"pedagogical_characteristics"', messages[1]["content"])
            return self.translation_call(messages, settings)
        output = self.root / "both"
        args = [str(self.source), "--output", str(output), "--model", "test/evaluator"]
        self.assertEqual(pipeline.main(args, call), 0)
        self.assertEqual(stages, [("conversation", "original"), ("translation", None), ("conversation", "translated")])
        records = pipeline.read_json(output / "run_status.json")
        self.assertEqual([r["evaluation_language"] for r in records], ["Tamil", "English"])
        self.assertEqual([Path(r["folder"]).name for r in records], ["original", "translated"])
        original = pipeline.read_json(Path(records[0]["folder"]) / "evaluation-source.json")
        translated = pipeline.read_json(Path(records[1]["folder"]) / "evaluation-source.json")
        self.assertNotEqual(original["messages"][0]["text"], translated["messages"][0]["text"])
        self.assertFalse(any("translation fidelity" in x for x in original["limitations"]))
        self.assertTrue(any("translation fidelity" in x for x in translated["limitations"]))
        comparison = Path(records[0]["folder"]).parent / "comparison.md"
        self.assertTrue(comparison.exists())
        self.assertIn("Original and translated evaluation", comparison.read_text(encoding="utf-8"))
        with (output / "summary.csv").open(encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual({(r["evaluation_variant"], r["evaluation_language"]) for r in rows},
                         {("original", "Tamil"), ("translated", "English")})
        self.assertEqual(pipeline.main(args + ["--resume"], lambda *_: self.fail("Resume called API")), 0)
        self.assertEqual(pipeline.main(args + ["--resume", "--evaluation-mode", "original"],
                                      lambda *_: self.fail("Changed mode called API")), 1)

    def test_original_mode_does_not_translate(self):
        self.tamil_source()
        output = self.root / "original-only"
        self.assertEqual(pipeline.main([str(self.source), "--output", str(output), "--model", "test/evaluator",
                                      "--evaluation-mode", "original"], self.original_call), 0)
        records = pipeline.read_json(output / "run_status.json")
        self.assertEqual(len(records), 1)
        self.assertEqual(records[0]["planned_calls"], 1)
        self.assertFalse(self.source.with_name("conversation.english.json").exists())
        self.assertFalse((Path(records[0]["folder"]) / "translation").exists())

    def test_both_dry_run_previews_original_and_waits_for_translation(self):
        self.tamil_source()
        output = self.root / "both-dry"
        self.assertEqual(pipeline.main([str(self.source), "--dry-run", "--output", str(output), "--model", "test/evaluator"],
                                      lambda *_: self.fail("Dry run called API")), 0)
        records = pipeline.read_json(output / "run_status.json")
        self.assertEqual(len(records), 2)
        first = pipeline.read_json(Path(records[0]["folder"]) / "conversation/preview.json")
        second = pipeline.read_json(Path(records[1]["folder"]) / "conversation/preview.json")
        self.assertEqual(json.loads(first["messages"][1]["content"])["evaluation_variant"], "original")
        self.assertEqual(second["status"], "awaiting_translation")
        self.assertFalse(self.source.with_name("conversation.english.json").exists())

    def test_failed_translation_keeps_completed_original(self):
        self.tamil_source()
        output = self.root / "both-translation-failure"
        def call(messages, settings):
            data = json.loads(messages[1]["content"])
            if data.get("evaluation_variant") == "original":
                return self.original_call(messages, settings)
            self.assertEqual(data["stage"], "translation")
            return dict(text='{"segments": []}')
        self.assertEqual(pipeline.main([str(self.source), "--output", str(output), "--model", "test/evaluator"], call), 1)
        records = pipeline.read_json(output / "run_status.json")
        self.assertEqual([r["status"] for r in records], ["completed", "failed"])
        self.assertTrue((Path(records[0]["folder"]) / "evaluation.json").exists())
        self.assertFalse((Path(records[1]["folder"]) / "evaluation.json").exists())

    def test_native_evidence_is_checked_against_native_text(self):
        original = self.tamil_source()
        task = pipeline.tasks_for(original, "", self.schema, self.prompt)[0]
        value = self.result()
        value["learning_topic"] = original["learning_topic"]
        value["conversation_quality"]["responsiveness"]["evidence"] = [
            self.span(quote=original["messages"][0]["text"], occurrence=1)]
        pipeline.validate_stage(value, task)
        value["conversation_quality"]["responsiveness"]["evidence"][0]["quote"] = "The covalent radius is 74 pm."
        with self.assertRaisesRegex(ValueError, "Quote occurrence"):
            pipeline.validate_stage(value, task)

    def test_failed_original_does_not_block_translated_evaluation(self):
        self.tamil_source()
        output = self.root / "both-original-failure"
        def call(messages, settings):
            data = json.loads(messages[1]["content"])
            if data.get("evaluation_variant") == "original":
                return dict(text="{}")
            return self.translation_call(messages, settings)
        self.assertEqual(pipeline.main([str(self.source), "--output", str(output), "--model", "test/evaluator"], call), 1)
        records = pipeline.read_json(output / "run_status.json")
        self.assertEqual([r["status"] for r in records], ["failed", "completed"])
        self.assertTrue((Path(records[1]["folder"]) / "evaluation.json").exists())


if __name__ == "__main__":
    unittest.main()
