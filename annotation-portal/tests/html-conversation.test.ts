import {expect,it} from 'vitest';
import {htmlFixture,captureHash} from './fixtures/html-conversation';
import {validateHtmlConversation,htmlStructure} from '../src/html-conversation';
import {C,bundledRubric} from '../src/lib';
import {resolveImageCounts} from '../server/image-labeling';
it('labels and exports HTML sections without transcript evidence',()=>{
 const pkg=htmlFixture();validateHtmlConversation(pkg);
 const conversation:any={conversation_id:'test',messages:pkg.turns.map(({turn_id,speaker})=>({turn_id,speaker,text:''})),html_content:pkg};
 const labels:any[]=[{id:'e',feature:'examples',section_id:'t1s1',entry:{category:'Content',count:3},llm_evidence:'Three visible examples.',evidence:[]},{id:'q',feature:'equations',section_id:'t1s1',entry:{category:'Textual Representations',count:2},evidence:[]}];
 C.validateAnnotations(conversation,labels,bundledRubric.rubric);
 const output=C.buildExport(conversation,labels,bundledRubric.rubric,'tester');
 expect(output.feature_counts).toMatchObject({examples:3,equations:2});expect(output.offset_convention).toBeNull();expect(output.annotations[0]).not.toHaveProperty('evidence');expect(output.sections[0]).not.toHaveProperty('start');
 for(const count of [0,-1,1.2,1001])expect(()=>C.validateAnnotations(conversation,[{...labels[0],entry:{category:'Content',count}}],bundledRubric.rubric)).toThrow();
 expect(()=>C.validateAnnotations(conversation,[...labels,{...labels[0],id:'duplicate'}],bundledRubric.rubric)).toThrow(/Duplicate/);
 expect(()=>C.validateAnnotations(conversation,[{...labels[0],section_id:'t1s2'}],bundledRubric.rubric)).toThrow(/section/);
 const features=Object.fromEntries(bundledRubric.rubric.map(f=>[f.key,{count:f.key==='examples'?3:0,evidence:f.key==='examples'?'Three examples.':null}]));
 const result=resolveImageCounts({sections:[{section_id:'t1s1',features}]},conversation,bundledRubric,[{section_id:'t1s1',turn_id:'turn_0002'}] as any,'request');
 expect(result[0]).toMatchObject({section_id:'t1s1',entry:{count:3},evidence:[],llm_evidence:'Three examples.'});
});
it('rejects incomplete captures, duplicate structure and mismatched translations',()=>{
 const source=htmlFixture(),translated=structuredClone(source);translated.capture_id='english';translated.metadata.language='en';translated.source_version={capture_id:source.capture_id,version_hash:source.version_hash,language:'ta'};translated.version_hash=captureHash(translated);
 expect(htmlStructure(source)).toEqual(htmlStructure(translated));validateHtmlConversation(translated,{source});
 translated.turns[1].sections[0].components[0].transitions=[];expect(()=>validateHtmlConversation(translated,{source})).toThrow(/equivalent/);
 source.status='draft';expect(()=>validateHtmlConversation(source)).toThrow(/incomplete/);
 source.status='complete';source.turns[1].sections[0].components[0].states[1].state_id='t1s1c1v1';expect(()=>validateHtmlConversation(source)).toThrow(/state/);
});
it('requires unique image occurrence IDs and same-section supporting references for image-focused captures',()=>{
 const pkg=htmlFixture();pkg.capture_scope={version:'image-focused/1',images:'all-discoverable',text_interactions:'initial-only'};
 const digest='f'.repeat(64);pkg.assets=[{sha256:digest,mime:'image/png',bytes:1,file:'img/image.png'}];
 pkg.image_inventory=[{sha256:digest,turn_id:pkg.turns[1].turn_id,section_id:'t1s1',occurrence_id:'t1i1',alt:'diagram',source:'inline'}];
 pkg.turns[1].sections[0].components[0].states[1].image_ids=['t1i1'];validateHtmlConversation(pkg);
 const repeated=structuredClone(pkg);repeated.image_inventory!.push({...repeated.image_inventory![0],occurrence_id:'t1i2'});validateHtmlConversation(repeated);
 repeated.image_inventory![1].occurrence_id='t1i1';expect(()=>validateHtmlConversation(repeated)).toThrow(/identity/);
 pkg.turns[1].sections[0].components[0].states[1].image_ids=['missing'];expect(()=>validateHtmlConversation(pkg)).toThrow(/ownership/);
});
