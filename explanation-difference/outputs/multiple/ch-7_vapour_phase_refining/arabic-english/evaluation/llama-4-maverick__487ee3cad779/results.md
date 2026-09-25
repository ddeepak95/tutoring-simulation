# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains vapour phase refining in Arabic, covering its definition, core steps, the Mond process for nickel with chemical equations, and its advantages.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 11,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 1
  },
  "nested_passages": 11,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and core principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces vapour phase refining, listing metals typically refined by this method (Ni, Zr, Ti) and explaining the basic underlying mechanism of converting metal to a volatile compound and decomposing it.

Accuracy: **accurate**. Correctly defines vapour phase refining and names typical industrial metals refined using this technique.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | عفواً، سأشرح عملية التكرير بالطور البخاري (Vapour Phase Refining) باللغة العربية. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | التكرير بالطور البخاري هي عملية تستخدم لتنقية المعادن وتكريرها، وخاصةً النيكل والزركونيوم والتيتانيوم. تتم هذه العملية عن طريق تحويل المعدن إلى مركب متطاير (volatile compound)، ثم يتم فصل الشوائب عن المركب المتطاير، وأخيراً يتم تفكيك المركب المتطاير إلى معدن نقي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: General procedure for vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the three sequential steps involved in vapour phase refining: formation of volatile compound, separation of non-volatile impurities, and thermal decomposition back to pure metal.

Accuracy: **accurate**. The procedural steps accurately reflect the requirements and thermal conditions of vapour phase refining (including Mond process parameters).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | الخطوات الرئيسية للتكرير بالطور البخاري: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | 1. **تحويل المعدن إلى مركب متطاير**: يتم تسخين المعدن في وجود غاز يتفاعل معه ليشكل مركبًا متطايرًا. على سبيل المثال، في حالة النيكل، يتفاعل النيكل مع أول أكسيد الكربون (CO) ليشكل نيكل كربونيل (Ni(CO)4)، وهو مركب متطاير. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p5 | 2. **فصل الشوائب**: يتم فصل المركب المتطاير عن الشوائب التي لا تتطاير. يتم ذلك غالبًا عن طريق التبخر أو التسامي (Sublimation)، حيث يتحول المركب مباشرة من الحالة الصلبة إلى الحالة الغازية. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | 3. **تفكيك المركب المتطاير**: بعد فصل الشوائب، يتم تسخين المركب المتطاير إلى درجة حرارة أعلى، مما يؤدي إلى تفكيكه إلى المعدن النقي والغاز الأصلي. على سبيل المثال، نيكل كربونيل (Ni(CO)4) عند تسخينه إلى حوالي 230 درجة مئوية، يتحلل إلى نيكل نقي وأول أكسيد الكربون. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Chemical equations for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the specific chemical equations for the formation and decomposition of nickel tetracarbonyl during the Mond process.

Accuracy: **accurate**. Both balanced chemical equations for the forward volatile complex formation and reverse thermal decomposition are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | المعادلات الكيميائية لعملية تكرير النيكل بالطور البخاري: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | Ni (s) + 4CO (g) → Ni(CO)4 (g) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | Ni(CO)4 (g) → Ni (s) + 4CO (g) | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Significance and prerequisites of the technique (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the method is used (high purity output) and its key requirement (metals forming readily volatile compounds).

Accuracy: **accurate**. Correctly states the primary rationale and prerequisite conditions for employing vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | تُستخدم هذه الطريقة لأنها تنتج معادن ذات نقاوة عالية، وهي مناسبة بشكل خاص للمعادن التي تشكل مركبات متطايرة بسهولة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | أتمنى أن يكون الشرح واضحًا ومفيدًا. إذا كان لديك أي أسئلة إضافية، فلا تتردد في طرحها. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

