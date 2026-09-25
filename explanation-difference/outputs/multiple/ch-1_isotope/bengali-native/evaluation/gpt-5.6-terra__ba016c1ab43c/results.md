# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of isotopes in chemistry, covering their definition, atomic composition, examples (carbon and hydrogen), isotopic notation, physical and chemical properties, applications, and a memory tip.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 52,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 52,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and explanation of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes as atoms of the same element having the same number of protons but differing numbers of neutrons and therefore different mass numbers.

Accuracy: **accurate**. The definition of isotopes and the distinction between proton number and mass number are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ### সমস্থানিক (Isotope) কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | একই মৌলের এমন পরমাণুগুলোকে **সমস্থানিক** বলে যাদের— | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | - **প্রোটন সংখ্যা একই** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - কিন্তু **নিউট্রন সংখ্যা ভিন্ন** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | প্রোটন সংখ্যা একই হওয়ায় তারা একই মৌলের পরমাণু। তবে নিউট্রন আলাদা হওয়ায় তাদের **ভরসংখ্যা** আলাদা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Fundamental subatomic particles of an atom (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains atomic structure, the nucleus, subatomic particles (protons, neutrons, electrons), their charges, and that the proton number defines the identity of an element.

Accuracy: **accurate**. Descriptions of the nucleus, charges of protons, neutrons, and electrons, and the role of atomic number in determining elemental identity are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### পরমাণুর গুরুত্বপূর্ণ অংশ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | পরমাণুর কেন্দ্রে থাকে নিউক্লিয়াস। সেখানে থাকে— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | - **প্রোটন**: ধনাত্মক চার্জযুক্ত | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | - **নিউট্রন**: চার্জহীন | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - **ইলেকট্রন**: ঋণাত্মক চার্জযুক্ত, নিউক্লিয়াসের বাইরে থাকে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | কোনো মৌল কী হবে, তা নির্ধারণ করে তার **প্রোটন সংখ্যা**। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Carbon isotopes and nuclear notation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using carbon (C-12, C-13, C-14) in a tabular comparison and explains standard isotopic notation.

Accuracy: **accurate**. The subatomic particle numbers for C-12, C-13, and C-14 and the explanation of superscript (mass number) and subscript (atomic number) notation are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## উদাহরণ: কার্বনের সমস্থানিক | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | কার্বনের সব পরমাণুতে প্রোটন থাকে **৬টি**। কিন্তু নিউট্রনের সংখ্যা ভিন্ন হতে পারে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | &#124; কার্বনের ধরন &#124; প্রোটন &#124; নিউট্রন &#124; ভরসংখ্যা &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | &#124; কার্বন-12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124; কার্বন-13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | &#124; কার্বন-14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p21 | এরা সবাই কার্বন, কারণ সবার প্রোটন সংখ্যা ৬। কিন্তু নিউট্রন সংখ্যা আলাদা বলে এরা কার্বনের ভিন্ন ভিন্ন **সমস্থানিক**। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | এভাবে লেখা হয়: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | {}^{12}_{6}\text{C}, \quad {}^{13}_{6}\text{C}, \quad {}^{14}_{6}\text{C} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | এখানে— | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | - নিচের সংখ্যা = **পারমাণবিক সংখ্যা** = প্রোটন সংখ্যা | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | - উপরের সংখ্যা = **ভরসংখ্যা** = প্রোটন + নিউট্রন | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Hydrogen isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides hydrogen isotopes (protium, deuterium, tritium) as another concrete example of isotopic variation.

Accuracy: **accurate**. The names, symbols, and subatomic particle counts for protium, deuterium, and tritium are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### আরেকটি উদাহরণ: হাইড্রোজেন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | হাইড্রোজেনের তিনটি পরিচিত সমস্থানিক আছে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | 1. **প্রোটিয়াম** \(({}^{1}_{1}H)\): ১ প্রোটন, ০ নিউট্রন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | 2. **ডিউটেরিয়াম** \(({}^{2}_{1}H)\): ১ প্রোটন, ১ নিউট্রন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | 3. **ট্রিটিয়াম** \(({}^{3}_{1}H)\): ১ প্রোটন, ২ নিউট্রন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have similar chemical properties (same electron configuration/protons), different physical masses, and radioactive instability in certain isotopes.

Accuracy: **accurate**. The explanation of chemical similarity, mass differences, and radioactive instability is standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ## সমস্থানিকের বৈশিষ্ট্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | ### ১. রাসায়নিক ধর্ম প্রায় একই | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | যেহেতু একই মৌলের সমস্থানিকগুলোর প্রোটন ও ইলেকট্রন সংখ্যা একই, তাই তাদের রাসায়নিক ধর্ম সাধারণত একই রকম। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p39 | ### ২. ভর ভিন্ন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | নিউট্রন সংখ্যা ভিন্ন হওয়ায় তাদের ভর ভিন্ন হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p41 | ### ৩. কিছু সমস্থানিক তেজস্ক্রিয় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | কিছু সমস্থানিক স্থিতিশীল নয়। তারা বিকিরণ ছড়ায়, তাই তাদের **তেজস্ক্রিয় সমস্থানিক** বলে। যেমন কার্বন-14। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Application of Carbon-14 in radiocarbon dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an application of Carbon-14 to date archaeological artifacts, bone, and ancient wood.

Accuracy: **accurate**. Radiocarbon dating using carbon-14 is an accurate and well-established scientific application.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## সমস্থানিকের ব্যবহার | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | - **কার্বন-14**: পুরোনো কাঠ, হাড় বা প্রত্নতাত্ত্বিক বস্তু কত বছরের পুরোনো তা নির্ণয়ে। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Application of Cobalt-60 in cancer treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an application of Cobalt-60 in radiotherapy for cancer treatment.

Accuracy: **accurate**. Cobalt-60 is widely used in radiotherapy for treating cancer.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | - **কোবাল্ট-60**: ক্যানসারের চিকিৎসায়। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Application of Iodine-131 in thyroid medicine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an application of Iodine-131 in thyroid disease diagnosis and therapy.

Accuracy: **accurate**. Iodine-131 is accurately identified as being used in the diagnosis and treatment of thyroid conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | - **আয়োডিন-131**: থাইরয়েড রোগ নির্ণয় ও চিকিৎসায়। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Application of Uranium-235 in nuclear power generation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents an application of Uranium-235 as fuel in nuclear electricity generation.

Accuracy: **accurate**. Uranium-235 is correctly cited as a fuel isotope used in nuclear power reactors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | - **ইউরেনিয়াম-235**: পারমাণবিক বিদ্যুৎ উৎপাদনে। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Mnemonic rule for remembering isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise memory aid emphasizing that identical protons combined with differing neutrons define isotopes.

Accuracy: **accurate**. The memory tip accurately summarizes the core scientific criterion for isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ### মনে রাখার সহজ কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | &gt; **“একই প্রোটন, ভিন্ন নিউট্রন = সমস্থানিক”** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p52 | অর্থাৎ, একই মৌলের পরমাণু হলেও নিউট্রনের সংখ্যা আলাদা হলে তারা সমস্থানিক। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

