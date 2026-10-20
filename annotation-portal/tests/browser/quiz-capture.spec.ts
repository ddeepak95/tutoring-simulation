import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import { capturePageHtml } from '../../../chatgpt-conversation-extension/src/capture.js';

const url = 'https://chatgpt.com/c/058c1f12-8046-4a9d-ba3f-a29d558fcbf0';
const quiz = (initial = 1, blocked = false) => `<section id="quiz"><div id="question"></div></section><script>
window.answerChanges=0;window.navigation=[];let current=${initial};
const data=[
 ['Which chamber pumps oxygen-rich blood to the entire body?', ['Right atrium','Left ventricle','Right ventricle']],
 ['Which vessels return blood to the heart?', ['Veins','Arteries','Capillaries']],
 ['What separates the two sides of the heart?', ['Septum','Aorta','Valve']]
];
function render(){const [question,options]=data[current-1];document.querySelector('#question').innerHTML=
 '<h4>Question '+current+' of 3</h4><p>'+question+'</p>'+options.map((option,i)=>'<label><input type="radio" name="answer" '+(current===1&&i===0?'checked':'')+'>'+option+'</label>').join('')+
 (current===1?'<p>Not quite.</p><p>The left ventricle pumps oxygen-rich blood into the aorta.</p>':'')+
 '<button type="button" id="prev" '+(current===1?'disabled':'')+'>Previous</button><button type="button" id="next" '+(current===3||${blocked}?'disabled':'')+'>Next →</button>';
 document.querySelector('#prev').onclick=()=>{window.navigation.push('previous');current--;setTimeout(render,30)};
 document.querySelector('#next').onclick=()=>{window.navigation.push('next');current++;setTimeout(render,30)};
 document.querySelectorAll('input').forEach(input=>input.onchange=()=>window.answerChanges++);
}render();</script>`;
const pageHtml = (body: string) => '<!doctype html><meta charset="utf-8"><main><article data-turn="assistant" data-turn-id="a1"><h2>Test your understanding</h2>' + body + '</article></main>';
const gatedQuiz = (existingAnswer = false) => `<section id="quiz"></section><script>
window.answers=${existingAnswer ? '{1:1}' : '{}'};window.answerChanges=0;let current=1;
function render(){const answered=window.answers[current]!==undefined;document.querySelector('#quiz').innerHTML=
 '<h4>Question '+current+' of 3</h4><p>Gated question '+current+'</p>'+['First option','Second option'].map((option,i)=>'<label><input type="radio" name="choice" data-index="'+i+'" '+(window.answers[current]===i?'checked':'')+'>'+option+'</label>').join('')+
 (answered?'<p>Feedback for question '+current+'</p>':'')+
 '<button type="button" id="prev" '+(current===1||!answered?'disabled':'')+'>Previous</button><button type="button" id="next" '+(current===3||!answered?'disabled':'')+'>Next</button>';
 document.querySelectorAll('input').forEach(input=>input.onchange=()=>{window.answers[current]=Number(input.dataset.index);window.answerChanges++;render()});
 document.querySelector('#prev').onclick=()=>{current--;render()};document.querySelector('#next').onclick=()=>{current++;render()};
}render();</script>`;

test('explicit answer-enabled capture unlocks gated questions and labels synthetic selections and feedback', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: pageHtml(gatedQuiz()) }));
  await page.goto(url);
  const capture = await page.evaluate(`(${capturePageHtml.toString()})(true, null, true)`);
  expect(capture.report.quizzes[0]).toMatchObject({ captured: 3, complete: true, restored: true, auto_answered_questions: [1, 2, 3], selections_are_learner_responses: false });
  expect(await page.evaluate(() => (window as any).answerChanges)).toBe(3);
  await expect(page.locator('#quiz h4')).toHaveText('Question 1 of 3');
  await page.setContent(capture.html);
  await expect(page.locator('[data-portal-capture-answer="automated"]')).toHaveCount(3);
  for (let number = 1; number <= 3; number++) {
    await expect(page.getByText('Gated question ' + number, { exact: true })).toBeVisible();
    await expect(page.getByText('Feedback for question ' + number, { exact: true })).toBeVisible();
  }
  expect(capture.report.limitations.join(' ')).toContain('not learner responses');
});

