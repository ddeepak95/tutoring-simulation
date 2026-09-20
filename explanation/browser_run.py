"""Run the explanation matrix in a visible, signed-in ChatGPT browser."""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import random
import re
import time
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlparse

from run import HERE, expand_jobs, now, read_json, write_json

SITE = "https://chatgpt.com/"


class RateLimitPaused(RuntimeError):
    pass


def ui_pause(page, low=0.15, high=0.65):
    """Pause for a bounded random interval and return the sampled seconds."""
    seconds = random.uniform(low, high)
    page.wait_for_timeout(seconds * 1000)
    return seconds


def jitter_click(page, target, before=(0.15, 0.60), after=(0.10, 0.40)):
    """Click with small timing variation suitable for UI robustness testing."""
    ui_pause(page, *before)
    target.click()
    ui_pause(page, *after)


def jitter_press(page, target, key, before=(0.05, 0.25), after=(0.03, 0.15)):
    """Press a key with small timing variation."""
    ui_pause(page, *before)
    target.press(key)
    ui_pause(page, *after)


def rate_limit_message(page):
    modal = page.get_by_test_id('modal-conversation-history-rate-limit')
    return modal.inner_text().strip() if modal.is_visible() else None


def wait_until_unblocked(page, maximum_wait):
    deadline = time.monotonic() + maximum_wait
    backoff = 30.0
    while rate_limit_message(page):
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise RateLimitPaused('ChatGPT still reports a rate limit. Wait for the website to allow requests, then resume the same output folder.')
        delay = min(backoff, remaining)
        print(f'ChatGPT rate limit: next check in {delay:.0f}s; {remaining:.0f}s budget remaining. No refresh or submission.', flush=True)
        check_at = min(deadline, time.monotonic() + delay)
        while True:
            wait = check_at - time.monotonic()
            if wait <= 0:
                break
            page.wait_for_timeout(min(30, wait) * 1000)
        backoff = min(backoff * 2, 300)


def pause_between_jobs(page, seconds):
    remaining = seconds
    while remaining > 0:
        print(f'Waiting {remaining:.0f}s before the next chat', flush=True)
        step = min(30, remaining)
        page.wait_for_timeout(step * 1000)
        remaining -= step


def condition_key(job):
    return f"{job['model']}::{job['reasoning']}::{str(job['web_search']).lower()}"


def locator(page, spec):
    if "css" in spec:
        return page.locator(spec["css"])
    return page.get_by_role(spec["role"], name=spec["name"], exact=True)


def configure(page, job, config, manual):
    if manual:
        print(f"\nRequested API condition: {condition_key(job)}")
        print("Select the website model, thinking mode, and Search setting in the browser.")
        print("Record the actual UI labels; type skip if this condition is unavailable.")
        label = input("Actual model / thinking / search labels: ").strip()
        if not label or label.lower() == "skip":
            raise ValueError("Condition unavailable or not confirmed; prompt was not sent")
        return {"method": "operator_confirmed", "actual_labels": label,
                "api_equivalence": "not_established"}
    condition = config["conditions"].get(condition_key(job))
    if not condition or not condition.get("checks") or not condition.get("actual_labels"):
        raise ValueError(f"Missing verified UI mapping for {condition_key(job)}; use --manual-settings or configure conditions")
    for action in condition.get("actions", []):
        jitter_click(page, locator(page, action))
    for check in condition["checks"]:
        target = locator(page, check)
        target.wait_for(state="visible")
        if "text" in check and check["text"] not in target.inner_text():
            raise ValueError(f"UI setting check failed: {check}")
        if "attribute" in check and target.get_attribute(check["attribute"]) != check["equals"]:
            raise ValueError(f"UI setting check failed: {check}")
    return {"method": "configured_actions_and_checks", "actual_labels": condition["actual_labels"],
            "api_equivalence": "not_established", "mapping": condition}


