# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate explanation of the mole concept in Bengali, covering its conceptual foundation through everyday counting analogies, Avogadro's number, molar mass, molar volume at STP, calculation formulas, a worked practice problem, and a summary.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 57,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 57,
  "unique_subtopics": 7,
  "contextualization": {
    "localized": 1,
    "everyday": 1,
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Conceptual definition of mole as a counting unit using familiar analogies (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p6", "quote": "যদি বলো, \" **এক হালি** লেবু দিন\", দোকানদার দেবে **৪টি**।"}]}

Annotation rationale: Introduces the mole by explaining why chemists need a collective unit to count extremely small atoms and molecules, drawing analogies to everyday counting units such as dozen, hali, and pair.

Accuracy: **accurate**. The explanation correctly defines the mole as a macroscopic counting packet for submicroscopic particles using intuitive counting analogies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! রসায়ন (Chemistry)-এর অন্যতম গুরুত্বপূর্ণ এবং মজার একটি বিষয় হলো **&#x27;মোল ধারণা&#x27; (Mole Concept)**। এটি প্রথম দিকে একটু কঠিন মনে হলেও, একবার বুঝে গেলে খুব সহজ।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | চলো, একদম সহজভাবে বিষয়টাকে বুঝে নেওয়া যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### ১. &#x27;মোল&#x27; আসলে কী? (একটি সহজ উদাহরণ) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | তুমি যখন বাজারে গিয়ে বলো, &quot;আমাকে **এক ডজন** ডিম দিন&quot;, দোকানদার তোমাকে কয়টি ডিম দেয়? **১২টি**। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | যদি বলো, &quot; **এক হালি** লেবু দিন&quot;, দোকানদার দেবে **৪টি**। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | যদি বলো, &quot; **এক জোড়া** জুতো দিন&quot;, তুমি পাবে **২টি**। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | রসায়নে পরমাণু (atom) বা অণু (molecule)-রা এত ছোট যে তাদের একটা-দুটো করে গোনা অসম্ভব। সামান্য এক ফোঁটা জলেও কোটি কোটি অণু থাকে! তাই বিজ্ঞানীদের এমন একটা বড় &quot;প্যাকেট&quot; বা &quot;একক&quot; দরকার ছিল, যা দিয়ে পরমাণু বা অণু গোনা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p9 | রসায়নের সেই &quot;ডজন&quot;-এর মতো এককটাই হলো **&#x27;মোল&#x27; (Mole)**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Avogadro's number and particle count in one mole (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p17", "quote": "*   এমনকি তুমি যদি ১ মোল ক্রিকেট বল নাও, তার মানে তোমার কাছে $6.022 \\times 10^{23}$ টি বল আছে!"}]}

Annotation rationale: Defines the precise number of particles contained in one mole as Avogadro's number (6.022 x 10^23) and illustrates its application to atoms, molecules, and macroscopic items.

Accuracy: **accurate**. Correctly states Avogadro's number as 6.022 x 10^23 particles per mole and demonstrates its consistency regardless of whether the particle is an atom, molecule, or object.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### ২. ১ মোলে কয়টি কণা থাকে? (অ্যাভোগাড্রো সংখ্যা) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | ১ ডজন মানে যেমন সবসময় ১২টি, তেমনই রসায়নে: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | &gt; **১ মোল = $6.022 \times 10^{23}$ টি কণা (পরমাণু, অণু বা আয়ন)।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | এই বিশাল সংখ্যাটিকে বলা হয় **অ্যাভোগাড্রো সংখ্যা (Avogadro&#x27;s Number)**, যাকে সংক্ষেপে **$N_A$** লেখা হয়।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | *   ১ মোল হাইড্রোজেন পরমাণু = $6.022 \times 10^{23}$ টি হাইড্রোজেন পরমাণু। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | *   ১ মোল জল ($H_2O$) = $6.022 \times 10^{23}$ টি জলের অণু। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | *   এমনকি তুমি যদি ১ মোল ক্রিকেট বল নাও, তার মানে তোমার কাছে $6.022 \times 10^{23}$ টি বল আছে! | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Relationship between mole and mass (molar mass) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how molar mass bridges counting particles and measuring mass in the laboratory by expressing atomic or molecular mass in grams.

Accuracy: **accurate**. Accurately defines molar mass as the atomic or molecular mass expressed in grams.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### ৩. মোলের সাথে ভরের (Mass) সম্পর্ক কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | ল্যাবরেটরিতে তো আর কণা গুণে গুণে কাজ করা যায় না, সেখানে আমাদের ভর (weight) মাপতে হয়। তাহলে ১ মোলের ওজন কত গ্রাম হবে? | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | নিয়মটি খুব সহজ: **কোনো মৌল বা যৌগের পারমাণবিক ভর (Atomic mass) বা আণবিক ভরকে (Molecular mass) গ্রামে প্রকাশ করলেই ১ মোল পাওয়া যায়।** একে **মোলার ভর (Molar Mass)** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Molar mass calculation example: Carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass concept using atomic carbon, showing that 12 grams corresponds to 1 mole of carbon atoms.

