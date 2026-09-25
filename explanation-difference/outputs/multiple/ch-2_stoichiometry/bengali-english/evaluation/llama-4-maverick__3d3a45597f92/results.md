# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response defines stoichiometry and illustrates stoichiometric calculations using mole ratios with two worked examples.

## Counts

```json
{
  "total_content_units": 3,
  "substantive_content_units": 3,
  "total_passages": 18,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2
  },
  "nested_passages": 18,
  "unique_subtopics": 2,
  "contextualization": {
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 3
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry as the branch of chemistry concerned with the quantitative relationships between substances in a chemical reaction.

Accuracy: **accurate**. The definition accurately describes stoichiometry in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | স্টোইচিওমেট্রি বা মৌলসমূহের পরিমাণ সম্পর্ক নিয়ে আলোচনা করা যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p2 | স্টোইচিওমেট্রি মূলত রসায়নের একটি গুরুত্বপূর্ণ অংশ যেখানে আমরা রাসায়নিক বিক্রিয়ায় অংশগ্রহণকারী পদার্থগুলির পরিমাণ নিয়ে আলোচনা করি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Stoichiometric relationship in water formation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses the balanced equation for the formation of water from hydrogen and oxygen to illustrate stoichiometric ratios and calculate the amount of oxygen required for 4 moles of hydrogen.

Accuracy: **accurate**. The chemical equation and mole ratios for water synthesis are chemically correct, and the calculation for 4 moles of hydrogen requiring 2 moles of oxygen is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | ধরুন, আপনি একটি রাসায়নিক বিক্রিয়া লিখলেন। যেমন: হাইড্রোজেন গ্যাস এবং অক্সিজেন গ্যাস বিক্রিয়া করে পানি তৈরি করে। এই বিক্রিয়াটির সমীকরণ হলো: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p4 | ২H₂ + O₂ → 2H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p5 | এই সমীকরণে আমরা দেখতে পাচ্ছি যে ২ অণু হাইড্রোজেন গ্যাস ১ অণু অক্সিজেন গ্যাসের সাথে বিক্রিয়া করে ২ অণু পানি তৈরি করে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p6 | এখন, স্টোইচিওমেট্রি আমাদের বলে যে এই বিক্রিয়ায় অংশগ্রহণকারী পদার্থগুলির পরিমাণ কীভাবে সম্পর্কিত। অর্থাৎ, কত মোল হাইড্রোজেন গ্যাস কত মোল অক্সিজেন গ্যাসের সাথে বিক্রিয়া করবে এবং কত মোল পানি তৈরি হবে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | উপরের সমীকরণ থেকে আমরা দেখতে পাচ্ছি যে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | * ২ মোল H₂ বিক্রিয়া করে ২ মোল H₂O তৈরি করে। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | * ১ মোল O₂ বিক্রিয়া করে ২ মোল H₂O তৈরি করে। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | সুতরাং, যদি আমাদের ৪ মোল H₂ থাকে, তাহলে আমাদের কত মোল O₂ লাগবে? উত্তর হলো ২ মোল O₂। কারণ, ২ মোল H₂ ১ মোল O₂-এর সাথে বিক্রিয়া করে, তাই ৪ মোল H₂ বিক্রিয়া করবে ২ মোল O₂-এর সাথে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | এইভাবে, স্টোইচিওমেট্রি আমাদের রাসায়নিক বিক্রিয়ায় অংশগ্রহণকারী পদার্থগুলির পরিমাণ নির্ধারণ করতে সাহায্য করে। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |

## u3: Stoichiometric calculation for ammonia synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents and solves a practice problem calculating the amounts of hydrogen required and ammonia produced from 3.0 moles of nitrogen.

Accuracy: **accurate**. The equation for the synthesis of ammonia (N2 + 3H2 -> 2NH3) is balanced, and the calculations indicating that 3.0 mol of N2 requires 9.0 mol of H2 and produces 6.0 mol of NH3 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | এখন, একটি উদাহরণ দিয়ে এটা আরও পরিষ্কার করা যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | উদাহরণ: ৩.০ মোল নাইট্রোজেন গ্যাস (N₂) হাইড্রোজেন গ্যাসের (H₂) সাথে বিক্রিয়া করে অ্যামোনিয়া (NH₃) তৈরি করে। কত মোল হাইড্রোজেন গ্যাস লাগবে এবং কত মোল অ্যামোনিয়া তৈরি হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | প্রথমে, আমাদের বিক্রিয়াটির সমীকরণ লিখতে হবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | N₂ + 3H₂ → 2NH₃ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | এখন, আমরা দেখতে পাচ্ছি যে ১ মোল N₂ বিক্রিয়া করে ২ মোল NH₃ তৈরি করে এবং ৩ মোল H₂ বিক্রিয়া করে ২ মোল NH₃ তৈরি করে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | সুতরাং, ৩.০ মোল N₂ বিক্রিয়া করবে ৯.০ মোল H₂-এর সাথে এবং তৈরি করবে ৬.০ মোল NH₃। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | এইভাবে, স্টোইচিওমেট্রি আমাদের রাসায়নিক বিক্রিয়ায় অংশগ্রহণকারী পদার্থগুলির পরিমাণ নির্ধারণ করতে সাহায্য করে। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |

