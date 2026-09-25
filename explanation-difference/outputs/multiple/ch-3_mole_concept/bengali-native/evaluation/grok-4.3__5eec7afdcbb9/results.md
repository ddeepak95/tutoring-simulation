# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses the mole concept in chemistry, covering its definition, Avogadro's number, relationship to molar mass, representative calculations, and a summary.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 31,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 3,
    "PROCEDURE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 31,
  "unique_subtopics": 7,
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

## u1: Dozen analogy for the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "কল্পনা করো, তুমি বাজারে ডিম কিনতে গেছো। তুমি বলো “এক ডজন দাও”।"}]}

Annotation rationale: Uses the familiar daily-life concept of buying a dozen eggs to explain how chemistry uses counting units like the mole.

Accuracy: **accurate**. The comparison of a mole to a dozen as a macroscopic grouping unit for counting items is accurate and standard in chemistry pedagogy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | মোল কী, সেটা তোমাকে সহজ করে বুঝিয়ে দিই।   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | কল্পনা করো, তুমি বাজারে ডিম কিনতে গেছো। তুমি বলো “এক ডজন দাও”। এক ডজন মানে ঠিক ১২টা ডিম। তুমি প্রতিটা ডিম গুনে নাওনি, তবু জানো যে সংখ্যাটা ১২।   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | একইভাবে, রসায়নে যখন আমরা অণু বা পরমাণুর সংখ্যা গণনা করতে চাই, তখন “মোল” নামে একটা একক ব্যবহার করি।   | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines one mole as 6.022 × 10^23 particles and introduces Avogadro's number.

Accuracy: **accurate**. The definition of 1 mole containing 6.022 × 10^23 particles and its designation as Avogadro's number is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### মোলের সংজ্ঞা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | **১ মোল** = ঠিক **৬.০২২ × ১০²³** সংখ্যক কণা (পরমাণু, অণু, আয়ন ইত্যাদি)।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | এই বিশাল সংখ্যাটার নাম **অ্যাভোগাড্রো সংখ্যা** (Nₐ)।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | অর্থাৎ, যদি কোনো পদার্থের ৬.০২২ × ১০²³টা কণা থাকে, তাহলে আমরা বলব সেটা ১ মোল। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Reason for large counting unit (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why such a large number is required due to the minuscule size of atoms and molecules.

Accuracy: **accurate**. Correctly explains the physical reason for having a huge counting scale in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### কেন এত বড় সংখ্যা লাগে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | পরমাণু ও অণু এতই ছোট যে সাধারণ সংখ্যায় গোনা যায় না। তাই বিজ্ঞানীরা এই বিশাল সংখ্যাটা নির্ধারণ করেছেন যাতে হিসাব সুবিধাজনক হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Relationship between mole, atomic mass, and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the correspondence between atomic mass in atomic mass units and the mass in grams of one mole of a substance, defining molar mass.

Accuracy: **accurate**. Accurately connects atomic/molecular mass values to gram quantities per mole (molar mass in g/mol).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### মোল ও ভরের সম্পর্ক (সবচেয়ে গুরুত্বপূর্ণ অংশ) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | প্রত্যেক মৌলের একটা নির্দিষ্ট পারমাণবিক ভর আছে (যেমন: কার্বনের ১২, অক্সিজেনের ১৬, হাইড্রোজেনের ১)।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | **নিয়ম:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | ১ মোল কোনো মৌলের ভর = সেই মৌলের পারমাণবিক ভরের সমান গ্রাম।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | এই ভরকে বলা হয় **মোলার ভর** (একক: গ্রাম/মোল)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: One mole of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a specific illustrative example of 1 mole of carbon being 12 grams and containing 6.022 × 10^23 carbon atoms.

Accuracy: **accurate**. 1 mole of carbon-12 (or standard atomic weight ~12.011 rounded to 12 g) contains 6.022 × 10^23 atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - ১ মোল কার্বন = ১২ গ্রাম → এতে ৬.০২২ × ১০²³টা কার্বন পরমাণু আছে। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: One mole of oxygen gas (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates that 1 mole of diatomic oxygen gas equals 32 grams and contains 6.022 × 10^23 O2 molecules.

Accuracy: **accurate**. 1 mole of O2 has a mass of 32 g and contains 6.022 × 10^23 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | - ১ মোল অক্সিজেন গ্যাস (O₂) = ৩২ গ্রাম → এতে ৬.০২২ × ১০²³টা O₂ অণু আছে। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: One mole of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates that 1 mole of water (H2O) equals 18 grams and contains 6.022 × 10^23 H2O molecules.

Accuracy: **accurate**. 1 mole of water (H2O) has a molecular mass of ~18 g and contains 6.022 × 10^23 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | - ১ মোল পানি (H₂O) = ১৮ গ্রাম → এতে ৬.০২২ × ১০²³টা H₂O অণু আছে। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Calculating moles from mass (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula and procedure for converting mass in grams to moles using molar mass.

Accuracy: **accurate**. The formula 'Moles = mass (g) / molar mass' is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### মোল দিয়ে কী কী হিসাব করা যায়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | 1. **ভর থেকে মোল সংখ্যা বের করা**   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p21 |    মোল = ভর (গ্রাম) ÷ মোলার ভর | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u9: Calculating particle count from moles and stoichiometry overview (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for finding particle count from moles and explains using mole ratios in chemical reaction stoichiometry.

Accuracy: **accurate**. Particle count = moles × 6.022 × 10^23 is correct, and stoichiometric mole ratios determine reactant and product mass relations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | 2. **মোল থেকে কণার সংখ্যা বের করা**   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p23 |    কণার সংখ্যা = মোল × ৬.০২২ × ১০²³ | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p24 | 3. **রাসায়নিক বিক্রিয়ায় অনুপাত বের করা**   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 |    বিক্রিয়ার সমীকরণে মোলের অনুপাত দেখে আমরা বলতে পারি কত গ্রাম বিক্রিয়ক লাগবে বা কত গ্রাম উৎপাদ পাওয়া যাবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u10: Summary recap of mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key points of the mole concept as a quick-reference study recap, followed by a closing interactive offer.

Accuracy: **accurate**. The summary points accurately reflect the core properties of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### সারকথা (মনে রাখার সহজ উপায়) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | - মোল = পদার্থের পরিমাণের একক   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p28 | - ১ মোল = ৬.০২২ × ১০²³ কণা   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p29 | - ১ মোলের ভর = মোলার ভর (গ্রামে)   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p30 | - এটি ডজনের মতোই একটা গণনার সুবিধার্থে তৈরি করা একক, শুধু সংখ্যাটা অনেক বড়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p31 | এখন বলো, কোন অংশটা আরেকটু বিস্তারিত বুঝতে চাও? নাকি কোনো উদাহরণ দিয়ে আরও স্পষ্ট করে বলব? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

