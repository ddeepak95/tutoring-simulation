# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly and comprehensively explains the mole concept for a high school chemistry audience, covering Avogadro's number, molar mass, molar volume, and quantitative formulas.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 50,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 50,
  "unique_subtopics": 6,
  "contextualization": {
    "localized": 1,
    "none": 9,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 10,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of mole to everyday and cultural counting units (ANALOGY)

Attributes: {}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p7", "quote": "আবার যদি বলো, \"১ হালি লেবু দিন\", সে তোমাকে দেবে **৪টি**। "}]}

Annotation rationale: Introduces the concept of a mole by drawing a parallel to familiar counting groupings such as a dozen (12) and a hali (4).

Accuracy: **accurate**. The analogy accurately describes the mole as a chemist's counting unit by comparing it to common counting units like dozen and hali.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! রসায়নের ক্লাসে তোমাকে স্বাগতম।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | রসায়ন পড়তে গিয়ে অনেকেই &#x27;মোল&#x27; (Mole) শব্দটা শুনে একটু ভয় পায়। কিন্তু বিশ্বাস করো, এটা আসলে আমাদের দৈনন্দিন জীবনের একটা অতি সাধারণ ধারণার মতোই সহজ!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | চলো, খুব সহজ করে গল্পচ্ছলে বিষয়টা বুঝে নেওয়া যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### ১. &#x27;মোল&#x27; আসলে কী? (একটি সহজ তুলনা) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p6 | মনে করো, তুমি বাজারে গিয়ে দোকানিকে বললে, &quot;আমাকে **১ ডজন** ডিম দিন।&quot; দোকানি তোমাকে কয়টি ডিম দেবে? ঠিক **১২টি**, তাই না?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | আবার যদি বলো, &quot;১ হালি লেবু দিন&quot;, সে তোমাকে দেবে **৪টি**।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | ঠিক একইভাবে— | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | * **ডজন** মানে যেমন ১২টি। | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | * **হালি** মানে যেমন ৪টি। | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | * তেমনি রসায়নে **&#x27;মোল&#x27;** হলো বিজ্ঞানীদের ব্যবহৃত একটি গণনার একক! | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why subatomic particles require an extraordinarily large counting unit and defines Avogadro's number (6.02 × 10^23 particles per mole).

Accuracy: **accurate**. Correctly states the value of Avogadro's number (6.02 × 10^23) and explains the necessity of using such a large number for counting microscopic particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### ২. ১ মোলে কয়টি থাকে? (অ্যাভোগাড্রো সংখ্যা) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p13 | এখন তোমার মনে প্রশ্ন আসতে পারে, &quot;স্যার, ১ ডজনে যদি ১২টা থাকে, তবে ১ মোলে কয়টা থাকে?&quot;  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | যেহেতু পরমাণু বা অণুগুলো খালি চোখে দেখা যায় না এবং এরা অসম্ভব ছোট, তাই এদের গুচ্ছটা অনেক বড় হতে হয়।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p15 | &gt; **১ মোল = $৬.০২ \times ১০^{২৩}$ টি কণা (পরমাণু, অণু বা আয়ন)** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p16 | এই সংখ্যাটাকে বলা হয় **অ্যাভোগাড্রো সংখ্যা** (Avogadro&#x27;s Number), সংক্ষেপে একে $N_A$ লেখা হয়।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | সংখ্যাটা কত বড় জানো? ৬ এর পরে ২৩টা শূন্য বসালে যত হয়!  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Hypothetical example of mole count with marbles (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the meaning of 1 mole by applying it to an everyday macroscopic object (marbles).

