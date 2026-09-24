"""Check one ordinary Google page for a visible result estimate; never bypass challenges."""
import json
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

out = Path(__file__).resolve().parents[1] / 'outputs/all-languages-comparison-six-topics/google-coverage/probe'
out.mkdir(parents=True, exist_ok=True)
url = 'https://www.google.com/search?q=theory+of+relativity&hl=en&gl=us&pws=0'
record = dict(query='theory of relativity', requested_url=url, collected_at_utc=datetime.now(timezone.utc).isoformat())
with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 1000})
    try:
        response = page.goto(url, wait_until='domcontentloaded', timeout=45000)
        page.wait_for_timeout(2500)
        record.update(http_status=response.status if response else None, final_url=page.url, title=page.title())
        blocked = '/sorry/' in page.url or page.locator('iframe[src*="recaptcha"],form[action*="sorry"]').count() > 0
        record['blocked'] = blocked
        record['result_stats'] = page.locator('#result-stats').all_text_contents()
        # Tools is an ordinary search UI control, not a verification control.
        if not blocked and not record['result_stats']:
            tools = page.get_by_role('button', name='Tools', exact=True)
            if tools.count() == 1 and tools.is_visible():
                tools.click(timeout=5000)
                page.wait_for_timeout(1000)
                record['result_stats'] = page.locator('#result-stats').all_text_contents()
        (out / 'page.html').write_text(page.content(), encoding='utf-8')
        (out / 'visible_text.txt').write_text(page.locator('body').inner_text(), encoding='utf-8')
        page.screenshot(path=str(out / 'page.png'), full_page=True)
    except Exception as exc:
        record['error_type'] = type(exc).__name__
    finally:
        browser.close()
(out / 'probe.json').write_text(json.dumps(record, indent=2), encoding='utf-8')
print(json.dumps(record, indent=2))
