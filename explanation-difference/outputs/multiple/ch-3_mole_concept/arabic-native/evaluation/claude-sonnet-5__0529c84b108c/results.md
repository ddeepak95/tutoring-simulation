# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses the mole concept in chemistry, covering its intuitive justification via analogy, formal definition, Avogadro's number, molar mass, calculation formulas, worked examples, and significance.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 34,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 3,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Rice analogy explaining the need for the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "تخيل أنك تريد شراء الأرز، هل تشتريه حبة حبة؟ بالطبع لا! نشتريه بالكيلوجرام. لماذا؟ لأن عدد حبات الأرز كبير جداً بحيث يصعب عدّها."}]}

Annotation rationale: Uses a cross-domain comparison between buying rice by mass (kilograms) instead of counting individual grains and measuring microscopic chemical particles (atoms/molecules) using the mole.

Accuracy: **accurate**. The analogy accurately illustrates why macroscopic counting/bulk units are necessary when dealing with huge numbers of microscopic particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # مفهوم المول (Mole) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## لماذا نحتاج إلى المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | تخيل أنك تريد شراء الأرز، هل تشتريه حبة حبة؟ بالطبع لا! نشتريه بالكيلوجرام. لماذا؟ لأن عدد حبات الأرز كبير جداً بحيث يصعب عدّها. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | في الكيمياء، نتعامل مع **ذرات وجزيئات صغيرة جداً** لا يمكن رؤيتها، وعددها في أي عينة مادة يكون هائلاً جداً. فكيف نتعامل معها؟ هنا يأتي دور **المول**! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "- الدزينة = 12 قطعة"}]}

Annotation rationale: Defines the mole as the unit of amount of substance, compares it to grouping units like a dozen and hundred, and introduces Avogadro's number.

Accuracy: **accurate**. The mole is accurately defined as the unit of amount of substance containing 6.022 x 10^23 entities (Avogadro's number).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ## تعريف المول | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | **المول** هو وحدة لقياس **كمية المادة**، تماماً كما أن: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | - الدزينة = 12 قطعة | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | - المئة = 100 قطعة | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | - **المول = 6.022 × 10²³ جسيم** (ذرة، جزيء، أيون...) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | هذا الرقم يسمى **عدد أفوجادرو**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Illustrative comparison table of counting units (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p14", "quote": "| دزينة بيض | 12 بيضة |"}]}

Annotation rationale: Provides a tabular comparison illustrating how units represent quantities across a dozen eggs, a mole of hydrogen atoms, and a mole of water molecules.

Accuracy: **accurate**. All quantities in the table correctly reflect the definition of a dozen and a mole of specific chemical species.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## مثال توضيحي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | &#124; الوحدة &#124; الكمية &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124;--------&#124;--------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; دزينة بيض &#124; 12 بيضة &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124; مول ذرات هيدروجين &#124; 6.022×10²³ ذرة هيدروجين &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124; مول جزيئات ماء &#124; 6.022×10²³ جزيء ماء &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u4: Relationship between mole and mass (molar mass) (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the concept of molar mass and its numerical correspondence to atomic mass expressed in grams.

Accuracy: **accurate**. The statement that an element's molar mass in grams corresponds numerically to its atomic mass is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## العلاقة مع الكتلة (الكتلة المولية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | هنا تكمن أهمية المول العملية! كل عنصر له **كتلة مولية** تساوي كتلته الذرية بالجرام. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Molar mass of carbon example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the concept of molar mass concretely to carbon, stating that 1 mole of carbon weighs 12 grams and contains 6.022 x 10^23 carbon atoms.

Accuracy: **accurate**. Carbon (atomic mass approx. 12) has a molar mass of 12 g/mol, which contains 1 mole of atoms (6.022 x 10^23 atoms).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | **مثال:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | - الكربون (C) كتلته الذرية = 12 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | - إذن **مول واحد من الكربون = 12 جرام**، ويحتوي على 6.022×10²³ ذرة كربون | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Formula for calculating number of moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the standard mathematical equation relating number of moles, mass in grams, and molar mass in g/mol.

Accuracy: **accurate**. The equation n = m / M is the correct formula for calculating moles from mass and molar mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## كيف نحسب عدد المولات؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | $$\text{عدد المولات} = \frac{\text{الكتلة (جم)}}{\text{الكتلة المولية (جم/مول)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u7: Worked calculation of moles and atoms in 24 grams of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Carries out a complete worked solution calculating the number of moles in 24 g of carbon and determining the resulting number of carbon atoms.

Accuracy: **accurate**. The calculation 24 / 12 = 2 moles, corresponding to 2 x 6.022 x 10^23 carbon atoms, is mathematically and conceptually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | **مثال تطبيقي:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | لديك 24 جرام من الكربون، كم عدد المولات؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | $$\text{عدد المولات} = \frac{24}{12} = 2 \text{ مول}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | هذا يعني أن لديك 2 × 6.022×10²³ ذرة كربون! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Significance of the mole as a macroscopic-microscopic bridge (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the mole is essential in chemistry: it bridges the microscopic domain of atoms/molecules with the macroscopic domain of measurable mass.

Accuracy: **accurate**. Accurately articulates the core conceptual purpose of the mole in connecting atomic numbers to laboratory-measurable masses for stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## لماذا هذا مهم؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | المول يربط بين: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | 1. **العالم المجهري** (عدد الذرات/الجزيئات) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p31 | 2. **العالم المحسوس** (الكتلة التي نزنها بالميزان) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p32 | بدون المول، لن نستطيع حساب كميات المواد المتفاعلة في التفاعلات الكيميائية بدقة! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u9: Practice question on mole-mass conversion (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Poses a practice question prompting the student to calculate the mass in grams for 3 moles of oxygen given a molar mass of 16 g/mol.

Accuracy: **accurate**. The givens in the practice question are physically and chemically accurate and well-posed.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p34 | **سؤال للتفكير:** إذا كانت الكتلة المولية للأكسجين (O) = 16 جم/مول، فكم جرام يوجد في 3 مولات من الأكسجين؟ 🤔 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |

