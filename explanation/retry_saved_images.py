"""Retry failed HTTP image downloads from saved results without resubmitting chats."""
import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('folder', type=Path)
    args = parser.parse_args()
    failed = 0
    for path in sorted(args.folder.rglob('result.json')):
        data = json.loads(path.read_text(encoding='utf-8'))
        replacements = {}
        for index, image in enumerate(data.get('images', []), 1):
            for asset in image.get('files', []):
                if asset.get('status') != 'failed':
                    continue
                url = asset['url']
                if urlparse(url).scheme != 'https' or urlparse(url).hostname != 'images.openai.com':
                    raise ValueError('Only saved HTTPS images.openai.com URLs are supported')
                try:
                    with urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30) as response:
                        mime = response.headers.get_content_type()
                        if not mime.startswith('image/'):
                            raise ValueError(f'Expected image, got {mime}')
                        body = response.read()
                    if not body:
                        raise ValueError('Empty image')
                    extension = {'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp',
                                 'image/gif': '.gif', 'image/svg+xml': '.svg', 'image/avif': '.avif'}.get(mime, '.img')
                    variant = asset['variant']
                    if variant not in ('rendered', 'fullsize'):
                        raise ValueError('Unknown variant')
                    filename = f'images/image-{index:03d}-{variant}{extension}'
                    (path.parent / 'images').mkdir(exist_ok=True)
                    (path.parent / filename).write_bytes(body)
                    asset['previous_error'] = asset.pop('error', None)
                    asset.update(status='downloaded', path=filename, bytes=len(body), content_type=mime,
                                 sha256=hashlib.sha256(body).hexdigest(), retried_at=datetime.now(timezone.utc).isoformat())
                    if variant == 'rendered':
                        replacements[image['src']] = filename
                    print(f'{path.parent.name}: {filename} saved', flush=True)
                except Exception as exc:
                    failed += 1
                    asset['error'] = str(exc)[:300]
                    print(f'{path.parent.name}: image retry failed: {type(exc).__name__}', flush=True)
        if replacements:
            html_path = path.with_name('conversation.html')
            soup = BeautifulSoup(html_path.read_text(encoding='utf-8'), 'html.parser')
            for img in soup.select('img'):
                if img.get('src') in replacements:
                    img['src'] = replacements[img['src']]
                    img.attrs.pop('srcset', None)
            html_path.write_text(str(soup), encoding='utf-8')
            md_path = path.with_name('conversation.md')
            text = md_path.read_text(encoding='utf-8')
            for original, local in replacements.items():
                text = text.replace(f']({original})', f']({local})')
            md_path.write_text(text, encoding='utf-8')
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return 1 if failed else 0


if __name__ == '__main__':
    raise SystemExit(main())
