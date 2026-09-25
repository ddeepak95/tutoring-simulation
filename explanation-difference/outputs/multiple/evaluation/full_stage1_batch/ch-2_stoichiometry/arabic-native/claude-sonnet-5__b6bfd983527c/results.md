# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry definition, mole conversions, general problem-solving steps, and a worked mass-mass calculation",
  "topic_match": "on_topic",
  "reason": "The text directly explains stoichiometry, introduces key mole relationships, outlines a standard procedure for solving stoichiometric problems, and demonstrates it with a worked example.",
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
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u2 | CONCEPT | The mole concept and stoichiometric conversion formulas | {"depth": "statement"} | accurate |
| u3 | PROCEDURE | General procedure for solving stoichiometry problems | {} | accurate |
| u4 | EXAMPLE | Worked example calculating mass of oxygen required to react with hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | STUDY_SUPPORT | Study advice and problem-solving tips for stoichiometry | {"subtype": "study_strategy"} | accurate |

## u1: Definition of stoichiometry

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition correctly describes stoichiometry as calculations of reactant and product quantities using balanced chemical equations.",
    "errors": []
  }
}
```

```text
هي الحسابات التي تُستخدم لمعرفة كميات المواد المتفاعلة والناتجة في التفاعل الكيميائي، بالاعتماد على **المعادلة الكيميائية الموزونة**.
```


## u2: The mole concept and stoichiometric conversion formulas

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definitions of mole, Avogadro's number, molar mass, and standard conversion formulas between mass, particles, gas volume at STP, and moles are scientifically accurate.",
    "errors": []
  }
}
```

```text
### 1. المول (Mole)
- المول هو وحدة لقياس كمية المادة
- **1 مول = 6.022 × 10²³ جسيم** (عدد أفوجادرو)
- الكتلة المولية = كتلة المول الواحد بالجرام (تُقاس بوحدة g/mol)

### 2. العلاقات المهمة

| من | إلى | العلاقة |
|---|---|---|
| الكتلة | المول | عدد المولات = الكتلة ÷ الكتلة المولية |
| المول | عدد الجسيمات | عدد الجسيمات = عدد المولات × 6.022×10²³ |
| المول | حجم الغاز (STP) | الحجم = عدد المولات × 22.4 لتر |
```


## u3: General procedure for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The outlined 4-step sequence reflects the standard, correct general algorithm for solving stoichiometry calculations.",
    "errors": []
  }
}
```

```text
### الخطوة 1: اكتب المعادلة الكيميائية الموزونة ✅
هذا **أهم خطوة** لأن الأرقام (المعاملات) تخبرنا بنسب التفاعل.

### الخطوة 2: حوّل الكمية المعطاة إلى مولات

### الخطوة 3: استخدم النسبة المولية من المعادلة الموزونة

### الخطوة 4: حوّل الناتج من مولات إلى الوحدة المطلوبة
```


## u4: Worked example calculating mass of oxygen required to react with hydrogen

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
    "reason": "All calculations, equations, molar masses (H2 = 2 g/mol, O2 = 32 g/mol), mole ratios, and final numerical values are completely correct.",
    "errors": []
  }
}
```

```text
**السؤال:** كم جرام من الأكسجين (O₂) نحتاج للتفاعل الكامل مع 4 جرام من الهيدروجين (H₂) لإنتاج الماء؟

**المعادلة الموزونة:**
$$2H_2 + O_2 \rightarrow 2H_2O$$

**الحل:**

**الخطوة 1:** حساب عدد مولات H₂
$$n(H_2) = \frac{الكتلة}{الكتلة المولية} = \frac{4}{2} = 2 \text{ مول}$$

**الخطوة 2:** استخدام النسبة المولية من المعادلة
- النسبة بين H₂ و O₂ هي 2:1
$$n(O_2) = n(H_2) \times \frac{1}{2} = 2 \times \frac{1}{2} = 1 \text{ مول}$$

**الخطوة 3:** حساب كتلة O₂
- الكتلة المولية لـ O₂ = 32 g/mol
$$الكتلة = n \times الكتلة المولية = 1 \times 32 = 32 \text{ جرام}$$

### ✅ الإجابة: نحتاج 32 جرام من الأكسجين
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
    "reason": "The tips provide sound study and problem-solving strategies for chemistry students.",
    "errors": []
  }
}
```

```text
1. **لا تنسَ وزن المعادلة** قبل البدء بأي حسابات
2. **انتبه للوحدات** دائمًا (جرام، مول، لتر)
3. تدرّب على حساب **الكتلة المولية** لأي مركب بجمع الكتل الذرية
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
# الحسابات الكيميائية (Stoichiometry)

## 🔬 ما هي الحسابات الكيميائية؟


```

```text


---

## 📌 المفاهيم الأساسية المطلوبة


```

```text


---

## 🧮 خطوات حل مسائل الحسابات الكيميائية


```

```text


---

## 💡 مثال تطبيقي


```

```text


---

## ⚠️ نصائح مهمة


```

```text


---

هل تريد أن أشرح لك موضوع **المتفاعل المحدد (Limiting Reactant)** أو أعطيك تمارين للتدريب؟ 😊
```
