from _paths import EXPLANATION_ROOT
import argparse
import copy
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import browser_queues as queues


class QueueTests(unittest.TestCase):
    def setup_plan(self, root):
        config = root/'accounts.json'
        accounts = {'accounts': [dict(id=f'account-{i}', port=9300+i, profile=f'profile-{i}') for i in range(6)]}
        queues.browser.write_json(config, accounts)
        source = root/'run.json'
        queues.browser.write_json(source, {'defaults': {'topics': ['A','B','C','D','E','F'], 'chatgpt-free': True},
                                         'runs': [{'lang_id':'en'},{'lang_id':'ta','prompt_type':'code-mixed'},{'lang_id':'ta'}]})
        return argparse.Namespace(accounts=config, run_set=source, prompts=queues.HERE/'prompt-structure.json',
                                  config=queues.HERE/'browser-config.json', output=root/'output', resume=False,
                                  account='account-0', recover_job=None, conversation_url=None, timeout=300, rate_limit_wait=0)

    def test_fixed_balanced_plan_and_resume_guard(self):
        with tempfile.TemporaryDirectory() as temp:
            args=self.setup_plan(Path(temp)); queues.prepare(args)
            before=queues.browser.read_json(args.output/'queues.json')
            assigned=[j for jobs in before['assignments'].values() for j in jobs]
            self.assertEqual(len(assigned),18)
            self.assertEqual(len({j['job_id'] for j in assigned}),18)
            for account,jobs in before['assignments'].items():
                self.assertEqual(len(jobs),3)
                self.assertEqual({(j['lang_id'],j['prompt_type']) for j in jobs}, {('en','native'),('ta','native'),('ta','code-mixed')})
                self.assertTrue(all(j['browser_assignment']['id']==account for j in jobs))
            args.resume=True; queues.prepare(args)
            self.assertEqual(queues.browser.read_json(args.output/'queues.json'),before)
            changed=queues.browser.read_json(args.accounts); changed['accounts'][0]['port']=9400
            queues.browser.write_json(args.accounts,changed)
            with self.assertRaises(ValueError): queues.prepare(args)

    def test_rate_pause_never_reassigns(self):
        with tempfile.TemporaryDirectory() as temp:
            args=self.setup_plan(Path(temp)); queues.prepare(args)
            before=queues.browser.read_json(args.output/'queues.json')
            with patch.object(queues.browser,'run_browser',return_value=2) as run:
                self.assertEqual(queues.worker(args),2)
            self.assertEqual(run.call_count,1)
            self.assertEqual(run.call_args.args[2]['jobs'],before['assignments']['account-0'])
            self.assertEqual(queues.browser.read_json(args.output/'queues.json'),before)
            self.assertEqual(queues.browser.read_json(args.output/'account-0/queue-status.json')['status'],'paused_rate_limit')
            args.recover_job=before['assignments']['account-1'][0]['job_id']
            with self.assertRaises(ValueError): queues.worker(args)

    def test_duplicate_profiles_ports_and_worker_lock(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp); args=self.setup_plan(root)
            original=queues.browser.read_json(args.accounts)
            for key in ['id','port','profile']:
                value=copy.deepcopy(original); value['accounts'][1][key]=value['accounts'][0][key]
                queues.browser.write_json(args.accounts,value)
                with self.assertRaises(ValueError): queues.accounts_from(args.accounts)
            with queues.lock(root/'worker.lock'):
                with self.assertRaises(ValueError):
                    with queues.lock(root/'worker.lock'): pass
            self.assertFalse((root/'worker.lock').exists())


if __name__=='__main__': unittest.main()
