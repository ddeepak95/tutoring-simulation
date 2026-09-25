# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation comprehensively covers alkaline earth metals, including their position in the periodic table, list of group members, origin of their name, atomic and chemical properties, physical traits, real-world examples, and a summary review.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 47,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 5,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 47,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 5,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of the periodic table as a residential neighborhood with element families (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "حيّ سكني"}]}

Annotation rationale: Uses a cross-domain comparison to introduce the concept of groups in the periodic table as families living in a neighborhood.

Accuracy: **accurate**. The analogy accurately conveys that columns in the periodic table group elements with similar chemical behaviors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا الدرس. تخيل أن الجدول الدوري هو عبارة عن &quot;حيّ سكني&quot; كبير، وكل عمود فيه يمثل &quot;عائلة&quot; من العناصر تتشابه في تصرفاتها وطباعها. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p2 | اليوم سنتعرف على واحدة من أشهر هذه العائلات وأكثرها نشاطاً، وهي عائلة: **الفلزات القلوية الترابية (Alkaline Earth Metals)**. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Location of alkaline earth metals in Group 2 of the periodic table (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the exact location of the alkaline earth metals as Group 2, the second column from the left immediately following the alkali metals.

Accuracy: **accurate**. Group 2 is correctly identified as the second column from the left, directly adjacent to the alkali metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### 1. أين تسكن هذه العائلة؟ (الموقع في الجدول الدوري) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | هذه العناصر تقع في **المجموعة الثانية (Group 2)**، أي أنها تشكل **العمود الثاني من جهة اليسار** في الجدول الدوري مباشرة بعد الفلزات القلوية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Members of the alkaline earth metals group (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "الموجود في الحليب وعظامنا"}]}

Annotation rationale: Lists the six elements comprising Group 2 in order of increasing atomic mass (Be, Mg, Ca, Sr, Ba, Ra).

Accuracy: **accurate**. All six Group 2 elements are correctly named and ordered from lightest to heaviest, and Marie Curie's discovery of radium is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### 2. من هم أفراد هذه العائلة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | تضم هذه المجموعة 6 عناصر، مرتبة من الأخف إلى الأثقل كالتالي: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | 1. **البريليوم (Beryllium - Be)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 2. **المغنيسيوم (Magnesium - Mg)** (أشهرهم!) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | 3. **الكالسيوم (Calcium - Ca)** (الموجود في الحليب وعظامنا) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | 4. **السترونشيوم (Strontium - Sr)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | 5. **الباريوم (Barium - Ba)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | 6. **الراديوم (Radium - Ra)** (عنصر مشع وخطير اكتشفته ماري كوري) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Etymology and historical naming of alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the group is named 'alkaline earth', relating 'alkaline' to the basic solutions formed with water (pH > 7) and 'earth' to the historical term for heat-resistant mineral oxides.

Accuracy: **accurate**. The etymological explanation correctly reflects chemical history and the basic nature of their reaction products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. سر التسمية: لماذا سميت &quot;قلوية ترابية&quot;؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | * **قلوية (Alkaline):** لأنها عندما تتفاعل مع الماء، تُنتج محاليل قلوية (قاعدية) تُعاكس الأحماض (أي أن درجة حموضتها pH أعلى من 7). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | * **ترابية (Earth):** لأن الكيميائيين القدماء كانوا يطلقون كلمة &quot;تراب&quot; على المواد غير القابلة للاشتعال والمقاومة للحرارة والتي توجد في صخور القشرة الأرضية، وأكاسيد هذه العناصر كانت تنطبق عليها هذه الصفات تماماً! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Atomic and chemical properties and reactivity trend (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the valence configuration (ns2), formation of +2 ions to attain a stable octet, high chemical reactivity, and why reactivity increases down the group as atomic size increases.

Accuracy: **accurate**. All atomic and chemical principles (ns2 configuration, +2 oxidation state, high reactivity compared to most metals, and downward reactivity trend due to atomic radius) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### 4. ما هي &quot;جيناتهم المشتركة&quot;؟ (الخصائص الذرية والكيميائية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | بما أنهم إخوة في عائلة واحدة، فهم يشتركون في صفات كيميائية مهمة جداً للامتحانات: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | * **إلكترونات التكافؤ (Valence Electrons):** يمتلك كل عنصر منها **إلكترونين اثنين فقط** في مداره الأخير ($ns^2$). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | * **تكوين الأيونات:** هدف أي ذرة هو الاستقرار (أن يصبح مدارها ممتلئاً بـ 8 إلكترونات). لذلك، يسهل على هذه العناصر **فقدان هذين الإلكترونين**، وتتحول إلى أيونات موجبة شحنتها **(+2)** مثل: $Ca^{2+}$ و $Mg^{2+}$. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 | * **النشاط الكيميائي (Reactivity):** هي عناصر **نشطة جداً** كيميائياً (لكنها أقل نشاطاً بقليل من جيرانها في المجموعة الأولى &quot;الفلزات القلوية&quot;). ولهذا السبب، **لا توجد في الطبيعة كعناصر نقية منفردة**، بل دائماً متحدة مع عناصر أخرى على شكل مركبات وصخور. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | * **قاعدة التفاعل:** كلما **نزلت إلى أسفل** المجموعة، زاد حجم الذرة، وأصبح فقدان الإلكترونين أسهل، وبالتالي **يزداد النشاط الكيميائي**. (مثلاً: الباريوم في الأسفل أنشط بكثير من المغنيسيوم في الأعلى). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Physical properties of alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes physical characteristics (silvery-white color, metallic luster, tarnishing via oxidation, density, hardness, thermal/electrical conductivity, and melting points) relative to Group 1 and transition metals.

Accuracy: **accurate**. The physical characteristics and comparisons to alkali metals (higher melting points, hardness, and density) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### 5. كيف تبدو؟ (الخصائص الفيزيائية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | * **المظهر:** فلزات صلبة، لونها أبيض فضي، ولها بريق ولمعان معدني (تفقده بسرعة إذا تعرضت للهواء بسبب تأكسدها). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | * **الصلابة والكثافة:** أكثر صلابة وكثافة من عناصر المجموعة الأولى، لكنها تظل لينة نسبياً مقارنة بالحديد أو النحاس. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | * **التوصيل:** موصلة جيدة للحرارة والكهرباء (لأنها فلزات حقيقية). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | * **درجات الانصهار والغليان:** مرتفعة نسبياً مقارنة بالمجموعة الأولى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Everyday applications of calcium in biology and industry (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p33", "quote": "هو المكون الأساسي لصلابة عظامك وأسنانك"}]}

Annotation rationale: Illustrates real-world uses of calcium in human bones, teeth, cement, and chalk.

Accuracy: **accurate**. Calcium compounds are indeed central to skeletal structure, cement, and chalk.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### 6. أين نراها في حياتنا اليومية؟ (أمثلة للربط بالواقع) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | * **الكالسيوم ($Ca$):** هو المكون الأساسي لصلابة عظامك وأسنانك، ويدخل في صناعة الإسمنت والطباشير. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Everyday applications of magnesium in chlorophyll and lightweight alloys (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p34", "quote": "قلب جزيء \"الكلوروفيل\" الأخضر في النباتات"}]}

Annotation rationale: Illustrates magnesium's biological role at the core of the chlorophyll molecule and its engineering use in aerospace and automotive alloys.

Accuracy: **accurate**. Magnesium is the central ion in chlorophyll and is widely alloyed for lightweight structural parts in aircraft and racing cars.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | * **المغنيسيوم ($Mg$):** قلب جزيء &quot;الكلوروفيل&quot; الأخضر في النباتات الذي يقوم بالبناء الضوئي. كما يُستخدم في صناعة هياكل الطائرات وسيارات السباق لأنه خفيف وقوي. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Application of strontium and barium compounds in fireworks coloration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p35", "quote": "الألعاب النارية"}]}

Annotation rationale: Illustrates how strontium produces bright red flames and barium produces green flames in pyrotechnics.

Accuracy: **accurate**. Strontium compounds reliably produce brilliant red flame emissions and barium compounds produce green flame emissions in pyrotechnics.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | * **الألعاب النارية:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 |   * مركبات **السترونشيوم** تعطي اللون **الأحمر** الساطع عند اشتعالها. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p37 |   * مركبات **الباريوم** تعطي اللون **الأخضر** الجميل. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Cheat sheet summary table of key alkaline earth metal facts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary table synthesizing key exam points: group number, valence electrons, charge, reactivity trend, and notable elements.

Accuracy: **accurate**. All properties summarized in the review table are fully correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### ملخص سريع في دقيقة (Cheat Sheet للثانوية): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | &#124; الخاصية &#124; الفلزات القلوية الترابية &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p41 | &#124; :--- &#124; :--- &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p42 | &#124; **المجموعة** &#124; المجموعة الثانية (Group 2) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p43 | &#124; **إلكترونات المدار الأخير** &#124; 2 &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p44 | &#124; **الشحنة كأيون** &#124; +2 &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p45 | &#124; **النشاط الكيميائي** &#124; عالٍ، ويزداد كلما اتجهنا لأسفل المجموعة &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p46 | &#124; **أشهر العناصر** &#124; المغنيسيوم ($Mg$) والكالسيوم ($Ca$) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p47 | أتمنى أن تكون الصورة واضحة تماماً الآن! هل لديك أي سؤال حول تفاعلاتها أو معادلات معينة تريد أن نتدرب عليها؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

