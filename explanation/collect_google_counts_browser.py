"""Collect visible Google estimates in a normal Chrome session; pause on verification."""
import argparse
import csv
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import subprocess
import time
import urllib.request
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=9222)
    parser.add_argument('--open-browser', action='store_true')
    parser.add_argument('--profile', type=Path, default=HERE / '.account-profiles/account-01')
    parser.add_argument('--limit', type=int, default=1)
    parser.add_argument('--resume-current', action='store_true')
    parser.add_argument('--root', type=Path, default=HERE / 'outputs/all-languages-comparison-six-topics/google-coverage')
    args = parser.parse_args()
    sheet = args.root / 'google_counts.csv'
    with sheet.open(encoding='utf-8-sig', newline='') as stream:
        rows = list(csv.DictReader(stream))
    pending = [r for r in rows if not r['result_count']]
    if not pending:
        print('All counts already collected.'); return 0
    # Attach only to local Chrome; never close the user browser or existing tabs.
    endpoint = f'http://127.0.0.1:{args.port}'
    def available():
        try:
            with urllib.request.urlopen(endpoint + '/json/version', timeout=2) as response:
                return json.load(response)
        except Exception:
            return None
    if not available() and args.open_browser:
        chrome = Path(os.environ.get('PROGRAMFILES', 'C:/Program Files')) / 'Google/Chrome/Application/chrome.exe'
        if not chrome.exists():
            raise RuntimeError('Chrome not found')
        args.profile.mkdir(parents=True, exist_ok=True)
        subprocess.Popen([str(chrome), f'--user-data-dir={args.profile.resolve()}', '--remote-debugging-address=127.0.0.1',
            f'--remote-debugging-port={args.port}', '--new-window', pending[0]['search_url']], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(15):
            if available():
                break
            time.sleep(1)
    if not available():
        raise RuntimeError('No attachable Chrome session; use --open-browser')
    captures = args.root / 'browser-captures'
    captures.mkdir(exist_ok=True)
    def persist():
        with sheet.open('w', encoding='utf-8-sig', newline='') as stream:
            writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
            writer.writeheader(); writer.writerows(rows)
    with sync_playwright() as p:
        browser = p.chromium.connect_over_cdp(endpoint, timeout=25000)
        context = browser.contexts[0]
        candidates = [page for page in context.pages if 'google.com/search?' in page.url or 'google.com/sorry/' in page.url]
        page = candidates[-1] if (args.resume_current or args.open_browser) and candidates else context.new_page()
        for index, row in enumerate(pending[:args.limit]):
            current_url = page.url
            if '/sorry/' in current_url:
                current_url = parse_qs(urlparse(current_url).query).get('continue', [''])[0]
            same_query = parse_qs(urlparse(current_url).query).get('q', [''])[0] == row['query']
            if not (index == 0 and (args.resume_current or args.open_browser) and candidates and same_query):
                page.goto(row['search_url'], wait_until='domcontentloaded', timeout=45000)
            page.bring_to_front()
            page.wait_for_timeout(2000)
            stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
            stem = row['query_id'] + '-' + stamp
            blocked = '/sorry/' in page.url or page.locator('iframe[src*="recaptcha"],form[action*="sorry"]').count() > 0
            text = page.locator('body').inner_text()
            consent = 'consent.google.' in page.url or 'Before you continue to Google' in text
            if not blocked and not consent:
                tool = page.get_by_role('button', name='Tools', exact=True)
                if tool.count() == 1 and tool.is_visible():
                    tool.click(timeout=5000)
                    page.wait_for_timeout(700)
                text = page.locator('body').inner_text()
            stats = page.locator('#result-stats').all_text_contents()
            # Restrict fallback to a complete result-estimate line, not arbitrary page numbers.
            matches = stats or [line for line in text.splitlines() if re.fullmatch(r'\s*(?:About\s+)?[\d,]+\s+results(?:\s*\([\d.]+\s+seconds?\))?\s*', line, re.I)]
            estimate = re.search(r'(?:About\s+)?([\d,]+)\s+results', ' '.join(matches), re.I)
            if estimate and not blocked and not consent:
                row.update(result_count=str(int(estimate.group(1).replace(',', ''))), status='collected', notes='Visible estimate: ' + ' '.join(matches))
            else:
                row.update(status='verification_required' if blocked else 'consent_required' if consent else 'count_not_visible',
                    notes='Browser left open; no challenge bypass or account switching attempted.')
            row.update(collected_at_utc=datetime.now(timezone.utc).isoformat(), provider='google_website_normal_chrome', source_capture='browser-captures/'+stem+'.html')
            (captures / (stem+'.html')).write_text(page.content(), encoding='utf-8')
            (captures / (stem+'.txt')).write_text(text, encoding='utf-8')
            page.screenshot(path=str(captures / (stem+'.png')), full_page=True)
            (captures / (stem+'.json')).write_text(json.dumps(dict(query_id=row['query_id'], requested_url=row['search_url'], actual_url=page.url,
                status=row['status'], result_count=row['result_count'], result_stats=stats), indent=2), encoding='utf-8')
            persist()
            print(f"{row['query_id']}: {row['status']} count={row['result_count'] or 'missing'}", flush=True)
            if row['status'] != 'collected':
                print('Paused. Complete any verification/consent manually in the open Google tab; then use --resume-current.', flush=True)
                return 2
            if index+1 < min(args.limit, len(pending)):
                time.sleep(10)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
