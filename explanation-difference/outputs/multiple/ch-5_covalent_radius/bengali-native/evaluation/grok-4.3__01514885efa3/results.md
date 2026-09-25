# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly explains the definition, calculation examples, significance, and periodic trends of covalent radius in Bengali for a high school audience.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 26,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 26,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the concept of covalent radius as half the distance between the nuclei of two identical bonded atoms sharing electrons.

Accuracy: **accurate**. The definition accurately states that covalent radius is half of the internuclear distance between two identical covalently bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | প্রিয় শিক্ষার্থী, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজ আমরা সহজ ভাষায় **সমযোজী ব্যাসার্ধ** (Covalent Radius) নিয়ে আলোচনা করব। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### সমযোজী ব্যাসার্ধ কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | কোনো পরমাণু যখন অন্য একটি পরমাণুর সাথে **সমযোজী বন্ধন** (যেমন: শেয়ার করা ইলেকট্রন দিয়ে বন্ধন) গঠন করে, তখন সেই পরমাণুর আকার বা ব্যাসার্ধকে **সমযোজী ব্যাসার্ধ** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | সহজ করে বললে:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | দুটি **একই রকম** পরমাণু একটি একক সমযোজী বন্ধন দিয়ে যুক্ত হয়। তাদের দুটি নিউক্লিয়াসের মাঝের দূরত্বের অর্ধেক অংশকেই ঐ পরমাণুর সমযোজী ব্যাসার্ধ বলা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Covalent radius of chlorine (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation of chlorine's covalent radius from its internuclear bond length (198 pm / 2 = 99 pm).

Accuracy: **accurate**. The Cl-Cl bond length is correctly cited as 198 pm and divided by 2 to yield 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **উদাহরণ দিয়ে বুঝি:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | - ক্লোরিন গ্যাসের অণু (Cl₂) তে দুটি ক্লোরিন পরমাণু একটি একক বন্ধন দিয়ে যুক্ত থাকে।   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - দুটি ক্লোরিন পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্ব = ১৯৮ pm (পিকোমিটার)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - তাহলে একটি ক্লোরিন পরমাণুর সমযোজী ব্যাসার্ধ = ১৯৮ ÷ ২ = **৯৯ pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Covalent radius of hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a separate worked example showing that the H-H bond length of 74 pm yields a covalent radius of 37 pm.

Accuracy: **accurate**. The H-H bond length is accurately given as 74 pm, giving a covalent radius of 37 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | একইভাবে হাইড্রোজেন অণুতে (H₂) H–H বন্ধন দৈর্ঘ্য ৭৪ pm হলে হাইড্রোজেনের সমযোজী ব্যাসার্ধ হয় ৩৭ pm। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Importance of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Enumerates key applications and reasons why covalent radius is an important chemical concept.

Accuracy: **accurate**. The applications cited (estimating atomic size, predicting bond lengths, and understanding chemical interactions) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### সমযোজী ব্যাসার্ধ কেন গুরুত্বপূর্ণ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | - এটি দিয়ে আমরা বুঝতে পারি কোনো অণুতে পরমাণুগুলো কতটা বড় বা ছোট। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | - বন্ধন দৈর্ঘ্য (bond length) নির্ণয় করতে সাহায্য করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - রাসায়নিক বিক্রিয়ায় পরমাণু কীভাবে যোগাযোগ করে তা বুঝতে সুবিধা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the periodic trends across periods and down groups, including underlying causes (shell addition and increasing nuclear charge) and examples.

Accuracy: **accurate**. The group trend (increasing downward due to additional electron shells) and period trend (decreasing across a period due to increased effective nuclear charge) are accurately stated along with correct representative element series.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### পর্যায় সারণিতে সমযোজী ব্যাসার্ধের পরিবর্তন (সহজ নিয়ম) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | 1. **একই গ্রুপে (উপর থেকে নিচে)**: সমযোজী ব্যাসার্ধ বাড়ে।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 |    কারণ: নতুন শেল যোগ হয়, তাই পরমাণুর আকার বড় হয়।   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p19 |    উদাহরণ: Li &lt; Na &lt; K &lt; Rb | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | 2. **একই পর্যায়ে (বাম থেকে ডানে)**: সমযোজী ব্যাসার্ধ কমে।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 |    কারণ: প্রোটন সংখ্যা বাড়ে, তাই নিউক্লিয়াস ইলেকট্রনকে আরও জোরে টানে।   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p22 |    উদাহরণ: Li &gt; Be &gt; B &gt; C &gt; N &gt; O &gt; F | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Summary memory aid for periodic trends (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a concise memory rule linking atomic size and position in the periodic table, accompanied by a polite closing.

Accuracy: **accurate**. The memory rules accurately capture the directional trends of atomic/covalent radii.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### মনে রাখার সহজ উপায় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | - **বড় পরমাণু** = বড় সমযোজী ব্যাসার্ধ (নিচের দিকে) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p25 | - **ছোট পরমাণু** = ছোট সমযোজী ব্যাসার্ধ (ডান দিকে) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p26 | যদি কোনো নির্দিষ্ট উদাহরণ বা চিত্র দিয়ে আরও বিস্তারিত বুঝতে চাও, তাহলে বলো। আমি আরও সহজ করে ব্যাখ্যা করব! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

