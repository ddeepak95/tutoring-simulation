"""Descriptive matched language comparisons of current Stage 1 content units."""
import csv
from pathlib import Path
from statistics import mean

ROOT = Path(__file__).resolve().parents[2] / 'outputs/multiple/evaluation/full_stage1_batch/content_unit_comparison'
KINDS = ['CONCEPT', 'EXAMPLE', 'ANALOGY', 'PROCEDURE', 'STUDY_SUPPORT', 'CAVEAT', 'OTHER']
LANGS = ['English', 'Arabic', 'Bengali', 'French', 'Hindi', 'Tamil']

def main():
    with (ROOT / 'responses.csv').open(encoding='utf-8-sig', newline='') as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        for k in ['total'] + KINDS:
            r[k] = int(r[k])
    lookup = {(r['topic'], r['model'], r['condition']): r for r in rows}
    def condition(lang, native=False):
        return f"{lang if native else 'English'} prompt / {lang} response"
    def pairs(left, right):
        return [(r, lookup[(r['topic'], r['model'], right)]) for r in rows
                if r['condition'] == left and (r['topic'], r['model'], right) in lookup]
    lines = ['# Content-unit differences across languages', '',
        'Current expanded Stage 1 annotations only. Count each coherent content unit once, by its primary kind; excerpts within a unit are not counted separately. Include only strictly on-topic responses. These are descriptive comparisons, not significance tests or validated quality rankings.', '',
        '## Same English prompt language, different response languages', '',
        'All six conditions have the same 35 topic/model combinations (seven topics across five models), with no relevance exclusions. This is the clearest comparison of response language in this dataset.', '',
        '| Response language | N | Total | Concept | Example | Analogy | Procedure | Study support | Caveat |',
        '|---|---:|---:|---:|---:|---:|---:|---:|---:|']
    for lang in LANGS:
        group = [r for r in rows if r['condition'] == condition(lang)]
        lines.append('| ' + lang + f' | {len(group)} | ' + ' | '.join(f'{mean(r[k] for r in group):.2f}' for k in ['total'] + KINDS[:-1]) + ' |')
    lines += ['', 'Values are mean units per response. OTHER is zero throughout.', '',
        '## Paired differences from English responses', '',
        'Target-language response minus English response, using English prompts for both. Lower/equal/higher compares total unit counts within each topic/model pair.', '',
        '| Language | Pairs | Total difference | Concept | Example | Analogy | Procedure | Study support | Caveat | Lower / equal / higher |',
        '|---|---:|---:|---:|---:|---:|---:|---:|---:|---|']
    exports = []
    for lang in LANGS[1:]:
        paired = pairs(condition(lang), condition('English'))
        diffs = [a['total'] - b['total'] for a,b in paired]
        lines.append('| ' + lang + f' | {len(paired)} | ' + ' | '.join(f'{mean(a[k]-b[k] for a,b in paired):+.2f}' for k in ['total'] + KINDS[:-1]) + f' | {sum(d<0 for d in diffs)} / {sum(d==0 for d in diffs)} / {sum(d>0 for d in diffs)} |')
        for a,b in paired:
            exports.append(dict(comparison='response_language', language=lang, topic=a['topic'], model=a['model'], **{k:a[k]-b[k] for k in ['total']+KINDS}))
    lines += ['', '## Native versus English prompts within the same response language', '',
        'Native-prompt minus English-prompt counts. Match topic and model; exclude only pairs where either response is not strictly on-topic. Each language can therefore have a different subset. This separates the prompt-condition contrast from the response-language contrast above.', '',
        '| Language | Pairs | Total difference | Concept | Example | Analogy | Procedure | Study support | Caveat |',
        '|---|---:|---:|---:|---:|---:|---:|---:|---:|']
    for lang in LANGS[1:]:
        paired = pairs(condition(lang, True), condition(lang))
        lines.append('| '+lang+f' | {len(paired)} | '+' | '.join(f'{mean(a[k]-b[k] for a,b in paired):+.2f}' for k in ['total']+KINDS[:-1])+' |')
        for a,b in paired:
            exports.append(dict(comparison='prompt_condition',language=lang,topic=a['topic'],model=a['model'],**{k:a[k]-b[k] for k in ['total']+KINDS}))
    lines += ['', '## Variation by topic', '',
        'Mean total-unit difference from English responses, with English prompts for both. Each cell averages five matched models.', '',
        '| Topic | Arabic | Bengali | French | Hindi | Tamil |', '|---|---:|---:|---:|---:|---:|']
    for topic in sorted({r['topic'] for r in rows}):
        lines.append('| '+topic+' | '+' | '.join(f"{mean(r['total'] for r in exports if r['comparison']=='response_language' and r['language']==lang and r['topic']==topic):+.2f}" for lang in LANGS[1:])+' |')
    lines += ['', '## Interpretation limits', '',
        'Counts describe the annotated composition, not factual quality, depth, or unique subtopic coverage. One worked example may contain several steps while counting once. A change in category counts can reflect grouping or primary-kind decisions. Counts are provisional Stage 1 judgments; no Stage 2 review has run. Topic/model matching controls composition, but does not make the observations independent or establish causality.', '',
        'The native-prompt comparison describes successful topic recognition only. Report the off-topic rates alongside it rather than interpreting excluded responses as having zero units or no errors.', '',
        '[Interactive dashboard](comparison.html) | [Paired differences CSV](language_unit_differences.csv)', '']
    (ROOT/'language_unit_comparison.md').write_text('\n'.join(lines),encoding='utf-8')
    with (ROOT/'language_unit_differences.csv').open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(exports[0]));writer.writeheader();writer.writerows(exports)
    print('\n'.join(lines))

if __name__ == '__main__':
    main()