test('answer-enabled capture preserves existing choices instead of replacing learner answers', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: pageHtml(gatedQuiz(true)) }));
  await page.goto(url);
  const capture = await page.evaluate(`(${capturePageHtml.toString()})(true, null, true)`);
  expect(capture.report.quizzes[0].auto_answered_questions).toEqual([2, 3]);
  expect(await page.evaluate(() => (window as any).answers[1])).toBe(1);
  expect(await page.evaluate(() => (window as any).answerChanges)).toBe(2);
});

test('captures all navigable quiz questions, options and existing feedback, restoring the original question', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: pageHtml(quiz(2)) }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.quizzes).toEqual([{ total: 3, captured: 3, complete: true, original_question: 2, restored: true, limitation: '' }]);
  await expect(page.locator('#question h4')).toHaveText('Question 2 of 3');
  expect(await page.evaluate(() => (window as any).answerChanges)).toBe(0);
  // Verify the same saved HTML passes through the actual selectable/translation pipeline.
  await page.route('https://chatgpt.com/selectable.js', route => route.fulfill({ contentType: 'text/javascript', body: fs.readFileSync('../chatgpt-conversation-extension/src/selectable.js', 'utf8') }));
  const result = await page.evaluate(async capture => {
    const module = await import('https://chatgpt.com/selectable.js');
    const model = module.buildSelectableDocument(capture);
    return { html: module.renderSelectableDocument(model), units: model.units };
  }, capture);
  expect(result.units.some((unit: any) => unit.source.includes('Which vessels return'))).toBe(true);
  expect(result.units.some((unit: any) => unit.source.includes('Septum'))).toBe(true);
  await page.setContent(result.html);
  await expect(page.getByText('Quiz — all 3 questions')).toBeVisible();
  await expect(page.getByText('Question 1 of 3', { exact: true })).toHaveCount(1);
  await expect(page.getByText('Question 2 of 3', { exact: true })).toHaveCount(1);
  await expect(page.getByText('Question 3 of 3', { exact: true })).toHaveCount(1);
  await expect(page.getByText('Left ventricle', { exact: true })).toBeVisible();
  await expect(page.getByText('The left ventricle pumps oxygen-rich blood into the aorta.')).toBeVisible();
  await expect(page.locator('main input,main button')).toHaveCount(0);
});

test('does not answer gated quizzes and reports missing questions visibly', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: pageHtml(quiz(1, true)) }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.quizzes[0]).toMatchObject({ captured: 1, total: 3, complete: false, restored: true });
  expect(capture.report.quizzes[0].limitation).toContain('requires an answer');
  expect(await page.evaluate(() => (window as any).answerChanges)).toBe(0);
  expect(await page.evaluate(() => (window as any).navigation)).toEqual([]);
  await page.setContent(capture.html);
  await expect(page.getByText('Quiz — 1 of 3 questions captured')).toBeVisible();
  await expect(page.getByText(/No answers were selected/)).toBeVisible();
});

test('reads accessible embedded quizzes as selectable HTML instead of a single screenshot', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: pageHtml('<iframe src="/quiz" title="Heart quiz"></iframe>') }));
  await page.route('https://chatgpt.com/quiz', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html>' + quiz() }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.quizzes[0]).toMatchObject({ captured: 3, total: 3, complete: true, restored: true });
  await expect(page.frameLocator('iframe').locator('#question h4')).toHaveText('Question 1 of 3');
  expect(capture.html).toContain('data-portal-frame-content');
  expect(capture.html).toContain('What separates the two sides');
  expect(capture.html).not.toContain('<iframe');
  expect(capture.report.unreadable_frames).toBe(0);
});

test('does not claim to capture hidden questions in an inaccessible frame', async ({ page }) => {
  await page.route('https://chatgpt.com/**', route => route.fulfill({ contentType: 'text/html', body: pageHtml('<p>Embedded quiz</p><iframe src="https://quiz.test/" title="Quiz"></iframe>') }));
  await page.route('https://quiz.test/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html>' + quiz() }));
  await page.goto(url);
  const capture = await page.evaluate(capturePageHtml);
  expect(capture.report.quizzes).toEqual([]);
  expect(capture.report.unreadable_frames).toBe(1);
  expect(capture.report.limitations.join(' ')).toContain('hidden quiz questions inside those frames are not captured');
});
