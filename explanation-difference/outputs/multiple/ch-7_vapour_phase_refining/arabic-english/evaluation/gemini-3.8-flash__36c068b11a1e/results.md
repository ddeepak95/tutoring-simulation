# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains vapour phase refining in Arabic, including the general principle, underlying conditions, and the two classic examples (Mond process and Van Arkel process).

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 40,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 40,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 1,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Clothes washing analogy for vapour phase refining (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "تخيل أن لديك قطعة ملابس ثمينة، لكن التصق بها الكثير من الطين والأوساخ."}]}

Annotation rationale: Uses a hypothetical cross-domain comparison of evaporating dirty clothes leaving dirt behind to illustrate how vapour phase refining separates impurities from metal.

Accuracy: **accurate**. The analogy serves as an intuitive illustrative comparison for conceptual understanding without introducing scientific inaccuracies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا الدرس. اعتبرني أستاذ الكيمياء الخاص بك، وسترى أن الفكرة في غاية البساطة والذكاء. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | درسنا اليوم هو عن: **تنقية المعادن في الطور البخاري (Vapour Phase Refining)**. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### الفكرة العامة (التشبيه الذكي): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | تخيل أن لديك قطعة ملابس ثمينة، لكن التصق بها الكثير من الطين والأوساخ. الطريقة العادية هي غسلها بالماء (طرق التنقية التقليدية).  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | لكن في **&quot;تنقية الطور البخاري&quot;**، نحن نقوم بحيلة سحرية:  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | نحول قطعة الملابس إلى &quot;بخار&quot; يطير في الهواء ويترك كل الأوساخ مكانها على الأرض، ثم في غرفة أخرى نُعيد هذا البخار ليتكثف ويصبح قطعة ملابس جديدة ونظيفة بنسبة 100%! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Scientific mechanism and conditions of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two fundamental steps of vapour phase refining (conversion to a volatile compound and thermal decomposition) as well as the two essential requirements for the process.

Accuracy: **accurate**. Correctly states the two fundamental requirements and two operational stages of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### كيف تعمل هذه الطريقة علمياً؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | في هذه الطريقة، نحصل على معدن نقي جداً (خالٍ تماماً من الشوائب) عبر **خطوتين أساسيتين**: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | 1. **الخطوة الأولى (التبخير):** نأخذ المعدن غير النقي، وندعه يتفاعل مع مادة كيميائية (كاشف) عند درجة حرارة معينة، ليعطينا **مركباً متطايراً (يتحول إلى غاز/بخار بسهولة)**، بينما تبقى الشوائب صلبة ولا تتفاعل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. **الخطوة الثانية (التفكيك):** نأخذ هذا الغاز إلى مكان آخر، ونسخنه لدرجة حرارة أعلى، فيتفكك المركب، ونستعيد **المعدن النقي** ويهرب الغاز الآخر لنستخدمه مرة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | **شرطان أساسيان لنجاح هذه الطريقة:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | 1. أن يتفاعل المعدن مع مادة ليعطي مركباً متطايراً بسهولة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 2. أن يكون هذا المركب سهل التفكك عند تسخينه لنسترجع المعدن. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the industrial Mond process step-by-step with chemical equations, specific reaction conditions, and decomposition temperatures.

Accuracy: **accurate**. The reaction equations and temperature ranges (formation of Ni(CO)4 at 50-60 °C and decomposition at 180-200 °C) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### أشهر مثالين في منهج الكيمياء (مهمان جداً للامتحان!): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | #### 1. عملية موند (Mond Process) - لتنقية عنصر النيكل ($Ni$): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | * **الخطوة 1:** نأخذ النيكل غير النقي ونسخنه مع غاز أول أكسيد الكربون ($CO$) عند درجة حرارة دافئة نوعاً ما (حوالي $50-60$ درجة مئوية). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 |   * يتكون غاز يسمى &quot;رباعي كربونيل النيكل&quot;: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 |     $$Ni + 4CO \rightarrow Ni(CO)_4 \text{ (غاز)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 |   * الشوائب لا تتفاعل وتبقى في مكانها. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | * **الخطوة 2:** نأخذ هذا الغاز ونسخنه لدرجة حرارة أعلى (حوالي $180-200$ درجة مئوية). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |   * يتفكك الغاز، ويسقط **النيكل النقي** كمادة صلبة، ويتحرر غاز $CO$: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 |     $$Ni(CO)_4 \rightarrow Ni \text{ (نقي)} + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Van Arkel method for zirconium/titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked real-world example detailing the Van Arkel method using iodine, including the formation of volatile iodide and decomposition on a red-hot tungsten filament.

Accuracy: **accurate**. The reaction equations, reagent (I2), and decomposition conditions (electrically heated tungsten filament at ~1800 °C) are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | #### 2. طريقة فان أركيل - دي بوير (Van Arkel Method) - لتنقية التيتانيوم ($Ti$) أو الزركونيوم ($Zr$): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | تُستخدم هذه الطريقة مع المعادن التي نحتاجها فائقة النقاء مثل التي تُستخدم في صناعة الطائرات والمفاعلات الفضائية. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | * **الخطوة 1:** نأخذ الزركونيوم أو التيتانيوم غير النقي ونسخنه في وعاء مفرغ مع **اليود ($I_2$)**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |   * يتكون غاز يوديد المعدن المتطاير: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 |     $$Zr + 2I_2 \rightarrow ZrI_4 \text{ (غاز)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | * **الخطوة 2:** يمر هذا الغاز على سلك رفيع جداً ومشتعل من معدن &quot;التنجستن&quot; (مسخن لكهرباء تصل لـ $1800$ درجة مئوية). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 |   * عند ملامسة الغاز للسلك فائق الحرارة، يتفكك فوراً، ويترسب **الزركونيوم النقي 100%** على السلك، بينما يعود اليود ليتطاير ونعيد استخدامه: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 |     $$ZrI_4 \rightarrow Zr \text{ (نقي)} + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Lesson recap and concluding check-in (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential process flow and maps each metal to its corresponding refining method for rapid high school exam review.

Accuracy: **accurate**. The summary accurately captures the core flow and matches the metals to their respective processes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | ### ملخص الدرس في ثوانٍ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | تنقية الطور البخاري تعتمد على: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p37 | **معدن غير نقي $\leftarrow$ يتحول لغاز متطاير (الشوائب تتخلف) $\leftarrow$ تسخين عالي $\leftarrow$ معدن فائق النقاوة.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p38 | * **النيكل** $\leftarrow$ نستخدم **عملية موند** (باستخدام غاز $CO$). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p39 | * **التيتانيوم والزركونيوم** $\leftarrow$ نستخدم **طريقة فان أركيل** (باستخدام اليود $I_2$). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p40 | هل النقطة واضحة الآن، أم تحب أن نوضح أي معادلة منها أكثر؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

