"""Prepare query-level data and analyze length, headings and Google result estimates."""
import argparse
import csv
import json
from pathlib import Path
from paths import EXPLANATION_ROOT
from urllib.parse import urlencode

import numpy as np

ROOT = EXPLANATION_ROOT / 'outputs/all-languages-comparison-six-topics'


def read(path):
    with path.open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def write(path, rows):
    if rows:
        with path.open('w', encoding='utf-8-sig', newline='') as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0]))
            w.writeheader()
            w.writerows(rows)


def ranks(values):
    a = np.asarray(values)
    return np.array([1 + np.sum(a < v) + (np.sum(a == v)-1)/2 for v in a], dtype=float)


def corr(x, y):
    return float(np.corrcoef(x, y)[0, 1]) if np.std(x) > 1e-10 and np.std(y) > 1e-10 else None


def design(rows, fields):
    cols = [np.ones(len(rows))]
    for field in fields:
        for value in sorted({r[field] for r in rows})[1:]:
            cols.append(np.array([r[field] == value for r in rows], dtype=float))
    return np.column_stack(cols)


def adjusted(x, y, rows, fields):
    d = design(rows, fields)
    return corr(x-d@np.linalg.lstsq(d, x, rcond=None)[0], y-d@np.linalg.lstsq(d, y, rcond=None)[0])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--output', type=Path, help='Separate output directory for a different search provider')
    args = parser.parse_args()
    root = args.root
    out = args.output or root / 'google-coverage'
    out.mkdir(exist_ok=True)
    responses = read(root / 'responses.csv')
    headings = {(r['condition'], r['topic']): r for r in read(root / 'heading-counts/counts.csv')}
    relevance = {(r['condition'], r['topic']): r for r in read(root / 'relevance-gemini/judgments.csv')}
    query_file = out / 'google_counts.csv'
    existing = {r['query_id']: r for r in read(query_file)} if query_file.exists() else {}
    queries, rows = {}, []
    import hashlib
    for r in responses:
        pair = r['condition'], r['matched_topic']
        if pair not in headings:
            continue
        # Literal topic phrase from the frozen run; no translation or query expansion.
        q = r['original_topic']
        settings = dict(q=q, hl='en', gl='us', pws='0')
        query_id = hashlib.sha256(json.dumps(settings, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:16]
        entry = dict(query_id=query_id, query=q, interface_language='en', country='us', results_language='unrestricted',
            search_url='https://www.google.com/search?' + urlencode(settings), result_count='', collected_at_utc='',
            provider='', status='not_collected', source_capture='', notes='')
        if query_id in existing:
            saved = existing[query_id]
            assert all(saved[k] == entry[k] for k in ['query', 'interface_language', 'country', 'results_language'])
            entry = saved
        queries[query_id] = entry
        h, j = headings[pair], relevance[pair]
        rows.append(dict(condition=r['condition'], language=r['language'], lang_id=r['lang_id'],
            prompt_condition='code_mixed' if r['condition'].startswith('Code-mixed') else 'native',
            topic=r['matched_topic'], query_id=query_id, query=q, words=int(r['answer_words']),
            content_headings=int(h['content_sections']), non_example_headings=int(h['non_example_content_headings']),
            intended_relevance=j['intended_topic_relevance'], google_results=entry['result_count']))
    assert len(rows) == 90
    write(query_file, list(queries.values()))
    write(out / 'matched_data.csv', rows)
    statistics = []
    for scope, subset in [('native', [r for r in rows if r['prompt_condition']=='native']),
                          ('code_mixed', [r for r in rows if r['prompt_condition']=='code_mixed'])]:
        for sensitivity, group in [('all', subset), ('relevant_only', [r for r in subset if r['intended_relevance']=='relevant'])]:
            x, y = ranks([r['words'] for r in group]), ranks([r['content_headings'] for r in group])
            statistics.append(dict(scope=scope, analysis=sensitivity, n=len(group), pair='words_vs_content_headings',
                spearman=corr(x,y), topic_adjusted_rank_correlation=adjusted(x,y,group,['topic']),
                topic_language_adjusted_rank_correlation=adjusted(x,y,group,['topic','lang_id'])))
            for key in ['words', 'content_headings']:
                available = [r for r in group if r['google_results'] != '']
                if len(available) >= 4:
                    counts = [int(r['google_results']) for r in available]
                    assert all(v >= 0 for v in counts)
                    x, y = ranks(counts), ranks([r[key] for r in available])
                    statistics.append(dict(scope=scope, analysis=sensitivity, n=len(available), pair='google_results_vs_'+key,
                        spearman=corr(x,y), topic_adjusted_rank_correlation=adjusted(x,y,available,['topic']),
                        topic_language_adjusted_rank_correlation=adjusted(x,y,available,['topic','lang_id'])))
    write(out / 'correlations.csv', statistics)
    sensitivity_rows, models = [], []
    native = [r for r in rows if r['prompt_condition']=='native']
    for topic in sorted({r['topic'] for r in rows}):
        group = [r for r in native if r['topic'] != topic]
        sensitivity_rows.append(dict(excluded_topic=topic, n=len(group), spearman=corr(ranks([r['words'] for r in group]), ranks([r['content_headings'] for r in group]))))
    write(out / 'leave_one_topic_out.csv', sensitivity_rows)
    for scope in ['native', 'code_mixed']:
        for sensitivity in ['all', 'relevant_only']:
            group = [r for r in rows if r['prompt_condition']==scope and r['google_results']!=''
                     and (sensitivity=='all' or r['intended_relevance']=='relevant')]
            if len(group) < 20:
                continue
            log_counts = np.log10(1+np.array([int(r['google_results']) for r in group]))
            for outcome, control_words in [('words',False),('content_headings',False),('content_headings',True)]:
                matrix = np.column_stack([design(group,['topic','lang_id']), log_counts])
                if control_words:
                    matrix = np.column_stack([matrix, [r['words'] for r in group]])
                y = np.array([r[outcome] for r in group])
                beta = np.linalg.lstsq(matrix,y,rcond=None)[0]
                index = -2 if control_words else -1
                full_rank = np.linalg.matrix_rank(matrix)==matrix.shape[1]
                models.append(dict(scope=scope, subset=sensitivity, outcome=outcome, controls='topic+language'+('+words' if control_words else ''), n=len(group),
                    google_log10_coefficient=float(beta[index]) if full_rank else '', design_full_rank=bool(full_rank)))
    write(out / 'adjusted_models.csv', models)
    google_sensitivity = []
    for topic in sorted({r['topic'] for r in native}):
        group = [r for r in native if r['topic']!=topic and r['google_results']!='']
        if len(group) >= 4:
            for outcome in ['words','content_headings']:
                google_sensitivity.append(dict(excluded_topic=topic, outcome=outcome, n=len(group),
                    spearman=corr(ranks([int(r['google_results']) for r in group]), ranks([r[outcome] for r in group]))))
    write(out / 'google_leave_one_topic_out.csv', google_sensitivity)
    lines = ['# Google availability, answer length and heading counts', '',
        f'Dataset: 48 native and 42 code-mixed answers across six shared topics. There are {len(queries)} distinct literal topic queries. Identical queries share a query_id and must not be counted as independent search measurements.', '',
        'Native prompts supply 48 unique queries. The 42 code-mixed answers reuse just six English topic queries: their Google-count variation is entirely between topics, so an additional Google effect controlling topic cannot be identified. Code-mixed pooled correlations are descriptive only, not evidence from 42 independent searches.', '',
        '## Available local results', '', '| Group | Subset | n | Spearman: words vs headings | Rank correlation controlling topic | Controlling topic and language |', '| --- | --- | ---: | ---: | ---: | ---: |']
    for s in statistics:
        if s['pair']=='words_vs_content_headings':
            lines.append(f"| {s['scope']} | {s['analysis']} | {s['n']} | {s['spearman']:.3f} | {s['topic_adjusted_rank_correlation']:.3f} | {s['topic_language_adjusted_rank_correlation']:.3f} |")
    collected = sum(q['result_count'] != '' for q in queries.values())
    providers = {q['provider'] for q in queries.values() if q['provider']}
    serpapi = providers == {'serpapi_google'} or out.name.endswith('serpapi')
    collection_notes = ('SerpAPI Google engine: google.com, US country and explicit United States location, English interface, desktop, no results-language restriction, no_cache=true. Personalization parameter pws is not supplied to this provider. Raw requests (excluding the key), responses and provider timestamps are saved in cache. Search URLs in the sheet are reference links for the literal query; the cache parameters are the authoritative actual request settings.' if serpapi else
        'Normal Chrome with the existing research profile: interface language en, country setting US, personalization parameter pws=0, and unrestricted results language. The session may be signed in; pws=0 does not guarantee absence of personalization. Saved browser pages document each measurement.')
    if providers == {'google_everyday_chrome_extension'}:
        collection_notes = 'User-supplied export from the extension in everyday Chrome, reported by the user as signed into Google. Account identity was not independently verified. Settings: hl=en, gl=us, pws=0, no results-language restriction. Visible estimate strings and query URLs are saved per query. Personalization, actual IP location and collection time can differ from SerpAPI; this is not a controlled experiment on login status.'
    audit = []
    browser_sheet = root / 'google-coverage/google_counts.csv'
    if serpapi and browser_sheet.exists():
        browser_counts = {r['query_id']:r for r in read(browser_sheet) if r['result_count']!=''}
        for q in queries.values():
            if q['result_count']!='' and q['query_id'] in browser_counts:
                previous = browser_counts[q['query_id']]
                audit.append(dict(query_id=q['query_id'], query=q['query'], browser_count=int(previous['result_count']),
                    serpapi_count=int(q['result_count']), browser_to_serpapi_ratio=(int(previous['result_count'])/int(q['result_count'])) if int(q['result_count']) else ''))
        write(out / 'provider_comparison.csv',audit)
    lines += ['', f'Google count collection: **{collected}/{len(queries)} unique queries**. Missing counts remain blank, never zero. Partial-data estimates are provisional until collection is complete.', '',
        '## Google result-count correlations', '', '| Group | Subset | n | Pair | Spearman | Controlling topic | Controlling topic and language |', '| --- | --- | ---: | --- | ---: | ---: | ---: |']
    for s in statistics:
        if s['pair'].startswith('google'):
            fmt=lambda v: 'NA' if v is None else f'{v:.3f}'
            lines.append(f"| {s['scope']} | {s['analysis']} | {s['n']} | {s['pair']} | {fmt(s['spearman'])} | {fmt(s['topic_adjusted_rank_correlation'])} | {fmt(s['topic_language_adjusted_rank_correlation'])} |")
    lines += ['', '## Adjusted exploratory models', '',
        'OLS models include topic and language indicators and log10(1 + Google estimate). The coefficient is the estimated outcome difference per roughly tenfold increase in the count, holding included covariates fixed; it is not a causal effect. Headings are discrete counts, so OLS is only a descriptive first pass. No p-values or population confidence intervals are claimed.', '',
        '| Group | Subset | Outcome | Controls | Google log-count coefficient |', '| --- | --- | --- | --- | ---: |']
    for m in models:
        b = 'not identifiable' if m['google_log10_coefficient']=='' else f"{m['google_log10_coefficient']:.3f}"
        lines.append(f"| {m['scope']} | {m['subset']} | {m['outcome']} | {m['controls']} | {b} |")
    lines += ['',
        '## Collection specification', '',
        'Use each original topic phrase literally, without quotation marks or translation. These settings do not establish the language of returned pages or eliminate all location effects. Record provider, timestamp and evidence for every count; use one provider/settings combination throughout. Do not substitute the number of returned links for the estimated total. Do not combine API estimates and Google website estimates as if interchangeable.', '',
        collection_notes, '',
        'SerpAPI field documentation: https://serpapi.com/search-api . The first query returned total_results=118 while normal Chrome displayed about 972000 for the same literal Coulomb query. Settings/sessions differ, so the discrepancy cannot be assigned to one cause. The API value was not independently verified as an estimate of all indexed pages. These correlations describe the returned field and should not support claims about online resource availability without further measurement validation.' if serpapi else 'Counts are approximate; no verification bypass or account rotation is used.', '',
        '## Interpretation', '',
        'Spearman uses average ranks for ties. Adjusted figures are Pearson correlations of ranked variables after removing categorical topic and language effects with least squares; they are descriptive partial rank correlations. No significance claims are made: six topics and shared topic/language structure limit inference. Leave-one-topic-out results are in the linked CSV.', '',
        'Content headings measure formatting, not validated distinct topic coverage. Words are whitespace-based and not language-neutral. Relevant-only sensitivity removes the native Bengali shielding answer. Today\'s Google counts would be a later availability proxy, not a record of search availability when the answers were generated or of model training exposure.', '',
        '[Matched answers](matched_data.csv) | [Search collection sheet](google_counts.csv) | [Correlations](correlations.csv) | [Leave-one-topic-out](leave_one_topic_out.csv) | [Google leave-one-topic-out](google_leave_one_topic_out.csv) | [Adjusted models](adjusted_models.csv)', '',
        '[Browser versus SerpAPI audit](provider_comparison.csv)' if audit else '', '',
        '![Words and headings](words_vs_headings.png)', '']
    (out / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig, axes = plt.subplots(2, 3, figsize=(12, 7), sharex=True, sharey=True)
    langs = sorted({r['language'] for r in native})
    for ax, topic in zip(axes.flat, sorted({r['topic'] for r in native})):
        for i, language in enumerate(langs):
            group = [r for r in native if r['topic']==topic and r['language']==language]
            ax.scatter([r['words'] for r in group], [r['content_headings'] for r in group], color=plt.get_cmap('tab10')(i), label=language)
        ax.set_title(topic.title(), fontsize=10)
        ax.grid(alpha=.2)
    fig.supxlabel('Counted words'); fig.supylabel('Content headings')
    handles, labels = axes.flat[0].get_legend_handles_labels()
    fig.legend(handles, labels, loc='upper center', ncol=8, frameon=False)
    fig.tight_layout(rect=[0,.02,1,.92])
    for ext in ['png', 'svg']:
        fig.savefig(out / ('words_vs_headings.'+ext), dpi=170)
    plt.close(fig)
    available = [r for r in native if r['google_results']!='']
    if available:
        for outcome in ['words', 'content_headings']:
            fig, axes = plt.subplots(2,3,figsize=(12,7),sharex=True,sharey=True)
            for ax, topic in zip(axes.flat, sorted({r['topic'] for r in native})):
                for i, language in enumerate(langs):
                    group=[r for r in available if r['topic']==topic and r['language']==language]
                    ax.scatter([np.log10(1+int(r['google_results'])) for r in group], [r[outcome] for r in group],
                        color=plt.get_cmap('tab10')(i),label=language)
                ax.set_title(topic.title(),fontsize=10); ax.grid(alpha=.2)
            fig.supxlabel('log10(1 + estimated Google results)'); fig.supylabel(outcome.replace('_',' ').title())
            handles,labels=axes.flat[0].get_legend_handles_labels()
            fig.legend(handles,labels,loc='upper center',ncol=8,frameon=False)
            fig.tight_layout(rect=[0,.02,1,.92])
            for ext in ['png','svg']:
                fig.savefig(out / ('google_vs_'+outcome+'.'+ext),dpi=170)
            plt.close(fig)
            lines += ['', f'![Google estimates versus {outcome}](google_vs_{outcome}.png)', '']
        (out / 'report.md').write_text('\n'.join(lines),encoding='utf-8')
    print('\n'.join(lines[:12]))
    print(f'Google counts available: {collected}/{len(queries)}')


if __name__ == '__main__':
    main()
