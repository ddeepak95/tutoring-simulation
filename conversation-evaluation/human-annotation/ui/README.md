# Instructional feature annotation UI

A local conversation annotation tool with editing pop-ups, using the six Instructional Features from
`../coding-guidebook.md` and the entry fields in `../../schemas/evaluator-v3.schema.json`.
It does not call an LLM or modify source conversations.

From the repository root:

```powershell
.venv\Scripts\python.exe conversation-evaluation\human-annotation\ui\serve.py
```

Open **http://127.0.0.1:8765**. Alternatively, open `index.html` directly in a browser;
the application has no external assets or runtime dependencies. `--port` changes the
server port. Only the UI directory is served, on the loopback interface.

1. Choose the original English, original Tamil, or reviewed English translation of
   the existing covalent-radius conversation. You can also import conversation JSON
   (`messages`/`turns`, `speaker`/`role`, `text`/`content`), or a `.txt`/`.md` transcript
   with `Tutor:` and `Student:` labels at the start of each turn.
2. Highlight text within one tutor turn. Choosing a feature immediately records the
   passage and leaves a persistent colored highlight. There is no Add annotation step.
   Choosing any feature changes the same pop-up into its available fields. Concepts
   and Subtopics show a topic-name input and detail level. Examples, Analogies and
   Cultural References show **Brief / Explained / Elaborated**; Representations show
   the five representation types; Questions show **Knowledge-checking / Instructional**.
   Text edits and selections save immediately. Choosing an
   option closes the pop-up when the entry is complete. Dismissing it keeps the
   highlight and any edits, with remaining attributes left for later completion.
   Examples use the selected passage directly; their form only asks for detail level.
   It has no Specific example or Concept illustrated input.
   Analogies and Cultural References likewise ask only for detail level;
   Representations ask only for representation type; Questions ask only for
   Knowledge-checking / Instructional classification. Their wording is taken directly
   from the highlighted passage, with no additional description or concept input.
3. Click any saved highlight to reopen its editing pop-up. Every edit saves
   automatically; the close icon or a click outside closes the details. Unfinished
   attributes are retained and labeled **Details needed**, without guessing enum values.
   The coding guidance reproduces the current guidebook wording. Highlighting is tied
   to the unchanged source text, so Markdown and mathematical notation remain visible.
4. For repeated concepts, examples, analogies, representations, or cultural references,
   highlight another passage and choose **Add passage to an existing entry**. Review
   the combined entry's detail level. The new passage saves immediately. Each question occurrence remains
   a separate entry with its exact selected wording. Rhetorical questions and suggested
   learner questions are Instructional; its `concept_checked` exports as `null`.
5. In an editing pop-up, use **Instructional feature** to change the feature, or
   **Delete highlight** to remove the annotation. Deletion has a short Undo opportunity.
   Overlapping highlights open a choice of annotations so each can be edited or removed
   independently. Supporting passages can be reviewed and individually removed from
   entries with multiple passages. Feature counts remain in a compact row above the
   transcript; there is no right panel.
6. Export JSON to keep or share a copy. Import that JSON to continue annotation on a
   different browser. Browser storage keeps highlights and unfinished attribute edits
   across reloads. Exporting a backup also lets you move to another browser.

Exports include the transcript, annotator, rubric snapshot, annotations with exact
evidence and six `instructional_features` lists based on the evaluator's entry attributes,
and locally derived `feature_counts`. Every highlight, including unfinished entries,
is preserved in `annotations`. `incomplete_annotations` identifies entries and their
missing attributes. Only completed entries enter the feature lists and
`feature_counts`; `highlight_counts` includes completed and unfinished entries and
matches the UI counters. Incomplete entries can be reimported and finished later.
The simplified forms automatically capture `example`, `comparison`, `representation`,
`reference`, or `question` from the selected wording, plus turn locations. They require
only the detail level, representation type, or question classification shown in the UI.
New entries do not require `concept_illustrated`, `concept_explained`, or
`concept_checked`; previously recorded concept metadata is preserved when present.
Instructional questions retain `concept_checked: null` for compatibility. Exports
include `form_fields` to identify the human form's editable attributes.
These simplified lists intentionally differ from the automated evaluator's schema,
which still requires those concept attributes. The shared coding guidebook and
automated evaluation schema have not been changed.
These are annotation projects, not complete
evaluator results (there are no quality ratings or error annotations). Evidence stores
turn ID, exact quote, one-based occurrence, and zero-based UTF-16 offsets with an
exclusive end. This distinguishes identical or overlapping excerpts. Imports validate
evidence against the transcript, fields, enums, and question classification rules.
Overlapping annotations retain their separate evidence; the highlight color reflects
the first entry at that position, and the annotation list exposes every entry.

The three sample transcripts are local snapshots; originals remain untouched. To
refresh the rubric and examples after changes:

```powershell
.venv\Scripts\python.exe conversation-evaluation\human-annotation\ui\build_data.py
```

Browser storage is namespaced by the rubric snapshot hash. Older saved work remains
under its previous namespace; export before refreshing the rubric, then reimport and
review its compatibility. Conversations are matched by ID and their complete turn
content, so the Tamil original and its translation have independent annotations even
when they share a conversation ID. An imported transcript does not erase saved entries;
replacing entries through an annotation-project import asks for confirmation.

Offline verification:

```powershell
node --test conversation-evaluation\human-annotation\ui\core.test.js
.venv\Scripts\python.exe conversation-evaluation\human-annotation\ui\test_browser.py
```

The browser test uses Playwright Chromium (or installed Microsoft Edge as a fallback),
a temporary browser profile, a local HTTP server, and temporary exports. It makes no
external requests.
