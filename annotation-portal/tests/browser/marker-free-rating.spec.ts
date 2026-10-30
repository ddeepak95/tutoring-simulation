import {expect,test} from '@playwright/test';
import fs from 'node:fs';
import {backend,ids,login} from './mock';
const ratingQuestions=JSON.parse(fs.readFileSync('src/generated/rating-questions.json','utf8')) as {key:string;first_only:boolean;subsequent_only:boolean;description:string;guidance:string}[];

test('marker-free model rating runs switch in the rater side panel with reasons',async({page})=>{
 const state=await backend(page),document=state.documents[0];
 Object.assign(document.transcript,{conversation_id:ids.doc,access_type:'API',original_language:'en'});
 state.conversationVersions.push({conversation_id:ids.doc,version_key:'marker-free-v1',section_mode:'none',transcript:structuredClone(document.transcript)});
 const ratings=(score:number,reason:string)=>document.transcript.messages.filter(turn=>turn.speaker==='tutor').map((turn,index)=>({turn_id:turn.turn_id,values:Object.fromEntries(ratingQuestions.filter(question=>index===0?!question.subsequent_only:!question.first_only).map(question=>[question.key,{score,reason}]))}));
 const newer='00000000-0000-4000-8000-000000000091',older='00000000-0000-4000-8000-000000000092';
 const historicalQuestions=ratingQuestions.map(question=>({...question,options:['3','2','1','N/A'],scale_items:{'3':'3 — Effective (historical)','2':'2 — Partially effective (historical)','1':'1 — Ineffective (historical)','N/A':'N/A'}}));
 state.versionRatingRuns.push(
  {id:newer,conversation_id:ids.doc,version_key:'marker-free-v1',status:'completed',model:'gemini-3.8-flash',prompt_version:'marker-free-turn-ratings/2',ratings:ratings(5,'Newer reason.'),rubric_hash:'a'.repeat(64),rubric_snapshot:{rating_dimensions:ratingQuestions},error:null,created_at:'2026-10-29T12:00:00Z'},
  {id:older,conversation_id:ids.doc,version_key:'marker-free-v1',status:'completed',model:'gemini-3.8-flash',prompt_version:'marker-free-turn-ratings/1',ratings:ratings(3,'Older reason.'),rubric_hash:'b'.repeat(64),rubric_snapshot:{rating_dimensions:historicalQuestions},error:null,created_at:'2026-10-29T11:00:00Z'}
 );
 await login(page,'admin');await page.goto(`/conversations/${ids.doc}/rating`);
 await expect(page.getByLabel('Rating run')).toHaveValue(newer);
 await expect(page.getByLabel('Tutor turn ratings')).toContainText('Newer reason.');
 await expect(page.locator('.rating-readonly-option.selected').first()).toContainText('5');
 await expect(page.locator('.turn-ratings-panel .rating-options button:disabled')).toHaveCount(0);
 await expect(page.getByTestId('rating-exchange')).toHaveAttribute('data-tutor-turn','t1');
 await expect(page.locator('.section-annotation-boundary')).toHaveCount(0);
 const introduction=ratingQuestions.find(question=>question.key==='topic_introduction_and_learner_engagement')!;
 await expect(page.getByLabel('Tutor turn ratings').getByText(introduction.description)).toBeVisible();
 await expect(page.getByLabel('Tutor turn ratings').getByText(introduction.guidance)).toBeHidden();
 await page.getByLabel('About Topic Introduction and Learner Engagement').click();
 await expect(page.getByLabel('Tutor turn ratings').getByText(introduction.guidance)).toBeVisible();
 await page.getByLabel('Rating run').selectOption(older);
 await expect(page.getByLabel('Tutor turn ratings')).toContainText('Older reason.');
 await expect(page.locator('.rating-readonly-option.selected').first()).toContainText('3 — Effective (historical)');
 await page.getByLabel('Tutor turn ratings').getByRole('button',{name:'Next'}).first().click();
 await expect(page.getByTestId('rating-exchange')).toHaveAttribute('data-tutor-turn','t2');
 await expect(page.getByLabel('Tutor turn ratings')).toContainText('Addressing Follow-Up Questions');
});
