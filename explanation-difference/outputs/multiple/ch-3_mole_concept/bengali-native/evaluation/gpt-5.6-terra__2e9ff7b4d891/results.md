# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains the mole concept in chemistry, including Avogadro's number, molar mass, conversion formulas between mass, moles, and number of particles, along with worked examples and a recap.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 92,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 92,
  "unique_subtopics": 4,
  "contextualization": {
    "everyday": 2,
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "যেমন আমরা অনেকগুলো জিনিস গুনতে “ডজন” ব্যবহার করি—১ ডজন = ১২টি জিনিস"}]}

Annotation rationale: Explains what a mole is by comparing it to a dozen and specifies Avogadro's constant along with representative particle types.

Accuracy: **accurate**. The definition of mole as the unit of amount of substance and the value of Avogadro's number (6.022 x 10^23 particles) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | মোল (mole) হলো রসায়নে পদার্থের পরিমাণ মাপার একটি একক। যেমন আমরা অনেকগুলো জিনিস গুনতে “ডজন” ব্যবহার করি—১ ডজন = ১২টি জিনিস—তেমনি অতি ক্ষুদ্র পরমাণু, অণু বা আয়নের সংখ্যা বোঝাতে “মোল” ব্যবহার করি। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## ১ মোল মানে কতটি কণা? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **১ মোল = \(6.022 \times 10^{23}\) টি কণা** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p4 | এই বিশাল সংখ্যাটিকে বলে **অ্যাভোগাড্রো সংখ্যা**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | কণা বলতে হতে পারে— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - পরমাণু: যেমন ১ মোল Fe = \(6.022 \times 10^{23}\) টি লোহার পরমাণু   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | - অণু: যেমন ১ মোল H₂O = \(6.022 \times 10^{23}\) টি পানির অণু   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 | - আয়ন: যেমন ১ মোল Na⁺ = \(6.022 \times 10^{23}\) টি সোডিয়াম আয়ন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Why the mole concept is necessary (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "- ১ ডজন ডিম = ১২টি ডিম  "}]}

Annotation rationale: Explains why chemists need the mole concept due to the submicroscopic scale of individual atoms and molecules.

Accuracy: **accurate**. Correctly describes the rationale for using the mole to bridge micro-scale particles and macroscopic laboratory amounts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## কেন মোল দরকার? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | পরমাণু ও অণু এত ছোট যে তাদের একটি বা দুটি করে ওজন করা যায় না। কিন্তু রসায়নবিদরা জানতে চান বিক্রিয়ায় কতগুলো কণা অংশ নিচ্ছে। তাই কণার বিশাল সংখ্যা সহজে প্রকাশ করতে “মোল” ব্যবহার করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | যেমন: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | - ১ ডজন ডিম = ১২টি ডিম   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | - ১ মোল পানির অণু = \(6.022 \times 10^{23}\) টি পানির অণু   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Molar mass definition and values (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, explains its relationship to relative atomic and molecular masses, and illustrates with examples in tabular and list form.

Accuracy: **accurate**. The unit (g/mol), definition, and values for H, O, C, H2O, and CO2 molar masses are all correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## মোলার ভর কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | কোনো পদার্থের **১ মোলের ভরকে মোলার ভর** বলে। এর একক হলো **গ্রাম প্রতি মোল (g/mol)**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | মজার বিষয় হলো, কোনো মৌলের পারমাণবিক ভর সংখ্যাগতভাবে তার মোলার ভরের সমান। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | &#124; পদার্থ &#124; আপেক্ষিক ভর &#124; মোলার ভর &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p21 | &#124;---&#124;---:&#124;---:&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124; H &#124; 1 &#124; 1 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124; O &#124; 16 &#124; 16 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124; C &#124; 12 &#124; 12 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124; H₂O &#124; \(2×1 + 16 = 18\) &#124; 18 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p26 | &#124; CO₂ &#124; \(12 + 2×16 = 44\) &#124; 44 g/mol &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p27 | অর্থাৎ, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | - **১ মোল পানি (H₂O) = ১৮ গ্রাম** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | - **১ মোল কার্বন ডাই-অক্সাইড (CO₂) = ৪৪ গ্রাম** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | - **১ মোল অক্সিজেন গ্যাস (O₂) = ৩২ গ্রাম** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Formula to calculate moles from mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formula n = m / M and defines each variable.

