# Annotation portal

React + TypeScript + Vite frontend, Supabase Auth/PostgreSQL/private Storage, and Vercel hosting. Annotators use **username and password**. Accounts are provisioned in advance; there is no signup or invitation screen and no invitation email.

## What is implemented

- Annotator assignment list, persistent highlights, immediate attribute pop-ups, click-to-edit, overlap selection, linked supporting passages, deletion and undo, and a floating coding guide on the right. The conversation heading shows only the topic in the transcript language; feature counts, helper text, turn/highlight totals, and the editor export button are omitted. The guide starts collapsed and opens from a floating button at the bottom right. **Complete Annotation** appears after the final conversation turn, preserving the existing validation and submission workflow. Study exports remain available to admins.
- Conversation turns render Markdown headings, emphasis, lists, tables, links, blockquotes, and code in both the annotator and admin editors. Selections and saved highlights map to the untouched source Markdown, preserving exact quotations, UTF-16 offsets, and occurrence IDs. Raw HTML is displayed as text (apart from line breaks), and unsafe link destinations are disabled.
- All six instructional features and the simplified human annotation fields from the existing tool. Rhetorical questions are classified as Instructional. **Issues** adds exact highlighted evidence, a description, an explanation of the correct claim or step, and linked supporting passages.
- A right-side panel uses the questions and answer text from [rating-questions.md](../conversation-evaluation/human-annotation/rating-questions.md). The first tutor turn requires eight criteria; subsequent tutor turns also require Coherence and Responsiveness (ten criteria). Options show their complete descriptions, rather than numeric scores. Tutor turns show **Rating pending** or **Rated**; clicking the label selects that turn in the panel. Ratings autosave with highlights and appear read-only when admins inspect another annotator's work.
- Serialized cloud autosaves, visible save/failure states, retry, per-user local recovery drafts, and revision conflict protection.
- Explicit submission, including valid zero-highlight submissions when all tutor turns are rated. Incomplete highlights or ratings prevent submission in both the browser and database. Submitted work is read only until an admin reopens it.
- Admin Settings page for creating annotator accounts with username/password. The Conversations dashboard lists topic, original language, transcript language, canonical ID, and assigned annotators. Each row has a three-dot assignment menu; selected rows can be assigned together. Upload adds JSON/TXT/MD files directly. Progress refreshes every 30 seconds, with read-only inspection, reopening, and independent per-annotator study exports.
- Admins can click a topic or **View and annotate** in its row menu to create or resume their own annotation record. They use the same editor, autosave, submission, and recovery workflow as annotators. Admin work appears independently in progress and exports. Selecting another annotator in the editor enables editing that annotator's active assignment, including highlights, attributes, supporting passages, and turn ratings. The original assignment owner is retained; revision history attributes edits and submissions to the admin. Header navigation and annotator switching flush pending saves before leaving the current assignment.
- In the conversation editor, admins use **Annotations by** to switch between assigned annotators and their own work. Each view loads that assignment's saved highlights and pinned rubric. Hovering over a read-only highlight shows its attributes and supporting passages; the popup stays open while the pointer is inside it. Keyboard activation and touch taps also open details. Editable highlights use click-to-edit. Switching saves pending admin edits first; a failed save keeps the current view open for retry.
- **View annotations** in each conversation row's three-dot menu opens read-only review directly. Admins can switch among existing assignments, including their own saved work, without creating an admin assignment or entering annotation mode. **Edit annotations** opens the selected active assignment in the editor. Submitted assignments require **Reopen and edit**, which preserves the existing work and history. Conversations with no assignments show an empty state.
- Admin read-only review summarizes annotations by category above the transcript; annotation mode omits this summary. Expand a category for attribute-value counts (including missing values), supporting passage and tutor-turn totals, and the number of incomplete annotations. Counts use the selected assignment's pinned rubric and update when switching annotators.
- Repository sync adds conversations directly to the portal, with private source storage, content verification, duplicate prevention, and retained source provenance.
- Database-enforced separation, immutable transcripts and rubric versions, exact evidence validation in PostgreSQL, and revision history retained on every save/reopen.

