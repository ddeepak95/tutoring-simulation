"""Capture the full conversation panel and download response images."""
import base64
import hashlib
from urllib.parse import urlparse, parse_qs


def conversation_screenshot(page, folder):
    original = page.viewport_size
    dimensions = page.evaluate("({width:innerWidth,height:innerHeight})")
    try:
        # ChatGPT's conversation is a nested scroll panel, not the document scroller.
        # Grow the viewport until the conversation and all ancestors fit vertically.
        height = dimensions["height"]
        for _ in range(8):
            overflow = page.locator("main").evaluate("""e => {
                let extra=0;
                for(let p=e;p;p=p.parentElement) extra=Math.max(extra,p.scrollHeight-p.clientHeight);
                return extra;
            }""")
            if overflow <= 2:
                break
            height += overflow + 20
            if height > 32000:
                raise ValueError("Conversation exceeds screenshot height limit; panel was not captured")
            page.set_viewport_size({"width": dimensions["width"], "height": height})
            page.wait_for_timeout(300)
        else:
            raise ValueError("Could not expand the entire conversation panel")
        page.evaluate("window.scrollTo(0,0)")
        panel = page.locator("main")
        panel.screenshot(path=str(folder / "conversation.png"), animations="disabled")
        bounds = panel.bounding_box()
        return {"path": "conversation.png", "width": bounds["width"], "height": bounds["height"],
                "method": "conversation_panel_with_expanded_viewport"}
    finally:
        if original:
            page.set_viewport_size(original)
        else:
            session = page.context.new_cdp_session(page)
            session.send("Emulation.clearDeviceMetricsOverride")
            session.detach()


def fetch_image(page, url):
    if url.startswith(("data:", "blob:")):
        data = page.evaluate("""async url => {
            const response=await fetch(url); const blob=await response.blob();
            return await new Promise((resolve,reject)=>{
                const reader=new FileReader(); reader.onload=()=>resolve({type:blob.type,data:reader.result.split(',')[1]});
                reader.onerror=reject; reader.readAsDataURL(blob);
            });
        }""", url)
        return base64.b64decode(data["data"]), data["type"]
    if urlparse(url).scheme not in {"http", "https"}:
        raise ValueError("Unsupported image URL")
    response = page.context.request.get(url, timeout=30000)
    try:
        if not response.ok:
            raise ValueError(f"Image returned HTTP {response.status}")
        content_type = response.headers.get("content-type", "").split(";")[0]
        if not content_type.startswith("image/"):
            raise ValueError(f"Expected image, received {content_type}")
        return response.body(), content_type
    finally:
        response.dispose()


def download_images(page, scope, folder):
    elements = scope.locator("img")
    records = []
    for index in range(elements.count()):
        element = elements.nth(index)
        if not element.is_visible():
            continue
        element.scroll_into_view_if_needed()
        try:
            element.evaluate("e => e.decode()", timeout=15000)
        except Exception:
            pass
        info = element.evaluate("e => ({src:e.currentSrc||e.src,alt:e.alt,width:e.naturalWidth,height:e.naturalHeight})")
        if not info["src"]:
            continue
        record = {**info, "files": []}
        urls = [("rendered", info["src"])]
        # Some ChatGPT image cards expose the original/full-size URL as alt text.
        original = urlparse(info["alt"])
        if original.scheme == "https" and original.hostname == urlparse(info["src"]).hostname and parse_qs(original.query).get("purpose") == ["fullsize"]:
            urls.append(("fullsize", info["alt"]))
        for variant, url in urls:
            item = {"variant": variant, "url": url}
            try:
                body, mime = fetch_image(page, url)
                extension = {"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp",
                             "image/gif": ".gif", "image/svg+xml": ".svg", "image/avif": ".avif"}.get(mime, ".img")
                filename = f"images/image-{index+1:03d}-{variant}{extension}"
                (folder / "images").mkdir(exist_ok=True)
                (folder / filename).write_bytes(body)
                item.update(status="downloaded", path=filename, content_type=mime, bytes=len(body),
                            sha256=hashlib.sha256(body).hexdigest())
            except Exception as exc:
                item.update(status="failed", error=str(exc)[:300])
            record["files"].append(item)
        records.append(record)
    return records


def save_conversation_html(page, folder, images):
    """Archive all messages in main, excluding navigation and sidebar markup."""
    from bs4 import BeautifulSoup
    from html import escape
    panel = BeautifulSoup(page.locator("main").evaluate("e => e.outerHTML"), "html.parser")
    for script in panel.select("script"):
        script.decompose()
    local_images = {record["src"]: asset["path"] for record in images for asset in record["files"]
                    if asset["status"] == "downloaded" and asset["variant"] == "rendered"}
    for image in panel.select("img"):
        if image.get("src") in local_images:
            image["src"] = local_images[image["src"]]
            image.attrs.pop("srcset", None)
    # Preserve styling references and inline styles; the archive has no app scripts.
    styles = page.locator('head style, head link[rel="stylesheet"]').evaluate_all("""es => es.map(e => {
        const copy=e.cloneNode(true); if(e.tagName==='LINK') copy.setAttribute('href',e.href);
        return copy.outerHTML;
    }).join('\\n')""")
    theme = page.locator('html').get_attribute('class') or ''
    document = ('<!doctype html>\n<html class="' + escape(theme, quote=True) + '"><head>'
                '<meta charset="utf-8"><title>ChatGPT conversation</title>' + styles +
                '</head><body>' + str(panel) + '</body></html>')
    (folder / 'conversation.html').write_text(document, encoding='utf-8')
    return {"path": "conversation.html", "scope": "main_conversation_panel",
            "styles": "inline styles and original stylesheet URLs; external CSS may require network access"}


def message_markdown(html, images=()):
    from bs4 import BeautifulSoup
    from markdownify import markdownify
    soup = BeautifulSoup(html, "html.parser")
    for math in soup.select('.katex'):
        annotation = math.select_one('annotation[encoding="application/x-tex"]')
        if annotation:
            display = math.parent and 'katex-display' in math.parent.get('class', [])
            math.replace_with(('\n$$\n' if display else '$') + annotation.get_text() + ('\n$$\n' if display else '$'))
    local_images = {record['src']: asset['path'] for record in images for asset in record['files']
                    if asset['status'] == 'downloaded' and asset['variant'] == 'rendered'}
    for image in soup.select('img'):
        if image.get('src') in local_images:
            image['src'] = local_images[image['src']]
            image.attrs.pop('srcset', None)
    return markdownify(str(soup), heading_style='ATX').strip()


def save_conversation_markdown(page, folder, images):
    messages = page.locator('main [data-message-author-role="user"], main [data-message-author-role="assistant"]')
    parts = ['# Conversation', '']
    for index in range(messages.count()):
        message = messages.nth(index)
        role = 'User' if message.get_attribute('data-message-author-role') == 'user' else 'Assistant'
        parts += [f'## {index + 1}. {role}', '', message_markdown(message.inner_html(), images), '']
    if not messages.count():
        raise ValueError('No conversation messages found for Markdown capture')
    (folder / 'conversation.md').write_text('\n'.join(parts), encoding='utf-8')
    return {'path': 'conversation.md', 'message_count': messages.count()}


def capture_assets(page, scope, folder):
    folder.mkdir(parents=True, exist_ok=True)
    images = download_images(page, scope, folder)
    screenshot = conversation_screenshot(page, folder)
    html = save_conversation_html(page, folder, images)
    markdown = save_conversation_markdown(page, folder, images)
    return {"conversation_screenshot": screenshot, "conversation_html": html,
            "conversation_markdown": markdown, "images": images}
