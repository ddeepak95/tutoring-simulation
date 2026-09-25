# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive explanation of the mole concept tailored to a high school student in Arabic, addressing why the mole is necessary, defining Avogadro's number, explaining molar mass, presenting the mass-mole formula, and working through an illustrative calculation.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 50,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 50,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 3,
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Why chemists need the mole unit (counting by weighing) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "تخيل أنني طلبت منك أن تذهب إلى البقالة وتشتري لي **\"500,000 حبة أرز\"**! "}, {"passage_id": "p6", "quote": "ماذا تفعل بدلاً من ذلك؟ تطلب **\"كيلوغراماً\"** من الأرز؛ لأنك تزن كمية كبيرة تحتوي على ملايين الحبات دون أن تعدها."}]}

Annotation rationale: Explains why the mole concept is necessary in chemistry: because atoms are too microscopic to count individually, chemists use bulk measurement units analogous to buying grains of rice by kilogram.

Accuracy: **accurate**. The explanation accurately conveys the macroscopic-to-microscopic rationale behind introducing the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! اعتبرني معلمك الخاص اليوم، وسأشرح لك **&quot;مفهوم المول&quot; (The Mole Concept)** بطريقة تجعلك لا تنساه أبداً، لأنه في الحقيقة فكرة ذكية جداً وبسيطة، لكنها أساس الكيمياء كلها. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p3 | ### 1. المشكلة: لماذا نحتاج &quot;المول&quot; أصلاً؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | تخيل أنني طلبت منك أن تذهب إلى البقالة وتشتري لي **&quot;500,000 حبة أرز&quot;**!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p5 | هل ستجلس في المحل لتعد حبات الأرز حبة حبة؟ مستحيل، صح؟  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | ماذا تفعل بدلاً من ذلك؟ تطلب **&quot;كيلوغراماً&quot;** من الأرز؛ لأنك تزن كمية كبيرة تحتوي على ملايين الحبات دون أن تعدها. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | نفس المشكلة تواجه الكيميائيين: الذرات والجزيئات صغيرة جداً جداً، ومستحيل رؤيتها أو عدّها بالواحدة في المختبر. لذلك، اخترع العلماء وحدة قياس جديدة للتعامل مع هذه الأعداد الضخمة، وسموها: **&quot;المول&quot;**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: The mole as a counting unit and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "أنت تعرف كلمة **\"دزينة\" أو \"دستة\" (Dozen)**، صح؟"}, {"passage_id": "p11", "quote": "* إذا قلت لك: \"دستة بيض\" = كم بيضة؟ ستقول لي فوراً: **12**."}]}

Annotation rationale: Introduces the mole as a fixed counting unit analogous to a dozen, defining 1 mole as 6.022 x 10^23 particles and identifying this quantity as Avogadro's number.

