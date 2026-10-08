# Annotation portal

React + TypeScript + Vite frontend, Supabase Auth/PostgreSQL/private Storage, and Vercel hosting. Annotators use **username and password**. Accounts are provisioned in advance; there is no signup or invitation screen and no invitation email.

## What is implemented

- Annotator assignment list, persistent highlights, immediate attribute pop-ups, click-to-edit, overlap selection, linked supporting passages, deletion and undo, and a floating coding guide on the right. The conversation heading shows only the topic in the transcript language; feature counts, helper text, turn/highlight totals, and the editor export button are omitted. The guide starts collapsed and opens from a floating button at the bottom right. **Complete Annotation** appears after the final conversation turn, preserving the existing validation and submission workflow. Study exports remain available to admins.
- Conversation turns render Markdown headings, emphasis, lists, tables, links, blockquotes, and code in both the annotator and admin editors. Selections and saved highlights map to the untouched source Markdown, preserving exact quotations, UTF-16 offsets, and occurrence IDs. Raw HTML is displayed as text (apart from line breaks), and unsafe link destinations are disabled.
- All six instructional features and the simplified human annotation fields from the existing tool. Rhetorical questions are classified as Instructional. Quality ratings and errors are outside this portal's current scope.
- Serialized cloud autosaves, visible save/failure states, retry, per-user local recovery drafts, and revision conflict protection.
- Explicit submission, including valid zero-highlight submissions. Incomplete highlights prevent submission. Submitted work is read only until an admin reopens it.
- Admin Settings page for creating annotator accounts with username/password. The Conversations dashboard lists topic, original language, transcript language, canonical ID, and assigned annotators. Each row has a three-dot assignment menu; selected rows can be assigned together. Upload adds JSON/TXT/MD files directly. Progress refreshes every 30 seconds, with read-only inspection, reopening, and independent per-annotator study exports.
- Admins can click a topic or **View and annotate** in its row menu to create or resume their own annotation record. They use the same editor, autosave, submission, and recovery workflow as annotators. Admin work appears independently in progress and exports; inspecting another annotator remains read only. Header navigation flushes pending saves before leaving the editor. This uses existing database permissions and needs no new migration.
- Repository sync adds conversations directly to the portal, with private source storage, content verification, duplicate prevention, and retained source provenance.
- Database-enforced separation, immutable transcripts and rubric versions, exact evidence validation in PostgreSQL, and revision history retained on every save/reopen.

## 1. Set up Supabase

Use a dedicated Supabase project. This migration creates the portal's tables and a profile trigger on `auth.users`; it is intended for a new portal project, not to modify an unrelated application's account setup.

1. Open the project's **SQL Editor** and run the complete contents of [the migration](supabase/migrations/202610080001_portal.sql). Run it once; it deliberately does not silently replace existing tables.
2. Run [the conversation identity migration](supabase/migrations/202610080002_conversation_ids.sql). It requires a nonempty, unique `conversation_id` and preserves assignments when a privileged migration updates a conversation's primary key.
3. Run [the conversation deletion migration](supabase/migrations/202610080003_conversation_deletion.sql). It adds admin-only preview and delete functions; existing study records are preserved when applying it.
4. In Authentication settings, **disable public user signup** and set minimum password length to **8**. Keep email/password authentication enabled. Accounts use internal identifiers and are confirmed during provisioning; no email delivery is required.
5. Set up initial accounts using either method below.

**Automated migration alternative:** create a project-scoped personal access token with Database and Database Migrations read/write permissions at `https://supabase.com/dashboard/account/tokens`. Save it locally as `SUPABASE_ACCESS_TOKEN` in the ignored `.env.local`, then run:

```powershell
npm run migrate -- --project uwrjiimzrafxlecqgxhu
npm run migrate:identities -- --project uwrjiimzrafxlecqgxhu
npm run migrate:deletion -- --project uwrjiimzrafxlecqgxhu
```

