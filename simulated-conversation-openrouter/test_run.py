import asyncio
import importlib.util
import json
import tempfile
import unittest
from unittest.mock import patch, Mock, AsyncMock
from types import SimpleNamespace
from pathlib import Path

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("simulator", HERE / "run.py")
runner = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runner)


class SimulationTests(unittest.TestCase):
    def setUp(self):
        self.relevance_patch = patch.object(runner, "check_relevance", new_callable=AsyncMock)
        self.relevance_mock = self.relevance_patch.start()
        self.relevance_mock.return_value = dict(status="completed", off_topic=False, reason="Related.")
        self.addCleanup(self.relevance_patch.stop)
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.catalog = {"models": [{"id": "tutor", "litellm_model": "vertex_ai/claude-sonnet-5"},
                                   {"id": "student", "litellm_model": "gemini/gemini-3.8-flash"}]}
        self.settings = {"topics": ["test-topic"], "languages": {"en": "English"},
                         "tutor_model": "tutor", "tutor_reasoning": "none",
                         "student_model": "student", "student_reasoning": "medium"}
        runner.api.write_json(self.root / "run.json", self.settings)
        runner.api.write_json(self.root / "topic.json", [
            {"topic_id": "test-topic", "terminology": {"en": "test topic"}}])
        runner.api.write_json(self.root / "student-prompt.json", {
            "defaults": {"persona": "You are a student learning {topic_name} in {language}."}})
        runner.api.write_json(self.root / "first-message.json", [
            {"lang_id": "en", "prompt": "Explain {topic} in {language}."}])
        (self.root / "tutor-prompt.md").write_text("Explain {topic_name} in {language}.")

    def test_relevance_decisions_and_failures(self):
        self.relevance_patch.stop()
        self.add_followup()
        cases = [
            ("off-topic", {"off_topic": True, "reason": "Discusses unrelated sports."}, "stopped_off_topic", 1),
            ("prerequisite", {"off_topic": False, "reason": "Explains relevant prerequisites."}, "completed", 3),
            ("uncertain", {"off_topic": False, "reason": "Connection is uncertain."}, "completed", 3),
            ("invalid", {"off_topic": "true", "reason": "Wrong type."}, "failed", 1),
            ("malformed", "not JSON", "failed", 1),
            ("api-failure", None, "failed", 1),
            ("incomplete", {"off_topic": True, "reason": "Partial verdict."}, "failed", 1),
        ]
        for name, verdict, status, message_count in cases:
            with self.subTest(case=name):
                conversation = self.prepare()
                calls = []
                async def call(**kwargs):
                    calls.append(kwargs)
                    is_check = kwargs.get("instructions") == runner.RELEVANCE_PROMPT
                    if is_check and verdict is None:
                        raise RuntimeError("Checker unavailable")
                    text = (verdict if isinstance(verdict, str) else json.dumps(verdict)) if is_check else "Tutor or student text"
                    return {"status": "incomplete" if is_check and name == "incomplete" else "completed",
                            "output": [{"type": "message", "content": [{"type": "output_text", "text": text}]}]}
                folder = self.root / name
                success = asyncio.run(runner.simulate(conversation, folder, self.catalog, 10, call))
                self.assertEqual(success, status != "failed")
                record = runner.api.read_json(folder / "conversation.json")
                self.assertEqual(record["status"], status)
                self.assertEqual(len(record["messages"]), message_count)
                self.assertEqual(len(calls), 4 if status == "completed" else 2)
                self.assertEqual(calls[1]["model"], "gemini/gemini-3.8-flash")
                self.assertEqual(calls[1]["reasoning"], {"effort": "medium"})
                data = json.loads(calls[1]["input"][0]["content"])
                self.assertEqual(data["student_message"], conversation["first_message"])
                self.assertEqual(data["tutor_response"], "Tutor or student text")
                self.assertNotIn("You are a student", calls[1]["instructions"])
                self.assertTrue((folder / "checks/01-relevance.json").exists())
                if status == "completed":
                    self.assertEqual(len(calls[2]["input"]), 1)
                else:
                    self.assertFalse((folder / "turns/02-student").exists())
                if status == "stopped_off_topic":
                    self.assertIn(verdict["reason"], (folder / "conversation.md").read_text())

    def test_fenced_relevance_json(self):
        self.relevance_patch.stop()
        conversation = self.prepare()
        for index, (off_topic, fence) in enumerate([
            (False, "json"), (True, "json"), (False, ""), (False, "JSON")
        ]):
            with self.subTest(off_topic=off_topic, fence=fence):
                verdict = {"off_topic": off_topic, "reason": "A reason containing {braces}."}
                text = "  \n```" + fence + "\r\n" + json.dumps(verdict) + "\r\n```\n "
                async def call(**kwargs):
                    return {"output": [{"type": "message", "content": [
                        {"type": "output_text", "text": text}]}]}
                result = asyncio.run(runner.check_relevance(
                    conversation, "Tutor reply", self.root / str(index), 10, call))
                self.assertEqual(result, dict(status="completed", **verdict))

    def test_openrouter_relevance_check_with_tamil_data(self):
        self.relevance_patch.stop()
        conversation = self.prepare()
        conversation.update(topic_name="\u0b87\u0ba3\u0bc8\u0baa\u0bcd\u0baa\u0bc1", language="Tamil", first_message="\u0bb5\u0bbf\u0bb3\u0b95\u0bcd\u0b95\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd")
        conversation["models"]["student"] = conversation["models"]["tutor"]
        calls = []
        async def call(**kwargs):
            calls.append(kwargs)
            return {"output": [{"type": "message", "content": [{"type": "output_text",
                "text": json.dumps({"off_topic": False, "reason": "Related Tamil explanation."})}]}]}
        verdict = asyncio.run(runner.check_relevance(conversation, "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd \u0baa\u0ba4\u0bbf\u0bb2\u0bcd", self.root / "checks", 10, call))
        self.assertFalse(verdict["off_topic"])
        self.assertEqual(calls[0]["messages"][0], {"role": "system", "content": runner.RELEVANCE_PROMPT})
        data = json.loads(calls[0]["messages"][1]["content"])
        self.assertEqual(data["tutor_response"], "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd \u0baa\u0ba4\u0bbf\u0bb2\u0bcd")
        self.assertEqual(data["topic"], "\u0b87\u0ba3\u0bc8\u0baa\u0bcd\u0baa\u0bc1")
        self.assertEqual(calls[0]["reasoning"], {"enabled": False})

    def add_followup(self):
        runner.api.write_json(self.root / "topic.json", [{
            "topic_id": "test-topic", "terminology": {"en": "test topic"},
            "student_turns": ["Explain more."]}])

    def test_invalid_first_messages(self):
        for entries in ([], {}, [{"lang_id": "ta", "prompt": "Hello"}],
                        [{"lang_id": "en", "prompt": " "}],
                        [{"lang_id": "en", "prompt": "Hi"}] * 2):
            with self.subTest(entries=entries):
                runner.api.write_json(self.root / "first-message.json", entries)
                with self.assertRaisesRegex(ValueError, "first-message.json"):
                    self.prepare()

    def test_opening_only_requires_checker_credentials(self):
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "router-key"}, clear=True):
            with self.assertRaisesRegex(ValueError, "Missing GEMINI_API_KEY"):
                runner.check_dependencies([self.prepare()])

    def prepare(self):
        return runner.prepare(self.root, self.catalog, self.root / "run.json")[1][0]

    def test_tutor_opening_uses_first_message_as_instruction(self):
        conversation = self.prepare()
        self.assertEqual(conversation["speaker_order"], ["tutor", "student", "tutor"])
        self.assertEqual(conversation["system_prompts"]["tutor"], "Explain test topic in English.")
        self.assertEqual(conversation["first_message"], "Explain test topic in English.")
        self.assertEqual(conversation["turn_instructions"], [])
        self.assertNotIn("only turn", conversation["system_prompts"]["student"])

    def test_topic_followups_and_history(self):
        runner.api.write_json(self.root / "topic.json", [{
            "topic_id": "test-topic", "terminology": {"en": "test topic"},
            "student_knowledge_state": "I am new to {topic_name}.",
            "student_turns": ["How is {topic_name} measured?", "Why does it matter?"]}])
        conversation = self.prepare()
        self.assertIn("I am new to test topic.", conversation["system_prompts"]["student"])
        calls = []
        async def call(**kwargs):
            calls.append(kwargs)
            return {"status": "completed", "output": [{"type": "message", "content": [
                {"type": "output_text", "text": f"Reply {len(calls)}"}]}]}
        folder = self.root / "output"
        self.assertTrue(asyncio.run(runner.simulate(conversation, folder, self.catalog, 10, call)))
        record = runner.api.read_json(folder / "conversation.json")
        self.assertEqual([m["speaker"] for m in record["messages"]], ["tutor"] + ["student", "tutor"] * 2)
        self.assertEqual([m["round"] for m in record["messages"]], [1, 2, 2, 3, 3])
        self.assertEqual(len(calls), 5)
        opening = conversation["first_message"]
        self.assertEqual(record["messages"][0]["text"], "Reply 1")
        self.assertEqual(calls[0]["messages"][-1], {"role": "user", "content": opening})
        self.assertTrue((folder / "turns/01-tutor").exists())
        self.assertIn("How is test topic measured?", calls[1]["instructions"])
        self.assertIn("Why does it matter?", calls[3]["instructions"])
        self.assertNotIn("Why does it matter?", calls[1]["instructions"])
        self.assertNotIn("How is test topic measured?", calls[3]["instructions"])
        self.assertEqual(calls[1]["input"], [{"role": "user", "content": "Reply 1"}])
        self.assertEqual(calls[2]["messages"][1:], [
            {"role": "assistant", "content": "Reply 1"}, {"role": "user", "content": "Reply 2"}])
        self.assertTrue((folder / "turns/03-tutor/03-tutor.json").exists())
        self.assertEqual(record["status"], "completed")

    def test_invalid_turns(self):
        for turns in (None, "question", [""], ["  "], [1]):
            with self.subTest(turns=turns):
                runner.api.write_json(self.root / "topic.json", [{
                    "topic_id": "test-topic", "terminology": {"en": "test topic"},
                    "student_turns": turns}])
                with self.assertRaisesRegex(ValueError, "student_turns"):
                    self.prepare()

    def test_tutor_failure_preserves_empty_transcript(self):
        async def call(**kwargs):
            raise RuntimeError("test failure")
        folder = self.root / "output"
        self.assertFalse(asyncio.run(runner.simulate(self.prepare(), folder, self.catalog, 10, call)))
        record = runner.api.read_json(folder / "conversation.json")
        self.assertEqual(record["status"], "failed")
        self.assertEqual(len(record["messages"]), 0)
        self.assertEqual(record["failed_turn"], "01-tutor")

    def test_student_failure_preserves_opening_exchange(self):
        self.add_followup()
        calls = []
        async def call(**kwargs):
            calls.append(kwargs)
            if len(calls) == 2:
                raise RuntimeError("student failed")
            return {"output": [{"type": "message", "content": [
                {"type": "output_text", "text": "Opening question"}]}]}
        folder = self.root / "output"
        self.assertFalse(asyncio.run(runner.simulate(self.prepare(), folder, self.catalog, 10, call)))
        record = runner.api.read_json(folder / "conversation.json")
        self.assertEqual(record["failed_turn"], "02-student")
        self.assertEqual([m["speaker"] for m in record["messages"]], ["tutor"])

    def test_maverick_omits_unsupported_reasoning(self):
        conversation = self.prepare()
        conversation["models"]["tutor"] = {
            "resolved_model": "meta-llama/llama-4-maverick",
            "reasoning": "none"}
        request = runner.request_for(conversation, [], "tutor", 0)
        self.assertNotIn("reasoning", request)
        self.assertNotIn("thinking", request)
        self.assertEqual(request["messages"], [
            {"role": "system", "content": conversation["system_prompts"]["tutor"]},
            {"role": "user", "content": conversation["first_message"]}])
        self.assertNotIn("instructions", request)
        conversation["models"]["tutor"]["reasoning"] = "medium"
        with self.assertRaisesRegex(ValueError, "does not support reasoning effort"):
            runner.request_for(conversation, [], "tutor", 0)

    def test_provider_sort_reaches_openrouter_request(self):
        self.settings["tutor_provider_sort"] = "throughput"
        runner.api.write_json(self.root / "run.json", self.settings)
        conversation = self.prepare()
        request = runner.request_for(conversation, [], "tutor", 0)
        self.assertEqual(request["provider"], {"sort": "throughput"})
        self.assertEqual(request["model"], "anthropic/claude-sonnet-5")
        self.assertNotIn("provider_sort", conversation["models"]["student"])
        response = Mock(status_code=200)
        response.json.return_value = {"choices": [{"finish_reason": "stop", "message": {"content": "Hello"}}]}
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "test-key"}), patch("requests.post", return_value=response) as post:
            asyncio.run(runner.openrouter_call(timeout=10, **request))
        self.assertEqual(post.call_args.kwargs["json"]["provider"], {"sort": "throughput"})

    def test_invalid_provider_sort(self):
        for key, value in (("tutor_provider_sort", "fast"), ("student_provider_sort", "throughput")):
            with self.subTest(key=key):
                runner.api.write_json(self.root / "run.json", {**self.settings, key: value})
                with self.assertRaisesRegex(ValueError, "provider_sort"):
                    self.prepare()

    def test_model_resolution(self):
        catalog = runner.api.read_json(runner.ROOT / "data/models.json")
        self.assertEqual(runner.resolve_model("llama-4-maverick", catalog),
                         "meta-llama/llama-4-maverick")
        self.assertEqual(runner.resolve_model("grok-4.3", catalog), "x-ai/grok-4.3")
        self.assertEqual(runner.resolve_model("openrouter/google/gemini-3.8-flash", catalog),
                         "google/gemini-3.8-flash")
        with self.assertRaises(ValueError):
            runner.resolve_model("unknown", catalog)

    def test_openrouter_transport_and_response(self):
        raw = {"choices": [{"finish_reason": "stop", "message": {"content": "Hello"}}],
               "usage": {"prompt_tokens": 12, "completion_tokens": 5, "total_tokens": 17}}
        response = Mock(status_code=200)
        response.json.return_value = raw
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "test-key"}), \
                patch("requests.post", return_value=response) as post:
            result = asyncio.run(runner.openrouter_call(
                model="google/gemini-3.8-flash", messages=[{"role": "user", "content": "Hi"}],
                timeout=10))
        self.assertEqual(post.call_args.args, (runner.OPENROUTER_URL,))
        self.assertEqual(post.call_args.kwargs["headers"], {"Authorization": "Bearer test-key"})
        self.assertEqual(set(post.call_args.kwargs["json"]), {"model", "messages"})
        self.assertEqual(result["status"], "completed")
        self.assertEqual(runner.api.output_text(result), "Hello")
        self.assertEqual(result["usage"]["input_tokens"], 12)
        self.assertEqual(result["openrouter_response"], raw)

    def test_truncated_response_is_incomplete(self):
        response = Mock(status_code=200)
        response.json.return_value = {"choices": [
            {"finish_reason": "length", "message": {"content": "partial"}}]}
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "test-key"}), \
                patch("requests.post", return_value=response):
            result = asyncio.run(runner.openrouter_call(model="test/model", messages=[], timeout=10))
        self.assertEqual(result["status"], "incomplete")

    def test_missing_key_fails_before_output(self):
        with patch.dict(runner.os.environ, {}, clear=True), \
                patch("dotenv.load_dotenv"):
            with self.assertRaises(SystemExit):
                runner.main(["--output", str(self.root / "no-output")])
        self.assertFalse((self.root / "no-output").exists())

    def test_api_error_preserves_status_and_redacts_key(self):
        response = Mock(status_code=400)
        response.json.return_value = {"error": {"message": "Reasoning is mandatory test-key"}}
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "test-key"}), \
                patch("requests.post", return_value=response):
            folder = self.root / "output"
            conversation = self.prepare()
            conversation["models"]["student"] = conversation["models"]["tutor"]
            self.assertFalse(asyncio.run(runner.simulate(conversation, folder, self.catalog, 10)))
        result = runner.api.read_json(folder / "turns/01-tutor/01-tutor.json")
        self.assertEqual(result["status"], "failed")
        self.assertEqual(result["error"]["status_code"], 400)
        self.assertEqual(result["error"]["message"], "Reasoning is mandatory [REDACTED]")

    def test_direct_providers_use_litellm_and_only_their_own_key(self):
        for provider, model, variable, expected_model in (
            ("google", "google/gemini-3.8-flash", "GEMINI_API_KEY", "gemini/gemini-3.8-flash"),
            ("openai", "openai/gpt-4o", "OPENAI_API_KEY", "openai/gpt-4o"),
        ):
            with self.subTest(provider=provider):
                self.settings.update(tutor_model=model, student_model=model)
                self.settings.pop("tutor_reasoning", None)
                self.settings.pop("student_reasoning", None)
                runner.api.write_json(self.root / "run.json", self.settings)
                conversation = self.prepare()
                response = {"status": "completed", "output": [{"type": "message", "content": [
                    {"type": "output_text", "text": "Direct reply"}]}], "usage": {"total_tokens": 8}}
                call = AsyncMock(return_value=response)
                folder = self.root / provider
                with patch.dict(runner.os.environ, {variable: "direct-secret"}, clear=True), \
                        patch.dict("sys.modules", {"litellm": SimpleNamespace(aresponses=call)}), \
                        patch("requests.post") as post:
                    runner.check_dependencies([conversation])
                    self.assertTrue(asyncio.run(runner.simulate(conversation, folder, self.catalog, 10)))
                post.assert_not_called()
                self.assertEqual(call.await_count, 3)
                first = call.await_args_list[0].kwargs
                self.assertEqual(first["api_key"], "direct-secret")
                self.assertEqual(first["model"], expected_model)
                self.assertEqual(first["timeout"], 10)
                self.assertFalse(first["store"])
                self.assertFalse(first["drop_params"])
                self.assertNotIn("messages", first)
                self.assertNotIn("reasoning", first)
                self.assertEqual(first["input"], [{"role": "user", "content": conversation["first_message"]}])
                self.assertEqual(first["instructions"], conversation["system_prompts"]["tutor"])
                result = runner.api.read_json(folder / "turns/01-tutor/01-tutor.json")
                self.assertEqual(result["job"]["provider"], provider)
                self.assertEqual(result["response"], response)
                for path in folder.rglob("*.json"):
                    self.assertNotIn("direct-secret", path.read_text())

    def test_direct_reasoning_uses_responses_format(self):
        conversation = self.prepare()
        for model in ("google/gemini-3.8-flash", "openai/gpt-5.4-mini"):
            for effort in ("none", "medium"):
                with self.subTest(model=model, effort=effort):
                    conversation["models"]["tutor"] = {"resolved_model": model, "reasoning": effort}
                    request = runner.request_for(conversation, [], "tutor", 0)
                    self.assertEqual(request["reasoning"], {"effort": effort})
                    self.assertNotIn("messages", request)

    def test_missing_direct_key_does_not_fall_back_to_openrouter(self):
        self.add_followup()
        conversation = self.prepare()
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "router-key"}, clear=True), \
                patch.dict("sys.modules", {"litellm": SimpleNamespace()}):
            with self.assertRaisesRegex(ValueError, "Missing GEMINI_API_KEY"):
                runner.check_dependencies([conversation])

    def test_mixed_run_dispatches_both_providers(self):
        self.add_followup()
        direct = AsyncMock(return_value={"output": [{"type": "message", "content": [
            {"type": "output_text", "text": "Student reply"}]}]})
        response = Mock(status_code=200)
        response.json.return_value = {"choices": [
            {"finish_reason": "stop", "message": {"content": "Tutor reply"}}]}
        with patch.dict(runner.os.environ, {"OPENROUTER_API_KEY": "router-key", "GEMINI_API_KEY": "google-key"}, clear=True), \
                patch.dict("sys.modules", {"litellm": SimpleNamespace(aresponses=direct)}), \
                patch("requests.post", return_value=response) as post:
            self.assertTrue(asyncio.run(runner.simulate(self.prepare(), self.root / "mixed", self.catalog, 10)))
        self.assertEqual(post.call_count, 2)
        self.assertEqual(post.call_args.kwargs["headers"]["Authorization"], "Bearer router-key")
        self.assertEqual(direct.await_count, 1)
        self.assertEqual(direct.call_args.kwargs["api_key"], "google-key")
        self.assertEqual(direct.call_args.kwargs["reasoning"], {"effort": "medium"})


if __name__ == "__main__":
    unittest.main()
