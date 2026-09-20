"""Collect Google total-result estimates with SerpAPI and preserve an auditable cache."""
import argparse
import csv
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import time

from dotenv import load_dotenv
import requests

HERE = Path(__file__).resolve().parent
DEFAULT = HERE / 'outputs/all-languages-comparison-six-topics/google-coverage-serpapi'


def parse_total(raw):
    value = raw.get('search_information', {}).get('total_results')
    if isinstance(value, bool):
        return None
    if isinstance(value, int) and value >= 0:
        return value
    if isinstance(value, str) and value.replace(',', '').isdigit():
        return int(value.replace(',', ''))
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=DEFAULT)
    parser.add_argument('--limit', type=int, default=48)
    parser.add_argument('--fetch', action='store_true', help='Send uncached queries to SerpAPI')
    args = parser.parse_args()
    sheet = args.output / 'google_counts.csv'
    if not sheet.exists():
        parser.error('Prepare this output with google_coverage_analysis.py --output first')
    with sheet.open(encoding='utf-8-sig', newline='') as f:
        rows = list(csv.DictReader(f))
    assert all(not r['provider'] or r['provider']=='serpapi_google' for r in rows), 'Do not mix providers'
    cache = args.output / 'cache'
    cache.mkdir(exist_ok=True)
    load_dotenv(HERE.parent / '.env')
    key = os.environ.get('SERPAPI_API_KEY') or os.environ.get('SERP_KEY')
    if args.fetch and not key:
        print('Missing SERPAPI_API_KEY. Add it to the project .env; no requests sent.')
        return 2
    requested = 0
    for row in rows:
        path = cache / (row['query_id'] + '.json')
        parameters = dict(engine='google', q=row['query'], google_domain='google.com', hl='en', gl='us',
                          location='United States', device='desktop', no_cache='true')
        if path.exists():
            record = json.loads(path.read_text(encoding='utf-8'))
            assert record['parameters']==parameters
        elif args.fetch and requested < args.limit:
            # SerpAPI uses an API key query parameter; never log URLs or exception text.
            try:
                response = requests.get('https://serpapi.com/search.json', params={**parameters, 'api_key': key}, timeout=120)
            except requests.RequestException:
                print('SerpAPI transport failure; stopped. Re-run to resume cached work.')
                return 1
            requested += 1
            if response.status_code != 200:
                print(f'SerpAPI HTTP {response.status_code}; stopped without exposing request credentials.')
                return 1
            raw = response.json()
            if raw.get('error') or raw.get('search_metadata', {}).get('status')!='Success':
                print('SerpAPI returned an error or incomplete search; stopped. Check account dashboard.')
                return 1
            record = dict(parameters=parameters, fetched_at_utc=datetime.now(timezone.utc).isoformat(), raw_response=raw)
            serialized = json.dumps(record, ensure_ascii=False, indent=2)
            path.write_text(serialized.replace(key, '[REDACTED]'), encoding='utf-8')
        else:
            continue
        raw = record['raw_response']
        total = parse_total(raw)
        row.update(provider='serpapi_google', result_count='' if total is None else str(total),
            collected_at_utc=record['fetched_at_utc'], status='count_not_returned' if total is None else 'collected',
            source_capture='cache/'+path.name,
            notes='search_information.total_results; US location; desktop; no results-language restriction; '+
                  'search_id='+str(raw.get('search_metadata',{}).get('id','')))
        with sheet.open('w',encoding='utf-8-sig',newline='') as f:
            writer=csv.DictWriter(f,fieldnames=list(rows[0])); writer.writeheader(); writer.writerows(rows)
        print(f"{row['query_id']}: {row['status']} count={row['result_count'] or 'missing'}",flush=True)
        if args.fetch:
            time.sleep(1)
    print(f"Counts available: {sum(r['result_count']!='' for r in rows)}/{len(rows)}. New API requests: {requested}.")
    return 0


if __name__=='__main__':
    raise SystemExit(main())
