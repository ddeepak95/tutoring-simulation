import {createRequire} from 'node:module';
import {createHash,randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {validateHtmlConversation,htmlStructure} from '../annotation-portal/src/html-conversation.ts';
const require=createRequire(new URL('../annotation-portal/package.json',import.meta.url));
let bundle;
export const hash=value=>createHash('sha256').update(value).digest('hex');
export function canonicalJSON(value){return value===null||typeof value!=='object'?JSON.stringify(value):Array.isArray(value)?'['+value.map(v=>canonicalJSON(v)??'null').join(',')+']':'{'+Object.keys(value).filter(k=>value[k]!==undefined).sort().map(k=>JSON.stringify(k)+':'+canonicalJSON(value[k])).join(',')+'}';}
export function packageHash(pkg){const {version_hash:_hash,...content}=pkg;return hash(canonicalJSON(content));}
export function browserBundle(){return bundle??=require('esbuild').build({entryPoints:[fileURLToPath(new URL('./html-sections.browser.ts',import.meta.url))],bundle:true,write:false,format:'iife',globalName:'CaptureSections',platform:'browser'}).then(r=>r.outputFiles[0].text);}
export async function withCaptureDOM(action){const {chromium}=require('playwright');const browser=await chromium.launch({headless:true});try{const page=await browser.newPage();await page.addScriptTag({content:await browserBundle()});return await action(page);}finally{await browser.close();}}
export async function buildHtmlPackage({metadata,turns,session,styles='',assets=[],presentation,image_inventory,captured_at=new Date().toISOString()}) {
  return withCaptureDOM(async page=>{
    const output=[];let tutor=0,complete=!session?.stopReason;
    for(const turn of turns){
      if(turn.speaker==='student'){output.push({turn_id:turn.turn_id,speaker:turn.speaker,html:turn.html,sections:[]});continue;}
      const message=session?.messages[tutor++];if(!message)throw Error('HTML capture requires the agent state graph.');
      const initial=message.states.find(s=>s.id===message.initial);
      if(!initial?.section_layout)throw Error('Initial section IDs must be assigned before interactive exploration. Recapture this conversation.');
      const sections=[];
      for(const source of initial.section_layout.sections){
        const components=[];
        for(const [i,anchor] of source.anchors.entries()){
          const component_id=`${source.section_id}c${i+1}`,states=[],stateMap=new Map(),questionViews=new Map();
          const initialControls=initial.controls.filter(c=>c.component_anchor===anchor);
          const imageOnly=initialControls.length>0&&initialControls.every(c=>c.tag==='a'||/^(?:Open\b|Add to Favorites\b|Source\b)/i.test(c.label));
          const related=message.transitions.filter(edge=>message.states.find(s=>s.id===edge.from)?.controls[edge.control]?.component_anchor===anchor);
          const included=new Set([initial.id,...(imageOnly?[]:related.flatMap(edge=>[edge.from,edge.to]))]);
          const initialHtml=await page.evaluate(({html,anchor})=>globalThis.CaptureSections.extractComponent(html,anchor),{html:initial.html,anchor});
          const quiz=(await page.evaluate(html=>globalThis.CaptureSections.questionView(html),initialHtml)).quiz;
          for(const state of message.states.filter(s=>included.has(s.id))){
            // Keep question/option views. Selected-answer and grading outcomes
            // remain diagnostic capture history, not exported component views.
            if(quiz&&state.id!==initial.id&&state.controls.some(c=>c.component_anchor===anchor&&c.checked))continue;
            if(state.section_layout?.boundary_count!==initial.section_layout.boundary_count)throw Error('Original section boundaries disappeared during exploration.');
            const html=await page.evaluate(({html,anchor})=>globalThis.CaptureSections.extractComponent(html,anchor),{html:state.html,anchor});
            if(quiz&&state.id!==initial.id&&(await page.evaluate(html=>globalThis.CaptureSections.questionView(html),html)).feedback)continue;
            const sha256=hash(html);let existing=states.find(s=>s.sha256===sha256);
            if(!existing){existing={state_id:`${component_id}v${states.length+1}`,html,sha256};states.push(existing);}stateMap.set(state.id,existing.state_id);
            if(quiz)questionViews.set(existing.state_id,await page.evaluate(html=>globalThis.CaptureSections.questionView(html),html));
          }
          const transitions=[];
          for(const edge of message.transitions){
            const from=message.states.find(s=>s.id===edge.from),control=from.controls[edge.control];if(control?.component_anchor!==anchor)continue;
            const e={from:stateMap.get(edge.from),control_id:String(edge.control),to:stateMap.get(edge.to)};
            if(!e.from||!e.to)continue;
            const previous=transitions.find(p=>p.from===e.from&&p.control_id===e.control_id);
            if(previous&&previous.to!==e.to)throw Error('Ambiguous component replay transition.');if(!previous)transitions.push(e);
          }
          if(quiz)for(const [from,view] of questionViews){
            if(!view.position)continue;
            for(const navigation of view.navigation){const target=[...questionViews].find(([,other])=>other.position===view.position+navigation.direction);if(!target)continue;
              if(!transitions.some(e=>e.from===from&&e.control_id===navigation.control_id))transitions.push({from,control_id:navigation.control_id,to:target[0]});
            }
          }
          for(const gallery of session.media_galleries?.filter(g=>g.section_id===source.section_id&&g.anchor===anchor)||[]){
            const mapped=[];for(const view of gallery.views){const html=gallery.kind==='reveal'?view.html:await page.evaluate(view=>globalThis.CaptureSections.galleryReplayHtml(view),view);const state={state_id:`${component_id}v${states.length+1}`,html,sha256:hash(html),image_ids:view.image_ids};states.push(state);mapped.push(state.state_id);}
            for(const [j,view] of gallery.views.entries()){
              for(const control of view.controls){const target=control.action==='close'?stateMap.get(initial.id):control.action==='next'?mapped[j+1]||((gallery.terminal==='full cycle')?mapped[0]:null):control.action==='previous'?mapped[j-1]||((gallery.terminal==='full cycle')?mapped.at(-1):null):control.action==='position'?mapped[gallery.views.findIndex(v=>v.position===control.position)]:null;
                if(target)transitions.push({from:mapped[j],control_id:control.id,to:target});}
            }
            const candidates=session.media_candidates||[];
            for(const candidate of candidates.filter(c=>gallery.candidates.includes(c.candidate_id))){const control=initialControls.find(c=>c.label===candidate.label);if(!control)throw Error('Gallery opener no longer matches its frozen control.');const j=gallery.views.findIndex(v=>v.image_ids.some(id=>candidate.image_ids.includes(id)));if(j<0)throw Error('Gallery image opener has no captured view.');transitions.push({from:stateMap.get(initial.id),control_id:String(control.index),to:mapped[j]});if(gallery.kind==='reveal')transitions.push({from:mapped[j],control_id:String(control.index),to:stateMap.get(initial.id)});}
          }
          const coverage=message.coverage?.[anchor]||{status:'incomplete',expected:null,notes:'Capture coverage has not been verified.'};
          if(coverage.status!=='complete')complete=false;
          components.push({component_id,initial_state:stateMap.get(initial.id),states,transitions,coverage:{...coverage,captured:states.length}});
        }
        sections.push({section_id:source.section_id,turn_number:source.turn_number,section_number:source.section_number,heading:source.heading,html:source.html,components});
      }
      output.push({turn_id:turn.turn_id,speaker:'tutor',html:'',sections,content_attributes:initial.section_layout.content_attributes||{}});
    }
    const pkg={format_version:'html-conversation/2',capture_id:randomUUID(),captured_at,version_hash:'',status:complete?'complete':'draft',metadata,source_version:null,styles,turns:output,assets,...(session.capture_scope?{capture_scope:session.capture_scope}:{}),...(presentation?{presentation}:{}),...(image_inventory?{image_inventory}:{})};
    const sprites=await page.evaluate(turns=>{const paths=new Set();for(const t of turns)for(const html of [t.html,...t.sections.flatMap(s=>[s.html,...s.components.flatMap(c=>c.states.map(v=>v.html))])]){const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('use').forEach(use=>{const href=use.getAttribute('href')||use.getAttribute('xlink:href')||'';if(/^\/cdn\/assets\/[A-Za-z0-9_.-]+\.svg#/.test(href))paths.add(href.split('#')[0]);});}return [...paths];},output);
    if(sprites.length){pkg.svg_sprites={};for(const sprite of sprites){const response=await fetch('https://chatgpt.com'+sprite,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`ChatGPT icon sprite could not be captured (HTTP ${response.status}).`);const svg=await response.text();if(!svg.includes('<svg'))throw Error('ChatGPT returned an invalid icon sprite.');pkg.svg_sprites[sprite]=svg;}}
    pkg.version_hash=packageHash(pkg);validateHtmlConversation(pkg,{allowDraft:true});return pkg;
  });
}
export async function verifyPackage(pkg,{source,assetReader}={}){
  validateHtmlConversation(pkg,{source});if(packageHash(pkg)!==pkg.version_hash)throw Error('HTML package content hash does not match.');
  for(const turn of pkg.turns)for(const s of turn.sections)for(const c of s.components)for(const state of c.states)if(hash(state.html)!==state.sha256)throw Error('Component state hash does not match.');
  if(assetReader)for(const a of pkg.assets){const data=await assetReader(a);if(data.length!==a.bytes||hash(data)!==a.sha256)throw Error('HTML package asset failed verification.');}
  return pkg;
}
export {htmlStructure};

export async function standaloneHtml(pkg){
  await verifyPackage(pkg);
  return withCaptureDOM(async page=>{
    const {html,components}=await page.evaluate(pkg=>({html:globalThis.CaptureSections.renderHtmlDocument(pkg),components:pkg.turns.flatMap(t=>t.sections.flatMap(s=>s.components.map(c=>({...c,states:c.states.map(v=>({...v,html:globalThis.CaptureSections.componentStateHtml(c,v.state_id,new Set(pkg.assets.flatMap(a=>[a.file,'./'+a.file])),pkg.svg_sprites)}))}))))}),pkg);
    const runtime=`const components=${JSON.stringify(components).replace(/</g,'\\u003c')};document.addEventListener('click',event=>{const control=event.target.closest('[data-capture-agent-control]');const box=control?.closest('[data-component-id]');if(!box)return;const c=components.find(c=>c.component_id===box.dataset.componentId);const edge=c.transitions.find(e=>e.from===box.dataset.stateId&&e.control_id===control.dataset.captureAgentControl);event.preventDefault();if(!edge)return;box.innerHTML=c.states.find(v=>v.state_id===edge.to).html;box.dataset.stateId=edge.to;});`;
    return html.replace('</body>',`<script>${runtime}</script></body>`);
  });
}
