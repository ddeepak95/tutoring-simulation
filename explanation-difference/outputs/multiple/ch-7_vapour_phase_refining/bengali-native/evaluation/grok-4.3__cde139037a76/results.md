# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt asked for an explanation of vapour phase refining (বাষ্পীয় দশা বিশোধন), which in chemistry refers to the metallurgical refining process where a metal is converted into a volatile compound and subsequently decomposed (such as the Mond process for nickel or the Van Arkel process for zirconium/titanium). Instead, the response completely confuses this with steam distillation (বাষ্প পাতন), explicitly labelling it 'steam distillation' and explaining the isolation of essential oils using steam.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 26,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 26,
  "unique_subtopics": 4,
  "contextualization": {
    "everyday": 5,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of steam distillation erroneously identified as vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "গোলাপের তেল, লবঙ্গের তেল, ইউক্যালিপটাসের তেল"}]}

Annotation rationale: Introduces and defines steam distillation, explaining why direct heating causes thermal degradation of organic compounds and how steam allows separation at a lower temperature.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | আচ্ছা, বন্ধু। তোমাকে খুব সহজ ভাষায় বাষ্পীয় দশা বিশোধন (steam distillation) বুঝিয়ে দিচ্ছি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### বাষ্পীয় দশা বিশোধন কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | এটি এক ধরনের **পাতন** পদ্ধতি। সাধারণ পাতনে আমরা যে পদার্থকে আলাদা করতে চাই, সেটাকে সরাসরি গরম করে ফুটিয়ে বাষ্পে পরিণত করি। কিন্তু অনেক জৈব পদার্থ (যেমন গোলাপের তেল, লবঙ্গের তেল, ইউক্যালিপটাসের তেল) এত উচ্চ তাপমাত্রায় ফোটে যে সরাসরি গরম করলে সেগুলো পুড়ে বা পচে যায়।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | এই সমস্যা সমাধানের জন্য আমরা **জলীয় বাষ্প** ব্যবহার করি। বাষ্পের সাহায্যে পদার্থটিকে তার আসল স্ফুটনাঙ্কের চেয়ে অনেক কম তাপমাত্রায় বাষ্পে পরিণত করে আলাদা করা হয়। এজন্যই একে **বাষ্পীয় দশা বিশোধন** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Operating principle of steam distillation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "জল ও তেল"}]}

Annotation rationale: Explains how the combination of partial vapour pressures of immiscible liquids reaches atmospheric pressure below 100°C.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### এটা কীভাবে কাজ করে? (সহজ নীতি) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | মনে করো, তোমার কাছে দুটি তরল আছে যারা একে অপরের সাথে মিশে না (যেমন: জল ও তেল)। এদের বাষ্পচাপ যখন বায়ুমণ্ডলীয় চাপের সমান হয়, তখন মিশ্রণটি ফুটতে শুরু করে।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | - জলের স্ফুটনাঙ্ক ১০০° সেলসিয়াস। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | - অনেক জৈব তেলের স্ফুটনাঙ্ক ২০০°–২৫০° সেলসিয়াস বা তার বেশি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | কিন্তু যখন আমরা জলীয় বাষ্প পাঠাই, তখন জলের বাষ্পচাপ + তেলের বাষ্পচাপ = বায়ুমণ্ডলীয় চাপ হয় অনেক কম তাপমাত্রায় (সাধারণত ৯৫°–১০০° সেলসিয়াসের মধ্যে)। ফলে তেলটি পচে যাওয়ার আগেই বাষ্পের সাথে উড়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Laboratory procedure for steam distillation (PROCEDURE)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p11", "quote": "উদ্ভিদের পাতা, ফুল বা বাকল"}]}

Annotation rationale: Provides a sequential five-step experimental procedure for conducting steam distillation in the laboratory.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### পদ্ধতিটি কীভাবে করা হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | ১. একটা বড় ফ্লাস্কে উদ্ভিদের পাতা, ফুল বা বাকল (যেখান থেকে তেল বের করতে চাই) রাখা হয়। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p12 | ২. আলাদা একটা জলের পাত্র গরম করে প্রচুর বাষ্প তৈরি করা হয়। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p13 | ৩. এই বাষ্পকে ফ্লাস্কের মধ্যে ঢোকানো হয়। বাষ্প উদ্ভিদের ভেতর দিয়ে যাওয়ার সময় তেলের কণাগুলোকে সাথে করে নিয়ে যায়। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p14 | ৪. বাষ্প + তেলের মিশ্রণ একটা **কনডেন্সার** (ঠান্ডা করার নল)-এর মধ্যে দিয়ে যায়। ঠান্ডা হওয়ার ফলে এটি আবার তরলে পরিণত হয়। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p15 | ৫. যেহেতু তেল আর জল একসাথে মিশে না, তাই **আলাদা করার ফানেল** (separating funnel)-এ ঢেলে দুটো স্তর আলাদা করে নেওয়া হয়। | PROCEDURE | {} | [&#x27;list&#x27;] |

## u4: Application: Extracting essential oils from flowers and peels (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p17", "quote": "গোলাপ, জুঁই, লেবুর খোসা থেকে **সুগন্ধী তেল** (essential oil) বের করা।"}]}

Annotation rationale: Illustrates the process with the real-world extraction of essential oils from rose, jasmine, and lemon peel.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### কোথায় ব্যবহার হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | - গোলাপ, জুঁই, লেবুর খোসা থেকে **সুগন্ধী তেল** (essential oil) বের করা। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Application: Separating eugenol from cloves (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p18", "quote": "লবঙ্গ থেকে ইউজেনল আলাদা করা।"}]}

Annotation rationale: Illustrates the isolation of eugenol from cloves using steam distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | - লবঙ্গ থেকে ইউজেনল আলাদা করা। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Application: Refining organic compounds from coal (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Mentions industrial application to separate organic compounds from coal.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | - কয়লা থেকে কিছু জৈব যৌগ বিশোধন করা। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Application: Pharmaceutical and fragrance industries (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Mentions general industrial applications in medicine and perfumery.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | - কিছু ওষুধ ও সুগন্ধি শিল্পে। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Advantages of steam distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists key advantages of steam distillation such as preserving temperature-sensitive compounds, separating water-insoluble substances, and affordability.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### কেন এই পদ্ধতি ভালো? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | - তাপমাত্রা কম থাকায় পদার্থ পচে যায় না। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | - পানিতে অদ্রবণীয় পদার্থকেও আলাদা করা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | - তুলনামূলক সস্তা ও সহজ। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u9: Summary recap and conversational close (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key concept with an analogy and provides a closing prompt offering further explanation.

Accuracy: **not_assessed_due_to_topic_mismatch**. Not assessed because the overall response is off-topic (explaining steam distillation rather than vapour phase refining).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | **সারকথা**: বাষ্পীয় দশা বিশোধন আসলে “বাষ্পের সাহায্যে কম তাপে পাতন” করার একটা চালাক উপায়। যেসব পদার্থ সরাসরি গরম করলে নষ্ট হয়ে যায়, তাদেরকে বাষ্পের “ঘোড়ায় চড়িয়ে” নিচু তাপমাত্রায় বের করে আনা হয়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p26 | বুঝতে পেরেছ? কোনো অংশ আবার বিস্তারিত বলব? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

