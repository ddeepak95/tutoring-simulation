"""Read the archived 30-topic EN/TA cohort; no evaluator or database calls."""
import csv
import hashlib
import itertools
import json
import platform
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
ARCHIVE = ROOT / 'research-archive/oct-29'
OUT = ROOT / 'experiment-oct-29/run-01/reports/rating-v5/tamil-english-30-topics'


def jsonl(file):
    with file.open(encoding='utf-8') as stream:
        for line in stream:
            if line.strip():
                yield json.loads(line)


def holm(values):
    result = [0.] * len(values)
    previous = 0.
    for rank, i in enumerate(sorted(range(len(values)), key=values.__getitem__)):
        previous = max(previous, min(1., float(values[i]) * (len(values)-rank)))
        result[i] = previous
    return result


def seed(label):
    return int.from_bytes(hashlib.sha256(label.encode()).digest()[:8], 'little')


def paired_topic_tests(differences, draws=99999, label='paired'):
    """Swap complete language cells within topic; never match generation tries."""
    differences = np.asarray(differences, dtype=float)
    if differences.ndim != 2 or len(differences) < 2 or not np.isfinite(differences).all():
        raise ValueError('Expected a finite topic-by-feature difference matrix')
    n = len(differences)
    observed = differences.mean(axis=0)
    exceed = np.zeros(differences.shape[1], dtype=int)
    exact = n <= 12 and 2**n <= draws
    rng = np.random.default_rng(seed(label))
    count = 2**n if exact else draws
    for start in range(0, count, 1000):
        size = min(1000, count-start)
        signs = (2*((np.arange(start,start+size)[:,None] >> np.arange(n)) & 1)-1) if exact else rng.integers(0,2,size=(size,n))*2-1
        permuted = signs @ differences / n
        exceed += (np.abs(permuted) >= np.abs(observed)-1e-12).sum(axis=0)
    p = exceed/count if exact else (exceed+1)/(count+1)
    boot_rng = np.random.default_rng(seed(label+':bootstrap'))
    boot = differences[boot_rng.integers(0,n,size=(9999,n))].mean(axis=1)
    intervals = np.quantile(boot,[.025,.975],axis=0)
    return [dict(difference=float(observed[j]),p=float(p[j]),ci95=[float(intervals[0,j]),float(intervals[1,j])],permutations=count,exact=exact) for j in range(len(observed))]


def model_topic_tests(matrix, draws=99999, label='models'):
    """Shuffle model labels on five-try cell means within each matched topic."""
    matrix = np.asarray(matrix,dtype=float)
    if matrix.ndim != 3 or min(matrix.shape[:2]) < 2 or not np.isfinite(matrix).all():
        raise ValueError('Expected a finite topic-by-model-by-feature matrix')
    n,k,f = matrix.shape
    observed = ((matrix.mean(axis=0)-matrix.mean(axis=(0,1)))**2).sum(axis=0)
    rng = np.random.default_rng(seed(label))
    exceed = np.zeros(f,dtype=int)
    for start in range(0,draws,250):
        size = min(250,draws-start)
        order = np.argsort(rng.random((size,n,k)),axis=2)
        shuffled = matrix[np.arange(n)[None,:,None],order]
        means = shuffled.mean(axis=1)
        statistic = ((means-means.mean(axis=1,keepdims=True))**2).sum(axis=1)
        exceed += (statistic >= observed-1e-12).sum(axis=0)
    return [dict(statistic=float(observed[j]),p=float((exceed[j]+1)/(draws+1)),permutations=draws) for j in range(f)]


def summary(values):
    a = np.asarray(values,dtype=float)
    return dict(n=len(a),mean=float(a.mean()),sd=float(a.std(ddof=1)) if len(a)>1 else None,median=float(np.median(a)))


def write_csv(name,records):
    with (OUT/name).open('w',encoding='utf-8',newline='') as stream:
        writer=csv.DictWriter(stream,fieldnames=list(records[0]));writer.writeheader();writer.writerows(records)


