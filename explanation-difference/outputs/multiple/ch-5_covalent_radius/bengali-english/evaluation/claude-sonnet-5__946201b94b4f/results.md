# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the definition, analogy, formula, examples, periodic trends, and a memory tip for covalent radius in Bengali.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 26,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 26,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two bonded atoms of the same element.

Accuracy: **accurate**. The definition accurately reflects homonuclear single covalent bond radius as half the internuclear distance.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # সমযোজী ব্যাসার্ধ (Covalent Radius) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## সংজ্ঞা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | যখন দুটি একই মৌলের পরমাণু একটি সমযোজী বন্ধন (covalent bond) দ্বারা যুক্ত হয়ে একটি অণু গঠন করে, তখন সেই দুটি পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্বের **অর্ধেক**কে সেই মৌলের **সমযোজী ব্যাসার্ধ** বলা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Ball analogy for covalent radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "বল (ball)"}]}

Annotation rationale: Compares two covalently bonded atoms to two identical touching balls to illustrate why half the distance between centers gives the radius.

Accuracy: **accurate**. The analogy clearly and correctly explains the division of the distance by two using touching spheres.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## সহজ ভাষায় বোঝা যাক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | ধরো, দুটি একই ধরনের বল (ball) একে অপরকে স্পর্শ করে আছে। তাদের কেন্দ্রবিন্দুর (center) মধ্যে যে দূরত্ব, তার অর্ধেক হলো একটি বলের ব্যাসার্ধ। ঠিক একইভাবে, দুটি পরমাণু যখন বন্ধনের মাধ্যমে যুক্ত হয়, তখন তাদের নিউক্লিয়াসের মাঝের দূরত্বকে দুই ভাগে ভাগ করলে এক ভাগ হলো একটি পরমাণুর সমযোজী ব্যাসার্ধ। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Mathematical formula for covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical relation r_cov = d/2 along with definitions of the terms.

Accuracy: **accurate**. The formula and variable descriptions correctly describe homonuclear covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## গাণিতিক সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | $$r_{cov} = \frac{d}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | যেখানে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | - $r_{cov}$ = সমযোজী ব্যাসার্ধ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | - $d$ = দুই পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্ব (বন্ধন দৈর্ঘ্য বা bond length) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: Chlorine molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the covalent radius of chlorine from the Cl-Cl bond length.

Accuracy: **accurate**. The bond length of 198 pm and calculated radius of 99 pm for chlorine are standard and mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | **ক্লোরিন (Cl₂) অণুর ক্ষেত্রে:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | - Cl-Cl বন্ধনের দৈর্ঘ্য = 198 pm (picometer) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | - তাহলে, ক্লোরিনের সমযোজী ব্যাসার্ধ = 198/2 = 99 pm | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Hydrogen molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the covalent radius of hydrogen from the H-H bond length.

Accuracy: **accurate**. The bond length of 74 pm and calculated radius of 37 pm for hydrogen are standard and mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | **হাইড্রোজেন (H₂) অণুর ক্ষেত্রে:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | - H-H বন্ধনের দৈর্ঘ্য = 74 pm | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - তাহলে, হাইড্রোজেনের সমযোজী ব্যাসার্ধ = 74/2 = 37 pm | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Properties and periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the units, applicability, and periodic trends of covalent radius in a table.

Accuracy: **contains_error**. Passage p21 asserts that covalent radius is only applicable to bonds between atoms of the same element, which is incorrect because covalent radii are widely applied to heteronuclear bonds to predict or determine bond lengths.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## গুরুত্বপূর্ণ তথ্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | &#124; বৈশিষ্ট্য &#124; বর্ণনা &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p20 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p21 | &#124; প্রযোজ্যতা &#124; শুধুমাত্র একই মৌলের দুটি পরমাণুর মধ্যে বন্ধনের জন্য প্রযোজ্য &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124; একক &#124; পিকোমিটার (pm) বা অ্যাংস্ট্রম (Å) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124; প্রবণতা (একই পর্যায়ে) &#124; বাম থেকে ডানে গেলে ব্যাসার্ধ কমে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124; প্রবণতা (একই গ্রুপে) &#124; উপর থেকে নিচে গেলে ব্যাসার্ধ বাড়ে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

Error (minor; p21): The table states that covalent radius is applicable only to bonds between two atoms of the same element ('শুধুমাত্র একই মৌলের দুটি পরমাণুর মধ্যে বন্ধনের জন্য প্রযোজ্য'). While the simple halving formula (d/2) directly applies to homonuclear diatomic bonds, covalent radii apply to and are used in heteronuclear covalent bonds as well (e.g., d_AB ≈ r_A + r_B).

Correction: Covalent radius is applicable to both homonuclear and heteronuclear covalent bonds; the formula r = d/2 applies specifically to homonuclear bonds, whereas in heteronuclear bonds the bond length is approximately the sum of the covalent radii of the two atoms.

## u7: Mnemonic tip for covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise memory aid ('half distance') for remembering how to find covalent radius.

Accuracy: **accurate**. The memory tip accurately summarizes the operational definition for a homonuclear single bond.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## মনে রাখার কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | **&quot;অর্ধেক দূরত্ব&quot;** — বন্ধনযুক্ত দুই নিউক্লিয়াসের মাঝের দূরত্বকে ঠিক মাঝখান দিয়ে ভাগ করলেই সমযোজী ব্যাসার্ধ পাওয়া যায়! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