Accuracy: **accurate**. The equation n = m / M and its parameter descriptions are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## মোল বের করার সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | ### ১. ভর থেকে মোল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p35 | \text{মোলের সংখ্যা} = \frac{\text{পদার্থের ভর (g)}}{\text{মোলার ভর (g/mol)}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p37 | অর্থাৎ, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p38 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p39 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p40 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p41 | এখানে,   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p42 | - \(n\) = মোলের সংখ্যা   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | - \(m\) = ভর   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p44 | - \(M\) = মোলার ভর   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Worked example: calculating moles of water from mass (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through calculating the number of moles in 36 grams of water.

Accuracy: **accurate**. The calculation 36 g / 18 g/mol = 2 mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ### উদাহরণ ১   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | ৩৬ গ্রাম পানি কত মোল? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | পানির মোলার ভর = ১৮ g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | n = \frac{36}{18} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | অতএব, **৩৬ গ্রাম পানি = ২ মোল পানি**। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p52 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Formula to calculate particle count from moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the relation between number of moles and total number of particles using Avogadro's constant.

Accuracy: **accurate**. The equation multiplying moles by 6.022 x 10^23 to find particle count is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | ## মোল থেকে কণার সংখ্যা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p54 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p55 | \text{কণার সংখ্যা} = \text{মোলের সংখ্যা} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p56 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u7: Worked example: calculating number of molecules in 2 moles of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the total number of water molecules present in 2 moles of water.

Accuracy: **accurate**. The calculation 2 * 6.022 x 10^23 = 1.2044 x 10^24 molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p57 | ### উদাহরণ ২   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p58 | ২ মোল পানিতে কতটি পানির অণু আছে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p59 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p61 | = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p62 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | অতএব, ২ মোল পানিতে আছে   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p64 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p66 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p67 | টি পানির অণু। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Worked example: molecular and atomic composition of 1 mole of carbon dioxide (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows how molecular mole quantities relate to constituent atomic mole quantities and counts in CO2.

Accuracy: **accurate**. Correctly deduces that 1 mol of CO2 contains 1 mol of C atoms and 2 mol of O atoms, giving 2 * 6.022 x 10^23 oxygen atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p69 | ## একটি গুরুত্বপূর্ণ উদাহরণ: CO₂ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p70 | ১ মোল CO₂-এ আছে— | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p71 | - \(6.022 \times 10^{23}\) টি CO₂ অণু   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p72 | - প্রতিটি CO₂ অণুতে ১টি C পরমাণু ও ২টি O পরমাণু থাকে   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p73 | - তাই ১ মোল CO₂-এ: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p74 |   - ১ মোল C পরমাণু | EXAMPLE | {} | [&#x27;list&#x27;] |
| p75 |   - ২ মোল O পরমাণু | EXAMPLE | {} | [&#x27;list&#x27;] |
| p76 | অর্থাৎ অক্সিজেন পরমাণুর সংখ্যা হবে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p77 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Summary recap of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick reference recap of key formulas and definitions alongside a closing conceptual bridge.

Accuracy: **accurate**. All summarized formulas and concluding remarks accurately reflect standard high school chemistry curriculum.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p81 | ## সংক্ষেপে মনে রাখো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p82 | 1. **১ মোল = \(6.022 \times 10^{23}\) টি কণা**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p83 | 2. **মোলার ভর = ১ মোল পদার্থের ভর**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p84 | 3. ভর থেকে মোল: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p85 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p86 | n = \frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p87 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p88 | 4. মোল থেকে কণার সংখ্যা: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p89 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p90 | N = n \times 6.022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p91 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p92 | মোল ধারণা হলো পরমাণু-অণুর ক্ষুদ্র জগৎ এবং ল্যাবরেটরিতে মাপা যায় এমন গ্রাম এককের মধ্যে একটি সেতু। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

