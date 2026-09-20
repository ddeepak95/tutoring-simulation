from _paths import EXPLANATION_ROOT
"""Local browser integration test; no external websites or credentials."""
import base64
import struct
import tempfile
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright
from browser_assets import capture_assets


class BrowserAssetsTests(unittest.TestCase):
    def test_nested_scroll_page_and_image_download(self):
        svg = b'<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="blue"/></svg>'
        url = 'data:image/svg+xml;base64,' + base64.b64encode(svg).decode()
        with tempfile.TemporaryDirectory() as directory, sync_playwright() as p:
            browser = p.chromium.launch(channel='chrome', headless=True)
            try:
                page = browser.new_page(viewport={"width": 900, "height": 600})
                page.set_content(f'''<style>body{{margin:0;display:flex}} aside{{width:220px;flex-shrink:0}}
                    .shell{{height:100vh;display:flex;flex-direction:column;flex:1}}
                    .scroller{{overflow:auto;flex:1;min-height:0}}main{{min-height:0}}</style>
                    <aside>Private sidebar content</aside>
                    <div class="shell"><header>Page header</header><div class="scroller"><main>
                    <section><div data-message-author-role="user"><p>Prompt</p></div>
                    <div data-message-author-role="assistant"><div style="height:1800px">Long answer</div>
                    <img src="{url}" alt="Test image"><p>Last line of answer</p></div>
                    <div data-message-author-role="user">Follow-up question</div>
                    <div data-message-author-role="assistant">Second response</div></section>
                    </main></div></div>''')
                result = capture_assets(page, page.locator('section'), Path(directory))
                self.assertEqual(page.viewport_size, {"width":900,"height":600})
                png = (Path(directory)/'conversation.png').read_bytes()
                width, height = struct.unpack('>II',png[16:24])
                self.assertEqual(width,680)
                self.assertGreater(height,1900)
                self.assertEqual(len(result['images']),1)
                image = result['images'][0]['files'][0]
                self.assertEqual(image['status'],'downloaded')
                self.assertEqual((Path(directory)/image['path']).read_bytes(),svg)
                self.assertEqual(result['images'][0]['width'],120)
                html = (Path(directory)/'conversation.html').read_text(encoding='utf-8')
                self.assertIn('Prompt',html)
                self.assertIn('Long answer',html)
                self.assertIn('Last line of answer',html)
                self.assertNotIn('Private sidebar content',html)
                self.assertNotIn('Page header',html)
                self.assertIn(image['path'],html)
                self.assertFalse((Path(directory)/'page.png').exists())
                markdown = (Path(directory)/'conversation.md').read_text(encoding='utf-8')
                self.assertEqual(result['conversation_markdown']['message_count'],4)
                self.assertLess(markdown.index('Prompt'),markdown.index('Long answer'))
                self.assertLess(markdown.index('Long answer'),markdown.index('Follow-up question'))
                self.assertLess(markdown.index('Follow-up question'),markdown.index('Second response'))
                self.assertIn('## 1. User',markdown)
                self.assertIn('## 4. Assistant',markdown)
                self.assertIn(image['path'],markdown)
                self.assertNotIn('Private sidebar content',markdown)
                self.assertFalse((Path(directory)/'answer.md').exists())
            finally:
                browser.close()


if __name__ == '__main__':
    unittest.main()
