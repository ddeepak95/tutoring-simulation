# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly explains stoichiometry for a high school student, covering the fundamental concept of mole ratios via everyday analogies, foundational tools (balanced equations, mole, molar mass), the standard mass-to-mass procedure, and a complete worked example.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 60,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 60,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 2,
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Recipe and sandwich analogy for stoichiometry and mole ratios (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "الحسابات الكيميائية تشبه تماماً وصفات الطبخ في المطبخ!"}, {"passage_id": "p6", "quote": "تخيل أنك تريد صنع شطيرة (ساندويتش)، ووصفة الشطيرة الواحدة تتطلب:"}]}

Annotation rationale: Introduces the topic by comparing chemical stoichiometry to a recipe (making sandwiches) and maps this analogy directly to stoichiometric coefficients in the formation reaction of water.

Accuracy: **accurate**. The analogy correctly explains mole/particle ratios using a kitchen recipe and a sandwich preparation example, mapping directly to a balanced chemical reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أرافقك في هذه الرحلة لفهم **الحسابات الكيميائية (Stoichiometry)**.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | أعلم أن هذا الفصل قد يبدو للوهلة الأولى مليئاً بالقوانين المعقدة، لكن الحقيقة هي: **الحسابات الكيميائية تشبه تماماً وصفات الطبخ في المطبخ!** 👨‍🍳🎂 | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | دعنا نبسط الأمر خطوة بخطوة حتى تصبح محترفاً فيها. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### أولاً: فكرة الدرس في مثال من الحياة اليومية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | تخيل أنك تريد صنع شطيرة (ساندويتش)، ووصفة الشطيرة الواحدة تتطلب: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | **2 شريحة خبز + 1 شريحة جبن = 1 شطيرة** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | * لو طلبت منك صنع **3 شطائر**، كم شريحة خبز تحتاج؟  | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | ستجيب فوراً: **6 شرائح خبز**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | * كيف عرفت ذلك؟ استخدمت &quot;النسبة&quot; الموجودة في الوصفة الأصلية! | ANALOGY | {} | [&#x27;list&#x27;] |
| p11 | **هذا بالضبط ما نفعله في الكيمياء:** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | تفاعل تكوين الماء: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p13 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | ANALOGY | {} | [&#x27;equation&#x27;] |
| p14 | الوصفة الكيميائية تقول: **(2 جزيء من الهيدروجين + 1 جزيء من الأكسجين ينتج 2 جزيء ماء).** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Three essential tools for stoichiometry (balanced equations, moles, and molar mass) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p21", "quote": "المول في الكيمياء مثل \"الدرزن\" في الحياة اليومية (الدرزن = 12، والمول = $6.022 \\times 10^{23}$ من الجسيمات)."}]}

Annotation rationale: Explains the prerequisite concepts needed for stoichiometry: balanced equations representing molar ratios, definition and purpose of the mole, and the relationship between mass, mole, and molar mass.

Accuracy: **accurate**. The concepts of coefficients as mole ratios, Avogadro's number for the mole, and the mass-mole-molar mass formulas are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### ثانياً: الأدوات الثلاث السحرية التي لا غنى عنها | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | لكي تحل أي مسألة كيميائية، تحتاج لثلاث أدوات في جيبك: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | 1. **المعادلة الكيميائية الموزونة (الوصفة):**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 |    هي الأساس، وإذا لم تكن موزونة، فكل حساباتك ستكون خاطئة. أرقام المعاملات (الأرقام الكبيرة على يسار المركبات) تمثل **عدد المولات**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | 2. **المول (The Mole):**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 |    المول في الكيمياء مثل &quot;الدرزن&quot; في الحياة اليومية (الدرزن = 12، والمول = $6.022 \times 10^{23}$ من الجسيمات). نحن نستخدم المول لأن الذرات صغيرة جداً ولا يمكن وزنها بالواحدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | 3. **مثلث التحويل الذهبي (حلقة الوصل بين الكتلة والمول):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 |    * **الكتلة بالجرام (m) = عدد المولات (n) × الكتلة المولية (M)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 |    * **عدد المولات (n) = الكتلة بالجرام (m) ÷ الكتلة المولية (M)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 |    *(الكتلة المولية نجدها بسهولة بجمع الكتل الذرية للعناصر من الجدول الدوري).* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Three-step roadmap for solving mass-to-mass stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable three-step procedural algorithm converting grams of reactant A to moles of A, moles of A to moles of product B via mole ratios, and moles of B to grams of B.

