# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses vapour phase refining in high school chemistry, explaining its general principle, required conditions, and standard examples (Mond and Van Arkel processes).

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 42,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "PROCEDURE": 1,
    "CAVEAT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 42,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 1,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Silver ring analogy for atomic-level purification (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "لو كان لديك خاتم فضة ثمين ووقع في بركة من الطين والرمال، كيف ستنظفه؟ ببساطة ستغسله بالماء."}]}

Annotation rationale: Introduces the challenge of atomic-level impurity mixing using an intuitive analogy of cleaning a silver ring dropped in mud, contrasting macroscopic washing with chemical separation.

Accuracy: **accurate**. The analogy accurately distinguishes superficial physical dirt from atomic-level chemical impurities to motivate vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً شغفك بالتعلم. درس اليوم ممتع وشبيه بـ &quot;خدعة سحرية&quot; كيميائية تُستخدم للحصول على معادن فائقة النقاء. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | دعنا نتخيل معاً هذا الموقف:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | لو كان لديك خاتم فضة ثمين ووقع في بركة من الطين والرمال، كيف ستنظفه؟ ببساطة ستغسله بالماء.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | لكن، ماذا لو كانت ذرات الطين **ممتزجة ومتشابكة** مع ذرات الفضة نفسها على المستوى الذري؟ هنا الماء لن ينفع، ونحتاج إلى حيلة كيميائية ذكية تسمى: **التنقية بالطور البخاري (Vapor Phase Refining)**. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Core chemical mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the metal is converted into a volatile compound that evaporates away from non-volatile impurities and is then decomposed back into the pure metal.

Accuracy: **accurate**. The explanation correctly describes the underlying principle of forming a volatile compound and subsequently decomposing it.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p6 | ### ما هي فكرة &quot;التنقية بالطور البخاري&quot; ببساطة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | الفكرة باختصار هي: **&quot;تحويل المعدن إلى غاز ليهرب من الشوائب، ثم إعادته إلى حالته الصلبة نقياً تماماً&quot;.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | نحن نعلم أن المعادن صلبة ودرجات انصهارها وغليانها عالية جداً، فكيف نجعلها تتبخر؟  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | **السر:** نحن لا نبخر المعدن نفسه بالتسخين المباشر، بل نجعله يتفاعل مع مادة كيميائية ليعطي **مُركباً غازياً يتطاير بسهولة**، تاركاً الشوائب الصلبة خلفه، ثم نقوم بتفكيك هذا الغاز لنستعيد المعدن نقياً 100%. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Two-step operational procedure of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the general two-step sequence: reaction with a reagent to form a volatile compound, followed by thermal decomposition to yield the pure element.

Accuracy: **accurate**. The procedural steps accurately represent the general methodology of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ### العملية تتم في خطوتين ذهبيتين: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | 1. **الخطوة الأولى (الهروب):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p13 |    نُفاعل الفلز غير النقي مع كاشف كيميائي مناسب عند درجة حرارة معينة، فيتكون **مركب متطاير (غاز)**، وتبقى الشوائب الصلبة مكانها لأنها لا تتفاعل. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p14 | 2. **الخطوة الثانية (العودة):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p15 |    نأخذ هذا الغاز ونسخنه لدرجة حرارة أعلى، فيتفكك (يتحلل) المركب، ويعود الفلز إلى حالته الصلبة **وهو في قمة النقاء**، ويتحرر الغاز ليعاد استخدامه من جديد. | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u4: Prerequisites and conditions for vapour phase refining (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the two essential conditions required for the method to be viable: formation of a volatile compound while impurities remain unreactive, and ease of thermal decomposition.

