# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains the mole concept in Bengali, including its definition, Avogadro's number, molar mass, key calculation formulas, a worked practice example, molar volume at STP, a recap summary, and the importance of the concept in chemistry.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 64,
  "content_unit_kinds": {
    "ANALOGY": 2,
    "CONCEPT": 5,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 64,
  "unique_subtopics": 11,
  "contextualization": {
    "everyday": 2,
    "none": 11
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of everyday counting units (dozen, ream) to the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "- ডিম গণনা করি **ডজন** (১২টি) হিসেবে"}, {"passage_id": "p5", "quote": "- কাগজ গণনা করি **রিম** (৫০০ শীট) হিসেবে"}]}

Annotation rationale: Introduces the need for the mole by comparing it to everyday counting units like dozens for eggs and reams for paper.

Accuracy: **accurate**. The comparison accurately motivates the need for a large counting unit like the mole for extremely small particles such as atoms and molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # মোল ধারণা (Mole Concept) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## ভূমিকা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | আমরা যখন কোনো জিনিস গণনা করি, তখন কিছু সুবিধাজনক একক ব্যবহার করি। যেমন: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | - ডিম গণনা করি **ডজন** (১২টি) হিসেবে | ANALOGY | {} | [&#x27;list&#x27;] |
| p5 | - কাগজ গণনা করি **রিম** (৫০০ শীট) হিসেবে | ANALOGY | {} | [&#x27;list&#x27;] |
| p6 | কিন্তু পরমাণু বা অণু এত ক্ষুদ্র যে এদের সংখ্যা গণনা করতে হলে অনেক বড় একক দরকার। এই কারণেই রসায়নবিদরা **মোল (Mole)** নামক একক ব্যবহার করেন। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a mole is as a unit of measurement for amount of substance and introduces Avogadro's number (6.022 × 10²³).

Accuracy: **accurate**. The definition of the mole and the numerical value and symbol for Avogadro's constant are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## মোল কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | **মোল** হলো পদার্থের পরিমাণ পরিমাপের একটি একক, যা দিয়ে আমরা পরমাণু, অণু, আয়ন বা কণার সংখ্যা প্রকাশ করি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | ### সংজ্ঞা: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | &gt; ১ মোল = 6.022 × 10²³ টি কণা (পরমাণু, অণু, আয়ন ইত্যাদি) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | এই সংখ্যাটিকে বলা হয় **অ্যাভোগাড্রো সংখ্যা (Avogadro&#x27;s Number)**, যা N_A দ্বারা প্রকাশ করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | $$N_A = 6.022 \times 10^{23}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Tabular comparison of counting units (dozen, gross, mole) (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p18", "quote": "| ১ ডজন | ১২ |"}]}

Annotation rationale: Presents a comparison table contrasting common fixed counting units (dozen, gross) with the mole.

Accuracy: **accurate**. The numerical values for 1 dozen (12), 1 gross (144), and 1 mole (6.022 × 10²³) are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## সহজ উদাহরণ দিয়ে বোঝা যাক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | &#124; একক &#124; সংখ্যা &#124; | ANALOGY | {} | [&#x27;table&#x27;] |
| p17 | &#124;------&#124;--------&#124; | ANALOGY | {} | [&#x27;table&#x27;] |
| p18 | &#124; ১ ডজন &#124; ১২ &#124; | ANALOGY | {} | [&#x27;table&#x27;] |
| p19 | &#124; ১ গ্রস &#124; ১৪৪ &#124; | ANALOGY | {} | [&#x27;table&#x27;] |
| p20 | &#124; ১ মোল &#124; 6.022 × 10²³ &#124; | ANALOGY | {} | [&#x27;table&#x27;] |

## u4: Example of one mole of carbon atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the mole concept applied to a specific elemental substance: carbon atoms.

Accuracy: **accurate**. 1 mole of carbon atoms correctly contains 6.022 × 10²³ carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | **উদাহরণ:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | - ১ মোল কার্বন পরমাণু = 6.022 × 10²³ টি কার্বন পরমাণু | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Example of one mole of water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the mole concept applied to a molecular compound: water molecules.

Accuracy: **accurate**. 1 mole of water molecules correctly contains 6.022 × 10²³ water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | - ১ মোল পানির অণু = 6.022 × 10²³ টি পানির অণু | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Definition and principle of molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains molar mass as the mass of 1 mole of a substance in g/mol and its connection to atomic/molecular mass.

Accuracy: **accurate**. The definition of molar mass and its numerical equivalence to atomic/molecular mass in grams/mole is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## মোলার ভর (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | কোনো পদার্থের **১ মোল** পরিমাণের ভরকে বলা হয় **মোলার ভর**, যার একক হলো গ্রাম/মোল (g/mol)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | **নিয়ম:** কোনো মৌলের পারমাণবিক ভর (g/mol এককে) = সেই মৌলের ১ মোলের ভর | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the molar mass calculation and mass of 1 mole for carbon.

Accuracy: **accurate**. Carbon's atomic mass is 12, so the mass of 1 mole of carbon atoms is accurately given as 12 grams.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ### উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | - কার্বনের পারমাণবিক ভর = 12 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | - তাই, **১ মোল কার্বনের ভর = 12 গ্রাম** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Molar mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the molecular mass calculation and mass of 1 mole for water (H₂O).

Accuracy: **accurate**. Water's molecular mass is correctly calculated as 2(1) + 16 = 18, and 1 mole of water has a mass of 18 grams.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | - পানির আণবিক ভর (H₂O) = 2(1) + 16 = 18 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - তাই, **১ মোল পানির ভর = 18 গ্রাম** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Formulas for calculating moles and number of particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formulas relating mass, molar mass, mole count (n = W/M), and number of particles (N = n × N_A).

Accuracy: **accurate**. The equations n = W/M and number of particles = n × N_A are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ## গুরুত্বপূর্ণ সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | $$\text{মোল সংখ্যা (n)} = \frac{\text{প্রদত্ত ভর (গ্রাম)}}{\text{মোলার ভর (g/mol)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | $$n = \frac{W}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p37 | এছাড়াও: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p38 | $$\text{কণার সংখ্যা} = n \times N_A$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Worked problem calculating moles and molecule count in 36 g of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Solves a step-by-step problem finding the number of moles and molecules in 36 g of water.

Accuracy: **accurate**. The calculations n = 36/18 = 2 moles and total molecules = 2 × 6.022 × 10²³ = 1.2044 × 10²⁴ molecules are fully correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ## অনুশীলনী উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | **প্রশ্ন:** 36 গ্রাম পানিতে কত মোল পানি আছে? এবং কতগুলো অণু আছে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | **সমাধান:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | - পানির মোলার ভর (M) = 18 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 | - প্রদত্ত ভর (W) = 36 g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 | $$n = \frac{W}{M} = \frac{36}{18} = 2 \text{ মোল}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | অণুর সংখ্যা = n × N_A = 2 × 6.022 × 10²³ = **1.2044 × 10²⁴ টি অণু** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar volume and states that 1 mole of any ideal gas occupies 22.4 liters at STP.

Accuracy: **accurate**. The standard high-school convention that 1 mole of any gas at STP occupies 22.4 liters is correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | ## গ্যাসের ক্ষেত্রে মোল (STP-তে) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | STP (Standard Temperature and Pressure) অবস্থায়: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p50 | &gt; **১ মোল যেকোনো গ্যাসের আয়তন = 22.4 লিটার** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p51 | এটাকে বলে **মোলার আয়তন (Molar Volume)**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p52 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Recap summary of the mole relationships (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary block consolidating the three primary equivalents of 1 mole: particle count, molar mass, and molar volume at STP.

Accuracy: **accurate**. The summary correctly binds 1 mole to 6.022 × 10²³ particles, molar mass in grams, and 22.4 L at STP.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | ## সংক্ষেপে মনে রাখার কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p54 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p55 | ১ মোল = 6.022 × 10²³ কণা (অ্যাভোগাড্রো সংখ্যা) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p56 |        = মৌল/যৌগের আণবিক/পারমাণবিক ভরের সমান গ্রাম (মোলার ভর) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p57 |        = 22.4 লিটার (গ্যাসের ক্ষেত্রে, STP-তে) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p58 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p59 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Importance of the mole concept in chemistry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the mole concept is essential in chemistry: counting submicroscopic entities, stoichiometric calculations, and bridging mass, volume, and particle count.

Accuracy: **accurate**. The stated reasons for the importance of the mole concept are standard and conceptually sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p60 | ## কেন মোল ধারণা গুরুত্বপূর্ণ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p61 | 1. পরমাণু-অণুর মতো ক্ষুদ্র কণা গণনা সহজ করে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p62 | 2. রাসায়নিক বিক্রিয়ার হিসাব (Stoichiometry) করতে সাহায্য করে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p63 | 3. ভর, আয়তন ও কণার সংখ্যার মধ্যে সেতুবন্ধন তৈরি করে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p64 | আশা করি এই ব্যাখ্যা থেকে মোল ধারণা সম্পর্কে স্পষ্ট ধারণা পেয়েছ। কোনো অংশ নিয়ে আরও প্রশ্ন থাকলে জিজ্ঞেস করতে পারো! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

