// Serialized into the source tab. Captures resources, never cookies/storage/API
// responses. The exported local experiment runs only when opened by the user.
export async function captureOriginalResources() {
  const initialUrl = location.href;
  const url = new URL(initialUrl);
  const match = url.pathname.match(/^(?:\/g\/[a-zA-Z0-9_/-]+)?\/c\/([a-f0-9-]{36})\/?$/i);
  if (url.origin !== 'https://chatgpt.com' || !match) throw new Error('Open a saved ChatGPT conversation.');
  const started = Date.now();
  const clone = document.documentElement.cloneNode(true);
  // Retain scripts and original styles, while excluding passwords and editable drafts.
  clone.querySelectorAll('input').forEach(node => node.removeAttribute('value'));
  clone.querySelectorAll('textarea').forEach(node => node.replaceChildren());
  const sourceHtml = '<!doctype html>\n' + clone.outerHTML;
  const queue = []; const resources = new Map(); let totalBytes = 0; let omittedResources = 0;
  function add(value, base = initialUrl, kind = '') {
    if (!value || value.startsWith('#') || /^data:/i.test(value)) return null;
    let parsed; try { parsed = new URL(value, base); } catch { return null; }
    if (!['https:', 'blob:'].includes(parsed.protocol)) return null;
    parsed.hash = '';
    if (resources.has(parsed.href)) return resources.get(parsed.href);
    if (queue.length >= 256) { omittedResources++; return null; }
    const extension = kind === 'script' ? 'js' : kind === 'style' ? 'css' : (parsed.pathname.match(/\.([a-z0-9]{1,8})$/i)?.[1] || 'bin');
    const item = { url: parsed.href, path: 'assets/' + String(queue.length).padStart(4, '0') + '.' + extension, kind, status: 'pending' };
    resources.set(parsed.href, item); queue.push(item); return item;
  }
  function cssReferences(css, base) {
    for (const match of css.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)|@import\s+['"]([^'"]+)['"]/g)) add(match[1] || match[2], base);
  }
  for (const script of document.querySelectorAll('script[src]')) add(script.src, initialUrl, 'script');
  for (const link of document.querySelectorAll('link[rel="stylesheet"]')) add(link.href, initialUrl, 'style');
  for (const image of document.images) add(image.currentSrc || image.src);
  for (const use of document.querySelectorAll('svg use')) add(use.getAttribute('href') || use.getAttribute('xlink:href'));
  for (const style of document.querySelectorAll('style,[style]')) cssReferences(style.tagName === 'STYLE' ? style.textContent : style.getAttribute('style'), initialUrl);
  for (const entry of performance.getEntriesByType('resource')) {
    // Only static resources; never archive fetch/XHR responses or account APIs.
    if (['script', 'css', 'img'].includes(entry.initiatorType) || /\.(?:js|mjs|css|woff2?|ttf|otf|svg|png|jpe?g|webp|gif|avif)(?:[?#]|$)/i.test(entry.name)) add(entry.name, initialUrl, entry.initiatorType === 'script' ? 'script' : '');
  }
  const files = [];
  async function fetchResource(item) {
    try {
      if (Date.now() - started > 24000) throw new Error('Capture time limit');
      const resourceUrl = new URL(item.url);
      const response = await fetch(item.url, { credentials: resourceUrl.origin === location.origin ? 'same-origin' : 'omit', signal: AbortSignal.timeout(3500) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const type = response.headers.get('content-type') || '';
      // Login/error documents are not usable script, style, or asset responses.
      if (/text\/html/i.test(type)) throw new Error('Resource returned HTML');
      const reader = response.body.getReader(); const parts = []; let bytes = 0;
      try {
        while (true) {
          const part = await reader.read(); if (part.done) break;
          bytes += part.value.length;
          if (bytes > 8 * 1024 * 1024 || totalBytes + part.value.length > 32 * 1024 * 1024) throw new Error('Resource size limit');
          totalBytes += part.value.length; parts.push(part.value);
        }
      } finally { await reader.cancel().catch(() => {}); }
      const blob = new Blob(parts, { type });
      const textual = item.kind === 'script' || item.kind === 'style' || /javascript|json|text\/css|image\/svg\+xml/.test(type) || /\.(?:js|mjs|css|svg)(?:[?#]|$)/i.test(item.url);
      let content;
      if (textual) content = await blob.text();
      else content = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = reject; reader.readAsDataURL(blob); });
      item.status = 'saved'; item.type = type; item.bytes = bytes;
      files.push({ path: item.path, content, encoding: textual ? 'utf8' : 'base64', type, source: item.url });
      if (item.kind === 'style' || /text\/css/.test(type)) cssReferences(content, item.url);
    } catch (error) { item.status = 'missing'; item.reason = error.message; }
  }
  for (let index = 0; index < queue.length; index += 4) {
    await Promise.all(queue.slice(index, index + 4).map(fetchResource));
  }
  if (location.href !== initialUrl) throw new Error('The conversation changed during original-page capture. Try again.');
  function local(value, base, inAsset = false) {
    if (!value || value.startsWith('#') || /^data:/i.test(value)) return value;
    try {
      const parsed = new URL(value, base); const hash = parsed.hash; parsed.hash = '';
      const item = resources.get(parsed.href);
      return item?.status === 'saved' ? (inAsset ? './' + item.path.slice(7) : './' + item.path) + hash : value;
    } catch { return value; }
  }
  function rewriteCss(css, base, inAsset) {
    return css.replace(/url\(\s*(['"]?)([^'"\s)]+)\1\s*\)/g, (_, quote, value) => `url("${local(value, base, inAsset)}")`)
      .replace(/(@import\s+['"])([^'"]+)/g, (_, prefix, value) => prefix + local(value, base, inAsset));
  }
  for (const file of [...files]) {
    if (file.encoding !== 'utf8') continue;
    const original = file.content;
    if (/\.css$/.test(file.path) || /text\/css/.test(file.type)) file.content = rewriteCss(file.content, file.source, true);
    if (/\.m?js$/.test(file.path) || /javascript/.test(file.type)) {
      // Resolve literal module imports. Runtime-generated URLs remain an explicit
      // replay limitation rather than pretending to serialize the application's VM.
      file.content = file.content.replace(/(\bfrom\s*['"]|\bimport\s*\(\s*['"]|\bimport\s*['"])([^'"]+)(['"])/g, (_, prefix, value, suffix) => prefix + local(value, file.source, true) + suffix);
    }
    if (file.content !== original) files.push({ ...file, path: 'originals/' + file.path, content: original });
  }
  clone.querySelectorAll('base,meta[http-equiv],link[rel="preload"],link[rel="modulepreload"],iframe,object,embed').forEach(node => node.remove());
  const originalImages = [...document.images];
  clone.querySelectorAll('img').forEach((image, index) => {
    image.src = local(originalImages[index].currentSrc || originalImages[index].src, initialUrl);
    image.removeAttribute('srcset'); image.removeAttribute('sizes'); image.removeAttribute('loading');
  });
  clone.querySelectorAll('picture source').forEach(node => node.remove());
  for (const node of clone.querySelectorAll('*')) {
    node.removeAttribute('nonce'); node.removeAttribute('integrity'); node.removeAttribute('crossorigin');
    if (node.matches('script[src],link[rel="stylesheet"]')) {
      const attr = node.tagName === 'SCRIPT' ? 'src' : 'href'; node.setAttribute(attr, local(node.getAttribute(attr), initialUrl));
    }
    if (node.matches('svg use')) for (const attr of ['href', 'xlink:href']) if (node.hasAttribute(attr)) node.setAttribute(attr, local(node.getAttribute(attr), initialUrl));
    if (node.hasAttribute('style')) node.setAttribute('style', rewriteCss(node.getAttribute('style'), initialUrl, false));
    if (node.tagName === 'STYLE') node.textContent = rewriteCss(node.textContent, initialUrl, false);
  }
  const policy = document.createElement('meta'); policy.httpEquiv = 'Content-Security-Policy';
  // This exported local experiment permits archived scripts and animations, but
  // does not silently send saved page data back to remote APIs on opening it.
  policy.content = "default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'none'; frame-src 'none'; base-uri 'none'";
  clone.querySelector('head')?.prepend(policy);
  return { source_url: url.origin + url.pathname.replace(/\/$/, ''), source_conversation_id: match[1], captured_at: new Date().toISOString(), files: [
    { path: 'index.html', encoding: 'utf8', content: '<!doctype html>\n' + clone.outerHTML },
    { path: 'source.html.txt', encoding: 'utf8', content: sourceHtml }, ...files,
  ], resources: queue, omitted_resources: omittedResources, bytes: totalBytes, limitations: [
    'Original layout is preserved; only resources accessible to this page could be archived.',
    'Native MHTML may omit scripts. index.html is the separate JavaScript replay experiment.',
    'Server APIs, cookies, browser storage, running JavaScript state, and unloaded history are not captured.',
    'Dynamic module URLs, workers, initialization state, and server-dependent interactions may not replay.',
    'Remote network requests are blocked in index.html; source.html.txt is the original source reference, not the replay entry point.',
    'This experiment collects up to 256 resources, 32 MB total and 8 MB per resource within about 25 seconds. Omitted or failed resources are reported.',
  ] };
}

// Uncompressed standard ZIP: no runtime dependencies or remote code.
export function createArchiveZip(entries) {
  const encoder = new TextEncoder(); const chunks = []; const directory = []; let offset = 0;
  function crc32(bytes) { let crc = -1; for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ -1) >>> 0; }
  function header(size) { const bytes = new Uint8Array(size); return { bytes, view: new DataView(bytes.buffer) }; }
  for (const entry of entries) {
    if (!/^[a-zA-Z0-9._/-]+$/.test(entry.path) || entry.path.startsWith('/') || entry.path.split('/').includes('..')) throw new Error('Invalid archive path');
    const name = encoder.encode(entry.path);
    const data = entry.content instanceof Uint8Array ? entry.content : entry.encoding === 'base64' ? Uint8Array.from(atob(entry.content), char => char.charCodeAt(0)) : encoder.encode(entry.content);
    const crc = crc32(data); const local = header(30);
    local.view.setUint32(0, 0x04034b50, true); local.view.setUint16(4, 20, true); local.view.setUint16(6, 0x800, true);
    local.view.setUint32(14, crc, true); local.view.setUint32(18, data.length, true); local.view.setUint32(22, data.length, true); local.view.setUint16(26, name.length, true);
    chunks.push(local.bytes, name, data);
    const central = header(46);
    central.view.setUint32(0, 0x02014b50, true); central.view.setUint16(4, 20, true); central.view.setUint16(6, 20, true); central.view.setUint16(8, 0x800, true);
    central.view.setUint32(16, crc, true); central.view.setUint32(20, data.length, true); central.view.setUint32(24, data.length, true); central.view.setUint16(28, name.length, true); central.view.setUint32(42, offset, true);
    directory.push(central.bytes, name); offset += 30 + name.length + data.length;
  }
  const directorySize = directory.reduce((size, bytes) => size + bytes.length, 0); const end = header(22);
  end.view.setUint32(0, 0x06054b50, true); end.view.setUint16(8, entries.length, true); end.view.setUint16(10, entries.length, true); end.view.setUint32(12, directorySize, true); end.view.setUint32(16, offset, true);
  return new Blob([...chunks, ...directory, end.bytes], { type: 'application/zip' });
}
