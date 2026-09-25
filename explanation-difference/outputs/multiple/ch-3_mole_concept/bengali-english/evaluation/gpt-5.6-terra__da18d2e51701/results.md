# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly and comprehensively addresses the mole concept in Bengali, covering its definition, Avogadro's number, molar mass, conversion formulas with worked examples, molar volume at STP, and the distinction between atoms and molecules.

## Counts

```json
{
  "total_content_units": 16,
  "substantive_content_units": 16,
  "total_passages": 160,
  "content_unit_kinds": {
    "CONCEPT": 8,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 160,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 1,
    "none": 15
  },
  "proposed_substantive_verdicts": {
    "accurate": 16
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of mole, counting analogy, and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "- ১ ডজন = ১২টি বস্তু  "}, {"passage_id": "p7", "quote": "- ১ স্কোর = ২০টি বস্তু  "}]}

Annotation rationale: Introduces the mole as a unit of measurement for amount of substance, provides analogies to everyday counting units (dozen, score), defines Avogadro's number, and lists representative particles.

Accuracy: **accurate**. The definition of mole, the value of Avogadro's number (6.022 x 10^23), the counting analogies, and the types of particles are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | অবশ্যই। **মোল (Mole) ধারণা** রসায়নের একটি খুব গুরুত্বপূর্ণ বিষয়। এটি ব্যবহার করে আমরা পরমাণু, অণু, আয়ন ইত্যাদির বিশাল সংখ্যাকে সহজে গণনা করি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p3 | ## ১. মোল কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **মোল হলো পদার্থের পরিমাণ মাপার একটি একক।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | যেমন— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | - ১ ডজন = ১২টি বস্তু   | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | - ১ স্কোর = ২০টি বস্তু   | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | - তেমনি, **১ মোল = \(6.022 \times 10^{23}\)** টি কণা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | এই বিশাল সংখ্যাটিকে বলা হয় **অ্যাভোগাড্রো সংখ্যা** (Avogadro’s Number)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p11 | 1 \text{ mole} = 6.022 \times 10^{23} \text{ particles} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p12 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p13 | এখানে particle বা কণা হতে পারে— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - পরমাণু (atom) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - অণু (molecule) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | - আয়ন (ion) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | - ইলেকট্রন ইত্যাদি | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Example 1: Mole of carbon atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates 1 mole in terms of carbon atoms.

Accuracy: **accurate**. Correctly states that 1 mole of carbon atoms contains 6.022 x 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## ২. উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | ### উদাহরণ ১: কার্বনের মোল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p22 | 1 \text{ mol carbon atoms} = 6.022 \times 10^{23} \text{ carbon atoms} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p24 | অর্থাৎ ১ মোল কার্বনে এতগুলো কার্বন পরমাণু থাকে। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Example 2: Mole of water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates 1 mole in terms of water molecules.

Accuracy: **accurate**. Correctly states that 1 mole of water contains 6.022 x 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### উদাহরণ ২: পানির মোল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p27 | 1 \text{ mol } H_2O = 6.022 \times 10^{23} \text{ water molecules} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p29 | অর্থাৎ ১ মোল পানিতে \(6.022 \times 10^{23}\) টি পানির অণু থাকে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Concept of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, specifies its unit (g/mol), and explains its numerical equivalence to relative atomic and molecular masses.

Accuracy: **accurate**. The definition of molar mass, its unit (g/mol), and its numerical equivalence to atomic/molecular mass are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | # ৩. মোলার ভর বা Molar Mass | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | **কোনো পদার্থের ১ মোলের ভরকে মোলার ভর বলে।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | এর একক: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p34 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p35 | \text{g mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p37 | অর্থাৎ গ্রাম প্রতি মোল। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p38 | মোলার ভরের সংখ্যামান পদার্থটির আপেক্ষিক পারমাণবিক ভর বা আণবিক ভরের সমান, শুধু একক হয় g/mol। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Common molar mass values and water example (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reference table of common molar masses (H, O, O2, H2O, CO2, NaCl) along with an illustrative note connecting 18 g water to 1 mole and particle count.

Accuracy: **accurate**. All listed atomic, molecular, and molar masses and the water example are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ## ৪. কিছু গুরুত্বপূর্ণ মোলার ভর | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | &#124; পদার্থ &#124; আণবিক/পারমাণবিক ভর &#124; মোলার ভর &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p42 | &#124;---&#124;---:&#124;---:&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p43 | &#124; H (হাইড্রোজেন) &#124; 1 &#124; 1 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p44 | &#124; O (অক্সিজেন পরমাণু) &#124; 16 &#124; 16 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p45 | &#124; \(O_2\) &#124; \(16 \times 2 = 32\) &#124; 32 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p46 | &#124; \(H_2O\) &#124; \(2(1)+16 = 18\) &#124; 18 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p47 | &#124; \(CO_2\) &#124; \(12+2(16)=44\) &#124; 44 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p48 | &#124; NaCl &#124; \(23+35.5=58.5\) &#124; 58.5 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p49 | যেমন, **১৮ গ্রাম পানি = ১ মোল পানি**। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p50 | এবং এতে থাকে— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p51 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p52 | 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p53 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p54 | টি পানির অণু। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the formula n = m/M and defines the variables.

Accuracy: **accurate**. The formula n = m/M and its associated units and variable definitions are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | # ৫. মোলের প্রধান সূত্রগুলো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | ## ক) ভর থেকে মোল নির্ণয় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p58 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p59 | \boxed{n = \frac{m}{M}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p60 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p61 | যেখানে, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p62 | - \(n\) = মোলের সংখ্যা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p63 | - \(m\) = পদার্থের ভর (গ্রামে) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p64 | - \(M\) = মোলার ভর (g/mol) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Worked example: Calculating moles from mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation determining that 36 g of water equals 2 moles.

Accuracy: **accurate**. The calculation 36 g / (18 g/mol) = 2 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p65 | ### উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | ৩৬ গ্রাম পানিতে কত মোল আছে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p67 | পানির মোলার ভর = ১৮ g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p69 | n=\frac{36}{18}=2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p71 | **উত্তর: ৩৬ গ্রাম পানিতে ২ মোল পানি আছে।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Formula for calculating number of particles from moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the formula N = n * N_A and defines variables.

Accuracy: **accurate**. The formula N = n * N_A and the definitions of N, n, and N_A are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p73 | ## খ) মোল থেকে কণার সংখ্যা নির্ণয় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p75 | \boxed{N=n \times N_A} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p76 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p77 | যেখানে, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p78 | - \(N\) = কণার সংখ্যা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p79 | - \(n\) = মোলের সংখ্যা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p80 | - \(N_A = 6.022 \times 10^{23}\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u9: Worked example: Calculating number of O2 molecules in 2 moles (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation determining that 2 moles of O2 contain 1.2044 x 10^24 molecules.

Accuracy: **accurate**. The calculation 2 * (6.022 x 10^23) = 1.2044 x 10^24 is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p81 | ### উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p82 | ২ মোল অক্সিজেন অণুতে কতটি \(O_2\) অণু আছে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p83 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p84 | N=2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p86 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p87 | =1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p89 | **উত্তর: \(1.2044 \times 10^{24}\) টি অক্সিজেন অণু।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p90 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Formula for calculating moles from number of particles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the formula n = N / N_A.

Accuracy: **accurate**. The formula n = N / N_A is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p91 | ## গ) কণার সংখ্যা থেকে মোল নির্ণয় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p92 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p93 | \boxed{n=\frac{N}{N_A}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p94 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |

## u11: Worked example: Calculating moles from number of carbon atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation finding that 3.011 x 10^23 carbon atoms equals 0.5 mole.

Accuracy: **accurate**. The calculation (3.011 x 10^23) / (6.022 x 10^23) = 0.5 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p95 | ### উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p96 | \(3.011 \times 10^{23}\) টি কার্বন পরমাণু কত মোল? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p97 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p98 | n=\frac{3.011\times10^{23}}{6.022\times10^{23}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p100 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p101 | =0.5 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p103 | **উত্তর: ০.৫ মোল।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p104 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Molar volume of ideal gases at STP and calculation formula (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that at STP (0°C, 1 atm), 1 mole of any ideal gas occupies 22.4 L, and presents n = V / 22.4.

Accuracy: **accurate**. The standard high school chemistry definition of STP (0°C, 1 atm), molar volume (22.4 L), and the formula n = V / 22.4 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | # ৬. গ্যাসের ক্ষেত্রে মোল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | মানক তাপমাত্রা ও চাপে (STP: 0°C এবং 1 atm চাপ): | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p107 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p108 | \boxed{1 \text{ mol gas} = 22.4 \text{ L}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p109 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p110 | অর্থাৎ STP-তে ১ মোল যেকোনো আদর্শ গ্যাসের আয়তন ২২.৪ লিটার। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p111 | সূত্র: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p112 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p113 | \boxed{n=\frac{V}{22.4}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p114 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p115 | এখানে \(V\) হলো গ্যাসের আয়তন (লিটারে)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u13: Worked example: Calculating moles from volume of oxygen gas at STP (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation determining that 44.8 L of O2 at STP equals 2 moles.

Accuracy: **accurate**. The calculation 44.8 / 22.4 = 2 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p116 | ### উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | STP-তে ৪৪.৮ L অক্সিজেন গ্যাসে কত মোল আছে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p118 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p119 | n=\frac{44.8}{22.4}=2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p120 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p121 | **উত্তর: ২ মোল \(O_2\) গ্যাস।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p122 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Distinction between moles of molecules and constituent atoms (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how 1 mole of a compound (H2O) relates to the moles and numbers of constituent atoms (2 moles of H atoms, 1 mole of O atoms).

Accuracy: **accurate**. The explanation and stoichiometric breakdown of 1 mol H2O into constituent atoms are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p123 | # ৭. একটি গুরুত্বপূর্ণ পার্থক্য: পরমাণু ও অণু | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p124 | ধরা যাক, ১ মোল পানি \((H_2O)\) আছে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p125 | - পানির অণুর সংখ্যা = \(6.022 \times 10^{23}\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p126 | - প্রতিটি পানির অণুতে ২টি H পরমাণু আছে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p127 | - তাই H পরমাণুর সংখ্যা হবে: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p128 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p129 | 2 \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p130 | = 1.2044 \times 10^{24} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p131 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p132 | অর্থাৎ ১ মোল \(H_2O\)-তে— | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p133 | - ১ মোল পানির অণু | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p134 | - ২ মোল H পরমাণু | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p135 | - ১ মোল O পরমাণু | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p136 | থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p137 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Summary diagram and formula recap (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary linking mass, moles, particles, and gas volume using flow diagrams and conversion formulas.

Accuracy: **accurate**. All summarized relationships and equations are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p138 | # ৮. মোল ধারণার সহজ সারসংক্ষেপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p139 | মোলকে এভাবে মনে রাখতে পারো: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p140 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p141 | \text{গ্রাম} \leftrightarrow \text{মোল} \leftrightarrow \text{কণার সংখ্যা} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p142 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p143 | ### সম্পর্কগুলো: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p144 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p145 | \text{মোল}=\frac{\text{ভর}}{\text{মোলার ভর}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p146 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p147 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p148 | \text{কণার সংখ্যা}=\text{মোল} \times 6.022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p149 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p150 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p151 | \text{STP-তে মোল}=\frac{\text{গ্যাসের আয়তন}}{22.4} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p152 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p153 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Memory tips and practical applications (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents core takeaway bullet points to remember and concludes with the practical role of moles in chemical reactions.

Accuracy: **accurate**. The memory tips accurately reflect the key definitions, benchmarks, and applications of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p154 | ## মনে রাখার কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p155 | - **১ মোল = \(6.022 \times 10^{23}\) কণা** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p156 | - **মোল = ভর ÷ মোলার ভর** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p157 | - **STP-তে ১ মোল গ্যাস = ২২.৪ L** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p158 | - **১৮ g পানি = ১ mol পানি** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p159 | - **৪৪ g \(CO_2\) = ১ mol \(CO_2\)** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p160 | মোল ধারণা ব্যবহার করে রাসায়নিক বিক্রিয়ায় কত গ্রাম পদার্থ লাগবে, কত গ্যাস উৎপন্ন হবে বা কত অণু থাকবে—এসব হিসাব করা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

