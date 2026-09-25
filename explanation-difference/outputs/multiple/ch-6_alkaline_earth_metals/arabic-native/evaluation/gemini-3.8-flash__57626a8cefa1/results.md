# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains alkaline earth metals (Group 2), covering their location, identity, etymology, key chemical characteristics, group trends, flame tests, real-world applications, and review material.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 48,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 48,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 4,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Group 2 definition, location, and list of elements (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "صديق العظام والأسنان"}]}

Annotation rationale: Introduces the group's location in the periodic table (Group 2, s-block) and identifies all six alkaline earth metals along with brief identifying facts.

Accuracy: **accurate**. Correctly states the s-block location of Group 2 elements and lists the six members (Be, Mg, Ca, Sr, Ba, Ra) accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل في عالم الكيمياء الممتع! خذ نفساً عميقاً، وتخيل معي أن الجدول الدوري هو عبارة عن &quot;حيّ سكني&quot; كبير، ونحن اليوم سنزور أحد أشهر شوارعه: **الشارع رقم 2**. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | سكان هذا الشارع يُعرفون باسم: **الفلزات القلوية الترابية (Alkaline Earth Metals)**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | دعنا نتعرف عليهم خطوة بخطوة بطريقة مبسطة ستجعلك تتفوق في اختبارك القادم بإذن الله. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### 1. من هم أفراد هذه العائلة؟ (الموقع والعناصر) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | تقع هذه العناصر في **المجموعة الثانية (Group 2)** في أقصى يسار الجدول الدوري (ضمن الفئة s)، وتضم ستة عناصر مرتبة من الأعلى إلى الأسفل كالتالي: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | 1. **البريليوم ($Be$)** - خفيف وصلب. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | 2. **المغنيسيوم ($Mg$)** - مشهور ببريقه وضوئه الأبيض الساطع. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 3. **الكالسيوم ($Ca$)** - صديق العظام والأسنان. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | 4. **السترونشيوم ($Sr$)** - نجم الألعاب النارية بلونه الأحمر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | 5. **الباريوم ($Ba$)** - يُستخدم في الفحوصات الطبية وألوان الألعاب النارية الخضراء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | 6. **الراديوم ($Ra$)** - عنصر مشع ونادر جداً اكتشفته ماري كوري. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Origin and etymology of the name alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the family is named 'alkaline earth', clarifying the meaning of 'alkaline' (forming basic solutions with water) and 'earth' (insoluble, heat-resistant oxides found in the earth's crust).

Accuracy: **accurate**. Accurately explains the historical and chemical derivation of both 'alkaline' and 'earth'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### 2. لماذا سميت بهذا الاسم الغريب؟ (سر التسمية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | الاسم ينقسم إلى جزأين: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | * **قلوية (Alkaline):** لأنها عندما تتفاعل مع الماء، تُنتج محاليل &quot;قلوية&quot; أو قاعدية (رقمها الهيدروجيني $pH &gt; 7$). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | * **ترابية (Earth):** أطلق عليها الكيميائيون القدماء هذا الاسم لأن أكاسيدها كانت توجد في القشرة الأرضية (التراب والصخور)، وكانت لا تذوب بسهولة في الماء ولا تتأثر بحرارة النار العادية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic configuration, oxidation state, and relative reactivity (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the ns^2 valence configuration, formation of +2 cations to achieve a stable octet, high general reactivity, and compares reactivity to alkali metals.

Accuracy: **accurate**. Accurately describes valence shell configuration (ns^2), the formation of +2 ions, and the comparison of reactivity with Group 1 based on ionization energy requirements.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### 3. &quot;البطاقة الشخصية&quot; الكيميائية (أهم الخصائص) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | إذا فهمت هذه النقطة، فقد فهمت نصف الدرس: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | * **التوزيع الإلكتروني:** ينتهي التوزيع الإلكتروني لجميع هذه العناصر بـ **($ns^2$)**، أي أن لديها **إلكترونين اثنين فقط** في مستوى الطاقة الخارجي (إلكترونات التكافؤ). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | * **شحنة الأيون (حالة التأكسد):** أسهل طريقة لهذه العناصر لتستقر وتصل للتركيب الثماني هي **فقدان هذين الإلكترونين**. لذلك، عندما تتفاعل، تُكوّن أيونات موجبة بشحنة **(+2)** مثل: $Ca^{2+}, Mg^{2+}$. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p23 | * **النشاط الكيميائي:** هي عناصر نشطة كيميائياً جداً (لا توجد منفردة في الطبيعة أبداً، بل متحدة في مركبات).  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 |   * *مقارنة ذكية:* هي **أقل نشاطاً** من جيرانها في المجموعة الأولى (الفلزات القلوية)؛ لأن فقدان إلكترونين يتطلب طاقة أكبر من فقدان إلكترون واحد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Trends in atomic size and chemical reactivity down Group 2 (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why atomic radius and chemical reactivity increase down the group, illustrated with differences in reactivity with water from Be to Ba.

