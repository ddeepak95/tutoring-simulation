# Local and cloud Supabase

The npm commands prepare a CLI project under ignored `.runtime/supabase-local`, using the tracked Supabase config and migrations. Historical cloud templates are rendered there with the original section-item rubric, and rubric-upgrade prerequisites are skipped only when there are no assignments. Tracked cloud SQL and its fingerprints stay unchanged. Use these npm commands rather than raw `supabase start` from the portal root. For CLI diagnostics, pass `--workdir .runtime/supabase-local`.

Run these commands from `annotation-portal` with Docker Desktop running:

```powershell
npm ci
npm run supabase:start
```

The first start downloads the Supabase containers and applies all repository migrations. Subsequent starts retain existing local data. This project uses API `http://127.0.0.1:55321`, Postgres port `55322`, and Studio `http://127.0.0.1:55323`, leaving other projects on the default ports alone. Local signup is disabled; accounts are provisioned using the portal's normal admin tools.

The start command saves local API, public key, service-role key and database URL to ignored `.env.local`, without printing credentials. Use `npm run supabase:status` to refresh those settings, and `npm run supabase:stop` to stop this project's containers while retaining volumes. Avoid `supabase db reset` unless you intend to discard local data.

An empty local language/topic catalog is initialized from `agentic_conversation_capture/languages.json` and `topics.json`. Existing catalogs, including those copied from cloud, are preserved on restart.

## Choose the instance

Set this single switch in `annotation-portal/.env.local`, then restart Vite:

```dotenv
SUPABASE_TARGET=local
```

Use `cloud` to switch back. Builds resolve the switch at build time, so rebuild deployed/static bundles after a change. Keep deployed environments on `cloud`; loopback refers to the visitor's own machine.

Named settings are `SUPABASE_CLOUD_URL`, `SUPABASE_CLOUD_PUBLISHABLE_KEY`, `SUPABASE_CLOUD_SERVICE_ROLE_KEY` and their `SUPABASE_LOCAL_*` counterparts. Existing `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SERVICE_ROLE_KEY` remain the fallback for cloud deployments. Local mode never falls back to cloud keys. Only the selected public URL/key enter the browser; service-role keys and database credentials stay server-side.

The switch covers the portal frontend, account and evaluator APIs, account CLI, repository conversation import, baseline CLI, API section registration, direct API generation/upload, English translation, and capture uploader. For commands requiring project confirmation, pass `--project local` in local mode. Management-API migration scripts remain cloud administration commands; local migrations are applied by Supabase CLI.

For a fresh empty instance, provision an admin:

```powershell
npm run account -- admin admin
```

The command asks for a password privately. Alternatively, copying cloud data brings its accounts and password hashes across so you can use existing credentials. Auth signing keys differ, so sign in again after changing instances.

## Full data sync in either direction

Sync is an explicit **one-way replacement**, not a conflict merge. It copies every row in `public` and `auth` (except managed Auth migration history), including conversations, section mappings, translations, accounts/password hashes, annotations/revisions, pinned rubrics, evaluator prompts and baselines. It also copies all ordinary Storage buckets and file bytes, removes destination-only files/buckets, and verifies rows and file checksums. PostgreSQL sequences are retained without converting exact numeric values through JavaScript numbers.

Both instances must already have matching schemas. Local schema/functions/policies come from repository migrations; apply those same migrations to cloud using the established reviewed workflow before syncing. Sync refuses mismatched table/column layouts rather than changing the destination schema. This is application-data sync: hosting settings, OAuth/SMTP credentials, JWT signing keys, Edge Function deployments, Vault encryption keys, and platform analytics/vector buckets are not copied. The portal uses ordinary Storage buckets.

For cloud → local, the command can export through the existing `SUPABASE_ACCESS_TOKEN` when no cloud database URL is configured. All Management API requests are read-only, and the database rows are captured in one SELECT for a consistent snapshot. Storage files use the cloud service-role key. This route does not change cloud data or require its database password.

For local → cloud, or to use a direct database connection for either direction, add the cloud PostgreSQL connection string from the Supabase dashboard's **Connect** dialog:

```dotenv
SUPABASE_CLOUD_DB_URL=postgresql://postgres.PROJECT_REF:PASSWORD@HOST.pooler.supabase.com:5432/postgres?sslmode=verify-full
```

Use the direct connection or session pooler, not transaction pooling. URL-encode the password. This database credential is additional to the service-role API key; a Management API access token is not a database password. `npm run supabase:start` fills the local database URL automatically. Sync reads the explicitly named source and destination profiles regardless of the portal's active switch.

First preview (no destination writes or backup creation):

```powershell
npm run supabase:sync -- --from cloud --to local
npm run supabase:sync -- --from local --to cloud
```

Stop writes to both instances for the duration of an applied sync, including open editors, background generation and uploads. Then apply the desired direction:

```powershell
npm run supabase:sync -- --from cloud --to local --apply --confirm-target local
npm run supabase:sync -- --from local --to cloud --apply --confirm-target cloud
```

Every apply backs up the destination to `.runtime/supabase-sync/TIMESTAMP/destination` **before** replacing anything. Keep that directory private: it contains research data, accounts and password hashes. The backup is local and unencrypted, excluded from Git. Source snapshots are saved alongside it. Row replacement runs in a database transaction with triggers suspended so imported historical records retain their exact values; file uploads happen separately and are verified before row replacement. Storage and Postgres do not share a transaction: an interrupted or failed run can leave partial file changes, recoverable using the destination backup. Do not resume user writes until the command completes successfully or recovery is verified.

Preview or apply recovery using the backup directory printed by the command:

```powershell
npm run supabase:sync -- --restore .runtime/supabase-sync/TIMESTAMP/destination --to local
npm run supabase:sync -- --restore .runtime/supabase-sync/TIMESTAMP/destination --to local --apply --confirm-target local
```

Recovery also backs up the destination first. It requires the same schema as the backup; these snapshots contain data, not schema definitions. Don't commit snapshots or credentials.

Supabase documents database cloning and separate Storage copying in its [backup/restore guide](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore).

## Reset local instructional labeling

After building the current 22-label rubric, preview or apply a local reset:

```powershell
npm run labels:reset-local
npm run labels:reset-local -- --apply
```

This command always selects the explicit local profile and rejects non-loopback API or database URLs. It removes labeling assignments and their revisions, evaluation baselines, and generation records. Active conversation/annotator pairs receive fresh blank labeling assignments under the generated rubric. It retains conversations, translations, captures, sections, users, rating assignments and revisions, and historical rubric snapshots. Changes run in one transaction; record fingerprints verify protected tables and rating work before commit. It neither contacts cloud nor generates evaluations. This reset is separate from deployment migrations.
