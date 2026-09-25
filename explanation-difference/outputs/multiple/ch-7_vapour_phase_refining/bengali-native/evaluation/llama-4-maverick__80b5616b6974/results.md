# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt asks for vapour phase refining (a metallurgical purification process such as the Mond or Van Arkel process), but the response incorrectly equates 'বাষ্পীয় দশা বিশোধন' to steam distillation (বাষ্প পাতন) and explains the purification of organic compounds using steam.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 9,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "CAVEAT": 1,
    "EXAMPLE": 1
  },
  "nested_passages": 9,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of steam distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the distillation technique using steam to distill substances below their normal boiling points.

Accuracy: **not_assessed_due_to_topic_mismatch**. Unit accuracy is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | বাষ্পীয় দশা বিশোধন বা স্টিম ডিস্টিলেশন একটি বিশেষ প্রক্রিয়া যেখানে জলীয় বাষ্প ব্যবহার করে কোনো তরল বা কঠিন পদার্থকে তার স্ফুটনাঙ্কের নিচের তাপমাত্রায় পাতিত করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Operational steps of steam distillation (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the steps taken to perform the distillation, from introducing steam into the flask to condensing and separating the organic substance.

Accuracy: **not_assessed_due_to_topic_mismatch**. Unit accuracy is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | এই পদ্ধতিতে যে পদার্থকে বিশোধন করা হবে তাকে পানি বা জলের সাথে মিশানো হয় না এমন কোনো দ্রাবকে দ্রবীভূত করা হয়। এরপর এই দ্রবণকে একটি বিশেষ ধরনের পাতন ফ্লাস্কে নিয়ে উচ্চ তাপমাত্রায় জলীয় বাষ্প প্রবেশ করিয়ে দ্রবণের বাষ্পকে পাতিত করা হয়। | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p5 | এই পদ্ধতিতে পাতিত বাষ্পকে ঠাণ্ডা করে জলীয় অংশ এবং জৈব যৌগকে আলাদা করা হয়। এভাবে জৈব যৌগকে বিশোধন করা হয়। | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u3: Advantage for thermally sensitive compounds (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that steam distillation prevents thermal decomposition of sensitive organic compounds by keeping temperatures below their normal boiling points.

Accuracy: **not_assessed_due_to_topic_mismatch**. Unit accuracy is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | এই পদ্ধতির সুবিধা হলো, সাধারণ পাতন পদ্ধতিতে যে সমান্য জৈব যৌগগুলো তাদের স্ফুটনাঙ্কে পৌঁছানোর আগেই বিযোজিত হয়ে যায়, তাদেরকে সহজেই বিশোধন করা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Vapor pressure mechanism and boiling point lowering (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the combination of water vapor pressure and compound vapor pressure reaches atmospheric pressure at a lower temperature.

Accuracy: **not_assessed_due_to_topic_mismatch**. Unit accuracy is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | তোমরা জানো যে, তরল পদার্থের তলদেশে চাপ কম হলে স্ফুটন ঘটে এবং স্ফুটনাঙ্ক কমে যায়। বাষ্পীয় দশা বিশোধনে জলীয় বাষ্প প্রবেশ করানোর ফলে মিশ্রণটির মোট বাষ্পচাপ বেড়ে যায় এবং বায়ুমণ্ডলীয় চাপের সমান হয়। ফলে মিশ্রণটির স্ফুটনাঙ্ক কমে যায় এবং সেটি তার স্ফুটনাঙ্কের চেয়ে কম তাপমাত্রায় পাতিত হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Limitation to immiscible liquids (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Notes the primary limitation that this method is applicable only to immiscible liquid mixtures.

Accuracy: **not_assessed_due_to_topic_mismatch**. Unit accuracy is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | এই পদ্ধতির একটি সীমাবদ্ধতা হলো, এ পদ্ধতিতে শুধু অমিশ্রণীয় তরল যৌগকে পৃথক করা যায়। | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |

## u6: Purification of aniline via steam distillation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents aniline purification as a concrete application of steam distillation, with attached intro and outro passages.

Accuracy: **not_assessed_due_to_topic_mismatch**. Unit accuracy is not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | তোমাদের বুঝতে সুবিধা হবে যদি একটি উদাহরণ দিয়ে বিষয়টি ব্যাখ্যা করি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | অ্যানিলিন উৎপাদনে বাষ্পীয় দশা বিশোধন পদ্ধতি ব্যবহার করা হয়। এ পদ্ধতিতে অ্যানিলিনকে পানির সাথে অমিশ্রণীয় দ্রাবকে দ্রবীভূত করে জলীয় বাষ্পের সাথে পাতিত করা হয়। এতে অ্যানিলিনের স্ফুটনাঙ্ক কমে যায় এবং এটি পাতিত হয়ে পানির সাথে জমা হয়। পানিতে অ্যানিলিন অদ্রবণীয় হওয়ায় এদের আলাদা করা সহজ হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | তোমাদের বুঝতে সুবিধা হয়েছে কিনা জানাবা কিন্তু! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

