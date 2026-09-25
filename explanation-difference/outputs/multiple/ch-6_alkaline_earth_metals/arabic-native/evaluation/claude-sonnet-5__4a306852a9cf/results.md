# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers Group 2 elements (alkaline earth metals) comprehensively, including their identity, etymology, electron configuration, periodic trends, reactions with water and oxygen, and everyday applications.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 60,
  "content_unit_kinds": {
    "CONCEPT": 8,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 60,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 7,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and Member Elements of Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies alkaline earth metals as Group 2 (IIA) elements and enumerates the six members from beryllium to radium.

Accuracy: **accurate**. Correctly states the group number and all elements belonging to the alkaline earth metals, including that radium is radioactive.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # الفلزات القلوية الترابية (Alkaline Earth Metals) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## أين تقع في الجدول الدوري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | الفلزات القلوية الترابية هي عناصر **المجموعة الثانية (IIA)** في الجدول الدوري، وتشمل: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | &#124; العنصر &#124; الرمز &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;--------&#124;-------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; البريليوم &#124; Be &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; المغنيسيوم &#124; Mg &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; الكالسيوم &#124; Ca &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; السترونشيوم &#124; Sr &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; الباريوم &#124; Ba &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; الراديوم &#124; Ra (مشع) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Etymology of the Term Alkaline Earth (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the group is named 'alkaline' (forming basic solutions with water) and 'earth' (historical term for heat-resistant mineral oxides resembling soil).

Accuracy: **accurate**. The explanation reflects the historical and chemical origins of the terms 'alkaline' and 'earth'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## لماذا سُميت بهذا الاسم؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - **&quot;قلوية&quot;**: لأنها تُشكّل محاليل قاعدية (قلوية) عند تفاعلها مع الماء | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | - **&quot;ترابية&quot;**: لأن أكاسيدها كانت تُستخرج قديمًا من التربة والصخور، وهي صلبة تشبه في طبيعتها &quot;الأتربة&quot; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Valence Electronic Configuration and +2 Ion Formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that alkaline earth metals have an ns² outer electron configuration and readily lose both electrons to form divalent (+2) cations.

Accuracy: **accurate**. The ns² valence shell and oxidation to M²⁺ cations (illustrated with Mg → Mg²⁺ + 2e⁻) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## الخصائص الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | ### 1. التركيب الإلكتروني | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | تحتوي جميع هذه العناصر على **إلكترونين في المدار الأخير** (ns²)، مما يجعلها: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | - تميل لفقد هذين الإلكترونين لتكوين أيونات موجبة الشحنة **+2** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | - مثال: Mg → Mg²⁺ + 2e⁻ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u4: Comparative Properties of Group 2 vs Group 1 Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Compares alkaline earth metals with alkali metals regarding valence electrons, reactivity, hardness, melting point, and density.

Accuracy: **accurate**. All comparative parameters (valence, reactivity, hardness, melting point, and density) between Group 2 and Group 1 are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### 2. مقارنة مع الفلزات القلوية (المجموعة الأولى) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | &#124; الخاصية &#124; الفلزات القلوية الترابية &#124; الفلزات القلوية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124;---------&#124;---------------------------&#124;-------------------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124; عدد إلكترونات التكافؤ &#124; 2 &#124; 1 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p26 | &#124; النشاط الكيميائي &#124; أقل نشاطًا &#124; أكثر نشاطًا &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p27 | &#124; الصلادة &#124; أصلب &#124; أطرى &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p28 | &#124; نقطة الانصهار &#124; أعلى &#124; أقل &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p29 | &#124; الكثافة &#124; أعلى &#124; أقل &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u5: Periodic Trends Down Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the direction of change down Group 2 for atomic radius, reactivity, ionization energy, and electronegativity.

Accuracy: **accurate**. Atomic radius and chemical reactivity increase down the group, while ionization energy and electronegativity decrease.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### 3. الاتجاهات في المجموعة (من الأعلى للأسفل) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | - ✅ يزداد **نصف القطر الذري** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | - ✅ يزداد **النشاط الكيميائي** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | - ⬇️ يقل **طاقة التأين** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | - ⬇️ تقل **الكهروسالبية** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reactivity of Group 2 Metals with Water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the reactions of alkaline earth metals with water across the group, including the balanced equation for calcium and differences in reactivity.

Accuracy: **accurate**. The balanced chemical equation and the relative reactivity descriptions (Be inert to water, Mg reacting slowly with hot water/steam, Ca and Ba reacting vigorously with cold water) are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ## التفاعلات الكيميائية المهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | ### 1. التفاعل مع الماء | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | $$Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p39 | - الكالسيوم والباريوم يتفاعلان بسهولة مع الماء البارد | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p40 | - المغنيسيوم يتفاعل ببطء (يحتاج ماء ساخن أو بخار) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p41 | - البريليوم لا يتفاعل مع الماء إطلاقًا | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Reaction of Magnesium with Oxygen (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p44", "quote": "المغنيسيوم يحترق بلهب أبيض ساطع مذهل! 🔥 (يُستخدم في الألعاب النارية والمصابيح القديمة)"}]}

Annotation rationale: Presents the combustion reaction of magnesium with oxygen, describing the bright white flame and its application in pyrotechnics and flash photography.

Accuracy: **accurate**. The reaction equation 2Mg + O2 -> 2MgO is correct, and magnesium combustion produces an intense white light historically utilized in flashbulbs and fireworks.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ### 2. التفاعل مع الأكسجين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | $$2Mg + O_2 \rightarrow 2MgO$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p44 | المغنيسيوم يحترق بلهب أبيض ساطع مذهل! 🔥 (يُستخدم في الألعاب النارية والمصابيح القديمة) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p45 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Practical Applications of Group 2 Elements (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p49", "quote": "صناعة السبائك الخفيفة (الطائرات، السيارات)، ضروري لعملية البناء الضوئي (يدخل في تركيب الكلوروفيل)"}, {"passage_id": "p50", "quote": "بناء العظام والأسنان، صناعة الإسمنت والجير"}, {"passage_id": "p51", "quote": "الألعاب النارية (تعطي ألوانًا حمراء وخضراء)"}]}

Annotation rationale: Tabulates real-world uses of magnesium, calcium, strontium, and barium in industry, biology, construction, and fireworks.

Accuracy: **accurate**. The listed applications (Mg in light alloys and chlorophyll, Ca in skeletal systems and cement, Sr/Ba producing red and green fireworks) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ## استخدامات مهمة في حياتنا | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | &#124; العنصر &#124; الاستخدام &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p48 | &#124;--------&#124;-----------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p49 | &#124; **المغنيسيوم (Mg)** &#124; صناعة السبائك الخفيفة (الطائرات، السيارات)، ضروري لعملية البناء الضوئي (يدخل في تركيب الكلوروفيل) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p50 | &#124; **الكالسيوم (Ca)** &#124; بناء العظام والأسنان، صناعة الإسمنت والجير &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p51 | &#124; **السترونشيوم والباريوم** &#124; الألعاب النارية (تعطي ألوانًا حمراء وخضراء) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p52 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Key Takeaway: Rationale for Increasing Reactivity Down Group 2 (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a summary takeaway explaining the causal mechanism behind the increase in reactivity down the group, ending with a polite social check-in.

Accuracy: **accurate**. The reasoning linking larger atomic radius and greater shielding to reduced nuclear attraction and easier valence electron loss is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | ## نقطة مهمة للتذكر 📌 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p54 | كلما نزلنا في المجموعة، **يزداد** النشاط الكيميائي لأن: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p55 | - يزداد حجم الذرة | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p56 | - تبتعد الإلكترونات الخارجية عن النواة | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p57 | - تقل قوة جذب النواة لها | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p58 | - تصبح إزالة الإلكترونين أسهل | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p59 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p60 | هل تريد أن أشرح لك نقطة معينة بتفصيل أكبر، مثل التفاعلات الكيميائية أو خصائص أحد العناصر تحديدًا؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

