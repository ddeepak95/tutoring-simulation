import { expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnnotationSummary } from '../src/AnnotationSummary';
import { C } from '../src/lib';
import {bundledRubric} from './fixtures/legacy-rubric';

it('shows question and diagram totals from per-highlight counts', () => {
  const conversation = C.normalizeConversation({ messages: [{ turn_id: 't1', speaker: 'tutor', text: 'Why A? Why B? Diagram A and diagram B.' }] });
  const question = C.createAnnotation('questions', C.makeEvidence(conversation, 't1', 0, 13), bundledRubric.rubric, 'questions');
  question.entry.question_type = 'Instructional';
  question.entry.question_count = 2;
  const diagram = C.createAnnotation('representations', C.makeEvidence(conversation, 't1', 14, 37), bundledRubric.rubric, 'diagram');
  diagram.entry.representation_type = 'Diagram';
  diagram.entry.diagram_count = 2;
  const html = renderToStaticMarkup(<AnnotationSummary annotations={[question, diagram]} rubric={bundledRubric} />);
  expect(html).toMatch(/Questions<\/span><strong class="category-count">2<\/strong>/);
  expect(html).toMatch(/Representations<\/span><strong class="category-count">2<\/strong>/);
  expect(html).toMatch(/Number of diagrams<\/h3><dl><div><dt>Total<\/dt><dd>2<\/dd>/);
});
