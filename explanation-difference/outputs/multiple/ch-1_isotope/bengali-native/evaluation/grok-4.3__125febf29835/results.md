# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains the concept of isotopes (সমস্থানিক) in Bengali for a high school student, covering their definition, specific examples, physical and chemical properties, real-world applications, and an illustrative analogy.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 25,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "ANALOGY": 1
  },
  "nested_passages": 25,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and origin of the term isotope (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the definition of isotopes (same proton number, different neutron number), explains their atomic and mass numbers, and explains why they occupy the same position in the periodic table (hence the Bengali name 'সমস্থানিক').

Accuracy: **accurate**. The definition of isotopes, their atomic number (Z), mass number (A), and etymological reasoning for 'সমস্থানিক' (same place in the periodic table) are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | একজন ভালো শিক্ষক হিসেবে আমি তোমাকে খুব সহজ ভাষায় বুঝিয়ে বলছি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### সমস্থানিক কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **সমস্থানিক** বলতে আমরা একই মৌলের বিভিন্ন রূপকে বুঝি, যাদের **প্রোটনের সংখ্যা একই**, কিন্তু **নিউট্রনের সংখ্যা ভিন্ন**।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ফলে তাদের **পারমাণবিক সংখ্যা (Z)** একই থাকে, তাই তারা পর্যায় সারণিতে একই স্থানে থাকে (এজন্যই নাম “সমস্থানিক”)। কিন্তু **ভর সংখ্যা (A)** ভিন্ন হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Hydrogen isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the classic example of hydrogen's three isotopes (protium, deuterium, tritium) using a structured table and explanatory notes.

Accuracy: **accurate**. The table and details correctly depict the proton, neutron, and mass numbers for protium, deuterium, and tritium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### সহজ উদাহরণ দিয়ে বুঝি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | **হাইড্রোজেন** মৌলের তিনটি সমস্থানিক আছে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | &#124; সমস্থানিক &#124; প্রোটন &#124; নিউট্রন &#124; ভর সংখ্যা &#124; নাম &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p8 | &#124;-----------&#124;--------&#124;---------&#124;-----------&#124;-----&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p9 | &#124; ¹H        &#124; 1      &#124; 0       &#124; 1         &#124; প্রোটিয়াম &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p10 | &#124; ²H        &#124; 1      &#124; 1       &#124; 2         &#124; ডিউটেরিয়াম &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124; ³H        &#124; 1      &#124; 2       &#124; 3         &#124; ট্রিটিয়াম &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | - তিনটিরই প্রোটন ১টি করে → একই মৌল। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | - কিন্তু নিউট্রনের সংখ্যা আলাদা → ভর আলাদা। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Chlorine isotopes and average atomic mass (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents chlorine isotopes (³⁵Cl and ³⁷Cl) as another example and explains the origin of chlorine's 35.5 atomic weight.

Accuracy: **contains_error**. The passage implies that 35.5 is simply the average ('দুটির গড়') of 35 and 37. The arithmetic mean of 35 and 37 is 36; 35.5 is a weighted average based on relative natural abundance (~75% Cl-35 and ~25% Cl-37).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | এরকম আরেকটা উদাহরণ: **ক্লোরিন**। সাধারণত ক্লোরিনের দুটি সমস্থানিক পাওয়া যায় — ³⁵Cl এবং ³⁷Cl। এজন্যই ক্লোরিনের পারমাণবিক ভর ৩৫.৫ দেখায় (দুটির গড়)। | EXAMPLE | {} | [&#x27;prose&#x27;] |

Error (minor; p14): The passage describes 35.5 as simply the average ('দুটির গড়') of ³⁵Cl and ³⁷Cl. The simple average of 35 and 37 is 36. 35.5 arises from the abundance-weighted average of the two isotopes.

Correction: ক্লোরিনের পারমাণবিক ভর ৩৫.৫ হলো এদের প্রাকৃতিক প্রাচুর্যের ওপর ভিত্তি করে নেওয়া ভরযুক্ত গড় (weighted average), সাধারণ গড় নয়।

## u4: Characteristics of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Discusses the physical and chemical properties of isotopes, explaining why chemical properties remain identical while physical properties differ.

Accuracy: **accurate**. The explanation of identical chemical properties due to electron configuration and differing physical properties due to mass is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### সমস্থানিকের বৈশিষ্ট্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - **রাসায়নিক ধর্ম** একই থাকে (কারণ প্রোটন সংখ্যা একই, তাই ইলেকট্রন সংখ্যাও একই)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | - **ভৌত ধর্ম** (যেমন: ভর, ঘনত্ব) একটু ভিন্ন হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | - কিছু সমস্থানিক স্থায়ী, আবার কিছু তেজস্ক্রিয় (যেমন ট্রিটিয়াম, কার্বন-১৪)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Practical applications of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists major practical and technological uses of isotopes (medical treatment, carbon dating, nuclear energy).

Accuracy: **accurate**. All listed applications (radiotherapy, carbon-14 dating, and uranium-235 in nuclear power plants) are standard real-world uses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### কেন জানা দরকার? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | - তেজস্ক্রিয় সমস্থানিক ব্যবহার করে ক্যান্সারের চিকিৎসা করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 | - প্রত্নতত্ত্বে কার্বন-১৪ দিয়ে প্রাচীন জিনিসের বয়স বের করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | - পারমাণবিক বিদ্যুৎকেন্দ্রে ইউরেনিয়াম-২৩৫ ব্যবহার হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Sibling analogy and summary (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "একই পরিবারের ভাই-বোন"}]}

Annotation rationale: Provides a summary using an everyday analogy comparing isotopes to siblings in a family who look alike but have different weights, followed by an interactive closing question.

Accuracy: **accurate**. The analogy effectively and accurately reflects the distinction between chemical identity and mass differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | **সারকথা:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | সমস্থানিক হলো “একই পরিবারের ভাই-বোন” — চেহারা (রাসায়নিক ধর্ম) একই, কিন্তু ওজন (ভর) আলাদা। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p25 | এখন বলো, কোন অংশটা আরেকটু বিস্তারিত বুঝতে চাও? নাকি আরও কোনো উদাহরণ দরকার? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

