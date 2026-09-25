# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains stoichiometry, fundamental laws, mole ratios, worked calculations, and limiting reactants suitable for high school chemistry.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 43,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 43,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 1,
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "تخيل أن التفاعل الكيميائي مثل وصفة طبخ: تحتاج كميات محددة من كل مكون حتى ينجح الطبق، وإلا ستحصل على نتيجة مختلفة أو ستتبقى مواد زائدة."}]}

Annotation rationale: Defines stoichiometry in chemistry and provides an explanatory analogy using a cooking recipe to explain the concept of fixed reactant/product proportions.

Accuracy: **accurate**. The definition of stoichiometry and the introductory framing are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | الستوكيومترية (أو علم القياس الكيميائي) هي فرع من الكيمياء يهتم بدراسة **الكميات** الدقيقة للمواد المتفاعلة والمواد الناتجة في التفاعلات الكيميائية. تخيل أن التفاعل الكيميائي مثل وصفة طبخ: تحتاج كميات محددة من كل مكون حتى ينجح الطبق، وإلا ستحصل على نتيجة مختلفة أو ستتبقى مواد زائدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | سأشرحها لك خطوة بخطوة بطريقة مبسطة تناسب المرحلة الثانوية. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

## u2: Foundational Principles of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the foundational concepts underpinning stoichiometry: conservation of mass, the mole, and molar mass.

Accuracy: **accurate**. The descriptions of the law of conservation of mass, Avogadro's number for the mole, and molar mass are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | ### 1. الأساس الذي تعتمد عليه الستوكيومترية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | - **قانون حفظ الكتلة**: الكتلة لا تفنى ولا تُستحدث من العدم، بل تتحول فقط. لذلك يجب أن تكون المعادلة الكيميائية **موزونة** (متوازنة) قبل أي حساب. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p5 | - **المول (Mole)**: وحدة قياس كمية المادة. المول الواحد يحتوي على 6.02 × 10²³ جسيم (ذرة أو جزيء). يُستخدم المول لأن الذرات صغيرة جداً ولا يمكن عدّها مباشرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | - **الكتلة المولية**: كتلة مول واحد من المادة (تقاس بوحدة جرام/مول). مثلاً: الكتلة المولية للماء (H₂O) = 18 جم/مول. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Role of Balanced Equations and Mole Ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how mole ratios are extracted from balanced chemical equations and serve as the foundation for stoichiometric calculations.

Accuracy: **accurate**. The explanation of balancing equations and extracting mole ratios is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### 2. المعادلة الموزونة ونسب المولات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | ابدأ دائماً بوزن المعادلة. من المعادلة الموزونة تستخرج **نسب المولات** (Mole Ratios) التي تعمل مثل &quot;خريطة&quot; للحسابات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Illustrative Example of Mole Ratios in Water Formation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how to write stoichiometric ratios between reactants and products using the reaction of hydrogen and oxygen to form water.

Accuracy: **accurate**. The equation and the derived mole ratios are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | مثال بسيط: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | \[ | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p11 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | \] | EXAMPLE | {} | [&#x27;separator&#x27;] |
| p13 | - نسب المولات: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 |   - H₂ : O₂ = 2 : 1 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 |   - H₂ : H₂O = 2 : 2 (أي 1 : 1) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 |   - O₂ : H₂O = 1 : 2 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | هذه النسب تخبرك: &quot;لكل 2 مول هيدروجين تحتاج 1 مول أكسجين لإنتاج 2 مول ماء&quot;. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Worked Stoichiometric Calculation: Mass to Mass (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked example calculating the mass of water formed from 8 grams of hydrogen reacting with excess oxygen.

Accuracy: **accurate**. All calculations (moles of H2 = 4 mol, mole ratio 1:1, moles of H2O = 4 mol, mass of H2O = 72 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### 3. كيف تحسب الكميات؟ (مثال عملي) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | **السؤال**: إذا تفاعل 8 جرام من الهيدروجين (H₂) مع كمية كافية من الأكسجين، فكم جراماً من الماء ينتج؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | **الحل خطوة بخطوة**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | 1. حوّل الكتلة إلى مولات: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 |    - الكتلة المولية لـ H₂ = 2 جم/مول | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 |    - عدد المولات = الكتلة ÷ الكتلة المولية = 8 ÷ 2 = **4 مول** من H₂ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | 2. استخدم نسبة المولات من المعادلة: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 |    - من المعادلة: 2 مول H₂ → 2 مول H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 |    - إذن 4 مول H₂ → **4 مول** H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | 3. حوّل المولات إلى كتلة: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 |    - الكتلة المولية لـ H₂O = 18 جم/مول | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 |    - الكتلة = عدد المولات × الكتلة المولية = 4 × 18 = **72 جرام** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | النتيجة: ينتج 72 جرام ماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Limiting Reactant Definition (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is and explains why it determines the amount of product formed.

Accuracy: **accurate**. The definition of limiting reactant is clear and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### 4. المتفاعل المحدد (Limiting Reactant) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | أحياناً تكون الكميات غير متناسبة مع النسب. في هذه الحالة، المادة التي تنفد أولاً هي التي &quot;تحدد&quot; كمية المنتج. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Worked Example Identifying the Limiting Reactant (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numeric scenario (4 mol H2 and 3 mol O2) showing how to identify the limiting reactant and deduce the yield.

Accuracy: **accurate**. The reasoning correctly identifies H2 as limiting since 4 mol H2 requires 2 mol O2, leaving 1 mol O2 in excess, producing 4 mol of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | مثال سريع: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | - لديك 4 مول H₂ و 3 مول O₂. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | - حسب المعادلة تحتاج 2 H₂ : 1 O₂. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | - 4 مول H₂ تحتاج فقط 2 مول O₂، لكن لديك 3 مول O₂ (زائد). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p37 | - إذن H₂ هو المتفاعل المحدد، وسينتج 4 مول ماء فقط (وليس 6 مول كما لو كان O₂ كافياً). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Study Tips and Follow-up for High School Chemistry (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives practical advice on solving stoichiometry problems and offers further interactive practice.

Accuracy: **accurate**. The tips are pedagogically sound and standard best practices for solving stoichiometry exercises.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### نصائح سريعة للطلاب | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | - وزن المعادلة أولاً دائماً. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p40 | - حوّل دائماً إلى مولات قبل استخدام النسب. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p41 | - استخدم الآلة الحاسبة لحساب الكتل المولية بدقة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p42 | - تدرب على أمثلة من كتابك المدرسي (مثل احتراق الميثان أو تفاعل الصوديوم مع الكلور). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p43 | هل تريد أن أشرح مثالاً آخر (مثل حساب المتفاعل المحدد بالتفصيل) أو أعطيك تمريناً بسيطاً تحله؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

