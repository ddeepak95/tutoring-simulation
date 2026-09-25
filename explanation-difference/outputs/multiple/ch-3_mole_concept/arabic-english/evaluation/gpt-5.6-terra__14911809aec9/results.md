# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high-school level explanation of the mole concept in Arabic, covering Avogadro's number, molar mass, conversion formulas with worked examples, gas molar volume at STP, and summary charts.

## Counts

```json
{
  "total_content_units": 20,
  "substantive_content_units": 20,
  "total_passages": 209,
  "content_unit_kinds": {
    "CONCEPT": 7,
    "EXAMPLE": 8,
    "PROCEDURE": 2,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 209,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 18
  },
  "proposed_substantive_verdicts": {
    "accurate": 20
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Concept of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "- “دزينة” = 12 قطعة  "}]}

Annotation rationale: Defines the mole as the unit of amount of substance and introduces Avogadro's number using everyday analogies (dozen, kilometer).

Accuracy: **accurate**. The definition of the mole and the value of Avogadro's constant are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## مفهوم المول في الكيمياء | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | المول هو **وحدة قياس كمية المادة** في الكيمياء، مثلما نستخدم: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | - “دزينة” = 12 قطعة   | ANALOGY | {} | [&#x27;list&#x27;] |
| p4 | - “كيلومتر” = 1000 متر   | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | - **مول** = عدد هائل جدًا من الجسيمات | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | لكن بدل أن يحتوي المول على 12 جسيمًا، فإنه يحتوي على: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | جسيمًا، ويسمى هذا العدد **عدد أفوجادرو**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Types of particles measured by the mole (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that representative particles can be atoms, molecules, or ions depending on the substance.

Accuracy: **accurate**. The explanation correctly identifies that representative particles vary by chemical species (atoms, molecules, ions).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## ما الجسيمات التي يقيسها المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | يعتمد ذلك على المادة: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - مول من ذرات الحديد Fe يحتوي على \(6.022 \times 10^{23}\) ذرة حديد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - مول من جزيئات الماء \(H_2O\) يحتوي على \(6.022 \times 10^{23}\) جزيء ماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | - مول من أيونات الصوديوم \(Na^+\) يحتوي على \(6.022 \times 10^{23}\) أيون صوديوم. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | إذن: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | 1 \text{ mol} = 6.022 \times 10^{23} \text{ جسيمًا} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p20 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Why the mole is needed in chemistry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why counting microscopic particles directly is impossible and how the mole bridges particle counts with measurable macro quantities.

Accuracy: **accurate**. Accurately rationalizes the practical necessity of the mole unit in laboratory chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | # لماذا نحتاج إلى المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | الذرات والجزيئات صغيرة جدًا ولا يمكن عدّها واحدة واحدة. لذلك يستخدم الكيميائيون المول لربط: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p24 | 1. عدد الجسيمات   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | 2. كتلة المادة بالجرام   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | 3. حجم الغاز أحيانًا   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Definition of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, gives its standard unit (g/mol), and relates it to atomic mass from the periodic table.

Accuracy: **accurate**. The definition, unit, and periodic table origin of molar mass are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | # الكتلة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | **الكتلة المولية** هي كتلة مول واحد من المادة، ووحدتها: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p30 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | \text{g/mol} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p33 | نجدها من الكتلة الذرية في الجدول الدوري. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Molar mass of oxygen element and gas (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the molar mass of atomic oxygen versus diatomic oxygen gas.

Accuracy: **accurate**. Calculations for atomic O (16 g/mol) and molecular O2 (32 g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ### مثال 1: عنصر الأكسجين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | الكتلة الذرية للأكسجين \(O\) تقريبًا: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | 16 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | أي أن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | 1 \text{ mol من ذرات الأكسجين} = 16 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | لكن غاز الأكسجين يوجد غالبًا على شكل \(O_2\)، لذلك: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p44 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \text{الكتلة المولية لـ } O_2 = 2 \times 16 = 32 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | أي: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | 1 \text{ mol من } O_2 = 32 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Calculating molar mass of compounds (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Specifies the procedure for calculating the molar mass of chemical compounds by summing constituent atomic masses.

Accuracy: **accurate**. The procedural rule for determining molecular/formula mass from chemical formulas is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | ## كيف نحسب الكتلة المولية للمركبات؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | نجمع كتل الذرات الموجودة في الصيغة الكيميائية. | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u7: Calculating the molar mass of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Worked calculation of the molar mass of water (H2O).

Accuracy: **accurate**. The calculation 2(1) + 16 = 18 g/mol for water is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ### مثال 2: الماء \(H_2O\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | - الهيدروجين \(H = 1\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p56 | - الأكسجين \(O = 16\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | M(H_2O) = 2(1) + 16 = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p62 | 1 \text{ mol من الماء} = 18 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p64 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Calculating the molar mass of carbon dioxide (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Worked calculation of the molar mass of carbon dioxide (CO2).

Accuracy: **accurate**. The calculation 12 + 2(16) = 44 g/mol for CO2 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p65 | ### مثال 3: ثاني أكسيد الكربون \(CO_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | - الكربون \(C = 12\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p67 | - الأكسجين \(O = 16\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p68 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | M(CO_2) = 12 + 2(16) = 44 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p72 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | 1 \text{ mol من } CO_2 = 44 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Formula relating mass and moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the fundamental formula n = m / M and its constituent variables.

Accuracy: **accurate**. The equation n = m / M and definitions of variables are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p76 | # التحويل بين الكتلة والمولات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p77 | القانون الأساسي: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p78 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p79 | \text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p80 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p81 | أو بالرموز: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p82 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p83 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p84 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p85 | حيث: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p86 | - \(n\): عدد المولات   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p87 | - \(m\): الكتلة بالجرام   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p88 | - \(M\): الكتلة المولية بوحدة g/mol   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p89 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Calculating moles from mass for water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Worked problem calculating moles in 36 g of water.

Accuracy: **accurate**. The calculation n = 36 / 18 = 2 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p90 | ## مثال 4: كم مولًا في 36 g من الماء؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p91 | نعرف أن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p92 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | M(H_2O) = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | إذن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p96 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | n = \frac{36}{18} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | إذًا 36 g من الماء تساوي **2 مول**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p100 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Calculating mass from moles for carbon dioxide (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Worked problem calculating the mass of 3 moles of CO2.

Accuracy: **accurate**. The calculation m = 3 * 44 = 132 g is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p101 | ## مثال 5: ما كتلة 3 mol من ثاني أكسيد الكربون؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | نعرف أن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p103 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | M(CO_2) = 44 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | القانون: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p107 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | m = n \times M | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p110 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p111 | m = 3 \times 44 = 132 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p112 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p113 | إذن كتلة 3 mol من \(CO_2\) هي: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p114 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p115 | 132 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p116 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p117 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Formula relating moles and number of particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formula converting between moles and particle count using Avogadro's constant.

Accuracy: **accurate**. The equation Number of Particles = Moles * N_A is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | # التحويل بين المولات وعدد الجسيمات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | نستخدم عدد أفوجادرو: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p120 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p121 | N_A = 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p122 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p123 | القانون: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p124 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p125 | \text{عدد الجسيمات} = \text{عدد المولات} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p126 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p127 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Calculating number of molecules from moles (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Worked problem calculating the number of water molecules in 2 moles of water.

Accuracy: **accurate**. The calculation 2 * 6.022 * 10^23 = 1.2044 * 10^24 molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p128 | ## مثال 6: كم جزيئًا يوجد في 2 mol من الماء؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p129 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \text{عدد الجزيئات} = 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p135 | إذن يوجد تقريبًا: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p136 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p137 | 1.204 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p139 | جزيء ماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p140 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Calculating moles from number of atoms (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Worked problem calculating moles of iron from 3.011 x 10^23 atoms.

Accuracy: **accurate**. The calculation 3.011 * 10^23 / 6.022 * 10^23 = 0.5 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p141 | ## مثال 7: كم مولًا في \(3.011 \times 10^{23}\) ذرة من الحديد؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p142 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p143 | n = \frac{\text{عدد الذرات}}{6.022 \times 10^{23}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p144 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p146 | n = \frac{3.011 \times 10^{23}}{6.022 \times 10^{23}} = 0.5 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p147 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p148 | إذن الكمية تساوي: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p149 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p150 | 0.5 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p151 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p152 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Conversion roadmap between mass, moles, and particles (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable step-by-step conversion roadmap detailing whether to multiply or divide by molar mass or Avogadro's number.

Accuracy: **accurate**. The conversion operations (multiply/divide by molar mass and Avogadro's constant) are all mathematically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p153 | # خريطة التحويل المهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p154 | يمكنك التفكير في المول كحلقة وصل: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p155 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p156 | \text{الكتلة بالجرام} \longleftrightarrow \text{المولات} \longleftrightarrow \text{عدد الجسيمات} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p157 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p158 | ### من الجرام إلى المول: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p159 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p160 | \text{اقسم على الكتلة المولية} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p161 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p162 | ### من المول إلى الجرام: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p163 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p164 | \text{اضرب في الكتلة المولية} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p165 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p166 | ### من المول إلى عدد الجسيمات: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p167 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p168 | \text{اضرب في } 6.022 \times 10^{23} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p169 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p170 | ### من عدد الجسيمات إلى المول: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p171 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p172 | \text{اقسم على } 6.022 \times 10^{23} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p173 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p174 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the molar volume of an ideal gas at STP (22.4 L at 0 °C and 1 atm).

Accuracy: **accurate**. The value of 22.4 L/mol at 0 °C and 1 atm corresponds to the classic standard temperature and pressure definition widely taught in high school curricula.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p175 | # المول والغازات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p176 | عند الظروف القياسية تقريبًا في بعض المناهج، يشغل مول واحد من الغاز حجمًا مقداره: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p177 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p178 | 22.4 \text{ L} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p179 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p180 | وذلك عند درجة حرارة \(0^\circ C\) وضغط \(1\ atm\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u17: Illustrative volume calculation for oxygen gas at STP (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides illustrative examples of gas volume at STP for 1 mol and 2 mol of O2.

Accuracy: **accurate**. The volumes 22.4 L and 44.8 L for 1 and 2 moles of gas at STP are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p181 | مثال: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p182 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p183 | 1 \text{ mol من } O_2 = 22.4 \text{ L} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p184 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p185 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p186 | 2 \text{ mol من } O_2 = 44.8 \text{ L} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p187 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u18: Limitation of 22.4 L molar volume to STP (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the boundary of applicability: 22.4 L is only valid under the specified standard conditions.

Accuracy: **accurate**. Accurately qualifies that 22.4 L/mol is only applicable at standard temperature and pressure.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p188 | &gt; ملاحظة: هذا القانون يستخدم فقط عند الظروف القياسية المحددة. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |
| p189 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u19: Quick recap of definitions and formulas (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key concepts, units, and mathematical formulas of the mole concept.

Accuracy: **accurate**. The recap accurately synthesizes all core formulas and definitions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p190 | ## ملخص سريع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p191 | - المول هو كمية مادة تحتوي على: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p192 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p193 | 6.022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p194 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p195 | جسيمًا. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p196 | - الكتلة المولية هي كتلة مول واحد، ووحدتها \(g/mol\). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p197 | - أهم القوانين: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p198 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p199 | n = \frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p200 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p201 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p202 | m = n \times M | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p203 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p204 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p205 | N = n \times 6.022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p206 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p207 | حيث \(N\) هو عدد الجسيمات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

## u20: Mnemonic idea for remembering the mole (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p209", "quote": "المول في الكيمياء يشبه كلمة “دزينة”، لكن بدل 12 قطعة، يحتوي على \\(6.022 \\times 10^{23}\\) جسيمًا."}]}

Annotation rationale: Provides a memory tip linking the mole to a dozen for easy retention.

Accuracy: **accurate**. The dozen comparison is an accurate, conventional pedagogical mnemonic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p208 | **فكرة سهلة للحفظ:**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p209 | المول في الكيمياء يشبه كلمة “دزينة”، لكن بدل 12 قطعة، يحتوي على \(6.022 \times 10^{23}\) جسيمًا. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

