# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the mole concept clearly and accurately for a secondary school student, covering its nature as a counting unit, Avogadro's number, molar mass, and mole calculations.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 34,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 5,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: The dozen as a familiar everyday counting unit (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "إذا ذهبت إلى البقالة وطلبت \"درزن بيض\"، كم بيضة سيعطيك البائع؟"}, {"passage_id": "p7", "quote": "ولو طلبت \"درزن أقلام\"؟ سيعطيك **12 قلماً**."}]}

Annotation rationale: Uses the familiar daily-life concept of a dozen (12 items like eggs or pens) as an analogy to explain that a mole is simply a defined counting unit.

Accuracy: **accurate**. The comparison of a counting unit to a dozen is standard, intuitive, and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا المفهوم.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | دعنا نتفق أولاً: **&quot;المول&quot; ليس كائناً فضائياً ولا معادلة معقدة، المول في الحقيقة مجرد &quot;وحدة عَدّ&quot;، تماماً مثل &quot;الدرزن&quot;!** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | لكي تفهمه ببساطة، سأحكي لك قصة قصيرة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | ### 1. فكرة &quot;الدرزن&quot; في حياتنا اليومية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | إذا ذهبت إلى البقالة وطلبت &quot;درزن بيض&quot;، كم بيضة سيعطيك البائع؟  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | بالتأكيد **12 بيضة**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | ولو طلبت &quot;درزن أقلام&quot;؟ سيعطيك **12 قلماً**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | إذن كلمة &quot;درزن&quot; هي اسم يعبر عن رقم محدد وهو (12)، نستخدمه لتسهيل التعامل مع الأشياء بدلاً من عدّها بالواحدة. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Need for a large counting package due to microscopic atomic scale (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemists need an enormous counting unit: individual atoms cannot be seen or weighed in laboratory amounts.

Accuracy: **accurate**. Accurately describes the submicroscopic nature of atoms and molecules and why macroscale batches are required.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### 2. المشكلة في الكيمياء: الذرات متناهية الصغر! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | في معمل الكيمياء، نحن نتعامل مع ذرات وجزيئات. الذرة صغيرة جداً لدرجة لا يمكن تخيلها؛ لو أردت أن تصنع تفاعلاً كيميائياً، لا يمكنك أن تقول: &quot;سآخذ 12 ذرة كربون&quot;، لأن هذا العدد مجهري ولا يُرى حتى بأقوى المجاهر، ولا يمكن وزنه على أي ميزان! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | نحن بحاجة إلى &quot;حزمة&quot; ضخمة جداً من الذرات لكي نستطيع رؤيتها ووزنها والتعامل معها في المختبر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the definition of one mole as containing 6.022 x 10^23 entities, designated as Avogadro's number.

Accuracy: **accurate**. Correctly states Avogadro's number as 6.022 x 10^23 and associates it with the mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 3. الحل: &quot;المول&quot; (درزن الكيميائيين) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | هنا اخترع العلماء كلمة **&quot;المول&quot; (Mole)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | المول هو ببساطة &quot;درزن الكيميائيين&quot;، ولكنه درزن عملاق جداً! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | **1 مول من أي شيء = $6.022 \times 10^{23}$ من هذا الشيء.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p16 | (هذا الرقم يسمى **عدد أفوجادرو**، تكريماً للعالم الذي ساهم في الوصول إليه). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: One mole of iron atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete chemistry example specifying the number of iron atoms in one mole.

Accuracy: **accurate**. 1 mole of iron atoms contains 6.022 x 10^23 atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | * 1 مول من ذرات الحديد = $6.022 \times 10^{23}$ ذرة حديد. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;, &#x27;equation&#x27;] |

## u5: One mole of water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete chemistry example specifying the number of water molecules in one mole.

Accuracy: **accurate**. 1 mole of water molecules contains 6.022 x 10^23 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | * 1 مول من جزيئات الماء = $6.022 \times 10^{23}$ جزيء ماء. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;, &#x27;equation&#x27;] |