Accuracy: **accurate**. The standard stoichiometry flowchart (mass A -> moles A -> moles B -> mass B) is correctly explained and accurately highlights the critical role of mole ratios as the bridge.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### ثالثاً: &quot;خريطة الكنز&quot; لحل أي مسألة كيميائية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | غالباً تأتيك المسألة كالتالي: يعطيك **جرامات** مادة (A)، ويطلب منك **جرامات** مادة (B). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | **انتبه: لا يمكنك الانتقال مباشرة من جرامات مادة إلى جرامات مادة أخرى!** | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p30 | الوسيط الوحيد بين مادتين هو **&quot;المول&quot;**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | إليك خريطة الطريق المكونة من **3 خطوات**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | $$\text{جرامات المادة (A)} \xrightarrow{\text{الخطوة 1}} \text{مولات المادة (A)} \xrightarrow{\text{الخطوة 2}} \text{مولات المادة (B)} \xrightarrow{\text{الخطوة 3}} \text{جرامات المادة (B)}$$ | PROCEDURE | {} | [&#x27;diagram&#x27;, &#x27;equation&#x27;] |
| p33 | 1. **الخطوة 1:** حوّل جرامات المادة المعطاة (A) إلى **مولات** (اقسم على كتلتها المولية). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p34 | 2. **الخطوة 2 (الجسر):** استخدم **نسبة المولات** من المعادلة الموزونة لمعرفة مولات المادة المطلوبة (B). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p35 | 3. **الخطوة 3:** حوّل مولات المادة (B) إلى **جرامات** (اضرب في كتلتها المولية). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Worked example calculating mass of water from hydrogen combustion (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a complete step-by-step worked numerical problem with given values (4 g H2), balanced reaction, intermediate molar mass and mole calculations, mole ratio conversion, and final answer (36 g H2O).

Accuracy: **accurate**. All calculations, molar masses, mole conversions, stoichiometric ratios, and final units are mathematically and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ### رابعاً: مثال عملي نطبقه سوياً | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | **المسألة:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | احسب كتلة الماء ($H_2O$) الناتجة عن احتراق **4 جرام** من غاز الهيدروجين ($H_2$) تماماً مع كمية كافية من الأكسجين، حسب المعادلة: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | *(علماً بأن الكتل الذرية: $H = 1 \text{ g/mol}$ ، $O = 16 \text{ g/mol}$)* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p43 | **الحل بالخطوات الثلاث:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p44 | * **تجهيز سريع للكتل المولية:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p45 |   * الكتلة المولية لـ $H_2 = 2 \times 1 = 2 \text{ g/mol}$ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p46 |   * الكتلة المولية لـ $H_2O = (2 \times 1) + 16 = 18 \text{ g/mol}$ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p47 | * **الخطوة (1): نحول جرامات $H_2$ إلى مولات:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p48 |   $$\text{عدد مولات } H_2 = \frac{\text{الكتلة}}{\text{الكتلة المولية}} = \frac{4}{2} = 2 \text{ mol}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | * **الخطوة (2): نستخدم المعادلة لمعرفة مولات $H_2O$ (ضرب تبادلي / مقص):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p50 |   * من المعادلة: $2 \text{ mol}$ من $H_2$ ينتج $2 \text{ mol}$ من $H_2O$ (النسبة 1:1). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p51 |   * إذاً: $2 \text{ mol}$ هيدروجين ستنتج **$2 \text{ mol}$ ماء**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p52 | * **الخطوة (3): نحول مولات الماء الناتجة إلى جرامات:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p53 |   $$\text{كتلة } H_2O = \text{عدد المولات} \times \text{الكتلة المولية} = 2 \times 18 = \mathbf{36 \text{ g}}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | **انتهت المسألة بكل بساطة! الناتج هو 36 جرام من الماء.** 🎉 | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Teacher tips and closing encouragement for stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Offers pedagogical tips and test-taking/problem-solving strategies (checking balanced equations, writing units, prioritizing the mole concept) along with closing encouragement.

Accuracy: **accurate**. The strategies and reminders provided are sound advice for solving chemistry stoichiometry problems accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | ### نصائح معلم من ذهب: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | 1. **تأكد دائماً أن المعادلة موزونة** قبل كتابة أي رقم. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p58 | 2. **اكتب الوحدات دائماً** (جرام، مول، جم/مول)؛ هذا يمنعك من ارتكاب أخطاء في التعويض. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p59 | 3. تذكر دائماً: **المول هو لغة التواصل الوحيدة بين المواد الكيميائية المختلفة.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p60 | هل تشعر أن الصورة أصبحت أوضح الآن؟ إذا كنت تحب، اكتب لي مسألة تواجه فيها صعوبة لنحلها معاً خطوة بخطوة! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