## 1. Set up Supabase

Use a dedicated Supabase project. This migration creates the portal's tables and a profile trigger on `auth.users`; it is intended for a new portal project, not to modify an unrelated application's account setup.

1. Open the project's **SQL Editor** and run the complete contents of [the migration](supabase/migrations/202610080001_portal.sql). Run it once; it deliberately does not silently replace existing tables.
2. Run [the conversation identity migration](supabase/migrations/202610080002_conversation_ids.sql). It requires a nonempty, unique `conversation_id` and preserves assignments when a privileged migration updates a conversation's primary key.
3. Run [the conversation deletion migration](supabase/migrations/202610080003_conversation_deletion.sql). It adds admin-only preview and delete functions; existing study records are preserved when applying it.
4. Run [the tutor ratings and issues migration](supabase/migrations/202610090001_turn_ratings_issues.sql). It adds rating storage, validates completeness on submission, and extends the pinned rubric of active assignments while preserving highlights and history. Refresh open editors afterward: active assignments receive a new revision, so stale saves are rejected. Existing submitted assignments retain their original rubric and data; reopening one enables ratings and issues.
5. In Authentication settings, **disable public user signup** and set minimum password length to **8**. Keep email/password authentication enabled. Accounts use internal identifiers and are confirmed during provisioning; no email delivery is required.
6. Set up initial accounts using either method below.

**Automated migration alternative:** create a project-scoped personal access token with Database and Database Migrations read/write permissions at `https://supabase.com/dashboard/account/tokens`. Save it locally as `SUPABASE_ACCESS_TOKEN` in the ignored `.env.local`, then run:

```powershell
npm run migrate -- --project uwrjiimzrafxlecqgxhu
npm run migrate:identities -- --project uwrjiimzrafxlecqgxhu
npm run migrate:deletion -- --project uwrjiimzrafxlecqgxhu
npm run migrate:ratings -- --project uwrjiimzrafxlecqgxhu
node scripts/migrate-issue-field.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-sequence.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-rating-questions.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-summary-options.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-admin-edits.mjs --project uwrjiimzrafxlecqgxhu
```

Replace the project reference when using a different project. The runner requires it to match the frontend URL, checks migration history and existing objects, applies the reviewed SQL through the Management API, and verifies the tables, RLS, functions, trigger, and private bucket. It does not overwrite existing portal objects or apply this initial account trigger to a database with existing Auth users. Tokens and API response bodies are not printed. An already applied, unchanged migration is verified and skipped.

After the ratings migration, also apply [the issue field simplification](supabase/migrations/202610090002_remove_issue_correction_status.sql) (or use the command above). It removes the correction-status requirement for all pinned rubrics without changing saved annotations, ratings, revisions, or historical rubric snapshots. Previously saved correction-status values remain available in exported data, but the form omits this field.

Apply [the Instructional Sequence removal](supabase/migrations/202610090003_remove_instructional_sequence.sql) afterward. This dimension is omitted from the rating panel and no longer required for submission, including older assignments. Saved historical values and pinned rubric snapshots remain intact in exports.

Apply [the rating questions migration](supabase/migrations/202610100001_rating_questions.sql) last to enforce eight first-turn and ten subsequent-turn criteria in the database. Existing assignments use the updated question wording in the panel; stored numeric values and historical rubric snapshots remain intact. The numbers are internal values that map to the full answer text in exports.

Then apply [the summarization options migration](supabase/migrations/202610100002_summary_options.sql). Concept Summarization uses only the three answers in the rating questions. Historical **Not applicable** values are retained, but unfinished or reopened assignments using that value require a replacement before submission.

Apply [the admin editing migration](supabase/migrations/202610100003_admin_edit_annotations.sql) to enable saves to other annotators' assignments. It changes only the save RPC, retaining submitted locks, revision conflicts, exact evidence validation, rating completeness, and client restrictions on direct updates. Existing records remain unchanged when it is applied; subsequent admin edits are audited as `admin_edit` or `admin_submit` with the admin's user ID.

