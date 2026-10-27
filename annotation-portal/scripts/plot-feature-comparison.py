"""Render a saved compare-feature-labels.mjs snapshot without database access."""
import csv
import json
import sys
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import PowerNorm
import numpy as np

root = Path(sys.argv[1])
data = json.loads((root / 'comparison.json').read_text(encoding='utf-8'))
source = json.loads((root / 'source-snapshot.json').read_text(encoding='utf-8'))
features = source['rubric']['rubric']
summary = data['originalSummary']
codes = [r['language'] for r in summary]
names = [r['language_name'] for r in summary]
lookup = {(r['language'], r['feature']): r for r in data['originalFeatures']}
matrix = np.array([[lookup[c, f['key']]['occurrences'] for c in codes] for f in features])
prevalence = np.array([[lookup[c, f['key']]['section_prevalence_pct'] for c in codes] for f in features])
assert len(source['records']) == data['metadata']['conversations']
assert sum(len(r['baseline']['annotations']) for r in source['records']) == sum(r['positive_labels'] for r in data['summary'])
assert len(summary) == 10 and all(r['conversations'] == 5 for r in summary)
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10, 'svg.fonttype': 'none'})
fig, axes = plt.subplots(1, 2, figsize=(19, 10), gridspec_kw={'width_ratios': [1, 1]})
for ax, values, title, norm in [(axes[0], matrix, 'Feature occurrences (total across five conversations)', PowerNorm(gamma=.5, vmin=0, vmax=matrix.max())), (axes[1], prevalence, 'Sections containing the feature (%)', None)]:
    im = ax.imshow(values, cmap='YlGnBu', aspect='auto', norm=norm, **({'vmin': 0, 'vmax': 100} if norm is None else {}))
    ax.set_xticks(range(len(codes)), names, rotation=45, ha='right')
    ax.set_yticks(range(len(features)), [f['name'] for f in features] if ax is axes[0] else [])
    ax.set_title(title, pad=15)
    for i in range(len(features)):
        for j in range(len(codes)):
            val = values[i, j]
            color = 'white' if (norm(val) if norm else val/100) > .55 else '#17212b'
            ax.text(j, i, f'{val:.0f}', ha='center', va='center', color=color, fontsize=9)
    for y in [7.5, 10.5]:
        ax.axhline(y, color='#9ca3af', lw=2)
    fig.colorbar(im, ax=ax, fraction=.025, pad=.02)
fig.suptitle('Argon instructional features across 10 languages', fontsize=19, y=.98)
fig.text(.5, .02, '50 original conversations; five matched topics per language. English translation excluded. Presence and occurrence counts are different measures.\nAutomated image-based annotations; descriptive comparison, not a measure of teaching quality or a causal language effect.', ha='center', fontsize=10)
fig.tight_layout(rect=(0, .07, 1, .94))
for ext in ['png', 'svg']:
    fig.savefig(root / ('feature-language-comparison.' + ext), dpi=180)
plt.close(fig)

categories = data['metadata']['categories']
catlookup = {(r['language'], r['category']): r for r in data['originalCategories']}
fig, axes = plt.subplots(1, 2, figsize=(15, 7))
colors = ['#3478a5', '#d99832', '#479970']
for ax, key, title in [(axes[0], 'occurrences_per_conversation', 'Feature occurrences per conversation'), (axes[1], 'occurrences_per_100_sections', 'Feature occurrences per 100 sections')]:
    bottom = np.zeros(len(codes))
    for category, color in zip(categories, colors):
        vals = np.array([catlookup[c, category][key] for c in codes])
        ax.bar(names, vals, bottom=bottom, label=category, color=color)
        bottom += vals
    ax.tick_params(axis='x', rotation=45)
    ax.set_title(title)
    ax.spines[['top', 'right']].set_visible(False)
    for i, total in enumerate(bottom):
        ax.text(i, total+max(bottom)*.015, f'{total:.1f}', ha='center', fontsize=9)
    ax.set_ylim(0, max(bottom)*1.12)
