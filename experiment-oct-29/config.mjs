import path from 'node:path';

export const root = path.resolve(import.meta.dirname, '..');
export const runRoot = path.join(import.meta.dirname, 'run-01');
export const archiveRoot = path.join(root, 'research-archive', 'oct-29');
export const selectedTopics = [
  'series-and-parallel-circuits',
  'wave-properties-and-interference',
  'acids-bases-and-the-ph-scale',
  'endothermic-exothermic-and-bond-energy',
  'osmosis-diffusion-and-tonicity',
  'brain',
];
export const models = [
  'deepseek/deepseek-v4.1-flash-1017',
  'gpt-6.1-terra',
  'meta/muse-spark-open',
  'anthropic/claude-haiku-5.5',
  'x-ai/grok-4.7',
  'moonshotai/kimi-k3.1-pro',
  'google/gemini-3.8-flash',
];
export const languages = ['th', 'en', 'ta', 'zh', 'hi', 'bn', 'kn'];
export const newLanguages = languages.filter(language => !['en', 'ta'].includes(language));
export const translationModel = 'gemini-3.8-flash';
export const tries = 3;

export function loadEnvironment() {
  for (const file of [path.join(root, '.env'), path.join(root, 'agentic_conversation_capture', '.env.local')]) {
    try { process.loadEnvFile(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
