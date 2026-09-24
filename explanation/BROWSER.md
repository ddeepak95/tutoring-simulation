# ChatGPT website experiment

Runs the prompts on **chatgpt.com** in a visible Chrome window, using a separate
persistent browser profile. The default mode leaves the website model and reasoning
controls unchanged and sends a normal chat message. ChatGPT decides whether to search;
the runner does not explicitly select Web search. It turns
the supplied API matrix into **six distinct prompts**, preserving the four source
API conditions as provenance for each prompt. Website defaults are not asserted
to match any particular API model or reasoning level.

## Website thinking-effort sweep

### ChatGPT Free: direct runs

Set `"chatgpt-free": true` in `defaults` or a run entry to send each distinct
prompt once using the signed-in account's defaults. It ignores
`chatgpt-thinking-effort`, skips all model/thinking controls and manual-settings
prompts, and leaves search automatic even if `--search-mode explicit` was supplied.
The API `models` and `reasoning` fields are optional for website runs. Your sample
with one topic and three language/prompt variants produces three jobs.

This is a runner configuration, not account-plan detection; sign in to the intended
account yourself. A per-run `chatgpt-free: false` overrides a true default and
restores effort sweeps for that run. Free mode cannot be combined with
`--mapped-settings`. Use a new output folder when changing modes.

### Explicit website efforts

Set `"chatgpt-thinking-effort": ["Instant", "Medium", "High"]` in run-set `defaults`
or an individual `runs` entry. A run-level list replaces the default list. Each
distinct topic/language/prompt combination is generated once at each selected
website effort; the API `reasoning` list does not multiply those website jobs.
The current three-prompt configuration therefore produces nine website jobs.

Before each submission, the runner opens the Thinking effort menu, adjusts the
Power slider using arrow keys, and verifies the selected label in the composer.
Requested and observed website effort are saved in `result.json`; effort also
appears in the report heading and contributes to the job ID. If the control or
requested setting is unavailable, the runner stops before sending. When the field
is omitted, the runner keeps the current website effort. Use a new output folder
for a changed sweep. This field is specific to `browser_run.py` and cannot be
combined with the legacy `--mapped-settings` mode.

`--search-mode auto` is the default. The source run set's `web_search` field is kept
as API provenance and does not force website Search in this mode. Use
`--search-mode explicit` only to opt into selecting the Search tool. Actual website
behavior is recorded in each result's `ui_settings`.

## Setup and execution

From the repository root:

```powershell
.venv\Scripts\python.exe -m pip install -r explanation/browser_requirements.txt

# Opens Chrome; sign in yourself, then press Enter in the terminal to save the session.
.venv\Scripts\python.exe explanation/browser_run.py --login

# Prepare six prompts in a chosen folder without opening a browser or sending messages.
.venv\Scripts\python.exe explanation/browser_run.py --dry-run --output explanation/outputs/browser-run-02

# Run the prepared plan sequentially, starting a new chat for each prompt.
.venv\Scripts\python.exe explanation/browser_run.py --resume --output explanation/outputs/browser-run-02
```

Chrome must be installed. Set `channel` to `msedge` in `browser-config.json` to use
installed Microsoft Edge instead. No browser download is required for these channels.
Run the commands in an interactive terminal. Authentication and any verification
challenge are handled by you in the browser. The runner does not bypass challenges,
reuse your normal Chrome profile, or use private ChatGPT endpoints.

The dedicated `.browser-profile/` contains the login session and is Git-ignored.
Keep it local. Close the runner's browser before starting another runner with that
profile. Saved website conversations follow your account settings, unlike the API
runner's `store=false`. Account defaults can include personalization and memory;
record/control those separately if needed for your experiment.

## UI calibration

### If login gets stuck on verification

Close the runner's login window and stop that command. Open a dedicated Chrome
directly, sign in manually, and attach only after verification succeeds:

```powershell
.venv\Scripts\python.exe explanation/open_browser.py
# Complete sign-in in that window, leaving it open. Then:
.venv\Scripts\python.exe explanation/browser_run.py --cdp-url http://127.0.0.1:9222 --output explanation/outputs/browser-run-02
```

