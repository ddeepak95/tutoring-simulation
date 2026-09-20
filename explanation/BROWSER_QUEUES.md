# Fixed queues across browser profiles

Each job is assigned once, before execution, to one of six profile/account labels. Assignment cycles through the profiles in manifest order. Each worker runs only its saved queue. A rate-limited worker pauses and exits after its wait budget; its work is never reassigned. There is no account-switching or quota failover.

Edit `browser-accounts.json` to set six distinct ports, dedicated Chrome data directories, and optional declared plan labels. No passwords, cookies, or tokens belong in this file. Account IDs are research labels, not verified website identities. Sign in manually and check that each window uses the intended account and comparable plan/model settings. The runner logs observed model labels when the UI exposes them. Six Chrome windows with different data directories provide six isolated profiles; six browser brands are not required.

The default first port is 9222. If your existing experiment browser occupies that port, reuse its profile path in the configuration or choose unused ports. The launcher refuses occupied ports and does not close existing browsers.

From the repository root:

```powershell
# Open all configured profiles; sign in to the intended account in each window.
.venv\Scripts\python.exe explanation/browser_queues.py open

# Prepare fixed queues; no prompts are sent.
.venv\Scripts\python.exe explanation/browser_queues.py prepare --run-set explanation/run_set/test_2.json --output explanation/outputs/six-accounts-01

# Start the independent, preassigned workers. This does send prompts.
.venv\Scripts\python.exe explanation/browser_queues.py run-all --output explanation/outputs/six-accounts-01
```

Inspect `queues.json` before starting. Round-robin assignment is reproducible but is not automatically a counterbalanced experimental design. With six topics per language condition, it assigns one job of each condition to each profile. Smaller or uneven matrices can leave some profiles with missing conditions. Account, topic, and order effects still need consideration.

Each profile saves `manifest.json`, `results.md`, `timings.csv`, `queue-status.json`, per-job captures, and (with `run-all`) `worker.log` in its own output subfolder. Job records include `job.browser_assignment`. Rate-limit exceptions add a timestamped `rate_limit_event`. The root `results.md` links the queue reports; it updates when `run-all` finishes or when `report` is called. Analysis scripts for flat single-run folders need adaptation before analyzing this nested layout.

Resume one queue after its account is available again:

```powershell
.venv\Scripts\python.exe explanation/browser_queues.py run --output explanation/outputs/six-accounts-01 --account account-03
```

Completed jobs are skipped automatically. Jobs possibly submitted before interruption are not resent. Recover such a conversation in its original account:

```powershell
.venv\Scripts\python.exe explanation/browser_queues.py run --output explanation/outputs/six-accounts-01 --account account-03 --recover-job JOB_ID --conversation-url https://chatgpt.com/c/CONVERSATION_ID
```

Use `report --output ...` to refresh the root report. `prepare --resume` only accepts identical inputs. Actual execution reads the frozen plan; editing the account config does not redirect an existing queue. Start a new output folder for changed assignments.

Default spacing is 60–70 seconds per worker and the pre-submission rate-limit wait budget is 1200 seconds (20 minutes; `--rate-limit-wait` changes this). Rate-limit checks use exponential waits of 30, 60, 120, 240, then 300 seconds, capped at five minutes per check and at the remaining total budget. These are checks for the notice to clear, not prompt resubmissions. After submission, a detected limit still stops the queue for recovery. Answer-generation timeout remains 300 seconds (`--timeout`). The inter-job delay starts after a job finishes; the first job starts without this delay. This is per queue, not a global gap between all browsers. `run-all` starts the fixed workers concurrently; it does not increase or redirect work when one stops. Detection currently uses the existing conversation-history rate-limit dialog; other quota messages may need additional selectors. Browser profiles remain open when workers finish.

Profile and queue locks prevent concurrent workers using the same configured profile directory. After a hard crash or forced stop, a stale `.experiment-worker.lock`, `.worker.lock`, or `.scheduler.lock` may remain. Verify the relevant Python worker is no longer running before removing a stale lock. Do not change accounts inside a profile during a run. No website quota bypass, automated sign-in, or bot-verification workaround is implemented.
