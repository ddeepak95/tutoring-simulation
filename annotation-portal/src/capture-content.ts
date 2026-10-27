import type {SupabaseClient} from '@supabase/supabase-js';
import type {Conversation,DocumentRow} from './types';
import {validateHtmlConversation,type HtmlConversation} from './html-conversation.ts';

export interface CaptureReference {bucket:'conversation-packages';path:string;sha256:string;bytes:number;version_hash:string;capture_id:string}
const caches=new WeakMap<SupabaseClient,Map<string,Promise<HtmlConversation>>>();

/** Detail views load immutable packages; listings retain only the database index. */
export async function resolveCaptureContent(client:SupabaseClient,conversation:Conversation):Promise<Conversation>{
 const ref=conversation.html_content_ref;if(!ref)return conversation;
 if(ref.bucket!=='conversation-packages'||!/^packages\/[a-f0-9-]+\/[a-f0-9]{64}\.json$/.test(ref.path)||!Number.isInteger(ref.bytes)||ref.bytes<1||ref.bytes>20971520||!/^[a-f0-9]{64}$/.test(ref.sha256))throw Error('Invalid capture storage reference.');
 const session=await client.auth.getSession();
 const key=`${session.data.session?.user.id||'server'}:${ref.path}:${ref.sha256}`;
 let cache=caches.get(client);if(!cache){cache=new Map();caches.set(client,cache);}
 let pending=cache.get(key);
 if(!pending){
  pending=(async()=>{
   const {data,error}=await client.storage.from(ref.bucket).download(ref.path);if(error||!data)throw Error('Could not load the saved conversation package.');
   const bytes=await data.arrayBuffer();if(bytes.byteLength!==ref.bytes)throw Error('Conversation package size does not match its reference.');
   const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(b=>b.toString(16).padStart(2,'0')).join('');
   if(digest!==ref.sha256)throw Error('Conversation package hash does not match its reference.');
   const pkg=JSON.parse(new TextDecoder().decode(bytes));validateHtmlConversation(pkg);
   if(pkg.capture_id!==ref.capture_id||pkg.version_hash!==ref.version_hash)throw Error('Conversation package version does not match its reference.');
   return pkg as HtmlConversation;
  })();
  cache.set(key,pending);if(cache.size>5)cache.delete(cache.keys().next().value!);
  pending.catch(()=>{if(cache?.get(key)===pending)cache.delete(key);});
 }
 const {html_content_ref:_reference,...content}=conversation;
 return {...content,html_content:await pending};
}
export async function resolveCaptureDocument(client:SupabaseClient,document:DocumentRow){return {...document,transcript:await resolveCaptureContent(client,document.transcript)};}
