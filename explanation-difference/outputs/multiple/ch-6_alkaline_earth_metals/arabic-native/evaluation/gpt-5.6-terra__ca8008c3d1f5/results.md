# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high-school level explanation of the alkaline earth metals (Group 2), covering their identity, naming origin, electron configuration, physical and chemical properties, reactivity trends, comparison to alkali metals, practical applications, the anomalous behavior of beryllium, and a summary.

## Counts

```json
{
  "total_content_units": 16,
  "substantive_content_units": 16,
  "total_passages": 129,
  "content_unit_kinds": {
    "CONCEPT": 10,
    "EXAMPLE": 4,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 129,
  "unique_subtopics": 10,
  "contextualization": {
    "none": 12,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 16
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and listing of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the group's position in Group 2 of the periodic table and lists the constituent elements.

Accuracy: **accurate**. Correctly defines alkaline earth metals as Group 2 elements and names Be, Mg, Ca, Sr, Ba, and Ra.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## الفلزات القلوية الترابية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | الفلزات القلوية الترابية هي عناصر تقع في **المجموعة الثانية** من الجدول الدوري، أي العمود الثاني من اليسار. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | عناصرها هي: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. البيريليوم **Be** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | 2. المغنيسيوم **Mg** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | 3. الكالسيوم **Ca** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | 4. السترونشيوم **Sr** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | 5. الباريوم **Ba** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 6. الراديوم **Ra** وهو عنصر مشع ونادر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Reason behind the name 'alkaline earth metals' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the group is named 'alkaline' (basic solutions from oxides/hydroxides) and 'earth' (historical term for rocky earthy minerals).

Accuracy: **accurate**. Accurately provides the historical and chemical origins of the terms alkaline and earth.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## لماذا سُمّيت بهذا الاسم؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | - **قلوية**: لأن أكاسيدها وهيدروكسيداتها تُكوّن محاليل قاعدية (قلوية) عند ذوبانها في الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p13 | - **ترابية**: لأن مركباتها كانت تُوجد قديمًا في الصخور والتربة على هيئة مواد صلبة تشبه التراب. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic configuration and valence state (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the ns^2 valence configuration and how losing 2 valence electrons leads to +2 cation formation.

Accuracy: **accurate**. Correctly states the general valence configuration ns^2 and demonstrates ionization to form M^2+ ions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## تركيبها الإلكتروني | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | جميع عناصر هذه المجموعة لها **إلكترونان في مستوى الطاقة الخارجي**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | الصيغة العامة لتركيبها الإلكتروني الخارجي هي: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | ns^2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p20 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p21 | ولهذا تميل إلى فقد إلكترونين لتصبح أيونات موجبة شحنتها \(+2\): | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p23 | \text{Mg} \rightarrow \text{Mg}^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p24 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p25 | مثال آخر: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p27 | \text{Ca} \rightarrow \text{Ca}^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p28 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p29 | لذلك تكون تكافؤاتها غالبًا **ثنائية**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Physical properties of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the shared physical characteristics of Group 2 metals, including conductivity, luster, density, and melting points.

Accuracy: **accurate**. Accurately describes physical traits and their relative comparison with alkali metals (higher hardness, density, and melting points).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## أهم خواصها الفيزيائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | الفلزات القلوية الترابية تشترك في صفات عامة، منها: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | - فلزات لامعة ذات لون فضي أو رمادي. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | - موصلة جيدة للحرارة والكهرباء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | - قابلة للطرق والسحب بدرجات متفاوتة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 | - أكثر صلابة وكثافة من الفلزات القلوية في المجموعة الأولى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | - لها درجات انصهار أعلى عمومًا من الفلزات القلوية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | مثلاً: الكالسيوم والمغنيسيوم فلزات مستخدمة كثيرًا في الصناعة والسبائك. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Formation of divalent compounds (stoichiometry) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why alkaline earth metals form divalent ionic compounds like MgCl2 rather than MgCl based on ion charges.

Accuracy: **accurate**. Correctly explains the formation of MgCl2 based on ion charges (+2 for magnesium, -1 for chloride).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ## أهم خواصها الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | ### 1. تتفاعل لتكوين أيونات موجبة ثنائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | لأنها تفقد إلكترونين بسهولة نسبيًا، فإنها تكوّن مركبات مثل: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p43 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p44 | \text{MgCl}_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p45 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p46 | وليس \(MgCl\)، لأن أيون المغنيسيوم شحنته \(+2\)، بينما أيون الكلور شحنته \(-1\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction of alkaline earth metals with oxygen (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the reaction of Group 2 metals with oxygen to produce basic metal oxides, illustrated by magnesium.

Accuracy: **accurate**. Accurately represents the oxidation reaction (2Mg + O2 -> 2MgO) and mentions the basicity of the resulting oxide.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | ### 2. التفاعل مع الأكسجين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | تتفاعل مع الأكسجين لتكوين أكاسيد: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p50 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p51 | 2Mg + O_2 \rightarrow 2MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p52 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p53 | يحترق المغنيسيوم بلهب أبيض ساطع جدًا، ولذلك لا يجب النظر إلى ضوئه مباشرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p54 | أكسيد المغنيسيوم \(MgO\) مادة قاعدية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction of alkaline earth metals with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how reactivity with water increases down the group and shows the balanced chemical reaction for calcium.

Accuracy: **accurate**. Accurately details the reactivity trend with water from Be to Ba and provides the correct balanced equation for calcium reacting with water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | ### 3. التفاعل مع الماء | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | يزداد تفاعل عناصر المجموعة الثانية مع الماء كلما اتجهنا إلى أسفل المجموعة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p58 | - **البيريليوم**: لا يتفاعل تقريبًا مع الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p59 | - **المغنيسيوم**: يتفاعل ببطء مع الماء البارد، ويتفاعل أسرع مع بخار الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p60 | - **الكالسيوم**: يتفاعل مع الماء البارد بوضوح. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p61 | - **السترونشيوم والباريوم**: تفاعلهما أقوى وأسرع. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p62 | مثال تفاعل الكالسيوم مع الماء: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p63 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p64 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p65 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | ينتج: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p67 | - هيدروكسيد الكالسيوم، وهو قاعدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p68 | - غاز الهيدروجين. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p69 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Reaction of alkaline earth metals with acids (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the reaction of Group 2 metals with acids to release hydrogen gas and form metal salts.

Accuracy: **accurate**. Accurately presents the single-displacement reaction of magnesium with hydrochloric acid producing MgCl2 and H2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p70 | ### 4. التفاعل مع الأحماض | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p71 | تتفاعل مع الأحماض مطلقة غاز الهيدروجين: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p72 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p73 | Mg + 2HCl \rightarrow MgCl_2 + H_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p74 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p75 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Reactivity trend down the group and its rationale (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical reactivity increases down Group 2 in terms of atomic size, valence electron distance, and ionization ease.

Accuracy: **accurate**. Accurately articulates the trend in reactivity and links it correctly to atomic radius, shielding, and ease of losing electrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p76 | ## التدرج في النشاط الكيميائي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p77 | كلما نزلنا من أعلى المجموعة إلى أسفلها يزداد النشاط الكيميائي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p78 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p79 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p80 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p81 | ### السبب | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p82 | عند النزول إلى أسفل المجموعة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p83 | - يزداد حجم الذرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p84 | - تبتعد إلكترونات التكافؤ عن النواة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p85 | - يصبح فقد الإلكترونين أسهل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p86 | لذلك يكون الباريوم أنشط من المغنيسيوم، ويكون الكالسيوم أنشط من المغنيسيوم. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p87 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Comparison between alkali and alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Compares Group 1 and Group 2 elements across group number, valence electrons, ion charge, and reactivity.

Accuracy: **accurate**. Accurately contrasts Group 1 and Group 2 elements across key chemical and physical parameters.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p88 | ## مقارنة مع الفلزات القلوية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | &#124; وجه المقارنة &#124; الفلزات القلوية &#124; الفلزات القلوية الترابية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p90 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p91 | &#124; المجموعة &#124; الأولى &#124; الثانية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p92 | &#124; إلكترونات التكافؤ &#124; إلكترون واحد &#124; إلكترونان &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p93 | &#124; شحنة الأيون &#124; \(+1\) &#124; \(+2\) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p94 | &#124; النشاط الكيميائي &#124; أعلى عمومًا &#124; أقل من القلوية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p95 | &#124; مثال &#124; الصوديوم Na &#124; المغنيسيوم Mg &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p96 | مثلاً، الصوديوم يفقد إلكترونًا واحدًا، بينما المغنيسيوم يفقد إلكترونين. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p97 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Applications and occurrence of magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p100", "quote": "- يدخل في صناعة السبائك الخفيفة للطائرات والسيارات."}, {"passage_id": "p101", "quote": "- يوجد في الكلوروفيل، الصبغة الخضراء في النبات."}]}

Annotation rationale: Illustrates real-world uses of magnesium in alloys, chlorophyll, and pyrotechnics.

Accuracy: **accurate**. Accurately identifies major real-world roles of magnesium (lightweight structural alloys, plant chlorophyll, and white flares/fireworks).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p98 | ## أمثلة مهمة واستخداماتها | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | ### المغنيسيوم Mg | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p100 | - يدخل في صناعة السبائك الخفيفة للطائرات والسيارات. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p101 | - يوجد في الكلوروفيل، الصبغة الخضراء في النبات. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p102 | - يُستخدم في الألعاب النارية والمشاعل بسبب ضوئه الأبيض الساطع. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u12: Applications and occurrence of calcium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p104", "quote": "- مهم جدًا لبناء العظام والأسنان."}]}

Annotation rationale: Illustrates real-world occurrences and uses of calcium in bones, limestone/chalk, and construction materials.

Accuracy: **accurate**. Accurately lists calcium's biological role in bones and teeth and mineral presence as CaCO3, along with construction uses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p103 | ### الكالسيوم Ca | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p104 | - مهم جدًا لبناء العظام والأسنان. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p105 | - يوجد في الحجر الجيري والرخام والطباشير على هيئة كربونات الكالسيوم: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p106 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | CaCO_3 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | - يدخل في صناعة الإسمنت والجص. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u13: Applications of barium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p111", "quote": "- تُستخدم بعض مركباته في الألعاب النارية لإعطاء لون أخضر."}]}

Annotation rationale: Illustrates barium applications in pyrotechnics and medical imaging.

Accuracy: **accurate**. Accurately describes the use of barium salts for green flame pyrotechnics and insoluble BaSO4 as an X-ray contrast agent.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | ### الباريوم Ba | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p111 | - تُستخدم بعض مركباته في الألعاب النارية لإعطاء لون أخضر. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p112 | - كبريتات الباريوم \(BaSO_4\) تُستخدم في بعض الفحوصات الطبية لتصوير الجهاز الهضمي بالأشعة السينية، لأنها لا تذوب في الماء. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u14: Applications of strontium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p114", "quote": "- تُستخدم أملاحه في الألعاب النارية لإنتاج اللون الأحمر."}]}

Annotation rationale: Illustrates strontium's primary use in pyrotechnics for red fireworks.

Accuracy: **accurate**. Correctly states that strontium salts produce red flame coloration in fireworks.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p113 | ### السترونشيوم Sr | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p114 | - تُستخدم أملاحه في الألعاب النارية لإنتاج اللون الأحمر. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p115 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Anomalous behavior and special case of beryllium (CAVEAT)

Attributes: {"subtype": "exception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies beryllium as an exception within Group 2 due to its small size, lower reactivity, and unique covalent tendencies.

Accuracy: **accurate**. Accurately notes the anomalous behavior of beryllium due to its small size and resulting chemical differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p116 | ## ملاحظة مهمة عن البيريليوم | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | البيريليوم يختلف قليلًا عن بقية عناصر المجموعة لأنه: | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |
| p118 | - صغير الحجم جدًا. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p119 | - أقل تفاعلًا. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p120 | - كثير من مركباته لها صفات مختلفة عن بقية عناصر المجموعة. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;list&#x27;] |
| p121 | لذلك عند دراسة خواص المجموعة الثانية، يُعد البيريليوم حالة خاصة نسبيًا. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |
| p122 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Quick recap of alkaline earth metal essentials (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recapitulates the main takeaways about alkaline earth metals for study review.

Accuracy: **accurate**. Accurately summarizes the fundamental attributes of Group 2 metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p123 | ## خلاصة سريعة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p124 | - الفلزات القلوية الترابية تقع في **المجموعة الثانية**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p125 | - لديها **إلكترونان في الغلاف الخارجي**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p126 | - تفقد إلكترونين وتكوّن أيونات بشحنة **\(2+\)**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p127 | - تزداد فعاليتها الكيميائية كلما اتجهنا إلى أسفل المجموعة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p128 | - تكوّن أكاسيد وهيدروكسيدات قاعدية. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p129 | - من أهم عناصرها: **المغنيسيوم والكالسيوم**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

