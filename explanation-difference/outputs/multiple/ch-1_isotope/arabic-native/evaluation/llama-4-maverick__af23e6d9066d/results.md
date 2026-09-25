# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response addresses the linguistic origin and scientific meaning of isotopes ('نظائر') in chemistry, fulfilling the requested topic.

## Counts

```json
{
  "total_content_units": 3,
  "substantive_content_units": 3,
  "total_passages": 3,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 3,
  "unique_subtopics": 2,
  "contextualization": {
    "localized": 1,
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 3
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Linguistic definition of 'نظائر' (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p1", "quote": "في اللغة العربية، تُستخدم كلمة \"نَظائر\" للدلالة على مجموعة من الأشياء التي تشترك في خاصية أو صفة معينة."}]}

Annotation rationale: States the linguistic forms and general meaning of the plural word 'نظائر' in the Arabic language.

Accuracy: **accurate**. The linguistic explanation of the plural forms and meaning of 'نظير' in Arabic is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | جمع كلمة &quot;نَظِير&quot; هو &quot;نُظَرَاء&quot; أو &quot;نَظائر&quot;. عندما نقول &quot;نَظائر&quot;، نعني بها أشياء متشابهة أو متطابقة في الصفات أو الخصائص. في اللغة العربية، تُستخدم كلمة &quot;نَظائر&quot; للدلالة على مجموعة من الأشياء التي تشترك في خاصية أو صفة معينة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Chemical isotopes as an application of 'نظائر' (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how the term 'نظائر' is applied in a specific scientific context, namely isotopes of chemical elements.

Accuracy: **accurate**. The definition of chemical isotopes having identical atomic numbers but differing atomic masses due to varying neutron counts is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | على سبيل المثال، إذا قلنا &quot;نَظائر العناصر الكيميائية&quot;، فإننا نشير إلى عناصر كيميائية لها نفس العدد الذري ولكنها تختلف في الكتلة الذرية بسبب اختلاف عدد النيوترونات في نواتها. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Summary of contextual usage of 'نظائر' (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes and summarizes the general versatility of using the term across various contexts.

Accuracy: **accurate**. The concluding summary accurately synthesizes the previous explanations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | لذا، يمكن استخدام &quot;نَظائر&quot; في سياقات مختلفة لتعبر عن أشياء متشابهة أو متماثلة في بعض الجوانب. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

