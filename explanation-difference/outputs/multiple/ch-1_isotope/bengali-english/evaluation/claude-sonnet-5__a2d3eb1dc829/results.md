# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains isotopes, their definition, examples (hydrogen and carbon), physical and chemical properties, an explanatory analogy, and a memory rule in Bengali.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 29,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 29,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basic mechanism of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what an isotope is and explains the relationship between atomic number (protons), neutrons, and mass number.

Accuracy: **accurate**. The definition correctly notes identical proton counts, differing neutron counts, and distinct mass numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # আইসোটোপ (Isotope) - ব্যাখ্যা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | আচ্ছা, চলো আমরা খুব সহজভাবে **আইসোটোপ** কী তা বুঝি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## আইসোটোপ কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **আইসোটোপ** হলো একই মৌলের এমন পরমাণু যাদের: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | - **প্রোটন সংখ্যা (পারমাণবিক সংখ্যা) একই** ✅ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | - কিন্তু **নিউট্রন সংখ্যা ভিন্ন** ❌ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | - ফলে **ভর সংখ্যা (Mass Number) আলাদা** হয় | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Isotopes of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents protium, deuterium, and tritium as concrete illustrations of isotopes.

Accuracy: **accurate**. The proton, neutron, and mass numbers for protium, deuterium, and tritium are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## সহজ উদাহরণ দিয়ে বুঝি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | ### হাইড্রোজেনের আইসোটোপ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | &#124; নাম &#124; প্রোটন &#124; নিউট্রন &#124; ভর সংখ্যা &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124;------&#124;--------&#124;---------&#124;-----------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | &#124; প্রোটিয়াম (¹H) &#124; 1 &#124; 0 &#124; 1 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124; ডিউটেরিয়াম (²H) &#124; 1 &#124; 1 &#124; 2 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; ট্রিটিয়াম (³H) &#124; 1 &#124; 2 &#124; 3 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | লক্ষ্য করো - **তিনটিরই প্রোটন সংখ্যা 1**, তাই তিনটিই হাইড্রোজেন। কিন্তু নিউট্রন সংখ্যা ভিন্ন হওয়ায় এদের ভর আলাদা। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Three brothers analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p17", "quote": "ধরো, তিন ভাই - একই বাবা-মায়ের সন্তান (একই মৌল), কিন্তু তাদের ওজন ভিন্ন (ভর সংখ্যা ভিন্ন)। তারা \"ভাই\" পরিচয়ে এক, কিন্তু শারীরিক গঠনে (ওজনে) আলাদা।"}]}

Annotation rationale: Uses an everyday family comparison (three brothers of the same parents having different body weights) to illustrate isotopes.

Accuracy: **accurate**. The analogy accurately maps same identity/element to same parents and varying mass to varying weights.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## একটি সহজ উপমা (Analogy) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | ধরো, তিন ভাই - একই বাবা-মায়ের সন্তান (একই মৌল), কিন্তু তাদের ওজন ভিন্ন (ভর সংখ্যা ভিন্ন)। তারা &quot;ভাই&quot; পরিচয়ে এক, কিন্তু শারীরিক গঠনে (ওজনে) আলাদা। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u4: Chemical and physical properties and periodic table placement (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical properties are similar (same electron count), why physical properties differ, and the Greek root meaning behind the name isotope.

Accuracy: **accurate**. Chemical properties depend largely on electron configurations, physical properties depend on mass/density, and the etymology (iso = same, topos = place) is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## গুরুত্বপূর্ণ পয়েন্ট | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | 1. **রাসায়নিক ধর্ম প্রায় একই** — কারণ ইলেকট্রন সংখ্যা একই থাকে | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p20 | 2. **ভৌত ধর্ম ভিন্ন** — যেমন ঘনত্ব, ভর ইত্যাদি ভিন্ন হয় | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | 3. পর্যায় সারণিতে আইসোটোপগুলো **একই স্থানে** অবস্থান করে (তাই নাম &quot;iso&quot; = same, &quot;topos&quot; = place) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists Carbon-12, Carbon-13, and Carbon-14 with their proton and neutron numbers and notes C-14's application in radiocarbon dating.

Accuracy: **accurate**. The nuclear compositions and characteristics of C-12, C-13, and C-14 are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## আরেকটি উদাহরণ - কার্বনের আইসোটোপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | - **C-12**: 6 প্রোটন + 6 নিউট্রন (সবচেয়ে সাধারণ) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | - **C-13**: 6 প্রোটন + 7 নিউট্রন | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | - **C-14**: 6 প্রোটন + 8 নিউট্রন (তেজস্ক্রিয়, প্রত্নতাত্ত্বিক বয়স নির্ণয়ে ব্যবহৃত হয়) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Mnemonic rule for remembering isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise memory phrase ('একই প্রোটন, ভিন্ন নিউট্রন = আইসোটোপ') to remember the core criterion of isotopes, followed by closing remarks.

Accuracy: **accurate**. The mnemonic formula correctly captures the essential condition defining isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## সংক্ষেপে মনে রাখার সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | &gt; **&quot;একই প্রোটন, ভিন্ন নিউট্রন = আইসোটোপ&quot;** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | তোমার কি এই বিষয়ে আরও কোনো প্রশ্ন আছে? যেমন - আইসোটোপের ব্যবহার সম্পর্কে জানতে চাও? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

