export function loginIdentifier(username) {
  const normalized = username.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(normalized)) throw new Error('Username must use 3–32 ASCII letters, numbers, dots, underscores, or hyphens.');
  return normalized + '@users.annotation.invalid';
}
export function validatePassword(password) { if (typeof password !== 'string' || password.length < 8) throw new Error('Use a password with at least 8 characters.'); }
