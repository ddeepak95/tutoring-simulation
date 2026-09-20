"""Analyze the pilot association between content headings and coded idea counts."""
import csv
import json
from pathlib import Path
from paths import EXPLANATION_ROOT

import numpy as np
from bs4 import BeautifulSoup
from heading_idea_codes import CODES, FORMULA_CODES

ROOT=EXPLANATION_ROOT/'outputs/all-languages-comparison-six-topics'


def read(path):
    return list(csv.DictReader(path.open(encoding='utf-8-sig')))


def write(path, rows):
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=rows[0]);w.writeheader();w.writerows(rows)


def ranks(values):
    a=np.asarray(values,dtype=float)
    return np.array([1+np.sum(a<v)+(np.sum(a==v)-1)/2 for v in a])


def corr(x,y):
    if np.std(x)<1e-12 or np.std(y)<1e-12:return None
    return float(np.corrcoef(x,y)[0,1])


def residual(x,z):
    return x-z@np.linalg.lstsq(z,x,rcond=None)[0]


def measures(rows,heading='content_sections'):
    x=np.array([r[heading] for r in rows],dtype=float)
    y=np.array([r['ideas'] for r in rows],dtype=float)
    words=np.array([r['words'] for r in rows],dtype=float)
    topics=sorted({r['topic'] for r in rows})
    z=np.array([[int(r['topic']==t) for t in topics] for r in rows],dtype=float)
    zw=np.column_stack([np.ones(len(rows)),words])
    ztw=np.column_stack([z,words])
    return dict(pearson=corr(x,y),spearman=corr(ranks(x),ranks(y)),
        pearson_controlling_words=corr(residual(x,zw),residual(y,zw)),
        pearson_controlling_topic=corr(residual(x,z),residual(y,z)),
        pearson_controlling_topic_and_words=corr(residual(x,ztw),residual(y,ztw)))


