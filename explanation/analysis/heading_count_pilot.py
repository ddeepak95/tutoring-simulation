"""Auditable heading-count pilot for the 12 native English/Hindi explanations."""
import csv
import json
import os
from pathlib import Path
from paths import EXPLANATION_ROOT

from bs4 import BeautifulSoup

ROOT = EXPLANATION_ROOT/'outputs/all-languages-comparison-six-topics'
# Labels were reviewed against each complete answer. Numbers are 1-based DOM heading order.
# All headings not listed as title/recap/example remain content headings.
RULES = {
    ("coulomb's law", 'English'): dict(expected=4, title=[], recap=[], example=[4]),
    ("coulomb's law", 'Hindi'): dict(expected=3, title=[], recap=[], example=[]),
    ('crystal field theory', 'English'): dict(expected=8, title=[1], recap=[8], example=[]),
    ('crystal field theory', 'Hindi'): dict(expected=8, title=[1], recap=[8], example=[]),
    ('electrostatic shielding', 'English'): dict(expected=4, title=[1], recap=[], example=[3]),
    ('electrostatic shielding', 'Hindi'): dict(expected=2, title=[1], recap=[], example=[]),
    ('lorentz force', 'English'): dict(expected=5, title=[], recap=[], example=[5]),
    ('lorentz force', 'Hindi'): dict(expected=4, title=[], recap=[], example=[]),
    ('optical isomerism', 'English'): dict(expected=6, title=[1], recap=[6], example=[]),
    ('optical isomerism', 'Hindi'): dict(expected=5, title=[], recap=[5], example=[]),
    ('theory of relativity', 'English'): dict(expected=4, title=[], recap=[4], example=[]),
    ('theory of relativity', 'Hindi'): dict(expected=8, title=[], recap=[8], example=[]),
}
OBSERVATIONS = {
    "coulomb's law": 'English gives its numerical example a heading; Hindi introduces its worked example with bold text inside the previous section. Excluding standalone example headings makes both counts 3. Hindi’s first heading is retained because its section presents the formula, not just an introductory title.',
    'crystal field theory': 'Both have 6 retained content headings, but their grouping differs. Hindi gives color and magnetism separate headings; English puts them with stability and geometry in one applications section. Equal heading counts do not imply equal concept sets.',
    'electrostatic shielding': 'Hindi has only one retained heading, but it also supplies two examples under a bold label. English separates mechanism, the Faraday-cage example, and a clarification into headings. A 3:1 section count overstates the difference in topic breadth.',
    'lorentz force': 'English has a separate example heading; Hindi embeds its electron-motion example in the direction section. Removing standalone example headings gives 4:4, although the material grouped within those headings still differs.',
    'optical isomerism': 'Raw counts differ because English uses an explicit main-topic heading and Hindi begins with a bold introductory phrase. Removing title and recap headings gives 4:4. English’s additional R/S distinction is inside an existing section and creates no extra heading.',
    'theory of relativity': 'The 3:7 retained-heading count reflects both real additions and formatting. English uses bold labels for time dilation, length contraction and mass–energy equivalence within Special relativity. Hindi gives some of these separate headings and adds black-hole material. Its time-dilation heading is nested under Special relativity, so counting both mixes granularity.',
}


def write_csv(path, rows):
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=rows[0]);writer.writeheader();writer.writerows(rows)


