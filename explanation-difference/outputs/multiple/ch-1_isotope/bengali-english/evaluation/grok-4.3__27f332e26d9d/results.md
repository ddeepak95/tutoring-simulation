# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains the concept of isotopes in Bengali, including their definition, examples (hydrogen and carbon isotopes), properties, and applications.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 15,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2
  },
  "nested_passages": 15,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of atomic number and isotope (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the atomic number is determined by protons and how differences in neutron counts define isotopes of the same element.

Accuracy: **accurate**. The definition of atomic number (Z) as proton count and isotopes as atoms of the same element with identical proton numbers but differing neutron numbers is completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | প্রিয় ছাত্র/ছাত্রী, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজ আমরা “আইসোটোপ” নামক গুরুত্বপূর্ণ একটি বিষয় নিয়ে আলোচনা করব। সহজ ভাষায় বুঝিয়ে বলছি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | প্রত্যেক মৌলের পরমাণুতে একটি নির্দিষ্ট সংখ্যক প্রোটন থাকে। এই সংখ্যাকে বলা হয় **পারমাণবিক সংখ্যা (Z)**। কিন্তু সেই পরমাণুতে নিউট্রনের সংখ্যা ভিন্ন হতে পারে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | যখন একই মৌলের পরমাণুগুলোর প্রোটনের সংখ্যা একই থাকে, কিন্তু নিউট্রনের সংখ্যা আলাদা হয়, তখন সেগুলোকে **আইসোটোপ** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Hydrogen isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the three isotopes of hydrogen (protium, deuterium, tritium), specifying their respective proton and neutron counts and explaining why they are isotopes.

Accuracy: **accurate**. The names and subatomic compositions of protium (1p, 0n), deuterium (1p, 1n), and tritium (1p, 2n) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **সহজ উদাহরণ দিয়ে বোঝাই:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | হাইড্রোজেন মৌলের তিনটি আইসোটোপ আছে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | - **প্রোটিয়াম** — ১ প্রোটন + ০ নিউট্রন | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 | - **ডিউটেরিয়াম** — ১ প্রোটন + ১ নিউট্রন | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - **ট্রিটিয়াম** — ১ প্রোটন + ২ নিউট্রন | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | এরা সবাই হাইড্রোজেনের আইসোটোপ, কারণ প্রোটনের সংখ্যা একই (১), শুধু নিউট্রনের সংখ্যা ভিন্ন। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Carbon isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents carbon-12 and carbon-14, specifying proton and neutron counts, and concluding they are isotopes.

Accuracy: **accurate**. Carbon-12 (6 protons, 6 neutrons) and carbon-14 (6 protons, 8 neutrons) are correctly identified as isotopes of carbon.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | আরেকটি উদাহরণ: কার্বন-১২ ও কার্বন-১৪। দুটোতেই প্রোটন আছে ৬টি, কিন্তু নিউট্রন যথাক্রমে ৬ ও ৮। তাই এরা কার্বনের আইসোটোপ। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have similar chemical properties (same electron count) but differing physical properties (different mass/stability).

Accuracy: **accurate**. The reasoning correctly links chemical behavior to electronic structure and physical property differences to atomic mass differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | **গুরুত্বপূর্ণ কথা:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | আইসোটোপগুলোর রাসায়নিক ধর্ম একই রকম (কারণ রাসায়নিক বৈশিষ্ট্য নির্ভর করে ইলেকট্রনের সংখ্যার উপর, যা প্রোটনের সমান)। কিন্তু ভর ভিন্ন হওয়ায় তাদের ভৌত ধর্মে (যেমন: ভর, স্থায়িত্ব) পার্থক্য দেখা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Applications of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States various practical applications of isotopes in medicine, nuclear power, and radiocarbon dating.

Accuracy: **accurate**. The listed applications (medicine, nuclear power, and carbon-14 dating for archaeological age determination) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | আইসোটোপের ব্যবহার অনেক — চিকিৎসায়, পারমাণবিক বিদ্যুৎ উৎপাদনে এবং প্রত্নতত্ত্বে (কার্বন-১৪ ডেটিং দিয়ে জিনিসের বয়স বের করা হয়)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | কোনো অংশ বুঝতে অসুবিধা হলে বা আরও উদাহরণ চাইলে বলো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

