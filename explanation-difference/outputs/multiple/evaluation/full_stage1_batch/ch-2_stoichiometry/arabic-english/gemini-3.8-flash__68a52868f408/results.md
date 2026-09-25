# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry in chemistry, including balanced equations as recipes, the mole concept, and a general method for stoichiometry calculations",
  "topic_match": "on_topic",
  "reason": "The explanation defines stoichiometry, explains the quantitative relationships in balanced chemical equations, introduces the mole concept, outlines the procedure for mass-to-mass and mole calculations, and gives a worked example.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Kitchen sandwich-making analogy for stoichiometric ratios | {} | accurate |
| u2 | CONCEPT | Definition of stoichiometry and the balanced equation as a recipe | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | The mole concept and Avogadro's number | {"depth": "explanation"} | contains_error |
| u4 | PROCEDURE | Three-step roadmap for stoichiometry calculations | {} | accurate |
| u5 | EXAMPLE | Mole-to-mole calculation for water synthesis | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | STUDY_SUPPORT | Summary recap linking stoichiometry to the law of conservation of mass | {"subtype": "recap"} | accurate |

## u1: Kitchen sandwich-making analogy for stoichiometric ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل أنك تريد عمل ساندويتش جبن"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The kitchen recipe analogy accurately maps the concept of fixed reactant-to-product stoichiometric ratios to a familiar scenario.",
    "errors": []
  }
}
```

```text
تخيل أنك تريد عمل ساندويتش جبن، ووصفة الساندويتش الواحد هي:
> **2 شريحة خبز + 1 شريحة جبن = 1 ساندويتش**

* لو سألتك: إذا كان لديك **6 شرائح خبز** وكمية كافية من الجبن، كم ساندويتش يمكنك أن تصنع؟
* ستجيب فوراً: **3 ساندويتشات!**
* ولو سألتك: كم شريحة جبن ستحتاج لهذه الساندويتشات الثلاثة؟
* ستجيب: **3 شرائح جبن.**

ما فعلته بعقلك الآن هو بالضبط **علم الاستوكيومتري**! أنت حسبت كميات المواد التي تحتاجها لإنتاج كمية معينة من الناتج.
```


## u2: Definition of stoichiometry and the balanced equation as a recipe

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly defines stoichiometry and explains how stoichiometric coefficients represent molecular ratios in a balanced equation.",
    "errors": []
  }
}
```

```text
هي دراسة **العلاقات الكمية (الأرقام والكتل)** بين المواد المتفاعلة والمواد الناتجة في التفاعل الكيميائي.

في الكيمياء، "الوصفة" الخاصة بنا هي **المعادلة الكيميائية الموزونة**.
مثال: تكوين الماء:
$$2H_2 + O_2 \rightarrow 2H_2O$$

هذه المعادلة تخبرنا بـ "الوصفة":
كل **2 جزيء** من الهيدروجين يتفاعلون مع **1 جزيء** من الأكسجين لإنتاج **2 جزيء** من الماء.
```


## u3: The mole concept and Avogadro's number

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
        "quote": "فكّر في **المول** مثل كلمة **\"درزن\"** (الدرزن = 12 حبة)"
      }
    ]
  },
  "accuracy": {
    "verdict": "contains_error",
    "reason": "The unit contains a minor factual imprecision: defining the mole specifically as containing Avogadro's number of 'atoms' rather than elementary entities (such as molecules, formula units, or ions), especially right before applying it to molecular hydrogen, oxygen, and water.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "**المول** = حزمة تحتوي على عدد كبير جداً وثابت من الذرات ($6.022 \\times 10^{23}$)."
          }
        ],
        "description": "The text restricts the definition of a mole to Avogadro's number of 'atoms' (الذرات). A mole of a molecular substance (like H2 or H2O, which the source immediately references) contains 6.022 x 10^23 molecules, not atoms.",
        "correction": "المول = كمية المادة التي تحتوي على عدد أفوجادرو ($6.022 \\times 10^{23}$) من الجسيمات أو الوحدات البنائية (سواء كانت ذرات، أو جزيئات، أو أيونات).",
        "severity": "minor"
      }
    ]
  }
}
```

```text
في المطبخ، نتعامل بالجرام أو الحبة. لكن في الكيمياء، لا نستطيع إمساك "جزيئين" من الهيدروجين لأنهما أصغر من أن نراهما!
لذلك، اخترع الكيميائيون وحدة اسمها **"المول" (Mole)**.