**Local provisioning script:** copy `.env.example` to `.env.local` and set the project URL and publishable key. Add `SUPABASE_SERVICE_ROLE_KEY` to this ignored local file yourself. Never send this key in chat, commit it, or set a `VITE_` prefix on it.

```powershell
cd D:\Projects\PhD\tutoring-check\annotation-portal
npm ci
npm run account -- admin admin
npm run account -- annotator01 annotator
npm run account -- annotator01 --reset
```

The script prompts for a hidden password of at least 8 characters. It creates a confirmed Auth account and protected profile. Share each person's username and password through your normal private channel. Usernames are case-insensitive, 3–32 ASCII letters/numbers/dots/underscores/hyphens, and begin with a letter or number. There is no invitation.

**Portal admin UI:** after the first admin exists, sign in, open **Settings**, and use **Create annotator**. Enter a username and a password of at least 8 characters. Return to **Conversations** to assign work through a row's three-dot menu. The form clears the password after successful creation and sends no email. Duplicate usernames do not change existing accounts. Settings is accessible only to admins. This requires `SUPABASE_SERVICE_ROLE_KEY` in the server environment (the ignored local `.env.local` for Vite, or Vercel environment settings for production).

`POST /api/annotators` verifies the caller's access token with Supabase Auth, checks the protected profile's admin role, and creates a confirmed account with the default annotator role. The server verifies the new profile and removes the new Auth user if profile setup fails. The endpoint accepts only username/password, never a requested role. Passwords, server keys, and tokens are not returned or logged. Public signup remains disabled. No new database migration is needed.

**Dashboard alternative:** create an Auth user manually with email `admin@users.annotation.invalid` and your chosen password; mark the email confirmed. The profile trigger creates the `admin` username with the default annotator role. Then, in the SQL Editor, grant this first administrator the role:

```sql
update public.profiles set role = 'admin' where username = 'admin';
```

Create annotators similarly with identifiers such as `annotator01@users.annotation.invalid`; their profile role remains `annotator`. The portal login asks for `admin` or `annotator01`, never their internal identifier. To reset a password, run the provisioning script with `--reset`; it preserves the user's ID, role, and annotations and sends no email.

## 2. Run locally

`.env.local` contains the two required browser settings and the server key for admin account creation:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_KEY
```

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. Run `npm run check:connection` to verify the public connection. Missing configuration shows a setup screen; it never pretends to save data to the cloud. This workspace's supplied project configuration is already saved in its ignored `.env.local`.

Log in as admin, create annotators in **Settings**, then open **Conversations**. Use **Upload** to add files. Open a row's three-dot menu, select annotators, and assign it; check several rows and use **Assign selected** for a batch. Already assigned annotators are checked and disabled for a single conversation. For a batch, annotators assigned to only some selected conversations can receive the remaining conversations. Existing assignments and annotations are preserved. Creating an assignment registers the bundled rubric snapshot if necessary. Annotators can then log in and open their assignments. Both `npm run dev` and `npm run preview` serve the local account-creation API; a static file server alone cannot create accounts.

Admins can use **Delete conversation** in a row's three-dot menu. Confirmation loads current assignment, annotation, and revision counts before enabling deletion. Confirming permanently removes that conversation, its assignments, and their saved revision history in one database transaction. Other conversations, translations, accounts, and rubric versions remain available. Private source files and the repository catalog are retained; deliberately syncing the same run again restores a deleted conversation with fresh annotation work. Dashboard refreshes never restore deleted records. There is no bulk deletion. Direct table deletes remain forbidden to clients. If a conversation or any assignment changes after the confirmation opens, deletion is rejected and the current details must be reviewed again. Failed or ambiguous requests require a fresh preview before another confirmation.

## 3. Deploy to Vercel

1. Commit the portal source and lockfile to this repository; keep `.env.local`, `node_modules`, and `dist` excluded.
2. Import the existing GitHub repository into Vercel. Set **Root Directory** to `annotation-portal` and framework to Vite. The included `vercel.json` defines the production build and frontend route fallback.
3. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY` to Vercel's production environment, then deploy. Set the same values for any preview environment where account creation is needed. Do not add a `VITE_` prefix to the server key or upload the Management API access token. The `/api/annotators` Vercel function uses the server key; the SPA fallback excludes `/api/` routes.
4. In Supabase Auth URL configuration, set the Site URL to the deployed portal URL. If needed, add trusted local/preview URLs separately.
5. Verify two annotator logins and an admin login against real assignments before starting data collection.

