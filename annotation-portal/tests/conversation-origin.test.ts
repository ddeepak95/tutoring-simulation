import {expect,it} from 'vitest';
import {conversationOrigin} from '../src/conversation-origin';
import {htmlFixture} from './fixtures/html-conversation';
it('reads translation provenance from the HTML package and relational link',()=>{
 const pkg=htmlFixture();pkg.metadata.language='en';pkg.source_version={capture_id:'source',version_hash:'a'.repeat(64),language:'ta'};
 const doc:any={id:'english',language:'en',source_conversation_id:'source-id',transcript:{conversation_id:'english',html_content:pkg}};
 expect(conversationOrigin(doc)).toEqual({sourceId:'source-id',translated:true,originalLanguage:'ta'});
 delete doc.source_conversation_id;expect(conversationOrigin(doc).translated).toBe(true);
 pkg.source_version=null;expect(conversationOrigin(doc)).toMatchObject({translated:false,originalLanguage:'en'});
});
