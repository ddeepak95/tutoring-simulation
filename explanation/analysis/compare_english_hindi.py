"""Create a local side-by-side reader and content review of native English/Hindi answers."""
import csv
import html
import json
import os
from pathlib import Path
from paths import EXPLANATION_ROOT

from bs4 import BeautifulSoup

ROOT = EXPLANATION_ROOT/'outputs/all-languages-comparison-six-topics'
OUT = ROOT/'english-hindi'
NOTES = {
    "coulomb's law": {
        'shared': 'Both give the inverse-square formula, define its variables, distinguish attraction and repulsion, and work the same 2 C / 3 C / 2 m numerical example. Both contain an interactive equation widget, although their illustration counts are zero.',
        'english': 'Adds three distance-scaling examples: double, triple, and halve the separation. Explains the charge-strength relationship in everyday language and explicitly calls the worked-example force repulsive.',
        'hindi': 'States point charges explicitly, gives the proportionalities directly, and illustrates doubling the distance. It is a more compressed presentation of much of the same core material.',
        'judgment': 'English supplies more explanatory scaffolding; the shorter Hindi answer still contains the core law and the worked example.'},
    'crystal field theory': {
        'shared': 'Both cover degenerate d orbitals, octahedral/tetrahedral splitting, high/low spin with d6 examples, color, magnetism, and the limitation of a purely electrostatic model.',
        'english': 'Explains unequal repulsion through orbital orientation and ligands approaching along axes. Names CN− and F− as strong/weak-field examples and mentions CFSE in its application table.',
        'hindi': 'Adds the 0.4Δo lowering / 0.6Δo raising, explicit Δ versus pairing-energy P inequalities, Δ=hν for absorption, and an explicit paramagnetic/diamagnetic distinction. It describes ligands as negative charges or dipoles.',
        'judgment': 'Comparable breadth with different emphasis: English is more spatial/conceptual; Hindi is more explicit about energy relationships. The word counts differ by only ten.'},
    'electrostatic shielding': {
        'shared': 'Both explain free-electron redistribution, electrostatic equilibrium and shielding, with a metal car and a Faraday cage/electronic enclosure as examples.',
        'english': 'Separates the mechanism into five steps, explicitly discusses the induced field opposing the applied field, adds coaxial cables and other applications, and clarifies that shielding does not mean charge cannot enter a conductor.',
        'hindi': 'Compresses the mechanism into a paragraph with induced surface charge, gives two applications, and ends with a brief definition.',
        'judgment': 'English develops the mechanism and applications more fully; Hindi provides a concise introduction.'},
    'lorentz force': {
        'shared': 'Both give electric and magnetic components, parallel/perpendicular cases, charge-sign direction rules, and the statement that magnetic force changes direction rather than speed.',
        'english': 'Explicitly states that electric force acts even on a stationary charge, lists v=0 separately, explains the finger/curl/thumb rule, and gives a proton right/up/out-of-page example. It includes three illustrations.',
        'hindi': 'Explicitly states perpendicularity to velocity and magnetic field and mentions circular or helical electron motion. It names the right-hand rule without the same step-by-step gesture description. No image elements were captured.',
        'judgment': 'Both cover the main equations and magnetic-force behavior. English provides a more concrete directional example; Hindi adds a brief trajectory example.'},
    'optical isomerism': {
        'shared': 'Both explain chirality, the four groups in lactic acid, non-superimposable enantiomers, the hand analogy, opposite equal optical rotations, and racemic cancellation.',
        'english': 'Explicitly warns that +/− optical rotation does not determine R/S configuration, and notes that enantiomers share many physical properties.',
        'hindi': 'Adds a numerical +30°/−30° rotation illustration and explicitly names optical inactivity. It is slightly longer but does not include the R/S warning.',
        'judgment': 'Very similar core coverage. Hindi elaborates an example, while English contains a useful extra distinction; length alone would miss that trade-off.'},
    'theory of relativity': {
        'shared': 'Both introduce special/general relativity and dates, the two postulates, time dilation, mass–energy equivalence, spacetime curvature, the qualified rubber-sheet analogy, gravitational time dilation and GPS.',
        'english': 'Explicitly explains length contraction along the motion direction and closes with invariants, including the spacetime interval and why relativity does not mean everything is relative.',
        'hindi': 'Adds an astronaut example and a twin-paradox mention, expands the three-space-plus-one-time description and orbital-motion discussion, and includes a separate black-hole/event-horizon explanation and image group. It repeats key points in a summary table and offers follow-up explanations. Distance dependence is mentioned but length contraction is not explained as explicitly.',
        'judgment': 'Hindi is substantially more expansive, with additional examples and black-hole material, but also more recap and follow-up text. English is more compact and includes distinctions absent from Hindi.'},
}


