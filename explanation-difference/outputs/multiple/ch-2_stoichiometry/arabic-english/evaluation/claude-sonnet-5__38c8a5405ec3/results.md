# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains stoichiometry in Arabic, covering its definition, a cooking recipe analogy, the essential steps (equation balancing, mole coefficients, mole ratios), a mole-to-mole worked example, a mass-to-mass conversion roadmap, a mass-to-mass worked example, practical study tips, and a final summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 57,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "ANALOGY": 1,
    "PROCEDURE": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 57,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 7,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the branch of chemistry studying quantitative relationships between reactants and products.

Accuracy: **accurate**. The definition accurately captures stoichiometry as the calculation and quantitative study of reactant and product proportions in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # الستوكيومتري (حساب المتفاعلات والنواتج) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## تعريف الستوكيومتري | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | الستوكيومتري هو فرع من الكيمياء يهتم بدراسة **العلاقات الكمية** بين المواد المتفاعلة والنواتج في التفاعل الكيميائي. ببساطة، هو حساب &quot;كم&quot; من كل مادة نحتاج أو ننتج في التفاعل الكيميائي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Sandwich recipe analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "تخيل وصفة طبخ 🍳"}, {"passage_id": "p6", "quote": "- لعمل ساندويتش واحد تحتاج: خبزتين + قطعة جبن واحدة"}]}

Annotation rationale: Uses a kitchen recipe analogy of making sandwiches to intuitively illustrate stoichiometric proportions.

Accuracy: **accurate**. The analogy accurately reflects how fixed stoichiometric ratios scale linearly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## الفكرة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | تخيل وصفة طبخ 🍳 | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | - لعمل ساندويتش واحد تحتاج: خبزتين + قطعة جبن واحدة | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | - إذا أردت عمل 5 ساندويتشات، ستحتاج: 10 خبزات + 5 قطع جبن | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | بنفس الطريقة، المعادلة الكيميائية الموزونة تخبرنا بالنسب بين المواد! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Basic steps for stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the foundational steps needed to solve stoichiometry problems: balancing the equation, reading coefficients as moles, and forming mole ratios.

Accuracy: **accurate**. The explanation of balancing, interpreting coefficients as molar ratios, and forming stoichiometric conversion factors is chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## الخطوات الأساسية لحل مسائل الستوكيومتري | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | ### 1️⃣ وزن المعادلة الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | يجب أن تكون المعادلة **موزونة** (عدد الذرات متساوٍ في الطرفين) | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p12 | **مثال:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | $$N_2 + 3H_2 \rightarrow 2NH_3$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 | ### 2️⃣ فهم المعاملات (الأرقام أمام المواد) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | هذه الأرقام تمثل **عدد المولات** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | من المعادلة أعلاه: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | - 1 مول نيتروجين + 3 مول هيدروجين → 2 مول أمونيا | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | ### 3️⃣ استخدام النسب المولية (Mole Ratio) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | هذه هي أداتنا الأساسية في الحل! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | $$\text{النسبة المولية} = \frac{\text{معامل المادة المطلوبة}}{\text{معامل المادة المعطاة}}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |

## u4: Mole-to-mole calculation for ammonia synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete worked example calculating moles of NH3 produced from 6 moles of H2.

Accuracy: **accurate**. The calculation 6 mol H2 * (2 mol NH3 / 3 mol H2) = 4 mol NH3 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## مثال تطبيقي كامل | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | **السؤال:** كم مول من الأمونيا (NH₃) ينتج عند تفاعل 6 مول من الهيدروجين (H₂)؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | **المعادلة:** $N_2 + 3H_2 \rightarrow 2NH_3$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p24 | **الحل:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | **الخطوة 1:** حدد المعطى والمطلوب | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | - المعطى: 6 مول H₂ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | - المطلوب: مول NH₃ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | **الخطوة 2:** استخدم النسبة المولية من المعادلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | $$6 \text{ mol } H_2 \times \frac{2 \text{ mol } NH_3}{3 \text{ mol } H_2} = 4 \text{ mol } NH_3$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | **الإجابة:** ينتج 4 مول من الأمونيا ✅ | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Mass-to-mass stoichiometry pathway (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Diagrams the standard general procedure for converting mass of given substance to mass of desired substance via molar masses and mole ratios.

Accuracy: **accurate**. The flow correctly illustrates mass(A) -> moles(A) -> moles(B) -> mass(B).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## المسار الكامل لحل أي مسألة ستوكيومترية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | ``` | PROCEDURE | {} | [&#x27;separator&#x27;] |
| p33 | كتلة المادة المعطاة (جرام) | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p34 |          ↓ (القسمة على الكتلة المولية) | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p35 | عدد المولات المعطاة | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p36 |          ↓ (استخدام النسبة المولية من المعادلة الموزونة) | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p37 | عدد المولات المطلوبة | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p38 |          ↓ (الضرب في الكتلة المولية) | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p39 | كتلة المادة المطلوبة (جرام) | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p40 | ``` | PROCEDURE | {} | [&#x27;separator&#x27;] |

## u6: Mass-to-mass worked example for hydrogen combustion (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A multi-step worked example calculating grams of O2 required to react with 4 grams of H2.

Accuracy: **accurate**. All calculations are accurate: 4 g / 2 g/mol = 2 mol H2; 2 mol H2 * (1 mol O2 / 2 mol H2) = 1 mol O2; 1 mol O2 * 32 g/mol = 32 g O2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ## مثال شامل (بالكتلة) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | **السؤال:** كم جرام من الأكسجين (O₂) نحتاج لحرق 4 جرام من الهيدروجين (H₂)؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | **المعادلة:** $2H_2 + O_2 \rightarrow 2H_2O$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p44 | **الحل:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p45 | &#124; الخطوة &#124; العملية &#124; الناتج &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p46 | &#124;--------&#124;---------&#124;--------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p47 | &#124; 1. حساب مولات H₂ &#124; 4g ÷ 2 g/mol &#124; 2 mol H₂ &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p48 | &#124; 2. استخدام النسبة المولية &#124; 2 mol H₂ × (1 mol O₂/2 mol H₂) &#124; 1 mol O₂ &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p49 | &#124; 3. تحويل إلى جرام &#124; 1 mol × 32 g/mol &#124; **32 جرام O₂** &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Key tips and rules for stoichiometry problems (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides crucial guidance and reminders to help students avoid common pitfalls, such as failing to balance equations or comparing masses directly.

Accuracy: **accurate**. The tips are scientifically and pedagogically sound, correctly stressing equation balancing and warning against direct mass comparisons without converting to moles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ## نصائح مهمة للطالب 💡 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | 1. **دائماً** تأكد من وزن المعادلة أولاً قبل البدء بالحل | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p52 | 2. النسبة المولية تُؤخذ من **معاملات المعادلة الموزونة** فقط | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p53 | 3. لا يمكن مقارنة الكتل مباشرة بين مادتين مختلفتين - يجب المرور بالمولات أولاً | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p54 | 4. تذكر: المعامل في المعادلة = عدد المولات وليس الجرامات | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |

## u8: Take-home summary and closing prompt (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the core takeaway of stoichiometry and includes a polite social closing offer for further practice.

Accuracy: **accurate**. The summary accurately re-states the core concept of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p55 | ## المفهوم الأساسي (Take-home message) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | &gt; الستوكيومتري هو ببساطة استخدام **النسب** الموجودة في المعادلة الموزونة لحساب كمية مادة معينة (متفاعل أو ناتج) بناءً على كمية معروفة لمادة أخرى في نفس التفاعل. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p57 | هل تريد مني حل بعض الأمثلة الإضافية معك للتدريب؟ 📝 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

