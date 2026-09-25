# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains vapour phase refining, including its fundamental principles, general steps, specific industrial methods (Mond process and Van Arkel process), importance, and summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 62,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 62,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and overview of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces vapour phase refining with its basic definition and a simplified flow representation.

Accuracy: **accurate**. The definition correctly describes converting impure metal to a volatile compound and subsequently decomposing it to yield pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ### বাষ্পীয় দশা বিশোধন কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **বাষ্পীয় দশা বিশোধন** (Vapour Phase Refining) হলো ধাতু বা কোনো পদার্থকে বিশুদ্ধ করার একটি পদ্ধতি। এ পদ্ধতিতে অশুদ্ধ ধাতুকে আগে এমন একটি **উদ্বায়ী যৌগে** পরিণত করা হয়, যা সহজে বাষ্পে রূপান্তরিত হতে পারে। পরে সেই বাষ্পকে গরম করে ভেঙে আবার বিশুদ্ধ ধাতু পাওয়া যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | সহজভাবে বললে— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | &gt; অশুদ্ধ ধাতু → বাষ্পে যাওয়া যৌগ তৈরি → বাষ্পকে ভেঙে বিশুদ্ধ ধাতু সংগ্রহ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Basic principles and conditions of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the essential conditions required for vapour phase refining to be effective.

Accuracy: **accurate**. The two primary criteria (formation of a volatile compound and its easy thermal decomposition) and the fate of impurities are accurately described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## মূল নীতি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | এই পদ্ধতি সফল হতে হলে দুটি শর্ত দরকার: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | 1. অশুদ্ধ ধাতু একটি বিকারকের সঙ্গে বিক্রিয়া করে **উদ্বায়ী যৌগ** তৈরি করবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | 2. সেই উদ্বায়ী যৌগকে গরম করলে তা ভেঙে **বিশুদ্ধ ধাতু** আবার পাওয়া যাবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | অপদ্রব্যগুলো সাধারণত বাষ্পীয় যৌগ তৈরি করতে পারে না। তাই তারা পিছনে থেকে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Step-by-step general procedure of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the reusable operational stages of the refining technique from volatile compound formation to thermal deposition.

Accuracy: **accurate**. The procedural breakdown accurately describes the sequential stages involved in vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## ধাপে ধাপে প্রক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | ধরা যাক, একটি ধাতুর মধ্যে অনেক অপদ্রব্য আছে। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | ### ধাপ ১: উদ্বায়ী যৌগ তৈরি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | অশুদ্ধ ধাতুর সঙ্গে কোনো উপযুক্ত গ্যাস বা পদার্থ বিক্রিয়া করানো হয়। এতে ধাতুর একটি বাষ্পীয় যৌগ তৈরি হয়। | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p16 | ### ধাপ ২: বাষ্প আলাদা করা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | তৈরি হওয়া যৌগটি বাষ্প আকারে অন্য স্থানে চলে যায়। অপদ্রব্যগুলো সাধারণত কঠিন অবস্থায় থেকে যায়। | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p18 | ### ধাপ ৩: যৌগ ভাঙা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | বাষ্পীয় যৌগকে খুব গরম কোনো পৃষ্ঠের ওপর দিয়ে প্রবাহিত করা হয়। তাপে যৌগটি ভেঙে যায় এবং বিশুদ্ধ ধাতু জমা পড়ে। | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete worked industrial example of nickel purification via nickel tetracarbonyl.

Accuracy: **accurate**. The chemical reactions, temperatures (50–60°C for formation and ~180°C for decomposition), and intermediate (Ni(CO)4) are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | # উদাহরণ ১: নিকেলের মন্ড প্রক্রিয়া (Mond Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | এই পদ্ধতিতে **নিকেল (Ni)** বিশুদ্ধ করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | ### প্রথম বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | অশুদ্ধ নিকেলের সঙ্গে কার্বন মনোক্সাইড গ্যাস \((CO)\) প্রায় 50–60°C তাপমাত্রায় বিক্রিয়া করানো হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p26 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p28 | এখানে তৈরি হয় **নিকেল টেট্রাকার্বোনিল**, \(\text{Ni(CO)}_4\)। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | এটি একটি উদ্বায়ী যৌগ, অর্থাৎ সহজে বাষ্পে পরিণত হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | ### দ্বিতীয় বিক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | এরপর এই বাষ্পকে প্রায় 180°C তাপমাত্রায় গরম করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p33 | \text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p35 | ফলে বিশুদ্ধ নিকেল জমা পড়ে এবং কার্বন মনোক্সাইড গ্যাস আবার পাওয়া যায়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Van Arkel process for titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked real-world industrial example of the Van Arkel process applied to titanium.

Accuracy: **accurate**. The reactions, reactant (I2), volatile intermediate (TiI4), and decomposition on a tungsten filament are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | # উদাহরণ ২: ভ্যান আর্কেল প্রক্রিয়া (Van Arkel Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | এই পদ্ধতিতে **টাইটানিয়াম (Ti)** ও **জিরকোনিয়াম (Zr)**-এর মতো অত্যন্ত বিশুদ্ধ ধাতু তৈরি করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | টাইটানিয়ামকে আয়োডিনের সঙ্গে বিক্রিয়া করিয়ে উদ্বায়ী টাইটানিয়াম টেট্রাআয়োডাইড তৈরি করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p41 | \text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p43 | তারপর \(\text{TiI}_4\)-এর বাষ্পকে গরম টাংস্টেন তারের ওপর প্রবাহিত করা হয়। তাপে এটি ভেঙে যায়— | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p44 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p45 | \text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p47 | বিশুদ্ধ টাইটানিয়াম টাংস্টেন তারের ওপর জমা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Significance and advantages of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the practical advantages and high-tech applications of metals refined via this method.

Accuracy: **accurate**. Accurately identifies the utility in producing ultra-pure metals for specialized applications (aerospace, electronics, research).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | ## কেন এই পদ্ধতি গুরুত্বপূর্ণ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | - খুব উচ্চ বিশুদ্ধতার ধাতু পাওয়া যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p51 | - ইলেকট্রনিক যন্ত্র, বিমান, মহাকাশযান ও বিশেষ গবেষণাগারে ব্যবহৃত ধাতু বিশুদ্ধ করতে এটি কাজে লাগে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p52 | - অপদ্রব্য সহজে আলাদা করা যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p53 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Mnemonic rule for remembering vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise pedagogical mnemonic phrase and schema to remember the sequence of stages.

Accuracy: **accurate**. The memory trick accurately summarizes the process progression.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ## মনে রাখার সহজ কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | **“যৌগ বানাও → বাষ্প বানাও → গরম করে ধাতু ফেরত পাও”** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p56 | অর্থাৎ, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p57 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p58 | \text{অশুদ্ধ ধাতু} \rightarrow \text{উদ্বায়ী যৌগ} \rightarrow \text{বিশুদ্ধ ধাতু} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;equation&#x27;] |
| p59 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p60 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Recap summary definition (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes the lesson with a concise recap definition suitable for high school revision.

Accuracy: **accurate**. The concluding recap statement provides a precise and clear summary definition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | ### সংক্ষিপ্ত সংজ্ঞা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | **বাষ্পীয় দশা বিশোধন হলো এমন একটি ধাতু বিশোধন পদ্ধতি, যেখানে অশুদ্ধ ধাতুকে উদ্বায়ী যৌগে পরিণত করে পরে তাপ প্রয়োগে সেই যৌগ ভেঙে বিশুদ্ধ ধাতু পাওয়া যায়।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

