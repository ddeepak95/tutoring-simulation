import pg from '../annotation-portal/node_modules/pg/lib/index.js';
import {profile} from '../annotation-portal/scripts/supabase-sync-core.mjs';
import {loadSupabaseEnvironment} from '../annotation-portal/scripts/load-supabase-env.mjs';
import {loadEnvironment} from './config.mjs';

const id=process.argv[2];
if(!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/.test(id||''))throw Error('Pass one conversation UUID');
loadEnvironment();loadSupabaseEnvironment();
const config=profile(process.env,'local');
if(process.env.SUPABASE_TARGET!=='local'||!['127.0.0.1','localhost','[::1]'].includes(new URL(config.dbUrl).hostname))throw Error('Local database required');
const db=new pg.Client({connectionString:config.dbUrl});await db.connect();
try{
 const [conversation]=(await db.query('select id,label,language,transcript from public.conversations where id=$1',[id])).rows;
 const [version]=(await db.query('select version_key,section_mode,transcript from public.conversation_versions where conversation_id=$1 and version_key=$2',[id,'marker-free-v1'])).rows;
 const labels=(await db.query('select id,prompt_version,status,model,created_at from public.conversation_version_label_runs where conversation_id=$1 order by created_at desc',[id])).rows;
 const ratings=(await db.query('select id,prompt_version,status,model,created_at from public.conversation_version_rating_runs where conversation_id=$1 order by created_at desc',[id])).rows;
 console.log(JSON.stringify({conversation:conversation?{id:conversation.id,label:conversation.label,language:conversation.language,topic_id:conversation.transcript.topic_id,provider:conversation.transcript.provider,messages:conversation.transcript.messages?.length}:null,version:version?{key:version.version_key,section_mode:version.section_mode,messages:version.transcript.messages?.length,language:version.transcript.language||version.transcript.original_language}:null,labels,ratings},null,2));
}finally{await db.end();}
