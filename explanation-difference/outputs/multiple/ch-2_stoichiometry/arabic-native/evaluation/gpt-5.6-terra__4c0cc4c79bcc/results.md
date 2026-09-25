# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the principles and calculations of stoichiometry, including the law of conservation of mass, balancing equations, mole concept, molar mass, conversions, stoichiometric problem solving, gas volumes, limiting reactants, and percentage yield.

## Counts

```json
{
  "total_content_units": 22,
  "substantive_content_units": 22,
  "total_passages": 223,
  "content_unit_kinds": {
    "CONCEPT": 9,
    "EXAMPLE": 9,
    "PROCEDURE": 1,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 223,
  "unique_subtopics": 10,
  "contextualization": {
    "none": 21,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 22
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what chemical stoichiometry is and what quantities it deals with.

Accuracy: **accurate**. Accurately defines chemical stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | الحسابات الكيميائية هي طريقة استخدام **المعادلات الكيميائية** لمعرفة كميات المواد المتفاعلة أو الناتجة في التفاعل، مثل: الكتلة، عدد المولات، حجم الغاز، أو عدد الجسيمات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Law of Conservation of Mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the foundational principle of conservation of mass in chemical reactions.

Accuracy: **accurate**. Accurately explains the law of conservation of mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ## 1) الفكرة الأساسية: قانون حفظ الكتلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | في أي تفاعل كيميائي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | &gt; كتلة المواد المتفاعلة = كتلة المواد الناتجة | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p5 | فالذرات لا تختفي ولا تُخلق من العدم، وإنما يعاد ترتيبها لتكوين مواد جديدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Water Formation Reaction Conservation Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates conservation of mass and atom conservation with the reaction of hydrogen and oxygen forming water.

Accuracy: **accurate**. The equation and the explanation of atom conservation are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | مثال: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p8 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | هذا يعني أن الهيدروجين والأكسجين يتفاعلان لتكوين الماء، مع بقاء عدد ذرات كل عنصر متساوياً قبل التفاعل وبعده. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Balancing the Water Formation Reaction (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates balancing a chemical equation step-by-step using H2 + O2 -> H2O.

Accuracy: **accurate**. The equation balancing steps and atom counts are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ## 2) موازنة المعادلة الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | قبل إجراء أي حسابات، يجب أن تكون المعادلة **موزونة**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | مثال غير موزون: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | H_2 + O_2 \rightarrow H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | نعد الذرات: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | - يسار المعادلة: 2 هيدروجين، 2 أكسجين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - يمين المعادلة: 2 هيدروجين، 1 أكسجين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | لذلك نضع معاملات مناسبة: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | الآن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | - الهيدروجين: 4 ذرات في الطرفين. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | - الأكسجين: ذرتان في الطرفين. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Meaning of Coefficients and Mole Ratio (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how coefficients in a balanced equation represent mole ratios between reactants and products.

Accuracy: **accurate**. The explanation of stoichiometric mole ratios from the equation is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ### معنى الأرقام في المعادلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | في المعادلة: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p31 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p32 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p33 | النسبة المولية هي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p35 | 2 : 1 : 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p36 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p37 | أي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p38 | - 2 مول من \(H_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p39 | - تتفاعل مع 1 مول من \(O_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p40 | - لتنتج 2 مول من \(H_2O\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: The Mole Concept and Avogadro's Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the mole as a unit of measurement for amount of substance and explains Avogadro's number.

Accuracy: **accurate**. The definition of mole, numerical value of Avogadro's constant, and particle types are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p42 | ## 3) مفهوم المول | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | المول هو وحدة تستخدم لقياس كمية المادة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p44 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p45 | 1 \text{ مول} = 6.02 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p46 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p47 | جسيماً تقريباً، وهذا العدد يسمى **عدد أفوجادرو**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p48 | قد يكون الجسيم: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p49 | - ذرة، مثل ذرات الحديد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p50 | - جزيء، مثل جزيئات الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p51 | - أيون، مثل أيونات الصوديوم. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Mole of Water Molecules Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates that 1 mole of water contains Avogadro's number of water molecules.

Accuracy: **accurate**. 1 mole of H2O indeed contains ~6.02 x 10^23 molecules of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | مثال: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | 1 \text{ مول من } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | يحتوي على: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | 6.02 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | جزيء ماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Molar Mass Definition and Calculation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, its units (g/mol), and how to calculate it from the periodic table.

Accuracy: **accurate**. The definition of molar mass and its unit (g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p62 | ## 4) الكتلة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p63 | الكتلة المولية هي كتلة مول واحد من المادة، ووحدتها: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p64 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p65 | g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p66 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p67 | نحسبها بجمع الكتل الذرية للعناصر من الجدول الدوري. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u9: Molar Mass of Water Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step calculation of the molar mass of H2O.

Accuracy: **accurate**. Calculations for H2O molar mass (2(1) + 16 = 18 g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p68 | ### مثال: الكتلة المولية للماء \(H_2O\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p69 | - كتلة الهيدروجين \(H = 1\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p70 | - كتلة الأكسجين \(O = 16\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p71 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | M(H_2O) = 2(1) + 16 = 18 \ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p75 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | 1 \text{ مول ماء} = 18 \text{ غراماً} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u10: Molar Mass of Carbon Dioxide Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step calculation of the molar mass of CO2.

Accuracy: **accurate**. Calculations for CO2 molar mass (12 + 2(16) = 44 g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p78 | ### مثال: ثاني أكسيد الكربون \(CO_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p79 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | M(CO_2)=12+2(16)=44 \ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u11: Converting Between Mass and Moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formulas relating mass, molar mass, and moles (n = m/M and m = n*M).

Accuracy: **accurate**. The conversion formulas n = m/M and m = n*M and their variable descriptions are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p82 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p83 | ## 5) التحويل بين الكتلة والمولات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p84 | القانون الأساسي: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p85 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p86 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p87 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p88 | حيث: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p89 | - \(n\): عدد المولات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p90 | - \(m\): الكتلة بالغرام. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p91 | - \(M\): الكتلة المولية بوحدة \(g/mol\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p103 | ولإيجاد الكتلة من عدد المولات نستخدم: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p104 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p105 | m=n \times M | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p106 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |

## u12: Calculating Moles of Water from Mass (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the number of moles in 36 g of water.

Accuracy: **accurate**. Calculations (36 g / 18 g/mol = 2 mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p92 | ### مثال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | احسب عدد مولات الماء في \(36 g\) من الماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p94 | نعرف أن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p95 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | M(H_2O)=18 \ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p99 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | n=\frac{36}{18}=2 \ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | أي أن \(36 g\) من الماء تساوي \(2 mol\). | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u13: Steps for Solving Stoichiometry Problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the standard sequential procedure for solving general stoichiometry problems.

Accuracy: **accurate**. The procedural steps correctly outline standard stoichiometric problem solving.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p107 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p108 | ## 6) خطوات حل مسائل الحسابات الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p109 | في معظم المسائل اتبع هذه الخطوات: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p110 | 1. اكتب المعادلة الكيميائية. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p111 | 2. وازن المعادلة. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p112 | 3. حوّل المعطى إلى مولات إذا كان بالجرام. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p113 | 4. استخدم النسبة المولية من المعادلة الموزونة. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p114 | 5. حوّل الناتج إلى الوحدة المطلوبة: جرام، حجم، عدد جسيمات… إلخ. | PROCEDURE | {} | [&#x27;list&#x27;] |

## u14: Full Worked Example: Calculating Product Mass (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the procedure to calculate mass of water produced from 4 g of hydrogen reacting with oxygen.

Accuracy: **accurate**. Calculations and intermediate stoichiometry steps are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p115 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p116 | # مثال كامل: حساب كتلة ناتج | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | لدينا التفاعل: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p118 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p119 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p120 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p121 | إذا تفاعل \(4 g\) من غاز الهيدروجين، فما كتلة الماء الناتجة؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p122 | ### الخطوة 1: حساب مولات الهيدروجين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p123 | الكتلة المولية للهيدروجين \(H_2\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p124 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | M(H_2)=2 \ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p128 | n(H_2)=\frac{4}{2}=2 \ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | ### الخطوة 2: استخدام النسبة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p131 | من المعادلة: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p132 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | 2 mol \ H_2 \rightarrow 2 mol \ H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p135 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p136 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p137 | 2 mol \ H_2 \rightarrow 2 mol \ H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p139 | ### الخطوة 3: حساب كتلة الماء | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p140 | الكتلة المولية للماء: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p141 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p142 | M(H_2O)=18 \ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p143 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p144 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | m = n \times M | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p146 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p147 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p148 | m(H_2O)=2 \times 18=36g | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p149 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p150 | **إذن كتلة الماء الناتجة = \(36 g\).** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u15: Gas Stoichiometry at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains molar volume of an ideal gas at STP (22.4 L/mol) and the relationship V = n * 22.4.

Accuracy: **accurate**. Molar gas volume at standard temperature and pressure (STP) of 22.4 L/mol is standard in secondary chemistry curricula.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p151 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p152 | ## 7) الحسابات الكيميائية للغازات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p153 | عند الظروف القياسية من الحرارة والضغط (STP)، يشغل مول واحد من أي غاز حجماً مقداره تقريباً: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p154 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p155 | 22.4 \ L | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p156 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p157 | لذلك: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p158 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p159 | V=n \times 22.4 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p160 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p161 | حيث: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p162 | - \(V\): حجم الغاز باللتر. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p163 | - \(n\): عدد المولات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u16: Calculating Oxygen Gas Volume at STP (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the volume occupied by 2 moles of O2 at STP.

Accuracy: **accurate**. Calculation (2 * 22.4 = 44.8 L) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p164 | ### مثال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p165 | ما حجم \(2 mol\) من غاز الأكسجين عند الظروف القياسية؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p166 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p167 | V=2 \times 22.4=44.8L | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p168 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u17: Concept of Limiting Reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is in a chemical reaction and how it determines the yield.

Accuracy: **accurate**. Accurately defines the limiting reactant and how it governs product formation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p169 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p170 | ## 8) المتفاعل المحدِّد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p171 | أحياناً تكون كميات المواد المتفاعلة غير متناسبة تماماً. المادة التي تنفد أولاً تسمى: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p172 | &gt; **المتفاعل المحدِّد** أو العامل المحدِّد. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p173 | وهي التي تحدد كمية الناتج المتكون. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p175 | في الكيمياء نطبق الفكرة نفسها: نحسب كمية الناتج التي يمكن أن يعطيها كل متفاعل، ثم الأقل هو الناتج الحقيقي المتوقع. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u18: Sandwich Analogy for Limiting Reactants (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p174", "quote": "مثال: إذا كان لديك 10 أرغفة خبز و3 قطع جبن، وكل شطيرة تحتاج رغيفين وقطعة جبن واحدة، فإن الجبن هو المحدِّد؛ لأنه سينفد أولاً."}]}

Annotation rationale: Uses making bread-and-cheese sandwiches to explain the concept of limiting reactants.

Accuracy: **accurate**. The sandwich analogy accurately models stoichiometric limiting reagents.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p174 | مثال: إذا كان لديك 10 أرغفة خبز و3 قطع جبن، وكل شطيرة تحتاج رغيفين وقطعة جبن واحدة، فإن الجبن هو المحدِّد؛ لأنه سينفد أولاً. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u19: Theoretical, Actual, and Percent Yield (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines theoretical yield, actual yield, and the percentage yield formula.

Accuracy: **accurate**. Definitions of theoretical, actual, and percentage yield are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p176 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p177 | ## 9) المردود النظري والمردود المئوي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p178 | ### المردود النظري | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p179 | هو أكبر كمية من الناتج يمكن الحصول عليها حسابياً، إذا تم التفاعل بصورة مثالية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p180 | ### المردود الفعلي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p181 | هو كمية الناتج التي نحصل عليها فعلاً في المختبر. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p182 | ### المردود المئوي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p183 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p184 | \text{المردود المئوي}= | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p185 | \frac{\text{المردود الفعلي}}{\text{المردود النظري}} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p186 | \times 100 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p187 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |

## u20: Calculating Percent Yield Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows numerical calculation of percent yield given theoretical yield (20 g) and actual yield (16 g).

Accuracy: **accurate**. Calculations (16 / 20 * 100 = 80%) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p188 | ### مثال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p189 | إذا كان المردود النظري \(20 g\)، لكن التجربة أعطت \(16 g\): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p190 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p191 | \text{المردود المئوي}= | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p192 | \frac{16}{20}\times100=80\% | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p193 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u21: Summary of Essential Formulas (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps all the major formulas used across stoichiometry problems.

Accuracy: **accurate**. All summarized formulas are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p194 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p195 | ## ملخص القوانين المهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p196 | ### عدد المولات من الكتلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p197 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p198 | n=\frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p199 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p200 | ### الكتلة من عدد المولات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p201 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p202 | m=n \times M | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p203 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p204 | ### عدد الجسيمات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p205 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p206 | N=n \times 6.02 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p207 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p208 | ### حجم الغاز عند الظروف القياسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p209 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p210 | V=n \times 22.4 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p211 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p212 | ### المردود المئوي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p213 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p214 | \%\text{المردود}= | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p215 | \frac{\text{الفعلي}}{\text{النظري}}\times100 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p216 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |

## u22: Study Advice on Stoichiometric Problem Solving Roadmap (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides advice and a visual path/roadmap for understanding and tackling stoichiometry problems.

Accuracy: **accurate**. The conversion path diagram and study recommendation are pedagogically standard and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p217 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p218 | ## نصيحة مهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p219 | في الحسابات الكيميائية، لا تحفظ الحلول؛ بل اتبع دائماً هذا المسار: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |
| p220 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p221 | \text{جرامات} \rightarrow \text{مولات} \rightarrow \text{نسبة من المعادلة} \rightarrow \text{مولات} \rightarrow \text{الوحدة المطلوبة} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p222 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;equation&#x27;] |
| p223 | وهذا هو المفتاح الأساسي لإتقان معظم مسائل الحسابات الكيميائية. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |

