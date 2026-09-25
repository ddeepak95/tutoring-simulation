# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and comprehensively explains the mole concept, including Avogadro's number, molar mass, molar volume at STP, interconversion formulas, worked numerical examples, real-world significance, and practice questions.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 47,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 47,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 3,
    "none": 11
  },
  "proposed_substantive_verdicts": {
    "accurate": 14
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "ঠিক যেমন আমরা ১২টি জিনিসকে “ডজন” বলি"}]}

Annotation rationale: Defines what a mole is as the counting unit for chemical particles, analogizing it to a dozen, and introduces Avogadro's number.

Accuracy: **accurate**. The definition of the mole as a unit for amount of substance and the value of Avogadro's constant (6.022 × 10^23) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | মোল ধারণা (Mole Concept) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | প্রিয় ছাত্র/ছাত্রী, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | আজ আমরা রসায়নের একটি খুব গুরুত্বপূর্ণ ও মজার অধ্যায় **মোল ধারণা** সম্পর্কে সহজভাবে জানব। এটি মূলত পদার্থের পরিমাণ হিসাব করার একটি পদ্ধতি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ### ১. মোল কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | মোল হলো রসায়নে ব্যবহৃত **পদার্থের পরিমাণ** পরিমাপের একক। ঠিক যেমন আমরা ১২টি জিনিসকে “ডজন” বলি, তেমনি রসায়নে বিপুল সংখ্যক কণা (পরমাণু, অণু বা আয়ন) গণনা করার জন্য “মোল” ব্যবহার করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | **এক মোল** = **৬.০২২ × ১০²³**টি কণা   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p7 | এই বিশাল সংখ্যাটিকে **অ্যাভোগাড্রো সংখ্যা** (Avogadro’s number) বলে। এর প্রতীক **N_A**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Illustrative example: Carbon atoms in one mole (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the mole concept using one mole of carbon atoms containing Avogadro's number of atoms.