All credentials and study data reside in Supabase. The production bundle contains the rubric, application code, and publishable connection settings. It contains no research transcripts, account passwords, or service-role credentials. Dashboard roles are app roles, not Supabase/Vercel team memberships.

## Import conversations directly from this repository

From `annotation-portal`, preview a run without making cloud changes:

```powershell
npm run sync:conversations -- --run 20260930T200335588721Z --dry-run
```

Add those conversations directly to the portal and retain source files in private Supabase Storage:

```powershell
npm run sync:conversations -- --run 20260930T200335588721Z --project uwrjiimzrafxlecqgxhu
```

The project reference must match the configured URL; the command uses the server-only key from ignored `.env.local`. Replace the reference for another project. Repeat `--run` to include multiple runs, or explicitly use `--all-runs`. The command scans immediate conversation folders under `simulated-conversation-openrouter/outputs`, preserving exact source bytes and leaving local files unchanged. It includes `conversation.json` plus the reviewed `conversation.comparative.english.json` when present, falling back to `conversation.english.json` otherwise. Draft translations, individual turn files, and evaluator results are excluded. Invalid files are listed as skipped.

After the command finishes, conversations appear directly in the dashboard table. Refresh the dashboard if it is already open, then assign annotators through the row menu. There is no intermediate import screen. Sync does not create assignments. The command reports how many records were added and how many already existed. It attributes new records to the portal's sole admin; if multiple admins exist, pass `--admin USERNAME`. Run one sync command at a time so catalog updates do not compete. On a partial failure, completed records stay available and rerunning skips them safely.

The source file's `conversation_id` is the canonical ID. The portal preserves it exactly in transcripts and annotation exports; UUID source IDs also become the database `conversations.id`. Every original and translation must have its own ID. Translations additionally retain `source_conversation_id`, linking back to the original. Uploads without an ID receive a UUID; duplicate supplied IDs are rejected rather than reassigned.

Storage object identifiers derive from source path and file content; these hashes identify stored files, not conversations. Sync merges earlier catalog entries, never overwrites an existing source object, and publishes the private inventory after all selected sources upload successfully. It then registers normalized conversation records directly, verifying each source file's SHA-256 and preserving its turn IDs/text. Existing sources are skipped, including simultaneous attempts. A changed file retaining an existing conversation ID cannot create a second conversation. Assign a new source ID when deliberately creating a separate version. Existing transcripts and annotations remain preserved. Database transcripts and annotation exports retain run, source path, source conversation ID, file hash, version, language, and topic ID.

Generation and translation use the shared [identity module](../conversation_identity.py) to assign IDs. The [source migration](../migrate_conversation_ids.py) checks existing saved originals and translations; preview with `python migrate_conversation_ids.py` from the repository root, or apply with `--apply`. The [identity mapping](../data/conversation-identities.json) records previous IDs for historical evaluation references. This migration changes identity metadata and Markdown headers, preserving conversation turns. After a deliberate identity migration, `sync:conversations --replace-identities` replaces catalog entries for the same source paths while retaining older private Storage objects. It does not update already imported database records; align those records through a controlled privileged migration that preserves their assignments.

The inventory and sources remain private under existing Storage policies. Annotators see assigned normalized conversations. The frontend contains no repository transcripts, and the Vercel deployment does not need access to your Windows drive or the repository's output folders. New conversations are added by another local sync; this does not automatically watch Git commits. Once setup migrations are applied, direct repository sync needs no additional database migration or GitHub access token. The Upload dialog handles file uploads only.

## LLM-assisted instructional annotations

Apply `supabase/migrations/202610100004_llm_baselines.sql` after the earlier migrations, or run the fingerprinted runner against the intended project:

```powershell
node scripts/migrate-llm-baselines.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-evidence-performance.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-admin-baseline-start.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-unassign-annotators.mjs --project uwrjiimzrafxlecqgxhu
node scripts/migrate-llm-issues.mjs --project uwrjiimzrafxlecqgxhu
```

Generate locally and push to the database using Node 24 or newer. The command reads the server-only Supabase key from `.env.local` and `OPENROUTER_API_KEY` from the environment, `.env.local`, or the parent repository's ignored `.env`. It uses the model and generation settings from `conversation-evaluation/config.json`, synchronized by `npm run sync:rubric`.

All LLM highlight prompt text lives in **`conversation-evaluation/prompts/instructional-features.md`**: the annotation scope, six instructional category guides and issue guidance, exact evidence rules, JSON output instructions, review prompt, validation repair prompt, and `prompt_version` metadata. Edit that Markdown file and run `npm run sync:prompt` from `annotation-portal` to apply changes to both local and portal generation. `npm run sync:rubric` also synchronizes the prompt. Keep the three prompt section headings and the repair prompt's `{{validation_error}}` placeholder; update `prompt_version` for meaningful revisions. No TypeScript prompt edits are needed. The generated `server/generated/instructional-prompt.ts` is a deployment snapshot; edit the Markdown source instead. Restart the local server or deploy the updated snapshot after changes.

Coverage extraction uses up to three semantic levels: main topic, explanatory unit, and explanatory subunit. The topic field uses one, two, or three names separated by ` :: `. Coverage evidence highlights only actual Markdown headings or standalone bold section titles; the model reads their bodies to identify content and assess depth. Other categories, including examples and issues, keep their exact passage evidence. The admin summary displays the hierarchy and counts topics, units, and subunits separately. Existing flat topics, two-level annotations, and pinned baselines are preserved.

Each new baseline records the complete annotation prompt, prompt version, source path, SHA-256 of the full Markdown file, and the rendered repair prompt if used. Existing baselines remain unchanged. The separate `evaluator-v3.md` prompt is used by the conversation evaluator and does not control highlight extraction.

```powershell
npm run llm:baselines -- --project uwrjiimzrafxlecqgxhu --pilot --dry-run
npm run llm:baselines -- --project uwrjiimzrafxlecqgxhu --conversation CONVERSATION_UUID
```

To run extraction followed by review, add `--review --reasoning-high` to the local generation command. Each pass is validated, saved locally, and imported as a separate immutable baseline. Review receives the original transcript and the first-pass annotations, using the Review prompt from the same Markdown source. The reviewed baseline records `reviewed_baseline_id`; assignments continue to use their pinned versions. Reasoning defaults to medium from `conversation-evaluation/config.json`; `--reasoning-high` explicitly overrides it for a run. Local generation streams responses, omits the application-specified token limit, and uses a ten-minute timeout per pass (the provider still applies model limits). If review fails after extraction is saved, resume with one `--conversation ID --regenerate --review-from EXTRACTION_BASELINE_ID --reasoning-high` to avoid repeating extraction. Local high-reasoning calls stream their responses to keep long requests connected. Provider responses are retained under ignored `.runtime/llm-baselines/provider-responses` before exact-evidence validation. If a complete extraction response needs validation repair after an interrupted call, add `--repair-from-response PATH` with one `--conversation ID --regenerate --review --reasoning-high` to resume repair and review from that saved response. No transcript or credentials are printed.