def default_jobs(jobs):
    """Collapse API-only model/effort variants when using website defaults."""
    unique = {}
    for original in jobs:
        identity = tuple(original[key] for key in ("lang_id", "prompt_type", "topic", "prompt", "web_search"))
        if "chatgpt_thinking_effort" in original:
            identity += (original["chatgpt_thinking_effort"],)
        if original.get('chatgpt_free'):
            identity += ('chatgpt-free',)
        if identity not in unique:
            job = {**original, "model": "website-default", "reasoning": "website-default"}
            digest = hashlib.sha256(json.dumps(identity, ensure_ascii=False).encode()).hexdigest()[:12]
            job["job_id"] = f"web-{len(unique) + 1:03d}-{digest}"
            job["source_api_conditions"] = []
            unique[identity] = job
        unique[identity]["source_api_conditions"].append({key: original[key] for key in ("job_id", "model", "reasoning")})
    return list(unique.values())


def expand_browser_jobs(source, prompts, mapped=False):
    """Website effort is independent of API reasoning; defaults can be overridden per run."""
    clean = json.loads(json.dumps(source))
    field = "chatgpt-thinking-effort"
    base = clean.setdefault('defaults', {})
    defaults = base.pop(field, None)
    free_default = base.pop('chatgpt-free', False)
    if not isinstance(free_default, bool):
        raise ValueError('chatgpt-free must be true or false')
    if not mapped:
        base.setdefault('models', ['website-default'])
    efforts = {}
    free_modes = {}
    for index, row in enumerate(clean.get("runs", []), 1):
        free = row.pop('chatgpt-free', free_default)
        if not isinstance(free, bool):
            raise ValueError(f'Run {index}: chatgpt-free must be true or false')
        if free and mapped:
            raise ValueError('chatgpt-free cannot be combined with --mapped-settings')
        free_modes[index] = free
        values = row.pop(field, defaults)
        if free:
            values = None
        if values is not None:
            if not isinstance(values, list) or not values or any(v not in ("Instant", "Medium", "High") for v in values):
                raise ValueError(f"Run {index}: {field} must be a nonempty list of Instant, Medium, High")
            if len(values) != len(set(values)):
                raise ValueError(f"Run {index}: duplicate {field} values")
            if mapped:
                raise ValueError(f"{field} cannot be combined with --mapped-settings")
        efforts[index] = values
    expanded = []
    for job in expand_jobs(clean, prompts):
        if free_modes[job['run_index']]:
            job = {**job, 'chatgpt_free': True}
        values = efforts[job['run_index']]
        if values is None:
            expanded.append(job)
        else:
            expanded.extend({**job, "chatgpt_thinking_effort": value} for value in values)
    return expanded if mapped else default_jobs(expanded)


def select_thinking_effort(page, selectors, effort):
    """Use the website's accessible Power slider and verify its displayed label."""
    from playwright.sync_api import expect
    button = page.locator(selectors["thinking_button"])
    jitter_click(page, button)
    menu = page.get_by_role("menu", name="Thinking effort", exact=True)
    menu.wait_for(state="visible")
    power = menu.get_by_role("menuitem", name="Power", exact=True)
    slider = menu.locator('[role="slider"]')
    label = menu.get_by_role("menuitem", name="Select model", exact=True)
    try:
        minimum = int(slider.get_attribute('aria-valuemin'))
        maximum = int(slider.get_attribute('aria-valuemax'))
        current = int(slider.get_attribute('aria-valuenow'))
        if not minimum <= current <= maximum or maximum - minimum > 20:
            raise ValueError("Unexpected thinking slider range")
        # Move to the first position, then discover the target by its actual label.
        for position in range(current - 1, minimum - 1, -1):
            jitter_press(page, power, 'ArrowLeft')
            expect(slider).to_have_attribute('aria-valuenow', str(position))
        seen = []
        for position in range(minimum, maximum + 1):
            selected = label.inner_text().strip()
            seen.append(selected)
            if selected == effort:
                jitter_press(page, page.keyboard, 'Escape')
                expect(button).to_have_text(effort)
                return {"requested": effort, "observed": button.inner_text().strip(), "slider_position": position}
            if position < maximum:
                jitter_press(page, power, 'ArrowRight')
                expect(slider).to_have_attribute('aria-valuenow', str(position + 1))
        raise ValueError(f"Thinking effort {effort} unavailable; observed {seen}. Prompt was not sent")
    finally:
        if menu.is_visible():
            jitter_press(page, page.keyboard, 'Escape')


