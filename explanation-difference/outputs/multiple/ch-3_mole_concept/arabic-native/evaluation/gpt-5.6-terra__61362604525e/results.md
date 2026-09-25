# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly explains the mole concept, Avogadro's number, molar mass, and basic calculations connecting mass, moles, and number of particles.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 106,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "ANALOGY": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 106,
  "unique_subtopics": 3,
  "contextualization": {
    "everyday": 3,
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: The mole as a counting unit for microscopic entities (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "- **الدزينة** لعدّ 12 قطعة."}, {"passage_id": "p3", "quote": "- **الكيلوغرام** لقياس الكتلة."}, {"passage_id": "p4", "quote": "- **المتر** لقياس الطول."}]}

Annotation rationale: Introduces the mole as a unit for amount of substance in chemistry and explains why chemists need such a large counting unit due to the microscopic scale of atoms and molecules.

Accuracy: **accurate**. Correctly states the definition and purpose of the mole as the SI base unit for amount of substance.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | المول هو **وحدة لقياس كمية المادة** في الكيمياء، تمامًا كما نستخدم: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | - **الدزينة** لعدّ 12 قطعة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p3 | - **الكيلوغرام** لقياس الكتلة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - **المتر** لقياس الطول. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | لكن لأن الذرات والجزيئات صغيرة جدًا، لا يمكننا عدّها واحدةً واحدة. لذلك يستخدم الكيميائيون وحدة كبيرة جدًا اسمها **المول**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines one mole numerically as containing Avogadro's number (6.022 x 10^23) of particles, with illustrative examples for atoms, molecules, and ions.

Accuracy: **accurate**. Avogadro's number is given correctly as 6.022 x 10^23 particles per mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## تعريف المول | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | **المول الواحد يحتوي على عدد ثابت من الجسيمات يساوي:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p11 | ويسمى هذا العدد **عدد أفوجادرو**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | إذن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | - 1 مول من ذرات الحديد = \(6.022 \times 10^{23}\) ذرة حديد. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | - 1 مول من جزيئات الماء = \(6.022 \times 10^{23}\) جزيء ماء. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | - 1 مول من أيونات الصوديوم = \(6.022 \times 10^{23}\) أيون صوديوم. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Analogy between a dozen and a mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p19", "quote": "1 \\text{ دزينة} = 12 \\text{ قطعة}"}]}

Annotation rationale: Draws an explicit cross-domain analogy between the familiar counting unit of a dozen (12 items) and a mole (6.022 x 10^23 particles).

