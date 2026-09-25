# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the mole concept in chemistry, covering its definition, everyday analogy, Avogadro's number, molar mass, conversion formulas, and a worked calculation.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 56,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 5,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 56,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 1,
    "none": 11
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Everyday counting units analogy for the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "عزيزي الطالب، عندما نريد شراء البيض، لا نشتريه حبة حبة، بل نشتريه بـ\"الكرتونة\" (12 بيضة). وعندما نشتري الورق، نشتريه بـ\"الرزمة\" (500 ورقة)."}]}

Annotation rationale: Introduces the mole by comparing it to common counting units like cartons of eggs (12) and reams of paper (500) to explain why chemists need a counting unit for microscopic particles.

Accuracy: **accurate**. The analogy correctly relates grouping units used in daily life (carton of 12, ream of 500) to the mole as a counting unit for particles in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # مفهوم المول (Mole Concept) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## المقدمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | عزيزي الطالب، عندما نريد شراء البيض، لا نشتريه حبة حبة، بل نشتريه بـ&quot;الكرتونة&quot; (12 بيضة). وعندما نشتري الورق، نشتريه بـ&quot;الرزمة&quot; (500 ورقة). كذلك في الكيمياء، الذرات والجزيئات صغيرة جداً جداً، فاحتجنا لوحدة عد خاصة تسمى **المول**. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the mole as a unit for the amount of substance containing Avogadro's number of particles (6.022 x 10^23).

Accuracy: **accurate**. The definition of the mole and the numerical value of Avogadro's constant (6.022 x 10^23) are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ## تعريف المول | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | **المول** هو وحدة لقياس كمية المادة، ويحتوي على عدد معين جداً من الجسيمات (ذرات، جزيئات، أيونات). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | ### عدد أفوجادرو (Avogadro&#x27;s Number) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | المول الواحد يحتوي دائماً على: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | $$N_A = 6.022 \times 10^{23}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | هذا الرقم الهائل يُسمى **عدد أفوجادرو**، نسبة للعالم الإيطالي أميديو أفوجادرو. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Reason for using the mole (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the mole is necessary in laboratory work: bridging the unmeasurable mass of an individual atom to macroscopic measurable masses in grams.

Accuracy: **accurate**. Accurately explains the practical purpose of the mole in bridging atomic scale masses to macroscopic gram-scale quantities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ## لماذا نحتاج المول؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | - الذرة الواحدة كتلتها صغيرة جداً (لا يمكن وزنها بميزان عادي) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | - لذلك نجمع كمية كبيرة من الذرات (مول واحد) لنحصل على كتلة يمكن قياسها بالجرام | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u4: Definition of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole in grams and notes its numerical equivalence to atomic or molecular mass.

Accuracy: **accurate**. The definition of molar mass and its numerical correspondence to atomic or molecular mass are scientifically standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | ## العلاقة بين المول والكتلة المولية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | **الكتلة المولية (M)** هي كتلة مول واحد من المادة بوحدة الجرام، وتساوي رقمياً الكتلة الذرية أو الجزيئية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Molar mass example: Hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the molar mass of atomic hydrogen (1 g/mol) as an illustrative example.

Accuracy: **accurate**. The rounded molar mass for hydrogen (1 g/mol) is standard for introductory chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### أمثلة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | &#124; المادة &#124; الكتلة المولية &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p20 | &#124;--------&#124;----------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p21 | &#124; الهيدروجين (H) &#124; 1 جم/مول &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u6: Molar mass example: Carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the molar mass of carbon (12 g/mol) as an illustrative example.

Accuracy: **accurate**. The molar mass of carbon (12 g/mol) is standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | &#124; الكربون (C) &#124; 12 جم/مول &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Molar mass example: Oxygen gas (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the molar mass of diatomic oxygen gas (32 g/mol) as an illustrative example.

Accuracy: **accurate**. The molar mass of molecular oxygen O2 (32 g/mol) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | &#124; الأكسجين (O₂) &#124; 32 جم/مول &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u8: Molar mass example: Water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the molar mass of water (18 g/mol) as an illustrative molecular example.

Accuracy: **accurate**. The molar mass of water H2O (18 g/mol) is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | &#124; الماء (H₂O) &#124; 18 جم/مول &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u9: Formula relating moles and mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula n = m / M relating the number of moles to mass and molar mass, defining each variable.

Accuracy: **accurate**. The equation n = m / M and the definitions of its components are fully correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | ## القوانين الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | ### 1️⃣ العلاقة بين عدد المولات والكتلة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | $$n = \frac{m}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p29 | حيث: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | - $n$ = عدد المولات | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | - $m$ = الكتلة بالجرام | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | - $M$ = الكتلة المولية | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u10: Formula relating moles and number of particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula n = N / NA relating the number of moles to particle count and Avogadro's number.

Accuracy: **accurate**. The equation n = N / NA and the variable descriptions are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ### 2️⃣ العلاقة بين عدد المولات وعدد الجسيمات: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | $$n = \frac{N}{N_A}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p35 | حيث: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | - $N$ = عدد الجسيمات (ذرات أو جزيئات) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | - $N_A$ = عدد أفوجادرو | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u11: Worked example: Moles and molecules in water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a two-step calculation solving for the number of moles in 36 g of water and subsequently determining the total number of molecules.

Accuracy: **accurate**. Both calculation steps (36/18 = 2 mol and 2 * 6.022e23 = 1.2044e24 molecules) are mathematically and physically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | ## مثال تطبيقي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | **السؤال:** احسب عدد المولات في 36 جرام من الماء (H₂O)، علماً بأن كتلته المولية = 18 جم/مول. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | **الحل:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p42 | $$n = \frac{m}{M} = \frac{36}{18} = 2 \text{ مول}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | **السؤال الإضافي:** كم عدد جزيئات الماء الموجودة؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p44 | **الحل:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p45 | $$N = n \times N_A = 2 \times 6.022 \times 10^{23} = 1.2044 \times 10^{24} \text{ جزيء}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u12: Summary recap table and closing prompt (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key concepts, symbols, and units in a recap table, accompanied by a polite closing question prompting next topics.

Accuracy: **accurate**. The table accurately summarizes the concepts, symbols, and units for moles, mass, molar mass, particle count, and Avogadro's constant.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p47 | ## خلاصة مهمة 📌 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | &#124; المفهوم &#124; الرمز &#124; الوحدة &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p49 | &#124;---------&#124;------&#124;--------&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p50 | &#124; عدد المولات &#124; n &#124; مول &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p51 | &#124; الكتلة &#124; m &#124; جرام &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p52 | &#124; الكتلة المولية &#124; M &#124; جم/مول &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p53 | &#124; عدد الجسيمات &#124; N &#124; جسيم &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p54 | &#124; عدد أفوجادرو &#124; Nₐ &#124; 6.022×10²³ &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p56 | هل تريد مني أن أشرح لك المزيد من الأمثلة، أو ننتقل لموضوع **حجم المول الغازي (22.4 لتر)**؟ 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