Accuracy: **accurate**. Accurately details group trends and correctly reflects element-specific reactivity with water (Be unreactive, Mg reacting slowly with cold water/rapidly with steam, Ca and Ba reacting vigorously).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### 4. التدرج في الخصائص (كلما نزلنا لأسفل المجموعة $\downarrow$) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | تخيل أننا نتحرك من البريليوم في الأعلى نزولاً إلى الراديوم في الأسفل: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | 1. **الحجم الذري (نصف القطر):** **يزداد** (لأننا نضيف مستويات طاقة جديدة). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p29 | 2. **النشاط الكيميائي:** **يزداد**؛ كلما كبر حجم الذرة، ابتعد الإلكترونان الخارجيان عن جذب النواة، فأصبح من السهل جداً فقدانهما! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p30 |    * *مثال:* البريليوم لا يتفاعل مع الماء، المغنيسيوم يتفاعل ببطء شديد مع الماء البارد (وبسرعة مع بخار الماء)، بينما الكالسيوم والباريوم يتفاعلان بعنف مع الماء البارد! | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Flame test colors of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p33", "quote": "وتُستخدم في **الألعاب النارية**"}]}

Annotation rationale: Presents characteristic flame test colors for calcium (brick-red), strontium (crimson), and barium (apple green).

Accuracy: **accurate**. The flame colors reported for Ca, Sr, and Ba are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### 5. ألوان لهب مميزة (Flame Test) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | علماء الكيمياء يحبون هذه الفلزات لأنها تعطي ألواناً ساحرة عند حرقها، وتُستخدم في **الألعاب النارية**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p34 | * **الكالسيوم:** يعطي لهباً أحمر طوبي (Brick-red). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | * **السترونشيوم:** يعطي لهباً قرمزيًا ساطعاً (Crimson red). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 | * **الباريوم:** يعطي لهباً أخضر تفاحي (Apple green). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Everyday applications of magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p39", "quote": "يدخل في تركيب صبغة \"الكلوروفيل\" التي تجعل النباتات خضراء وتقوم بالبناء الضوئي، ويدخل في صناعة هياكل الطائرات لخفته."}]}

Annotation rationale: Illustrates real-world roles of magnesium in chlorophyll for photosynthesis and lightweight alloys for aircraft construction.

Accuracy: **accurate**. Accurately identifies magnesium's presence at the center of chlorophyll and its metallurgical use in lightweight alloys for aircraft.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### 6. أين نراها في حياتنا اليومية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | * **المغنيسيوم:** يدخل في تركيب صبغة &quot;الكلوروفيل&quot; التي تجعل النباتات خضراء وتقوم بالبناء الضوئي، ويدخل في صناعة هياكل الطائرات لخفته. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Everyday applications of calcium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p40", "quote": "يبني عظامك وأسنانك، ويدخل في صناعة الأسمنت والطباشير والرخام ($CaCO_3$)."}]}

Annotation rationale: Illustrates everyday biological and industrial occurrences of calcium (bones, teeth, cement, chalk, marble).

Accuracy: **accurate**. Accurately describes biological and industrial uses of calcium compounds.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | * **الكالسيوم:** يبني عظامك وأسنانك، ويدخل في صناعة الأسمنت والطباشير والرخام ($CaCO_3$). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Summary of alkaline earth metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise two-line recap summarizing the core properties of Group 2 elements.

Accuracy: **accurate**. The summary accurately consolidates the essential group characteristics.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ### ملخص المعلم في سطرين: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | **الفلزات القلوية الترابية هي عناصر المجموعة (2)، تحتوي على إلكترونين في مدارها الأخير، وتكوّن أيونات (+2)، فضية اللون، نشطة كيميائياً ويزداد نشاطها كلما اتجهنا لأسفل المجموعة.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Formative practice question on chemical formula formation (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Poses a practice question asking for the chemical formula formed between Ca and Cl, including a hint and closing encouragement.

Accuracy: **accurate**. The question setup and hint are chemically sound and appropriate for evaluating understanding of Group 2 valency.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | **سؤال التحدي السريع لأتأكد أنك فهمت:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | إذا تفاعل فلز الكالسيوم ($Ca$) مع غاز الكلور ($Cl$)، فما هي الصيغة الكيميائية للمركب الناتج؟  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p47 | *(تلميح: تذكر تكافؤ الكالسيوم الذي شرحناه!)*  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p48 | أنا بانتظار إجابتك! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

