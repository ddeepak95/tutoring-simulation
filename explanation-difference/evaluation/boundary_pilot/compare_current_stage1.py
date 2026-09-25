"""Language comparisons using only the current expanded Stage 1 results."""
import json,csv,sys,re
from pathlib import Path
from collections import Counter,defaultdict
from statistics import mean
sys.path.insert(0,str(Path(__file__).resolve().parent.parent))
from compare_content_units import count_words,WORD_COUNT_METHOD,KINDS
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent/'outputs/multiple/evaluation/full_stage1_batch'
def main():
 rows=[];quality=[];excluded=[];conditions={}
 for meta in json.loads((ROOT/'status.json').read_text(encoding='utf-8')):
  if not meta['success']:continue
  folder=Path(meta['output']);d=json.loads((folder/'stage1.json').read_text(encoding='utf-8'));m=json.loads((folder/'manifest.json').read_text(encoding='utf-8'));lang=m['payload']['response_language']
  promptlang=lang if meta['condition'].endswith('-native') else 'English'
  label=f'{promptlang} prompt / {lang} response';conditions[label]=label
  units=d['content_units'];verdicts=Counter(u['accuracy']['verdict'] for u in units);errors=[]
  for u in units:
   for e in u['accuracy']['errors']:errors.append(dict(content_unit_id=u['id'],content_unit_label=u['label'],**e,passage_ids=[f"excerpt {v['excerpt_index']+1}" for v in e['evidence']]))
  base=dict(topic=m['payload']['topic_name_en'],model=meta['model'],condition=label,condition_label=label,word_count=count_words(m['payload']['source']))
  q=dict(**base,relevance=d['topic_relevance']['topic_match'],reason=d['topic_relevance']['reason'],error_records=len(errors),minor=sum(e['severity']=='minor' for e in errors),major=sum(e['severity']=='major' for e in errors),erroneous_units=verdicts['contains_error'],assessed_units=verdicts['accurate']+verdicts['contains_error'],uncertain_units=verdicts['uncertain'],skipped_units=verdicts['not_assessed_due_to_topic_mismatch'],error_details=errors,report=(folder/'results.md').relative_to(ROOT).as_posix())
  quality.append(q)
  if q['relevance']!='on_topic':excluded.append(q);continue
  counts=Counter(u['kind'] for u in units)
  rows.append(dict(**base,total=len(units),**{k:counts[k] for k in KINDS},source=meta['source']))
 pair=defaultdict(set);allpair=defaultdict(set)
 for r in quality:allpair[r['topic']].add(r['model'])
 for r in rows:pair[(r['topic'],r['model'])].add(r['condition'])
 matched=[list(k) for k,v in pair.items() if v==set(conditions)]
 topics=[t for t,models in allpair.items() if all([t,m] in matched for m in models)]
 out=ROOT/'content_unit_comparison';out.mkdir(exist_ok=True)
 payload=dict(conditions=conditions,word_count_method=WORD_COUNT_METHOD,rows=rows,quality=quality,excluded=excluded,matched_pairs=matched,matched_topics=topics,categories=KINDS)
 (out/'comparison.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
 for name,data in [('responses',rows),('quality',quality)]:
  with (out/(name+'.csv')).open('w',encoding='utf-8-sig',newline='') as f:
   w=csv.DictWriter(f,fieldnames=list(data[0]));w.writeheader();w.writerows(data)
 lines=['# Current Stage 1 language comparison','','Uses only the expanded Stage 1 annotations; no legacy annotations. All results are model proposals. Stage 2 has not run.','',f'{len(quality)} responses: {len(rows)} on-topic, {sum(r["relevance"]=="off_topic" for r in quality)} off-topic, {sum(r["relevance"]=="partially_on_topic" for r in quality)} partially on-topic. Only individual strictly on-topic responses enter count and error comparisons. Unequal topic/model coverage can affect language means.','','[Interactive dashboard](comparison.html) | [Response CSV](responses.csv) | [Quality CSV](quality.csv)','','## By language and prompt condition','','| Condition | On-topic N | Mean units | Mean words | Off-topic / all | Partial / all | Responses with errors | Error records |','|---|---|---|---|---|---|---|---|']
 for c in sorted(conditions):
  rs=[r for r in rows if r['condition']==c];qs=[r for r in quality if r['condition']==c];on=[r for r in qs if r['relevance']=='on_topic']
  lines.append(f'| {c} | {len(rs)} | {mean(r["total"] for r in rs):.2f} | {mean(r["word_count"] for r in rs):.1f} | {sum(r["relevance"]=="off_topic" for r in qs)}/{len(qs)} | {sum(r["relevance"]=="partially_on_topic" for r in qs)}/{len(qs)} | {sum(r["error_records"]>0 for r in on)}/{len(on)} | {sum(r["error_records"] for r in on)} |')
 lines+=['','## Mean units by category','','| Condition | '+ ' | '.join(KINDS)+' |','|'+'---|'*(len(KINDS)+1)]
 for c in sorted(conditions):
  rs=[r for r in rows if r['condition']==c];lines.append('| '+c+' | '+' | '.join(f'{mean(r[k] for r in rs):.2f}' for k in KINDS)+' |')
 lines+=['','Word-count method: '+WORD_COUNT_METHOD,'',f'The optional balanced subset contains {len(matched)} topic/model combinations that are on-topic in all 11 conditions. The dashboard defaults to all on-topic responses. No significance tests have been rerun on this dataset.','']
 (out/'results.md').write_text('\n'.join(lines),encoding='utf-8')
 template=(HERE.parent/'content_comparison.html').read_text(encoding='utf-8')
 template=template.replace('Language-wise content-unit comparison','Current Stage 1: language comparison')
 template=re.sub(r'<p class="note">Statistical reports use pairwise.*?</p><p>.*?</p>','<p class="note">Current Stage 1 only. Statistical tests have not been rerun for these annotations.</p>',template)
 template=template.replace('<a href="../annotation.html">Open annotation reviewer</a>','<a href="../results.md">Open current evaluation reports</a>')
 template=template.replace('Off-topic explanations and reasons','Excluded explanations and reasons (off-topic or partial)')
 template=template.replace("base.filter(r=>r.relevance==='off_topic').map", "base.filter(r=>r.relevance!=='on_topic').map")
 template=template.replace("esc(r.reason)+' <a", "esc(r.relevance+': '+r.reason)+' <a")
 template=template.replace('No off-topic responses in this selection.','No excluded responses in this selection.')
 template=template.replace("'Off-topic','On-topic accuracy N'","'Off-topic','Partially on-topic','On-topic accuracy N'")
 template=template.replace("rate(all.filter(r=>r.relevance==='off_topic').length,all.length),acc.length", "rate(all.filter(r=>r.relevance==='off_topic').length,all.length),rate(all.filter(r=>r.relevance==='partially_on_topic').length,all.length),acc.length")
 template=template.replace('Passages: ', 'Source excerpts: ')
 embedded=json.dumps(payload,ensure_ascii=False).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
 (out/'comparison.html').write_text(template.replace('__DATA__',embedded),encoding='utf-8')
 print('\n'.join(lines[:22]))
if __name__=='__main__':main()