Accuracy: **accurate**. The definition of the mole, the numerical value of Avogadro's number (6.022 x 10^23), and the comparison to a dozen are scientifically accurate and clear.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p9 | ### 2. التشبيه السحري: &quot;دستة الكيميائيين&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | أنت تعرف كلمة **&quot;دزينة&quot; أو &quot;دستة&quot; (Dozen)**، صح؟ | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | * إذا قلت لك: &quot;دستة بيض&quot; = كم بيضة؟ ستقول لي فوراً: **12**. | ANALOGY | {} | [&#x27;list&#x27;] |
| p12 | * &quot;دستة سيارات&quot; = **12**. | ANALOGY | {} | [&#x27;list&#x27;] |
| p13 | * &quot;دستة أقلام&quot; = **12**. | ANALOGY | {} | [&#x27;list&#x27;] |
| p14 | كلمة **&quot;مول&quot;** هي بالضبط مثل كلمة &quot;دستة&quot;، لكنها خاصة بالعلماء، ولأن الذرات صغيرة جداً، فدستة الكيميائيين رقمها كبير جداً جداً! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p15 | **المول الواحد من أي مادة = $6.022 \times 10^{23}$ من الجسيمات (ذرات، أو جزيئات).** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | هذا الرقم العملاق يسمى **&quot;عدد أفوجادرو&quot; (Avogadro&#x27;s Number)** تكريماً للعالم الذي ساهم في اكتشافه. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | *(تخيل الرقم: 6 وأمامها 23 صفراً! رقم فلكي).* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Molar mass and atomic mass variation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p21", "quote": "* هل وزن \"دستة بيض\" يساوي وزن \"دستة بطيخ\"؟"}]}

Annotation rationale: Explains why equal numbers of moles of different substances have different masses (molar mass) using an egg vs. watermelon comparison and elemental examples (H vs. C), and links this to the periodic table.

Accuracy: **accurate**. Correctly defines molar mass with unit g/mol and explains why 1 mole of hydrogen (approx 1 g) has a different mass from 1 mole of carbon (approx 12 g). Mentioning the mass number/atomic weight from the periodic table is an acceptable standard introductory simplification.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### 3. هل أوزان المولات متساوية؟ (الكتلة المولية) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | لنرجع لمثال الدستة: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p21 | * هل وزن &quot;دستة بيض&quot; يساوي وزن &quot;دستة بطيخ&quot;؟ | ANALOGY | {} | [&#x27;list&#x27;] |
| p22 | * كلاهما 12 حبة، لكن البطيخ أثقل بكثير! | ANALOGY | {} | [&#x27;list&#x27;] |
| p23 | نفس الشيء في الكيمياء: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | * **1 مول من الهيدروجين** فيه $6.022 \times 10^{23}$ ذرة، ووزنه = **1 جرام** فقط. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | * **1 مول من الكربون** فيه نفس العدد ($6.022 \times 10^{23}$ ذرة)، لكن وزنه = **12 جرام**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | وزن المول الواحد من أي مادة يسمى **&quot;الكتلة المولية&quot; (Molar Mass)**، ووحدته هي **(g/mol - جرام/مول)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | **من أين نحصل على هذا الرقم؟** من **الجدول الدوري**! هو نفس &quot;العدد الكتلي&quot; المكتوب أسفل كل عنصر. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Formula relating moles, mass, and molar mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the standard formula n = m / M and explicitly defines each variable and its units.

Accuracy: **accurate**. The equation n = m / M and the accompanying variable definitions are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | ### 4. القانون الذهبي لحل المسائل: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | في الامتحانات، هناك مثلث سحري ستستخدمه دائماً للتحويل بين ما تراه بعينك (الجرامات على الميزان) وما يحدث في عالم الذرات (المولات): | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | $$n = \frac{m}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | حيث: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | * **$n$**: عدد المولات (Mole). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | * **$m$**: الكتلة بالجرام (التي تزنها في المختبر). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | * **$M$**: الكتلة المولية (من الجدول الدوري، g/mol). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Worked example: calculating moles of water in 36 g (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a step-by-step calculation to find the number of moles in 36 g of water (H2O), first calculating molar mass (18 g/mol) and then applying the formula to obtain 2 moles.

Accuracy: **accurate**. All calculations and values for calculating the moles of water in 36 g are correct (M = 18 g/mol, n = 2 mol).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p37 | ### 5. مثال عملي سريع لنقفل به الفكرة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | **سؤال:** كم عدد مولات الماء ($H_2O$) الموجودة في **36 جرام** من الماء؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | 1. **نحسب الكتلة المولية للماء ($M$) من الجدول الدوري:** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p40 |    * الهيدروجين ($H$) = 1، والأكسجين ($O$) = 16. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p41 |    * جزيء الماء فيه ذرتين $H$ وذرة $O$: | EXAMPLE | {} | [&#x27;list&#x27;] |
| p42 |    * $M = (2 \times 1) + 16 = 18 \text{ g/mol}$. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p43 | 2. **نطبق القانون الذهبي:** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 |    * عدد المولات ($n$) = الكتلة ($m$) ÷ الكتلة المولية ($M$) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 |    * $n = \frac{36}{18} = 2 \text{ mol}$. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p46 | **النتيجة:** في 36 جرام ماء، يوجد **2 مول** من جزيئات الماء (أي ضعف عدد أفوجادرو)! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Summary recap of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a one-sentence summary capturing the core concept of the mole as a bridge between the microscopic atomic world and macroscopic laboratory measurements.

Accuracy: **accurate**. The recap accurately synthesizes the mole's function as a conceptual bridge between microscopic particle count and macroscopic mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p48 | ### الخلاصة (في جملة واحدة): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | **المول هو مجرد &quot;جسر&quot; يربط بين العالم المجهري الصغير جداً الذي لا نراه (الذرات)، والعالم الحقيقي الذي نقيسه على الميزان في المختبر (الجرامات).** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p50 | هل النقطة واضحة الآن، أم تحب أن نأخذ مسألة أخرى لنتدرب عليها معاً؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