def enable_search(page, selectors):
    """Select Search after entering text, preserving the editor's inline tool pill."""
    if page.locator(selectors["search_active"]).is_visible():
        return
    jitter_click(page, page.locator(selectors["tools_button"]))
    option = page.locator(selectors["search_option"])
    option.wait_for(state="visible")
    jitter_click(page, option)
    page.locator(selectors["search_active"]).wait_for(state="visible")


def configure_default_chat(page, job, selectors, search_mode):
    if job.get('chatgpt_free'):
        return {'method': 'chatgpt_free_direct', 'chatgpt_free': True,
                'model_changed': False, 'reasoning_changed': False,
                'search_mode': 'auto', 'search_selected': False, 'api_equivalence': 'not_established'}
    explicit = search_mode == "explicit" and job["web_search"]
    if explicit:
        enable_search(page, selectors)
    return {"method": "website_defaults", "model_changed": False,
            "reasoning_changed": False, "search_mode": search_mode,
            "search_selected": explicit, "api_equivalence": "not_established"}


def enter_prompt(page, selectors, prompt):
    composer = page.locator(selectors["composer"])
    jitter_click(page, composer)
    jitter_press(page, composer, "ControlOrMeta+a")
    jitter_press(page, composer, "Backspace")
    for char in prompt:
        page.keyboard.insert_text(char)
        delay_ms = random.uniform(25, 90)
        if char in ".!?":
            delay_ms += random.uniform(100, 300)
        elif char in ",;:":
            delay_ms += random.uniform(40, 140)
        elif char == " ":
            delay_ms += random.uniform(0, 40)
        page.wait_for_timeout(delay_ms)
    if composer.inner_text().strip() != prompt.strip():
        raise ValueError("Composer text differs from the intended prompt; nothing was sent")


def can_refresh_selectors(previous, current, output):
    """Permit UI calibration/search-mode changes only before any submission."""
    def without_selectors(value):
        return {**{key: item for key, item in value.items() if key != "search_mode"},
                "browser_config": {key: item for key, item in value["browser_config"].items() if key != "selectors"}}
    if without_selectors(previous) != without_selectors(current):
        return False
    for job in previous["jobs"]:
        path = output / job["job_id"] / "result.json"
        if path.exists() and read_json(path).get("status") not in {"preparing", "failed_before_submission"}:
            return False
    return True


def response_turn(answer, selectors):
    # ChatGPT currently uses a section for each turn; older versions used article.
    return answer.locator("xpath=ancestor::*[starts-with(@data-testid, 'conversation-turn-') "
                          f"or self::{selectors['turn']}][1]")


def wait_for_answer(page, selectors, timeout, on_url=None):
    deadline = time.monotonic() + timeout
    previous, stable_since = None, time.monotonic()
    while time.monotonic() < deadline:
        message = rate_limit_message(page)
        if message:
            raise RateLimitPaused(message)
        if on_url:
            on_url(page.url)
        messages = page.locator(selectors["assistant"])
        if messages.count():
            last = messages.last
            text = last.inner_text()
            turn = response_turn(last, selectors)
            complete = turn.locator(selectors["complete"]).count() > 0
            stopping = page.locator(selectors["stop"]).is_visible()
            if text != previous or stopping or not complete:
                previous, stable_since = text, time.monotonic()
            elif text.strip() and time.monotonic() - stable_since >= 3:
                return last
        page.wait_for_timeout(500)
    raise TimeoutError("No stable final response with a completion control before timeout")


def external_links(scope):
    links = scope.locator("a[href]").evaluate_all("els => els.map(a => ({title: a.innerText, url: a.href}))")
    return [link for link in links if urlparse(link["url"]).scheme in {"http", "https"}
            and urlparse(link["url"]).hostname not in {"chatgpt.com", "www.chatgpt.com"}]


