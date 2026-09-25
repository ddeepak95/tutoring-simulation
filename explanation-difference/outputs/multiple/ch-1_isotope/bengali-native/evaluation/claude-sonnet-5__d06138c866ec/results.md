# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and comprehensively explains the concept of isotopes for a high school student in Bengali, including atomic structure prerequisites, the core definition, hydrogen and carbon examples, general properties, and an interactive practice question.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 36,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 36,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 6,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Review of atomic structure (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Reviews prerequisite knowledge regarding subatomic particles (protons, neutrons, electrons), their locations, and their charges.

Accuracy: **accurate**. The description of subatomic particles, their locations, and charges is scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # সমস্থানিক (Isotope) - সহজ ভাষায় বোঝা যাক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## প্রথমে পরমাণুর গঠন মনে করি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | তুমি জানো, প্রতিটি পরমাণুতে থাকে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **প্রোটন** (নিউক্লিয়াসে, ধনাত্মক চার্জ) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - **নিউট্রন** (নিউক্লিয়াসে, চার্জ নেই) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - **ইলেকট্রন** (নিউক্লিয়াসের বাইরে ঘোরে, ঋণাত্মক চার্জ) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Definition of isotope (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes and explains the relationship between proton count, atomic number, neutron count, and mass number.

Accuracy: **accurate**. Correctly defines isotopes as atoms of the same element with identical atomic numbers (protons) but different neutron counts and mass numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## সমস্থানিক কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | **সমস্থানিক** হলো একই মৌলের এমন পরমাণু যাদের: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | - **প্রোটন সংখ্যা একই** (তাই পারমাণবিক সংখ্যা একই) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p10 | - কিন্তু **নিউট্রন সংখ্যা ভিন্ন** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - ফলে **ভর সংখ্যা (mass number) ভিন্ন** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Hydrogen isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using protium, deuterium, and tritium in a comparative table.

Accuracy: **accurate**. The proton, neutron, and mass numbers for protium, deuterium, and tritium are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### সহজ উদাহরণ দিয়ে বুঝি: হাইড্রোজেন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | হাইড্রোজেনের তিনটি সমস্থানিক আছে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | &#124; নাম &#124; প্রোটন &#124; নিউট্রন &#124; ভর সংখ্যা &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124;------&#124;--------&#124;---------&#124;-----------&#124; | EXAMPLE | {} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p16 | &#124; প্রোটিয়াম (¹H) &#124; ১ &#124; ০ &#124; ১ &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124; ডিউটেরিয়াম (²H) &#124; ১ &#124; ১ &#124; ২ &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | &#124; ট্রিটিয়াম (³H) &#124; ১ &#124; ২ &#124; ৩ &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | দেখো, তিনটিরই প্রোটন সংখ্যা **১**, তাই এরা সবাই হাইড্রোজেন। কিন্তু নিউট্রন সংখ্যা ভিন্ন হওয়ায় এদের ভর আলাদা। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Mnemonic trick for the term somosthanik (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p21", "quote": "\"সম\" মানে একই, \"স্থান\" মানে পর্যায় সারণির স্থান"}]}

Annotation rationale: Presents a memory technique based on the Bengali calque 'সমস্থানিক' ('সম' meaning same, 'স্থান' meaning position in the periodic table).

Accuracy: **accurate**. The etymological explanation accurately mirrors both the Bengali term and the original Greek meaning (isos topos - same place in the periodic table).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## মনে রাখার সহজ কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | **&quot;সম&quot; মানে একই, &quot;স্থান&quot; মানে পর্যায় সারণির স্থান** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p22 | অর্থাৎ, পর্যায় সারণিতে **একই স্থানে (একই ঘরে)** থাকে এমন পরমাণু — কারণ প্রোটন সংখ্যা একই বলে এরা একই মৌল হিসেবে গণ্য হয়, শুধু ভরে আলাদা। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u5: Carbon isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides carbon-12, carbon-13, and carbon-14 as another real-world illustration of isotopes and their applications.

Accuracy: **accurate**. Accurately specifies the subatomic compositions of carbon-12, carbon-13, and carbon-14, as well as the radiocarbon dating application of carbon-14.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## আরেকটি উদাহরণ: কার্বন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | - **কার্বন-১২** (⁶ প্রোটন, ৬ নিউট্রন) — সবচেয়ে বেশি পাওয়া যায় | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | - **কার্বন-১৩** (৬ প্রোটন, ৭ নিউট্রন) — স্থিতিশীল | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | - **কার্বন-১৪** (৬ প্রোটন, ৮ নিউট্রন) — তেজস্ক্রিয়, প্রত্নতাত্ত্বিক বয়স নির্ণয়ে ব্যবহৃত হয়! | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share similar chemical properties (same electron configuration) while differing in physical properties and nuclear stability.

Accuracy: **accurate**. The explanation of chemical similarity due to identical electron arrangements, differing physical properties due to mass, and nuclear stability/radioactivity is scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## গুরুত্বপূর্ণ পয়েন্ট | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | 1. সমস্থানিকদের **রাসায়নিক ধর্ম প্রায় একই** (কারণ ইলেকট্রন সংখ্যা একই) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p29 | 2. কিন্তু **ভৌত ধর্ম** (যেমন ভর, ঘনত্ব) ভিন্ন হতে পারে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | 3. কিছু সমস্থানিক **স্থিতিশীল**, কিছু **তেজস্ক্রিয় (radioactive)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Self-assessment practice question (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Offers a practice problem to test the reader's understanding of isotopes, followed by the solution and a closing offer for help.

Accuracy: **accurate**. The question and answer correctly identify oxygen-16 and oxygen-18 as isotopes based on identical proton counts and different neutron counts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## প্রশ্ন করে নিজেকে যাচাই করো | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | তুমি কি বলতে পারবে, নিচের পরমাণুগুলো একে অপরের সমস্থানিক কিনা? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p33 | - যদি একটির প্রোটন ৮, নিউট্রন ৮ হয় | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;list&#x27;] |
| p34 | - আরেকটির প্রোটন ৮, নিউট্রন ১০ হয় | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;list&#x27;] |
| p35 | (উত্তর: হ্যাঁ, কারণ প্রোটন সংখ্যা একই — দুটোই অক্সিজেনের সমস্থানিক, যথাক্রমে অক্সিজেন-১৬ ও অক্সিজেন-১৮!) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p36 | কোনো অংশ বুঝতে অসুবিধা হলে জিজ্ঞেস করো! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

