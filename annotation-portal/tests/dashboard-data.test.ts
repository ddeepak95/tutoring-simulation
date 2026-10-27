import {expect,it} from 'vitest';
import {dashboardDocument,dashboardColumns} from '../src/dashboard-data';
import {conversationOrigin} from '../src/conversation-origin';
it('projects metadata without fetching whole HTML packages or embedded capture reports',()=>{
 expect(dashboardColumns).not.toMatch(/(?:^|,)transcript(?:,|$)/);
 expect(dashboardColumns).not.toContain('capture_report');
 expect(dashboardColumns).not.toContain('html_content,');
 const doc=dashboardDocument({id:'translated',label:'Brain',language:'en',created_at:'today',source_conversation_id:'source',messages:[{turn_id:'s1',speaker:'student',text:''},{turn_id:'t1',speaker:'tutor',text:''}],html_format:'html-conversation/2',html_source_language:'ta',provider:'ChatGPT'});
 expect(doc).toMatchObject({is_html_capture:true,turn_count:2,transcript:{provider:'ChatGPT',messages:[]}});
 expect(conversationOrigin(doc)).toEqual({sourceId:'source',translated:true,originalLanguage:'ta'});
 expect(doc.transcript).not.toHaveProperty('html_content');
});