def capture(page, answer, selectors, folder):
    from browser_assets import capture_assets, message_markdown
    result = {"text": answer.inner_text(), "markdown": message_markdown(answer.inner_html()),
              "answer_links": external_links(answer), "conversation_url": page.url,
              "search_activity": "Only evidence exposed in the website UI is captured; no API search trace or token usage is available."}
    result["sources"] = {"status": "not_exposed", "text": None, "links": []}
    turn = response_turn(answer, selectors)
    result.update(capture_assets(page, turn, folder))
    buttons = turn.locator(selectors["sources_button"])
    if buttons.count():
        try:
            buttons.last.click()
            panel = page.locator(selectors["sources_panel"]).last
            panel.wait_for(state="visible", timeout=10000)
            result["sources"] = {"status": "captured", "text": panel.inner_text(), "links": external_links(panel)}
            (folder / "sources.html").write_text(panel.inner_html(), encoding="utf-8")
            panel.screenshot(path=str(folder / "sources.png"))
        except Exception as exc:
            result["sources"] = {"status": "capture_failed", "error_type": type(exc).__name__, "links": []}
    return result


def render_report(output, manifest):
    lines = ["# ChatGPT website experiment", "",
             "Results captured from the visible website UI. Requested API conditions and actual website "
             "settings are recorded separately; equivalence is not established. Search queries, full search "
             "results, reasoning internals, and token usage are unavailable unless displayed by the website.", ""]
    for i, job in enumerate(manifest["jobs"], 1):
        path = output / job["job_id"] / "result.json"
        if not path.exists():
            continue
        record = read_json(path)
        if record.get('timing'):
            lines += [f"Generation time (observed): {record['timing'].get('generation_seconds', 'unavailable')} seconds.", ""]
        lines += [f"## {i}. {job['language']} / {job['topic']} / {job.get('chatgpt_thinking_effort', job['reasoning'])}", "",
                  f"Status: {record['status']}", "", "### Prompt", "", job["prompt"], "",
                  "### Website settings", "", json.dumps(record.get("ui_settings"), ensure_ascii=False), "",
                  "### Response", "", record.get("markdown", "No completed response captured."), "",
                  "### Sources and links", "", record.get("sources", {}).get("text") or "No source-panel text captured.", ""]
        for link in record.get("answer_links", []) + record.get("sources", {}).get("links", []):
                lines.append(f"- <{link['url']}>")
        if record.get("full_page_screenshot"):
            lines += ["", f"[Full-page screenshot]({job['job_id']}/page.png)", ""]
        if record.get("conversation_screenshot"):
            lines += ["", f"[Conversation screenshot]({job['job_id']}/conversation.png)",
                      f"[Conversation HTML]({job['job_id']}/conversation.html)", ""]
        if record.get("conversation_markdown"):
            lines += [f"[Conversation Markdown]({job['job_id']}/conversation.md)", ""]
        for image in record.get("images", []):
            for asset in image["files"]:
                if asset["status"] == "downloaded":
                    lines += [f"![{asset['variant']} image]({job['job_id']}/{asset['path']})", ""]
        raw = json.dumps(record, ensure_ascii=False, indent=2)
        fence = "`" * max(3, max((len(s) for s in re.findall(r'`+', raw)), default=0) + 1)
        lines += ["", "<details><summary>Complete captured record</summary>", "", fence + "json", raw, fence, "", "</details>", ""]
    (output / "results.md").write_text("\n".join(lines), encoding="utf-8")
    with (output / 'timings.csv').open('w', encoding='utf-8-sig', newline='') as handle:
        fields = ['job_id', 'thinking_effort', 'status', 'submitted_at', 'response_ready_at', 'generation_seconds', 'capture_seconds']
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for job in manifest['jobs']:
            path = output / job['job_id'] / 'result.json'
            if path.exists():
                result = read_json(path)
                timing = result.get('timing', {})
                writer.writerow({'job_id': job['job_id'], 'thinking_effort': job.get('chatgpt_thinking_effort', ''),
                                 'status': result['status'], **{key: timing.get(key) for key in fields[3:]}})


def choose_output(args, config):
    if args.resume and args.output is None:
        raise ValueError("--resume requires --output pointing to the existing run folder")
    if args.output is not None:
        return args.output.resolve()
    root = Path(config.get("output_root", "outputs/browser-runs"))
    if not root.is_absolute():
        root = args.config.resolve().parent / root
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
    return (root / ("inspection-" + stamp if args.inspect else "run-" + stamp)).resolve()