The pilot preview selects one unseeded conversation, preferring original English conversations with at least two tutor turns and then the shortest transcript. Use its printed UUID for the generation command. Generation validates exact tutor quotations and all required instructional attributes, saves a recovery artifact under ignored `.runtime/llm-baselines`, and atomically imports an immutable baseline. If import fails after generation, retry with `--import PATH_TO_ARTIFACT` to avoid another model call. Imports verify the exact saved transcript and rubric; repeated imports of the same version are idempotent. Use `--admin USERNAME` if multiple portal admins exist. Existing baselines are skipped unless `--regenerate` is explicit; regeneration creates a new version and preserves earlier versions and human work. `--all-missing` deliberately processes all unseeded conversations; avoid it for a pilot.

In the conversation row menu, **LLM annotations** opens read-only baseline review and export. **Starting annotations** selects a baseline version or blank annotations before assigning users. Each new assignment receives its own editable copy, pinned to that baseline and its rubric, with blank ratings. Existing annotator assignments and all started work are preserved. The admin?s View and annotate action starts new work from the latest saved baseline and can seed an untouched blank admin assignment in place, retaining its ID and recording a seed revision. Assignments with any saved revision, highlights, ratings, history, or a local recovery draft containing work are resumed without resetting them. Annotators must independently rate every tutor turn before submission. LLM baselines can include issues; annotators can edit, add, or remove them alongside instructional highlights.

Admins can compare reviewed assignments against their original baseline: unchanged, edited, added, and deleted highlights. These comparisons use stable annotation IDs; deleting and recreating a highlight counts as deletion plus addition. Attribute and passage changes appear when expanded. The study export includes immutable baselines, model/prompt/configuration provenance, transcript and prompt hashes, independent human results, comparisons, and revision history with actor attribution, including admin edits. This is an LLM-assisted human annotation design.

Portal generation is also available through the baseline review page. Set server-only `OPENROUTER_API_KEY` in Vercel to enable it; local generation/import does not require deploying this key. Never prefix this key with `VITE_`. The API authenticates admins and prevents duplicate generation requests. Saved baselines cannot be edited; deleting a conversation explicitly removes its baseline versions and generation records along with assignment history after a fresh deletion preview. Source files remain separate.

The assignment menu also offers **Unassign** for each assigned annotator, for one conversation or selected conversations. Confirming removes their access while retaining highlights, ratings, baseline links, and audit history. Reassigning resumes the same saved record and submission status; it does not reset ratings or substitute another baseline. Revision checks prevent unassigning work that changed after confirmation opened. Unassigned records remain in study exports with `is_active: false` and `unassigned_at`, and unassign/reassign revisions identify the acting admin.

## Data model and access

- `profiles`: stable Auth user ID, unique username, protected admin/annotator role. Authenticated clients cannot insert/update profiles or grant themselves admin privileges.
- `conversations`: immutable normalized transcript with stable turn IDs; the exact uploaded original is in the private `transcripts` bucket. Admins can upload, while annotators receive assigned normalized transcripts through database permissions.
- `rubric_versions`: immutable, hash-addressed rubric snapshots. Every assignment pins a version; updating the frontend rubric does not change existing assignments.
- `assignments`: one record per conversation, annotator, and rubric version, with independent JSONB documents for annotations and turn ratings, status, and revision. No direct client updates are granted.
- `annotation_revisions`: append-only seed, save, reopen, and rubric-upgrade history containing highlights and ratings, visible to the owner and admins. LLM copies record a `seed_llm` revision zero; blank assignments begin empty. Later revisions record the acting user.
- `llm_baselines` and `llm_generation_runs`: immutable instructional-only baseline versions and admin generation status. Annotators can read only the baseline pinned to their own assignment. The local import RPC is restricted to the service role and verifies admin attribution. Assignment origins are immutable after work starts; only untouched blank admin assignments can receive an initial baseline seed.
- `save_assignment`: locks the assignment, checks owner or admin access and expected revision, validates evidence/attributes and tutor-turn ratings, and saves both atomically. It accepts incomplete drafts but requires complete attributes and all applicable rating dimensions for every tutor turn when submitting. The legacy RPC signature preserves saved ratings and enforces the same submission requirements. Admin edits retain assignment ownership and record the acting admin in revision history. Read-only review performs no saves.
- `reopen_assignment`: admin-only, preserves annotations/history and increments the revision. In-progress is a workflow state, not a percentage inferred from highlight count.
- `preview_conversation_deletion` and `delete_conversation`: admin-only RPCs. The preview fingerprints current conversation and assignment state. Deletion locks the conversation and its assignments, verifies the fingerprint, and removes only the confirmed conversation and its dependent annotation work. Source files are retained separately.

