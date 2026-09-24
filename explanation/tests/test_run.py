from _paths import EXPLANATION_ROOT
"""Offline checks: python -m unittest discover -s explanation/tests -p test_run.py."""
import asyncio
import copy
import importlib.util
import tempfile
import unittest
from pathlib import Path

SPEC = importlib.util.spec_from_file_location("explanation_runner", EXPLANATION_ROOT / "run.py")
runner = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runner)


class RunnerTests(unittest.TestCase):
    def setUp(self):
        self.fixture = Path(__file__).parent / 'fixtures/api-run-set.json'
        self.config = runner.read_json(self.fixture)
        self.prompt_fixture = Path(__file__).parent / 'fixtures/api-prompts.json'
        self.templates = runner.read_json(self.prompt_fixture)
        self.catalog = runner.read_json(runner.ROOT / "data/models.json")
        self.jobs = runner.expand_jobs(self.config, self.templates)
        runner.resolve_models(self.jobs, self.catalog)

    def test_supplied_matrix_and_prompts(self):
        self.assertEqual(len(self.jobs), 24)
        self.assertEqual(len({job["job_id"] for job in self.jobs}), 24)
        self.assertEqual(self.jobs[0]["prompt"], "Teach me Couloumb's Law")
        self.assertEqual(self.jobs[8]["prompt"], "Enaku Couloumb's Law pathi solli kudu")
        self.assertEqual(self.jobs[16]["prompt"], self.templates[1]["prompt"].format(topic=self.config["runs"][2]["topics"][0]))

    def test_run_overrides_defaults(self):
        self.config["runs"][0].update(web_search=False, reasoning=["low"], topics=["Gravity"])
        jobs = runner.expand_jobs(self.config, self.templates)
        self.assertEqual(len(jobs), 17)
        self.assertFalse(jobs[0]["web_search"])
        self.assertEqual(jobs[0]["reasoning"], "low")

    def test_invalid_configuration(self):
        for override in ({"lang_id": "missing"}, {"topics": []}, {"models": "gpt-4o"},
                         {"prompt_type": "typo"}, {"web_search": "false"}, {"reasoning": ["typo"]},
                         {"web_serch": True}):
            with self.subTest(override=override):
                config = copy.deepcopy(self.config)
                config["runs"][0].update(override)
                with self.assertRaises(ValueError):
                    runner.expand_jobs(config, self.templates)
        self.config["runs"][0]["prompt_type"] = "code-mixed"
        with self.assertRaises(ValueError):
            runner.expand_jobs(self.config, self.templates)

    def test_request_parameters(self):
        request = runner.request_for(self.jobs[0])
        self.assertEqual(request["reasoning"], {"effort": "none"})
        self.assertEqual(request["tools"], [{"type": "web_search"}])
        self.assertFalse(request["store"])
        self.jobs[0]["web_search"] = False
        self.assertNotIn("tools", runner.request_for(self.jobs[0]))

    def test_results_failures_and_resume(self):
        calls = []

        async def fake(**kwargs):
            calls.append(kwargs)
            if kwargs["reasoning"]["effort"] == "low":
                raise RuntimeError("secret should not be saved")
            return {"status": "completed", "output": [{"type": "message", "content": [
                {"type": "output_text", "text": "விளக்கம்", "annotations": [{"type": "url_citation"}]}]}],
                "usage": {"input_tokens": 10, "output_tokens": 20, "total_tokens": 30}}

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            jobs = self.jobs[:2]
            failures = asyncio.run(runner.execute(jobs, output, self.catalog, 2, 10, False, fake))
            self.assertEqual(failures, 1)
            self.assertEqual(len(calls), 2)
            success = runner.read_json(output / f"{jobs[0]['job_id']}.json")
            self.assertEqual(success["text"], "விளக்கம்")
            self.assertTrue(success["response"]["output"][0]["content"][0]["annotations"])
            self.assertNotIn("secret", (output / f"{jobs[1]['job_id']}.json").read_text())
            asyncio.run(runner.execute(jobs, output, self.catalog, 2, 10, True, fake))
            self.assertEqual(len(calls), 3)  # Only the failed job is retried.
            self.assertIn("விளக்கம்", (output / "results.csv").read_text(encoding="utf-8-sig"))

    def test_incomplete_response_is_not_success(self):
        async def fake(**kwargs):
            return {"status": "incomplete", "output": []}
        with tempfile.TemporaryDirectory() as directory:
            failures = asyncio.run(runner.execute(self.jobs[:1], Path(directory), self.catalog, 1, 10, False, fake))
            self.assertEqual(failures, 1)

    def test_dry_run_and_manifest_guard(self):
        with tempfile.TemporaryDirectory() as directory:
            args = ["--dry-run", "--run-set", str(self.fixture), "--prompts", str(self.prompt_fixture), "--output", directory]
            self.assertEqual(runner.main(args), 0)
            manifest = runner.read_json(Path(directory) / "manifest.json")
            self.assertEqual(len(manifest["jobs"]), 24)
            self.assertEqual(runner.main(args + ["--resume"]), 0)
            with self.assertRaises(SystemExit):
                runner.main(args + ["--resume", "--limit", "1"])


if __name__ == "__main__":
    unittest.main()
