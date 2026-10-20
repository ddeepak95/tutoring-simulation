import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const host = 'http://127.0.0.1:9222';
const rootSelector = '[data-message-role="assistant"] [data-assistant-markdown-root], [data-content-search-unit-key$=":assistant"] [data-markdown-text-style="assistant-message"]';
const controlSelector = 'button,input,select,textarea,summary,[role="button"],[role="tab"],[role="radio"],[role="switch"],a[href]';
const maxCaptureClicks = 18;

class DevTools {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
      else pending.resolve(message.result);
    });
  }

  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });
    return new DevTools(socket);
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  }

  close() { this.socket.close(); }
}

async function withPage(url, action) {
  const response = await fetch(`${host}/json/list`);
  if (!response.ok) throw new Error('Chrome debugging endpoint is unavailable');
  const target = (await response.json()).find((entry) => entry.type === 'page' && entry.url === url);
  if (!target?.webSocketDebuggerUrl) throw new Error(`Live conversation tab not found: ${url}`);
  const page = await DevTools.connect(target.webSocketDebuggerUrl);
  try { return await action(page); } finally { page.close(); }
}

async function readSession(file) {
  const session = JSON.parse(await readFile(file, 'utf8'));
  if (!/^https:\/\/chatgpt\.com\/(?:g\/[a-zA-Z0-9_/-]+\/)?c\/[a-f0-9-]{36}$/.test(session.url || '') || !Array.isArray(session.messages)) {
    throw new Error('Invalid agent capture session');
  }
  return session;
}

async function saveSession(file, session) {
  await writeFile(file, `${JSON.stringify(session, null, 2)}\n`, 'utf8');
}

function stateKey(state) {
  return createHash('sha256').update(JSON.stringify({ text: state.text, imageUrls: state.imageUrls, visualKey: state.visualKey, controls: state.controls.map(({ label, disabled, checked }) => ({ label, disabled, checked })) })).digest('hex');
}

async function snapshot(page, messageIndex) {
  const value = await page.evaluate(`(() => {
    const roots = [...document.querySelectorAll(${JSON.stringify(rootSelector)})];
    const root = roots[${messageIndex}];
    if (!root) throw Error('Assistant message ${messageIndex + 1} is no longer loaded');
    const controls = [...root.querySelectorAll(${JSON.stringify(controlSelector)})].filter(element => !element.closest('template'));
    const clone = root.cloneNode(true);
    const clonedControls = [...clone.querySelectorAll(${JSON.stringify(controlSelector)})].filter(element => !element.closest('template'));
    if (controls.length !== clonedControls.length) throw Error('Control inventory changed while cloning');
    clonedControls.forEach((element, index) => element.setAttribute('data-capture-agent-control', String(index)));
    return {
      url: location.href,
      userCount: document.querySelectorAll('[data-message-role="user"], [data-content-search-unit-key$=":user"]').length,
      assistantCount: roots.length,
      text: root.innerText,
      html: clone.outerHTML,
      imageUrls: [...root.querySelectorAll('img')].map(image => image.src).filter(Boolean),
      visualKey: [...root.querySelectorAll('svg,[aria-expanded],[aria-selected],[data-state]')]
        .map(element => element.outerHTML).join('|'),
      visualHints: {
        svg: root.querySelectorAll('svg').length,
        canvas: root.querySelectorAll('canvas').length,
        video: root.querySelectorAll('video').length,
        animations: [...root.querySelectorAll('*')].filter(element => getComputedStyle(element).animationName !== 'none').length,
      },
      controls: controls.map((element, index) => ({
        index,
        tag: element.tagName.toLowerCase(),
        type: element.getAttribute('type') || '',
        label: (element.getAttribute('aria-label') || element.innerText || element.getAttribute('value') || '').trim().slice(0, 160),
        context: (element.parentElement?.innerText || '').trim().slice(0, 220),
        disabled: !!element.disabled || element.getAttribute('aria-disabled') === 'true',
        checked: !!element.checked || element.getAttribute('aria-checked') === 'true' || element.getAttribute('aria-pressed') === 'true',
        html: element.outerHTML.slice(0, 350),
      })),
    };
  })()`);
  value.visualKey = createHash('sha256').update(value.visualKey).digest('hex');
  return { ...value, key: stateKey(value) };
}

