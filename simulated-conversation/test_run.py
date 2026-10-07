import asyncio
import copy
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
        self.catalog = runner.api.read_json(HERE.parent / "data/models.json")
        with tempfile.TemporaryDirectory() as tmp:
            run_set = Path(tmp) / "run.json"
            settings = runner.api.read_json(HERE / "run_set/run.json")
            settings["languages"] = {"en": "English", "ta": "Tamil"}
            runner.api.write_json(run_set, settings)
            self.settings, self.conversations = runner.prepare(HERE / "config", self.catalog, run_set)

    def test_rendered_languages(self):
        tamil = next(c for c in self.conversations if c["language_code"] == "ta")
        self.assertIn(tamil["topic_name"], tamil["system_prompts"]["student"])
        self.assertIn("Tamil", tamil["system_prompts"]["tutor"])
        self.assertNotIn("{language}", tamil["system_prompts"]["student"])
        self.assertNotIn("{topic_name}", tamil["system_prompts"]["student"])

    def test_full_conversation_and_actor_history(self):
        self.conversations[0]["turn_instructions"] = [f"Instruction {i}" for i in range(5)]
        calls = []
        async def call(**kwargs):
            calls.append(copy.deepcopy(kwargs))
            return {"status": "completed", "output": [{"type": "message", "content": [
                {"type": "output_text", "text": f"Reply {len(calls)}"}]}], "usage": {"total_tokens": 3}}
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp) / "conversation"
            self.assertTrue(asyncio.run(runner.simulate(self.conversations[0], folder, self.catalog, 10, call)))
            record = runner.api.read_json(folder / "conversation.json")
            self.assertEqual(len(record["messages"]), 10)
            self.assertEqual(record["status"], "completed")
            self.assertEqual(len(list((folder / "turns").glob("*/*.json"))), 10)
            self.assertTrue((folder / "conversation.md").exists())
        self.assertEqual([m["role"] for m in calls[2]["input"]], ["assistant", "user"])
        self.assertEqual([m["role"] for m in calls[3]["input"]], ["user", "assistant", "user"])
        self.assertIn(self.conversations[0]["turn_instructions"][1], calls[2]["instructions"])
        self.assertNotIn("Current turn instructions", calls[1]["instructions"])
        self.assertEqual(calls[1]["input"][0]["content"], "Reply 1")
        self.assertEqual(len(calls), 10)
        for index, call in enumerate(calls):
            if index % 2 == 0:
                self.assertEqual(call["reasoning"], {"effort": "medium"})
            else:
                self.assertEqual(call["thinking"], {"type": "disabled"})
                self.assertEqual(call["output_config"], {"effort": "low"})
                self.assertNotIn("reasoning", call)
                self.assertNotIn("extra_body", call)

    def test_failure_retains_completed_turn(self):
        calls = []
        async def call(**kwargs):
            calls.append(kwargs)
            if len(calls) == 2:
                raise RuntimeError("failure")
            return {"output": [{"type": "message", "content": [{"type": "output_text", "text": "Question"}]}]}
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp) / "conversation"
            self.assertFalse(asyncio.run(runner.simulate(self.conversations[0], folder, self.catalog, 10, call)))
            record = runner.api.read_json(folder / "conversation.json")
            self.assertEqual(record["status"], "failed")
            self.assertEqual(record["failed_turn"], "01-tutor")
            self.assertEqual(len(record["messages"]), 1)
            self.assertEqual(len(calls), 2)

    def test_invalid_round_count_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            config_dir = Path(tmp)
            for source in (HERE / "config").iterdir():
                if source.is_file():
                    (config_dir / source.name).write_bytes(source.read_bytes())
            student = runner.api.read_json(config_dir / "student-prompt.json")
            student["student_turn_instructions"] = ["Start"]
            runner.api.write_json(config_dir / "student-prompt.json", student)
            with self.assertRaisesRegex(ValueError, "Exactly five"):
                runner.prepare(config_dir, self.catalog)

    def test_separate_run_set_and_optional_turn_instructions(self):
        with tempfile.TemporaryDirectory() as tmp:
            config_dir = Path(tmp) / "config"
            config_dir.mkdir()
            for source in (HERE / "config").iterdir():
                if source.is_file():
                    (config_dir / source.name).write_bytes(source.read_bytes())
            student = runner.api.read_json(config_dir / "student-prompt.json")
            student.pop("student_turn_instructions", None)
            runner.api.write_json(config_dir / "student-prompt.json", student)
            run_set = Path(tmp) / "custom.json"
            runner.api.write_json(run_set, dict(self.settings, languages={"en": "English"}))
            _, conversations = runner.prepare(config_dir, self.catalog, run_set)
            self.assertEqual(len(conversations), 1)
            self.assertIsNone(conversations[0]["turn_instructions"])
            request = runner.request_for(conversations[0], [], "student", 0)
            self.assertNotIn("Current turn instructions", request["instructions"])
            self.assertEqual(len(request["input"]), 1)
            output = Path(tmp) / "preview"
            self.assertEqual(runner.main(["--config-dir", str(config_dir), "--run-set", str(run_set),
                                          "--output", str(output), "--dry-run"]), 0)
            self.assertNotIn("## Student turn instructions", (output / "prompt_preview.md").read_text())


if __name__ == "__main__":
    unittest.main()
