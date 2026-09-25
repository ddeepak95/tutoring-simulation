# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains stoichiometry in Bengali, covering its definition, the role of balanced chemical equations, mole ratios, a worked example with methane combustion, and general procedural steps for solving stoichiometry problems.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 25,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1,
    "PROCEDURE": 1
  },
  "nested_passages": 25,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and role of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the subject and explains the fundamental definition and purpose of stoichiometry in determining quantitative relationships between reactants and products.

Accuracy: **accurate**. Correctly defines stoichiometry as the calculation of relative quantities of reactants and products in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | প্রিয় ছাত্র/ছাত্রী, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজ আমরা রসায়নের একটি খুব গুরুত্বপূর্ণ অধ্যায় **স্টোইকিওমেট্রি** সম্পর্কে শিখব। সহজ ভাষায় বললে, স্টোইকিওমেট্রি হলো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (যেসব পদার্থ বিক্রিয়া করে) এবং উৎপাদ (যেসব পদার্থ তৈরি হয়) এর পরিমাণের সম্পর্ক বের করার পদ্ধতি। এর মাধ্যমে আমরা হিসাব করে বলতে পারি—কতটা বিক্রিয়ক লাগবে, কতটা উৎপাদ তৈরি হবে, বা কোনোটি বেশি/কম আছে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Balanced chemical equations and mole ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why balanced chemical equations are essential to stoichiometry, how mole ratios are derived, and defines the mole using Avogadro's number.

Accuracy: **accurate**. Accurately conveys that stoichiometric ratios depend on balanced chemical equations, describes mole ratios, and states Avogadro's number (6.02×10²³).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | ### মূল কথা কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | সবকিছু নির্ভর করে **সুষম রাসায়নিক সমীকরণ** এর উপর। সমীকরণ সুষম না হলে অনুপাত ঠিক পাওয়া যায় না। সমীকরণ থেকে আমরা **মোলের অনুপাত** বের করি। মোল হলো পদার্থের একটা নির্দিষ্ট পরিমাণ (৬.০২×১০²³ কণা)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Methane combustion stoichiometric calculation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked example starting with the balanced combustion reaction of methane, determining molar ratios, and calculating the required reactant and produced quantities for 4 moles of methane.

Accuracy: **accurate**. The equation CH₄ + 2O₂ → CO₂ + 2H₂O is balanced, the molar ratios are correct, and calculations for 4 moles of CH₄ (8 mol O₂, 8 mol H₂O, 4 mol CO₂) are mathematically and chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### সহজ উদাহরণ দিয়ে বোঝাই | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | মিথেন গ্যাস পোড়ালে কার্বন ডাই-অক্সাইড ও পানি তৈরি হয়। সুষম সমীকরণ: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | **CH₄ + 2O₂ → CO₂ + 2H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p8 | এখান থেকে মোলের অনুপাত বের করা যায়: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | - ১ মোল CH₄ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - ২ মোল O₂ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - ১ মোল CO₂ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | - ২ মোল H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | অর্থাৎ, ১ মোল মিথেনের সাথে ঠিক ২ মোল অক্সিজেন বিক্রিয়া করে ১ মোল কার্বন ডাই-অক্সাইড ও ২ মোল পানি তৈরি করে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | **এখন হিসাব করি:**   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | তোমার কাছে ৪ মোল মিথেন আছে। তাহলে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | - কত মোল অক্সিজেন লাগবে? → ৪ × ২ = ৮ মোল O₂   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - কত মোল পানি তৈরি হবে? → ৪ × ২ = ৮ মোল H₂O   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | - কত মোল CO₂ তৈরি হবে? → ৪ × ১ = ৪ মোল CO₂ | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: General procedure for solving stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a reusable, sequential procedure for tackling stoichiometry problems, notes real-world applications, and concludes with a study invitation.

Accuracy: **accurate**. The listed problem-solving steps (balancing, mole ratio, conversions using molar mass, limiting reactant identification) correctly represent standard chemical problem-solving methodology.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### স্টোইকিওমেট্রি সমস্যা সমাধানের সাধারণ ধাপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | 1. সমীকরণ সুষম করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p21 | 2. মোলের অনুপাত বের করো (যেমন ২:১)। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p22 | 3. দেওয়া তথ্য (মোল বা ভর) থেকে অজানা জিনিস বের করো। ভর-মোল রূপান্তরের জন্য মোলার ভর ব্যবহার করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p23 | 4. যদি দুটো বিক্রিয়ক দেওয়া থাকে, তাহলে **সীমিত বিক্রিয়ক** বের করো (যেটা আগে শেষ হয়ে যাবে)। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p24 | এভাবে আমরা ভর-ভর, মোল-মোল, ভর-মোল ইত্যাদি সব ধরনের হিসাব করতে পারি। এটা শুধু পরীক্ষার জন্য নয়—বাস্তবে কারখানায় কতটা কাঁচামাল লাগবে বা কতটা পণ্য তৈরি হবে তা হিসাব করতেও ব্যবহার হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | কোনো উদাহরণ বা সমস্যা দিয়ে অনুশীলন করতে চাইলে বলো, আমরা একসাথে সমাধান করব! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

