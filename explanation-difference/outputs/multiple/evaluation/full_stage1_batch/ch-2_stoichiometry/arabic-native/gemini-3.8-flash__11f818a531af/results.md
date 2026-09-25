# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, formulas, solving procedure, and a worked example",
  "topic_match": "on_topic",
  "reason": "The explanation covers the core concepts of stoichiometry, including mole ratios from balanced equations, mole-mass conversions, a three-step procedure for mass-to-mass calculations, and a fully worked example.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Analogy of making sandwiches to explain stoichiometric ratios in chemical equations | {} | accurate |
| u2 | CONCEPT | Essential stoichiometric tools: balanced chemical equations, the mole, and mass-mole conversion formulas | {"depth": "explanation"} | accurate |
| u3 | PROCEDURE | Three-step roadmap for solving mass-to-mass stoichiometry problems | {} | accurate |
| u4 | EXAMPLE | Worked example calculating mass of water formed from 4 g of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | STUDY_SUPPORT | Study advice and problem-solving tips for stoichiometry | {"subtype": "study_strategy"} | accurate |

## u1: Analogy of making sandwiches to explain stoichiometric ratios in chemical equations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل أنك تريد صنع شطيرة (ساندويتش)"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy correctly represents the concept of fixed stoichiometric proportions and mole ratios.",
    "errors": []
  }
}
```

```text
### أولاً: فكرة الدرس في مثال من الحياة اليومية
تخيل أنك تريد صنع شطيرة (ساندويتش)، ووصفة الشطيرة الواحدة تتطلب:
**2 شريحة خبز + 1 شريحة جبن = 1 شطيرة**

* لو طلبت منك صنع **3 شطائر**، كم شريحة خبز تحتاج؟ 
ستجيب فوراً: **6 شرائح خبز**.
* كيف عرفت ذلك؟ استخدمت "النسبة" الموجودة في الوصفة الأصلية!

**هذا بالضبط ما نفعله في الكيمياء:**
تفاعل تكوين الماء:
$$2H_2 + O_2 \rightarrow 2H_2O$$
الوصفة الكيميائية تقول: **(2 جزيء من الهيدروجين + 1 جزيء من الأكسجين ينتج 2 جزيء ماء).**
```


## u2: Essential stoichiometric tools: balanced chemical equations, the mole, and mass-mole conversion formulas

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "المول في الكيمياء مثل \"الدرزن\" في الحياة اليومية"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definitions, formulas, and explanations of coefficients, Avogadro's number, and molar mass conversions are factually correct.",
    "errors": []
  }
}
```

```text
### ثانياً: الأدوات الثلاث السحرية التي لا غنى عنها

لكي تحل أي مسألة كيميائية، تحتاج لثلاث أدوات في جيبك:

1. **المعادلة الكيميائية الموزونة (الوصفة):** 
   هي الأساس، وإذا لم تكن موزونة، فكل حساباتك ستكون خاطئة. أرقام المعاملات (الأرقام الكبيرة على يسار المركبات) تمثل **عدد المولات**.

2. **المول (The Mole):** 
   المول في الكيمياء مثل "الدرزن" في الحياة اليومية (الدرزن = 12، والمول = $6.022 \times 10^{23}$ من الجسيمات). نحن نستخدم المول لأن الذرات صغيرة جداً ولا يمكن وزنها بالواحدة.

3. **مثلث التحويل الذهبي (حلقة الوصل بين الكتلة والمول):**
   * **الكتلة بالجرام (m) = عدد المولات (n) × الكتلة المولية (M)**
   * **عدد المولات (n) = الكتلة بالجرام (m) ÷ الكتلة المولية (M)**
   *(الكتلة المولية نجدها بسهولة بجمع الكتل الذرية للعناصر من الجدول الدوري).*
```


## u3: Three-step roadmap for solving mass-to-mass stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The general procedure correctly defines the standard mass-to-mole-to-mole-to-mass conversion method.",
    "errors": []
  }
}
```

```text
### ثالثاً: "خريطة الكنز" لحل أي مسألة كيميائية

غالباً تأتيك المسألة كالتالي: يعطيك **جرامات** مادة (A)، ويطلب منك **جرامات** مادة (B).
**انتبه: لا يمكنك الانتقال مباشرة من جرامات مادة إلى جرامات مادة أخرى!**
الوسيط الوحيد بين مادتين هو **"المول"**.

إليك خريطة الطريق المكونة من **3 خطوات**:

$$\text{جرامات المادة (A)} \xrightarrow{\text{الخطوة 1}} \text{مولات المادة (A)} \xrightarrow{\text{الخطوة 2}} \text{مولات المادة (B)} \xrightarrow{\text{الخطوة 3}} \text{جرامات المادة (B)}$$

1. **الخطوة 1:** حوّل جرامات المادة المعطاة (A) إلى **مولات** (اقسم على كتلتها المولية).
2. **الخطوة 2 (الجسر):** استخدم **نسبة المولات** من المعادلة الموزونة لمعرفة مولات المادة المطلوبة (B).
3. **الخطوة 3:** حوّل مولات المادة (B) إلى **جرامات** (اضرب في كتلتها المولية).
```


## u4: Worked example calculating mass of water formed from 4 g of hydrogen

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All calculations, molar masses, mole ratios, and the final result (36 g of water) are factually and mathematically correct.",
    "errors": []
  }
}
```

```text
### رابعاً: مثال عملي نطبقه سوياً

**المسألة:** 
احسب كتلة الماء ($H_2O$) الناتجة عن احتراق **4 جرام** من غاز الهيدروجين ($H_2$) تماماً مع كمية كافية من الأكسجين، حسب المعادلة:
$$2H_2 + O_2 \rightarrow 2H_2O$$
*(علماً بأن الكتل الذرية: $H = 1 \text{ g/mol}$ ، $O = 16 \text{ g/mol}$)*

---

**الحل بالخطوات الثلاث:**

* **تجهيز سريع للكتل المولية:**
  * الكتلة المولية لـ $H_2 = 2 \times 1 = 2 \text{ g/mol}$
  * الكتلة المولية لـ $H_2O = (2 \times 1) + 16 = 18 \text{ g/mol}$

* **الخطوة (1): نحول جرامات $H_2$ إلى مولات:**
  $$\text{عدد مولات } H_2 = \frac{\text{الكتلة}}{\text{الكتلة المولية}} = \frac{4}{2} = 2 \text{ mol}$$

* **الخطوة (2): نستخدم المعادلة لمعرفة مولات $H_2O$ (ضرب تبادلي / مقص):**
  * من المعادلة: $2 \text{ mol}$ من $H_2$ ينتج $2 \text{ mol}$ من $H_2O$ (النسبة 1:1).
  * إذاً: $2 \text{ mol}$ هيدروجين ستنتج **$2 \text{ mol}$ ماء**.

* **الخطوة (3): نحول مولات الماء الناتجة إلى جرامات:**
  $$\text{كتلة } H_2O = \text{عدد المولات} \times \text{الكتلة المولية} = 2 \times 18 = \mathbf{36 \text{ g}}$$

**انتهت المسألة بكل بساطة! الناتج هو 36 جرام من الماء.** 🎉
```


## u5: Study advice and problem-solving tips for stoichiometry

```json
{
  "attributes": {
    "subtype": "study_strategy"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The recommendations provide valid, sound study advice and problem-solving strategies.",
    "errors": []
  }
}
```

```text
### نصائح معلم من ذهب:
1. **تأكد دائماً أن المعادلة موزونة** قبل كتابة أي رقم.
2. **اكتب الوحدات دائماً** (جرام، مول، جم/مول)؛ هذا يمنعك من ارتكاب أخطاء في التعويض.
3. تذكر دائماً: **المول هو لغة التواصل الوحيدة بين المواد الكيميائية المختلفة.**
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
أهلاً بك يا بطل! يسعدني جداً أن أرافقك في هذه الرحلة لفهم **الحسابات الكيميائية (Stoichiometry)**. 

أعلم أن هذا الفصل قد يبدو للوهلة الأولى مليئاً بالقوانين المعقدة، لكن الحقيقة هي: **الحسابات الكيميائية تشبه تماماً وصفات الطبخ في المطبخ!** 👨‍🍳🎂

دعنا نبسط الأمر خطوة بخطوة حتى تصبح محترفاً فيها.

---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


هل تشعر أن الصورة أصبحت أوضح الآن؟ إذا كنت تحب، اكتب لي مسألة تواجه فيها صعوبة لنحلها معاً خطوة بخطوة!
```
