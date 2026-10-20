# Selectable conversation viewer (1.7.1)

Reload the extension in `chrome://extensions`, refresh the ChatGPT conversation, and capture again. The review tab now includes **Selectable conversation** above the original page snapshot.

The viewer extracts the original text and semantic structure from the captured DOM. It preserves headings, emphasis, lists, tables, links, code, and available MathML. It removes absolute positioning, fixed heights, scroll clipping, application controls, and the sidebar where message boundaries can be identified. Recognized learner messages are labeled **You**; other sections display **ChatGPT**, with duplicate leading source speaker headings removed. Unknown roles remain unknown in the exported model and are reported in the preview counts.

Accessible original image files are embedded without resizing or re-encoding, preserving their format and resolution within the image embedding budget. Ordinary images are not replaced with screenshots; inaccessible HTTPS assets remain linked and are reported. Inline SVG is preserved as a static image where self-contained. Canvas and other rendered visual blocks can use cropped screenshots taken from the source tab during capture. Screen pixels are never used to regenerate conversation text. Keep the source tab active while capture runs. Screenshot requests are restricted to the active capture's top frame and token, bounded to the supplied viewport, and rate limited. No screenshot host permission is added to the shipped manifest; the toolbar action's existing `activeTab` grant is used.

Capture brings visual blocks into view and restores scrolling afterward. Embedded frames, SVG diagrams, canvases and eligible CSS animation containers can be saved as static screenshots. Very tall or clipped visuals get a visible-region snapshot marked as partial; unavailable visuals are reported. Missing blocks are never replaced with invented content. An image's embedded text is not selectable or translated; the surrounding transcript remains real HTML.

Version 1.5.1 also preserves button-based user-message bubbles, separates user messages nested inside assistant wrappers, and prevents shared source IDs from discarding a different speaker's message. Preview counts show user and assistant messages separately. These fixes require a new capture; existing saved snapshots are immutable and are not repaired in place.

## Quiz questions

Version 1.6.0 captures recognized quiz panels with a **Question N of M** counter, radio/label options, and **Previous/Next** navigation. It visits reachable questions, saves their wording, options, and already visible feedback as selectable HTML, and attempts to return to the original question. The saved view shows the collected questions together instead of retaining a single interactive screen. Quiz text is included in the translation segments and database save.

As of 1.7.1, normal toolbar capture and recapture select an option on every unanswered quiz question by default, including the final question, to reveal feedback. Existing choices are preserved and generated selections are labeled. If Next requires an answer, navigation fails, or the bounded pass runs out of time, the saved panel and preview report how many questions were captured. Source question restoration failures are reported explicitly.

For answer-gated quizzes, version 1.6.1 adds **Capture remaining quiz questions** in the review tab. Check **Allow selecting quiz answers during this capture**, then click **Capture all quiz questions**. This mode selects the first available radio option only when a navigation button is disabled and no answer is already selected, then retries Previous/Next. It preserves existing selected answers and never clicks Submit/Finish. Answer-enabled capture is now the default for normal capture and recapture as well.

Answer-enabled capture changes the source quiz's responses and may affect its progress. Returning to the starting question does not undo those answers. Every automatically answered question and the feedback it reveals is visibly labeled as capture-generated, not a learner response; the archive report records those question numbers and `selections_are_learner_responses: false`. These labels remain in selectable HTML, translation segments, exports, and database saves. Gates requiring a separate Submit/Check action remain unsupported and are reported as partial captures.

Quizzes in accessible embedded documents are also extracted. Cross-origin or sandboxed frames that the page cannot read still use the existing visible screenshot fallback; hidden questions in those frames are not captured. No extra host permissions are added. The screenshot supplied for development establishes the panel design, not its actual DOM or frame access. Live compatibility still requires a new capture on the real conversation and checking the quiz counts in the review tab.

## Translation and layout

1. Enter **Translation language**.
2. Open **Edit translated text segments** to test translated text directly, or choose **Export translation JSON**.
3. To use an external translator or agent, translate only the `text` fields, set `language`, and preserve `document_id`, every `id`, and every `source` value. Context fields help neighboring inline segments be translated together. Code and formulas are excluded from translation units.
4. Choose **Import translated JSON**, then select **Translation** in the View menu. Unknown IDs, changed sources, duplicates, or a different captured document are rejected. Empty translations retain the source segment and the preview reports translation coverage.
5. Longer translations expand paragraphs, rows and sections naturally. They keep the same structure and assets, not identical pixel coordinates. Normalized multi-column groups can be retained as flexible columns.

**Automatic AI translation or screenshot reconstruction is not connected in this version.** Text comes directly from the DOM. Translation can be edited/imported to evaluate layout before connecting a model. Draft translations remain in extension-origin IndexedDB for the browser session and are cleared when their capture is superseded or the extension starts a new browser session.

## Save and export

- **Download selectable HTML** exports the currently displayed source or translated view. It opens locally, uses real selectable text, and includes source unit metadata. It does not run ChatGPT scripts.
- **Download viewer project** exports a ZIP containing source HTML, the structured conversation JSON, translation JSON, and the translated HTML when available. Embedded images/screenshots travel with the HTML; any remaining linked images can expire.
- With **Save this selectable view to the database** checked, the existing **Save to database** button stores the currently displayed selectable HTML and language in `chatgpt_html_archives`. The report includes the document ID, text/translation counts, and media counts. This uses the existing authenticated, owner/admin archive policy; it does not grant conversation insertion or create assignments automatically.
- Admins can open saved HTML using **Conversations → HTML archives → Open viewer**. This is an isolated iframe with scripts disabled. Archive JSON downloads retain HTML and metadata for future processing.

The original snapshot and the local MHTML/JavaScript experiment remain available for comparison. Check message order, boundaries, formulas and visual completeness on a real ChatGPT conversation before using a capture for evaluation.
