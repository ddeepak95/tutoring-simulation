# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high-school level explanation of Group 2 elements (the alkaline earth metals) in Arabic, covering all fundamental aspects of the requested topic.

## Counts

```json
{
  "total_content_units": 16,
  "substantive_content_units": 16,
  "total_passages": 130,
  "content_unit_kinds": {
    "CONCEPT": 10,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 130,
  "unique_subtopics": 10,
  "contextualization": {
    "everyday": 6,
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 16
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction, Etymology, and Members of Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p14", "quote": "التطبيقات اليومية"}]}

Annotation rationale: Defines alkaline earth metals as Group 2 elements, explains the historical and chemical reasons for their name ('alkaline' due to basic oxides/hydroxides, 'earth' due to occurrence in the earth's crust), and lists the constituent elements with a caveat about radium.

Accuracy: **accurate**. The definition, etymology of 'alkaline' and 'earth', list of Group 2 elements, and radioactive nature of radium are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## الفلزات القلوية الترابية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | الفلزات القلوية الترابية هي عناصر تقع في **المجموعة الثانية** من الجدول الدوري، أي في العمود الثاني من اليسار. سُمّيت: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | - **قلوية** لأن أكاسيدها وهيدروكسيداتها تعطي محاليل قاعدية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p4 | - **ترابية** لأن كثيرًا من مركباتها توجد في القشرة الأرضية على شكل معادن صلبة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p5 | ### عناصرها | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | &#124; الرمز &#124; العنصر &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; Be &#124; البيريليوم &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; Mg &#124; المغنيسيوم &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; Ca &#124; الكالسيوم &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; Sr &#124; السترونشيوم &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &#124; Ba &#124; الباريوم &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p13 | &#124; Ra &#124; الراديوم &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p14 | &gt; الراديوم عنصر مشع ونادر، لذلك لا يُستخدم كثيرًا في التطبيقات اليومية. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Electronic Configuration and Oxidation State of Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that alkaline earth metals have valence configuration ns^2 and tend to lose two electrons to form dipositive cations M^2+, resulting in a characteristic +2 oxidation state.

Accuracy: **accurate**. The ns^2 outer electron configuration, the ionization to M^2+, the magnesium illustration, and the common +2 oxidation state are accurately presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## 1. التركيب الإلكتروني | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | تمتلك جميع الفلزات القلوية الترابية **إلكترونين في مستوى الطاقة الخارجي**، لذلك يكون تركيبها الخارجي العام: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | ns^2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p20 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p21 | ولهذا تميل إلى فقد إلكترونين لتكوين أيونات موجبة شحنتها \(+2\): | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | M \rightarrow M^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p24 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | مثال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | لذلك تكون حالة التأكسد الشائعة جدًا لهذه العناصر هي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | +2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Physical Properties of Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the physical characteristics of Group 2 metals, including luster, conductivity, density, hardness, melting points relative to Group 1, and appearance.

Accuracy: **accurate**. The physical properties listed (silvery-white color, electrical and thermal conductivity, higher hardness, density, and melting points than Group 1) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ## 2. الخصائص الفيزيائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | الفلزات القلوية الترابية تشترك في عدد من الصفات: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p36 | - فلزات لامعة عند قطعها حديثًا. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | - جيدة التوصيل للحرارة والكهرباء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | - أصلب وأعلى كثافة من الفلزات القلوية في المجموعة الأولى، مثل الصوديوم والبوتاسيوم. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 | - لها درجات انصهار أعلى عمومًا من الفلزات القلوية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | - لونها غالبًا أبيض فضي. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | لكنها لا توجد غالبًا حرة في الطبيعة بسبب نشاطها الكيميائي، بل توجد في صورة مركبات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Chemical Reactivity Trends in Group 2 (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why alkaline earth metals are less reactive than alkali metals and why reactivity increases down the group from beryllium to barium based on atomic radius and shielding.

Accuracy: **accurate**. The reactivity trend (Be < Mg < Ca < Sr < Ba) and the theoretical explanation (outer electrons further from the nucleus, easier to remove) are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ## 3. النشاط الكيميائي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | هذه العناصر نشطة كيميائيًا، لكنها **أقل نشاطًا من الفلزات القلوية** في المجموعة الأولى؛ لأن فقد إلكترونين أصعب من فقد إلكترون واحد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p45 | ### يزداد نشاطها الكيميائي عند النزول إلى أسفل المجموعة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p47 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p48 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p49 | والسبب هو أن الإلكترونات الخارجية تصبح أبعد عن النواة، فيسهل فقدها. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p50 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reaction of Alkaline Earth Metals with Water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the varying reaction rates with water across the group (passivation in Be, slow reaction in Mg, vigorous in Ca/Sr/Ba) and provides the balanced equation for calcium reacting with water.

Accuracy: **accurate**. The reaction details, Be passivation by oxide layer, Mg behavior with cold water vs steam, and the balanced equation Ca + 2H2O -> Ca(OH)2 + H2 are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | ## 4. تفاعلها مع الماء | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | تختلف سرعة تفاعلها مع الماء: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p53 | - **البيريليوم Be:** لا يتفاعل تقريبًا مع الماء بسبب وجود طبقة أكسيد واقية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p54 | - **المغنيسيوم Mg:** يتفاعل ببطء مع الماء البارد، وأسرع مع الماء الساخن أو البخار. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p55 | - **الكالسيوم Ca والسترونشيوم Sr والباريوم Ba:** تتفاعل بسهولة مع الماء البارد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p56 | مثال تفاعل الكالسيوم مع الماء: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | ينتج: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | - هيدروكسيد الكالسيوم، وهو مادة قاعدية. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p62 | - غاز الهيدروجين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p63 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction of Alkaline Earth Metals with Oxygen and Basic Oxides (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the oxidation of alkaline earth metals to form basic metal oxides, the bright white flame of magnesium combustion, and the hydration of basic oxides to hydroxides.

Accuracy: **accurate**. The combustion reaction 2Mg + O2 -> 2MgO, the formation of basic oxides, and CaO + H2O -> Ca(OH)2 are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p64 | ## 5. تفاعلها مع الأكسجين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p65 | تتفاعل هذه الفلزات مع الأكسجين لتكوين أكاسيد فلزية: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p66 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p67 | 2Mg + O_2 \rightarrow 2MgO | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p68 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p69 | عند احتراق المغنيسيوم، يصدر ضوء أبيض شديد السطوع، لذلك لا يجب النظر إليه مباشرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p70 | أكاسيدها غالبًا قاعدية، مثل: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p71 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p72 | CaO + H_2O \rightarrow Ca(OH)_2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p73 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p74 | حيث يتكون هيدروكسيد الكالسيوم، وهو قاعدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p75 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction of Alkaline Earth Metals with Acids (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the general reaction of alkaline earth metals with dilute acids to produce salts and hydrogen gas, illustrated by the reaction of magnesium with hydrochloric acid.

Accuracy: **accurate**. The reaction of Group 2 metals with dilute acid to form salt and hydrogen gas, specifically Mg + 2HCl -> MgCl2 + H2, is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p76 | ## 6. تفاعلها مع الأحماض | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p77 | تتفاعل مع الأحماض المخففة مكوّنة ملحًا وغاز الهيدروجين. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p78 | مثال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p79 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | Mg + 2HCl \rightarrow MgCl_2 + H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | وهنا يتكون كلوريد المغنيسيوم وغاز الهيدروجين. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p83 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Natural Occurrence and Important Minerals of Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p86", "quote": "الحجر الجيري والرخام والطباشير"}, {"passage_id": "p87", "quote": "الجبس"}, {"passage_id": "p88", "quote": "ماء البحر"}]}

Annotation rationale: Presents key mineral sources and naturally occurring compounds of alkaline earth metals such as limestone, gypsum, barite, dolomite, and seawater magnesium chloride.

Accuracy: **accurate**. The listed minerals (CaCO3 in limestone/marble/chalk, CaSO4 in gypsum, MgCl2 in sea water, BaSO4 in barite, and dolomite) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p84 | ## 7. أهم المركبات الموجودة في الطبيعة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p85 | لا توجد هذه العناصر غالبًا بصورة حرة، بل في مركبات مثل: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p86 | - **كربونات الكالسيوم** \(CaCO_3\): موجودة في الحجر الجيري والرخام والطباشير. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p87 | - **كبريتات الكالسيوم** \(CaSO_4\): توجد في الجبس. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p88 | - **كلوريد المغنيسيوم** \(MgCl_2\): يوجد في ماء البحر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p89 | - **كبريتات الباريوم** \(BaSO_4\): معدن الباريت. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p90 | - **دولوميت**: يحتوي على كربونات الكالسيوم والمغنيسيوم. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p91 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Flame Test Colors of Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents characteristic flame emissions for Group 2 cations (Ca: brick red, Sr: crimson, Ba: apple green, Mg: brilliant white combustion light) and their qualitative diagnostic use.

Accuracy: **accurate**. The flame colors attributed to Ca, Sr, and Ba, as well as the white light note for magnesium burning, match standard chemistry references.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p92 | ## 8. ألوان اللهب | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | تتميز بعض أيونات هذه العناصر بأنها تعطي ألوانًا مميزة عند تسخينها في اللهب: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p94 | &#124; العنصر &#124; لون اللهب &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p95 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p96 | &#124; الكالسيوم Ca &#124; أحمر قرميدي أو برتقالي محمر &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p97 | &#124; السترونشيوم Sr &#124; أحمر قرمزي &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p98 | &#124; الباريوم Ba &#124; أخضر تفاحي &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p99 | &#124; المغنيسيوم Mg &#124; ضوء أبيض ساطع عند الاحتراق &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p100 | يُستخدم اختبار اللهب للمساعدة في التعرف إلى هذه العناصر في المختبر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p101 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Practical Applications and Uses of Magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p104", "quote": "يدخل في صناعة سبائك خفيفة للطائرات والسيارات."}, {"passage_id": "p105", "quote": "يستخدم في الألعاب النارية والمشاعل"}]}

Annotation rationale: Gives concrete real-world applications of magnesium in lightweight alloys, pyrotechnics, and its biological role in chlorophyll.

Accuracy: **accurate**. Magnesium's uses in aerospace/automotive alloys, fireworks/flares, and its presence in chlorophyll are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p102 | ## 9. استخدامات مهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p103 | ### المغنيسيوم \(Mg\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p104 | - يدخل في صناعة سبائك خفيفة للطائرات والسيارات. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p105 | - يستخدم في الألعاب النارية والمشاعل بسبب ضوئه الأبيض الشديد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p106 | - عنصر ضروري للنبات؛ لأنه يدخل في تركيب الكلوروفيل. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u11: Practical Applications and Uses of Calcium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p108", "quote": "ضروري لبناء العظام والأسنان."}, {"passage_id": "p109", "quote": "يدخل في صناعة الإسمنت والجير."}]}

Annotation rationale: Gives practical real-world applications of calcium in biological structures (bones/teeth), cement/lime manufacturing, and water treatment.

Accuracy: **accurate**. The biological and industrial applications of calcium and calcium hydroxide are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p107 | ### الكالسيوم \(Ca\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p108 | - ضروري لبناء العظام والأسنان. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p109 | - يدخل في صناعة الإسمنت والجير. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p110 | - يستخدم هيدروكسيد الكالسيوم في معالجة المياه وصناعة الملاط. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u12: Practical Applications and Uses of Strontium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p112", "quote": "يستخدم في الألعاب النارية لإنتاج اللون الأحمر."}]}

Annotation rationale: Highlights the main real-world application of strontium compounds in producing red coloration in fireworks.

Accuracy: **accurate**. Strontium compounds are standardly used in pyrotechnics to create red flames.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p111 | ### السترونشيوم \(Sr\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p112 | - يستخدم في الألعاب النارية لإنتاج اللون الأحمر. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u13: Practical Applications and Uses of Barium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p114", "quote": "تستخدم كبريتات الباريوم في بعض الفحوص الطبية للجهاز الهضمي؛ لأنها لا تذوب بسهولة ولا يمتصها الجسم."}, {"passage_id": "p115", "quote": "يستخدم في الألعاب النارية لإنتاج اللون الأخضر."}]}

Annotation rationale: Illustrates applications of barium, specifically insoluble BaSO4 as a contrast agent in digestive imaging and barium salts in green fireworks.

Accuracy: **accurate**. The use of barium sulfate in gastrointestinal radiography (barium meal) and barium compounds in green pyrotechnics is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p113 | ### الباريوم \(Ba\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p114 | - تستخدم كبريتات الباريوم في بعض الفحوص الطبية للجهاز الهضمي؛ لأنها لا تذوب بسهولة ولا يمتصها الجسم. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p115 | - يستخدم في الألعاب النارية لإنتاج اللون الأخضر. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u14: Practical Applications and Toxicity of Beryllium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the specialized aerospace and precision instrument applications of beryllium along with a safety caveat about its toxicity.

Accuracy: **accurate**. Beryllium's niche use in aerospace alloys and precision instruments, as well as the significant toxicity of its compounds, are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p116 | ### البيريليوم \(Be\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | - يستخدم في صناعات متخصصة، مثل بعض أجزاء الطائرات والأجهزة الدقيقة. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p118 | - مركباته سامة، لذا يجب التعامل معه بحذر. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p119 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Comparative Properties of Alkali and Alkaline Earth Metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Compares Group 1 and Group 2 elements across key parameters: valence electrons, cations formed, chemical reactivity, and density/hardness.

Accuracy: **accurate**. All comparative points between alkali and alkaline earth metals in the table are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p120 | ## 10. مقارنة سريعة مع الفلزات القلوية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p121 | &#124; الخاصية &#124; الفلزات القلوية &#124; الفلزات القلوية الترابية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p122 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p123 | &#124; المجموعة &#124; الأولى &#124; الثانية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p124 | &#124; إلكترونات التكافؤ &#124; 1 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p125 | &#124; الأيون المتكون &#124; \(M^+\) &#124; \(M^{2+}\) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p126 | &#124; النشاط الكيميائي &#124; أعلى غالبًا &#124; أقل نسبيًا &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p127 | &#124; الصلابة والكثافة &#124; أقل &#124; أعلى عادةً &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p128 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Summary of Alkaline Earth Metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding overview and summary of the essential facts about alkaline earth metals.

Accuracy: **accurate**. The recap accurately synthesizes the main points covered in the lesson.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p129 | ## خلاصة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p130 | الفلزات القلوية الترابية هي عناصر المجموعة الثانية، وتمتلك إلكترونين في غلافها الخارجي. لذلك تفقدهما غالبًا لتكوين أيونات موجبة ثنائية الشحنة \(M^{2+}\). وهي فلزات نشطة يزداد نشاطها كلما نزلنا إلى أسفل المجموعة، وتكوّن أكاسيد وهيدروكسيدات ذات طبيعة قاعدية. من أهم عناصرها المغنيسيوم والكالسيوم، وهما مهمان جدًا في الحياة والصناعة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