axes[0].legend(loc='upper left', fontsize=9)
fig.suptitle('Rubric category comparison — 50 original conversations', fontsize=17)
fig.text(.5, .01, 'Counts sum different feature types; they do not indicate instructional quality. Section normalization adjusts for segmentation, not response length.', ha='center', fontsize=9)
fig.tight_layout(rect=(0,.05,1,.94))
for ext in ['png', 'svg']:
    fig.savefig(root / ('category-language-comparison.' + ext), dpi=180)
plt.close(fig)

def table(headers, rows):
    return '\n'.join(['| ' + ' | '.join(headers) + ' |', '| ' + ' | '.join(['---']*len(headers)) + ' |'] + ['| '+' | '.join(map(str, r))+' |' for r in rows])

original_totals = {f['key']: sum(lookup[c, f['key']]['occurrences'] for c in codes) for f in features}
grand = sum(original_totals.values())
cat_totals = {cat: sum(r['occurrences'] for r in data['originalCategories'] if r['category']==cat) for cat in categories}
cat_table = [[cat, n, f'{100*n/grand:.1f}%'] for cat, n in cat_totals.items()]
summary_table = [[r['language_name'],r['sections'],r['positive_labels'],r['occurrences'],f"{r['occurrences_per_conversation']:.1f}",f"{r['occurrences_per_100_sections']:.1f}"] for r in summary]
cat_lang_table = [[name]+[f"{catlookup[c,cat]['occurrences_per_conversation']:.1f}" for cat in categories] for c,name in zip(codes,names)]
feature_table = [[f['name']]+[str(lookup[c,f['key']]['occurrences']) for c in codes]+[str(original_totals[f['key']])] for f in features]
topic_table=[]
for topic in data['metadata']['topics']:
    group=[]
    for c in codes:
        records=[r for r in source['records'] if r['document']['language']==c and r['document']['topic_id']==topic and not r['document']['source_conversation_id']]
        assert len(records)==1
        group.append(sum(a['entry']['count'] for a in records[0]['baseline']['annotations']))
    topic_table.append([topic]+group)

