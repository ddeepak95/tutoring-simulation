from _paths import EXPLANATION_ROOT
"""Offline checks for website planning, capture readiness, and resume guards."""
import tempfile
import unittest
from argparse import Namespace
from pathlib import Path
from unittest.mock import MagicMock, patch

import browser_run as browser


class BrowserTests(unittest.TestCase):
    def test_free_direct_without_api_fields(self):
        source = {'defaults': {'topics': ['Theory of relativity'], 'chatgpt-free': True,
                              'chatgpt-thinking-effort': ['Instant','Medium','High'], 'web_search': True},
                  'runs': [{'lang_id':'en'}, {'lang_id':'ta','prompt_type':'code-mixed'},
                           {'lang_id':'ta','topics':['சார்பியல் கோட்பாடு']}]}
        prompts = browser.read_json(browser.HERE/'prompt-structure.json')
        jobs = browser.expand_browser_jobs(source,prompts)
        self.assertEqual(len(jobs),3)
        self.assertEqual(len({j['job_id'] for j in jobs}),3)
        self.assertTrue(all(j['chatgpt_free'] and 'chatgpt_thinking_effort' not in j for j in jobs))
        self.assertNotIn('models',source['defaults'])
        page = MagicMock()
        settings = browser.configure_default_chat(page,jobs[0],{},'explicit')
        self.assertEqual(page.mock_calls,[])
        self.assertFalse(settings['reasoning_changed'])
        self.assertFalse(settings['search_selected'])
        source['runs'][0]['chatgpt-free'] = False
        mixed = browser.expand_browser_jobs(source,prompts)
        self.assertEqual(len(mixed),5)
        self.assertEqual([j['chatgpt_thinking_effort'] for j in mixed[:3]],['Instant','Medium','High'])
        source['runs'][0]['chatgpt-free'] = 'true'
        with self.assertRaises(ValueError):
            browser.expand_browser_jobs(source,prompts)

    def test_website_effort_sweep(self):
        source = {"defaults": {"topics": ["Topic"], "models": ["test"],
                               "reasoning": ["none", "low", "medium", "high"],
                               "chatgpt-thinking-effort": ["Instant", "Medium", "High"]},
                  "runs": [{"lang_id": "en"}, {"lang_id": "ta", "prompt_type": "code-mixed"}, {"lang_id": "ta"}]}
        prompts = browser.read_json(browser.HERE/'prompt-structure.json')
        jobs = browser.expand_browser_jobs(source, prompts)
        self.assertEqual(len(jobs), 9)
        self.assertEqual(len({job['job_id'] for job in jobs}), 9)
        self.assertEqual([j['chatgpt_thinking_effort'] for j in jobs[:3]], ['Instant','Medium','High'])
        self.assertTrue(all(len(j['source_api_conditions']) == 4 for j in jobs))
        self.assertIn('chatgpt-thinking-effort', source['defaults'])
        source['runs'][0]['chatgpt-thinking-effort'] = ['High']
        self.assertEqual(len(browser.expand_browser_jobs(source,prompts)), 7)
        for invalid in ([], 'High', ['high'], ['High','High']):
            source['runs'][0]['chatgpt-thinking-effort'] = invalid
            with self.assertRaises(ValueError):
                browser.expand_browser_jobs(source,prompts)

    def test_output_folders(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            args = Namespace(output=None, resume=False, config=base/'browser-config.json', inspect=False)
            first = browser.choose_output(args, {"output_root": "saved"})
            second = browser.choose_output(args, {"output_root": "saved"})
            self.assertEqual(first.parent, base/'saved')
            self.assertNotEqual(first, second)
            args.resume = True
            with self.assertRaises(ValueError):
                browser.choose_output(args, {})
            args.output = base/'chosen-run'
            self.assertEqual(browser.choose_output(args, {}), args.output)

    def test_default_matrix(self):
        source = {"defaults": {"topics": ["Topic A", "Topic B"], "models": ["test-model"],
                               "reasoning": ["none", "low", "medium", "high"], "web_search": True},
                  "runs": [{"lang_id": "en"}, {"lang_id": "ta", "prompt_type": "code-mixed"}, {"lang_id": "ta"}]}
        templates = browser.read_json(browser.HERE / "prompt-structure.json")
        original = browser.expand_jobs(source, templates)
        jobs = browser.default_jobs(original)
        self.assertEqual(len(jobs), 6)
        self.assertEqual({j["prompt"] for j in jobs}, {j["prompt"] for j in original})
        self.assertEqual(len({j["job_id"] for j in jobs}), 6)
        self.assertTrue(all(len(j["source_api_conditions"]) == 4 for j in jobs))
        self.assertTrue(all(j["reasoning"] == "website-default" for j in jobs))
        self.assertEqual(original[0]["reasoning"], "none")

    def test_resume_rejects_changed_settings(self):
        with tempfile.TemporaryDirectory() as directory:
            args = Namespace(run_set=browser.HERE / "run_set/test.json", prompts=browser.HERE / "prompt-structure.json",
                             mapped_settings=False, manual_settings=False, limit=None, output=Path(directory), resume=False)
            config = browser.read_json(browser.HERE / "browser-config.json")
            first = browser.prepare(args, config)
            args.resume = True
            self.assertEqual(browser.prepare(args, config), first)
            args.mapped_settings = True
            with self.assertRaises(ValueError):
                browser.prepare(args, config)

    def test_missing_mapping_never_clicks(self):
        page = MagicMock()
        with self.assertRaises(ValueError):
            browser.configure(page, {"model": "a", "reasoning": "low", "web_search": True}, {"conditions": {}}, False)
        self.assertEqual(page.mock_calls, [])

    def make_page(self, complete, stopping):
        page = MagicMock()
        page.get_by_test_id.return_value.is_visible.return_value = False
        messages = MagicMock()
        messages.count.return_value = 1
        messages.last.inner_text.return_value = "An answer"
        messages.last.locator.return_value.locator.return_value.count.return_value = int(complete)
        stop = MagicMock()
        stop.is_visible.return_value = stopping
        page.locator.side_effect = lambda selector: messages if selector == "assistant" else stop
        return page, messages.last

    def test_rate_limit_wait_does_not_reload_or_click(self):
        page = MagicMock()
        clock = [0.0]
        page.wait_for_timeout.side_effect = lambda ms: clock.__setitem__(0, clock[0] + ms / 1000)
        with patch.object(browser, 'rate_limit_message', side_effect=['Slow down', None]), patch.object(browser.time, 'monotonic', side_effect=lambda: clock[0]):
            browser.wait_until_unblocked(page, 60)
        page.wait_for_timeout.assert_called_once()
        page.goto.assert_not_called()
        page.reload.assert_not_called()
        with patch.object(browser, 'rate_limit_message', return_value='Slow down'):
            with self.assertRaises(browser.RateLimitPaused):
                browser.wait_until_unblocked(page, 0)

    def test_rate_limit_exponential_schedule_and_deadline(self):
        page = MagicMock()
        clock, checks = [0.0], []
        page.wait_for_timeout.side_effect = lambda ms: clock.__setitem__(0, clock[0] + ms / 1000)
        def limited(_):
            checks.append(clock[0])
            return 'Slow down'
        with patch.object(browser, 'rate_limit_message', side_effect=limited), patch.object(browser.time, 'monotonic', side_effect=lambda: clock[0]):
            with self.assertRaises(browser.RateLimitPaused):
                browser.wait_until_unblocked(page, 1200)
        self.assertEqual(checks, [0, 30, 90, 210, 450, 750, 1050, 1200])
        self.assertEqual(clock[0], 1200)
        self.assertTrue(all(call.args[0] <= 30000 for call in page.wait_for_timeout.call_args_list))
        page.goto.assert_not_called()
        page.reload.assert_not_called()

    def test_rate_limit_after_submission_stops_wait(self):
        with patch.object(browser, 'rate_limit_message', return_value='Slow down'):
            with self.assertRaises(browser.RateLimitPaused):
                browser.wait_for_answer(MagicMock(), {}, 10)

    def test_requires_finished_controls_and_no_streaming(self):
        selectors = {"assistant": "assistant", "turn": "article", "complete": "copy", "stop": "stop"}
        for complete, stopping in [(False, False), (True, True)]:
            with self.subTest(complete=complete, stopping=stopping):
                page, _ = self.make_page(complete, stopping)
                with patch.object(browser.time, "monotonic", side_effect=range(100)):
                    with self.assertRaises(TimeoutError):
                        browser.wait_for_answer(page, selectors, 10)
        page, answer = self.make_page(True, False)
        with patch.object(browser.time, "monotonic", side_effect=range(100)):
            self.assertIs(browser.wait_for_answer(page, selectors, 20), answer)

    def test_search_selected_before_submission(self):
        page = MagicMock()
        page.locator.return_value.is_visible.return_value = False
        browser.enable_search(page, {"tools_button": "tools", "search_option": "option", "search_active": "active"})
        self.assertEqual(page.locator.call_args_list[-1].args, ("active",))
        page.locator.return_value.fill.assert_not_called()
        self.assertEqual(page.locator.return_value.click.call_count, 2)

    def test_normal_chat_does_not_select_search(self):
        page = MagicMock()
        settings = browser.configure_default_chat(page, {"web_search": True}, {}, "auto")
        self.assertEqual(page.mock_calls, [])
        self.assertFalse(settings["search_selected"])
        self.assertEqual(settings["search_mode"], "auto")

    def test_explicit_search_still_available(self):
        page = MagicMock()
        with patch.object(browser, "enable_search") as select:
            settings = browser.configure_default_chat(page, {"web_search": True}, {}, "explicit")
        select.assert_called_once_with(page, {})
        self.assertTrue(settings["search_selected"])

    def test_selected_search_is_not_toggled_off(self):
        page = MagicMock()
        page.locator.return_value.is_visible.return_value = True
        browser.enable_search(page, {"search_active": "active"})
        page.locator.return_value.click.assert_not_called()

    def test_selector_update_rejected_after_submission(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            old = {"browser_config": {"selectors": {"search": "old"}}, "jobs": [{"job_id": "job"}]}
            new = {**old, "browser_config": {"selectors": {"search": "new"}}}
            self.assertTrue(browser.can_refresh_selectors(old, new, output))
            (output / "job").mkdir()
            browser.write_json(output / "job/result.json", {"status": "failed_before_submission"})
            self.assertTrue(browser.can_refresh_selectors(old, new, output))
            browser.write_json(output / "job/result.json", {"status": "submitted"})
            self.assertFalse(browser.can_refresh_selectors(old, new, output))


if __name__ == "__main__":
    unittest.main()