The launcher uses Chrome directly with a separate `.manual-browser-profile/` and
a local debugging port. It does not change browser fingerprints, solve challenges,
or copy cookies from your usual browser. This is an alternative launch path, not
a guarantee that verification will succeed. Close the dedicated Chrome when done;
the debugging connection can control that browser while it is open. The runner
disconnects without closing it. `--profile` is unused when `--cdp-url` is supplied.

If verification also fails before attachment, try your usual browser to establish
whether the issue affects the account/network. OpenAI's
[login troubleshooting](https://help.openai.com/en/articles/7426629-why-cant-i-log-in-to-chatgpt)
suggests checking VPN/proxy use, blockers, and cookie/JavaScript permissions, or
trying a different network. The runner cannot resolve a blocked verification flow.

You can inspect before executing by using `--inspect --cdp-url http://127.0.0.1:9222
--output explanation/outputs/browser-inspection` (on a single command line).

### Calibrating selectors

The composer, + tools menu, Web search item, and inline Search marker in
`browser-config.json` have been checked against the signed-in account. Response
completion has also been validated on all six website responses. The turn lookup
accepts the current `section[data-testid="conversation-turn-..."]` structure and
the older article structure. Source-panel selectors still need validation when
the UI exposes such a panel.
In explicit search mode, the runner enters the prompt before selecting Search,
preserving the inline tool marker rather than erasing it with an editor replacement.
It checks for selected Search before sending and stops if a required control is
missing. Normal chat mode does not interact with the tools menu. A model answer is captured only after
text is stable, the Stop control is absent, and the answer's Copy control appears.
Website changes may require selector updates.

```powershell
# Open the account UI, then save an accessibility snapshot for selector inspection.
.venv\Scripts\python.exe explanation/browser_run.py --inspect --output explanation/outputs/browser-inspection

# Pilot one prompt in a separate directory.
.venv\Scripts\python.exe explanation/browser_run.py --limit 1 --output explanation/outputs/browser-pilot
```

Snapshots can contain visible account/chat names and stay in ignored output folders.
The model-picker label is saved when available. Website defaults may change over
time; the runner does not select a named model or thinking level in default mode.

If Search's selector needs calibration, use `--manual-settings` to select the UI
settings yourself before each prompt and type the actual visible labels in the
terminal. This is a separate manifest; use a new output directory.

## Outputs and recovery

### Pacing, rate limits, and timing

The runner samples a fresh random delay uniformly between 60 and 70 seconds after
saving a completed job before opening the next chat. Adjust the range with
`--inter-job-delay-min 60 --inter-job-delay-max 70`, or use `--inter-job-delay 120`
to explicitly override it with a fixed delay. The sampled delay and configured
range are recorded in each job's `timing` object; the first job has zero delay.
This is pacing, not a
guarantee against website limits. Avoid running multiple experiment processes at
the same time.

When the conversation-history rate-limit dialog appears before submission, the
runner waits up to `--rate-limit-wait 1200` seconds (20 minutes). It checks the visible dialog
after waits of 30, 60, 120, 240, then 300 seconds, capped at 300 seconds per wait
and at the remaining total budget. It does not refresh, dismiss the dialog, or resend requests. If the
dialog remains, it stops with exit code 2 and saves the pending job as
`failed_before_submission`. Wait until the website permits requests, then resume
the same output folder. If a dialog remains open after the limit expires, handle
it manually before resuming. There is no guaranteed reset duration in this code.
If the limit appears after submission, the job becomes `needs_review`; recover
the existing conversation rather than resending it.

New results have a `timing` object with `submitted_at`, `response_ready_at`,
`generation_seconds`, and `capture_seconds`. `generation_seconds` is elapsed
monotonic time from immediately before the Send click to stable final-answer
detection. It includes browser/network latency and the 3-second stability check;
it is an observed end-to-end duration, not a provider-side processing metric.
Screenshot, image-download, and other capture work is timed separately.
Durations are printed, added to the report, and exported in `timings.csv`.
Old/recovered responses without a measured completion time have no invented
duration. The pacing/wait settings are recorded per job and may be adjusted on resume.

Every new run uses its own folder. Set `output_root` in `browser-config.json` to
choose the parent directory; the default is `outputs/browser-runs`, relative to
that config file. Without `--output`, each invocation creates a timestamped folder
such as `explanation/outputs/browser-runs/run-20260919T150000123456Z`.

To choose an exact folder instead, pass `--output explanation/outputs/my-run` or
an absolute path (quote paths with spaces). CLI paths are relative to the terminal's
working directory. The runner prints the resolved save folder before execution.
`--resume` always requires `--output` pointing to an existing run folder, including
when continuing a dry run. A new run never overwrites a nonempty folder.

The selected folder contains a manifest and a combined
`results.md`. Each job folder contains:

- `result.json`: exact prompt, source API conditions, website settings, observed model
  label, timestamps, conversation URL, extracted answer and links, and source-panel status.
- `conversation.md`: all user and assistant messages in order, with speaker labels,
  preserved math, and local links to downloaded images.
- `conversation.html`: the entire message panel (all prompts and responses),
  excluding navigation/sidebar markup. Downloaded result images use local paths;
  original stylesheet URLs may need network access for styling.
- `conversation.png`: screenshot of only the full-height conversation panel,
  expanding its nested scroll area so the entire prompt and answer fit. The page
  header and navigation sidebar are excluded. The viewport is restored afterward.
- `images/`: downloaded images rendered inside the assistant response turn. When
  the image exposes a full-size URL, both rendered and full-size files are saved.
  `result.json` records source URLs, file paths, MIME types, sizes, checksums, and
  any download failures. Image links are included in the combined Markdown report.
- `prompt.png`: composer screenshot before submission.
- `sources.html`, `sources.png`: source panel, if exposed and successfully located.

Conversation-panel HTML, screenshots, and image downloads apply to future captures. Completed
conversations are still skipped on resume; no existing results are backfilled.

Only visible website evidence is captured. The runner cannot claim complete internal
search queries, search result bodies, reasoning, or token usage. A missing source
panel is recorded as `not_exposed`; a panel capture failure is recorded as
`capture_failed`, preserving the answer. Adjust `sources_button` and `sources_panel`
selectors if your account uses a sidebar rather than a dialog.

`--resume` requires the same inputs, limit, and configuration. Completed jobs are
skipped. Search-mode/selector changes can update an unsubmitted plan, with the prior
manifest preserved. After any submission, changed settings require a new output
directory. A timeout after submission is marked `needs_review` and stops the batch
without resending the prompt. Recover the existing conversation without submission:

```powershell
.venv\Scripts\python.exe explanation/browser_run.py --output explanation/outputs/browser-run-02 --resume --recover-job JOB_ID --conversation-url https://chatgpt.com/c/CONVERSATION_ID
.venv\Scripts\python.exe explanation/browser_run.py --output explanation/outputs/browser-run-02 --resume
```

Omit `--conversation-url` if the saved result already contains the conversation URL.
Recovery verifies the conversation has exactly the expected user prompt. Use the
same output, limit, and mode options as the original run. The Markdown report is
updated after each captured job. A process interruption before the post-submit URL
is saved can require finding that conversation in your ChatGPT history.

## Optional explicit model/effort experiments

`--mapped-settings` retains the 24-job API matrix. It requires a `conditions` mapping
keyed by `model::reasoning::true` (or `false` for search), with `actual_labels`,
`actions`, and nonempty `checks`. Actions/checks use either a `css` locator or
`role` plus exact `name`. Checks optionally verify `text`, or `attribute` plus
`equals`. Supply selectors from your own inspected UI, including model, reasoning,
and search state checks. The empty default mapping intentionally makes no claim
that API reasoning levels exist on the website.

## Validation and references

```powershell
.venv\Scripts\python.exe -m unittest discover -s explanation/tests -p "test_*.py"
```

Offline tests cover six-prompt planning, unchanged Unicode prompts, resume guards,
Search selection, and response completion detection with mocked browser controls.
They do not establish compatibility with the live ChatGPT DOM.

- [ChatGPT Search](https://help.openai.com/en/articles/9237897-chatgpt-search)
  documents the Search tool, slash shortcut, and Sources panel.
- [Playwright browsers](https://playwright.dev/python/docs/browsers) and
  [authentication](https://playwright.dev/python/docs/auth) describe browser support
  and reusable authenticated browser state.