Evidence uses zero-based UTF-16 offsets with exclusive ends, and one-based occurrences including overlapping matches. Both browser and database check the exact tutor quotation against its turn. Original text is never rewritten. Each question occurrence is a separate entry. PostgreSQL handles supplementary Unicode characters consistently with JavaScript offsets.

Exports retain the human tool's simplified fields and are **not** the automatic evaluator's stricter output schema. Draft and submitted statuses are explicit; unfinished work is not presented as completed annotation. The admin study export contains all independent assignments, including drafts, with status/revision/rubric identifiers.

The portal applies `rating-questions.md` to each selected tutor turn using the preceding conversation as context. Each question offers its three descriptive answers. Learner-level appropriateness uses the question's high-school-student reference. Previously saved **Insufficient evidence** values are preserved and still require a limitation note; this option is no longer offered for new answers. On narrow screens, the panel moves below the transcript; a turn's rating label scrolls to it. Issues are exported separately from instructional features. Historical submissions made before the ratings migration have no turn ratings until reopened and completed under the extended rubric.

Local recovery data is namespaced by stable user/assignment ID. A stale draft can be exported but cannot automatically overwrite a newer cloud revision. Use separate browser profiles on shared computers if browser-local recovery drafts need separation outside the portal itself. Supabase database backups do not back up uploaded Storage objects; export/archive source files separately for study retention.

## Rubric maintenance and validation

```powershell
npm run sync:rubric
npm test
npm run test:browser
npm run build
```

`sync:rubric` reads the guidebook, evaluator schema, and existing annotation core from the parent repository. It writes the checked-in `src/generated` files; it does not bundle the existing tool's sample conversations. Production builds use this snapshot and do not require Python or access to parent directories. Keep generated changes with the corresponding rubric change.

Unit tests validate core behavior, rating completeness, issue exports, save serialization, retry/conflict recovery, migration verification, and the admin API's Auth/role checks, eight-character passwords, duplicate usernames, invalid requests, safe failures, and rollback of new accounts. Database tests run the actual migrations in embedded PostgreSQL (PGlite) with mocked Supabase Auth/Storage tables and test real role grants, RLS, RPCs, Unicode evidence, mandatory tutor ratings, submitted locks, immutable originals, preservation of existing assignments during upgrades, and audit history. Browser tests mock all Supabase/API responses and block other external requests, covering admin account creation and new-user login, separate users, all pop-ups, overlap/deletion, uploads/assignments, ratings and issues, submission/reopening, failed saves, recovery, and narrow screens. No paid calls or live database writes occur in automated tests. Windows tests use installed Microsoft Edge; on other systems install Chromium with `npx playwright install chromium`.

The automated PostgreSQL/browser checks do not substitute for the final live-project smoke test after applying the migration and provisioning accounts.


### Automated validation repairs and recovery

Prompt version 15 supplies exact source IDs for headings, table headers, and tutor passages. Models can select an ID instead of reproducing source wording. Quote-based evidence remains available for precise spans. The server retrieves original text, validates heading coverage, table-header evidence, and example Fresh/Duplicate metadata, then repairs only invalid entries or missing headings. Repairs cannot overwrite valid attributes or remove entries. Up to three repair calls are allowed per stage; failed jobs retain their diagnostics and raw responses.

Run extraction followed by review with `npm run llm:baselines -- --project PROJECT --conversation ID --regenerate --review`. The CLI prints a job ID and saves checkpoints under the ignored `.runtime/llm-baselines/jobs/` directory. Resume an interrupted job with `npm run llm:baselines -- --project PROJECT --resume JOB_ID`. A resume reuses completed provider responses, skips saved extraction, and retries publishing a validated artifact without another model call. Transcript, rubric, prompt, model, and reasoning changes invalidate the checkpoint. Repair counters persist across restarts. One process may run a particular job at a time.

