"""Compare expanded Stage 1 with legacy annotations of the same source responses."""
import json,csv,html,os
from pathlib import Path
from collections import Counter,defaultdict
from statistics import mean
ROOT=Path(__file__).resolve().parents[2]/'outputs/multiple'
KINDS=['CONCEPT','EXAMPLE','ANALOGY','PROCEDURE','STUDY_SUPPORT','CAVEAT','OTHER']
def main():
 out=ROOT/'evaluation/full_stage1_batch/comparison';out.mkdir(exist_ok=True)
 oldrows=json.loads((ROOT/'evaluation_batch_status.json').read_text(encoding='utf-8'))
 oldmap={str(Path(r['source']).resolve()).lower():r for r in oldrows if r['success']}
 newrows=json.loads((out.parent/'status.json').read_text(encoding='utf-8'));rows=[]
 for r in newrows:
  if not r['success']:continue
  old=oldmap[str(Path(r['source']).resolve()).lower()]
  a=json.loads((Path(old['output'])/'evaluation.json').read_text(encoding='utf-8'))['evaluation'];b=json.loads((Path(r['output'])/'stage1.json').read_text(encoding='utf-8'))
  ca=Counter(u['kind'] for u in a['content_units']);cb=Counter(u['kind'] for u in b['content_units'])
  row=dict(source=r['source'],topic=r['topic'],model=r['model'],condition=r['condition'],language=old['language'],old_relevance=a['topic_relevance']['topic_match'],new_relevance=b['topic_relevance']['topic_match'],old_units=len(a['content_units']),new_units=len(b['content_units']),old_errors=sum(len(u['accuracy']['errors']) for u in a['content_units']),new_errors=sum(len(u['accuracy']['errors']) for u in b['content_units']),old_categories=dict(ca),new_categories=dict(cb),new_ambiguities=len(b['ambiguities']),old_reason=a['topic_relevance']['reason'],new_reason=b['topic_relevance']['reason'],old_report=os.path.relpath(Path(old['output'])/'results.md',out).replace('\\','/'),new_report=os.path.relpath(Path(r['output'])/'results.md',out).replace('\\','/'))
  row['delta_units']=row['new_units']-row['old_units'];rows.append(row)
 assert len(rows)==385 and len({r['source'] for r in rows})==385
 common=[r for r in rows if r['old_relevance']==r['new_relevance']=='on_topic']
 summary=dict(responses=len(rows),old_relevance=dict(Counter(r['old_relevance'] for r in rows)),new_relevance=dict(Counter(r['new_relevance'] for r in rows)),relevance_changes=sum(r['old_relevance']!=r['new_relevance'] for r in rows),common_on_topic=len(common),old_mean_units=mean(r['old_units'] for r in common),new_mean_units=mean(r['new_units'] for r in common),fewer=sum(r['delta_units']<0 for r in common),same=sum(r['delta_units']==0 for r in common),more=sum(r['delta_units']>0 for r in common),old_errors_common=sum(r['old_errors'] for r in common),new_errors_common=sum(r['new_errors'] for r in common))
 payload=dict(summary=summary,rows=rows);(out/'comparison.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
 fields=[k for k in rows[0] if k not in ['old_categories','new_categories']]
 with (out/'responses.csv').open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows({k:r[k] for k in fields} for r in rows)
 lines=['# Expanded Stage 1 comparison','','Same 385 source responses; legacy annotations versus the expanded Stage 1 prompt. No explanations regenerated. Stage 2 has not reviewed the new annotations. These are annotation differences, not established improvements or changes in explanation quality.','','[Interactive tables and response links](comparison.html) | [Per-response CSV](responses.csv)','','## Overall','',f"Strictly on-topic in both versions: **{len(common)} responses**. This shared subset holds the source sample fixed for old/new unit and error comparisons.",'',f"Mean units: **{summary['old_mean_units']:.2f} -> {summary['new_mean_units']:.2f}**. Fewer units: {summary['fewer']}; unchanged count: {summary['same']}; more: {summary['more']}. Equal counts do not guarantee matching boundaries.",'',f"Proposed error records on the shared subset: **{summary['old_errors_common']} -> {summary['new_errors_common']}**. These are not matched error identities or a verified error-detection rate.",'',f"Topic-relevance decisions changed for **{summary['relevance_changes']}** responses. Old: {summary['old_relevance']}. New: {summary['new_relevance']}.",'','## New annotation: language-condition comparison','','Only individually on-topic responses are included. Conditions may have different topic/model coverage. `-english` means English prompt requesting the named language; `-native` means the prompt and response use that language. Counts reflect primary unit categories, not every embedded function.','','| Condition | All N | On-topic N | Off-topic | Partial | Mean units | '+ ' | '.join(KINDS)+' | Error records (on-topic) |','|'+'---|'*14]
 for c in sorted({r['condition'] for r in rows}):
  allr=[r for r in rows if r['condition']==c];rs=[r for r in allr if r['new_relevance']=='on_topic']
  vals=[c,len(allr),len(rs),sum(r['new_relevance']=='off_topic' for r in allr),sum(r['new_relevance']=='partially_on_topic' for r in allr),f'{mean(r["new_units"] for r in rs):.2f}' if rs else 'N/A']
  vals += [f'{mean(r["new_categories"].get(k,0) for r in rs):.2f}' if rs else 'N/A' for k in KINDS]+[sum(r['new_errors'] for r in rs)]
  lines.append('| '+' | '.join(map(str,vals))+' |')
 lines+=['','## Old versus new by condition: same on-topic responses','','| Condition | Paired N | Old mean units | New mean units | Mean change | Old error records | New error records |','|---|---|---|---|---|---|---|']
 for c in sorted({r['condition'] for r in common}):
  rs=[r for r in common if r['condition']==c]
  lines.append(f'| {c} | {len(rs)} | {mean(r["old_units"] for r in rs):.2f} | {mean(r["new_units"] for r in rs):.2f} | {mean(r["delta_units"] for r in rs):+.2f} | {sum(r["old_errors"] for r in rs)} | {sum(r["new_errors"] for r in rs)} |')
 lines+=['','## Category totals: shared on-topic subset','','| Kind | Old | New | Change |','|---|---|---|---|']
 for k in KINDS:
  a=sum(r['old_categories'].get(k,0) for r in common);b=sum(r['new_categories'].get(k,0) for r in common);lines.append(f'| {k} | {a} | {b} | {b-a:+} |')
 lines+=['','## Changed topic-relevance decisions','']
 for r in rows:
  if r['old_relevance']!=r['new_relevance']:lines += [f"- {r['topic']} / {r['condition']} / {r['model']}: **{r['old_relevance']} -> {r['new_relevance']}**. [Old]({r['old_report']}) / [New]({r['new_report']})",'  - Old reason: '+r['old_reason'],'  - New reason: '+r['new_reason']]
 lines+=['','## Interpretation limits','','The prompt, unit boundaries and evidence structure changed together. This is not an isolated experiment on the value of a review stage. Error records can increase because of stricter judgments, different grouping, or false positives. New ambiguities and unassigned text require review. No new significance tests were run. Word counts of the original responses are unchanged; a different relevance filter can change the included sample.','']
 (out/'results.md').write_text('\n'.join(lines),encoding='utf-8')
 from markdown_it import MarkdownIt
 body=MarkdownIt('commonmark',{'html':False}).enable('table').render('\n'.join(lines).replace('[Interactive tables and response links](comparison.html) | ',''))
 records=''
 for r in sorted(rows,key=lambda x:abs(x['delta_units']),reverse=True):
  records+=f'<tr><td>{html.escape(r["topic"])}</td><td>{html.escape(r["condition"])}</td><td>{html.escape(r["model"])}</td><td>{r["old_units"]}</td><td>{r["new_units"]}</td><td>{r["delta_units"]:+}</td><td>{r["old_errors"]} / {r["new_errors"]}</td><td>{html.escape(r["old_relevance"])} / {html.escape(r["new_relevance"])}</td><td><a href="{html.escape(r["old_report"],quote=True)}">Old</a> / <a href="{html.escape(r["new_report"],quote=True)}">New</a></td></tr>'
 page='<!doctype html><meta charset="utf-8"><title>Stage 1 comparison</title><style>body{font:15px/1.6 system-ui;max-width:1450px;margin:30px auto;padding:20px;color:#203047}table{border-collapse:collapse;width:100%;font-size:13px;display:block;overflow:auto}th,td{padding:8px;border-bottom:1px solid #ddd;text-align:left}th{background:#eef3f8}input{padding:10px;width:70%}a{color:#175a9b}</style>'+body+'<h2>All responses: largest unit-count changes first</h2><p>Includes off-topic responses; filter by topic, model or language condition.</p><input id="filter" aria-label="Filter response rows" placeholder="Filter responses"><table id="responses"><thead><tr><th>Topic</th><th>Condition</th><th>Model</th><th>Old units</th><th>New units</th><th>Change</th><th>Errors old/new</th><th>Relevance old/new</th><th>Reports</th></tr></thead><tbody>'+records+'</tbody></table><script>document.getElementById("filter").addEventListener("input",e=>{const q=e.target.value.toLowerCase();document.querySelectorAll("#responses tbody tr").forEach(r=>r.hidden=!r.textContent.toLowerCase().includes(q))});</script>'
 (out/'comparison.html').write_text(page,encoding='utf-8')
 print(json.dumps(summary,indent=2))
if __name__=='__main__':main()