Accuracy: **accurate**. Both stated prerequisites are the standard criteria taught in secondary school inorganic chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p17 | ### شروط نجاح هذه الطريقة (مهمة جداً للامتحان): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | لكي تنجح هذه الطريقة، يجب أن يتوفر شرطان أساسيان: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p19 | 1. أن يتفاعل الفلز مع المادة المضافة ليعطي **مركباً متطايراً (يتحول لبخار بسهولة)**، بينما الشوائب لا تتفاعل. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p20 | 2. أن يكون هذا المركب المتطاير **سهل التفكك** بالحرارة لنستعيد الفلز بسهولة. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |

## u5: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked real-world example detailing the Mond process for nickel with specific reaction temperatures, steps, and chemical equations.

Accuracy: **accurate**. The chemical reactions, stoichiometric equations, temperature ranges (50-60 °C and ~200 °C), and intermediate (nickel tetracarbonyl) are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | ### أشهر مثالين في منهج الكيمياء: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | #### 1. طريقة موند (Mond Process) - لتنقية فلز النيكل ($Ni$): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | النيكل معدن مهم جداً في صناعة البطاريات والسبائك، ولتنقيته: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | * **الخطوة 1:** نُسخن النيكل غير النقي مع غاز أول أكسيد الكربون ($CO$) عند درجة حرارة دافئة نوعاً ما (حوالي $50^\circ C$ إلى $60^\circ C$). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 |   ينتج غاز يسمى &quot;رباعي كربونيل النيكل&quot;: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 |   $$Ni + 4CO \rightarrow Ni(CO)_4 \text{ (بخار/غاز)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 |   *(الشوائب تبقى في مكانها كراسب صلب لا قيمة له).* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | * **الخطوة 2:** نأخذ هذا الغاز ونسخنه لدرجة حرارة أعلى (حوالي $200^\circ C$). يتفكك الغاز فوراً: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 |   $$Ni(CO)_4 \rightarrow Ni \text{ (صلب ونقي جداً)} + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Van Arkel method for titanium and zirconium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked real-world example of the Van Arkel-de Boer method for purifying titanium and zirconium using iodine vapour and a heated tungsten filament.

Accuracy: **accurate**. The equations, reaction partners, tungsten filament mechanism, and temperature conditions (~1400 °C) accurately depict the Van Arkel process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p32 | #### 2. طريقة فان أركيل (Van Arkel Method) - لتنقية التيتانيوم ($Ti$) أو الزركونيوم ($Zr$): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | هذه المعادن تُستخدم في مركبات الفضاء والطائرات، لذا يجب أن تكون خالية تماماً من الشوائب (خاصة الأكسجين والنيتروجين): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | * **الخطوة 1:** نُسخن التيتانيوم غير النقي مع أبخرة **اليود ($I_2$)** في وعاء مفرغ، فيتكون غاز &quot;رباعي يوديد التيتانيوم&quot;: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 |   $$Ti + 2I_2 \rightarrow TiI_4 \text{ (غاز متطاير)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | * **الخطوة 2:** يمر هذا الغاز على سلك متوهج وساخن جداً من **التنجستن** (حرارته حوالي $1400^\circ C$).  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p37 |   يتفكك المركب على السلك، ويترسب التيتانيوم النقي فوق سلك التنجستن، بينما يتحرر اليود ليعيد الدورة: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 |   $$TiI_4 \rightarrow Ti \text{ (نقي تماماً)} + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: One-line teacher recap and concluding check (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise pedagogical summary using the metaphor of an 'invisible gaseous cloak' to reinforce the core idea, followed by a closing interactive offer.

Accuracy: **accurate**. The recap metaphor faithfully summarizes the two-step principle of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p40 | ### ملخص المعلم في سطر واحد: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | التنقية بالطور البخاري تشبه إعطاء الفلز **&quot;عباءة إخفاء غازية&quot;** تجعله يطير بعيداً عن الشوائب، ثم نزع العباءة عنه ليعود إلينا صلباً ونقياً! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p42 | هل النقطة واضحة الآن يا بطل؟ وإذا أردت، يمكنني اختبارك بسؤال سريع للتأكد من فهمك! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