function addState(message, snapshotValue) {
  const existing = message.states.find((state) => state.key === snapshotValue.key);
  if (existing) { message.active = existing.id; return existing; }
  const state = { id: `state_${message.states.length}`, ...snapshotValue };
  message.states.push(state);
  message.active = state.id;
  return state;
}

async function init(file, url) {
  if (!/^https:\/\/chatgpt\.com\/(?:g\/[a-zA-Z0-9_/-]+\/)?c\/[a-f0-9-]{36}$/.test(url)) throw new Error('A saved ChatGPT conversation URL is required');
  const session = { formatVersion: 'agent-interactions/1', url, createdAt: new Date().toISOString(), messages: [], actions: [] };
  await withPage(url, async (page) => {
    const count = await page.evaluate(`document.querySelectorAll(${JSON.stringify(rootSelector)}).length`);
    if (!count) throw new Error('No assistant messages are loaded');
    for (let index = 0; index < count; index++) {
      const message = { index, initial: 'state_0', active: 'state_0', states: [], transitions: [] };
      addState(message, await snapshot(page, index));
      session.messages.push(message);
    }
  });
  await saveSession(file, session);
  return summary(session);
}

function summary(session) {
  return {
    url: session.url,
    messages: session.messages.map((message) => {
      const state = message.states.find((entry) => entry.id === message.active);
      const explored = new Set(message.transitions.filter((edge) => edge.from === state.id).map((edge) => edge.control));
      return { message: message.index + 1, state: state.id, statesRecorded: message.states.length,
        text: state.text.slice(0, 8000),
        visualHints: state.visualHints,
        controls: state.controls.map(({ index, tag, type, label, context, disabled, checked }) => ({ index, tag, type, label, context, disabled, checked, explored: explored.has(index) })) };
    }),
    actions: session.actions.length,
  };
}

function questionNavigation(session) {
  return session.messages.map((message) => {
    const states = new Map(message.states.map((state) => [state.id, state]));
    const shortcuts = [];
    const forward = [];
    const backLabels = new Set();
    const recorded = new Set(message.transitions.map((edge) => `${edge.from}:${edge.control}`));
    const add = (from, control, to) => {
      const key = `${from}:${control}`;
      if (recorded.has(key) || shortcuts.some((edge) => `${edge.from}:${edge.control}` === key)) return;
      shortcuts.push({ from, control, to });
    };
    for (const selection of message.transitions) {
      if (!selection.changed) continue;
      const unanswered = states.get(selection.from);
      const answered = states.get(selection.to);
      if (!unanswered || !answered) continue;
      for (const button of unanswered.controls) {
        const enabled = answered.controls[button.index];
        if (button.tag !== 'button' || !button.disabled || !enabled || enabled.tag !== 'button' || enabled.disabled || enabled.label !== button.label) continue;
        const advance = message.transitions.find((edge) => edge.from === answered.id && edge.control === button.index && edge.changed);
        if (!advance || advance.to === unanswered.id) continue;
        const next = states.get(advance.to);
        if (!next || next.text === unanswered.text) continue;
        add(unanswered.id, button.index, next.id);
        for (const previous of unanswered.controls) {
          if (previous.tag !== 'button' || !previous.disabled || previous.label === button.label) continue;
          const back = next.controls.filter((control) => control.tag === 'button' && !control.disabled && control.label === previous.label);
          if (back.length === 1) backLabels.add(previous.label);
        }
        forward.push({ from: unanswered.id, to: next.id });
      }
    }
    for (const edge of forward) {
      const next = states.get(edge.to);
      for (const label of backLabels) {
        if (!states.get(edge.from).controls.some((control) => control.tag === 'button' && control.label === label)) continue;
        const back = next.controls.filter((control) => control.tag === 'button' && !control.disabled && control.label === label);
        if (back.length === 1) add(next.id, back[0].index, edge.from);
      }
    }
    return shortcuts;
  });
}

