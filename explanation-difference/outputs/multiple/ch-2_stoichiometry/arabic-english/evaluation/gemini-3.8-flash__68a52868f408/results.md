# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses stoichiometry in Arabic, explaining the core concept through an everyday recipe analogy, defining it quantitatively with chemical equations, introducing the mole bridge, outlining the standard mass calculation procedure, working through a mole-to-mole calculation, and summarizing the concept through the law of conservation of mass.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 54,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 54,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Kitchen sandwich recipe analogy for stoichiometry (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "تخيل أنك تريد عمل ساندويتش جبن، ووصفة الساندويتش الواحد هي:"}]}

Annotation rationale: Introduces stoichiometry via an analogy to preparing sandwiches from bread and cheese slices to build intuitive understanding of reactant-product quantitative proportions.

Accuracy: **accurate**. The sandwich analogy accurately mirrors stoichiometry: proportional reactant consumption yielding a predictable product amount.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا المفهوم.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | كثير من الطلاب يخافون من كلمة **&quot;استوكيومتري&quot; (Stoichiometry)** أو ما نسميه بالعربية **&quot;الحسابات الكيميائية&quot;**، لأن الاسم يبدو معقداً وغريباً، لكن في الحقيقة، فكرتها أسهل مما تتخيل! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ببساطة شديدة: **الاستوكيومتري هي &quot;كتاب الطبخ&quot; الخاص بالكيميائي.** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | دعنا نأخذ جولة سريعة وممتعة لفهمها خطوة بخطوة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p6 | ### 1. تشبيه المطبخ (سر الفكرة) 🍳 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | تخيل أنك تريد عمل ساندويتش جبن، ووصفة الساندويتش الواحد هي: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | &gt; **2 شريحة خبز + 1 شريحة جبن = 1 ساندويتش** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | * لو سألتك: إذا كان لديك **6 شرائح خبز** وكمية كافية من الجبن، كم ساندويتش يمكنك أن تصنع؟ | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | * ستجيب فوراً: **3 ساندويتشات!** | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | * ولو سألتك: كم شريحة جبن ستحتاج لهذه الساندويتشات الثلاثة؟ | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | * ستجيب: **3 شرائح جبن.** | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | ما فعلته بعقلك الآن هو بالضبط **علم الاستوكيومتري**! أنت حسبت كميات المواد التي تحتاجها لإنتاج كمية معينة من الناتج. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Chemical definition of stoichiometry and balanced equations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry formally as the study of quantitative relations in chemical reactions and explains how balanced chemical equations serve as microscopic recipes.

Accuracy: **accurate**. The definition of stoichiometry and the molecular interpretation of the balanced equation for water formation are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | ### 2. في الكيمياء: ما هي الاستوكيومتري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | هي دراسة **العلاقات الكمية (الأرقام والكتل)** بين المواد المتفاعلة والمواد الناتجة في التفاعل الكيميائي. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | في الكيمياء، &quot;الوصفة&quot; الخاصة بنا هي **المعادلة الكيميائية الموزونة**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | مثال: تكوين الماء: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | هذه المعادلة تخبرنا بـ &quot;الوصفة&quot;: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | كل **2 جزيء** من الهيدروجين يتفاعلون مع **1 جزيء** من الأكسجين لإنتاج **2 جزيء** من الماء. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: The mole concept as a macroscopic counting unit (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p26", "quote": "* فكّر في **المول** مثل كلمة **\"درزن\"** (الدرزن = 12 حبة)."}]}

Annotation rationale: Explains why macroscopic units are needed due to the tiny size of atoms and molecules, defines the mole using Avogadro's number and a dozen comparison, and reinterprets chemical equations in moles.

