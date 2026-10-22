import languages from '../../agentic_conversation_capture/languages.json';

const entries = Object.entries(languages) as [string, { name: string }][];

export function languageId(value: string | null | undefined): string {
  const trimmed = (value || '').trim();
  if (/^unspecified$/i.test(trimmed) || !trimmed) return 'und';
  const named = entries.find(([, item]) => item.name.toLowerCase() === trimmed.toLowerCase());
  if (named) return named[0];
  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(trimmed)) throw new Error(`Use a language code such as en or ta: ${trimmed}`);
  return trimmed.toLowerCase();
}

export function languageName(value: string | null | undefined): string {
  const id = value?.trim().toLowerCase();
  if (!id || id === 'und' || id === 'unspecified') return 'Unspecified';
  const named = entries.find(([code, item]) => code === id || item.name.toLowerCase() === id);
  if (named) return named[1].name;
  return value!;
}
