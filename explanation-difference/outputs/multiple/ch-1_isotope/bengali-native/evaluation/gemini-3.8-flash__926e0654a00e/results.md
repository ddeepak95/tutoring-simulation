# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains isotopes (সমস্থানিক) in Bengali for a high school student, covering their definition, subatomic basis, hydrogen examples, a memory aid, and practical applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 28,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 28,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of identical triplets with different weights (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "তোমার ক্লাসে তিনজন যমজ ভাই আছে। তাদের মুখ দেখতে একই রকম, গায়ের রঙ এক, এমনকি তাদের উচ্চতাও এক। কিন্তু ওজন মাপার মেশিনে দাঁড় করালে দেখা গেল একজনের ওজন ৪০ কেজি, একজনের ৪১ কেজি আর আরেকজনের ৪২ কেজি!"}]}

Annotation rationale: Introduces the concept of isotopes using an intuitive cross-domain comparison to identical triplets who look identical but have different body weights on a scale.

Accuracy: **accurate**. The analogy accurately parallels how isotopes of an element share identical chemical identity and atomic number while differing in atomic mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | প্রিয় শিক্ষার্থী, কেমন আছো? রসায়নের চমৎকার এক জাদুকরী বিষয় নিয়ে আজকে আমরা কথা বলব। খুব সহজ একটা উদাহরণ দিয়ে শুরু করি, কেমন? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ধরো, তোমার ক্লাসে তিনজন যমজ ভাই আছে। তাদের মুখ দেখতে একই রকম, গায়ের রঙ এক, এমনকি তাদের উচ্চতাও এক। কিন্তু ওজন মাপার মেশিনে দাঁড় করালে দেখা গেল একজনের ওজন ৪০ কেজি, একজনের ৪১ কেজি আর আরেকজনের ৪২ কেজি!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | পরমাণুর জগতেও ঠিক এমন মজার একটি ঘটনা ঘটে। আর একেই রসায়নের ভাষায় বলা হয় **আইসোটোপ (Isotope)** বা **সমস্থানিক**। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition, etymology, and subatomic explanation of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the formal definition of isotopes, explains the Bengali etymology ('সম' and 'স্থানিক' meaning same position in the periodic table), and explains why varying neutron counts alter mass number while keeping elemental identity constant.

Accuracy: **accurate**. The definition, subatomic composition (protons and neutrons), and the Bengali naming derivation based on the periodic table are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | চলো, একদম সহজ করে বিষয়টা বুঝে নিই: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | ### সমস্থানিক বা আইসোটোপ কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | **&quot;যেসব পরমাণুর প্রোটন সংখ্যা সমান, কিন্তু ভর সংখ্যা (বা নিউট্রন সংখ্যা) ভিন্ন—তাদেরকে পরস্পরের আইসোটোপ বা সমস্থানিক বলে।&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | বাংলা নামটা খেয়াল করো—**&#x27;সম&#x27;** মানে সমান, আর **&#x27;স্থানিক&#x27;** এসেছে স্থান থেকে। পর্যায় সারণিতে (Periodic table) এদের অবস্থান একই ঘরে, কারণ এদের প্রোটন সংখ্যা সমান। তাই এদের নাম &#x27;সমস্থানিক&#x27;। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p8 | ### বিষয়টি আরেকটু গভীরভাবে বুঝি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | আমরা জানি, একটি পরমাণুর নিউক্লিয়াসে থাকে **প্রোটন** আর **নিউট্রন**।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | * **প্রোটন সংখ্যা** হলো কোনো মৌলের আসল পরিচয় বা তার &#x27;ফিঙ্গারপ্রিন্ট&#x27;। প্রোটন সংখ্যা বদলালে মৌলটাই বদলে যায়।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p11 | * কিন্তু **নিউট্রন সংখ্যা** কম-বেশি হতে পারে। নিউট্রন সংখ্যা কম-বেশি হলে পরমাণুর ওজনের (ভর সংখ্যা) পরিবর্তন হয়, কিন্তু মৌলটি একই থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Hydrogen isotopes: Protium, Deuterium, and Tritium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates isotopes using the classic example of hydrogen, detailing the subatomic constituents and mass numbers of protium, deuterium, and tritium.

