"""Prepare fixed account queues and run each only in its assigned browser profile."""
import argparse
from collections import Counter
from contextlib import contextmanager
import os
from pathlib import Path
import re
import subprocess
import sys

import browser_run as browser

HERE = Path(__file__).resolve().parent


def accounts_from(path):
    accounts = browser.read_json(path)['accounts']
    if not accounts:
        raise ValueError('At least one account is required')
    ids, ports, profiles = set(), set(), set()
    result = []
    for entry in accounts:
        item = dict(entry)
        if not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9_-]*', item['id']):
            raise ValueError('Account IDs must contain only letters, digits, underscores, or hyphens')
        port = item['port']
        if type(port) is not int or not 1024 <= port <= 65535:
            raise ValueError('Each port must be an integer between 1024 and 65535')
        profile = (path.resolve().parent / item['profile']).resolve()
        if item['id'] in ids or port in ports or str(profile).casefold() in profiles:
            raise ValueError('Account IDs, ports, and profile directories must all be unique')
        ids.add(item['id']); ports.add(port); profiles.add(str(profile).casefold())
        item.update(profile=str(profile), cdp_url=f'http://127.0.0.1:{port}', identity_verified=False)
        result.append(item)
    return result


def prepare(args):
    accounts = accounts_from(args.accounts)
    source, prompts = browser.read_json(args.run_set), browser.read_json(args.prompts)
    config = browser.read_json(args.config)
    jobs = browser.expand_browser_jobs(source, prompts)
    assignments = {a['id']: [] for a in accounts}
    for index, job in enumerate(jobs):
        account = accounts[index % len(accounts)]
        assignments[account['id']].append(dict(job, browser_assignment=account))
    plan = dict(backend='fixed_browser_queues', assignment='round_robin_before_execution',
                accounts=accounts, run_set=source, prompt_structure=prompts,
                browser_config=config, assignments=assignments)
    path = args.output / 'queues.json'
    if args.output.exists() and any(args.output.iterdir()):
        if not args.resume or not path.exists() or browser.read_json(path) != plan:
            raise ValueError('Use a new output folder, or --resume with exactly the original inputs')
    elif args.resume:
        raise ValueError('No existing queue plan to resume')
    args.output.mkdir(parents=True, exist_ok=True)
    browser.write_json(path, plan)
    for account in accounts:
        folder = args.output / account['id']
        folder.mkdir(exist_ok=True)
        manifest = dict(backend='chatgpt_website', run_set=source, prompt_structure=prompts,
                        browser_config=config, manual_settings=False, mapped_settings=False,
                        search_mode='auto', jobs=assignments[account['id']])
        previous = folder / 'manifest.json'
        if previous.exists() and browser.read_json(previous) != manifest:
            raise ValueError(f'Modified queue manifest: {account["id"]}')
        browser.write_json(previous, manifest)
    report(args.output, plan)
    print(f'Prepared {len(jobs)} jobs across {len(accounts)} fixed queues: {args.output}')
    for account in accounts:
        print(f"  {account['id']}: {len(assignments[account['id']])} jobs on {account['cdp_url']}")


def report(output, plan):
    lines = ['# Fixed browser queues', '',
             'Assignments are fixed before execution. A limited queue pauses; its jobs are never reassigned.', '',
             '| Account label | Assigned | Status counts | Report |', '| --- | ---: | --- | --- |']
    for account in plan['accounts']:
        name = account['id']
        counts = Counter()
        for job in plan['assignments'][name]:
            path = output / name / job['job_id'] / 'result.json'
            counts[browser.read_json(path)['status'] if path.exists() else 'pending'] += 1
        lines.append(f"| {name} | {sum(counts.values())} | {dict(counts)} | [{name}]({name}/results.md) |")
        browser.render_report(output / name, browser.read_json(output / name / 'manifest.json'))
    (output / 'results.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')


@contextmanager
def lock(path):
    try:
        stream = path.open('x', encoding='utf-8')
    except FileExistsError:
        raise ValueError(f'Queue already locked: {path}. If a previous worker crashed, verify it has stopped before removing this lock.')
    try:
        with stream:
            stream.write(str(os.getpid()))
        yield
    finally:
        path.unlink(missing_ok=True)


