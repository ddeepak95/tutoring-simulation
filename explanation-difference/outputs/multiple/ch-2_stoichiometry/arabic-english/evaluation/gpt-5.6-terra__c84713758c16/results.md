# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response is dedicated to explaining stoichiometry in Arabic, covering chemical balancing, the mole concept, molar mass, calculation procedures, worked examples, mole ratios, limiting reactants, and reaction yields.

## Counts

```json
{
  "total_content_units": 17,
  "substantive_content_units": 17,
  "total_passages": 205,
  "content_unit_kinds": {
    "CONCEPT": 7,
    "CAVEAT": 1,
    "EXAMPLE": 6,
    "PROCEDURE": 1,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 205,
  "unique_subtopics": 10,
  "contextualization": {
    "none": 15,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 17
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry and explains its core purpose in relating quantities of reactants and products.

Accuracy: **accurate**. The definition accurately states that stoichiometry studies the quantitative relationships between reactants and products in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **الستويكيومترية (Stoichiometry)** هي فرع من الكيمياء يشرح **العلاقات الكمية بين المواد المتفاعلة والنواتج** في التفاعل الكيميائي.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | بعبارة بسيطة: تساعدنا على معرفة **كمية مادة نحتاجها** أو **كمية مادة ستتكوّن** عند حدوث تفاعل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Importance of Balanced Equations and Coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical equations must be balanced and defines stoichiometric coefficients using the formation of water.

Accuracy: **accurate**. The explanation of balancing the water synthesis reaction, the mole relationships, and the role of coefficients is chemically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ## 1. لماذا نحتاج إلى معادلة كيميائية موزونة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | انظر إلى تفاعل تكوين الماء: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p7 | H_2 + O_2 \rightarrow H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p8 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p9 | هذه المعادلة غير موزونة؛ لأن عدد ذرات الأكسجين ليس متساوياً: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | - في اليسار: ذرتان أكسجين في \(O_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | - في اليمين: ذرة أكسجين واحدة في \(H_2O\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | المعادلة الموزونة هي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p14 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p15 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p16 | ومعناها: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | - **2 مول** من غاز الهيدروجين تتفاعل مع | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | - **1 مول** من غاز الأكسجين لتنتج | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | - **2 مول** من الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | الأرقام الموجودة أمام الصيغ الكيميائية تسمى **المعاملات**، وهي أساس مسائل الستويكيومترية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Misconception: Modifying Chemical Subscripts (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Warns students against changing chemical subscripts rather than adjusting stoichiometric coefficients.

Accuracy: **accurate**. Subscripts in chemical formulas define identity and cannot be altered when balancing equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | &gt; ملاحظة مهمة: لا نغيّر الأرقام الصغيرة داخل الصيغة، مثل \(H_2O\)، لأن ذلك يغيّر المادة نفسها. نغيّر فقط المعاملات أمام المواد. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |

## u4: The Mole and Avogadro's Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "مثلما نستخدم “الدزينة” لعدّ 12 قطعة"}]}

Annotation rationale: Explains the mole as a counting unit in chemistry using Avogadro's number and compares it to a dozen.

Accuracy: **accurate**. The definition of the mole and Avogadro's number (6.02 * 10^23 particles) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p23 | ## 2. ما هو المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | المول هو وحدة تستخدم لقياس كمية المادة، مثلما نستخدم “الدزينة” لعدّ 12 قطعة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | لكن: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p26 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p27 | 1 \text{ مول} = 6.02 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p28 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p29 | جسيمًا، مثل ذرات أو جزيئات أو أيونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | هذا العدد يسمى **عدد أفوجادرو**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Avogadro's Number Applied to Iron Atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the mole concept for elemental iron atoms.

Accuracy: **accurate**. One mole of iron atoms contains 6.02 * 10^23 iron atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | مثال: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | - 1 مول من ذرات الحديد = \(6.02 \times 10^{23}\) ذرة حديد. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Avogadro's Number Applied to Water Molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the mole concept for molecular water.

Accuracy: **accurate**. One mole of water molecules contains 6.02 * 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | - 1 مول من جزيئات الماء = \(6.02 \times 10^{23}\) جزيء ماء. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Concept of Molar Mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, specifies its unit (g/mol), and explains that it is computed from periodic table atomic masses.

Accuracy: **accurate**. The definition of molar mass as the mass of one mole in grams per mole is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ## 3. الكتلة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | **الكتلة المولية** هي كتلة مول واحد من المادة، وتقاس بوحدة: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p37 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p38 | \text{غرام/مول } (g/mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p39 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p40 | نحسبها باستخدام الكتل الذرية من الجدول الدوري. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u8: Calculating Molar Mass of Water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through calculating the molar mass of H2O from constituent atomic masses.

Accuracy: **accurate**. The calculation 2(1) + 16 = 18 g/mol is fully correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ### مثال: الكتلة المولية للماء \(H_2O\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | - كتلة الهيدروجين \(H = 1\ g/mol\) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p43 | - كتلة الأكسجين \(O = 16\ g/mol\) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p44 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | M(H_2O) = 2(1) + 16 = 18\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | إذن كتلة مول واحد من الماء تساوي: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | 18\ g | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u9: Steps to Solve Stoichiometry Problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the general algorithmic steps and pathway for solving stoichiometry problems.

Accuracy: **accurate**. The standard sequence (balance equation -> convert to moles -> mole ratio -> convert to desired quantity) is completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p52 | # 4. خطوات حل مسائل الستويكيومترية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | في أغلب المسائل نتبع هذا المسار: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p54 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p55 | \text{الكتلة} \rightarrow \text{المولات} \rightarrow \text{النسبة المولية} \rightarrow \text{المولات المطلوبة} \rightarrow \text{الكتلة} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p56 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p57 | أي: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p58 | 1. **وازن المعادلة الكيميائية.** | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p59 | 2. حوّل الكتلة المعطاة إلى عدد مولات. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p60 | 3. استخدم معاملات المعادلة لإيجاد النسبة المولية. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p61 | 4. حوّل عدد المولات الناتج إلى كتلة أو حجم أو عدد جسيمات، حسب المطلوب. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u10: Worked Problem: Water Produced from Hydrogen Gas (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates calculating product mass from reactant mass: calculating mass of H2O formed from 4 g of H2.

Accuracy: **accurate**. Calculations are exact: 4 g / 2 g/mol = 2 mol H2; mole ratio 2:2 gives 2 mol H2O; 2 mol * 18 g/mol = 36 g H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p62 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p63 | # مثال 1: حساب كتلة ناتج من كتلة متفاعل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | لدينا التفاعل: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p65 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p66 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p67 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p68 | إذا تفاعل **4 غرامات من الهيدروجين** بشكل كامل، فما كتلة الماء الناتجة؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p69 | ## الخطوة 1: تحويل كتلة الهيدروجين إلى مولات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p70 | الكتلة المولية للهيدروجين الجزيئي \(H_2\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p71 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | M(H_2)=2\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | \text{عدد مولات } H_2 = \frac{4}{2}=2\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | ## الخطوة 2: استخدام النسبة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p78 | من المعادلة: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p79 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | 2H_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | النسبة بين \(H_2\) و\(H_2O\) هي: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p83 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | \frac{2\ mol\ H_2O}{2\ mol\ H_2}=1 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p87 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | 2\ mol\ H_2 \rightarrow 2\ mol\ H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | ## الخطوة 3: تحويل مولات الماء إلى كتلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p91 | الكتلة المولية للماء: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p92 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | M(H_2O)=18\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | \text{كتلة الماء} = 2 \times 18 = 36\ g | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | ### الإجابة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | \boxed{36\ غرامًا من الماء} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u11: Worked Problem: Carbon Dioxide from Methane Combustion (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates finding mass of CO2 produced by the combustion of 16 g of CH4.

Accuracy: **accurate**. Molar mass calculations and mole conversions are correct: 16 g CH4 = 1 mol; 1 mol CH4 yields 1 mol CO2; 1 mol CO2 * 44 g/mol = 44 g CO2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p102 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p103 | # مثال 2: من كتلة مادة إلى كتلة مادة أخرى | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p104 | احتراق الميثان: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p105 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | إذا احترق \(16\ g\) من الميثان \(CH_4\)، فما كتلة ثاني أكسيد الكربون \(CO_2\) الناتجة؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p109 | ## 1. حساب مولات الميثان | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | الكتلة المولية للميثان: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p111 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p112 | M(CH_4)=12+4(1)=16\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p113 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p115 | \text{مولات } CH_4 = \frac{16}{16}=1\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p116 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p117 | ## 2. استخدام النسبة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p118 | من المعادلة: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p119 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p120 | 1CH_4 \rightarrow 1CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p121 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p122 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p123 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | 1\ mol\ CH_4 \rightarrow 1\ mol\ CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | ## 3. تحويل مولات \(CO_2\) إلى كتلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p127 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p128 | M(CO_2)=12+2(16)=44\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | \text{كتلة } CO_2=1 \times 44=44\ g | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | ### الإجابة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p134 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p135 | \boxed{44\ غرامًا من ثاني أكسيد الكربون} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p136 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u12: Constructing and Selecting Mole Ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines mole ratio and illustrates possible ratios from the Haber process reaction (N2 + 3H2 -> 2NH3).

Accuracy: **accurate**. The definition of mole ratios and the derived conversion factors for the Haber process are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p137 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p138 | # 5. النسبة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p139 | النسبة المولية هي النسبة بين معاملات المواد في المعادلة الموزونة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p140 | مثلاً في المعادلة: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p141 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p142 | N_2 + 3H_2 \rightarrow 2NH_3 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p143 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p144 | يمكننا كتابة عدة نسب مولية، مثل: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p145 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p146 | \frac{3\ mol\ H_2}{1\ mol\ N_2} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p147 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p148 | أو: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p149 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p150 | \frac{2\ mol\ NH_3}{3\ mol\ H_2} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p151 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p152 | أو: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p153 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p154 | \frac{2\ mol\ NH_3}{1\ mol\ N_2} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p155 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p156 | نختار النسبة التي تساعدنا على التحويل من المادة المعطاة إلى المادة المطلوبة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u13: Concept of the Limiting Reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines limiting reactant and explains how it is determined by calculating the minimum yield of product.

Accuracy: **accurate**. The definition of the limiting reactant as the reagent consumed first and yielding the lowest theoretical product is chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p157 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p158 | # 6. المتفاعل المحدِّد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p159 | أحيانًا تكون لدينا كميات من أكثر من متفاعل، لكن أحدها ينفد أولًا. هذا يسمى: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p160 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p161 | \textbf{المتفاعل المحدِّد} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p162 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p163 | وهو الذي يحدد كمية الناتج النهائي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p168 | في الكيمياء، نحدد المتفاعل المحدِّد بحساب كمية الناتج التي يمكن أن يعطيها كل متفاعل. المتفاعل الذي يعطي **أقل كمية من الناتج** هو المتفاعل المحدِّد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u14: Sandwich Analogy for Limiting Reactants (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p167", "quote": "إذا كان لديك 10 شرائح خبز و3 قطع جبن، فيمكنك صنع 3 شطائر فقط؛ لأن الجبن سينفد أولًا. الجبن هنا هو العامل المحدِّد."}]}

Annotation rationale: Uses a cross-domain analogy of making cheese sandwiches to explain how a limiting component dictates the maximum yield.

Accuracy: **accurate**. The analogy clearly and correctly demonstrates the limiting reactant principle using bread slices and cheese slices.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p164 | مثال بسيط: لصنع شطيرة تحتاج إلى: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p165 | - شريحتين خبز | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p166 | - قطعة جبن واحدة | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p167 | إذا كان لديك 10 شرائح خبز و3 قطع جبن، فيمكنك صنع 3 شطائر فقط؛ لأن الجبن سينفد أولًا. الجبن هنا هو العامل المحدِّد. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u15: Theoretical Yield, Actual Yield, and Percent Yield (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines theoretical yield, actual yield, and provides the formula for calculating percent yield.

Accuracy: **accurate**. Definitions of actual yield, theoretical yield, and the percent yield formula (actual / theoretical * 100) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p169 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p170 | # 7. المردود النظري والمردود الفعلي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p171 | في التجارب الواقعية، لا نحصل غالبًا على الكمية الكاملة المتوقعة من الناتج. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p172 | - **المردود النظري:** أكبر كمية يمكن توقعها حسابيًا من المعادلة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p173 | - **المردود الفعلي:** الكمية التي نحصل عليها فعليًا في المختبر. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p174 | - **النسبة المئوية للمردود:** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p175 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p176 | \%\text{المردود}= | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p177 | \frac{\text{المردود الفعلي}}{\text{المردود النظري}} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p178 | \times100 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p179 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |

## u16: Calculating Percent Yield (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the percent yield formula to calculate 75% yield given 15 g actual and 20 g theoretical yield.

Accuracy: **accurate**. The calculation (15 / 20) * 100 = 75% is mathematically and conceptually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p180 | مثال: إذا كان المردود النظري \(20\ g\)، لكنك حصلت فعليًا على \(15\ g\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p181 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p182 | \%\text{المردود}=\frac{15}{20}\times100=75\% | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p183 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u17: Summary of Stoichiometric Problem-Solving (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding bulleted checklist and schematic flow diagram summarizing stoichiometric calculations.

Accuracy: **accurate**. The recap accurately synthesizes the main steps and flow of solving stoichiometry problems.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p184 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p185 | # ملخص سريع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p186 | لحل أي مسألة ستويكيومترية: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p187 | 1. اكتب المعادلة الكيميائية **الموزونة**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p188 | 2. حوّل المعطيات إلى **مولات**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p189 | 3. استخدم **النسبة المولية** من المعادلة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p190 | 4. حوّل النتيجة إلى الوحدة المطلوبة: غرامات، مولات، جزيئات، أو حجم غاز. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p191 | 5. إذا وُجد أكثر من متفاعل، تحقق من **المتفاعل المحدِّد**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p192 | يمكن تلخيص المسار الأساسي هكذا: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p193 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p194 | \boxed{ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p195 | \text{غرامات المادة المعطاة} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p196 | \rightarrow | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p197 | \text{مولات} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p198 | \rightarrow | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p199 | \text{نسبة مولية} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p200 | \rightarrow | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p201 | \text{مولات المادة المطلوبة} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p202 | \rightarrow | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p203 | \text{غرامات المادة المطلوبة} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p204 | } | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p205 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |

