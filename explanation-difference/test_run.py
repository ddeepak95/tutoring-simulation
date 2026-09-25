"""Offline checks for literal prompt expansion and result persistence."""
import asyncio
import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location("difference_runner", Path(__file__).with_name("run.py"))
runner = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runner)


class RunnerTests(unittest.TestCase):
    def test_reasoning_is_only_sent_when_configured(self):
        config = {"runs": [{"lang_id": "en", "prompt": "Explain", "models": ["openai/test"]}]}
        jobs = runner.expand_jobs(config)
        runner.api.resolve_models(jobs, {"models": []})
        self.assertNotIn("reasoning", runner.request_for(jobs[0]))
        jobs[0]["reasoning"] = "low"
        self.assertEqual(runner.request_for(jobs[0])["reasoning"], {"effort": "low"})

    def test_prompt_matrix_preserves_unicode_and_braces(self):
        config = {"defaults": {"models": ["openai/a", "openai/b", "openai/c"]},
                  "runs": [{"lang_id": lang, "prompt": text} for lang, text in
                           [("en", "Explain"), ("ta", "?????"), ("ta", "Explain in Tamil")]]}
        config["runs"][1]["prompt"] += " {literal}"
        jobs = runner.expand_jobs(config)
        self.assertEqual(len(jobs), 9)
        self.assertEqual(len({job["job_id"] for job in jobs}), 9)
        for index, row in enumerate(config["runs"]):
            self.assertEqual([job["prompt"] for job in jobs[index * 3:index * 3 + 3]], [row["prompt"]] * 3)

    def test_saved_results_and_resume(self):
        config = {"runs": [{"lang_id": "ta", "prompt": "தமிழ் {literal}", "models": ["openai/test"]}]}
        jobs = runner.expand_jobs(config)
        catalog = {"models": []}
        runner.api.resolve_models(jobs, catalog)
        calls = []

        async def fake(**kwargs):
            calls.append(kwargs)
            return {"output": [{"type": "message", "content": [{"type": "output_text", "text": "தமிழ்"}]}]}

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            self.assertEqual(asyncio.run(runner.api.execute(jobs, output, catalog, 1, 10, False, fake)), 0)
            self.assertEqual(asyncio.run(runner.api.execute(jobs, output, catalog, 1, 10, True, fake)), 0)
            self.assertEqual(len(calls), 1)
            self.assertEqual(calls[0]["input"], config["runs"][0]["prompt"])
            self.assertIn("தமிழ்", (output / "results.csv").read_text(encoding="utf-8-sig"))

    def test_named_output_resume_and_automatic_markdown(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            config_path = root / "isotope.json"
            runner.api.write_json(config_path, {"runs": [
                {"lang_id": "ta", "prompt": "????? {literal}", "models": ["openai/test", "openai/fail"]}]})
            async def execute(jobs, output, *args, **kwargs):
                for job in jobs:
                    result = {"job": job, "status": "completed", "text": "?????\n\n## Heading\n**Exact text**"}
                    if job["model"] == "openai/fail":
                        result.update(status="failed", text="", error={"type": "TestError", "status_code": 400})
                    runner.api.write_json(output / (job["job_id"] + ".json"), result)
                return 1
            with patch.object(runner, "HERE", root), patch.object(runner.api, "execute", execute):
                argv = ["--run-set", str(config_path)]
                self.assertEqual(runner.main(argv + ["--dry-run"]), 0)
                output = root / "outputs" / "isotope"
                self.assertTrue((output / "manifest.json").exists())
                self.assertFalse((output / "results.md").exists())
                self.assertEqual(runner.main(argv + ["--resume"]), 1)
                markdown = (output / "results.md").read_text(encoding="utf-8")
                self.assertIn("?????\n\n## Heading\n**Exact text**", markdown)
                self.assertIn("**Status:** failed", markdown)
                self.assertIn("TestError", markdown)
                self.assertLess(markdown.index("### openai/test"), markdown.index("### openai/fail"))
                with self.assertRaises(SystemExit):
                    runner.main(argv + ["--resume", "--limit", "1"])

    def test_invalid_prompt(self):
        for prompt in (None, "", "   ", 42):
            with self.subTest(prompt=prompt), self.assertRaises(ValueError):
                runner.expand_jobs({"runs": [{"lang_id": "en", "prompt": prompt, "models": ["openai/test"]}]})


class TopicTests(unittest.TestCase):
    def test_localized_topics_and_validation(self):
        keywords = {"ch-4": {"en": "redox reactions", "ta": "?????"},
                    "ch-5": {"en": "covalent radius", "ta": "????"}}
        config = {"defaults": {"topics": ["ch-4", "ch-5"], "models": ["openai/test"]},
                  "runs": [{"lang_id": "en", "prompt": "Explain {topic} in Tamil."},
                           {"lang_id": "ta", "prompt": "{topic} ????????????"}]}
        jobs = runner.expand_jobs(config, keywords)
        self.assertEqual(len(jobs), 4)
        self.assertEqual(len({job["job_id"] for job in jobs}), 4)
        self.assertEqual(jobs[0]["prompt"], "Explain redox reactions in Tamil.")
        self.assertEqual(jobs[2]["prompt"], "????? ????????????")
        self.assertEqual(runner.topic_folder(jobs[0]), "ch-4_redox_reactions")
        with self.assertRaises(ValueError):
            runner.expand_jobs(config, {})
        config["runs"][1]["prompt"] = "isotope"
        with self.assertRaises(ValueError):
            runner.expand_jobs(config, keywords)

    def test_call_log_pairs_and_resume(self):
        import json
        config = {"runs": [{"lang_id": "en", "prompt": "Explain", "models": ["openai/test", "openai/fail"]}]}
        jobs = runner.expand_jobs(config)
        catalog = {"models": [{"id": "openai/test", "litellm_model": "openai/test",
                               "litellm_params": {"api_key": "secret-test-key"}}]}
        runner.api.resolve_models(jobs, catalog)
        async def fake(**kwargs):
            if kwargs["model"] == "openai/fail":
                raise RuntimeError("secret-test-key")
            return {"output": [{"type": "message", "content": [{"type": "output_text", "text": "?????"}]}]}
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            for resume in (False, True):
                asyncio.run(runner.api.execute(jobs, output, catalog, 2, 10, resume, fake,
                                              request_builder=runner.request_for, log_calls=True))
            text = (output / "api_calls.jsonl").read_text(encoding="utf-8")
            events = [json.loads(line) for line in text.splitlines()]
            self.assertEqual(len(events), 6)
            self.assertNotIn("secret-test-key", text)
            attempts = {event["attempt_id"] for event in events}
            self.assertEqual(len(attempts), 3)
            for attempt in attempts:
                pair = [event for event in events if event["attempt_id"] == attempt]
                self.assertEqual(pair[0]["event"], "request")
                self.assertIn(pair[1]["event"], ("response", "error"))


if __name__ == "__main__":
    unittest.main()


class MultilingualTests(unittest.TestCase):
    def inputs(self):
        config={'version':2,'defaults':{'topics':['t1'],'models':['openai/test']},'target_languages':['hi','fr'],
            'baseline':{'id':'baseline','prompt_language':'en','response_language':'en'},
            'conditions':[{'id':'native','prompt_language':'$target','response_language':'$target'},
                          {'id':'english','prompt_language':'en','response_language':'$target'}]}
        words={'t1':{'en':'isotope','hi':'HINDI_TERM','fr':'isotope-fr','subject':'chemistry'}}
        templates=[{'lang_id':'en','lang_name_eng':'English','prompt':'Explain {topic} in {response_language_name_en}.'},
                   {'lang_id':'hi','lang_name_eng':'Hindi','prompt':'Hindi instruction: {topic}'},
                   {'lang_id':'fr','lang_name_eng':'French','prompt':'French instruction: {topic}'}]
        return config,words,templates

    def test_expansion_and_language_separation(self):
        config,words,templates=self.inputs();jobs=runner.expand_jobs(config,words,templates)
        self.assertEqual(len(jobs),5)
        self.assertEqual(jobs[1]['prompt'],'Hindi instruction: HINDI_TERM')
        self.assertEqual(jobs[2]['prompt'],'Explain isotope in Hindi.')
        self.assertEqual(jobs[2]['prompt_language'],'en')
        self.assertEqual(jobs[2]['response_language'],'hi')
        self.assertEqual(jobs[2]['topic_language'],'en')
        self.assertEqual(jobs[2]['language'],'hi')
        self.assertEqual(len({j['job_id'] for j in jobs}),5)
        config['target_languages'].reverse()
        self.assertEqual({j['job_id'] for j in jobs},{j['job_id'] for j in runner.expand_jobs(config,words,templates)})

    def test_invalid_matrix(self):
        import copy
        config,words,templates=self.inputs()
        for mutation in [lambda c:c.update(target_languages=['hi','hi']),lambda c:c['conditions'][0].update(prompt_language='missing'),lambda c:c.update(target_languages=['en']),lambda c:c['conditions'].append(c['conditions'][0])]:
            c=copy.deepcopy(config);mutation(c)
            with self.assertRaises(ValueError):runner.expand_jobs(c,words,templates)
        del words['t1']['hi']
        with self.assertRaises(ValueError):runner.expand_jobs(config,words,templates)

    def test_actual_matrix(self):
        config=runner.api.read_json(runner.HERE/'run_set/multiple.json')
        templates=runner.api.read_json(runner.HERE/'content/prompt-structures.json')
        jobs=runner.expand_jobs(config,runner.read_keywords(runner.HERE/'content/keywords.csv'),templates)
        self.assertEqual(len(jobs),385)
        self.assertEqual(sum(j['condition_id']=='english_baseline' for j in jobs),35)
        self.assertFalse(any('{topic}' in j['prompt'] or '{response_language_name_en}' in j['prompt'] for j in jobs))


class OrganizedOutputTests(unittest.TestCase):
    def test_shared_root_and_resume(self):
        import argparse
        config={'version':2,'defaults':{'topics':['x'],'models':['openai/test']},'target_languages':['hi'],
            'conditions':[{'id':'native','prompt_language':'$target','response_language':'$target'}]}
        templates=[{'lang_id':'hi','lang_name_eng':'Hindi','prompt':'Explain {topic}'}]
        jobs=runner.expand_jobs(config,{'x':{'hi':'term','en':'topic'}},templates)
        runner.api.resolve_models(jobs,{'models':[]})
        async def fake(**kwargs): return {'output':[{'type':'message','content':[{'type':'output_text','text':'Saved response'}]}]}
        execute=runner.api.execute
        async def local(*args,**kwargs):return await execute(*args,**kwargs,call=fake)
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory); (root/'existing.txt').write_text('keep')
            args=argparse.Namespace(output=root,run_set=root/'new.json',resume=False,dry_run=False,concurrency=1,timeout=10)
            with patch.object(runner.api,'execute',local):
                self.assertEqual(runner.run_organized(args,config,jobs,{'models':[]},{'jobs':jobs}),0)
                path=runner.organized_path(root,jobs[0]);self.assertTrue(path.exists())
                self.assertEqual(path.parent.name,'hindi-native')
                self.assertTrue(path.name.startswith('openai_test__'))
                before=path.read_bytes();args.resume=True
                self.assertEqual(runner.run_organized(args,config,jobs,{'models':[]},{'jobs':jobs}),0)
                self.assertEqual(before,path.read_bytes())
                self.assertEqual((root/'existing.txt').read_text(),'keep')
