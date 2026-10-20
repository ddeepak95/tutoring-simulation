# Save ChatGPT page HTML ? extension 1.7.19

Private Manifest V3 Chrome extension. Scrolls the available ChatGPT history and saves styled HTML and text, including the sidebar and interface, for later cleanup. The basic page archive does not require message selectors; identifiable virtualized turns are collected separately when they disappear from the final page.

## Install or update

Version 1.7.3 also cleans labels after interface controls are removed and handles unrecognized layouts, invisible formatting characters, and literal Markdown headings.

Version 1.7.4 retries oversized captures without copied inline styling. This keeps the semantic HTML, text and image sources while avoiding repeated full-size capture attempts.

Version 1.7.5 also reduces oversized captures to the conversation content and drops nonessential interface attributes before reporting a size failure.

Version 1.7.6 retains ordinary HTTPS image sources as links instead of embedding their bytes.

Version 1.7.7 disabled page-capture screenshots. Ordinary images remain linked, SVG remains HTML, and canvases or non-quiz frames receive omitted-content placeholders.

Version 1.7.8 removes the cap on the number of interactive quiz panels collected in a conversation. Time and per-quiz limits still apply and incomplete panels are reported.

Version 1.7.19 fixes the service worker parse error that prevented capture from starting. It removes source-browser asset links and external SVG symbol references that cannot load in the sandboxed preview. Image uploads remain deduplicated and fall back to embedded bytes if Storage rejects them. Normal page capture includes one full-viewport screenshot with the ChatGPT input hidden.

The standalone [question capture agent](QUESTION-AGENT.md) can ask a local list of prompts in fresh ChatGPT chats, inspect bounded interactive content, and save both HTML archives and annotation-ready conversations.

Version 1.7.2 removes redundant speaker-label-only turns before saving, including nested wrappers and split labels. Quoted labels and learner messages are preserved. Reload the extension and recapture to apply this to a conversation.

Version 1.7.1 makes answer-enabled quiz capture the default for toolbar capture and recapture. It selects an available option on each unanswered question, including the last, while preserving existing answers. Assisted capture also starts with quiz answering enabled. Generated answers and feedback remain labeled as capture artifacts.

Version 1.7.0 adds [assisted capture with the direct Gemini API](ASSISTED-CAPTURE.md). It preserves the normal snapshot and collects additional interactive states, with an action log and Stop control. Run the local helper using the existing Gemini API key; no model key is bundled.

Version 1.6.1 adds an explicit answer-enabled capture action for gated quizzes. In the review tab, check **Allow selecting quiz answers during this capture**, then click **Capture all quiz questions**. This can change source quiz answers; automatically chosen options and revealed feedback are labeled as capture artifacts. Normal capture still avoids selecting answers.

