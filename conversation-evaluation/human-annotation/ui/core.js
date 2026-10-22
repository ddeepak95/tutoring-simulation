/* Pure transcript and annotation operations; shared by the UI and offline tests. */
(function (root) {
  "use strict";
  const FORMAT_VERSION = "instructional-feature-annotation/1.0";
  const FORM_FIELDS = {
    concepts_and_subtopics_covered: ["topic", "detail_level"],
    examples: ["detail_level"],
    analogies: ["detail_level"],
    representations: ["representation_type", "image_languages"],
    cultural_references: ["detail_level"],
    questions: ["question_type"],
  };
  const OPTIONAL_CONCEPT_FIELDS = {
    examples: "concept_illustrated", analogies: "concept_explained",
    representations: "concept_illustrated", cultural_references: "concept_illustrated",
    questions: "concept_checked",
  };

  function formFields(feature) {
    return feature.fields.filter(field => !FORM_FIELDS[feature.key] || FORM_FIELDS[feature.key].includes(field.key));
  }

  function normalizeConversation(input, filename = "Imported conversation") {
    if (!input || typeof input !== "object") throw new Error("The file must contain a conversation object.");
    const messages = input.messages || input.turns;
    if (!Array.isArray(messages) || !messages.length) throw new Error("No conversation turns were found.");
    const seen = new Set();
    const normalized = messages.map((m, i) => {
      const role = String(m.speaker || m.role || "").toLowerCase();
      const speaker = ({ assistant: "tutor", user: "student", learner: "student", tutor: "tutor", student: "student" })[role];
      if (!speaker) throw new Error(`Turn ${i + 1} has an unrecognized speaker. Use tutor/student or assistant/user.`);
      const text = m.text ?? m.content;
      if (typeof text !== "string") throw new Error(`Turn ${i + 1} must have text content.`);
      const turn_id = String(m.turn_id ?? `turn_${String(i + 1).padStart(4, "0")}`);
      if (!turn_id || seen.has(turn_id)) throw new Error("Turn IDs must be nonempty and unique.");
      seen.add(turn_id);
      return { turn_id, speaker, text };
    });
    return {
      conversation_id: input.conversation_id ?? input.configuration?.id ?? null,
      learning_topic: input.learning_topic ?? input.configuration?.topic_name ?? null,
      label: input.condition || input.label || filename,
      messages: normalized,
    };
  }

  function parseTranscript(text, filename) {
    const matches = [...text.matchAll(/^(Tutor|Student):[ \t]?/gmi)];
    if (!matches.length || text.slice(0, matches[0].index).trim()) {
      throw new Error("Text transcripts must use Tutor: and Student: at the start of each turn. JSON imports also work.");
    }
    const messages = matches.map((match, i) => ({
      speaker: match[1].toLowerCase(),
      text: text.slice(match.index + match[0].length, matches[i + 1]?.index ?? text.length).replace(/\r?\n\s*$/, ""),
    }));
    return normalizeConversation({ messages }, filename);
  }

  function occurrenceAt(text, quote, start) {
    if (!quote) throw new Error("Select a nonempty passage.");
    let count = 0;
    for (let i = 0; i <= start; i++) {
      if (text.startsWith(quote, i)) count++;
    }
    if (!count || text.slice(start, start + quote.length) !== quote) throw new Error("The quote does not match its source position.");
    return count;
  }

  function makeEvidence(conversation, turnId, start, end) {
    const turn = conversation.messages.find(t => t.turn_id === turnId);
    if (!turn || turn.speaker !== "tutor") throw new Error("Select text within one tutor turn.");
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > turn.text.length || end <= start) throw new Error("The selected passage is outside its turn.");
    const quote = turn.text.slice(start, end);
    if (!quote.trim()) throw new Error("Select a passage containing text.");
    return { turn_id: turnId, quote, start, end, occurrence: occurrenceAt(turn.text, quote, start) };
  }

  function missingAttributes(annotation, rubric) {
    const feature = rubric.find(f => f.key === annotation.feature);
    if (!feature) throw new Error("Unknown instructional feature.");
    return feature.fields.filter(field => {
      if (field.optional || OPTIONAL_CONCEPT_FIELDS[annotation.feature] === field.key) return false;
      const value = annotation.entry[field.key];
      return field.multiple ? !Array.isArray(value) || !value.length : field.numeric ? !Number.isInteger(value) : typeof value !== "string" || !value.trim();
    }).map(field => field.key);
  }

  function createAnnotation(featureKey, evidence, rubric, id) {
    const feature = rubric.find(f => f.key === featureKey);
    if (!feature) throw new Error("Unknown instructional feature.");
    const entry = Object.fromEntries(feature.fields.filter(field => !field.optional && OPTIONAL_CONCEPT_FIELDS[featureKey] !== field.key).map(field => [field.key, field.multiple ? [] : ""]));
    // Use the selected wording as an editable starting point, without guessing enums.
    entry[feature.fields[0].key] = evidence.quote;
    entry.turn_locations = [evidence.turn_id];
    return { id, feature: featureKey, entry, evidence: [structuredClone(evidence)] };
  }

  function validateAnnotations(conversation, annotations, rubric, { allowIncomplete = false } = {}) {
    if (!Array.isArray(annotations)) throw new Error("Annotations must be a list.");
    const ids = new Set();
    for (const annotation of annotations) {
      if (!annotation || typeof annotation.id !== "string" || !annotation.id || ids.has(annotation.id)) throw new Error("Annotation IDs must be nonempty and unique.");
      ids.add(annotation.id);
      const feature = rubric.find(f => f.key === annotation.feature);
      if (!feature) throw new Error("Unknown instructional feature.");
      if (!annotation.entry || typeof annotation.entry !== "object" || !Array.isArray(annotation.evidence) || !annotation.evidence.length) throw new Error("Every annotation needs attributes and supporting evidence.");
      for (const evidence of annotation.evidence) {
        if (evidence.example_status !== undefined && (annotation.feature !== "examples" || !["Fresh", "Duplicate"].includes(evidence.example_status))) throw new Error("Example status must be Fresh or Duplicate and belongs only to examples.");
        const expected = makeEvidence(conversation, evidence.turn_id, evidence.start, evidence.end);
        if (evidence.quote !== expected.quote || evidence.occurrence !== expected.occurrence) throw new Error("An evidence quotation or occurrence no longer matches the transcript.");
      }
      const allowed = new Set([...feature.fields.map(f => f.key), "turn_locations"]);
      for (const key of Object.keys(annotation.entry)) {
        if (!allowed.has(key)) throw new Error(`Unexpected entry attribute: ${key}.`);
      }
      for (const field of feature.fields) {
        const value = annotation.entry[field.key];
        // Human forms rely on selected passages rather than requiring a concept label.
        // Previously recorded concept metadata remains valid and is preserved.
        if (field.optional || OPTIONAL_CONCEPT_FIELDS[annotation.feature] === field.key) {
          if (field.key === "concept_checked" && annotation.entry.question_type === "Instructional" && value !== undefined && value !== "" && value !== null) {
            throw new Error("Instructional questions must have concept_checked set to null.");
          }
          if (value === undefined || value === "" || value === null || (field.multiple && Array.isArray(value) && !value.length)) continue;
        }
        if (field.numeric) {
          if (!Number.isInteger(value) || value < 1 || value > 1000) throw new Error(`${field.label} must be a whole number from 1 to 1000.`);
          if (field.key === "diagram_count" && !["Diagram", "Flowchart"].includes(annotation.entry.representation_type)) throw new Error("Diagram count applies only to diagrams and flowcharts.");
          continue;
        }
        if (field.multiple) {
          if (allowIncomplete && Array.isArray(value) && !value.length) continue;
          if (!Array.isArray(value) || !value.length || value.some(item => typeof item !== "string" || !item.trim()) || new Set(value).size !== value.length) throw new Error(`${field.label} is required.`);
          if (field.key === "image_languages" && value.some(item => !/^(?:[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*|und|zxx)$/.test(item))) throw new Error(`${field.label} must use BCP 47 language tags.`);
          continue;
        }
        if (allowIncomplete && value === "") continue;
        if (typeof value !== "string" || !value.trim()) throw new Error(`${field.label} is required.`);
        if (field.options && !field.options.includes(value)) throw new Error(`${field.label} has an invalid value.`);
      }
      const turns = [...new Set(annotation.evidence.map(e => e.turn_id))];
      if (!Array.isArray(annotation.entry.turn_locations) || JSON.stringify(turns) !== JSON.stringify(annotation.entry.turn_locations)) throw new Error("Turn locations must match the supporting passages.");
      if (annotation.feature === "questions") {
        if (annotation.evidence.length !== 1 || annotation.entry.question !== annotation.evidence[0].quote) throw new Error("Record each question occurrence separately using its exact selected wording.");
      }
    }
    return annotations;
  }

  function addEvidence(annotation, evidence) {
    if (annotation.feature === "questions") throw new Error("Each question occurrence is a separate entry.");
    const same = e => e.turn_id === evidence.turn_id && e.start === evidence.start && e.end === evidence.end;
    if (!annotation.evidence.some(same)) annotation.evidence.push(evidence);
    annotation.entry.turn_locations = [...new Set(annotation.evidence.map(e => e.turn_id))];
    return annotation;
  }

  function buildExport(conversation, annotations, rubric, annotator) {
    validateAnnotations(conversation, annotations, rubric, { allowIncomplete: true });
    const incomplete_annotations = annotations.map(annotation => ({
      id: annotation.id, feature: annotation.feature, missing_attributes: missingAttributes(annotation, rubric),
    })).filter(annotation => annotation.missing_attributes.length);
    const incompleteIds = new Set(incomplete_annotations.map(annotation => annotation.id));
    const instructional_features = {};
    const feature_counts = {};
    const highlight_counts = {};
    for (const feature of rubric) {
      const matching = annotations.filter(a => a.feature === feature.key);
      const entries = matching.filter(a => !incompleteIds.has(a.id)).map(a => {
        const entry = structuredClone(a.entry);
        for (const field of feature.fields) {
          if ((field.optional || OPTIONAL_CONCEPT_FIELDS[feature.key] === field.key) && (entry[field.key] === "" || (field.multiple && Array.isArray(entry[field.key]) && !entry[field.key].length))) delete entry[field.key];
        }
        return entry;
      });
      instructional_features[feature.key] = entries;
      feature_counts[feature.key] = entries.length;
      highlight_counts[feature.key] = matching.length;
    }
    return {
      format_version: FORMAT_VERSION,
      exported_at: new Date().toISOString(),
      annotator: annotator || null,
      offset_convention: "Zero-based UTF-16 code-unit offsets; end is exclusive. Occurrence is one-based and includes overlapping matches.",
      conversation: structuredClone(conversation),
      rubric: structuredClone(rubric),
      form_fields: structuredClone(FORM_FIELDS),
      annotations: structuredClone(annotations),
      incomplete_annotations,
      instructional_features,
      feature_counts,
      highlight_counts,
    };
  }

  function highlightedSegments(text, annotations, turnId) {
    const spans = annotations.flatMap(a => a.evidence.filter(e => e.turn_id === turnId).map(e => ({ ...e, annotation: a })));
    const boundaries = [...new Set([0, text.length, ...spans.flatMap(s => [s.start, s.end])])].sort((a, b) => a - b);
    return boundaries.slice(0, -1).map((start, i) => ({
      start, end: boundaries[i + 1], text: text.slice(start, boundaries[i + 1]),
      annotations: spans.filter(s => s.start <= start && s.end >= boundaries[i + 1]).map(s => s.annotation),
    }));
  }

  const api = { FORMAT_VERSION, formFields, normalizeConversation, parseTranscript, occurrenceAt, makeEvidence, missingAttributes, createAnnotation, validateAnnotations, addEvidence, buildExport, highlightedSegments };
  root.AnnotationCore = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