text = f"""# Feature-label comparison across languages

Snapshot: {data['metadata']['extracted_at']}; Supabase `{data['metadata']['project']}`.

## Scope and measures

- All {data['metadata']['conversations']} current conversations have a saved baseline. Same model (`gemini-4-argon`), prompt (`turn-image-counts/6`), and rubric hash (`{data['metadata']['rubric_hash']}`). No new model calls were made for this analysis.
- Main comparison: 50 original conversations, 10 languages × five topics, three tutor turns each. English has an additional Covalent Radius translation from Tamil; it is included in the all-record CSVs but excluded from original-only comparisons. For each conversation, use the latest matching image-only baseline.
- Positive label: one nonzero section–feature pair. Occurrences: sum of `entry.count`; one label can count multiple occurrences. Missing labels in a validated complete turn mean zero. Section prevalence: percentage of sections containing a feature, not percentage of conversations.
- Per-conversation comparisons have identical topic counts. Per-100-section rates adjust for unequal segmentation, not token/word length. A section can contain several feature types; totals and category rates can exceed 100.

## Main findings

- Chinese has the largest occurrence total (311; 62.2 per conversation), followed by English (264; 52.8) and Bengali (256; 51.2). German has the smallest raw total (177; 35.4), just below Tamil (180; 36.0).
- Section normalization changes the lower end: German rises to 256.5 occurrences per 100 sections, while Tamil remains lowest at 225.0. Chinese remains highest at 311.0; English is next at 300.0. Raw totals partly reflect different numbers of sections.
- Textual Representations account for {100*cat_totals['Textual Representations']/grand:.1f}% of all occurrences, Content {100*cat_totals['Content']/grand:.1f}%, and Multimedia {100*cat_totals['Multimedia']/grand:.1f}%. Headings alone contribute {original_totals['headings']} occurrences ({100*original_totals['headings']/grand:.1f}% of the total).
- Chinese leads all three categories per conversation: Multimedia 13.4, Textual Representations 29.6, Content 19.2. With section normalization, category leaders differ: Chinese for Multimedia (67.0/100 sections), Bengali for Textual Representations (162.1), and Thai for Content (107.1).
- The largest specific-feature contrasts include examples (Chinese 67 versus Tamil 28), equations (Chinese 29 and Bengali 27 versus German 8), and questions (English 24 versus Chinese 7 and German 6). Counts are totals over five conversations each.
- No analogies were assigned to Hindi; Chinese has 11 and English 9. Maps and animations were assigned zero in every language. These are candidates for annotation review, not confirmed absences in the underlying teaching behavior.

## Language totals — original conversations

{table(['Language','Sections','Positive labels','Occurrences','Occurrences / conversation','Occurrences / 100 sections'],summary_table)}

## Rubric categories

{table(['Category','Occurrences','Share of all occurrences'],cat_table)}

Average occurrences per conversation, within category:

{table(['Language']+categories,cat_lang_table)}

## Every feature by language

Counts below are occurrence totals across five original conversations in each language. Features follow rubric order: eight Multimedia, three Textual Representations, four Content features.

{table(['Feature']+names+['Total'],feature_table)}

## Topic-level totals

Total feature occurrences for the single original conversation in each language–topic cell. These totals combine different feature types.

{table(['Topic']+names,topic_table)}

## Interpretation limits and review priorities

- These are model annotations of different captured conversations, not controlled translations. Differences can reflect generated content, topic-specific examples, capture coverage, section boundaries, and model errors. They do not establish that a language causes an instructional difference or that a higher count means better teaching.
- Only one original conversation per language–topic cell; no repeated generations or human-adjudicated ground truth. Report descriptive differences rather than significance tests or population-level rankings.
- Maps and animations have zero annotations in every language. This means Argon assigned none in this snapshot; static images cannot independently confirm animation behavior. Interactive-media counts also warrant review against actual controls/states.
- Headings are a large share of the total. Inspect individual features and category summaries before interpreting an overall total. Other Images includes unknown hidden-image types supported by quantity cues; a zero in a specific visual type need not mean no visual support.
- Review Chinese Brain and Heart question counts (both zero) against the rendered captures and the knowledge-check definition before treating them as an instructional absence. Compare against the five-question totals seen in several other languages.

## Artifacts and reproduction

- `feature-language-comparison.png` / `.svg`: every feature, with counts and section prevalence.
- `category-language-comparison.png` / `.svg`: category rates per conversation and per 100 sections.
- `original-language-*.csv`: balanced 50-original main comparison.
- `conversation-features.csv`: all 51 conversations × 15 features, including zero counts and provenance IDs.
- `language-*.csv`, `feature-totals.csv`, `topic-language-features.csv`: all-record analyses; English includes the extra translation. Topic-balanced means in `language-features.csv` and `language-summary.csv` average within each topic before averaging the five topics.
- `source-snapshot.json`: selected metadata, annotations, generation configuration, and rubric; no credentials. `comparison.json`: derived aggregates.

From `annotation-portal`:

```powershell
node scripts/compare-feature-labels.mjs --project {data['metadata']['project']} --output PATH
../.venv/Scripts/python.exe scripts/plot-feature-comparison.py PATH
```
"""
(root/'report.md').write_text(text,encoding='utf-8')
print(json.dumps({'original_conversations':50,'sections':sum(r['sections'] for r in summary),'positive_labels':sum(r['positive_labels'] for r in summary),'occurrences':grand,'categories':cat_totals,'original_summary':summary,'feature_totals':original_totals,'outputs':str(root)},indent=2))
