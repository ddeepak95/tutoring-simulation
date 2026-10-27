/** HTML capture v2 deliberately has no text spans or transcript. */
export interface HtmlState {state_id:string;html:string;sha256:string;image_ids?:string[]}
export interface HtmlComponent {
  component_id:string;initial_state:string;states:HtmlState[];
  transitions:{from:string;control_id:string;to:string}[];
  coverage:{status:'complete'|'incomplete';expected:number|null;captured:number;notes:string};
}
export interface HtmlSection {section_id:string;turn_number:number;section_number:number;heading:string|null;html:string;components:HtmlComponent[]}
export interface HtmlTurn {turn_id:string;speaker:'student'|'tutor';html:string;sections:HtmlSection[];content_attributes?:Record<string,string>;speaker_label?:string}
export interface HtmlConversation {
  format_version:'html-conversation/2';capture_id:string;captured_at:string;version_hash:string;
  status:'complete'|'draft';metadata:{title:string;topic:string;language:string;topic_id:string|null;provider:string;access_type:string;source_url:string};
  source_version:{capture_id:string;version_hash:string;language:string}|null;
  translation_info?:{model:string;prompt_version:string;usage:Record<string,number>};
  styles:string;turns:HtmlTurn[];
  capture_scope?:{version:'image-focused/1';images:'all-discoverable';text_interactions:'initial-only'};
  svg_sprites?:Record<string,string>;
  presentation?:{font_family:string;font_size:string;line_height:string;variables:Record<string,string>};
  image_inventory?:{sha256:string;turn_id:string;section_id?:string;occurrence_id?:string;alt:string;source:'inline'|'gallery';gallery_id?:string;position?:number}[];
  assets:{sha256:string;mime:string;bytes:number;file:string}[];
}
export function htmlSections(pkg:HtmlConversation) {return pkg.turns.flatMap(t=>t.sections.map(s=>({...s,turn_id:t.turn_id})));}
export function htmlStructure(pkg:HtmlConversation) {
  return pkg.turns.map(t=>({turn_id:t.turn_id,speaker:t.speaker,sections:t.sections.map(s=>({section_id:s.section_id,
    turn_number:s.turn_number,section_number:s.section_number,components:s.components.map(c=>({component_id:c.component_id,
      initial_state:c.initial_state,states:c.states.map(s=>s.state_id),transitions:c.transitions,coverage:c.coverage}))}))}));
}
export function validateHtmlConversation(pkg:HtmlConversation,{allowDraft=false,source}:{allowDraft?:boolean;source?:HtmlConversation}={}) {
  const fail=(s:string):never=>{throw Error(`Invalid HTML capture: ${s}`);};
  if(pkg?.format_version!=='html-conversation/2'||!pkg.capture_id||!/^\w[\w-]*$/.test(pkg.capture_id)||!/^\d{4}-/.test(pkg.captured_at)||!pkg.metadata?.title?.trim()||!pkg.metadata.language||!Array.isArray(pkg.turns)||!pkg.turns.length||!Array.isArray(pkg.assets))fail('missing package metadata.');
  if(!['draft','complete'].includes(pkg.status)||(!allowDraft&&pkg.status!=='complete'))fail('exploration is incomplete; resume the draft.');
  const ids=new Set<string>();const unique=(id:string)=>{if(!id||ids.has(id))fail('duplicate or missing ID.');ids.add(id);};
  let number=0;
  for(const t of pkg.turns){unique(t.turn_id);if(!['tutor','student'].includes(t.speaker)||typeof t.html!=='string'||!Array.isArray(t.sections))fail('invalid turn.');
    if(t.speaker==='student'){if(t.sections.length||!t.html.trim())fail('invalid student content.');continue;}
    number++;if(!t.sections.length)fail('tutor turn has no sections.');
    for(const [i,s] of t.sections.entries()){
      if(s.section_id!==`t${number}s${i+1}`||s.turn_number!==number||s.section_number!==i+1||!s.html?.trim()||!Array.isArray(s.components))fail('section order or HTML.');unique(s.section_id);
      for(const [j,c] of s.components.entries()){
        if(c.component_id!==`${s.section_id}c${j+1}`||!c.states?.length||!Array.isArray(c.transitions)||!c.coverage)fail('component metadata.');unique(c.component_id);
        const states=new Set(c.states.map(v=>v.state_id));
        for(const [k,v] of c.states.entries()){if(v.state_id!==`${c.component_id}v${k+1}`||!v.html?.trim()||!/^[a-f0-9]{64}$/.test(v.sha256))fail('component state.');unique(v.state_id);}
        if(!states.has(c.initial_state)||c.coverage.captured!==c.states.length||!['complete','incomplete'].includes(c.coverage.status)||(!allowDraft&&c.coverage.status!=='complete')||(c.coverage.expected!==null&&(!Number.isInteger(c.coverage.expected)||c.coverage.expected<1)))fail('component coverage.');
        const edges=new Set<string>();for(const e of c.transitions){const key=`${e.from}:${e.control_id}`;if(!states.has(e.from)||!states.has(e.to)||!e.control_id||edges.has(key))fail('ambiguous transition.');edges.add(key);}
      }
    }
  }
  const assets=new Set<string>();for(const a of pkg.assets){if(!/^[a-f0-9]{64}$/.test(a.sha256)||assets.has(a.sha256)||!a.mime?.startsWith('image/')||!Number.isInteger(a.bytes)||a.bytes<1||!a.file)fail('asset manifest.');assets.add(a.sha256);}
  if(pkg.capture_scope){
    if(pkg.capture_scope.version!=='image-focused/1'||pkg.capture_scope.images!=='all-discoverable'||pkg.capture_scope.text_interactions!=='initial-only'||!Array.isArray(pkg.image_inventory))fail('capture scope.');
    const occurrences=new Map<string,string>();for(const image of pkg.image_inventory||[]){if(!image.occurrence_id||!image.section_id||occurrences.has(image.occurrence_id))fail('image occurrence identity.');occurrences.set(image.occurrence_id!,image.section_id!);}
    for(const t of pkg.turns)for(const s of t.sections)for(const c of s.components)for(const v of c.states)if(v.image_ids?.some(id=>occurrences.get(id)!==s.section_id))fail('supporting image ownership.');
  }
  if(pkg.image_inventory){if(!Array.isArray(pkg.image_inventory))fail('image inventory.');for(const image of pkg.image_inventory){const turn=pkg.turns.find(t=>t.turn_id===image.turn_id);if(!assets.has(image.sha256)||!turn||!['inline','gallery'].includes(image.source)||typeof image.alt!=='string'||(image.section_id&&!turn.sections.some(s=>s.section_id===image.section_id))||(image.position!==undefined&&(!Number.isInteger(image.position)||image.position<1)))fail('image inventory reference.');}}
  if(source){if(pkg.source_version?.capture_id!==source.capture_id||pkg.source_version?.version_hash!==source.version_hash||JSON.stringify(htmlStructure(pkg))!==JSON.stringify(htmlStructure(source)))fail('translation is not structurally equivalent to its source.');}
  return pkg;
}
