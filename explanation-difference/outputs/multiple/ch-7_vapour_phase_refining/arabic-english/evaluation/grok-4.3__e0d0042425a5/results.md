# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately explains the concept and operating principle of vapour phase refining and illustrates it with the two standard industrial examples: the Mond process for nickel and the Van Arkel process for zirconium.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 13,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2
  },
  "nested_passages": 13,
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

## u1: Definition and fundamental principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the underlying two-temperature principle involving volatile compound formation and subsequent thermal decomposition.

Accuracy: **accurate**. The definition and two-stage thermal principle are correctly described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | التنقية في الطور البخاري (Vapour Phase Refining) هي طريقة من طرق تنقية المعادن، وتُستخدم مع المعادن التي يمكن تحويلها إلى مركبات متطايرة (أي تتحول بسهولة إلى بخار أو غاز عند تسخينها).  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### المبدأ الأساسي: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | يتم تحويل المعدن الخام إلى مركب غازي متطاير في درجة حرارة منخفضة نسبياً، ثم يُسخن هذا المركب في درجة حرارة أعلى فيتحلل ويعطي المعدن النقي، بينما تبقى الشوائب دون تفاعل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the steps, temperatures, and chemical reactions of the Mond process for refining nickel using carbon monoxide.

Accuracy: **accurate**. The formation of tetracarbonylnickel at 50-60°C and its thermal decomposition at 150-180°C are chemically and metallurgically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### مثال: تنقية النيكل (عملية موند - Mond’s Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 1. يُمرر غاز أول أكسيد الكربون (CO) على مسحوق النيكل الخام عند درجة حرارة 50-60°م.   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 |    يتفاعل النيكل فقط مع الغاز ويتكون مركب رباعي كربونيل النيكل Ni(CO)₄، وهو غاز متطاير.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 |    الشوائب لا تتفاعل فتبقى في المكان. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | 2. يُنقل الغاز إلى غرفة أخرى ويُسخن إلى 150-180°م، فيتحلل المركب ويعطي:   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 |    نيكل نقي جداً + غاز أول أكسيد الكربون (يُعاد استخدامه مرة أخرى). | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Van Arkel method for zirconium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Van Arkel method as a second real-world application of vapour phase refining for zirconium via its tetraiodide.

Accuracy: **accurate**. The description of zirconium reacting with iodine to form gaseous ZrI4 and decomposing at around 1800°C is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### مثال آخر: تنقية الزركونيوم (عملية فان أركل) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | يُسخن الزركونيوم الخام مع غاز اليود في درجة حرارة منخفضة فيتكون مركب رباعي يوديد الزركونيوم ZrI₄ (غاز)، ثم يُسخن هذا الغاز بشدة (حوالي 1800°م) فيتحلل ويعطي زركونيوم نقي. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Advantages and scope of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the high purity achieved by vapour phase refining and the metals typically purified this way, followed by an organizational closing offer.

Accuracy: **accurate**. The stated purity level (up to 99.99%) and the key metals listed (Ni, Ti, Zr) correctly reflect industrial practice.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | هذه الطريقة ممتازة لأنها تعطي معدن نقي جداً (تصل درجة النقاء إلى 99.99%)، وتُستخدم بشكل أساسي مع النيكل والتيتانيوم والزركونيوم.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | هل تريد أن أوضح لك أي جزء بمزيد من التفصيل أو أعطيك رسماً توضيحياً بسيطاً؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

