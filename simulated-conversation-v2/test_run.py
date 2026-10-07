import asyncio
import importlib.util
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("simulator", HERE / "run.py")
runner = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runner)


class SimulationTests(unittest.TestCase):
    def setUp(self):
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
        (self.root / "tutor-prompt.md").write_text("Explain {topic_name} in {language}.")

    def prepare(self):
        return runner.prepare(self.root, self.catalog, self.root / "run.json")[1][0]

    def test_tutor_opening_without_first_message_file(self):
        conversation = self.prepare()
        self.assertEqual(conversation["speaker_order"], ["tutor", "student"])
        self.assertEqual(conversation["system_prompts"]["tutor"], "Explain test topic in English.")
        self.assertNotIn("first_message", conversation)
        self.assertIn("The tutor has initiated", conversation["system_prompts"]["student"])

    def test_two_messages_tutor_then_student(self):
        conversation = self.prepare()
        calls = []
        async def call(**kwargs):
            calls.append(kwargs)
            return {"status": "completed", "output": [{"type": "message", "content": [
                {"type": "output_text", "text": "Tutor reply"}]}]}
        folder = self.root / "output"
        self.assertTrue(asyncio.run(runner.simulate(conversation, folder, self.catalog, 10, call)))
        record = runner.api.read_json(folder / "conversation.json")
        self.assertEqual([m["speaker"] for m in record["messages"]], ["tutor", "student"])
        self.assertEqual(record["messages"][0]["text"], "Tutor reply")
        self.assertEqual(record["status"], "completed")
        self.assertEqual(len(calls), 2)
        self.assertEqual(calls[0]["input"], [{"role": "user", "content": conversation["system_prompts"]["tutor"]}])
        self.assertNotIn("instructions", calls[0])
        self.assertEqual(calls[1]["instructions"], conversation["system_prompts"]["student"])
        self.assertEqual(calls[1]["input"], [{"role": "user", "content": "Tutor reply"}])
        self.assertEqual(calls[1]["reasoning"], {"effort": "medium"})
        self.assertEqual(calls[0]["thinking"], {"type": "disabled"})
        self.assertNotIn("extra_body", calls[0])

    def test_tutor_failure_leaves_empty_transcript(self):
        async def call(**kwargs):
            raise RuntimeError("test failure")
        folder = self.root / "output"
        self.assertFalse(asyncio.run(runner.simulate(self.prepare(), folder, self.catalog, 10, call)))
        record = runner.api.read_json(folder / "conversation.json")
        self.assertEqual(record["status"], "failed")
        self.assertEqual(len(record["messages"]), 0)
        self.assertEqual(record["failed_turn"], "01-tutor")

    def test_student_failure_preserves_tutor_opening(self):
        calls = []
        async def call(**kwargs):
            calls.append(kwargs)
            if len(calls) == 2:
                raise RuntimeError("student failed")
            return {"output": [{"type": "message", "content": [
                {"type": "output_text", "text": "Opening explanation"}]}]}
        folder = self.root / "output"
        self.assertFalse(asyncio.run(runner.simulate(self.prepare(), folder, self.catalog, 10, call)))
        record = runner.api.read_json(folder / "conversation.json")
        self.assertEqual(record["failed_turn"], "01-student")
        self.assertEqual([m["speaker"] for m in record["messages"]], ["tutor"])

    def test_maverick_omits_unsupported_reasoning(self):
        conversation = self.prepare()
        conversation["models"]["tutor"] = {
            "resolved_model": "vertex_ai/meta/llama-4-maverick-17b-128e-instruct-maas",
            "reasoning": "none"}
        request = runner.request_for(conversation, [], "tutor", 0)
        self.assertNotIn("reasoning", request)
        self.assertNotIn("thinking", request)
        self.assertEqual(request["input"], [{"role": "user", "content": conversation["system_prompts"]["tutor"]}])
        self.assertNotIn("instructions", request)
        conversation["models"]["tutor"]["reasoning"] = "medium"
        with self.assertRaisesRegex(ValueError, "does not support reasoning effort"):
            runner.request_for(conversation, [], "tutor", 0)


if __name__ == "__main__":
    unittest.main()
