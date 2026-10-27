import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createClient} from '@supabase/supabase-js';

const portal=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
for(const p of [path.join(portal,'.env.local'),path.join(portal,'../.env')])if(fs.existsSync(p))process.loadEnvFile(p);
const args=process.argv.slice(2),project=args[args.indexOf('--project')+1];
if(!args.includes('--project')||new URL(process.env.VITE_SUPABASE_URL).hostname!==project+'.supabase.co')throw Error('Provide --project matching VITE_SUPABASE_URL.');
const out=path.resolve(args.includes('--output')?args[args.indexOf('--output')+1]:path.join(portal,'../conversation-evaluation/outputs/feature-label-comparison',new Date().toISOString().slice(0,10)));
const rubric=JSON.parse(fs.readFileSync(path.join(portal,'src/generated/rubric.json'),'utf8'));
const languages=JSON.parse(fs.readFileSync(path.join(portal,'../agentic_conversation_capture/languages.json'),'utf8'));
const client=createClient(process.env.VITE_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});
async function read(table,columns){const rows=[];for(let start=0;;start+=200){const {data,error}=await client.from(table).select(columns).order('id').range(start,start+199);if(error)throw error;rows.push(...data);if(data.length<200)return rows;}}
const [documents,baselines]=await Promise.all([
 read('conversation_details','id,label,language,topic_id,generic_topic_name,source_conversation_id,created_at'),
 read('llm_baselines','id,conversation_id,annotations,model,rubric_hash,prompt_version,generation_config,created_at')
]);
const features=rubric.rubric,categories=[...new Set(features.map(f=>f.category))];
const snapshot=[],missing=[],rows=[];
for(const d of documents){
 const candidates=baselines.filter(b=>b.conversation_id===d.id&&b.model==='gemini-4-argon'&&b.rubric_hash===rubric.rubric_sha256&&b.generation_config?.input_mode==='turn-images/1').sort((a,b)=>b.created_at.localeCompare(a.created_at)||b.id.localeCompare(a.id));
 const b=candidates[0];if(!b){missing.push(d);continue;}
 const sections=b.generation_config.image_manifest?.flatMap(t=>t.sections)||[];
 if(!sections.length||new Set(sections.map(s=>s.section_id)).size!==sections.length)throw Error('Invalid section inventory: '+d.id);
 const seen=new Set();
 for(const a of b.annotations){const key=a.section_id+':'+a.feature;if(seen.has(key)||!features.some(f=>f.key===a.feature)||!sections.some(s=>s.section_id===a.section_id)||!Number.isInteger(a.entry?.count)||a.entry.count<=0)throw Error('Invalid label: '+d.id+'/'+key);seen.add(key);}
 snapshot.push({document:d,baseline:b});
 for(const f of features){const labels=b.annotations.filter(a=>a.feature===f.key),occurrences=labels.reduce((n,a)=>n+a.entry.count,0);
  rows.push({conversation_id:d.id,baseline_id:b.id,language:d.language,language_name:languages[d.language]?.name||d.language,topic_id:d.topic_id,topic:d.generic_topic_name,title:d.label,source_conversation_id:d.source_conversation_id,sections:sections.length,tutor_turns:b.generation_config.image_manifest.length,feature:f.key,feature_name:f.name,category:f.category,positive_labels:labels.length,occurrences,occurrences_per_100_sections:100*occurrences/sections.length,section_prevalence_pct:100*labels.length/sections.length});
 }
}
fs.mkdirSync(out,{recursive:true});
function csv(name,records){if(!records.length)return;const keys=Object.keys(records[0]),cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';fs.writeFileSync(path.join(out,name),[keys.map(cell).join(','),...records.map(r=>keys.map(k=>cell(r[k])).join(','))].join('\n')+'\n');}
const codes=Object.keys(languages).filter(l=>rows.some(r=>r.language===l));
const topics=[...new Set(rows.map(r=>r.topic_id))];
const sum=(rs,k)=>rs.reduce((n,r)=>n+r[k],0);
const average=xs=>xs.reduce((n,x)=>n+x,0)/xs.length;
const byFeature=[];
for(const language of codes)for(const f of features){const rs=rows.filter(r=>r.language===language&&r.feature===f.key),groups=topics.map(t=>rs.filter(r=>r.topic_id===t)).filter(g=>g.length);
 byFeature.push({language,language_name:languages[language].name,feature:f.key,feature_name:f.name,category:f.category,conversations:rs.length,topics:groups.length,sections:sum(rs,'sections'),positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),occurrences_per_conversation:sum(rs,'occurrences')/rs.length,occurrences_per_100_sections:100*sum(rs,'occurrences')/sum(rs,'sections'),section_prevalence_pct:100*sum(rs,'positive_labels')/sum(rs,'sections'),topic_balanced_occurrences_per_conversation:average(groups.map(g=>average(g.map(r=>r.occurrences)))),conversations_with_feature:rs.filter(r=>r.occurrences>0).length});
}
const byCategory=[];
for(const language of codes)for(const category of categories){const rs=byFeature.filter(r=>r.language===language&&r.category===category);byCategory.push({language,language_name:languages[language].name,category,positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),occurrences_per_conversation:sum(rs,'occurrences_per_conversation'),occurrences_per_100_sections:sum(rs,'occurrences_per_100_sections'),topic_balanced_occurrences_per_conversation:sum(rs,'topic_balanced_occurrences_per_conversation')});}
const summary=codes.map(language=>{const ds=snapshot.filter(s=>s.document.language===language),rs=byFeature.filter(r=>r.language===language);return {language,language_name:languages[language].name,conversations:ds.length,topics:new Set(ds.map(s=>s.document.topic_id)).size,sections:ds.reduce((n,s)=>n+s.baseline.generation_config.image_manifest.reduce((m,t)=>m+t.sections.length,0),0),positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),occurrences_per_conversation:sum(rs,'occurrences_per_conversation'),occurrences_per_100_sections:sum(rs,'occurrences_per_100_sections'),topic_balanced_occurrences_per_conversation:sum(rs,'topic_balanced_occurrences_per_conversation')};});
const topicFeature=[];
for(const language of codes)for(const topic_id of topics)for(const f of features){const rs=rows.filter(r=>r.language===language&&r.topic_id===topic_id&&r.feature===f.key);if(rs.length)topicFeature.push({language,topic_id,feature:f.key,conversations:rs.length,mean_occurrences:average(rs.map(r=>r.occurrences)),mean_section_prevalence_pct:average(rs.map(r=>r.section_prevalence_pct))});}
const featureTotals=features.map(f=>{const rs=byFeature.filter(r=>r.feature===f.key);return {feature:f.key,name:f.name,category:f.category,positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),conversations_with_feature:sum(rs,'conversations_with_feature')};});
const originalRows=rows.filter(r=>!r.source_conversation_id),originalFeatures=[];
for(const language of codes)for(const f of features){const rs=originalRows.filter(r=>r.language===language&&r.feature===f.key);
 if(rs.length!==topics.length||new Set(rs.map(r=>r.topic_id)).size!==topics.length)throw Error('Original-only comparison requires one conversation per language/topic: '+language);
 originalFeatures.push({language,language_name:languages[language].name,feature:f.key,feature_name:f.name,category:f.category,conversations:rs.length,sections:sum(rs,'sections'),positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),occurrences_per_conversation:sum(rs,'occurrences')/rs.length,occurrences_per_100_sections:100*sum(rs,'occurrences')/sum(rs,'sections'),section_prevalence_pct:100*sum(rs,'positive_labels')/sum(rs,'sections'),conversations_with_feature:rs.filter(r=>r.occurrences>0).length});
}
const originalCategories=codes.flatMap(language=>categories.map(category=>{const rs=originalFeatures.filter(r=>r.language===language&&r.category===category);return {language,language_name:languages[language].name,category,positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),occurrences_per_conversation:sum(rs,'occurrences_per_conversation'),occurrences_per_100_sections:sum(rs,'occurrences_per_100_sections')};}));
const originalSummary=codes.map(language=>{const rs=originalFeatures.filter(r=>r.language===language);return {language,language_name:languages[language].name,conversations:rs[0].conversations,sections:rs[0].sections,positive_labels:sum(rs,'positive_labels'),occurrences:sum(rs,'occurrences'),occurrences_per_conversation:sum(rs,'occurrences_per_conversation'),occurrences_per_100_sections:sum(rs,'occurrences_per_100_sections')};});
const metadata={project,extracted_at:new Date().toISOString(),rubric_hash:rubric.rubric_sha256,selection:'Latest saved Gemini Argon image-only baseline matching the current rubric per conversation; no model calls.',model_versions:[...new Set(snapshot.map(s=>s.baseline.model))],prompt_versions:[...new Set(snapshot.map(s=>s.baseline.prompt_version))],conversations:snapshot.length,missing,topics,categories,duplicate_language_topics:codes.flatMap(l=>topics.map(t=>({language:l,topic_id:t,conversation_ids:snapshot.filter(s=>s.document.language===l&&s.document.topic_id===t).map(s=>s.document.id)})).filter(g=>g.conversation_ids.length>1)),translated_conversations:snapshot.filter(s=>s.document.source_conversation_id).map(s=>s.document.id)};
csv('conversation-features.csv',rows);csv('language-features.csv',byFeature);csv('language-categories.csv',byCategory);csv('language-summary.csv',summary);csv('topic-language-features.csv',topicFeature);csv('feature-totals.csv',featureTotals);
csv('original-language-features.csv',originalFeatures);csv('original-language-categories.csv',originalCategories);csv('original-language-summary.csv',originalSummary);
fs.writeFileSync(path.join(out,'source-snapshot.json'),JSON.stringify({metadata,rubric,records:snapshot},null,2));
fs.writeFileSync(path.join(out,'comparison.json'),JSON.stringify({metadata,summary,byFeature,byCategory,featureTotals,topicFeature,originalFeatures,originalCategories,originalSummary},null,2));
console.log(JSON.stringify({output:out,metadata,summary,featureTotals},null,2));