Accuracy: **accurate**. The explanation of the mole, Avogadro's number, and reading equation coefficients as mole ratios is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p23 | ### 3. المشكلة: الذرات صغيرة جداً! (مفهوم &quot;المول&quot;) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | في المطبخ، نتعامل بالجرام أو الحبة. لكن في الكيمياء، لا نستطيع إمساك &quot;جزيئين&quot; من الهيدروجين لأنهما أصغر من أن نراهما! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | لذلك، اخترع الكيميائيون وحدة اسمها **&quot;المول&quot; (Mole)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | * فكّر في **المول** مثل كلمة **&quot;درزن&quot;** (الدرزن = 12 حبة). | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | * **المول** = حزمة تحتوي على عدد كبير جداً وثابت من الذرات ($6.022 \times 10^{23}$). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | فنقرأ المعادلة السابقة بلغة الكيميائيين: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | &gt; **2 مول** من الهيدروجين + **1 مول** من الأكسجين $\rightarrow$ ينتج **2 مول** من الماء. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Three-step roadmap for stoichiometry mass calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable three-step procedure (grams to moles, mole ratio conversion, and moles to grams) for solving standard stoichiometry mass-mass problems.

Accuracy: **accurate**. The three-step strategy and the conversion formulas between mass, molar mass, and moles are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p31 | ### 4. خريطة الطريق لحل أي مسألة استوكيومتري 🗺️ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | في الامتحانات، سيعطيك المعلم عادةً كتلة مادة ما بالجرام، ويطلب منك كتلة مادة أخرى بالجرام.  | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p33 | تذكر دائماً هذه القاعدة الذهبية: **&quot;لا يمكنك الانتقال من مادة إلى أخرى إلا عبر جسر المولات!&quot;** | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p34 | إليك الخطوات الثلاث السحرية: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p35 | 1. **حوّل الجرامات إلى مولات:** (للمادة المعطاة) | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 |    $$\text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية (من الجدول الدوري)}}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p37 | 2. **استخدم النسبة المولية (كوبري المعادلة):** | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p38 |    انظر إلى أرقام المعادلة الموزونة لتعرف كم مول من المادة (ب) ينتج من المادة (أ). | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p39 | 3. **حوّل مولات المادة الجديدة إلى جرامات:** (المادة المطلوبة) | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p40 |    $$\text{الكتلة بالجرام} = \text{عدد المولات} \times \text{الكتلة المولية}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |

## u5: Worked mole-to-mole calculation for water production (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a concrete calculation question with explicit givens, reasoning using stoichiometric mole ratios, and a final quantitative answer.

Accuracy: **accurate**. Applying the 2:2 (1:1) stoichiometric ratio between H2 and H2O correctly yields 4 moles of water from 4 moles of hydrogen.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p42 | ### مثال سريع بالأرقام: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | في التفاعل: $2H_2 + O_2 \rightarrow 2H_2O$ | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p44 | **سؤال:** كم مولاً من الماء ($H_2O$) سينتج إذا تفاعل **4 مول** من الهيدروجين ($H_2$) تماماً مع الأكسجين؟ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p45 | **الحل بالمنطق:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p46 | * المعادلة تقول: كل **2 مول** هيدروجين يعطون **2 مول** ماء (نسبة 1 إلى 1). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p47 | * إذن: **4 مول** هيدروجين ستعطيك بالتأكيد **4 مول** ماء! | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Summary of stoichiometry and connection to conservation of mass (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key lesson takeaways, roots stoichiometry fundamentally in the law of conservation of mass, and offers ongoing study support.

Accuracy: **accurate**. Correctly establishes that stoichiometry is governed by the law of conservation of mass and accurately summarizes the general problem-solving checklist.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p49 | **خلاصة الدرس:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | الاستوكيومتري ليست إلا تطبيقاً لـ **&quot;قانون حفظ الكتلة&quot;**؛ فالذرات لا تختفي ولا تُخلق من العدم، بل يُعاد ترتيبها فقط. كل ما عليك فعله هو: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p51 | 1. التأكد أن معادلتك موزونة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p52 | 2. التحويل للمولات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p53 | 3. استخدام نسب المعادلة لحساب المجهول. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p54 | هل الفكرة واضحة بالنسبة لك الآن؟ وإذا كان لديك مسألة معينة في واجبك المدرسي تشعر أنها صعبة، اكتبها لي ولنحلها معاً خطوة بخطوة! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

