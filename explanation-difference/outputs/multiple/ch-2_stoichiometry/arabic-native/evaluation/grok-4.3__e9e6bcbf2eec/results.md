# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains chemical stoichiometry for secondary school students, covering the mole concept, molar mass, conversion formulas, balanced reaction calculations, and limiting reactants.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 64,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 7,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 64,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 1,
    "none": 12
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "المول هو **وحدة قياس كمية المادة**، تمامًا مثل \"الدزينة\" التي تعني 12 قطعة."}]}

Annotation rationale: Explains the fundamental concept of the mole as the unit of amount of substance, relating it to counting units like a dozen, and defines Avogadro's number.

Accuracy: **accurate**. The definition of the mole and the numerical value of Avogadro's number (6.02 × 10²³) are accurately presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **شرح الحسابات الكيميائية (الستويوكيمياء) للمرحلة الثانوية** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | سأشرح لك الموضوع بطريقة مبسطة ومنظمة خطوة بخطوة، كأننا ندرس معًا. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### 1. ما هو المول؟ (الوحدة الأساسية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | المول هو **وحدة قياس كمية المادة**، تمامًا مثل &quot;الدزينة&quot; التي تعني 12 قطعة.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | المول الواحد يحتوي على **6.02 × 10²³** جسيم (ذرة أو جزيء أو أيون).   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | هذا العدد يُسمى **عدد أفوغادرو**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Example of one mole of carbon atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives an illustrative example of applying the mole concept to carbon atoms.

Accuracy: **accurate**. One mole of carbon contains Avogadro's number of carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **مثال بسيط:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - 1 مول من ذرات الكربون = 6.02 × 10²³ ذرة كربون. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Example of one mole of water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives an illustrative example of applying the mole concept to molecular water.

Accuracy: **accurate**. One mole of water molecules contains 6.02 × 10²³ water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | - 1 مول من جزيئات الماء = 6.02 × 10²³ جزيء ماء. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Definition and calculation method of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, its standard units, and explains how it is computed from the periodic table.

Accuracy: **accurate**. Molar mass definition and calculation principle are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### 2. الكتلة المولية (M) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | هي كتلة **مول واحد** من المادة، ووحدتها **جم/مول**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | **كيف تحسبها؟** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | اجمع الكتل الذرية لكل العناصر في الصيغة الكيميائية (من الجدول الدوري). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Molar mass calculation of H2O (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the computation of the molar mass of water.

Accuracy: **accurate**. The calculation (2 × 1) + 16 = 18 g/mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | **أمثلة:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - **H₂O**: (2 × 1) + 16 = **18 جم/مول** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u6: Molar mass calculation of CO2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the computation of the molar mass of carbon dioxide.