def load(path):
    return list(csv.DictReader(path.open(encoding='utf-8-sig')))


def rel(path):
    return os.path.relpath(path,OUT).replace(os.sep,'/')


def answer_panel(path, images):
    soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
    answer=soup.select_one('[data-message-author-role="assistant"]')
    for node in list(answer.select('[data-testid="math-block-layout"]')):
        replacement=soup.new_tag('p');replacement.string='[Interactive equation widget: see original capture]'
        node.replace_with(replacement)
    for node in list(answer.select('script,style,button,[role="button"],[data-testid="webpage-citation-pill"]')):
        if node.parent is not None:
            if node.select('img') and node.name not in ('script','style'):
                node.unwrap()
            else:
                node.decompose()
    # Recover source math before stripping duplicate/hidden presentation spans.
    for node in list(answer.select('[data-math-source]')):
        if node.parent is not None:
            replacement=soup.new_tag('code');replacement['class']='formula';replacement.string=node['data-math-source']
            node.replace_with(replacement)
    for node in list(answer.select('.katex')):
        if node.parent is not None:
            annotation=node.select_one('annotation')
            replacement=soup.new_tag('code');replacement['class']='formula'
            replacement.string=annotation.get_text() if annotation else node.get_text(' ',strip=True)
            node.replace_with(replacement)
    for node in list(answer.select('[aria-hidden="true"],[hidden],svg')):
        if node.parent is not None:node.decompose()
    candidates=[i for i in answer.select('img') if i.get('src') or i.get('data-src')]
    assert len(candidates)==len(images),(path,len(candidates),len(images))
    for img,record in zip(candidates,images):
        img.attrs={'src':rel((ROOT/'image-language'/record['path']).resolve()),'alt':'Saved answer illustration','loading':'lazy'}
    for node in answer.find_all(True):
        for attr in list(node.attrs):
            if attr.lower().startswith('on') or attr in ('style','id','contenteditable'):
                del node[attr]
        if node.name=='a':
            href=node.get('href','')
            if not href.startswith(('https://','http://')):node.attrs.pop('href',None)
            node['target']='_blank';node['rel']='noopener noreferrer'
    return str(answer)


def main():
    OUT.mkdir(exist_ok=True)
    rows=[r for r in load(ROOT/'responses.csv') if r['condition'] in ('English','Hindi') and r['matched_topic'] in NOTES]
    lookup={(r['matched_topic'],r['condition']):r for r in rows}
    div={(r['topic'],r['condition']):r for r in load(ROOT/'semantic/diversity.csv')}
    cov={(r['topic'],r['condition']):r for r in load(ROOT/'semantic/coverage.csv') if float(r['threshold'])==.7}
    images=load(ROOT/'image-language/image_classifications.csv')
    lines=['# English versus native Hindi: topic-by-topic review','',
        'Six matched topics, one answer per condition per topic. This review reads the saved answers; it is not a new API judgment or an independent scientific-accuracy audit. Code-mixed Hindi is excluded.', '',
        '**Main finding:** Hindi has more words overall (1,843 versus 1,667), driven by relativity (668 versus 353). '
        'English is longer on four of six topics. Excluding relativity, English averages 262.8 words and Hindi 235.0. '
        'Both have 15 image appearances overall, but English has three Lorentz-force images while Hindi has none; Hindi has six relativity images versus three in English.', '',
        '[Open the side-by-side reader](viewer.html)', '',
        '| Topic | English words | Hindi words | English images | Hindi images |',
        '| --- | ---: | ---: | ---: | ---: |']
    payload=[]
    for topic,notes in NOTES.items():
        en,hi=lookup[topic,'English'],lookup[topic,'Hindi']
        lines.append(f"| {topic} | {en['answer_words']} | {hi['answer_words']} | {en['answer_images']} | {hi['answer_images']} |")
        panels={}
        for c,r in [('English',en),('Hindi',hi)]:
            path=(ROOT/r['html_path']).resolve()
            ims=sorted([i for i in images if i['experiment']==r['experiment'] and i['job_id']==r['job_id']],key=lambda i:int(i['image_index']))
            panels[c]=dict(html=answer_panel(path,ims),words=r['answer_words'],images=r['answer_images'],
                diversity=float(div[topic,c]['mean_pairwise_semantic_distance']),coverage=float(cov[topic,c]['coverage_percent']),
                original=rel(path),screenshot=rel(path.with_name('conversation.png')))
        payload.append(dict(topic=topic,notes=notes,panels=panels))
    for topic,notes in NOTES.items():
        lines+=['',f'## {topic.title()}','',f'**Shared content:** {notes["shared"]}', '',
            f'**English emphasis:** {notes["english"]}', '',f'**Hindi emphasis:** {notes["hindi"]}', '',
            f'**Reading-based assessment:** {notes["judgment"]}', '',
            f'[English capture]({rel((ROOT/lookup[topic,"English"]["html_path"]).resolve())}) · '
            f'[Hindi capture]({rel((ROOT/lookup[topic,"Hindi"]["html_path"]).resolve())})']
    lines+=['','## Existing embedding measurements','',
        'These reuse the original-language embeddings, not English-translated embeddings. Coverage denominators remain the full 15-condition pool; the analysis was not reclustered using just English and Hindi.', '',
        '| Topic | English diversity | Hindi diversity | English coverage | Hindi coverage |',
        '| --- | ---: | ---: | ---: | ---: |']
    for t in NOTES:
        lines.append(f"| {t} | {float(div[t,'English']['mean_pairwise_semantic_distance']):.4f} | {float(div[t,'Hindi']['mean_pairwise_semantic_distance']):.4f} | {float(cov[t,'English']['coverage_percent']):.2f}% | {float(cov[t,'Hindi']['coverage_percent']):.2f}% |")
    lines+=['','Hindi has higher within-answer semantic distance on five topics, while English has higher cluster coverage on five topics. '
        'These measure different properties and do not establish which explanation is better. The content review above shows why a simple winner ranking loses useful distinctions.', '',
        'Gemini classified 12 of the 15 English image appearances as English-only and three as containing no language-bearing text. '
        'For Hindi it classified 13 as English-only and two as containing no language-bearing text; none had Hindi instructional labels.', '',
        '## Reading notes and limitations','',
        '- Word counts exclude equations and interactive widgets and are not equivalent information units across languages.',
        '- The original Markdown extraction sometimes flattens fractions and scripts; this is not sufficient evidence of a mathematical error in the generated answer. Check the original HTML or screenshot. The viewer shows available source math as literal LaTeX rather than silently rewriting it.',
        '- The viewer removes application controls and replaces interactive widgets with a marker. Original captures remain linked for full visual inspection.',
        '- Some length comes from summaries and follow-up offers, rather than additional explanatory claims.',
        '- The answers were collected across different batches/accounts. One response per topic cannot establish a general language effect. Coverage remains sensitive to segment count and multilingual alignment.', '']
    (OUT/'comparison.md').write_text('\n'.join(lines),encoding='utf-8')
    (OUT/'comparison_notes.json').write_text(json.dumps(NOTES,ensure_ascii=False,indent=2),encoding='utf-8')
    data=json.dumps(payload,ensure_ascii=False).replace('</','<\\/')
    document='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>English and Hindi response comparison</title>