Accuracy: **accurate**. The analogy accurately captures that both the dozen and the mole are fixed counting numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## تشبيه بسيط | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | كما أن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | \[ | ANALOGY | {} | [&#x27;equation&#x27;] |
| p19 | 1 \text{ دزينة} = 12 \text{ قطعة} | ANALOGY | {} | [&#x27;equation&#x27;] |
| p20 | \] | ANALOGY | {} | [&#x27;equation&#x27;] |
| p21 | فإن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | \[ | ANALOGY | {} | [&#x27;equation&#x27;] |
| p23 | 1 \text{ مول} = 6.022 \times 10^{23} \text{ جسيمًا} | ANALOGY | {} | [&#x27;equation&#x27;] |
| p24 | \] | ANALOGY | {} | [&#x27;equation&#x27;] |
| p25 | الفرق فقط أن المول عدد ضخم جدًا؛ لأن الجسيمات الكيميائية صغيرة للغاية. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p26 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Definition of molar mass and relation to atomic/molecular mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what molar mass is, its units (g/mol), and how it numerically corresponds to the atomic or molecular mass found in the periodic table.

Accuracy: **accurate**. Molar mass definition and its unit (g/mol) along with its numerical equivalence to atomic mass in amu are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## ما العلاقة بين المول والكتلة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | لكل مادة **كتلة مولية**، وهي كتلة مول واحد منها، وتقاس بوحدة: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p30 | \text{غرام/مول} \; (g/mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | وتكون الكتلة المولية مساوية تقريبًا للكتلة الذرية أو الجزيئية الموجودة في الجدول الدوري، لكن بوحدة غرام/مول. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Molar mass and particle count for carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the concept of molar mass to carbon, showing that 1 mole of carbon atoms equals 12 grams and contains 6.022 x 10^23 carbon atoms.

Accuracy: **accurate**. Atomic weight of carbon is approximately 12 g/mol, representing 6.022 x 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ### مثال 1: الكربون | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | الكتلة الذرية للكربون تساوي تقريبًا 12. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | إذن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | 1 \text{ مول من ذرات الكربون} = 12 \text{ غرامًا} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | وهذه الـ12 غرامًا تحتوي على: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | ذرة كربون. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Molar mass and particle count for water (H2O) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how to calculate the molar mass of a molecule (water, H2O) by summing atomic weights, showing 18 g/mol and the corresponding particle count.

Accuracy: **accurate**. Calculates molar mass of H2O as 2(1) + 16 = 18 g/mol, correctly equating 1 mol to 18 g and 6.022 x 10^23 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ### مثال 2: الماء \(H_2O\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | يتكون الماء من: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p46 | - ذرتين هيدروجين: \(2 \times 1 = 2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p47 | - ذرة أكسجين: \(16\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p48 | إذن الكتلة المولية للماء: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p49 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | 2 + 16 = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | أي أن: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | 1 \text{ مول من الماء} = 18 \text{ غرامًا} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | ويحتوي على: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | جزيء ماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formula n = m / M, defining each variable (number of moles, mass in grams, molar mass).

Accuracy: **accurate**. Formula n = m / M is accurately stated with standard symbols and units.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p62 | ## أهم القوانين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p63 | ### 1. حساب عدد المولات من الكتلة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p65 | \text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p67 | ويرمز لها غالبًا: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p68 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p69 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p70 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p71 | حيث: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p72 | - \(n\): عدد المولات | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p73 | - \(m\): الكتلة بالجرام | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p74 | - \(M\): الكتلة المولية بالجرام/مول | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u8: Worked calculation: finding moles from 36 grams of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numerical example calculating the number of moles in 36 g of water using n = 36 / 18 = 2 mol.

Accuracy: **accurate**. Calculations are mathematically and conceptually correct: 36 g / 18 g/mol = 2 mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p75 | ### مثال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p76 | ما عدد مولات الماء في 36 غرامًا من الماء؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p77 | الكتلة المولية للماء = 18 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p78 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | n = \frac{36}{18} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | إذن 36 غرامًا من الماء تساوي **2 مول**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p82 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Formula for calculating number of particles from moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the relation for converting moles to number of particles: number of particles = number of moles x Avogadro's number.

Accuracy: **accurate**. Formula accurately reflects N = n * N_A.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p83 | ### 2. حساب عدد الجسيمات من عدد المولات | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p84 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p85 | \text{عدد الجسيمات} = \text{عدد المولات} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p86 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u10: Worked calculation: finding number of molecules in 2 moles of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step arithmetic multiplying 2 moles by 6.022 x 10^23 to find 1.2044 x 10^24 water molecules.

Accuracy: **accurate**. Calculation 2 * 6.022 * 10^23 = 1.2044 * 10^24 molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p87 | مثال: كم جزيئًا في 2 مول من الماء؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p88 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | أي يوجد تقريبًا: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p93 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p94 | 1.204 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | جزيء ماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p97 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Quick summary of mole concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p106", "quote": "فكّر في المول على أنه “دزينة ضخمة جدًا” يستخدمها الكيميائيون لأن المواد تتكون من أعداد هائلة من الذرات والجزيئات."}]}

Annotation rationale: Summarizes the key points covered: definition of mole, Avogadro's number, molar mass, conversion formula, and the dozen analogy.

Accuracy: **accurate**. The recap accurately synthesizes all foundational definitions and relationships.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p98 | ## خلاصة سريعة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | - **المول** طريقة لعدّ الذرات أو الجزيئات أو الأيونات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p100 | - **1 مول** يحتوي على \(6.022 \times 10^{23}\) جسيمًا. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p101 | - كتلة 1 مول من المادة تسمى **الكتلة المولية**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p102 | - للتحويل من الكتلة إلى مولات نستخدم: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p103 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p104 | n = \frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p105 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p106 | فكّر في المول على أنه “دزينة ضخمة جدًا” يستخدمها الكيميائيون لأن المواد تتكون من أعداد هائلة من الذرات والجزيئات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

