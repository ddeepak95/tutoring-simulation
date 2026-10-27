import {test,expect} from '@playwright/test';
import {backend,login} from './mock';
test('admin listing requests metadata, avoids assignment conversation joins and still opens full captures',async({page})=>{
 const state=await backend(page);const requests:string[]=[];
 page.on('request',r=>{if(r.url().includes('/rest/v1/'))requests.push(r.url());});
 await login(page,'admin');
 await expect(page.locator('.conversation-table tbody tr')).toHaveCount(1);
 const documents=requests.filter(r=>new URL(r).pathname==='/rest/v1/rpc/dashboard_topic_conversations');
 expect(documents.length).toBeGreaterThan(0);
 for(const request of documents){const select=new URL(request).searchParams.get('select')!;expect(select).not.toBe('*');expect(select).toContain('html_format:');expect(select).not.toMatch(/(?:^|,)transcript(?:,|$)/);}
 const assignments=requests.filter(r=>new URL(r).pathname==='/rest/v1/assignments');
 expect(assignments.length).toBeGreaterThan(0);expect(assignments.every(r=>!new URL(r).searchParams.get('select')?.includes('conversations('))).toBe(true);
 expect(state.requests).not.toContain('/rest/v1/html_conversation_sections');
 await page.getByRole('button',{name:'Refresh',exact:true}).click();
 await expect.poll(()=>requests.filter(r=>new URL(r).pathname==='/rest/v1/rpc/dashboard_topic_conversations').length).toBe(2);
 // Registration is checked once, rather than during every poll/refresh.
 expect(requests.filter(r=>new URL(r).pathname==='/rest/v1/rubric_versions'&&new URL(r).searchParams.get('select')==='hash')).toHaveLength(1);
 await page.locator('.conversation-topic-link').click();
 await expect(page.getByRole('heading',{name:'View Labeling',exact:true})).toBeVisible();
});