def main():
    catalog_file=ROOT/'agentic_conversation_capture/topics_v2.json'
    catalog=json.loads(catalog_file.read_text(encoding='utf-8'))
    topics=sorted(x['topic-id'] for x in catalog)
    index=[x for x in jsonl(ARCHIVE/'index.jsonl') if x['topic_id'] in topics]
    ids={x['id'] for x in index};models=sorted({x['model'] for x in index})
    cells=Counter((x['topic_id'],x['model'],x['language']) for x in index)
    if len(topics)!=30 or len(models)!=9 or len(index)!=2700 or len(ids)!=2700 or len(cells)!=30*9*2 or set(cells.values())!={5} or {x['language'] for x in index}!={'en','ta'}:
        raise ValueError('Expected complete 30-topic, nine-model, two-language, five-try design')
    baselines={}
    for b in jsonl(ARCHIVE/'database/llm_baselines.jsonl'):
        if b['conversation_id'] not in ids or b['prompt_version']!='instructional-section-items/19':continue
        old=baselines.get(b['conversation_id'])
        if old and old['created_at']>=b['created_at']:continue
        counts={};quotes=[];seen=set()
        for a in b['annotations']:
            key=a['feature'];n=a['entry']['count'];pair=(a['section_id'],key)
            if type(n) is not int or n<0 or pair in seen or n!=len(a.get('highlights',[])):raise ValueError('Invalid saved annotation: '+b['conversation_id'])
            seen.add(pair);counts[key]=counts.get(key,0)+n
            quotes.extend(dict(feature=key,section_id=a['section_id'],quote=h['quote'],occurrence=h['occurrence']) for h in a['highlights'])
        baselines[b['conversation_id']]={k:b[k] for k in ['id','created_at','rubric_hash','prompt_sha256','model','prompt_version']}
        baselines[b['conversation_id']].update(counts=counts,quotes=quotes)
    if set(baselines)!=ids:raise ValueError('Missing archived v19 evaluations')
    for field in ['rubric_hash','prompt_sha256','model','prompt_version']:
        if len({b[field] for b in baselines.values()})!=1:raise ValueError('Mixed archived provenance: '+field)
    provenance=next(iter(baselines.values()))
    if provenance['model']!='google/gemini-4-argon':raise ValueError('Unexpected archived evaluator')
    rubrics=[r['snapshot'] for r in jsonl(ARCHIVE/'database/rubric_versions.jsonl') if r['hash']==provenance['rubric_hash']]
    if len(rubrics)!=1:raise ValueError('Missing pinned rubric')
    features=[dict(key=f['key'],label=f['name'],category=f['category']) for f in rubrics[0]['rubric']]
    keys=[f['key'] for f in features]
    if len(keys)!=24 or len(set(keys))!=24:raise ValueError('Expected 24 archived features')
    transcripts={r['id']:r['transcript'] for r in jsonl(ARCHIVE/'database/conversations.jsonl') if r['id'] in ids}
    sections={(s['conversation_id'],s['section_id']):s for s in jsonl(ARCHIVE/'database/conversation_sections.jsonl') if s['conversation_id'] in ids}
    records=[]
    for item in sorted(index,key=lambda x:(x['topic_id'],x['model'],x['language'],x['id'])):
        b=baselines[item['id']];transcript=transcripts[item['id']];turns=transcript['messages'];turn_map={t['turn_id']:t for t in turns}
        if len(turns)!=6 or sum(t['speaker']=='tutor' for t in turns)!=3 or set(b['counts'])-set(keys):raise ValueError('Invalid archived conversation')
        for q in b['quotes']:
            section=sections[(item['id'],q['section_id'])]
            if type(q['occurrence']) is not int or q['occurrence']<1 or not q['quote']:raise ValueError('Invalid exact-source highlight')
            start=-1
            for _ in range(q['occurrence']):
                start=section['quote'].find(q['quote'],start+1)
                if start<0:raise ValueError('Saved highlight is not in its section')
            q['turn_id']=section['turn_id']
            if q['quote'] not in turn_map[q['turn_id']]['text']:raise ValueError('Saved highlight is not in its tutor turn')
        records.append(dict(id=item['id'],topic=item['topic_id'],model=item['model'],language=item['language'],evaluation_id=b['id'],messages=turns,counts={k:b['counts'].get(k,0) for k in keys},excerpts=b['quotes']))
    tensor=np.zeros((30,9,2,24))
    for ti,topic in enumerate(topics):
        for mi,model in enumerate(models):
            for li,language in enumerate(['en','ta']):
                g=[r for r in records if (r['topic'],r['model'],r['language'])==(topic,model,language)]
                tensor[ti,mi,li]=np.array([[r['counts'][k] for k in keys] for r in g]).mean(axis=0)
    print(json.dumps(dict(event='validated',conversations=len(records),topics=len(topics),models=len(models),features=len(keys),exact_source_excerpts=sum(len(r['excerpts']) for r in records))),flush=True)
    by_model=[]
    for mi,model in enumerate(models):
        results=paired_topic_tests(tensor[:,mi,1]-tensor[:,mi,0],label='ta30:'+model)
        by_model.extend(dict(model=model,feature=key,**result) for key,result in zip(keys,results))
        print(json.dumps(dict(event='language_within_model',model=model)),flush=True)
    pooled=[dict(feature=key,**result) for key,result in zip(keys,paired_topic_tests((tensor[:,:,1]-tensor[:,:,0]).mean(axis=1),label='ta30:pooled'))]
    by_language=[]
    for li,language in enumerate(['en','ta']):
        results=model_topic_tests(tensor[:,:,li],label='ta30:models:'+language)
        by_language.extend(dict(language=language,feature=key,**result) for key,result in zip(keys,results))
        print(json.dumps(dict(event='models_within_language',language=language)),flush=True)
    for family in [pooled,by_model,by_language]:
        adjusted=holm([r['p'] for r in family])
        for r,p in zip(family,adjusted):r.update(holm_p=p,significant=p<.05,family_size=len(family))
    summaries=[]
    for model,language,key in itertools.product(models,['en','ta'],keys):
        values=[r['counts'][key] for r in records if r['model']==model and r['language']==language]
        summaries.append(dict(model=model,language=language,feature=key,**summary(values)))
    pooled_means={key:{language:summary([r['counts'][key] for r in records if r['language']==language]) for language in ['en','ta']} for key in keys}
    public_rows=[{k:v for k,v in r.items() if k not in ['messages','excerpts']} for r in records]
    fingerprint=hashlib.sha256(json.dumps(public_rows,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
    report=dict(format_version='tamil-english-30-topic-counts/1',created_at=datetime.now(timezone.utc).isoformat(),source='research-archive/oct-29',topics=topics,topic_names={x['topic-id']:x.get('topic-name',x['topic-id']) for x in catalog},models=models,languages=['en','ta'],features=features,conversations=len(records),tamil_conversations=1350,english_conversations=1350,tries_per_cell=5,source_sha256=fingerprint,provenance=dict(evaluator=provenance['model'],prompt_version=provenance['prompt_version'],prompt_sha256=provenance['prompt_sha256'],rubric_hash=provenance['rubric_hash'],topic_catalog='agentic_conversation_capture/topics_v2.json',catalog_sha256=hashlib.sha256(catalog_file.read_bytes()).hexdigest(),python=platform.python_version(),numpy=np.__version__),methods=dict(permutations=99999,unit='Five independent conversation tries averaged within each topic/model/language cell. Inference uses 30 matched topic blocks; generation attempts are not paired.',language='Two-sided absolute mean Tamil-minus-English difference; swap whole language cell means within topic. Pooled tests first average model differences equally within each topic.',model='Variance of model mean counts; independently permute whole model cell means within each topic. One overall test per feature and language; no model pairwise tests or formal interaction tests.',correction='Separate Holm families: 24 pooled language tests; 216 model-specific language tests; 48 language-specific overall model tests.',ci='95% percentile bootstrap intervals resample the 30 matched topic differences; 9,999 resamples. These are marginal intervals, not simultaneous intervals.',limits='Saved feature counts describe occurrence frequency, not pedagogical quality. No response-length adjustment. Inference assumes label exchangeability of topic-level cells under the null; these observational comparisons do not establish causal language or model effects. All topics come from the selected catalog; generalization beyond it requires caution. One archived automated judge. Zero counts mean the saved evaluator found no instance, not proof of absence.',references=['https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.permutation_test.html','https://www.ime.usp.br/~abe/lista/pdf4R8xPVzCnX.pdf']),pooled_language=pooled,languages_within_models=by_model,models_within_languages=by_language,summaries=summaries,pooled_means=pooled_means,topic_means=tensor.tolist())
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'analysis.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    (OUT/'conversations.json').write_text(json.dumps(records,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    write_csv('conversation-counts.csv',[dict(id=r['id'],topic=r['topic'],model=r['model'],language=r['language'],evaluation_id=r['evaluation_id'],**r['counts']) for r in records])
    write_csv('model-language-feature-counts.csv',summaries)
    write_csv('pooled-language-tests.csv',[{k:v for k,v in r.items() if k!='ci95'}|dict(ci95_low=r['ci95'][0],ci95_high=r['ci95'][1]) for r in pooled])
    write_csv('language-differences-within-models.csv',[{k:v for k,v in r.items() if k!='ci95'}|dict(ci95_low=r['ci95'][0],ci95_high=r['ci95'][1]) for r in by_model])
    write_csv('model-differences-within-languages.csv',by_language)
    print(json.dumps(dict(event='complete',output=str(OUT),conversations=len(records),tamil=1350,pooled_significant=sum(r['significant'] for r in pooled),model_specific_language_significant=sum(r['significant'] for r in by_model))),flush=True)


if __name__=='__main__':main()
