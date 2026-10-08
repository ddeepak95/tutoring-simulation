"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const C = require("./core.js");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "data.js"), "utf8"), sandbox);
const rubric = JSON.parse(JSON.stringify(sandbox.window.ANNOTATION_DATA.rubric));
const conversation = C.normalizeConversation({ conversation_id: "test", messages: [
  { speaker: "tutor", text: "தமிழ் 😀 What is evaporation? What is evaporation?\nWater changes into vapour." },
  { speaker: "student", text: "Can you give an example?" },
  { speaker: "tutor", text: "Wet clothes drying illustrates evaporation." },
] });
function annotation(feature, entry, evidence) {
  return { id: "a1", feature, entry: { ...entry, turn_locations: [...new Set(evidence.map(e => e.turn_id))] }, evidence };
}
const q = "What is evaporation?";
const qStart = conversation.messages[0].text.indexOf(q);

test("normalization preserves multilingual text and stable supplied IDs", () => {
  const c = C.normalizeConversation({ messages: [{ role: "assistant", turn_id: 12, content: "தமிழ் 😀\n\\[n\\lambda=2d\\sin\\theta\\]" }] });
  assert.equal(c.messages[0].text, "தமிழ் 😀\n\\[n\\lambda=2d\\sin\\theta\\]");
  assert.equal(c.messages[0].turn_id, "12");
  assert.throws(() => C.normalizeConversation({ messages: [{ speaker: "tutor", turn_id: "1", text: "a" }, { speaker: "student", turn_id: "1", text: "b" }] }), /unique/);
});
test("plain transcript parsing preserves internal newlines and role boundaries", () => {
  const c = C.parseTranscript("Tutor: தமிழ்\nEquation: 2+2=4\n\nStudent: Why?\n", "sample.txt");
  assert.equal(c.messages[0].text, "தமிழ்\nEquation: 2+2=4");
  assert.equal(c.messages[1].speaker, "student");
  assert.throws(() => C.parseTranscript("No role markers"), /Tutor:/);
});
test("exact evidence distinguishes repeated questions and overlapping matches", () => {
  const text = conversation.messages[0].text;
  const second = text.indexOf(q, qStart + 1);
  const e = C.makeEvidence(conversation, "turn_0001", second, second + q.length);
  assert.equal(e.quote, q);
  assert.equal(e.occurrence, 2);
  assert.equal(C.occurrenceAt("aaaa", "aa", 2), 3);
  assert.throws(() => C.makeEvidence(conversation, "turn_0002", 0, 3), /tutor/);
});
test("questions require exact source wording and classification while preserving legacy metadata", () => {
  const evidence = C.makeEvidence(conversation, "turn_0001", qStart, qStart + q.length);
  const a = annotation("questions", { question: q, question_type: "Instructional", concept_checked: null }, [evidence]);
  assert.equal(C.validateAnnotations(conversation, [a], rubric).length, 1);
  assert.throws(() => C.validateAnnotations(conversation, [{ ...a, entry: { ...a.entry, question: "paraphrase" } }], rubric), /exact/);
  assert.throws(() => C.validateAnnotations(conversation, [{ ...a, entry: { ...a.entry, concept_checked: "Evaporation" } }], rubric), /null/);
  const knowledge = structuredClone(a); knowledge.entry.question_type = "Knowledge-checking";
  C.validateAnnotations(conversation, [knowledge], rubric);
  delete knowledge.entry.concept_checked;
  C.validateAnnotations(conversation, [knowledge], rubric);
  knowledge.entry.concept_checked = "Evaporation";
  C.validateAnnotations(conversation, [knowledge], rubric);
  assert.throws(() => C.addEvidence(a, evidence), /separate/);
});
test("repeated features collect supporting turns without duplicate evidence", () => {
  const first = C.makeEvidence(conversation, "turn_0001", qStart, qStart + q.length);
  const second = C.makeEvidence(conversation, "turn_0003", 0, 11);
  const a = annotation("concepts_and_subtopics_covered", { topic: "Evaporation", detail_level: "Explained" }, [first]);
  C.addEvidence(a, second); C.addEvidence(a, second);
  assert.equal(a.evidence.length, 2);
  assert.deepEqual(a.entry.turn_locations, ["turn_0001", "turn_0003"]);
  C.validateAnnotations(conversation, [a], rubric);
});
test("overlapping highlights preserve exact source text", () => {
  const a = annotation("examples", { example: "Water", concept_illustrated: "Evaporation", detail_level: "Brief" }, [C.makeEvidence(conversation, "turn_0001", 0, 15)]);
  const b = { ...structuredClone(a), id: "a2", evidence: [C.makeEvidence(conversation, "turn_0001", 10, 25)] };
  const segments = C.highlightedSegments(conversation.messages[0].text, [a, b], "turn_0001");
  assert.equal(segments.map(s => s.text).join(""), conversation.messages[0].text);
  assert.ok(segments.some(s => s.annotations.length === 2));
});
test("malformed or modified evidence and unknown attributes are rejected", () => {
  const e = C.makeEvidence(conversation, "turn_0003", 0, 11);
  const a = annotation("examples", { example: "Wet clothes", concept_illustrated: "Evaporation", detail_level: "Brief" }, [e]);
  const invalid = structuredClone(a); invalid.evidence[0].quote = "not in transcript";
  assert.throws(() => C.validateAnnotations(conversation, [invalid], rubric), /quotation/);
  const extra = structuredClone(a); extra.entry.score = 3;
  assert.throws(() => C.validateAnnotations(conversation, [extra], rubric), /Unexpected/);
  assert.throws(() => C.validateAnnotations(conversation, [a, a], rubric), /unique/);
});
test("export retains source text, six rubric-compatible lists and local counts", () => {
  const e = C.makeEvidence(conversation, "turn_0003", 0, 11);
  const a = annotation("representations", { representation: "Equation", representation_type: "Equation", concept_illustrated: "Evaporation" }, [e]);
  const project = C.buildExport(conversation, [a], rubric, "researcher");
  assert.equal(project.annotator, "researcher");
  assert.equal(Object.keys(project.instructional_features).length, 6);
  assert.equal(project.feature_counts.representations, 1);
  assert.equal(project.feature_counts.questions, 0);
  assert.equal(project.conversation.messages[0].text, conversation.messages[0].text);
  assert.ok(!("detail_level" in project.instructional_features.representations[0]));
  C.validateAnnotations(C.normalizeConversation(project.conversation), project.annotations, rubric);
});
test("immediate highlights leave enum decisions blank and validate as unfinished work", () => {
  const e = C.makeEvidence(conversation, "turn_0001", qStart, qStart + q.length);
  const a = C.createAnnotation("questions", e, rubric, "instant-question");
  assert.equal(a.entry.question, q);
  assert.equal(a.entry.question_type, "");
  assert.equal(a.entry.concept_checked, undefined);
  assert.deepEqual(C.missingAttributes(a, rubric), ["question_type"]);
  C.validateAnnotations(conversation, [a], rubric, { allowIncomplete: true });
  assert.throws(() => C.validateAnnotations(conversation, [a], rubric), /required/);
  const malformed = structuredClone(a); malformed.entry.question_type = "Rhetorical";
  assert.throws(() => C.validateAnnotations(conversation, [malformed], rubric, { allowIncomplete: true }), /invalid/);
});
test("simplified feature forms complete with captured text and a single classification attribute", () => {
  const e = C.makeEvidence(conversation, "turn_0001", qStart, qStart + q.length);
  for (const [key, attribute, value] of [
    ["examples", "detail_level", "Explained"],
    ["analogies", "detail_level", "Brief"],
    ["representations", "representation_type", "Equation"],
    ["cultural_references", "detail_level", "Elaborated"],
    ["questions", "question_type", "Knowledge-checking"],
  ]) {
    const feature = rubric.find(f => f.key === key);
    assert.deepEqual(C.formFields(feature).map(field => field.key), [attribute]);
    const a = C.createAnnotation(key, e, rubric, key);
    assert.equal(a.entry[feature.fields[0].key], e.quote);
    assert.deepEqual(C.missingAttributes(a, rubric), [attribute]);
    a.entry[attribute] = value;
    C.validateAnnotations(conversation, [a], rubric);
    assert.deepEqual(C.missingAttributes(a, rubric), []);
    const exported = C.buildExport(conversation, [a], rubric, "tester");
    assert.equal(exported.feature_counts[key], 1);
  }
});
test("exports retain unfinished highlights without treating them as complete rubric entries", () => {
  const e = C.makeEvidence(conversation, "turn_0003", 0, 11);
  const a = C.createAnnotation("examples", e, rubric, "instant-example");
  const project = C.buildExport(conversation, [a], rubric, "researcher");
  assert.equal(project.annotations.length, 1);
  assert.equal(project.highlight_counts.examples, 1);
  assert.equal(project.feature_counts.examples, 0);
  assert.deepEqual(project.instructional_features.examples, []);
  assert.deepEqual(project.incomplete_annotations[0].missing_attributes, ["detail_level"]);
  C.validateAnnotations(C.normalizeConversation(project.conversation), project.annotations, rubric, { allowIncomplete: true });
  a.entry.detail_level = "Brief";
  const finished = C.buildExport(conversation, [a], rubric, "researcher");
  assert.equal(finished.feature_counts.examples, 1);
  assert.deepEqual(finished.incomplete_annotations, []);
  assert.equal(finished.instructional_features.examples[0].example, e.quote);
  assert.ok(!("concept_illustrated" in finished.instructional_features.examples[0]));
});
