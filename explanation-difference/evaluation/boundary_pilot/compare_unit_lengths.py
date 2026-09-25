"""Word lengths of original-language units in current Stage 1 annotations."""
import csv,json,sys
from pathlib import Path
from statistics import mean,median
sys.path.insert(0,str(Path(__file__).resolve().parent.parent))
from compare_content_units import count_words,WORD_COUNT_METHOD,KINDS
ROOT=Path(__file__).resolve().parents[2]/'outputs/multiple/evaluation/full_stage1_batch'

def main():
    units=[];responses=[];excluded=0
    for meta in json.loads((ROOT/'status.json').read_text(encoding='utf-8')):
        assert meta['success'], 'Incomplete batch'
        folder=Path(meta['output']);d=json.loads((folder/'stage1.json').read_text(encoding='utf-8'))
        if d['topic_relevance']['topic_match']!='on_topic':
            excluded+=1;continue
        m=json.loads((folder/'manifest.json').read_text(encoding='utf-8'));language=m['payload']['response_language']
        base=dict(topic=meta['topic'],model=meta['model'],condition=meta['condition'],language=language,prompt_type='native' if meta['condition'].endswith('-native') else 'english')
        lengths=[]
        for u in d['content_units']:
            # Separate excerpts are independently rendered to avoid creating Markdown
            # structures across gaps in the source. No annotation prose is counted.
            n=sum(count_words(e['text']) for e in u['excerpts'])
            row=dict(**base,unit_id=u['id'],kind=u['kind'],label=u['label'],word_count=n,excerpt_count=len(u['excerpts']))
            units.append(row);lengths.append(row)
        if lengths:
            responses.append(dict(**base,category='ALL',unit_count=len(lengths),mean_unit_words=mean(r['word_count'] for r in lengths)))
        for kind in KINDS:
            subset=[r['word_count'] for r in lengths if r['kind']==kind]
            if subset:responses.append(dict(**base,category=kind,unit_count=len(subset),mean_unit_words=mean(subset)))
    out=ROOT/'content_unit_comparison'
    for filename,rows in [('unit_word_counts.csv',units),('response_unit_lengths.csv',responses)]:
        with (out/filename).open('w',encoding='utf-8-sig',newline='') as f:
            w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    lines=['# Word counts within content units','','Only strictly on-topic current Stage 1 responses are included. '+str(excluded)+' off-topic/partial responses excluded. Words come from original-language source excerpts, not translated text, unit labels, or judge explanations. For multiple excerpts, count each excerpt separately and sum. Unassigned source text is excluded.','','Method: '+WORD_COUNT_METHOD,'','Primary summary: calculate mean unit length within each response, then average those response means. Each response receives equal weight. For a category, include only responses containing that category; absence is not a zero-word unit. Category values can have different denominators.','','## English prompts: response language comparison','','| Language | Responses | Units | Mean words/unit (response-weighted) | Pooled median unit words | Concept | Example | Study support |','|---|---:|---:|---:|---:|---:|---:|---:|']
    langs=['English','Arabic','Bengali','French','Hindi','Tamil']
    for lang in langs:
        rs=[r for r in responses if r['language']==lang and r['prompt_type']=='english'];us=[u for u in units if u['language']==lang and u['prompt_type']=='english'];allrows=[r for r in rs if r['category']=='ALL']
        values=[mean(r['mean_unit_words'] for r in allrows),median(u['word_count'] for u in us)]+[mean(r['mean_unit_words'] for r in rs if r['category']==k) for k in ['CONCEPT','EXAMPLE','STUDY_SUPPORT']]
        lines.append(f'| {lang} | {len(allrows)} | {len(us)} | '+' | '.join(f'{v:.1f}' for v in values)+' |')
    lines+=['','## All prompt conditions and categories','','Cells show response-weighted mean words/unit (number of contributing responses).','','| Condition | Overall | Concept | Example | Analogy | Procedure | Study support | Caveat |','|---|---|---|---|---|---|---|---|']
    for condition in sorted({r['condition'] for r in responses}):
        cells=[]
        for category in ['ALL']+KINDS[:-1]:
            vs=[r['mean_unit_words'] for r in responses if r['condition']==condition and r['category']==category]
            cells.append(f'{mean(vs):.1f} (n={len(vs)})' if vs else 'absent')
        lines.append('| '+condition+' | '+' | '.join(cells)+' |')
    lines+=['','## Matched native minus English prompt differences','','Same output language, topic and model; retain pairs only when both responses are on-topic. Differences are in the response-level mean words per unit, not matched individual units.','','| Language | Pairs | Difference in mean words/unit |','|---|---:|---:|']
    lookup={(r['topic'],r['model'],r['language'],r['prompt_type']):r for r in responses if r['category']=='ALL'}
    for lang in langs[1:]:
        diffs=[]
        for r in responses:
            if r['category']=='ALL' and r['language']==lang and r['prompt_type']=='native':
                other=lookup.get((r['topic'],r['model'],lang,'english'))
                if other:diffs.append(r['mean_unit_words']-other['mean_unit_words'])
        lines.append(f'| {lang} | {len(diffs)} | {mean(diffs):+.1f} |')
    lines+=['','## Interpretation','','Shorter units can account for shorter responses even when unit counts are similar. However, whitespace word counts are language-dependent, especially for morphologically rich languages; shorter counts do not establish less information, weaker explanation, or poorer quality. Unit boundaries and category mixtures also affect length. The pooled median describes all units and is not response-weighted. No significance tests have been performed; individual units should not be treated as independent samples.','','[Per-unit CSV](unit_word_counts.csv) | [Per-response/category CSV](response_unit_lengths.csv)','']
    (out/'unit_word_count_comparison.md').write_text('\n'.join(lines),encoding='utf-8')
    print('\n'.join(lines))
if __name__=='__main__':main()