async function inspect(file) {
  const session = await readSession(file);
  await withPage(session.url, async (page) => {
    for (const message of session.messages) addState(message, await snapshot(page, message.index));
  });
  await saveSession(file, session);
  return summary(session);
}

async function click(file, messageNumber, controlNumber) {
  const session = await readSession(file);
  if (session.actions.length >= maxCaptureClicks) throw new Error(`Representative capture click budget reached (${maxCaptureClicks})`);
  const message = session.messages[messageNumber - 1];
  if (!message || !Number.isInteger(controlNumber) || controlNumber < 0) throw new Error('Provide a valid message number and control index');
  const result = await withPage(session.url, async (page) => {
    const before = await snapshot(page, message.index);
    const from = addState(message, before);
    const control = from.controls[controlNumber];
    if (!control) throw new Error(`Control ${controlNumber} is not in the current state`);
    if (control.disabled || control.tag === 'a' || ['submit', 'reset'].includes(control.type)) throw new Error('This control is disabled or could navigate or submit');
    const clicked = await page.evaluate(`(() => {
      const root = [...document.querySelectorAll(${JSON.stringify(rootSelector)})][${message.index}];
      const controls = [...root.querySelectorAll(${JSON.stringify(controlSelector)})].filter(element => !element.closest('template'));
      const control = controls[${controlNumber}];
      if (!control || control.disabled || control.getAttribute('aria-disabled') === 'true' || control.closest('form') || control.matches('a[href]')) return false;
      control.click();
      return true;
    })()`);
    if (!clicked) throw new Error('Control could not be clicked safely');
    let after;
    for (let attempt = 0; attempt < 25; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      after = await snapshot(page, message.index);
      if (after.key !== before.key) break;
    }
    if (after.url !== session.url || after.userCount !== before.userCount || after.assistantCount !== before.assistantCount) {
      throw new Error('The click changed the conversation or URL; stop exploring this control');
    }
    const to = addState(message, after);
    const edge = { from: from.id, control: controlNumber, label: control.label, to: to.id, changed: to.id !== from.id, at: new Date().toISOString() };
    message.transitions.push(edge);
    session.actions.push({ message: messageNumber, ...edge });
    if (session.actions.length === maxCaptureClicks) session.stopReason = 'click_limit';
    return { edge, state: { id: to.id, text: to.text.slice(0, 8000), controls: to.controls.map(({ index, label, disabled, checked, context }) => ({ index, label, disabled, checked, context })) } };
  });
  await saveSession(file, session);
  return result;
}

async function screenshot(file) {
  const session = await readSession(file);
  return withPage(session.url, async (page) => {
    await page.send('Page.enable');
    const image = await page.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const output = path.join(path.dirname(file), `${path.parse(file).name}.screen-${Date.now()}.png`);
    await writeFile(output, Buffer.from(image.data, 'base64'));
    return { screenshot: output };
  });
}

async function main() {
  const [action, filename, ...args] = process.argv.slice(2);
  if (!['init', 'inspect', 'click', 'screenshot'].includes(action) || !filename) {
    throw new Error('Usage: node agent-capture.mjs init SESSION URL | inspect SESSION | click SESSION MESSAGE CONTROL | screenshot SESSION');
  }
  const file = path.resolve(filename);
  const result = action === 'init' ? await init(file, args[0])
    : action === 'inspect' ? await inspect(file)
      : action === 'click' ? await click(file, Number(args[0]), Number(args[1]))
        : await screenshot(file);
  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}

export { init, inspect, click, screenshot, readSession, summary, questionNavigation };
