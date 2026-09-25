# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains stoichiometry (الحسابات الكيميائية), covering its definition, basic mole concepts and conversion formulas, systematic steps for solving stoichiometry problems, a fully worked example, and useful study tips.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 44,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 44,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what stoichiometry is and highlights the reliance on balanced chemical equations.

Accuracy: **accurate**. The definition correctly describes stoichiometry as calculations used to determine reactant and product amounts based on a balanced chemical equation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # الحسابات الكيميائية (Stoichiometry) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## 🔬 ما هي الحسابات الكيميائية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | هي الحسابات التي تُستخدم لمعرفة كميات المواد المتفاعلة والناتجة في التفاعل الكيميائي، بالاعتماد على **المعادلة الكيميائية الموزونة**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Foundational mole concepts and conversion relationships (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains foundational concepts including the mole, Avogadro's number, molar mass, and conversion formulas connecting mass, moles, particle count, and STP gas volume.

Accuracy: **accurate**. The unit accurately defines the mole, Avogadro's constant (6.022 × 10²³), molar mass, and standard conversion relationships including 22.4 L/mol for ideal gases at STP.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ## 📌 المفاهيم الأساسية المطلوبة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | ### 1. المول (Mole) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | - المول هو وحدة لقياس كمية المادة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | - **1 مول = 6.022 × 10²³ جسيم** (عدد أفوجادرو) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | - الكتلة المولية = كتلة المول الواحد بالجرام (تُقاس بوحدة g/mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | ### 2. العلاقات المهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | &#124; من &#124; إلى &#124; العلاقة &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &#124;---&#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p13 | &#124; الكتلة &#124; المول &#124; عدد المولات = الكتلة ÷ الكتلة المولية &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p14 | &#124; المول &#124; عدد الجسيمات &#124; عدد الجسيمات = عدد المولات × 6.022×10²³ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p15 | &#124; المول &#124; حجم الغاز (STP) &#124; الحجم = عدد المولات × 22.4 لتر &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Steps for solving stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a reusable 4-step algorithm for tackling standard stoichiometry problems.

Accuracy: **accurate**. The procedural steps (balance equation -> convert given quantity to moles -> apply stoichiometric mole ratio -> convert moles to target unit) represent the standard pedagogical workflow for stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## 🧮 خطوات حل مسائل الحسابات الكيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | ### الخطوة 1: اكتب المعادلة الكيميائية الموزونة ✅ | PROCEDURE | {} | [&#x27;heading&#x27;] |
| p19 | هذا **أهم خطوة** لأن الأرقام (المعاملات) تخبرنا بنسب التفاعل. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | ### الخطوة 2: حوّل الكمية المعطاة إلى مولات | PROCEDURE | {} | [&#x27;heading&#x27;] |
| p21 | ### الخطوة 3: استخدم النسبة المولية من المعادلة الموزونة | PROCEDURE | {} | [&#x27;heading&#x27;] |
| p22 | ### الخطوة 4: حوّل الناتج من مولات إلى الوحدة المطلوبة | PROCEDURE | {} | [&#x27;heading&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Worked mass-to-mass stoichiometry calculation (H2 and O2 reacting to form H2O) (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked example calculating the mass of oxygen required to react with 4 grams of hydrogen gas.

Accuracy: **accurate**. All calculations and steps are correct: n(H2) = 4 / 2 = 2 mol; n(O2) = 2 × (1/2) = 1 mol; mass(O2) = 1 × 32 = 32 g.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ## 💡 مثال تطبيقي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | **السؤال:** كم جرام من الأكسجين (O₂) نحتاج للتفاعل الكامل مع 4 جرام من الهيدروجين (H₂) لإنتاج الماء؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | **المعادلة الموزونة:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | **الحل:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | **الخطوة 1:** حساب عدد مولات H₂ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | $$n(H_2) = \frac{الكتلة}{الكتلة المولية} = \frac{4}{2} = 2 \text{ مول}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | **الخطوة 2:** استخدام النسبة المولية من المعادلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | - النسبة بين H₂ و O₂ هي 2:1 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | $$n(O_2) = n(H_2) \times \frac{1}{2} = 2 \times \frac{1}{2} = 1 \text{ مول}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | **الخطوة 3:** حساب كتلة O₂ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p35 | - الكتلة المولية لـ O₂ = 32 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | $$الكتلة = n \times الكتلة المولية = 1 \times 32 = 32 \text{ جرام}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | ### ✅ الإجابة: نحتاج 32 جرام من الأكسجين | EXAMPLE | {} | [&#x27;heading&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Study advice for solving stoichiometry problems (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents practical tips and reminders for high school students when tackling stoichiometry, followed by a closing conversational offer.

Accuracy: **accurate**. The tips (checking balanced equations, keeping track of units, practicing molar mass calculations) are sound and accurate pedagogical advice.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ## ⚠️ نصائح مهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | 1. **لا تنسَ وزن المعادلة** قبل البدء بأي حسابات | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p41 | 2. **انتبه للوحدات** دائمًا (جرام، مول، لتر) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p42 | 3. تدرّب على حساب **الكتلة المولية** لأي مركب بجمع الكتل الذرية | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p44 | هل تريد أن أشرح لك موضوع **المتفاعل المحدد (Limiting Reactant)** أو أعطيك تمارين للتدريب؟ 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

