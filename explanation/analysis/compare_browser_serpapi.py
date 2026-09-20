"""Validate everyday Chrome export, analyze it separately, and compare providers."""
import argparse
import hashlib
import json
from pathlib import Path
from paths import EXPLANATION_ROOT
import re
import subprocess
import sys
from urllib.parse import parse_qs, urlparse

import numpy as np
from google_coverage_analysis import ROOT, read, write, ranks, corr


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--export', type=Path, default=EXPLANATION_ROOT/'google-browser-counts.json')
    parser.add_argument('--root', type=Path, default=ROOT)
    args = parser.parse_args()
    export = json.loads(args.export.read_text(encoding='utf-8-sig'))
    records = export['study']['records']
    api = args.root/'google-coverage-serpapi'
    expected = {r['query_id']:r for r in read(api/'google_counts.csv')}
    assert len(records)==len(expected)==48
    assert len({r['query_id'] for r in records})==48
    out = args.root/'google-coverage-everyday-browser'
    (out/'captures').mkdir(parents=True,exist_ok=True)
    sheet=[]
    for r in records:
        source=expected[r['query_id']]
        assert r['query']==r['query_displayed']==source['query']
        url=urlparse(r['url']); params=parse_qs(url.query)
        assert url.hostname=='www.google.com' and url.path=='/search'
        assert params['q']==[r['query']]
        assert all(params.get(k)==[v] for k,v in [('hl','en'),('gl','us'),('pws','0')])
        assert r['status']=='collected' and type(r['count']) is int and r['count']>=0
        values={int(m.group(1).replace(',','')) for text in r['estimates'] for m in re.finditer(r'([\d,]+)\s+results',text)}
        assert values=={r['count']}, 'Count differs from saved visible evidence'
        path=out/'captures'/(r['query_id']+'.json')
        path.write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8')
        entry=dict(source)
        entry.update(result_count=str(r['count']),provider='google_everyday_chrome_extension',
            status='collected',collected_at_utc=r['collected_at_utc'],source_capture='captures/'+path.name,
            notes='Visible browser estimate: '+'; '.join(r['estimates']))
        sheet.append(entry)
    write(out/'google_counts.csv',sheet)
    (out/'import_manifest.json').write_text(json.dumps(dict(source=str(args.export.resolve()),
        sha256=hashlib.sha256(args.export.read_bytes()).hexdigest(),exported_at_utc=export['exported_at_utc'],
        records=48,validation='IDs, queries, URLs, settings, count types and visible estimate strings checked'),indent=2),encoding='utf-8')
    subprocess.run([sys.executable,str(Path(__file__).with_name('google_coverage_analysis.py')),'--root',str(args.root),'--output',str(out)],check=True)
    joined={r['query_id']:r for r in read(out/'matched_data.csv') if r['prompt_condition']=='native'}
    comparison=[]
    for r in sheet:
        a=int(expected[r['query_id']]['result_count']); b=int(r['result_count']); meta=joined[r['query_id']]
        comparison.append(dict(query_id=r['query_id'],language=meta['language'],topic=meta['topic'],query=r['query'],
            browser_count=b,serpapi_count=a,browser_to_serpapi_ratio=b/a if a else '',
            log10_count_difference=float(np.log10(1+b)-np.log10(1+a)),
            browser_timestamp=r['collected_at_utc'],serpapi_timestamp=expected[r['query_id']]['collected_at_utc']))
    write(out/'provider_comparison.csv',comparison)
    browser=np.array([r['browser_count'] for r in comparison]); serp=np.array([r['serpapi_count'] for r in comparison])
    agreement=dict(n=48,exact_matches=int(sum(browser==serp)),browser_higher=int(sum(browser>serp)),browser_lower=int(sum(browser<serp)),
        spearman=corr(ranks(browser),ranks(serp)),median_browser_to_serpapi_ratio=float(np.median(browser/serp)),
        median_absolute_log10_difference=float(np.median(np.abs(np.log10(1+browser)-np.log10(1+serp)))))
    (out/'provider_agreement.json').write_text(json.dumps(agreement,indent=2),encoding='utf-8')
    metrics=[]
    for provider,folder in [('Everyday Chrome',out),('SerpAPI',api)]:
        for r in read(folder/'correlations.csv'):
            if r['scope']=='native':metrics.append(dict(provider=provider,**r))
    write(out/'correlation_comparison.csv',metrics)
    lines=['# Everyday Chrome versus SerpAPI', '',
        'All 48 exact topic queries were matched and verified against the browser export. These measurements cover eight native-language conditions across six topics.', '',
        f"Between-provider Spearman rank correlation: **{agreement['spearman']:.3f}**. Exact count matches: **{agreement['exact_matches']}/48**. Browser higher: {agreement['browser_higher']}; browser lower: {agreement['browser_lower']}.", '',
        f"Median browser/SerpAPI count ratio: **{agreement['median_browser_to_serpapi_ratio']:.2f}**. Counts are approximate and neither source is treated as ground truth.", '',
        '## Correlations with answer properties', '',
        '| Provider | Subset | n | Comparison | Spearman | Adjusted for topic | Adjusted for topic and language |',
        '| --- | --- | ---: | --- | ---: | ---: | ---: |']
    for r in metrics:
        if r['pair'].startswith('google'):
            lines.append('| '+ ' | '.join([r['provider'],r['analysis'],r['n'],r['pair'].replace('google_results_vs_','Search count vs '),
                *[f"{float(r[k]):.3f}" for k in ['spearman','topic_adjusted_rank_correlation','topic_language_adjusted_rank_correlation']]])+' |')
    lines+=['','Adjusted values are descriptive partial rank correlations, not causal effects or significance tests. Relevant-only excludes the native Bengali answer assigned to shielding that discusses conservation of charge.', '',
        '## Largest discrepancies', '', '| Language | Topic | Everyday Chrome | SerpAPI | Browser / API |', '| --- | --- | ---: | ---: | ---: |']
    for r in sorted(comparison,key=lambda x:abs(x['log10_count_difference']),reverse=True)[:10]:
        lines.append(f"| {r['language']} | {r['topic']} | {r['browser_count']:,} | {r['serpapi_count']:,} | {r['browser_to_serpapi_ratio']:,.2f} |")
    lines+=['','![Provider comparison](provider_comparison.png)','',
        'The browser was reported as logged into the user\'s everyday Google account. This comparison does not isolate a login effect: collection time, IP/location, request settings and search presentation also differ. Browser URLs use pws=0; SerpAPI does not. Both request an English interface and US country, without restricting result language. Large discrepancies mean the counts should not yet be interpreted as reliable measurements of language-specific resource availability.', '',
        'Content headings measure structure rather than verified topic coverage. Code-mixed prompts reuse six English queries, so their Google-count effect cannot be separated from topic effects.', '',
        '[Browser analysis and topic plots](report.md) | [All 48 paired counts](provider_comparison.csv) | [Correlation comparison](correlation_comparison.csv) | [Source validation](import_manifest.json)', '']
    (out/'comparison.md').write_text('\n'.join(lines),encoding='utf-8')
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig,ax=plt.subplots(figsize=(8,6))
    for i,lang in enumerate(sorted({r['language'] for r in comparison})):
        group=[r for r in comparison if r['language']==lang]
        ax.scatter(np.log10(1+np.array([r['serpapi_count'] for r in group])),np.log10(1+np.array([r['browser_count'] for r in group])),label=lang)
    limit=float(max(np.log10(1+browser).max(),np.log10(1+serp).max()))+.25
    ax.plot([0,limit],[0,limit],linestyle='--',color='gray',label='Equal counts')
    ax.set(xlim=(0,limit),ylim=(0,limit),xlabel='log10(1 + SerpAPI count)',ylabel='log10(1 + everyday Chrome count)',title='Same 48 queries: everyday Chrome versus SerpAPI')
    ax.grid(alpha=.2);ax.legend(fontsize=8);fig.tight_layout()
    for ext in ['png','svg','pdf']:fig.savefig(out/f'provider_comparison.{ext}',dpi=170)
    plt.close(fig)
    print(json.dumps(agreement,indent=2))


if __name__=='__main__':main()
