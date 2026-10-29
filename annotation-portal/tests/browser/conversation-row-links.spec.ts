import {expect,test} from '@playwright/test';
import {backend,ids,login} from './mock';

test('conversation titles expose inline links, direct assignment and a separate deletion confirmation',async({page})=>{
 const state=await backend(page);await login(page,'admin');
 const row=page.locator(`[data-conversation-id="${ids.doc}"]`),actions=row.locator('.conversation-row-links');
 for(const [name,suffix] of [['View',''],['Label','/labeling'],['Rate','/rating'],['Baselines','/baselines']])await expect(actions.getByRole('link',{name,exact:true})).toHaveAttribute('href',`/conversations/${ids.doc}${suffix}`);
 await expect(row.locator('.conversation-menu-button')).toHaveCount(0);
 const assign=actions.getByRole('button',{name:/Assign users for/});await assign.click();
 const dialog=page.getByRole('dialog',{name:'Assign tasks',exact:true});await expect(dialog).toBeVisible();
 await expect(dialog.getByRole('button',{name:'Back',exact:true})).toHaveCount(0);
 await dialog.getByRole('button',{name:'Close menu',exact:true}).click();await expect(assign).toBeFocused();
 await actions.getByRole('button',{name:'Delete',exact:true}).click();
 const confirmation=page.getByRole('dialog',{name:'Delete conversation?',exact:true});await expect(confirmation).toBeVisible();
 await confirmation.getByRole('button',{name:'Cancel',exact:true}).click();
 expect(state.documents).toHaveLength(1);expect(state.requests).not.toContain('/rest/v1/rpc/delete_conversation');
 await actions.getByRole('link',{name:'Label',exact:true}).click();await expect(page).toHaveURL(`/conversations/${ids.doc}/labeling`);
 await page.goBack();await expect(actions.getByRole('link',{name:'Label',exact:true})).toBeVisible();
 await page.setViewportSize({width:390,height:844});await expect(actions.getByRole('link',{name:'View',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(state.saves).toBe(0);
});