Portal generation uses the same source-ID validation and bounded repair loop. Apply `node scripts/migrate-llm-checkpoints.mjs --project PROJECT` to enable database-backed generation checkpoints. Failed portal runs with checkpoints expose **Resume saved generation**; the original request ID resumes the retained response. The existing portal generation action creates one baseline; the CLI `--review` workflow creates extraction and review baselines. Source IDs, validation errors, repair patches, provider response IDs, and repair counts are retained in provenance. Previously saved baselines and human assignments remain unchanged.

Direct Google API runs use `--provider google` with `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in the local environment. The transport uses Gemini structured JSON output, the configured reasoning effort, and the same validation, targeted repairs, and checkpoints. For example:

```powershell
npm run llm:baselines -- --project PROJECT --conversation ID --regenerate --review --provider google
npm run llm:baselines -- --project PROJECT --resume JOB_UUID --provider google
```

An explicit provider switch on resume preserves the draft and repair count and records the transition in provenance. Transcript, rubric, prompt, model, and other configuration changes remain rejected. The portal generation button still uses its existing OpenRouter configuration.

## Comparison mode

Apply `supabase/migrations/202610110003_comparison_mode.sql` to the existing portal database before using the **Comparisons** navigation link. The migration adds separate comparison assignments and revision history without changing existing annotations. Use the Supabase SQL editor or the checked migration runner:

```powershell
node scripts/migrate-comparisons.mjs --project PROJECT_REF
```

The runner requires the existing local `VITE_SUPABASE_URL` and `SUPABASE_ACCESS_TOKEN`, checks the explicit project reference, records a migration fingerprint, and verifies the tables, security policies, and RPCs.

Admins select two conversations and an annotator in **Comparisons**. Conversations must differ and have the same nonzero number of tutor turns. Pair conversations covering the same topic; tutor turns are paired by their order in each transcript. Duplicate assignments, including reversed selections of the same pair, preserve existing work. Rating questions are frozen in each assignment at creation.

New comparisons use the combined paper-based questions in [comparative-questions.md](../comparative-evaluation/prompts/comparative-questions.md): nine questions on the first tutor turn and eleven on subsequent turns. Learner level, language, and mathematics share **Fit for the Learner**; examples, analogies/models, and representations share **Usefulness of Explanatory Aids**; focus/relevance and information load share **Focus and Amount of Information**. Each question has expandable judging guidance. Existing comparisons retain their question snapshots, including their original wording and completion requirements. Annotate ratings continue to use the separate rating-question set.

Run `npm run sync:comparisons` after editing the Markdown source to regenerate `src/generated/comparison-questions.json`; `npm run build` also runs this synchronization automatically. New snapshots include the question-set version and source references for exports.

Annotators see anonymous **Conversation A** and **Conversation B** labels under the topic heading. Admins can open the info icon beside the topic to inspect conversation labels and the annotator ID. The first round shows only the tutor responses. Each later round shows all intervening student messages followed by the next tutor response, separately for A and B. Both conversation boxes have the same dimensions and scroll independently.

One rating question appears above the boxes at a time. Click the better conversation box, select it with Enter or Space, or choose **Tie / equally good**. Answering advances to the next question. **Previous question** lets annotators revisit a choice. After all questions are answered, review the choices, optionally add notes, and save the turn. The first round omits Coherence and Responsiveness; later rounds include them.

Only saving a fully answered round unlocks the next round. Failed saves keep the current round and selections available for retry. Incomplete selections are stored in a local draft scoped to annotator, assignment, and revision. Saved rounds remain visible as context and are read only. Saving the final round completes the assignment. Admins can inspect progress and export comparisons with both transcripts, question snapshots, answers, and source IDs. Comparison history is also retained in `comparison_revisions`. Deleting either source conversation also deletes its comparison assignments and history.
