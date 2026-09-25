# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and clearly explains the chemistry concept of isotopes in Bengali, covering definition, hydrogen isotopes, properties, and applications.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "STUDY_SUPPORT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 4
  },
  "nested_passages": 34,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 7,
    "localized": 1,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotope (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what isotopes are in terms of equal proton number and differing mass/neutron number.

Accuracy: **accurate**. The definition that atoms having the same number of protons but different mass numbers or neutron numbers are isotopes of one another is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! কেমন আছো? আশা করি ভালো আছো।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজ আমরা রসায়নের খুব মজার এবং গুরুত্বপূর্ণ একটা বিষয় সহজভাবে শিখব। বিষয়টি হলো **আইসোটোপ (Isotope)**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | ভয় পাওয়ার কিছু নেই, একদম সহজ ভাষায় চলো এটা বুঝে নেওয়া যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### আইসোটোপ কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | সহজ কথায় বললে:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | **যেসব পরমাণুর প্রোটন সংখ্যা সমান, কিন্তু ভর সংখ্যা (বা নিউট্রন সংখ্যা) ভিন্ন, তাদেরকে একে অপরের আইসোটোপ বলে।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Mnemonic using the Bengali letter 'po' (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p9", "quote": "আইসোটো**প** শব্দের শেষে **‘প’** আছে। ‘প’ দিয়ে মনে রাখবে **‘প্রোটন’**।"}]}

Annotation rationale: Provides a Bengali linguistic mnemonic associating the ending letter 'po' in 'আইসোটোপ' with 'proton' to remember that proton count remains the same.

Accuracy: **accurate**. The Bengali mnemonic appropriately assists high school students in remembering that the proton number is identical in isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | মনে রাখার একটি চমৎকার টেকনিক আছে:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | &gt; আইসোটো**প** শব্দের শেষে **‘প’** আছে। ‘প’ দিয়ে মনে রাখবে **‘প্রোটন’**। অর্থাৎ, এদের **প্রোটন সংখ্যা সমান** থাকবে! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u3: Triplet friends with school bags analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p12", "quote": "তাদের পিঠের স্কুল ব্যাগের ওজন আলাদা—কারো ব্যাগে বই কম, কারো ব্যাগে বই বেশি।"}]}

Annotation rationale: Compares isotopes to triplet friends who look identical and share the same roll number, but carry different weights in their school backpacks.

Accuracy: **accurate**. The cross-domain analogy between triplet students with different school bag weights and atoms with equal proton numbers but differing neutron numbers is clear and conceptually sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ### একটি বাস্তব উদাহরণ দিয়ে বুঝি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | মনে করো তোমার তিনজন বন্ধু আছে, যারা দেখতে একদম একই রকম (যমজ বা ট্রিপলেট)। তাদের সবার নামই এক এবং সবার রোল নম্বরও এক। কিন্তু তাদের পিঠের স্কুল ব্যাগের ওজন আলাদা—কারো ব্যাগে বই কম, কারো ব্যাগে বই বেশি।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p13 | আইসোটোপের ব্যাপারটাও ঠিক এমন! এরা মূলত **একই মৌলের পরমাণু**, কারণ এদের প্রোটন সংখ্যা সমান। কিন্তু এদের ভেতরে থাকা **নিউট্রনের সংখ্যা কম-বেশি হওয়ার কারণে এদের ভর বা ওজন আলাদা হয়**। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Isotopes of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the concept of isotopes using the standard example of protium, deuterium, and tritium.

Accuracy: **accurate**. Correctly states the proton and neutron numbers as well as mass numbers for protium (1 proton, 0 neutrons), deuterium (1 proton, 1 neutron), and tritium (1 proton, 2 neutrons).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | ### সবচেয়ে জনপ্রিয় উদাহরণ: হাইড্রোজেনের আইসোটোপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | হাইড্রোজেনের তিনটি পরিচিত আইসোটোপ আছে। এদের সবারই প্রোটন সংখ্যা ১, কিন্তু নিউট্রন সংখ্যা আলাদা: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | ১. **প্রোটিয়াম ($^1_1H$):** এর ১টি প্রোটন আছে, কিন্তু কোনো নিউট্রন নেই। (ভর = ১) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | ২. **ডিউটেরিয়াম ($^2_1H$):** এর ১টি প্রোটন এবং ১টি নিউট্রন আছে। (ভর = ২) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | ৩. **ট্রিটিয়াম ($^3_1H$):** এর ১টি প্রোটন এবং ২টি নিউট্রন আছে। (ভর = ৩) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | দেখো, সবার পরিচয় কিন্তু &quot;হাইড্রোজেন&quot; (যেহেতু সবার প্রোটন সংখ্যা ১), কিন্তু নিউট্রন সংখ্যার কারণে তাদের ভর আলাদা হয়ে গেছে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have identical chemical properties (governed by equal electron configuration) and slightly different physical properties (governed by differing mass).

Accuracy: **accurate**. The explanation correctly links chemical behavior to identical electron count and physical variations (melting/boiling point, density) to mass differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | ### এদের বৈশিষ্ট্য কেমন হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | * **রাসায়নিক ধর্ম একই থাকে:** মৌলের রাসায়নিক ধর্ম নির্ভর করে তার ইলেকট্রন সংখ্যার ওপর। যেহেতু আইসোটোপগুলোর প্রোটন সংখ্যা সমান, তাই তাদের ইলেকট্রন সংখ্যাও সমান। এজন্য এদের রাসায়নিক আচরণ একই রকম হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | * **ভৌত ধর্ম আলাদা হয়:** এদের ভর ভিন্ন হওয়ায় গলনাঙ্ক, স্ফুটনাঙ্ক বা ঘনত্বের মতো ভৌত ধর্মগুলো সামান্য ভিন্ন হতে পারে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Isotopes in medicine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents cobalt-60 for cancer treatment and iodine-131 for thyroid therapy as real-world medical applications.

Accuracy: **accurate**. Cobalt-60 is commonly used in radiotherapy for destroying cancer tumors, and iodine-131 is used in treating thyroid disorders.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | ### আইসোটোপ আমাদের কী কাজে লাগে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | এগুলো শুধু বইয়ের পড়ার বিষয় নয়, বাস্তবে এদের অনেক দামি ব্যবহার আছে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | ১. **চিকিৎসায়:** যেমন- কোবাল্ট-৬০ ($^{60}Co$) আইসোটোপ দিয়ে ক্যান্সারের টিউমার ধ্বংস করা হয়। আয়োডিন-১৩১ দিয়ে থাইরয়েডের চিকিৎসা হয়। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Carbon dating application (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents carbon-14 dating for determining the age of ancient fossils and mummies.

Accuracy: **accurate**. Carbon-14 is indeed the standard radioisotope used in radiocarbon dating of biological remains such as fossils and mummies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ২. **কার্বন ডেটিং:** কার্বন-১৪ ($^{14}C$) ব্যবহার করে হাজার বছরের পুরনো জীবাশ্ম বা মমি কত বছরের পুরোনো তা বের করা যায়। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Isotopes in electricity generation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents uranium isotopes used in nuclear power plants to generate electricity.

Accuracy: **accurate**. Uranium isotopes (primarily U-235) are standard nuclear fuel for generating electricity in nuclear power plants.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ৩. **বিদ্যুৎ উৎপাদনে:** ইউরেনিয়ামের আইসোটোপ দিয়ে পারমাণবিক বিদ্যুৎ কেন্দ্রে বিদ্যুৎ তৈরি করা হয়। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Summary equation for isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary equation reinforcing the definition of isotopes.

Accuracy: **accurate**. The recap accurately synthesizes that same element + equal proton number + different neutron/mass number constitutes an isotope.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | **সংক্ষেপে মনে রাখবে:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | &gt; **একই মৌল + সমান প্রোটন সংখ্যা + ভিন্ন নিউট্রন/ভর সংখ্যা = আইসোটোপ।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p34 | বিষয়টি কি তোমার কাছে পরিষ্কার হয়েছে, নাকি কোনো জায়গায় আরেকটু বুঝিয়ে বলব? দ্বিধা না করে বলো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