def worker(args):
    plan = browser.read_json(args.output / 'queues.json')
    account = next((a for a in plan['accounts'] if a['id'] == args.account), None)
    if account is None:
        raise ValueError('Unknown account label')
    folder = args.output / account['id']
    manifest = browser.read_json(folder / 'manifest.json')
    if manifest['jobs'] != plan['assignments'][account['id']] or manifest['browser_config'] != plan['browser_config']:
        raise ValueError('Queue manifest no longer matches the fixed plan')
    if args.recover_job and args.recover_job not in {j['job_id'] for j in manifest['jobs']}:
        raise ValueError('Recovery job is not assigned to this account')
    run_args = argparse.Namespace(output=folder, cdp_url=account['cdp_url'], profile=Path(account['profile']),
        login=False, inspect=False, recover_job=args.recover_job, conversation_url=args.conversation_url,
        mapped_settings=False, manual_settings=False, search_mode='auto', timeout=args.timeout,
        inter_job_delay=None, inter_job_delay_min=60, inter_job_delay_max=70,
        rate_limit_wait=args.rate_limit_wait)
    profile = Path(account['profile'])
    profile.mkdir(parents=True, exist_ok=True)
    with lock(profile / '.experiment-worker.lock'), lock(folder / '.worker.lock'):
        browser.write_json(folder / 'queue-status.json', dict(status='running', started_at=browser.now(), account=account))
        try:
            if not manifest['jobs']:
                code = 0
            else:
                code = browser.run_browser(run_args, manifest['browser_config'], manifest)
            browser.write_json(folder / 'queue-status.json', dict(status='paused_rate_limit' if code==2 else 'finished',
                exit_code=code, finished_at=browser.now(), account=account))
            return code
        except BaseException as exc:
            browser.write_json(folder / 'queue-status.json', dict(status='interrupted_or_failed',
                error=type(exc).__name__, message=str(exc)[:1000], finished_at=browser.now(), account=account))
            raise


def run_all(args):
    with lock(args.output / '.scheduler.lock'):
        return run_all_locked(args)


def run_all_locked(args):
    plan = browser.read_json(args.output / 'queues.json')
    children = []
    try:
        # Start predetermined workers once; there is no failover/rebalancing loop.
        for account in plan['accounts']:
            stream = (args.output / account['id'] / 'worker.log').open('a', encoding='utf-8')
            command = [sys.executable, '-u', str(Path(__file__).resolve()), 'run', '--output', str(args.output),
                       '--account', account['id'], '--timeout', str(args.timeout),
                       '--rate-limit-wait', str(args.rate_limit_wait)]
            child = subprocess.Popen(command, stdout=stream, stderr=subprocess.STDOUT,
                                     creationflags=getattr(subprocess, 'CREATE_NO_WINDOW', 0))
            children.append((account['id'], child, stream))
        codes = []
        for name, child, _ in children:
            codes.append(child.wait())
            print(f'{name}: exit {codes[-1]} (see its worker.log)', flush=True)
        return 2 if any(codes) else 0
    finally:
        for _, child, stream in children:
            if child.poll() is None:
                child.terminate()
                child.wait()
            stream.close()
        report(args.output, plan)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['prepare','open','run','run-all','report'])
    parser.add_argument('--accounts', type=Path, default=HERE/'browser-accounts.json')
    parser.add_argument('--run-set', type=Path, default=HERE/'run_set/test.json')
    parser.add_argument('--prompts', type=Path, default=HERE/'prompt-structure.json')
    parser.add_argument('--config', type=Path, default=HERE/'browser-config.json')
    parser.add_argument('--output', type=Path)
    parser.add_argument('--account')
    parser.add_argument('--resume', action='store_true', help='Resume preparation only if all plan inputs match')
    parser.add_argument('--timeout', type=int, default=300)
    parser.add_argument('--rate-limit-wait', type=float, default=1200,
                        help='Rate-limit wait budget with exponential checks (default: 1200 seconds)')
    parser.add_argument('--recover-job')
    parser.add_argument('--conversation-url')
    args = parser.parse_args()
    if args.timeout < 1 or args.rate_limit_wait < 0:
        parser.error('Timeout must be positive and rate-limit wait nonnegative')
    if args.action != 'open' and not args.output:
        parser.error('--output is required')
    if args.action == 'run' and not args.account:
        parser.error('run requires --account')
    if args.recover_job and args.action != 'run':
        parser.error('--recover-job is only valid with run')
    if args.conversation_url and not args.recover_job:
        parser.error('--conversation-url requires --recover-job')
    if args.output:
        args.output = args.output.resolve()
    try:
        if args.action == 'prepare':
            prepare(args)
        elif args.action == 'open':
            accounts = accounts_from(args.accounts)
            if args.account:
                accounts = [a for a in accounts if a['id']==args.account]
                if not accounts:
                    raise ValueError('Unknown account label')
            for account in accounts:
                subprocess.run([sys.executable, str(HERE/'open_browser.py'), '--port', str(account['port']),
                                '--profile', account['profile']], check=True)
        elif args.action == 'run':
            return worker(args)
        elif args.action == 'run-all':
            return run_all(args)
        else:
            report(args.output, browser.read_json(args.output/'queues.json'))
        return 0
    except (ValueError, OSError, subprocess.CalledProcessError) as exc:
        parser.exit(1, str(exc)+'\n')


if __name__=='__main__':
    raise SystemExit(main())