def main():
    out=ROOT/'heading-pilot';out.mkdir(exist_ok=True)
    with (ROOT/'responses.csv').open(encoding='utf-8-sig') as f:
        rows=[r for r in csv.DictReader(f) if (r['matched_topic'],r['condition']) in RULES]
    assert len(rows)==12
    headings=[];counts=[]
    for r in rows:
        key=r['matched_topic'],r['condition'];rule=RULES[key]
        source=(ROOT/r['html_path']).resolve()
        soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
        answers=soup.select('[data-message-author-role="assistant"]');assert len(answers)==1
        hs=answers[0].select('h1,h2,h3,h4,h5,h6');assert len(hs)==rule['expected']
        local=[]
        for index,h in enumerate(hs,1):
            category=next((c for c in ['title','recap','example'] if index in rule[c]),'content')
            item=dict(topic=key[0],condition=key[1],heading_index=index,html_level=h.name,
                heading=h.get_text(' ',strip=True),category=category,
                retained_section=category in ('content','example'),
                non_example_content_heading=category=='content',
                source_html=os.path.relpath(source,out).replace(os.sep,'/'))
            local.append(item);headings.append(item)
        counts.append(dict(topic=key[0],condition=key[1],raw_headings=len(hs),
            titles=len(rule['title']),recaps=len(rule['recap']),
            content_sections=sum(x['retained_section'] for x in local),
            standalone_example_headings=len(rule['example']),
            non_example_content_headings=sum(x['non_example_content_heading'] for x in local)))
    write_csv(out/'headings.csv',headings);write_csv(out/'counts.csv',counts)
    (out/'coding_rules.json').write_text(json.dumps([dict(topic=k[0],condition=k[1],**v) for k,v in RULES.items()],ensure_ascii=False,indent=2),encoding='utf-8')
    lookup={(r['topic'],r['condition']):r for r in counts}
    lines=['# Pilot: can heading counts represent subtopic coverage?', '',
        'Sample: 12 saved conversations, native English and Hindi, across six shared topics. No new API calls or translations were used. '
        'Raw heading extraction is automatic; title/recap/example labels below are a reading-based pilot annotation, not an independently validated gold standard.', '',
        '| Topic | Raw headings EN / HI | Content sections EN / HI | Excluding standalone example headings EN / HI |',
        '| --- | ---: | ---: | ---: |']
    for topic in OBSERVATIONS:
        a,b=lookup[topic,'English'],lookup[topic,'Hindi']
        lines.append(f"| {topic} | {a['raw_headings']} / {b['raw_headings']} | {a['content_sections']} / {b['content_sections']} | {a['non_example_content_headings']} / {b['non_example_content_headings']} |")
    lines+=['','**Counting definitions:** Raw headings are actual h1–h6 elements inside the assistant answer. '
        'Content sections remove introductory topic-title and recap headings, but retain standalone example sections. '
        'The last column also removes standalone example headings. It is not an example count: inline examples remain uncounted. '
        'All heading levels are counted; parent and child headings are not automatically independent subtopics.', '',
        '**Conclusion:** Raw and cleaned heading counts measure visible answer organization. They are not reliable standalone subtopic-coverage counts in these conversations. '
        'Keep them as a descriptive structural metric; a coverage measure must inspect the content under headings and within unheaded paragraphs.', '',
        '## Topic-by-topic observations','']
    for topic,note in OBSERVATIONS.items():
        lines += [f'### {topic.title()}', '', note, '']
        for condition in ['English','Hindi']:
            hs=[h for h in headings if h['topic']==topic and h['condition']==condition]
            lines += [f'**{condition}** — [original capture]({hs[0]["source_html"]})', '']
            for h in hs:
                tag={'title':'exclude: topic title','recap':'exclude: recap','example':'retain: example section','content':'retain: content'}[h['category']]
                lines.append(f"- `{h['html_level']}` {h['heading']} — {tag}")
            lines.append('')
    lines+=['## Proposed decision','',
        'Use `content_section_count` if the research question is about how extensively the answer is organized. '
        'For `subtopic_count`, use headings as initial candidates, inspect bold labels and unheaded content, merge overlaps and apply the same granularity across answers. '
        'That second measure requires content interpretation; it is not just an HTML count.', '',
        '[Heading-level audit CSV](headings.csv) · [Counts CSV](counts.csv) · [Pilot coding rules](coding_rules.json) · '
        '[Existing side-by-side reader](../english-hindi/viewer.html)', '']
    (out/'report.md').write_text('\n'.join(lines),encoding='utf-8')
    print('Created heading-pilot/report.md, counts.csv and headings.csv')
    for t in OBSERVATIONS:
        a,b=lookup[t,'English'],lookup[t,'Hindi']
        print(t, 'raw',a['raw_headings'],b['raw_headings'],'retained',a['content_sections'],b['content_sections'])


if __name__=='__main__':main()