<style>*{box-sizing:border-box}body{margin:0;background:#f3f5f8;color:#152234;font:16px/1.6 system-ui}header{padding:20px 4%;background:white;border-bottom:1px solid #ccd3df}h1{font-size:25px;margin:0}select{padding:9px;font:inherit;margin:12px 0}main{padding:18px 4%}.notes{background:#fff;padding:16px;border-radius:10px;margin-bottom:20px}.notes p{margin:8px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.panel{background:white;border-radius:10px;overflow:hidden}.panelhead{padding:12px 20px;background:#e7eef8;position:sticky;top:0}.body{padding:20px;max-height:75vh;overflow:auto}.body img{max-width:100%;max-height:320px;object-fit:contain}.body table{border-collapse:collapse;width:100%}.body td,.body th{border:1px solid #ddd;padding:6px}.body pre{white-space:pre-wrap}.formula{display:inline-block;white-space:pre-wrap;overflow-wrap:anywhere;color:#6b285a;background:#f9f1f7;padding:3px}h2{font-size:21px}.metrics{font-size:14px}a{color:#175ea1}button{padding:8px;font:inherit}body.expanded .body{max-height:none}@media(max-width:800px){.grid{grid-template-columns:1fr}.body{max-height:none}}</style>
<header><h1>English and native Hindi: six topics</h1><p>Inspect original answer content alongside reading-based observations. Equations are shown as source LaTeX where available; open the captures for the original mathematical layout.</p><label for="topic">Topic </label><select id="topic"></select> <button id="expand">Show full answer heights</button> <a href="comparison.md">Detailed Markdown comparison</a></header>
<main><section id="notes" class="notes"></section><div class="grid" id="panels"></div></main><script>const D='''+data+''';const select=document.querySelector('#topic');D.forEach((x,i)=>select.add(new Option(x.topic,i)));
function text(parent,tag,value){const e=document.createElement(tag);e.textContent=value;parent.append(e);return e}
function show(){const d=D[+select.value],notes=document.querySelector('#notes'),panels=document.querySelector('#panels');notes.replaceChildren();panels.replaceChildren();for(const [key,label] of [['shared','Shared'],['english','English emphasis'],['hindi','Hindi emphasis'],['judgment','Assessment']])text(notes,'p',label+': '+d.notes[key]);for(const lang of ['English','Hindi']){const x=d.panels[lang],p=document.createElement('section');p.className='panel';const h=document.createElement('div');h.className='panelhead';text(h,'h2',lang);text(h,'p',x.words+' counted words · '+x.images+' images · diversity '+x.diversity.toFixed(3)+' · pooled coverage '+x.coverage.toFixed(2)+'%').className='metrics';for(const [name,url] of [['Original HTML',x.original],['Screenshot',x.screenshot]]){const a=text(h,'a',name+' ');a.href=url;a.target='_blank';a.rel='noopener'}p.append(h);const b=document.createElement('div');b.className='body';b.lang=lang==='Hindi'?'hi':'en';b.innerHTML=x.html;p.append(b);panels.append(p)}}select.onchange=show;document.querySelector('#expand').onclick=()=>{document.body.classList.toggle('expanded');document.querySelector('#expand').textContent=document.body.classList.contains('expanded')?'Use scroll panels':'Show full answer heights'};show();</script></html>'''
    (OUT/'viewer.html').write_text(document,encoding='utf-8')
    print('Created english-hindi/comparison.md and viewer.html')


if __name__=='__main__':main()