Accuracy: **accurate**. The calculation 12 + (2 × 16) = 44 g/mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | - **CO₂**: 12 + (2 × 16) = **44 جم/مول** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u7: Molar mass calculation of NaCl (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the computation of the molar mass of sodium chloride.

Accuracy: **accurate**. The calculation 23 + 35.5 = 58.5 g/mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | - **NaCl**: 23 + 35.5 = **58.5 جم/مول** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u8: Quantitative relationships between mass, moles, and number of particles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reference table of the core algebraic equations connecting mass, molar mass, moles, and particle count.

Accuracy: **accurate**. All formulas stated in the table (n = m / M, m = n * M, particles = n * 6.02e23) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### 3. العلاقات المهمة بين الكتلة والمول والعدد | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | &#124; الكمية المطلوبة       &#124; القانون                          &#124; الرموز                     &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p20 | &#124;-----------------------&#124;----------------------------------&#124;----------------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;, &#x27;separator&#x27;] |
| p21 | &#124; عدد المولات           &#124; n = m ÷ M                       &#124; n = مول، m = كتلة (جم)، M = كتلة مولية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124; الكتلة                &#124; m = n × M                       &#124; -                          &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124; عدد الجسيمات         &#124; عدد الجسيمات = n × 6.02×10²³   &#124; -                          &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u9: General procedure for chemical equation stoichiometry (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a step-by-step procedure to solve stoichiometric problems from chemical equations.

Accuracy: **accurate**. The 4-step sequence (balance equation, convert mass to moles, apply mole ratio, convert product moles to mass) is the standard correct method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### 4. الحسابات في المعادلات الكيميائية (الستويوكيمياء) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | الخطوات الأساسية دائمًا: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | 1. **وزن المعادلة** (تأكد أنها موزونة). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p27 | 2. **حوّل الكتل المعطاة إلى مولات**. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p28 | 3. **استخدم النسب المولية** من المعادلة الموزونة. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p29 | 4. **حوّل المولات الناتجة إلى كتلة** (إذا طُلب). | PROCEDURE | {} | [&#x27;list&#x27;] |

## u10: Worked example: calculating mass of water produced from combustion of hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked stoichiometric calculation showing how to find the mass of water produced when 8 g of H2 reacts.

Accuracy: **accurate**. All calculations (8 g / 2 g/mol = 4 mol H2; 1:1 mole ratio gives 4 mol H2O; 4 mol * 18 g/mol = 72 g H2O) are mathematically and chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | #### مثال محلول خطوة بخطوة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | **السؤال:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | ما كتلة الماء الناتجة عند احتراق 8 جم من الهيدروجين حسب المعادلة التالية؟   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | **2H₂ + O₂ → 2H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | **الحل:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | **الخطوة 1:** المعادلة موزونة بالفعل. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | **الخطوة 2:** نحسب مولات الهيدروجين المعطى.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | الكتلة المولية لـ H₂ = 2 جم/مول   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p38 | n(H₂) = 8 ÷ 2 = **4 مول** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p39 | **الخطوة 3:** نستخدم النسبة المولية من المعادلة.   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | من المعادلة: 2 مول H₂ → 2 مول H₂O   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | إذن: 4 مول H₂ → **4 مول H₂O** (النسبة 1:1) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | **الخطوة 4:** نحسب كتلة الماء.   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | الكتلة المولية لـ H₂O = 18 جم/مول   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p44 | m(H₂O) = 4 × 18 = **72 جم** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p45 | **الإجابة:** 72 جرام من الماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Concept of limiting reactant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and explains how it determines product yield.

Accuracy: **accurate**. The explanation of the limiting reactant as the reactant present in insufficient amount that determines product amount is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ### 5. المتفاعل المحدد (Limiting Reactant) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | أحيانًا يكون أحد المتفاعلين أقل من اللازم، فيحدد كمية الناتج. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u12: Worked example: identifying limiting reactant between H2 and O2 (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through an example identifying hydrogen as the limiting reactant when 4 moles of H2 react with 3 moles of O2.

Accuracy: **accurate**. For 2H2 + O2 -> 2H2O, 4 mol H2 requires 2 mol O2; having 3 mol O2 means O2 is in excess and H2 is limiting. The reasoning is sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | **مثال سريع:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | لو كان لديك 4 مول H₂ و 3 مول O₂، أي مادة هي المحددة؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p50 | من المعادلة:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p51 | 2H₂ + O₂ → 2H₂O   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | - H₂ تحتاج 2 مول لكل 1 مول O₂ → 4 مول H₂ تحتاج 2 مول O₂ فقط.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p53 | - O₂ الموجود 3 مول &gt; 2 مول المطلوبة.   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p54 | **إذن الهيدروجين هو المتفاعل المحدد.** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u13: Important tips and follow-up topics for students (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides practical study advice and problem-solving tips for chemistry students, concluding with suggested follow-up topics.

Accuracy: **accurate**. The advice given (checking equation balance, converting to moles, writing units, using ideal gas law for gas problems) is chemically valid and standard pedagogical practice.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p55 | ### نصائح مهمة للطالب: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | - **لا تنسَ وزن المعادلة** أولًا دائمًا. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p57 | - حوّل كل شيء إلى **مولات** قبل المقارنة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p58 | - اكتب وحدات القياس مع كل رقم (جم، مول، جم/مول). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p59 | - في مسائل الغازات، استخدم قانون الغاز المثالي إذا أُعطيت الحجم والضغط ودرجة الحرارة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p60 | هل تريد أن أشرح لك الآن موضوعًا معينًا بالتفصيل أكثر؟ مثل: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p61 | - المتفاعل المحدد بأمثلة أكثر | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;list&#x27;] |
| p62 | - حساب النسبة المئوية للناتج | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;list&#x27;] |
| p63 | - حسابات المحاليل والتركيز (المولارية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;list&#x27;] |
| p64 | قل لي أي جزء تريد نركز عليه. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