Accuracy: **accurate**. The proton counts, neutron counts, and mass numbers for protium (1p, 0n, mass 1), deuterium (1p, 1n, mass 2), and tritium (1p, 2n, mass 3) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### সবচেয়ে সেরা উদাহরণ: হাইড্রোজেন (Hydrogen) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | প্রকৃতিতে হাইড্রোজেনের ৩ ভাই বা আইসোটোপ দেখা যায়: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | ১. **প্রোটিয়াম (সাধারণ হাইড্রোজেন):** এর নিউক্লিয়াসে ১টি প্রোটন আছে, কিন্তু **কোনো নিউট্রন নেই**। (ভর = ১) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | ২. **ডিউটেরিয়াম:** এর ১টি প্রোটন এবং **১টি নিউট্রন** আছে। (ভর = ২) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | ৩. **ট্রিটিয়াম:** এর ১টি প্রোটন এবং **২টি নিউট্রন** আছে। (ভর = ৩) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | দেখো, তিনজনেরই প্রোটন সংখ্যা &#x27;১&#x27;, তাই এরা সবাই হাইড্রোজেন। কিন্তু নিউট্রন আলাদা হওয়ার কারণে এদের ভর যথাক্রমে ১, ২ এবং ৩। এরা হলো একে অপরের আইসোটোপ। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Mnemonic trick for remembering isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a Bengali language mnemonic connecting the final letter 'প' (p) in 'আইসোটোপ' / 'Isotope' to equal 'প্রোটন' (proton) number.

Accuracy: **accurate**. The mnemonic accurately maps the ending letter 'p' / 'প' to equal proton number, a standard and correct pedagogical device in Bengali high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### একটি জাদুকরী ট্রিক (মনে রাখার টেকনিক): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | পরীক্ষার হলে অনেকেই আইসোটোপ, আইসোবার আর আইসোটোনের মধ্যে গুলিয়ে ফেলে। তুমি এভাবে মনে রাখবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | * আইসো**টো**প (Isoto**p**e) — শেষে **&#x27;প&#x27;** আছে, তার মানে **প্রোটন** সংখ্যা সমান!  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |

## u5: Medical applications: Cobalt-60 and Iodine-131 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Gives concrete real-world applications of radioisotopes in medicine, specifically Cobalt-60 for cancer therapy and Iodine-131 for thyroid treatment.

Accuracy: **accurate**. Cobalt-60 is routinely used in radiation therapy for cancer, and Iodine-131 is used in diagnosing and treating thyroid disorders.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### এরা আমাদের কী কাজে লাগে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | আইসোটোপ শুধু বইয়ের পড়া নয়, আমাদের জীবনে এর অনেক অবদান আছে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | * **চিকিৎসায়:** ক্যান্সারের কোষ ধ্বংস করতে কোবাল্ট-৬০ ($^{60}\text{Co}$) আইসোটোপ ব্যবহার করা হয়। থাইরয়েডের চিকিৎসায় আয়োডিন-১৩১ ব্যবহার করা হয়। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Archaeological application: Carbon-14 dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "তোমরা হয়তো টিভিতে ডাইনোসরের ফসিল নিয়ে অনুষ্ঠান দেখেছ।"}]}

Annotation rationale: Illustrates the use of Carbon-14 in radiocarbon dating to determine the age of ancient fossils and mummies.

Accuracy: **accurate**. Carbon-14 dating is accurately described as a technique to determine the age of ancient biological remains and archaeological artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | * **ইতিহাস জানতে:** তোমরা হয়তো টিভিতে ডাইনোসরের ফসিল নিয়ে অনুষ্ঠান দেখেছ। কোনো প্রাচীন ফসিল বা মমির বয়স কত, তা বের করা হয় **কার্বন-১৪ ($^{14}\text{C}$)** আইসোটোপের সাহায্যে (যাকে কার্বন ডেটিং বলে)। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Agricultural and energy applications of isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of isotopes in pest control in agriculture and electricity generation in nuclear reactors.

Accuracy: **accurate**. Radioisotopes are standardly applied in agricultural pest control (sterile insect technique) and nuclear reactors for electricity generation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | * **কৃষিকাজে ও বিদ্যুৎ উৎপাদনে:** ফসলের ক্ষতিকারক পোকা দমনে এবং পারমাণবিক চুল্লিতে বিদ্যুৎ তৈরিতে আইসোটোপ ব্যবহার করা হয়। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Summary recap of isotope core principles (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a one-sentence final summary of the core concept followed by an encouraging social wrap-up.

Accuracy: **accurate**. The recap accurately synthesizes that isotopes are the same element with the same proton count but differing weights due to different neutron counts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | **এক নজরে সারকথা:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | আইসোটোপ মানেই হলো—**একই মৌল, প্রোটন সংখ্যা একই, কিন্তু নিউট্রন ভিন্ন হওয়ার কারণে ওজনে (ভর সংখ্যায়) আলাদা।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p28 | আশা করি সমস্থানিক বা আইসোটোপের বিষয়টা তোমার কাছে এখন একদম পরিষ্কার পানির মতো সহজ লাগছে! কোনো প্রশ্ন থাকলে নির্দ্বিধায় আমাকে জিজ্ঞেস করতে পারো। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

