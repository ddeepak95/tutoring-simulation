# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses the requested topic of covalent radius, covering its definition, an example calculation with chlorine, and periodic trends.

## Counts

```json
{
  "total_content_units": 3,
  "substantive_content_units": 3,
  "total_passages": 4,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1
  },
  "nested_passages": 4,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 3
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what covalent radius is as half the internuclear distance between two identical covalently bonded atoms.

Accuracy: **accurate**. The definition provided is standard and chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | نصف القطر التساهمي هو مقياس لحجم الذرة عندما تكون مرتبطة بذرة أخرى برابطة تساهمية. يُعرَّف بأنه نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين برابطة تساهمية واحدة.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Calculation for Cl2 and estimating bond lengths (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the definition to the chlorine molecule (Cl2) with specific numerical values and shows how covalent radii are used to predict bond lengths.

Accuracy: **accurate**. The internuclear distance in a Cl2 molecule is approximately 198 pm, yielding a single-bond covalent radius of 99 pm, and the addition of covalent radii is a standard approximation for heteronuclear bond lengths.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | مثال: في جزيء الكلور Cl₂ تكون المسافة بين النواتين 198 بيكومتر، فيكون نصف القطر التساهمي للكلور 99 بيكومتر. يُستخدم لتقدير طول الرابطة بين ذرتين مختلفتين بجمع نصفي قطرهما التساهميين.   | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how and why the covalent radius changes across periods and down groups in the periodic table, and absorbs the concluding tag passage.

Accuracy: **accurate**. The explanation correctly identifies that covalent radius decreases across a period due to increasing effective nuclear charge and increases down a group due to the addition of principal energy levels.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | يقل نصف القطر التساهمي عبر الدورة في الجدول الدوري بسبب زيادة الشحنة النووية الفعالة، ويزداد نزولاً في المجموعة بسبب إضافة مستويات طاقة.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | \confidence{80} | OTHER | {} | [&#x27;prose&#x27;] |