* فكّر في **المول** مثل كلمة **"درزن"** (الدرزن = 12 حبة).
* **المول** = حزمة تحتوي على عدد كبير جداً وثابت من الذرات ($6.022 \times 10^{23}$).

فنقرأ المعادلة السابقة بلغة الكيميائيين:
> **2 مول** من الهيدروجين + **1 مول** من الأكسجين $\rightarrow$ ينتج **2 مول** من الماء.
```


## u4: Three-step roadmap for stoichiometry calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The three-step strategy (mass to moles, mole ratio, moles to mass) is the standard and correct procedure for solving mass-to-mass stoichiometry problems.",
    "errors": []
  }
}
```

```text
في الامتحانات، سيعطيك المعلم عادةً كتلة مادة ما بالجرام، ويطلب منك كتلة مادة أخرى بالجرام. 
تذكر دائماً هذه القاعدة الذهبية: **"لا يمكنك الانتقال من مادة إلى أخرى إلا عبر جسر المولات!"**

إليك الخطوات الثلاث السحرية:

1. **حوّل الجرامات إلى مولات:** (للمادة المعطاة)
   $$\text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية (من الجدول الدوري)}}$$
2. **استخدم النسبة المولية (كوبري المعادلة):**
   انظر إلى أرقام المعادلة الموزونة لتعرف كم مول من المادة (ب) ينتج من المادة (أ).
3. **حوّل مولات المادة الجديدة إلى جرامات:** (المادة المطلوبة)
   $$\text{الكتلة بالجرام} = \text{عدد المولات} \times \text{الكتلة المولية}$$
```


## u5: Mole-to-mole calculation for water synthesis

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
    "reason": "The worked mole-ratio problem correctly applies the stoichiometric coefficients of 2H2 : 2H2O to determine the product moles.",
    "errors": []
  }
}
```

```text
في التفاعل: $2H_2 + O_2 \rightarrow 2H_2O$
**سؤال:** كم مولاً من الماء ($H_2O$) سينتج إذا تفاعل **4 مول** من الهيدروجين ($H_2$) تماماً مع الأكسجين؟

**الحل بالمنطق:**
* المعادلة تقول: كل **2 مول** هيدروجين يعطون **2 مول** ماء (نسبة 1 إلى 1).
* إذن: **4 مول** هيدروجين ستعطيك بالتأكيد **4 مول** ماء!
```


## u6: Summary recap linking stoichiometry to the law of conservation of mass

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately connects stoichiometry to the conservation of mass and summarizes the core calculation steps.",
    "errors": []
  }
}
```

```text
**خلاصة الدرس:**
الاستوكيومتري ليست إلا تطبيقاً لـ **"قانون حفظ الكتلة"**؛ فالذرات لا تختفي ولا تُخلق من العدم، بل يُعاد ترتيبها فقط. كل ما عليك فعله هو:
1. التأكد أن معادلتك موزونة.
2. التحويل للمولات.
3. استخدام نسب المعادلة لحساب المجهول.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا المفهوم. 

كثير من الطلاب يخافون من كلمة **"استوكيومتري" (Stoichiometry)** أو ما نسميه بالعربية **"الحسابات الكيميائية"**، لأن الاسم يبدو معقداً وغريباً، لكن في الحقيقة، فكرتها أسهل مما تتخيل!

ببساطة شديدة: **الاستوكيومتري هي "كتاب الطبخ" الخاص بالكيميائي.**

دعنا نأخذ جولة سريعة وممتعة لفهمها خطوة بخطوة:

---

### 1. تشبيه المطبخ (سر الفكرة) 🍳

```

```text


---

### 2. في الكيمياء: ما هي الاستوكيومتري؟

```

```text


---

### 3. المشكلة: الذرات صغيرة جداً! (مفهوم "المول")

```

```text


---

### 4. خريطة الطريق لحل أي مسألة استوكيومتري 🗺️

```

```text


---

### مثال سريع بالأرقام:

```

```text


---


```

```text


هل الفكرة واضحة بالنسبة لك الآن؟ وإذا كان لديك مسألة معينة في واجبك المدرسي تشعر أنها صعبة، اكتبها لي ولنحلها معاً خطوة بخطوة!
```
