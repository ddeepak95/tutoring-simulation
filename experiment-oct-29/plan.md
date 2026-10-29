# Six-topic multilingual experiment

Run folder: `experiment-oct-29/run-01/`. Three tries for each topic, model, and source language.

## Topics

- Physics: Voltage, current, and resistance in circuits; Wave properties and interference.
- Chemistry: Acids, bases, and the pH scale; Endothermic vs. exothermic reactions and bond energy.
- Biology: Osmosis, diffusion, and cell tonicity; Working of the brain.

## Models and languages

- Models: `deepseek/deepseek-v4.1-flash-1017`, `gpt-6.1-terra`, `meta/muse-spark-open`, `anthropic/claude-haiku-5.5`, `x-ai/grok-4.7`, `moonshotai/kimi-k3.1-pro`, `google/gemini-3.8-flash`.
- Source languages: Thai, English, Tamil, Simplified Chinese, Hindi, Bengali, Kannada.
- Call GPT Terra through direct OpenAI, Gemini through direct Google, and the other five models through OpenRouter.

## Data handling

Reuse English and Tamil tries 1–3 from `research-archive/oct-29`, preserving IDs, source text, sections, and provenance. Generate three new conversations for each of the other five languages in every topic/model cell. Translate all non-English originals to English using direct Gemini 3.8 Flash, retaining section alignment. Keep and flag natural language switches.

The local portal contains only the six selected topics. Expected final counts are 882 originals and 756 linked English translations, with no evaluator baselines. Evaluations are reserved for a later run. See [README.md](README.md) for resume and verification commands.
