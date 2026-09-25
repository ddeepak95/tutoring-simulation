# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains vapour phase refining in Arabic, covering its fundamental principle, necessary conditions, general steps, specific industrial methods (Mond and Van Arkel), advantages, and underlying thermodynamic reasoning.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 38,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 38,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Fundamental principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the concept and definition of vapour phase refining, explaining the mechanism of converting impure metal to a volatile compound and subsequently decomposing it to recover pure metal.

Accuracy: **accurate**. Correctly defines the foundational principle of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # التنقية بالطور البخاري (التكرير بالطور الغازي) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | سأشرح لك هذا الموضوع بطريقة مبسطة، كأننا نتحدث في حصة الكيمياء. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## الفكرة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **التنقية بالطور البخاري** هي طريقة تُستخدم لتنقية المعادن من الشوائب، وتعتمد على مبدأ بسيط: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | &gt; **تحويل المعدن غير النقي إلى مركب متطاير (غازي)، ثم تحليل هذا المركب مرة أخرى للحصول على المعدن النقي** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Prerequisites and conditions for vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the two essential conditions required for a metal to undergo vapour phase refining: forming a volatile compound with an available reagent and having that compound easily decompose back into the pure metal.

Accuracy: **accurate**. Accurately lists the two standard chemical requirements for vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## الشروط الأساسية لهذه الطريقة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | لكي نستخدم هذه الطريقة، يجب توفر شرطين: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | 1. **يجب أن يتفاعل المعدن مع مادة معينة ليكوّن مركبًا متطايرًا (سهل التبخر)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 2. **يجب أن يكون هذا المركب غير مستقر، بحيث يتحلل بسهولة ليعطي المعدن النقي مرة أخرى** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: General process flow of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general schematic process flow diagram describing the sequential steps from impure metal to pure metal via thermal decomposition.

Accuracy: **accurate**. The flow diagram accurately maps the standard steps of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## خطوات العملية (بشكل عام) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | ``` | PROCEDURE | {} | [&#x27;separator&#x27;] |
| p12 | المعدن غير النقي  →  إضافة مادة مناسبة  →  مركب متطاير (بخار) | PROCEDURE | {} | [&#x27;diagram&#x27;, &#x27;prose&#x27;] |
| p13 |                                                     ↓ | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p14 | المعدن النقي  ←  التحلل الحراري  ←  تسخين المركب المتطاير | PROCEDURE | {} | [&#x27;diagram&#x27;, &#x27;prose&#x27;] |
| p15 | ``` | PROCEDURE | {} | [&#x27;separator&#x27;] |

## u4: Mond process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the industrial Mond process for nickel, providing reaction conditions, chemical equations, and highlighting carbon monoxide recycling.

Accuracy: **accurate**. The temperatures (approx 330 K and 450-470 K), chemical equations, and intermediate complex (nickel tetracarbonyl) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## مثالان مشهوران توضحان الفكرة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | ### 1️⃣ عملية &quot;مونـد&quot; (Mond Process) - لتنقية النيكل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | &#124; الخطوة &#124; التفاعل &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124;--------&#124;---------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | &#124; **الخطوة الأولى** &#124; يُمرر غاز أول أكسيد الكربون (CO) على النيكل غير النقي عند درجة حرارة حوالي 330 كلفن &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p21 | &#124; **التفاعل** &#124; Ni + 4CO → Ni(CO)₄ (رباعي كربونيل النيكل - غاز متطاير) &#124; | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;table&#x27;] |
| p22 | &#124; **الخطوة الثانية** &#124; يُسخّن هذا الغاز إلى درجة حرارة أعلى (حوالي 450-470 كلفن) &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p23 | &#124; **التفاعل** &#124; Ni(CO)₄ → Ni (نقي) + 4CO &#124; | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;table&#x27;] |
| p24 | **الملاحظة الذكية هنا:** غاز CO يتحرر مرة أخرى، فيمكن إعادة استخدامه! 🔄 | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Van Arkel method for refining titanium or zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel-de Boer method for ultra-pure titanium, including iodination and subsequent thermal decomposition on a heated tungsten filament.

Accuracy: **accurate**. Chemical reactions and steps of the Van Arkel process for titanium with iodine are correctly described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### 2️⃣ عملية &quot;فان أركل&quot; (Van Arkel Method) - لتنقية التيتانيوم أو الزركونيوم | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | &#124; الخطوة &#124; التفاعل &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p27 | &#124;--------&#124;---------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p28 | &#124; **الخطوة الأولى** &#124; يتفاعل المعدن غير النقي مع اليود &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p29 | &#124; **التفاعل** &#124; Ti + 2I₂ → TiI₄ (رباعي يوديد التيتانيوم - متطاير) &#124; | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;table&#x27;] |
| p30 | &#124; **الخطوة الثانية** &#124; يُحلَّل المركب حراريًا على سلك من التنجستن ساخن جدًا (حوالي 1400 كلفن) &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p31 | &#124; **التفاعل** &#124; TiI₄ → Ti (نقي جدًا) + 2I₂ &#124; | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;table&#x27;] |

## u6: Effectiveness and advantages of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why vapour phase refining is effective, focusing on the ultra-high purity achieved, the non-reactivity of impurities, and precise thermal control.

Accuracy: **accurate**. The stated advantages are scientifically sound and reflect the metallurgical significance of the technique.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## لماذا تعتبر هذه الطريقة فعّالة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | ✅ تعطي معدنًا **عالي النقاء جدًا** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | ✅ الشوائب لا تتفاعل لتكوين المركب المتطاير، فتبقى خلفها | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p35 | ✅ يمكن التحكم في الظروف (الحرارة) بدقة لضمان فصل تام | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Thought question on operational temperature differences (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a guided thought question and answer addressing why the first step operates at moderate/low temperatures while the decomposition step requires higher thermal energy.

Accuracy: **accurate**. The explanation appropriately conveys the thermodynamic principles behind the lower temperature for complex formation and higher temperature for endothermic thermal decomposition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p37 | **سؤال للتفكير:** هل يمكنك أن تخمن لماذا نحتاج درجة حرارة **منخفضة** في الخطوة الأولى، ودرجة حرارة **عالية** في الخطوة الثانية؟ 🤔 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p38 | (الإجابة تكمن في أن تكوين المركب المتطاير يحدث بسهولة في درجات حرارة معتدلة، بينما تحتاج كسر الرابطة في المركب &quot;لتحرير&quot; المعدن النقي إلى طاقة حرارية أكبر) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |

