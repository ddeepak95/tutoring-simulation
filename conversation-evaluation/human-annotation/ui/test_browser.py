"""Exercise selection, all six forms, exports, import validation and local saving."""
from __future__ import annotations

import json
import tempfile
import threading
import unittest
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import Error, sync_playwright

UI = Path(__file__).resolve().parent


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class AnnotationBrowserTest(unittest.TestCase):
    def test_annotation_workflow(self):
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(UI)))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with tempfile.TemporaryDirectory() as temporary, sync_playwright() as playwright:
                try:
                    browser = playwright.chromium.launch(headless=True)
                except Error as error:
                    if "Executable doesn't exist" not in str(error):
                        raise
                    browser = playwright.chromium.launch(channel="msedge", headless=True)
                context = browser.new_context(viewport={"width": 1440, "height": 1000}, accept_downloads=True)
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(f"http://127.0.0.1:{server.server_port}")
                self.assertEqual(page.locator(".turn").count(), 7)
                self.assertEqual(page.locator(".annotation-panel").count(), 0)
                self.assertEqual(page.locator("#editor").count(), 0)
                self.assertEqual(page.locator("#conversation-select option").count(), 3)
                page.locator("#conversation-select").select_option("1")
                self.assertIn("சகப்பிணைப்பு", page.locator(".turn-body").first.inner_text())
                original_text = page.locator(".turn-body").first.text_content()
                self.select(page, "சகப்பிணைப்பு ஆரம்")
                page.locator("#selection-options button").filter(has_text="Concepts & subtopics").click()
                self.assertEqual(page.locator(".turn-body").first.text_content(), original_text)
                self.assertEqual(page.locator("#annotation-total").inner_text(), "1")
                self.assertEqual(page.locator(".turn-body mark").first.text_content(), "சகப்பிணைப்பு ஆரம்")
                self.assertEqual(page.get_by_role("button", name="Add annotation", exact=True).count(), 0)
                self.assertIn("Details needed", page.locator("#popup-save-status").inner_text())
                # Export and reload must retain even a highlight whose attributes are blank.
                with page.expect_download() as pending_download:
                    page.locator("#export-button").click()
                pending_path = Path(temporary) / "pending.json"
                pending_download.value.save_as(pending_path)
                pending_project = json.loads(pending_path.read_text(encoding="utf-8"))
                self.assertEqual(pending_project["highlight_counts"]["concepts_and_subtopics_covered"], 1)
                self.assertEqual(pending_project["feature_counts"]["concepts_and_subtopics_covered"], 0)
                self.assertEqual(pending_project["annotations"][0]["entry"]["detail_level"], "")
                page.reload()
                page.locator("#conversation-select").select_option("1")
                self.assertEqual(page.locator("#annotation-total").inner_text(), "1")
                page.locator(".turn-body mark").first.click()
                self.assertTrue(page.locator("#selection-menu").is_visible())
                self.assertTrue(page.locator("#popup-feature-control").is_visible())
                page.locator("#popup-field-topic").fill("சகப்பிணைப்பு ஆரம்")
                page.locator("#popup-field-detail_level").get_by_role("button", name="Explained", exact=True).click()
                self.assertNotIn("Details needed", page.locator("#popup-save-status").inner_text())
                page.reload()
                page.locator("#conversation-select").select_option("1")
                page.locator(".turn-body mark").first.click()
                self.assertEqual(page.locator("#popup-field-detail_level").get_by_role("button", name="Explained", exact=True).get_attribute("aria-pressed"), "true")
                page.locator("#dismiss-selection").click()
                self.assertEqual(page.locator("#annotation-total").inner_text(), "1")
                self.assertEqual(page.locator(".turn-body mark").count(), 1)

                fixture = {"conversation_id": "browser-test", "learning_topic": "Evaporation", "messages": [
                    {"speaker": "tutor", "turn_id": "t1", "text": "Evaporation changes liquid water into vapour. Wet clothes dry because water evaporates. **Why do clothes dry faster in wind?** Does that make sense? Current flows like water in a pipe. Rate = amount / time. Fireworks at Diwali show atomic emission. தமிழ் 😀 **கேள்வி?**"},
                    {"speaker": "student", "turn_id": "s1", "text": "Can you say more?"},
                    {"speaker": "tutor", "turn_id": "t2", "text": "Airflow removes humid air near the clothes, so evaporation continues."},
                ]}
                fixture_path = Path(temporary) / "fixture.json"
                fixture_path.write_text(json.dumps(fixture, ensure_ascii=False), encoding="utf-8")
                page.locator("#file-input").set_input_files(fixture_path)
                page.wait_for_function("document.querySelector('#conversation-meta').textContent === 'Evaporation'")
                page.locator("#annotator").fill("Test annotator")
                cases = [
                    ("Evaporation changes liquid water into vapour.", "Concepts & subtopics", {"topic": "Evaporation", "detail_level": "Explained"}),
                    ("Wet clothes dry because water evaporates.", "Examples", {"detail_level": "Explained"}),
                    ("Current flows like water in a pipe.", "Analogies", {"detail_level": "Brief"}),
                    ("Rate = amount / time.", "Representations", {"representation_type": "Equation"}),
                    ("Fireworks at Diwali show atomic emission.", "Cultural references", {"detail_level": "Brief"}),
                    ("**Why do clothes dry faster in wind?**", "Questions", {"question_type": "Knowledge-checking"}),
                    ("Does that make sense?", "Questions", {"question_type": "Instructional"}),
                ]
                for count, (quote, feature, fields) in enumerate(cases, 1):
                    self.select(page, quote)
                    page.locator("#selection-options button").filter(has_text=feature).click()
                    self.assertEqual(page.locator("#annotation-total").inner_text(), str(count))
                    self.assertTrue(page.locator(".turn-body mark").count() > 0)
                    self.assertEqual(page.locator("#attribute-options textarea").count(), 1 if feature == "Concepts & subtopics" else 0)
                    self.assertEqual(page.locator("#attribute-options .attribute-option-group").count(), 1)
                    self.assertTrue(page.locator("#attribute-panel").is_visible())
                    self.assertFalse(page.locator("#selection-options").is_visible())
                    self.assertEqual(page.locator("#attribute-options .popup-field").count(), len(fields))
                    if feature == "Examples":
                        self.assertEqual(page.locator("#field-example").count(), 0)
                        self.assertEqual(page.locator("#field-concept_illustrated").count(), 0)
                        self.assertEqual(page.locator("#popup-field-detail_level button").count(), 3)
                    for key, value in fields.items():
                        popup_control = page.locator(f"#popup-field-{key}")
                        if popup_control.evaluate("node => node.tagName") == "TEXTAREA":
                            popup_control.fill(value)
                        else:
                            popup_control.get_by_role("button", name=value, exact=True).click()
                        if key == "topic":
                            self.assertEqual(popup_control.input_value(), value)
                        else:
                            self.assertEqual(popup_control.get_by_role("button", name=value, exact=True, include_hidden=True).get_attribute("aria-pressed"), "true")
                    self.assertFalse(page.locator("#selection-menu").is_visible())
                    if feature == "Questions":
                        self.assertEqual(page.locator("#field-question").count(), 0)
                        self.assertEqual(page.locator("#field-concept_checked").count(), 0)
                    self.assertNotIn("Details needed", page.locator("#popup-save-status").inner_text())
                self.assertEqual(page.locator("#annotation-total").inner_text(), "7")

                # The detail pop-up can update each level without duplicating an example.
                for level in ("Brief", "Elaborated", "Explained"):
                    self.select(page, cases[1][0])
                    page.locator("#selection-options button").filter(has_text="Examples").click()
                    page.locator("#popup-field-detail_level").get_by_role("button", name=level, exact=True).click()
                    self.assertEqual(page.locator("#popup-field-detail_level").get_by_role("button", name=level, exact=True, include_hidden=True).get_attribute("aria-pressed"), "true")
                    self.assertEqual(page.locator("#annotation-total").inner_text(), "7")
                # Dismissing the next step keeps the newly saved example and does not guess a level.
                self.select(page, "தமிழ் 😀")
                page.locator("#selection-options button").filter(has_text="Examples").click()
                page.keyboard.press("Escape")
                self.assertFalse(page.locator("#selection-menu").is_visible())
                self.assertEqual(page.locator("#annotation-total").inner_text(), "8")
                self.assertEqual(page.locator('#popup-field-detail_level button[aria-pressed="true"]').count(), 0)
                self.assertTrue(page.locator(".turn-body mark").filter(has_text="தமிழ் 😀").is_visible())
                page.locator(".turn-body mark").filter(has_text="தமிழ் 😀").click()
                page.locator("#delete-highlight").click()
                self.assertEqual(page.locator("#annotation-total").inner_text(), "7")

                self.select(page, "Airflow removes humid air near the clothes")
                page.locator("#extend-button").click()
                page.locator("#popup-choices .extend-entry").filter(has_text="Concepts and Subtopics Covered").click()
                page.locator("#popup-field-detail_level").get_by_role("button", name="Elaborated", exact=True).click()
                self.assertEqual(page.locator("#annotation-total").inner_text(), "7")
                self.assertEqual(page.get_by_role("button", name="Save changes", exact=True).count(), 0)
                self.assertEqual(page.locator('.turn-body[data-turn-id="t1"]').text_content(), fixture["messages"][0]["text"])
                # Editing a saved highlight allows reclassification and retains its source text.
                page.locator("#dismiss-selection").click()
                page.locator(".turn-body mark").filter(has_text=cases[3][0]).click()
                page.locator("#popup-feature-select").select_option("analogies")
                page.locator("#popup-field-detail_level").get_by_role("button", name="Brief", exact=True).click()
                self.assertTrue(page.locator("#selection-menu").is_visible())
                page.locator("#popup-feature-select").select_option("representations")
                page.locator("#popup-field-representation_type").get_by_role("button", name="Equation", exact=True).click()
                page.locator("#dismiss-selection").click()
                self.assertEqual(page.locator("#annotation-total").inner_text(), "7")
                # An overlapping highlight can be selected and deleted independently.
                self.select(page, cases[1][0])
                page.locator("#selection-options button").filter(has_text="Analogies").click()
                page.locator("#popup-field-detail_level").get_by_role("button", name="Brief", exact=True).click()
                self.assertEqual(page.locator("#annotation-total").inner_text(), "8")
                page.locator(".turn-body mark").filter(has_text=cases[1][0]).click()
                self.assertEqual(page.locator("#popup-choices .extend-entry").count(), 2)
                page.locator("#popup-choices .extend-entry").filter(has_text="Analogies").click()
                page.locator("#delete-highlight").click()
                self.assertEqual(page.locator("#annotation-total").inner_text(), "7")
                self.assertEqual(page.locator(".turn-body mark").filter(has_text=cases[1][0]).count(), 1)
                page.locator("#guide-button").click()
                page.locator("#guide-select").select_option("questions")
                self.assertIn("Rhetorical questions are Instructional", page.locator("#guide-content").inner_text())
                page.locator("#guide-button").click()

                with page.expect_download() as download:
                    page.locator("#export-button").click()
                export_path = Path(temporary) / "annotations.json"
                download.value.save_as(export_path)
                project = json.loads(export_path.read_text(encoding="utf-8"))
                self.assertEqual(project["feature_counts"]["questions"], 2)
                self.assertEqual(project["annotator"], "Test annotator")
                self.assertEqual(project["instructional_features"]["concepts_and_subtopics_covered"][0]["turn_locations"], ["t1", "t2"])
                self.assertEqual(project["instructional_features"]["questions"][0]["question"], cases[5][0])
                self.assertIsNone(project["instructional_features"]["questions"][1]["concept_checked"])
                self.assertNotIn("concept_checked", project["instructional_features"]["questions"][0])
                for key, primary, position, removed in [
                    ("analogies", "comparison", 2, "concept_explained"),
                    ("representations", "representation", 3, "concept_illustrated"),
                    ("cultural_references", "reference", 4, "concept_illustrated"),
                ]:
                    entry = project["instructional_features"][key][0]
                    self.assertEqual(entry[primary], cases[position][0])
                    self.assertNotIn(removed, entry)
                self.assertNotIn("detail_level", project["instructional_features"]["representations"][0])
                self.assertEqual(project["instructional_features"]["examples"][0]["detail_level"], "Explained")
                self.assertEqual(project["instructional_features"]["examples"][0]["example"], cases[1][0])
                self.assertNotIn("concept_illustrated", project["instructional_features"]["examples"][0])
                self.assertEqual(project["incomplete_annotations"], [])
                self.assertEqual(project["conversation"]["messages"][0]["text"], fixture["messages"][0]["text"])

                # Import into a clean browser to prove exported work is portable.
                other_context = browser.new_context(viewport={"width": 1440, "height": 1000})
                other = other_context.new_page()
                other.goto(page.url)
                other.locator("#file-input").set_input_files(pending_path)
                other.wait_for_function("document.querySelector('#annotation-total').textContent === '1'")
                other.locator(".turn-body mark").first.click()
                self.assertEqual(other.locator('#popup-field-detail_level button[aria-pressed="true"]').count(), 0)
                other.locator("#dismiss-selection").click()
                other.locator("#file-input").set_input_files(export_path)
                other.wait_for_function("document.querySelector('#annotation-total').textContent === '7'")
                self.assertEqual(other.locator("#annotator").input_value(), "Test annotator")
                other.reload()
                other.locator("#conversation-select").select_option("3")
                self.assertEqual(other.locator("#annotation-total").inner_text(), "7")
                question_mark = other.locator(".turn-body mark").filter(has_text=cases[5][0])
                question_mark.focus()
                question_mark.press("Enter")
                self.assertTrue(other.locator("#popup-feature-control").is_visible())
                other.locator("#delete-highlight").click()
                self.assertEqual(other.locator("#annotation-total").inner_text(), "6")
                other.locator("#toast").get_by_role("button", name="Undo", exact=True).click()
                self.assertEqual(other.locator("#annotation-total").inner_text(), "7")

                bad = json.loads(json.dumps(project))
                bad["annotations"][0]["evidence"][0]["quote"] = "Fabricated evidence"
                bad_path = Path(temporary) / "bad.json"
                bad_path.write_text(json.dumps(bad), encoding="utf-8")
                other.locator("#file-input").set_input_files(bad_path)
                other.wait_for_function("document.querySelector('#toast').textContent.includes('Could not import')")
                self.assertEqual(other.locator("#annotation-total").inner_text(), "7")

                # Existing conversations sharing an ID remain independent.
                page.locator("#conversation-select").select_option("2")
                self.assertEqual(page.locator("#annotation-total").inner_text(), "0")
                page.locator("#conversation-select").select_option("1")
                self.assertEqual(page.locator("#annotation-total").inner_text(), "1")
                # Basic small-screen usability: controls remain reachable, no page overflow.
                page.set_viewport_size({"width": 390, "height": 844})
                self.assertTrue(page.locator("#export-button").is_visible())
                self.assertTrue(page.evaluate("document.documentElement.scrollWidth <= innerWidth"))
                self.assertEqual(errors, [])
                browser.close()
        finally:
            server.shutdown()
            server.server_close()

    @staticmethod
    def select(page, quote):
        page.evaluate("""quote => {
          const body = [...document.querySelectorAll('.turn-body[data-speaker="tutor"]')].find(n => n.textContent.includes(quote));
          if (!body) throw new Error('Missing test quote');
          body.scrollIntoView({block:'nearest', behavior:'instant'});
        }""", quote)
        # Selection happens after the scroll event, just as it does for a human drag.
        page.wait_for_timeout(100)
        page.evaluate("""quote => {
          const body = [...document.querySelectorAll('.turn-body[data-speaker="tutor"]')].find(n => n.textContent.includes(quote));
          if (!body) throw new Error('Missing test quote');
          const start = body.textContent.indexOf(quote), end = start + quote.length;
          const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
          let node, offset = 0, startNode, startOffset, endNode, endOffset;
          while (node = walker.nextNode()) {
            if (!startNode && offset + node.length > start) { startNode = node; startOffset = start - offset; }
            if (offset + node.length >= end) { endNode = node; endOffset = end - offset; break; }
            offset += node.length;
          }
          const range = document.createRange();
          range.setStart(startNode, startOffset); range.setEnd(endNode, endOffset);
          const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range);
          body.dispatchEvent(new MouseEvent('mouseup', {bubbles:true}));
        }""", quote)
        page.locator("#selection-menu").wait_for(state="visible")


if __name__ == "__main__":
    unittest.main()
