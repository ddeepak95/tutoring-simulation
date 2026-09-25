# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly addresses the requested topic by defining the covalent radius, noting how multiple bonds affect it, and explaining its applications in determining bond length and atomic size.

## Counts

```json
{
  "total_content_units": 1,
  "substantive_content_units": 1,
  "total_passages": 2,
  "content_unit_kinds": {
    "CONCEPT": 1
  },
  "nested_passages": 2,
  "unique_subtopics": 1,
  "contextualization": {
    "none": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 1
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and applications of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: The unit introduces and defines covalent radius in the context of homonuclear single bonds, qualifies its measurement for multiple bonds, and outlines its use in estimating atomic size and covalent bond lengths.

Accuracy: **accurate**. The definition provided aligns with standard chemistry curricula and IUPAC descriptions (half the internuclear distance between two identical atoms joined by a single covalent bond), and the applications described (measuring bond length and indicating atomic size) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | بالتأكيد. يسعدني أن أشرح لك نصف القطر التساهمي. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | نصف القطر التساهمي هو نصف المسافة بين نواتي ذرتين متماثلتين متحدتين برابطة تساهمية أحادية. في حالة وجود رابطة تساهمية متعددة (مزدوجة أو ثلاثية) بين الذرات، فإن نصف القطر التساهمي يقاس بطرق أخرى أكثر تعقيدًا. نصف القطر التساهمي يستخدم في تحديد الحجم الذري في الجزيئات التساهمية، وفي تحديد طول الرابطة التساهمية بين الذرات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