Accuracy: **accurate**. One mole of carbon atoms correctly equals 6.022 × 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | - ১ মোল কার্বন (C) পরমাণু = ৬.০২২ × ১০²³টি কার্বন পরমাণু | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Illustrative example: Water molecules in one mole (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates that one mole of molecular water contains Avogadro's number of water molecules.

Accuracy: **accurate**. One mole of water molecules correctly equals 6.022 × 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | - ১ মোল পানির অণু (H₂O) = ৬.০২২ × ১০²³টি পানির অণু | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Definition of molar mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole of a substance expressed in grams.

Accuracy: **accurate**. The definition of molar mass as the mass of one mole of substance typically expressed in grams is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### ২. মোলার ভর (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | কোনো পদার্থের **এক মোলের ভর**কে মোলার ভর বলে। এটি সাধারণত গ্রামে প্রকাশ করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Illustrative example: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows that carbon's atomic mass of 12 corresponds to a molar mass of 12 grams.

Accuracy: **accurate**. The atomic mass of carbon-12 and its molar mass of 12 g/mol are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | - কার্বনের পারমাণবিক ভর = ১২   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 |   → ১ মোল কার্বনের ভর = ১২ গ্রাম | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Illustrative example: Molar mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the molecular mass of water (18) and shows that one mole of water weighs 18 grams.

Accuracy: **accurate**. The molecular mass of H2O is correctly computed as 2×1 + 16 = 18, giving 18 g for 1 mole of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | - পানির আণবিক ভর (H₂O) = ২×১ + ১৬ = ১৮   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 |   → ১ মোল পানির ভর = ১৮ গ্রাম | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Formula relating mass and molar mass to mole number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the formula n = m / M to determine the number of moles from given mass and molar mass.

Accuracy: **accurate**. The formula n = m / M is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | **সূত্র:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | মোল সংখ্যা (n) = দেওয়া ভর (m) ÷ মোলার ভর (M) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u8: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar volume and states that 1 mole of any gas at STP occupies 22.4 liters.

Accuracy: **accurate**. Under standard temperature and pressure defined as 0 °C and 1 atm, the molar volume of an ideal gas is 22.4 L.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### ৩. মোলার আয়তন (Molar Volume) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | আদর্শ তাপমাত্রা ও চাপে (STP: ০°C ও ১ atm) **১ মোল গ্যাসের আয়তন** সবসময় **২২.৪ লিটার** হয়। একে মোলার আয়তন বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u9: Unified mole relationship equation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the combined formula equating moles to mass, particle count, and gas volume at STP, along with variable definitions.

Accuracy: **accurate**. The multi-variable relation n = m / M = N / N_A = V / 22.4 (at STP) and the units for each variable are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### ৪. মোলের বিভিন্ন সম্পর্ক (গুরুত্বপূর্ণ সূত্র) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | n = m / M = N / N_A = V / 22.4 (STP-এর জন্য) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | যেখানে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | - n = মোল সংখ্যা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | - m = ভর (গ্রামে) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | - M = মোলার ভর | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | - N = কণার সংখ্যা | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 | - V = আয়তন (লিটারে) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u10: Worked example: Finding moles in 10 grams of calcium (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the step-by-step calculation to find the number of moles from a given mass of calcium.

Accuracy: **accurate**. Using the atomic mass of 40 g/mol for calcium, n = 10 / 40 = 0.25 mol is calculated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### ৫. সহজ উদাহরণ দিয়ে বোঝা যাক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | **প্রশ্ন:** ১০ গ্রাম ক্যালসিয়াম (Ca) কত মোল?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | **সমাধান:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | Ca-এর পারমাণবিক ভর = ৪০   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | n = m / M = ১০ / ৪০ = **০.২৫ মোল** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u11: Worked example: Finding number of molecules in 0.5 moles of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the step-by-step calculation of the number of molecules given 0.5 moles of water.

Accuracy: **accurate**. Multiplying 0.5 by 6.022 × 10^23 correctly yields 3.011 × 10^23 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | **আরেকটি উদাহরণ:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | ০.৫ মোল পানিতে কতগুলো অণু আছে?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | সমাধান:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | N = n × N_A = ০.৫ × ৬.০২২ × ১০²³ = **৩.০১১ × ১০²³**টি অণু | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u12: Significance and practical importance of the mole concept (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p41", "quote": "- বাস্তব জীবনে (যেমন: ওষুধ, সার, খাবার) পরিমাণ নির্ধারণে সাহায্য করে।"}]}

Annotation rationale: Explains why the mole concept is essential in stoichiometry, linking macroscopic quantities to particles, and in everyday industries.

Accuracy: **accurate**. The highlighted roles in chemical reaction calculations, mass-volume-particle bridging, and real-world industrial formulation are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ### ৬. কেন মোল ধারণা এত গুরুত্বপূর্ণ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | - রাসায়নিক বিক্রিয়ায় বিক্রিয়ক ও উৎপাদের পরিমাণ হিসাব করা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p40 | - ভর, আয়তন ও কণার সংখ্যার মধ্যে সম্পর্ক স্থাপন করা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p41 | - বাস্তব জীবনে (যেমন: ওষুধ, সার, খাবার) পরিমাণ নির্ধারণে সাহায্য করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u13: Recap: Mole as chemistry's dozen (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p43", "quote": "মোল = “রসায়নের ডজন”"}]}

Annotation rationale: Provides a concise takeaway note summarizing the mole concept via the chemistry's dozen analogy.

Accuracy: **accurate**. Accurately reinforces the counting nature of the mole using the dozen analogy and restates Avogadro's number.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | **মনে রাখার কথা:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | মোল = “রসায়নের ডজন”। শুধু এর সংখ্যাটা অনেক বড় (৬.০২২ × ১০²³)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

## u14: Practice problem: Volume to moles at STP (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives a self-assessment practice question asking to convert 5.6 liters of oxygen at STP to moles, along with its answer.

Accuracy: **accurate**. At STP, 5.6 L / 22.4 L/mol = 0.25 mol, matching the provided answer.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | এখন তুমি নিজে চেষ্টা করে দেখো:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p45 | **৫.৬ লিটার অক্সিজেন গ্যাস (STP-এ) কত মোল?**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p46 | (উত্তর: ০.২৫ মোল) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p47 | কোনো অংশ বুঝতে অসুবিধা হলে জিজ্ঞাসা করো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