def prepare(args, config):
    source = read_json(args.run_set)
    prompts = read_json(args.prompts)
    jobs = expand_browser_jobs(source, prompts, args.mapped_settings)
    if args.limit:
        jobs = jobs[:args.limit]
    manifest = {"backend": "chatgpt_website", "run_set": source, "prompt_structure": prompts,
                "browser_config": {key: value for key, value in config.items() if key != "output_root"}, "manual_settings": args.manual_settings,
                "search_mode": getattr(args, "search_mode", "auto"),
                "mapped_settings": args.mapped_settings, "jobs": jobs}
    path = args.output / "manifest.json"
    if args.resume and not path.is_file():
        raise ValueError("Cannot resume: --output must contain an existing manifest.json")
    if args.output.exists() and any(args.output.iterdir()):
        if not args.resume or not path.exists():
            raise ValueError("Output exists; use --resume with identical inputs or a new output directory")
        previous = read_json(path)
        if previous != manifest:
            if not can_refresh_selectors(previous, manifest, args.output):
                raise ValueError("Output exists; use --resume with identical inputs or a new output directory")
            write_json(args.output / f"manifest-before-selector-update-{time.time_ns()}.json", previous)
            print("Updated UI settings in the unsubmitted plan; previous manifest preserved.")
    args.output.mkdir(parents=True, exist_ok=True)
    write_json(path, manifest)
    return manifest


