# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly addresses covalent radius, explaining why atomic radius cannot be measured directly for isolated atoms, defining covalent radius both qualitatively and mathematically, demonstrating it with a diatomic chlorine example, explaining periodic trends across groups and periods, and providing an intuitive analogy.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "ANALOGY": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 4,
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Difficulty of measuring isolated atomic radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "لو كانت الذرة كرة زجاجية صلبة، لكان قياس نصف قطرها بالمسطرة سهلاً جداً! لكن الذرة في الحقيقة عبارة عن نواة موجبة تدور حولها \"سحابة\" من الإلكترونات ليس لها حدود واضحة وثابتة (مثل سحابة الضباب)."}]}

Annotation rationale: Explains why measuring the size of an individual isolated atom is impossible due to the undefined outer boundary of the electron cloud.

Accuracy: **accurate**. The explanation accurately notes that quantum mechanical electron probability distributions lack sharp physical edges, preventing direct measurement of isolated atomic radii.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل الكيمياء! يسعدني جداً أن أشرح لك هذا المفهوم بطريقة سهلة وممتعة.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | لكي نفهم **نصف القطر التساهمي (Covalent Radius)**، دعنا نبدأ بلغز صغير: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### المشكلة: كيف نقيس حجم الذرة؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | لو كانت الذرة كرة زجاجية صلبة، لكان قياس نصف قطرها بالمسطرة سهلاً جداً! لكن الذرة في الحقيقة عبارة عن نواة موجبة تدور حولها &quot;سحابة&quot; من الإلكترونات ليس لها حدود واضحة وثابتة (مثل سحابة الضباب). لذلك، من المستحيل قياس نصف قطر ذرة وحيدة بدقة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "وكأنهما تتصافحان"}]}

Annotation rationale: Introduces the concept of covalent radius as half the internuclear distance between two identical covalently bonded atoms, including the formal definition and equation r = d/2.

Accuracy: **accurate**. The qualitative definition and standard mathematical relationship r = d/2 for homonuclear single covalent bonds are correct according to standard chemical definitions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p6 | ### الحل: فكرة &quot;المصافحة&quot; (نصف القطر التساهمي) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | بما أننا لا نستطيع قياس ذرة بمفردها، قرر العلماء قياسها عندما ترتبط بذرة أخرى تشبهها تماماً برابطة تساهمية (أي عندما تتشاركان الإلكترونات وتندمجان قليلاً وكأنهما تتصافحان). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p8 | **التعريف العلمي البسيط:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | &gt; **نصف القطر التساهمي:** هو **نصف المسافة** بين نواتي ذرتين متماثلتين مرتبطتين برابطة تساهمية أحادية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | القانون:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | $$r = \frac{d}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p17 | *(حيث $r$ هو نصف القطر التساهمي، و $d$ هي المسافة بين النواتين).* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Illustrating covalent radius using diatomic chlorine (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a step-by-step hypothetical measurement and halving process using a Cl2 molecule to illustrate the application of the covalent radius definition.

Accuracy: **accurate**. The procedural steps correctly describe how the homonuclear single bond distance in Cl2 is measured and halved to obtain the covalent radius of chlorine.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | **تخيلها معي:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | 1. تخيل ذرتين من الكلور ($Cl_2$) ارتبطتا معاً. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | 2. نقيس المسافة من مركز النواة الأولى إلى مركز النواة الثانية بأجهزة خاصة (ولنقل إنها مسافة كاملة تُسمى $d$). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | 3. نقسم هذه المسافة على **2**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | 4. الناتج هو: **نصف القطر التساهمي** لذرة الكلور! | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Periodic trend of covalent radius down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p23", "quote": "تخيل أنك ترتدي طبقة إضافية من الملابس الشتوية في كل خطوة"}]}

Annotation rationale: Explains the increase in covalent radius descending a group due to the addition of principal energy levels.

Accuracy: **accurate**. Correctly states that atomic/covalent radius increases down a periodic group due to the addition of principal electronic energy levels (shells).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### كيف يتغير نصف القطر التساهمي في الجدول الدوري؟ (مهم جداً للاختبارات!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | هناك قاعدتان ذهبيتان يجب أن تتذكرهما دائماً: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | #### 1. عند النزول في المجموعة (من الأعلى إلى الأسفل) ⬇️: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | * **ماذا يحدث؟** **يزداد** نصف القطر التساهمي (تكبر الذرة). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | * **السبب:** لأننا كلما نزلنا لأسفل، نضيف **مستويات طاقة رئيسية جديدة** للإلكترونات، فتبتعد الإلكترونات الخارجية عن النواة وتكبر الذرة (تخيل أنك ترتدي طبقة إضافية من الملابس الشتوية في كل خطوة). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Periodic trend of covalent radius across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the decrease in covalent radius moving left to right across a period due to increased effective nuclear charge.

Accuracy: **accurate**. Accurately identifies that covalent radius decreases across a period from left to right because the increasing nuclear charge draws valence electrons inward without adding new principal shells.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | #### 2. عند التحرك في الدورة (من اليسار إلى اليمين) ➡️: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | * **ماذا يحدث؟** **يقل** نصف القطر التساهمي (تصغر الذرة). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | * **السبب (سؤال علل مشهور):** لأننا نضيف بروتونات موجبة داخل النواة، مما يزيد من &quot;قوة جذب النواة&quot; للإلكترونات الخارجية (شحنة النواة الفعالة تزداد)، فتشد النواة الإلكترونات نحوها بقوة أكبر، وتنكمش الذرة قليلاً! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Two compressed sponge balls analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p29", "quote": "تخيل كرتين من الإسفنج ضغطتهما على بعضهما حتى تداخلا قليلاً"}]}

Annotation rationale: Draws an explanatory comparison between overlapping sponge balls and the bonded atoms in a covalent bond to clarify why the radius is measured from centers of overlapping spheres.

Accuracy: **accurate**. The analogy accurately models the overlap of electron clouds during covalent bond formation and the geometric definition of taking half the internuclear distance.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | ### تشبيه سريع لتتذكره دائماً: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | تخيل كرتين من الإسفنج ضغطتهما على بعضهما حتى تداخلا قليلاً. المسافة من مركز الكرة الأولى إلى مركز الثانية مقسومة على اثنين هي بالضبط فكرة نصف القطر التساهمي! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p30 | هل الفكرة واضحة بالنسبة لك الآن، أم تحب أن نطبق عليها بمثال بأرقام؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

