# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt requested an explanation of vapour phase refining (a metallurgical refining method such as the Mond process or Van Arkel method, where a crude metal reacts to form a volatile compound that is subsequently decomposed to yield pure metal). The response misinterprets the term literally as general purification involving the vapor phase, describing physical phase-change separations—specifically sublimation of iodine, camphor, and naphthalene, and distillation of liquids.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 11
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basic principle of vapor-phase separation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines and explains the response's conception of vapor-phase purification based on volatility differences and condensation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **التنقية بالطور البخاري** هي طريقة لفصل مادة نقية عن شوائبها اعتمادًا على اختلاف المواد في قدرتها على التحول إلى بخار ثم العودة إلى صلب أو سائل. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | الفكرة الأساسية بسيطة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | &gt; بعض المواد عند تسخينها تتحول إلى بخار بسهولة، بينما تبقى الشوائب غير المتطايرة في الوعاء. ثم نُبرِّد البخار فيتحول مرة أخرى إلى مادة نقية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Illustrative scenario of purifying iodine from sand (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a hypothetical mixture of iodine and sand to illustrate how sublimation separates a volatile substance from non-volatile impurities.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## كيف تتم العملية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | تخيّل أن لدينا مادة صلبة تحتوي على شوائب، مثل **اليود** ممزوجًا بالرمل. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p6 | 1. **نسخّن الخليط بلطف.** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | 2. اليود لا ينصهر أولًا بالضرورة، بل يمكن أن يتحول مباشرة من الحالة الصلبة إلى بخار بنفسجي.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 |    وهذا يسمى **التسامي**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | 3. الرمل والشوائب غير المتطايرة لا تتحول إلى بخار، فتظل في الوعاء. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | 4. عندما يلامس بخار اليود سطحًا باردًا، يعود إلى الحالة الصلبة على شكل بلورات نقية. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | 5. نجمع البلورات، فنحصل على يود أنقى من المادة الأصلية. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Explanation of the name 'vapour phase' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the etymology and rationale behind the phrase 'vapour phase' based on temporary transition to the vapor state.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## لماذا تسمى “بالطور البخاري”؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | لأن المادة المراد تنقيتها تمر مؤقتًا في **الطور البخاري**، أي تتحول إلى بخار، ثم تُجمع بعد تكثيفها أو ترسيبها. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Experimental procedure example: Iodine purification by sublimation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a concrete laboratory-style illustrative example of purifying iodine using a container and a cold surface.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## مثال: تنقية اليود بالتسامي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - نضع خليط اليود والشوائب في إناء. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - نغطي الإناء بسطح بارد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - نسخّن الخليط. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | - يتحول اليود إلى بخار بنفسجي. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | - يبرد البخار على السطح العلوي ويترسب على شكل بلورات يود داكنة لامعة. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - تبقى الشوائب في أسفل الإناء. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Conditions and criteria for suitable substances (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Specifies the physical properties required for a substance to be purifiable by this method.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## المواد المناسبة لهذه الطريقة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | تصلح هذه الطريقة عندما تكون المادة: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | - قابلة للتبخر أو التسامي بسهولة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - لا تتحلل عند التسخين. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | - شوائبها لا تتبخر معها أو تتبخر بدرجة أقل. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Example substance: Iodine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists iodine as an example of a suitable substance under the examples heading.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | من أمثلتها: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | - اليود. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Example substance: Camphor (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists camphor as an individual example of a suitable substance.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | - الكافور. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Example substance: Naphthalene (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists naphthalene as an individual example of a suitable substance.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | - النفثالين. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Example substance: Certain organic solids (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites certain organic solids as an example category of suitable substances.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | - بعض المواد الصلبة العضوية. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Comparison between sublimation and distillation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts sublimation (solid to vapor to solid) with distillation (liquid to vapor to liquid).

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## الفرق بين التسامي والتقطير | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | - **التسامي:** مادة صلبة تتحول مباشرة إلى بخار ثم تعود صلبة، مثل اليود. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | - **التقطير:** مادة سائلة تتحول إلى بخار ثم تتكثف إلى سائل، مثل تنقية الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u11: Summary recap of the separation principle (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the overall concept and takeaway of the purification process.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | إذن، التنقية بالطور البخاري تعتمد على انتقال المادة إلى البخار ثم استعادتها في صورة أنقى، بينما تُترك الشوائب غالبًا خلفها. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