def run_browser(args, config, manifest):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as playwright:
        attached = bool(args.cdp_url)
        if attached:
            browser = playwright.chromium.connect_over_cdp(args.cdp_url, timeout=15000)
            if not browser.contexts:
                raise ValueError("Attached browser has no default context")
            context = browser.contexts[0]
        else:
            context = playwright.chromium.launch_persistent_context(
                str(args.profile.resolve()), channel=config["channel"], headless=False,
                viewport={"width": 1440, "height": 1000})
        context.set_default_timeout(15000)
        page = context.new_page()
        try:
            if args.login or args.inspect:
                page.goto(SITE, wait_until="domcontentloaded")
                input("Sign in and inspect/select settings in the browser. Press Enter here when ready. ")
                if args.login:
                    composer = page.locator(config["selectors"]["composer"])
                    if not composer.is_visible():
                        raise ValueError("Chat composer is not visible; login/verification is not complete")
                    print("Chat composer is available. Confirm your account and Pro plan in the website UI.")
                if args.inspect:
                    args.output.mkdir(parents=True, exist_ok=True)
                    (args.output / "ui-snapshot.txt").write_text(page.locator("body").aria_snapshot(), encoding="utf-8")
                    print(f"Saved {args.output / 'ui-snapshot.txt'}")
                return 0
            selectors = config["selectors"]
            ran_job = False
            for job in manifest["jobs"]:
                if args.recover_job and args.recover_job != job["job_id"]:
                    continue
                folder = args.output / job["job_id"]
                path = folder / "result.json"
                if path.exists():
                    previous = read_json(path)
                    if previous["status"] == "completed":
                        continue
                    if args.recover_job:
                        url = args.conversation_url or previous.get("conversation_url", "")
                        parsed = urlparse(url)
                        if parsed.scheme != "https" or parsed.hostname != "chatgpt.com" or not parsed.path.startswith("/c/"):
                            raise ValueError("Recovery needs the saved ChatGPT /c/ conversation URL or --conversation-url")
                        page.goto(url, wait_until="domcontentloaded")
                        user_message = page.locator(selectors["user"])
                        user_message.first.wait_for(state="visible")
                        if user_message.count() != 1 or user_message.first.inner_text().strip() != job["prompt"].strip():
                            raise ValueError("Recovery conversation does not contain exactly the expected single prompt")
                        answer = wait_for_answer(page, selectors, args.timeout)
                        previous.update(capture(page, answer, selectors, folder))
                        previous.update(status="completed", recovered_at=now())
                        write_json(path, previous)
                        render_report(args.output, manifest)
                        return 0
                    if previous["status"] in {"submitting", "submitted", "needs_review"}:
                        raise ValueError(f"{job['job_id']} may already have been sent. Use --recover-job with --resume; no automatic resubmission.")
                elif args.recover_job:
                    raise ValueError("No saved result exists for recovery")
                delay = 0.0
                if ran_job:
                    delay = args.inter_job_delay if args.inter_job_delay is not None else random.uniform(args.inter_job_delay_min, args.inter_job_delay_max)
                    pause_between_jobs(page, delay)
                folder.mkdir(exist_ok=True)
                record = {"job": job, "backend": "chatgpt_website", "started_at": now(), "status": "preparing"}
                write_json(path, record)
                try:
                    wait_until_unblocked(page, args.rate_limit_wait)
                    page.goto(SITE, wait_until="domcontentloaded")
                    wait_until_unblocked(page, args.rate_limit_wait)
                    composer = page.locator(selectors["composer"])
                    composer.wait_for(state="visible", timeout=args.timeout * 1000)
                    if page.locator(selectors["user"]).count() or page.locator(selectors["assistant"]).count():
                        raise ValueError("Expected a new empty chat")
                    enter_prompt(page, selectors, job["prompt"])
                    if job.get('chatgpt_free'):
                        record['ui_settings'] = configure_default_chat(page, job, selectors, args.search_mode)
                    elif args.mapped_settings or args.manual_settings:
                        record["ui_settings"] = configure(page, job, config, args.manual_settings)
                    else:
                        record["ui_settings"] = configure_default_chat(page, job, selectors, args.search_mode)
                    if job.get("chatgpt_thinking_effort"):
                        record["ui_settings"]["thinking_effort"] = select_thinking_effort(page, selectors, job["chatgpt_thinking_effort"])
                        record["ui_settings"]["reasoning_changed"] = True
                    model = page.locator(selectors["model_label"])
                    record["observed_model_label"] = model.inner_text() if model.count() else None
                    if not job.get('chatgpt_free') and args.search_mode == "explicit" and job["web_search"] and not args.manual_settings and not args.mapped_settings:
                        page.locator(selectors["search_active"]).wait_for(state="visible")
                    composer.screenshot(path=str(folder / "prompt.png"))
                    record["composer_text"] = composer.inner_text()
                    wait_until_unblocked(page, args.rate_limit_wait)
                    pre_send_delay = ui_pause(page, 0.30, 1.20)
                    record["status"] = "submitting"
                    record['timing'] = {'submitted_at': now(), 'completion_detection_settle_seconds': 3,
                                        'pre_send_delay_seconds': round(pre_send_delay, 3),
                                        'inter_job_delay_seconds': round(delay, 3),
                                        'inter_job_delay_range_seconds': [args.inter_job_delay, args.inter_job_delay] if args.inter_job_delay is not None else [args.inter_job_delay_min, args.inter_job_delay_max],
                                        'rate_limit_wait_budget_seconds': args.rate_limit_wait}
                    write_json(path, record)
                    generation_started = time.monotonic()
                    page.locator(selectors["send"]).click()
                    record["status"] = "submitted"
                    record["conversation_url"] = page.url
                    write_json(path, record)
                    print(f"{job['job_id']}: submitted; waiting for response", flush=True)
                    def save_url(url):
                        if url != record.get("conversation_url"):
                            record["conversation_url"] = url
                            write_json(path, record)
                    answer = wait_for_answer(page, selectors, args.timeout, on_url=save_url)
                    record['timing'].update(response_ready_at=now(), generation_seconds=round(time.monotonic()-generation_started, 3))
                    write_json(path, record)
                    capture_started = time.monotonic()
                    record.update(capture(page, answer, selectors, folder))
                    record['timing']['capture_seconds'] = round(time.monotonic()-capture_started, 3)
                    record.update(status="completed", finished_at=now())
                    write_json(path, record)
                    ran_job = True
                    print(f"{job['job_id']}: completed; generation {record['timing']['generation_seconds']:.1f}s", flush=True)
                except Exception as exc:
                    record.update(status="needs_review" if record["status"] in {"submitting", "submitted"} else "failed_before_submission",
                                  error={"type": type(exc).__name__, "message": str(exc)[:1000]},
                                  conversation_url=page.url, finished_at=now())
                    quota_message = str(exc) if isinstance(exc, RateLimitPaused) else rate_limit_message(page)
                    if quota_message:
                        record['rate_limit_event'] = {'detected_at': now(), 'message': quota_message,
                                                      'action': 'pause_assigned_queue'}
                    write_json(path, record)
                    if quota_message:
                        print(f"Paused for ChatGPT rate limit. Saved {record['status']}. Resume folder: {args.output}", flush=True)
                        return 2
                    raise
                finally:
                    render_report(args.output, manifest)
        finally:
            if not attached:
                context.close()
            # Exiting sync_playwright disconnects from CDP without closing the
            # user-owned browser or its pages (including interrupted conversations).
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--login", action="store_true")
    mode.add_argument("--inspect", action="store_true")
    mode.add_argument("--dry-run", action="store_true")
    parser.add_argument("--config", type=Path, default=HERE / "browser-config.json")
    parser.add_argument("--run-set", type=Path, default=HERE / "run_set/test.json")
    parser.add_argument("--prompts", type=Path, default=HERE / "prompt-structure.json")
    parser.add_argument("--profile", type=Path, default=HERE / ".browser-profile")
    parser.add_argument("--cdp-url", help="Attach to an already opened local Chrome, e.g. http://127.0.0.1:9222")
    parser.add_argument("--output", type=Path, help="Exact run folder; default: a new timestamped folder under config output_root")
    parser.add_argument("--manual-settings", action="store_true")
    parser.add_argument("--search-mode", choices=["auto", "explicit"], default="auto",
                        help="auto: normal ChatGPT chat; explicit: select the Web search tool for web_search jobs")
    parser.add_argument("--mapped-settings", action="store_true", help="Keep the API matrix and use explicit website condition mappings")
    parser.add_argument("--resume", action="store_true")
    parser.add_argument("--recover-job", help="Capture a previously submitted job without sending it again")
    parser.add_argument("--conversation-url", help="ChatGPT conversation URL for recovery if it was not saved")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--timeout", type=int, default=300)
    parser.add_argument('--inter-job-delay', type=float, help='Override random spacing with a fixed delay in seconds')
    parser.add_argument('--inter-job-delay-min', type=float, default=60, help='Minimum random delay in seconds (default: 60)')
    parser.add_argument('--inter-job-delay-max', type=float, default=70, help='Maximum random delay in seconds (default: 70)')
    parser.add_argument('--rate-limit-wait', type=float, default=1200, help='Pre-submission rate-limit wait budget; exponential checks from 30s up to 300s, no reloads (default: 1200 seconds)')
    args = parser.parse_args()
    if args.cdp_url:
        parsed = urlparse(args.cdp_url)
        if parsed.scheme != "http" or parsed.hostname not in {"127.0.0.1", "localhost", "::1"} or parsed.username or parsed.password:
            parser.error("--cdp-url must be a local HTTP endpoint")
    if args.timeout < 1 or (args.limit is not None and args.limit < 1):
        parser.error("timeout and limit must be positive")
    if (args.inter_job_delay is not None and args.inter_job_delay < 0) or args.rate_limit_wait < 0 or args.inter_job_delay_min < 0:
        parser.error('Delay and rate-limit wait must be nonnegative')
    if args.inter_job_delay_max < args.inter_job_delay_min:
        parser.error('--inter-job-delay-max must be at least --inter-job-delay-min')
    if args.recover_job and not args.resume:
        parser.error("--recover-job requires --resume")
    if args.conversation_url and not args.recover_job:
        parser.error("--conversation-url requires --recover-job")
    try:
        config = read_json(args.config)
        args.output = choose_output(args, config)
        manifest = None if args.login or args.inspect else prepare(args, config)
        if manifest:
            print(f"Save folder: {args.output}", flush=True)
            if args.recover_job and args.recover_job not in {job["job_id"] for job in manifest["jobs"]}:
                raise ValueError("Unknown recovery job")
            missing = sorted({condition_key(job) for job in manifest["jobs"]} - config["conditions"].keys()) if args.mapped_settings else []
            print(f"Prepared {len(manifest['jobs'])} website jobs. Unmapped conditions: {missing}")
            if args.dry_run:
                return 0
            if missing and not args.manual_settings:
                raise ValueError("Configure UI conditions first or use --manual-settings; no browser prompts sent")
        return run_browser(args, config, manifest)
    except (ValueError, OSError, ImportError, TimeoutError) as exc:
        parser.exit(1, f"{exc}\n")


if __name__ == "__main__":
    raise SystemExit(main())
