import {expect,test} from '@playwright/test';
import {backend,ids,login} from './mock';

test('unassign requires confirmation, removes access, retains work, and reassign resumes the same record',async({page})=>{
 const state=await backend(page);state.assignments[0].revision=3;state.assignments[0].status='in_progress';state.assignments[0].turn_ratings={t1:{values:{relevance:'3'},notes:'Saved note'}};
 const original=structuredClone(state.assignments[0]),bob=structuredClone(state.assignments[1]);
 await login(page,'admin');await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();
 await page.getByRole('button',{name:'Unassign alice',exact:true}).click();await expect(page.getByText('Saved annotations, ratings, and history are retained.',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Cancel unassignment',exact:true}).click();expect(state.assignments[0]).toEqual(original);
 await page.getByRole('button',{name:'Unassign alice',exact:true}).click();await page.getByRole('button',{name:'Confirm unassign',exact:true}).click();
 await expect(page.getByRole('checkbox',{name:'alice',exact:true})).toBeEnabled();expect(state.assignments[0].is_active).toBe(false);expect(state.assignments[0].turn_ratings).toEqual(original.turn_ratings);expect(state.assignments[1]).toEqual(bob);
 await page.getByRole('button',{name:'Close assignment menu'}).click();await page.getByRole('button',{name:'Sign out'}).click();await login(page,'alice');
 await expect(page.getByRole('heading',{name:'No assignments yet',exact:true})).toBeVisible();await page.goto(`/assignments/${ids.a}`);await expect(page.getByRole('button',{name:'Complete Annotation'})).toHaveCount(0);
 await page.getByRole('button',{name:'Sign out'}).click();await login(page,'admin');await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();
 await page.getByRole('checkbox',{name:'alice',exact:true}).check();await page.getByRole('button',{name:'Assign to selected annotators',exact:true}).click();
 await expect.poll(()=>state.assignments[0].is_active).toBe(true);expect(state.assignments).toHaveLength(2);expect(state.assignments[0].id).toBe(original.id);expect(state.assignments[0].turn_ratings).toEqual(original.turn_ratings);expect(state.assignments[0].status).toBe(original.status);
});

test('a save made after confirmation opens prevents unassignment until refreshed work is reviewed',async({page})=>{
 const state=await backend(page);await login(page,'admin');await page.locator(`[data-conversation-id="${ids.doc}"]`).getByRole('button').click();await page.getByRole('button',{name:'Unassign alice',exact:true}).click();
 state.assignments[0].revision++;
 await page.getByRole('button',{name:'Confirm unassign',exact:true}).click();await expect(page.getByRole('alert')).toContainText('Annotation work changed');expect(state.assignments[0].is_active).not.toBe(false);
 await page.getByRole('button',{name:'Confirm unassign',exact:true}).click();await expect.poll(()=>state.assignments[0].is_active).toBe(false);
});