Accuracy: **accurate**. Carbon's atomic mass is 12, so 12 g of carbon equals 1 mole containing 6.022 x 10^23 atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | **উদাহরণ দিয়ে বুঝি:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | 1. **কার্বন ($C$):** কার্বনের পারমাণবিক ভর হলো ১২।  | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 |    * সুতরাং, **১২ গ্রাম কার্বন = ১ মোল কার্বন** (যার মধ্যে $6.022 \times 10^{23}$ টি কার্বন পরমাণু আছে)। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Molar mass calculation example: Water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation of the molecular mass of water from hydrogen and oxygen and connects 18 grams to 1 mole of water molecules.

Accuracy: **accurate**. The molecular mass calculation (1x2 + 16 = 18) and the deduction that 18 g H2O corresponds to 1 mole containing 6.022 x 10^23 molecules are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | 2. **জল ($H_2O$):**  | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 |    * হাইড্রোজেনের ভর = ১, অক্সিজেনের ভর = ১৬। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 |    * জলের আণবিক ভর = $(1 \times 2) + 16 = 18$। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p28 |    * সুতরাং, **১৮ গ্রাম জল = ১ মোল জল** (যার মধ্যে $6.022 \times 10^{23}$ টি জলের অণু আছে)। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the molar volume relationship for gases at STP (22.4 L per mole) and illustrates it using oxygen gas.

Accuracy: **accurate**. Standard high school introductory chemistry standard temperature and pressure (0 °C, 1 atm) correctly attributes 22.4 L to 1 mole of gas, and oxygen (O2) molar mass is accurately 32 g.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### ৪. গ্যাসের ক্ষেত্রে মোলের আয়তন (Molar Volume) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | যদি কোনো পদার্থ গ্যাসীয় অবস্থায় থাকে, তবে প্রমাণ তাপমাত্রা ও চাপে (STP - Standard Temperature and Pressure): | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p32 | &gt; **যেকোনো গ্যাসের ১ মোলের আয়তন হবে ২২.৪ লিটার (22.4 L)।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | তার মানে, STP-তে ২২.৪ লিটার অক্সিজেন ($O_2$) গ্যাস মানেই হলো সেখানে ১ মোল বা $6.022 \times 10^{23}$ টি অক্সিজেন অণু আছে এবং তার ভর ৩২ গ্রাম। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Core mathematical formulas for calculating moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents three primary formulas for finding the number of moles from mass, number of particles, and gas volume at STP.

Accuracy: **accurate**. All three formulas (n = w/M, n = N/NA, n = V/22.4) correctly represent the standard mathematical definitions for finding the number of moles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | ### ৫. অংক করার জন্য জাদুকরী সূত্র (Formulas): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | মোল সংখ্যাকে আমরা ছোট হাতের **$n$** দিয়ে প্রকাশ করি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p37 | 1. ভর দেওয়া থাকলে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p38 |    $$n = \frac{w}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p39 |    *(এখানে, $w$ = দেওয়া ভর গ্রামে, $M$ = মোলার ভর)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p40 | 2. কণার সংখ্যা দেওয়া থাকলে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 |    $$n = \frac{N}{N_A}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p42 |    *(এখানে, $N$ = মোট কণার সংখ্যা, $N_A = 6.022 \times 10^{23}$)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p43 | 3. STP-তে গ্যাসের আয়তন দেওয়া থাকলে: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p44 |    $$n = \frac{V}{22.4}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p45 |    *(এখানে, $V$ = লিটারে দেওয়া আয়তন)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Worked practice problem calculating moles in 36 grams of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a practice problem with a fully worked solution calculating the number of moles in 36 grams of water using n = w/M.

Accuracy: **accurate**. The givens (w = 36 g, M = 18 g/mol) and calculation (n = 36/18 = 2 moles, corresponding to 2 x 6.022 x 10^23 molecules) are entirely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### একটি ছোট্ট টেস্ট (Practice Problem): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | **প্রশ্ন:** ৩৬ গ্রাম জলে ($H_2O$) কত মোল জল আছে? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p49 | **সমাধান:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | * আমরা জানি, জলের মোলার ভর ($M$) = ১৮ গ্রাম/মোল। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p51 | * দেওয়া ভর ($w$) = ৩৬ গ্রাম। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p52 | * সূত্র: $n = \frac{w}{M} = \frac{৩৬}{১৮} = \mathbf{২\text{ মোল}}$। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p53 | *(তার মানে ৩৬ গ্রাম জলে $2 \times 6.022 \times 10^{23}$ টি জলের অণু আছে!)* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p54 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Summary of the mole concept as a central connector (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise single-line recap characterizing the mole as a conceptual bridge between mass, particle count, and gas volume, followed by a closing remark.

Accuracy: **accurate**. Accurately synthesizes the core role of the mole concept in stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p55 | **এক লাইনে সারসংক্ষেপ:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | মোল হলো রসায়নের এমন একটি সেতু, যা ভর (গ্রাম), কণার সংখ্যা (অ্যাভোগাড্রো সংখ্যা) এবং গ্যাসের আয়তন (২২.৪ লিটার)-কে একে অপরের সাথে যুক্ত করে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p57 | বিষয়টি কি পরিষ্কার হয়েছে, নাকি কোনো জায়গায় বুঝতে অসুবিধা আছে? দ্বিধা না করে বলো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