def main():
    out=ROOT/'heading-idea-pilot';out.mkdir(exist_ok=True)
    segments=read(ROOT/'semantic/segments.csv')
    responses={(r['matched_topic'],r['condition']):r for r in read(ROOT/'responses.csv')}
    headings={(r['topic'],r['condition']):r for r in read(ROOT/'heading-pilot/counts.csv')}
    ideas=[];rows=[]
    for key,codes in CODES.items():
        source=(ROOT/responses[key]['html_path']).resolve()
        soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
        math=[n['data-math-source'] for n in soup.select('[data-message-author-role="assistant"] [data-math-source]')]
        units=[s for s in segments if (s['topic'],s['condition'])==key]
        local=[]
        for description,numbers in codes:
            assert numbers and all(1<=n<=len(units) for n in numbers)
            local.append(dict(topic=key[0],condition=key[1],idea_id=f'I{len(local)+1:02}',
                idea=description,evidence_type='text',evidence=' || '.join(units[n-1]['text'] for n in numbers),
                source_segment_ids=';'.join(units[n-1]['id'] for n in numbers),
                source_html='../'+responses[key]['html_path']))
        for description,formula in FORMULA_CODES.get(key,[]):
            assert formula in math,(key,formula)
            local.append(dict(topic=key[0],condition=key[1],idea_id=f'I{len(local)+1:02}',
                idea=description,evidence_type='math_source',evidence=formula,source_segment_ids='',
                source_html='../'+responses[key]['html_path']))
        ideas.extend(local)
        h=headings[key]
        rows.append(dict(topic=key[0],condition=key[1],ideas=len(local),words=int(responses[key]['answer_words']),
            raw_headings=int(h['raw_headings']),content_sections=int(h['content_sections']),
            non_example_content_headings=int(h['non_example_content_headings'])))
    write(out/'coded_ideas.csv',ideas);write(out/'answer_counts.csv',rows)
    stats={metric:measures(rows,metric) for metric in ['raw_headings','content_sections','non_example_content_headings']}
    topics=sorted({r['topic'] for r in rows})
    leave_out=[dict(excluded_topic=t,**measures([r for r in rows if r['topic']!=t])) for t in topics]
    write(out/'leave_one_topic_out.csv',leave_out)
    stats['leave_one_topic_out']=leave_out
    stats['native_language_only']={c:measures([r for r in rows if r['condition']==c]) for c in ['English','Hindi']}
    (out/'correlations.json').write_text(json.dumps(stats,indent=2),encoding='utf-8')
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig,ax=plt.subplots(figsize=(10,7))
    short={"coulomb's law":'Coulomb','crystal field theory':'CFT','electrostatic shielding':'Shielding','lorentz force':'Lorentz','optical isomerism':'Optical','theory of relativity':'Relativity'}
    for c,color,offset in [('English','#286caa',8),('Hindi','#d77b29',-13)]:
        group=[r for r in rows if r['condition']==c]
        ax.scatter([r['content_sections'] for r in group],[r['ideas'] for r in group],c=color,s=75,label=c)
        for r in group:ax.annotate(short[r['topic']],(r['content_sections'],r['ideas']),xytext=(7,offset),textcoords='offset points',fontsize=9)
    ax.set_xlabel('Content headings (titles and recaps removed)');ax.set_ylabel('Coded distinct general ideas')
    ax.set_title('Heading count versus idea count: 12-answer pilot');ax.legend();ax.grid(alpha=.15)
    fig.tight_layout()
    for ext in ['png','svg']:fig.savefig(out/f'headings_vs_ideas.{ext}',dpi=160,bbox_inches='tight')
    plt.close(fig)
    lines=['# Do more content headings predict more ideas?','',
        'Pilot: 12 native English/Hindi answers, paired across six topics. Ideas were coded by the assistant from answer content, '
        'not inferred from heading or embedding counts. The coder had already seen the answers and heading results: this is not a blinded, independent or expert annotation study.', '',
        '## Operational definition','',
        'An idea is a distinct general explanatory proposition, definition, condition or mathematical relationship. '
        'Merge paraphrases and repeated recap statements. Do not add counts for pure notation/unit definitions, historical names/dates, '
        'specific worked or illustrative cases, follow-up offers, or headings alone. '
        'Equations count when they add a relationship not already represented in prose. '
        'Named general applications such as GPS correction remain eligible claims; repeated concrete illustrations of an existing principle do not add ideas. '
        'This granularity is a pilot coding choice, not an established gold standard. Extracted ideas describe claims made, not verified scientific correctness.', '',
        '| Topic | English headings | English ideas | Hindi headings | Hindi ideas |',
        '| --- | ---: | ---: | ---: | ---: |']
    lookup={(r['topic'],r['condition']):r for r in rows}
    for t in topics:
        a,b=lookup[t,'English'],lookup[t,'Hindi']
        lines.append(f"| {t} | {a['content_sections']} | {a['ideas']} | {b['content_sections']} | {b['ideas']} |")
    lines+=['','![Heading count versus ideas](headings_vs_ideas.png)','',
        '## Correlations','',
        '| Heading definition | Pearson r | Spearman rho | Partial r: words | Partial r: topic | Partial r: topic + words |',
        '| --- | ---: | ---: | ---: | ---: | ---: |']
    for metric in ['raw_headings','content_sections','non_example_content_headings']:
        vals=stats[metric]
        lines.append('| '+metric+' | '+' | '.join('NA' if v is None else f'{v:.3f}' for v in vals.values())+' |')
    lines+=['','Pearson measures a linear association. Spearman uses average ranks for ties. Partial Pearson correlations correlate residuals '
        'after least-squares adjustment for counted words, topic indicator variables, or both. These are descriptive diagnostics with very few remaining degrees of freedom, not causal estimates.', '',
        '## Robustness checks','',
        f"For the main content-heading measure, leaving one whole topic out gives pooled Pearson correlations from {min(r['pearson'] for r in leave_out):.3f} to {max(r['pearson'] for r in leave_out):.3f}.", '',
        'No significance claim or population confidence interval is made: there are only six topic pairs, selected rather than randomly sampled, '
        'and each idea inventory is a single subjective coding pass. Word count is also not a language-neutral length measure. '
        'Heading format can change without any idea being added or removed. A positive correlation would therefore support association in this sample, not the equivalence of headings and ideas.', '',
        '## Audit the idea inventory','',
        '[All coded ideas with original evidence](coded_ideas.csv) · [Answer counts](answer_counts.csv) · [Correlation values](correlations.json) · '
        '[Leave-one-topic-out checks](leave_one_topic_out.csv) · [Heading classifications](../heading-pilot/report.md) · '
        '[Side-by-side original answers](../english-hindi/viewer.html)', '']
    for t in topics:
        lines += [f'### {t.title()}','']
        for c in ['English','Hindi']:
            lines += [f'**{c}**','']
            for item in ideas:
                if (item['topic'],item['condition'])==(t,c):lines.append(f"- {item['idea_id']}: {item['idea']}")
            lines.append('')
    (out/'report.md').write_text('\n'.join(lines),encoding='utf-8')
    print(json.dumps(dict(counts=rows,correlations=stats),indent=2))


if __name__=='__main__':main()
