"""Exploratory paired content-unit-count comparisons using pairwise on-topic matching."""
import json
from collections import defaultdict
from math import comb
from pathlib import Path
from statistics import mean, median

ROOT=Path(__file__).resolve().parent.parent/'outputs/multiple/content_unit_comparison'

from word_count_statistics import sign_test, holm

def main():
    d=json.loads((ROOT/'comparison.json').read_text(encoding='utf-8'))
    candidates=sorted({(r['topic'],r['model']) for r in d['rows']})
    lookup={(r['topic'],r['model'],r['condition']):r['total'] for r in d['rows']}
    results=[]
    for language in ['Arabic','Bengali','French','Hindi','Tamil']:
        english=f'English prompt / {language} response'
        for label,a,b in [
            (language+' vs English (English prompts)',english,'English prompt / English response'),
            (language+': native vs English prompt',f'{language} prompt / {language} response',english)]:
            pairs=[pair for pair in candidates if (*pair,a) in lookup and (*pair,b) in lookup]
            if not pairs: raise ValueError('No on-topic pairs for '+label)
            differences=[lookup[(*pair,a)]-lookup[(*pair,b)] for pair in pairs]
            by_topic=defaultdict(list)
            for pair,delta in zip(pairs,differences):by_topic[pair[0]].append(delta)
            topic_means={t:mean(v) for t,v in by_topic.items()}
            results.append(dict(comparison=label,matched_pairs=pairs,pair_count=len(pairs),topic_count=len(topic_means),condition_a=a,condition_b=b,mean_delta_units=mean(differences),median_delta_units=median(differences),pair_sign_test=sign_test(differences),topic_sign_test=sign_test(list(topic_means.values())),topic_mean_deltas=topic_means))
    for field in ['pair_sign_test','topic_sign_test']:holm(results,field)
    payload=dict(matching='pairwise_on_topic',alpha=.05,results=results)
    (ROOT/'content_unit_statistics.json').write_text(json.dumps(payload,indent=2),encoding='utf-8')
    lines=['# Exploratory content-unit-count significance tests','','Pairwise on-topic matching: include a topic/model pair whenever both compared responses are on-topic, regardless of other conditions. Sample size varies by comparison. Seven topics and five fixed models are available. Ten contrasts: five target languages versus English with English prompts held fixed, and five native versus English prompts within the same response language. Positive differences mean condition A has more content units. These are not all 55 possible comparisons.','',
    'Two-sided exact paired sign tests test direction of differences (zero differences excluded); Holm adjustment controls multiplicity across the ten contrasts at alpha = 0.05, separately for each analysis. The pair-level analysis assumes independent topic/model pairs, which is questionable because topics and models recur. The topic-level sensitivity analysis first averages paired differences within each topic, then tests the seven topic-level differences, treating the five models as fixed. It avoids counting models within a topic as independent replications; topics still need to be regarded as independent for inference.','',
    'With seven topics, the smallest possible two-sided exact sign-test p is 0.015625; no contrast can survive Holm across ten tests at 0.05. Thus this sensitivity analysis has very limited power. Lack of significance does not demonstrate equality. The sign test ignores magnitude. These are exploratory, selected on-topic comparisons with one generation per cell, not evidence about all topics/models or explanation quality. Counts depend on LLM-proposed unit boundaries and labels; annotation reliability has not been established. More units do not necessarily imply better explanations.','',
    '| Comparison (A minus B) | Pairs | Non-tied pairs | Topics | Mean difference (units) | Median difference | Pair p | Pair Holm p | Topic p | Topic Holm p |','|---|---|---|---|---|---|---|---|---|---|']
    for r in results:
        lines.append(f"| {r['comparison']} | {r['pair_count']} | {r['pair_sign_test']['n']} | {r['topic_count']} | {r['mean_delta_units']:.1f} | {r['median_delta_units']:.1f} | {r['pair_sign_test']['p']:.6g} | {r['pair_sign_test']['p_holm']:.6g} | {r['topic_sign_test']['p']:.6g} | {r['topic_sign_test']['p_holm']:.6g} |")
    lines+=['','Method reference: [NIST paired sign test](https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/signtest.htm).','']
    (ROOT/'content_unit_statistics.md').write_text('\n'.join(lines),encoding='utf-8')
    print('\n'.join(lines[6:]))

if __name__=='__main__':main()