Replace the project reference when using a different project. The runner requires it to match the frontend URL, checks migration history and existing objects, applies the reviewed SQL through the Management API, and verifies the tables, RLS, functions, trigger, and private bucket. It does not overwrite existing portal objects or apply this initial account trigger to a database with existing Auth users. Tokens and API response bodies are not printed. An already applied, unchanged migration is verified and skipped.

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

## Data model and access

- `profiles`: stable Auth user ID, unique username, protected admin/annotator role. Authenticated clients cannot insert/update profiles or grant themselves admin privileges.
- `conversations`: immutable normalized transcript with stable turn IDs; the exact uploaded original is in the private `transcripts` bucket. Admins can upload, while annotators receive assigned normalized transcripts through database permissions.
- `rubric_versions`: immutable, hash-addressed rubric snapshots. Every assignment pins a version; updating the frontend rubric does not change existing assignments.
- `assignments`: one record per conversation, annotator, and rubric version, with annotations stored as an independent JSONB document, status, and revision. No direct client updates are granted.
- `annotation_revisions`: append-only save and reopen history, visible to the owner and admins. Revision zero is an empty unstarted assignment; subsequent revisions have history entries.
- `save_assignment`: locks the assignment, checks ownership and expected revision, validates evidence/attributes, and saves atomically. It accepts incomplete drafts but requires complete attributes when submitting. Admins inspect work without rewriting annotators' annotations.
- `reopen_assignment`: admin-only, preserves annotations/history and increments the revision. In-progress is a workflow state, not a percentage inferred from highlight count.
- `preview_conversation_deletion` and `delete_conversation`: admin-only RPCs. The preview fingerprints current conversation and assignment state. Deletion locks the conversation and its assignments, verifies the fingerprint, and removes only the confirmed conversation and its dependent annotation work. Source files are retained separately.

Evidence uses zero-based UTF-16 offsets with exclusive ends, and one-based occurrences including overlapping matches. Both browser and database check the exact tutor quotation against its turn. Original text is never rewritten. Each question occurrence is a separate entry. PostgreSQL handles supplementary Unicode characters consistently with JavaScript offsets.

Exports retain the human tool's simplified fields and are **not** the automatic evaluator's stricter output schema. Draft and submitted statuses are explicit; unfinished work is not presented as completed annotation. The admin study export contains all independent assignments, including drafts, with status/revision/rubric identifiers.

Local recovery data is namespaced by stable user/assignment ID. A stale draft can be exported but cannot automatically overwrite a newer cloud revision. Use separate browser profiles on shared computers if browser-local recovery drafts need separation outside the portal itself. Supabase database backups do not back up uploaded Storage objects; export/archive source files separately for study retention.

## Rubric maintenance and validation

```powershell
npm run sync:rubric
npm test
npm run test:browser
npm run build
```

`sync:rubric` reads the guidebook, evaluator schema, and existing annotation core from the parent repository. It writes the checked-in `src/generated` files; it does not bundle the existing tool's sample conversations. Production builds use this snapshot and do not require Python or access to parent directories. Keep generated changes with the corresponding rubric change.

Unit tests validate core behavior, save serialization, retry/conflict recovery, and the admin API's Auth/role checks, eight-character passwords, duplicate usernames, invalid requests, safe failures, and rollback of new accounts. Database tests run the actual migration in embedded PostgreSQL (PGlite) with mocked Supabase Auth/Storage tables and test real role grants, RLS, RPCs, Unicode evidence, submitted locks, immutable originals, and audit history. Browser tests mock all Supabase/API responses and block other external requests, covering admin account creation and new-user login, separate users, all pop-ups, overlap/deletion, uploads/assignments, submission/reopening, failed saves, recovery, and narrow screens. No paid calls or live database writes occur in automated tests. Windows tests use installed Microsoft Edge; on other systems install Chromium with `npx playwright install chromium`.

The automated PostgreSQL/browser checks do not substitute for the final live-project smoke test after applying the migration and provisioning accounts.