Version 1.6.0 adds [quiz question capture](SELECTABLE-VIEWER.md#quiz-questions): recognized Previous/Next panels are saved as a selectable list of reachable questions, choices, and existing feedback. Partial captures are reported; no answers are selected.

Version 1.5.0 adds the [selectable conversation and translation-layout viewer](SELECTABLE-VIEWER.md), including embedded visuals, cropped screenshot fallbacks, translation editing/import, standalone HTML, and database saving.

Version 1.4.0 adds the [original page and JavaScript experiment](ORIGINAL-ARCHIVE.md): native MHTML and a downloadable local HTML/resource replay ZIP. See that guide to try the original layout and animations.

1. From the repository root run `npm --prefix chatgpt-conversation-extension run package` (Node 20.12+ and Python 3). Only the public Supabase URL and publishable/anon key from `annotation-portal/.env.local` are bundled.
2. In `chrome://extensions`, enable **Developer mode** and **Load unpacked**, selecting `chatgpt-conversation-extension/dist`. If already installed from that folder, click **Reload**. Close old review tabs.
3. Refresh a saved `https://chatgpt.com/c/...` conversation (project conversation URLs also work). Wait until generation finishes, then click the extension. Keep the source tab open while capture scrolls through available history (up to 75 seconds). The original scroll position is restored afterward.
4. Review the page preview; page text and literal HTML are available in expandable sections. The status should show **Extension 1.7.19** and **HTML archive**. Sign in using your existing portal username/password; enter title, topic and language; click **Save to database**.
5. Admins can use **Open in portal**, then **HTML archives ? Download archive**. The JSON download contains the original archived HTML, page text and provenance. HTML archives need cleanup/conversion into user/assistant turns before annotation or comparison assignment. Annotators can save and read their own archives; admins can inspect all archives.

The ZIP is `chatgpt-conversation-extension-1.7.19.zip`. Extract into a permanent folder before loading; Chrome cannot load a ZIP directly. The portal URL defaults to `http://127.0.0.1:5173` and is configurable in **Portal settings**. Saving goes directly to Supabase and works when the local portal is stopped.

## Database setup

From `annotation-portal`, after applying the existing portal migrations:

```powershell
node scripts/migrate-chatgpt-import.mjs --project YOUR_PROJECT_REF
node scripts/migrate-chatgpt-html-archives.mjs --project YOUR_PROJECT_REF
```

Checked runners require the local Supabase management token, check the configured project, fingerprint migrations and verify RPC permissions and row policies. Server credentials never enter the extension.

`save_chatgpt_html_archive(p_capture jsonb)` validates the authenticated portal role, saved ChatGPT URL, title/topic/language, timestamp and archive report. It stores HTML and text in `chatgpt_html_archives`, separate from annotatable conversations. A server fingerprint covers exact HTML/text and editable metadata. Identical retries for the same importer/source return the same archive; changed HTML (including changing interface markup) creates a new snapshot. Original capture time is preserved for an existing snapshot. Owner/admin read access only; no general conversation insert, update or delete grants were added.

The old structured transcript RPC and extractor remain available for existing integrations/tests. Toolbar capture now uses HTML archives exclusively.

## Scope and limits

- Scrolls to the top until lazy loading settles, then passes through the conversation to the bottom. Source viewport clipping is expanded in the saved copy. Identifiable earlier turns removed by virtualization are retained in an **Earlier conversation content** section above the final page snapshot. Unknown layouts retain distinct loaded windows as potentially overlapping sections for cleanup. The report records scroll boundaries, collected turns and restored fragments/windows. **Full server-side history is not verified**: unavailable history and unknown virtualization layouts cannot be guaranteed. Navigation, known active generation, timeout and failure to reach scroll boundaries produce an error.
- Ordinary HTTPS images remain linked to their source URLs instead of being downloaded into the archive. Those URLs may expire or require ChatGPT sign-in. Standalone canvas and non-quiz frame elements receive omitted-content placeholders; SVG markup and ordinary `<img>` elements remain in HTML. Normal page capture takes no screenshots. Image counts and unavailable sources are reported. No new persistent host permissions are requested.
- This is a styled HTML source archive, not an offline copy of all assets. Recognized accessible quiz frames are converted to static HTML; other frames are represented by placeholders. Scripts, live embedded frames, event handlers and form control values are removed. Readable CSS and resolved element styles are captured; external fonts and attachments are not bundled. Some icons and visual effects may differ.
- The styled preview uses a sandboxed frame with an opaque origin. Scripts, forms, popups and top navigation are disabled. Archive CSP permits embedded and HTTPS images while blocking other external resources. Source and text views remain literal text. The portal download stays JSON.
- Client captures are limited to 6 MiB including HTML/text; oversized styled pages are retried without inline styling while retaining semantic HTML. Captures still exceeding the limit fail visibly; no content is silently truncated. The server allows 8 MiB JSON to account for serialization differences.
- Trusted extension session storage holds tokens and the current capture/draft. Closing Chrome, disabling or reloading the extension clears it. Starting a new capture removes older completed captures to make room. Passwords are never stored. Only language and portal URL persist locally.
- Saving is explicit. Failed saves retain the current draft for retry; an expired session asks you to sign in again. Signing out removes authentication and retains the current draft during this browser session.
- Use **Capture again** after loading more content or finishing a response. Recapture temporarily activates the source tab to allow lazy loading, then returns to review. Completeness is always marked unverified; inspect both ends of the conversation before saving.

## Verification

Build first, then from `annotation-portal`:

```powershell
npm test -- tests/chatgpt-import.test.ts
npx playwright install chromium
npx playwright test tests/browser/chatgpt-extension.spec.ts tests/browser/chatgpt-extension-ui.spec.ts tests/browser/html-archives.spec.ts
npm run build
```

Tests cover selector-independent HTML extraction, Tamil, tables/code/formulas, inert preview, empty/oversized pages, authentication and expiry, save retries, archive ownership and immutability, database validation, admin downloads and the original structured extractor. Browser tests use fixture pages and mocked Supabase; database tests use PGlite. A capture/save on your actual ChatGPT page still needs a manual check after reloading the installed extension.