## u6: Rice grains illustration of Avogadro's scale (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p19", "quote": "(لو كان لديك 1 مول من حبات الأرز، لغطت كوكب الأرض بالكامل بطبقة ارتفاعها عدة أمتار! لهذا نستخدمه فقط مع الأشياء المجهرية كالجزيئات والذرات)."}]}

Annotation rationale: Uses a hypothetical macroscopic comparison of grains of rice covering the Earth to illustrate the vastness of Avogadro's number.

Accuracy: **accurate**. A standard pedagogical illustration of the scale of Avogadro's number using grains of rice.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | * (لو كان لديك 1 مول من حبات الأرز، لغطت كوكب الأرض بالكامل بطبقة ارتفاعها عدة أمتار! لهذا نستخدمه فقط مع الأشياء المجهرية كالجزيئات والذرات). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Rationale for Avogadro's number and connection to mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why Avogadro's number was chosen specifically to bridge atomic mass units to grams on a laboratory scale.

Accuracy: **accurate**. The explanation correctly motivates Avogadro's constant as the numerical link between amu and grams.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### 4. سحر المول: كيف يربط بين المجهر والميزان؟ (الكتلة المولية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | قد تسألني الآن: *&quot;يا أستاذ، لماذا اختار العلماء هذا الرقم الغريب تحديداً ($6.022 \times 10^{23}$)؟ لماذا لم يختاروا رقماً سهلاً كالمليار مثلاً؟&quot;* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p22 | سؤال ذكي جداً! والجواب هو: **لأن هذا الرقم يجعل الحياة سهلة على الميزان!** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u8: Carbon-12 molar mass correspondence (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the bridge between atomic mass and molar mass using carbon (12 amu to 12 g).

Accuracy: **accurate**. Accurately illustrates that 1 atom of carbon has a mass of ~12 amu while 1 mole has a mass of 12 grams.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | * انظر إلى الجدول الدوري، ستجد أن كتلة ذرة الكربون هي تقريباً (12) وحدة كتل ذرية (وهي كتلة صغيرة جداً لا نقدر على وزنها). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | * ولكن، إذا جمعت **(1 مول)** من ذرات الكربون، ستتفاجأ أن وزنها على الميزان في المختبر يساوي **12 غراماً بالضبط!** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Oxygen molar mass correspondence (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the atomic mass to gram relationship using oxygen (16 amu to 16 g).

Accuracy: **accurate**. Accurately states that an oxygen atom mass of 16 amu corresponds to 16 grams per mole of oxygen atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | * ذرة الأكسجين كتلتها 16؟ إذن (1 مول) من الأكسجين يزن **16 غراماً**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u10: Definition of molar mass as the bridge (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole and summarizes its role as the bridge between periodic table values and laboratory masses.

Accuracy: **accurate**. Correctly defines molar mass as the mass of 1 mole of a substance.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | **المول هو &quot;الجسر السحري&quot; الذي حوّل الأرقام المكتوبة في الجدول الدوري من مجرد أوزان ذرية خيالية، إلى غرامات حقيقية نزنها في المختبر.** وزن 1 مول يسمى **الكتلة المولية (Molar Mass)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u11: Quick summary recap of key mole concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recapitulates the main takeaways: what the mole is, its value, and its utility.

Accuracy: **accurate**. Accurately summarizes the core points of the lesson.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | ### ملخص سريع لتتذكره دائماً: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | 1. **المول** = مجرد رقم للعدّ (مثل الدرزن ولكن للذرات). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | 2. **قيمته** = $6.022 \times 10^{23}$ (عدد أفوجادرو). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;, &#x27;equation&#x27;] |
| p31 | 3. **فائدته** = ينقلنا من عالم الذرات المجهري الذي لا نراه، إلى عالم الغرامات التي نستطيع وزنها في المختبر. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u12: Basic formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the core mathematical formula connecting moles, mass in grams, and molar mass.

Accuracy: **accurate**. The formula n = mass / molar mass is standard, correct, and fundamental to chemistry calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | **القانون الأساسي الذي ستستخدمه في المسائل دائماً:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | $$\text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية (من الجدول الدوري)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p34 | هل الفكرة واضحة الآن، أم تحب أن نأخذ مثالاً حسابياً بسيطاً نطبقه معاً؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