Accuracy: **accurate**. Accurately illustrates that 1 mole corresponds to 6.02 × 10^23 units regardless of the item.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | * যদি বলি **১ মোল মার্বেল**, তার মানে সেখানে $৬.০২ \times ১০^{২৩}$ টি মার্বেল আছে। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Example of mole count with carbon atoms (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the meaning of 1 mole applied to actual chemical particles (carbon atoms).

Accuracy: **accurate**. Accurately specifies that 1 mole of carbon atoms contains 6.02 × 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | * যদি বলি **১ মোল কার্বন পরমাণু**, তার মানে সেখানে $৬.০২ \times ১০^{২৩}$ টি কার্বন পরমাণু আছে। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Relationship between atomic mass and mass in grams (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the mole bridges atomic mass and measurable macroscopic mass in grams.

Accuracy: **contains_error**. The unit contains a historical inaccuracy stating that Amedeo Avogadro chose the number 6.02 × 10^23.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### ৩. বিজ্ঞানীরা এই অদ্ভুত সংখ্যাটি কেন বেছে নিলেন? (ওজনের সাথে সম্পর্ক) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p22 | বিজ্ঞানী অ্যাভোগাড্রো এমন একটা সংখ্যা বেছে নিয়েছিলেন, যাতে রসায়নের হিসাব-নিকাশ পানির মতো সহজ হয়ে যায়!  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | যেকোনো মৌলের **পারমাণবিক ভরকে** (Atomic mass) যদি তুমি **&#x27;গ্রাম&#x27;** এককে প্রকাশ করো, তবে ঠিক তার মধ্যেই ১ মোল কণা থাকে!  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p22): The text asserts that scientist Avogadro chose this specific number ('বিজ্ঞানী অ্যাভোগাড্রো এমন একটা সংখ্যা বেছে নিয়েছিলেন'). Historically, Amedeo Avogadro did not determine or choose this value; it was experimentally determined decades after his death and named in his honor by Jean Perrin.

Correction: The value was not chosen by Avogadro; it was determined experimentally by later scientists and named Avogadro's constant in his honor.

## u6: Example of molar mass for carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the molar mass rule using carbon-12 (12 g carbon = 1 mol carbon atoms).

Accuracy: **accurate**. Accurately states that 12 grams of carbon contains 1 mole or 6.02 × 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | **যেমন:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p25 | * কার্বনের ভর হলো ১২। তুমি যদি পাল্লায় মেপে ঠিক **১২ গ্রাম কার্বন** নাও, তবে তার ভেতর ঠিক ১ মোল বা $৬.০২ \times ১০^{২৩}$ টি কার্বন পরমাণু থাকবে! | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Example of molar mass for water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p26", "quote": "তুমি যদি এক কাপে মেপে **১৮ গ্রাম পানি** নাও (যা মাত্র কয়েক ঢোক!), তবে তুমি আসলে **১ মোল পানি** পান করছো! অর্থাৎ, তুমি $৬.০২ \\times ১০^{২৩}$ টি পানির অণু খেয়ে ফেললে! "}]}

Annotation rationale: Calculates the molecular mass of water (18 g/mol) and relates it to an everyday volume of drinking water.

Accuracy: **accurate**. Correctly calculates the molecular mass of water as 18 g/mol and describes the molar quantity accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | * পানির ($H_2O$) আণবিক ভর হলো ১৮ (হাইড্রোজেন ১×২ + অক্সিজেন ১৬ = ১৮)। তুমি যদি এক কাপে মেপে **১৮ গ্রাম পানি** নাও (যা মাত্র কয়েক ঢোক!), তবে তুমি আসলে **১ মোল পানি** পান করছো! অর্থাৎ, তুমি $৬.০২ \times ১০^{২৩}$ টি পানির অণু খেয়ে ফেললে!  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | চমৎকার, তাই না? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that gases are measured by volume rather than mass and defines the molar volume at STP as 22.4 liters.

Accuracy: **accurate**. Correctly reflects the standard secondary school chemistry definition where the molar volume of any ideal gas at STP (0 °C, 1 atm) is 22.4 liters.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### ৪. গ্যাসীয় পদার্থের ক্ষেত্রে মোলের নিয়ম | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p30 | গ্যাসের ক্ষেত্রে ওজন মাপা কঠিন, তাই বিজ্ঞানীরা আয়তন মাপেন। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p31 | * প্রমাণ তাপমাত্রা ও চাপে (STP - Standard Temperature and Pressure) **যেকোনো গ্যাসের ১ মোলের আয়তন সবসময় ২২.৪ লিটার** হবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Example of molar volume with oxygen gas (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the molar volume relationship specifically to oxygen gas.

Accuracy: **accurate**. Accurately equates 22.4 L of oxygen gas at STP to 1 mole of oxygen and 6.02 × 10^23 oxygen molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | * অর্থাৎ, ২২.৪ লিটার অক্সিজেন গ্যাস = ১ মোল অক্সিজেন = $৬.০২ \times ১০^{২৩}$ টি অক্সিজেনের অণু। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;, &#x27;equation&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Unified formula for mole calculations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents and defines the components of the standard unified formula linking moles, mass, particle count, and gas volume at STP.

Accuracy: **accurate**. The equation n = W/M = N/N_A = V/22.4 accurately represents the standard mathematical relationships between number of moles, mass, particle count, and volume at STP.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ### ৫. অংক করার জাদুকরী সূত্র (Magic Formula) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p35 | পরীক্ষায় যখন মোলের অংক আসবে, তখন তুমি শুধু এই ছোট্ট সমীকরণটি মনে রাখবে: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p36 | $$n = \frac{W}{M} = \frac{N}{N_A} = \frac{V}{২২.৪}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p37 | এখানে: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p38 | * **$n$** = মোলের সংখ্যা (Number of moles) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p39 | * **$W$** = বস্তুর দেওয়া ভর (গ্রামে) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p40 | * **$M$** = বস্তুর পারমাণবিক বা আণবিক ভর (Molar mass) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 | * **$N$** = কণার সংখ্যা (কয়টি পরমাণু বা অণু আছে) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p42 | * **$N_A$** = অ্যাভোগাড্রো সংখ্যা ($৬.০২ \times ১০^{২৩}$) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p43 | * **$V$** = STP-তে গ্যাসের আয়তন (লিটারে) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Summary recap of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise revision summary of the three fundamental aspects of 1 mole (particles, mass, and STP gas volume).

Accuracy: **accurate**. The summary correctly synthesizes the three core equivalencies of one mole in secondary chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ### এক নজরে রিভিশন: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p46 | ১ মোল বলা মানেই একসাথে তিনটা জিনিস বোঝায়: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p47 | 1. কণার সংখ্যা হিসেবে: **$৬.০২ \times ১০^{২৩}$ টি কণা**। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p48 | 2. ভরের হিসেবে: **গ্রাম এককে প্রকাশিত আণবিক বা পারমাণবিক ভর**। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p49 | 3. গ্যাসের আয়তনের হিসেবে (STP-তে): **২২.৪ লিটার**। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p50 | আশা করি মোলের ধারণাটা এখন তোমার কাছে পরিষ্কার। কোনো জায়গায় বুঝতে সমস্যা হলে নির্দ্বিধায় আমাকে আবার জিজ্ঞেস করতে পারো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

