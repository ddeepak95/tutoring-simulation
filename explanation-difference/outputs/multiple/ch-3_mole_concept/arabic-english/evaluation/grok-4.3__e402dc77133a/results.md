# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and clearly explains the mole concept for high school level in Arabic, including the definition of the mole, Avogadro's number, illustrative molar mass examples, mathematical formulas for moles from mass and particles, worked calculations, and a recap.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 40,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 40,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 1,
    "none": 9
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "\"دزينة\" = 12 قطعة (بيض أو تفاح...)"}]}

Annotation rationale: Defines the mole as the SI unit of amount of substance, introduces Avogadro's number using an everyday dozen analogy, and explains why such a huge counting unit is required for atoms and molecules.

Accuracy: **accurate**. The definition of the mole as the unit of amount of substance, Avogadro's constant value, and the rationale for its large magnitude are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **مفهوم المول ببساطة** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | مرحبا! سأشرح لك مفهوم **المول** بطريقة سهلة ومناسبة للمرحلة الثانوية، كأننا نتحدث في الفصل. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### 1. ما هو المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | المول هو **وحدة قياس كمية المادة** في الكيمياء.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | مثلما نقول &quot;دزينة&quot; = 12 قطعة (بيض أو تفاح...)، فإن **المول الواحد = 6.022 × 10²³ جسيم**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | هذا العدد الكبير جدًا يُسمى **رقم أفوغادرو** (Avogadro’s number).   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | لماذا هذا العدد ضخم؟ لأن الذرات والجزيئات صغيرة جدًا، فلا نستطيع عدها واحدة واحدة، فنستخدم المول كـ&quot;عدّاد كبير&quot;. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Molar mass and particle count of Carbon-12 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives an illustrative example of 1 mole of carbon-12 atoms with its Avogadro particle count and corresponding mass of 12 grams.

Accuracy: **accurate**. One mole of carbon-12 atoms contains 6.022 x 10^23 atoms and has a mass of exactly 12 g.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### 2. أمثلة عملية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | - مول واحد من ذرات الكربون-12 = 6.022 × 10²³ ذرة، وكتلته **12 جرام**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Molar mass and particle count of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives an illustrative example of 1 mole of water molecules with its particle count and mass of 18 grams.

Accuracy: **accurate**. One mole of water (H2O) contains 6.022 x 10^23 molecules and has a rounded molar mass of 18 g/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | - مول واحد من جزيئات الماء (H₂O) = 6.022 × 10²³ جزيء، وكتلته **18 جرام**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Molar mass and particle count of oxygen gas (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives an illustrative example of 1 mole of diatomic oxygen gas molecules with its particle count and mass of 32 grams.

Accuracy: **accurate**. One mole of O2 contains 6.022 x 10^23 molecules and has a molar mass of 32 g/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | - مول واحد من غاز الأكسجين (O₂) = 6.022 × 10²³ جزيء، وكتلته **32 جرام**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Role of the mole in connecting chemical quantities (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemists use the mole, identifying it as the bridge connecting mass in grams, particle counts, and gas volume.

Accuracy: **accurate**. Accurately identifies the central role of the mole in stoichiometry linking mass, number of particles, and gas volume.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 3. لماذا نستخدم المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | لأنه يربط بين ثلاثة أشياء مهمة: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | - **الكتلة** (بالجرام) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - **عدد الجسيمات** (ذرات أو جزيئات) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | - **الحجم** (في حالة الغازات) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formula relating number of moles to mass and molar mass (n = m / M) and defines each variable with its units.

Accuracy: **accurate**. The equation n = m / M and variable definitions with corresponding units (mol, g, g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### 4. القوانين الأساسية (مهمة جدًا) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | **أ. عدد المولات من الكتلة:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p20 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p21 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p22 | - \( n \) = عدد المولات (mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | - \( m \) = الكتلة بالجرام | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - \( M \) = الكتلة المولية (g/mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Worked example: calculating moles from mass for water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation determining the number of moles in 36 g of water given its molar mass of 18 g/mol.

Accuracy: **accurate**. The calculation 36 / 18 = 2 moles is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | **مثال:** كم مول في 36 جرام من الماء؟   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | (الكتلة المولية للماء = 18 جم/مول)   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | \( n = 36 / 18 = 2 \) مول | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u8: Formula for calculating number of particles from moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula N = n * N_A relating particle count to moles and Avogadro's constant, defining each term.

Accuracy: **accurate**. The equation N = n * N_A and Avogadro constant value 6.022 x 10^23 are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | **ب. عدد الجسيمات:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p30 | N = n \times N_A | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | - \( N \) = عدد الجسيمات | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | - \( N_A \) = رقم أفوغادرو = 6.022 × 10²³ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u9: Worked example: calculating number of molecules from moles for water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation finding the number of molecules present in 2 moles of water.

Accuracy: **accurate**. The calculation 2 * 6.022 x 10^23 = 1.2044 x 10^24 molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | **مثال:** كم جزيء في 2 مول من الماء؟   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | \( N = 2 \times 6.022 \times 10^{23} = 1.2044 \times 10^{24} \) جزيء | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u10: Quick summary of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick bulleted summary reinforcing key takeaways about the mole value, molar mass, and conversions, closing with a teacher prompt.

Accuracy: **accurate**. The summary points accurately capture the core aspects of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### 5. ملخص سريع | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | - 1 مول = 6.022 × 10²³ جسيم | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p38 | - الكتلة المولية = كتلة مول واحد (تُحسب من الجدول الدوري) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p39 | - المول يساعدنا نحول بين &quot;الكتلة&quot; و&quot;عدد الذرات/الجزيئات&quot; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p40 | هل تريد أمثلة أكثر؟ أو شرح حسابات المولارية أو حجم الغازات؟ قل لي وسأكمل الشرح! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

