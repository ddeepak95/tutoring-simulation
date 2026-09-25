# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt intended an explanation of the chemistry concept of isotopes ('نظائر') for a high school student, but the response misinterpreted 'جمع: نظائر' as a query about Arabic grammar and morphology (specifically broken plural 'جمع تكسير' and diptote rules 'الممنوع من الصرف'). As a result, the response provides an Arabic linguistics lesson with zero chemistry content.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 22,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 5,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 22,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 7,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Linguistic definition and singular-plural correspondence (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the word 'نظائر' as a broken plural of 'نظير' and provides the linguistic meaning of both words.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | كلمة **نظائر** هي **جمع تكسير**، ومفردها: **نظير**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | - **نظير**: الشيء المماثل أو المشابه لشيء آخر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p3 | - **نظائر**: الأشياء المماثلة أو المتشابهة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Sentence example of singular 'نظير' (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "- هذا الطالب **نظيرٌ** لزميله في الاجتهاد.  "}]}

Annotation rationale: Provides an illustrative sentence using the singular noun 'نظير' in the context of diligent students.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### مثال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | - هذا الطالب **نظيرٌ** لزميله في الاجتهاد.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Sentence example of plural 'نظائر' (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "- في الصف طلابٌ **نظائرُ** في التفوق."}]}

Annotation rationale: Provides a separate illustrative sentence using the plural noun 'نظائر' describing top students in class.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | - في الصف طلابٌ **نظائرُ** في التفوق. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Morphological pattern and diptote inflection rules (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why 'نظائر' is classified as 'صيغة منتهى الجموع' on the weight of 'فعائل' and details the syntactic consequences of being 'ممنوع من الصرف'.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### نوع الجمع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | كلمة **نظائر** على وزن **فَعائل**، وهي من **صيغة منتهى الجموع**؛ لذلك فهي غالبًا **ممنوعة من الصرف**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p9 | أي أنها: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | - لا تُنوَّن. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p11 | - تُجرّ بالفتحة بدل الكسرة إذا لم تكن مضافة أو معرفة بـ(ال). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Grammatical parsing example: nominative case (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked i'rab example for 'نظائر' functioning as a subject (فاعل مرفوع بالضمة).

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### أمثلة إعرابية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | 1. **جاءت نظائرُها.**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 |    - نظائرُ: فاعل مرفوع بالضمة. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Grammatical parsing example: accusative case (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked i'rab example for 'نظائر' functioning as an object (مفعول به منصوب بالفتحة).

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | 2. **رأيتُ نظائرَها.**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 |    - نظائرَ: مفعول به منصوب بالفتحة. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Grammatical parsing example: genitive diptote case (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked i'rab example showing 'نظائر' in the genitive case marked by fathah due to being mamnu' min al-sarf.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | 3. **بحثتُ عن نظائرَ لها.**   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 |    - نظائرَ: اسم مجرور بـ«عن» وعلامة جره الفتحة؛ لأنه ممنوع من الصرف. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Exception to diptote inflection when defined or annexed (CAVEAT)

Attributes: {"subtype": "exception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Highlights the grammatical exception where diptotes take a kasrah in the genitive when prefixed with the definite article or placed in an idafah construction.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | لكن إذا دخلت عليها **الـ** أو أُضيفت، تُجر بالكسرة: | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |
| p20 | - بحثتُ في **النظائرِ**.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | - بحثتُ عن **نظائرِ الكلماتِ**.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Summary recap of the morphological rule (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes with a concise formulaic summary of the singular-to-plural transformation and its grammatical status.

Accuracy: **not_assessed_due_to_topic_mismatch**. Accuracy is not assessed because the entire response is off-topic relative to the requested chemistry topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | إذن: **نظير ← نظائر**، وهو جمع تكسير ممنوع من الصرف. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

