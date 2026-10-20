// Supabase public configuration only. All authorization is checked by Auth/RLS/RPC.
import config from './config.js';

export class SessionExpired extends Error {}

export async function initializeStorage() {
  await Promise.all([
    chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' }),
    chrome.storage.local.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' }),
  ]);
}

async function request(path, { token, body, method = body ? 'POST' : 'GET' } = {}) {
  let response;
  try {
    response = await fetch(config.supabaseUrl + path, {
      method, headers: { apikey: config.publicKey, ...(token ? { Authorization: 'Bearer ' + token } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(25000),
    });
  } catch { throw new Error('Could not reach the database. Your draft is retained; check your connection and retry.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) throw new SessionExpired('Your session has expired. Sign in again to save your draft.');
    if (response.status === 429) throw new Error('Too many attempts. Wait a moment and try again.');
    if (response.status >= 500) throw new Error('The database is temporarily unavailable. Retry to check whether this snapshot was saved.');
    throw new Error(data.message || data.error_description || data.msg || 'Request was rejected.');
  }
  return data;
}

async function remember(tokens) {
  const session = { access_token: tokens.access_token, refresh_token: tokens.refresh_token, expires_at: Math.floor(Date.now() / 1000) + tokens.expires_in };
  if (!session.access_token || !session.refresh_token || !Number.isFinite(session.expires_at)) throw new Error('Could not verify sign-in.');
  await chrome.storage.session.set({ auth: session });
  return session;
}

export async function signIn(username, password) {
  username = username.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(username)) throw new Error('Use your portal username (3–32 letters, numbers, dots, underscores, or hyphens).');
  let tokens;
  try { tokens = await request('/auth/v1/token?grant_type=password', { body: { email: username + '@users.annotation.invalid', password } }); }
  catch (error) { if (error instanceof SessionExpired) throw new Error('Username or password is incorrect.'); throw error; }
  const session = await navigator.locks.request('portal-auth-refresh', () => remember(tokens));
  try { return await profile(session.access_token); }
  catch (error) { await chrome.storage.session.remove('auth'); throw error; }
}

let refreshing;
export async function accessToken() {
  const { auth } = await chrome.storage.session.get('auth');
  if (!auth) throw new SessionExpired('Sign in with your portal account.');
  if (auth.expires_at > Date.now() / 1000 + 60) return auth.access_token;
  if (!refreshing) refreshing = navigator.locks.request('portal-auth-refresh', async () => {
    // Serialize refreshes across review tabs, and re-read after acquiring the lock.
    const latest = (await chrome.storage.session.get('auth')).auth;
    if (!latest) throw new SessionExpired('Sign in with your portal account.');
    if (latest.expires_at > Date.now() / 1000 + 60) return latest;
    return remember(await request('/auth/v1/token?grant_type=refresh_token', { body: { refresh_token: latest.refresh_token } }));
  }).catch(async error => {
      if (error instanceof SessionExpired || /refresh token/i.test(error.message)) {
        await chrome.storage.session.remove('auth');
        throw new SessionExpired('Your session has expired. Sign in again to save your draft.');
      }
      throw error;
    }).finally(() => { refreshing = null; });
  return (await refreshing).access_token;
}

async function profile(token) {
  const user = await request('/auth/v1/user', { token });
  if (!user?.id || !/^[a-f0-9-]{36}$/i.test(user.id)) throw new SessionExpired('Sign in again.');
  const rows = await request('/rest/v1/profiles?id=eq.' + encodeURIComponent(user.id) + '&select=id,username,role', { token });
  if (rows.length !== 1 || !['admin', 'annotator'].includes(rows[0].role)) throw new Error('A portal admin or annotator profile is required.');
  return rows[0];
}

export async function currentProfile() { return profile(await accessToken()); }

export async function saveCapture(capture, expectedUserId) {
  const archive = capture.format_version === 'chatgpt-html-archive/1';
  const token = await accessToken();
  const account = await profile(token);
  if (account.id !== expectedUserId) throw new Error('The signed-in account changed in another review tab. Review the account and save again.');
  if (archive && typeof capture.html === 'string') {
    const media = await externalizeCaptureImages(capture.html, account.id, token);
    capture = { ...capture, html: media.html, report: { ...capture.report, image_storage: { uploaded_unique_images: media.uploaded, embedded_fallback_images: media.embeddedFallbacks } } };
  }
  if (new TextEncoder().encode(JSON.stringify(capture)).length > (archive ? 6 * 1024 * 1024 : 2097152)) throw new Error('This capture exceeds the import size limit.');
  // Keep this exact verified token even if another tab changes the shared session.
  return request('/rest/v1/rpc/' + (archive ? 'save_chatgpt_html_archive' : 'import_chatgpt_conversation'), { token, body: { p_capture: capture } });
}

async function externalizeCaptureImages(html, userId, token) {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const locations = new Map(); let uploaded = 0; let embeddedFallbacks = 0;
  for (const image of document.querySelectorAll('img[src^="data:image/"]')) {
    const src = image.getAttribute('src') || ''; const match = src.match(/^data:(image\/[a-z0-9.+-]+)((?:;[^,]*)*),([\s\S]*)$/i);
    if (!match) continue;
    let bytes;
    try { bytes = /;base64(?:;|$)/i.test(match[2]) ? Uint8Array.from(atob(match[3]), char => char.charCodeAt(0)) : new TextEncoder().encode(decodeURIComponent(match[3])); }
    catch { image.src = src; embeddedFallbacks++; continue; }
    const mime = match[1].toLowerCase();
    if (!/^image\/(?:png|jpe?g|gif|webp|avif|bmp|svg\+xml)$/.test(mime) || !bytes.length || bytes.length > 10 * 1024 * 1024) {
      image.src = src; embeddedFallbacks++; continue;
    }
    const digest = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(byte => byte.toString(16).padStart(2, '0')).join('');
    if (locations.has(digest)) { image.src = locations.get(digest); continue; }
    const ext = ({'image/jpeg':'jpg','image/svg+xml':'svg'}[mime] || mime.split('/')[1]);
    const path = `captures/${userId}/${digest}.${ext}`;
    try {
      const response = await fetch(config.supabaseUrl + '/storage/v1/object/capture-images/' + path, { method: 'POST', headers: { apikey: config.publicKey, Authorization: 'Bearer ' + token, 'Content-Type': mime, 'x-upsert': 'true' }, body: bytes });
      if (!response.ok) throw new Error(`${response.status}: ${(await response.text()).slice(0, 300)}`);
      const publicUrl = config.supabaseUrl + '/storage/v1/object/public/capture-images/' + path;
      locations.set(digest, publicUrl); image.src = publicUrl; uploaded++;
    } catch (failure) {
      // Keep the captured bytes in the archive so a Storage error never discards
      // an image or prevents the conversation HTML from being saved.
      locations.set(digest, src); image.src = src; embeddedFallbacks++;
      console.warn(`Image kept embedded after Storage upload failed (${ext.toUpperCase()}):`, failure.message);
    }
  }
  return { html: '<!doctype html>\n' + document.documentElement.outerHTML, uploaded, embeddedFallbacks };
}

export async function signOut() {
  await navigator.locks.request('portal-auth-refresh', async () => {
    const { auth } = await chrome.storage.session.get('auth');
    // Always remove local authentication, including when the remote session expired.
    await chrome.storage.session.remove('auth');
    if (auth) await request('/auth/v1/logout?scope=local', { token: auth.access_token, method: 'POST' }).catch(() => {});
  });
}

export function portalUrl(value = config.portalUrl) {
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || url.pathname !== '/' || !(url.protocol === 'https:' || (url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname)))) throw new Error('Use an HTTPS portal origin, or http://127.0.0.1:5173 for local development.');
  return url.origin;
}
