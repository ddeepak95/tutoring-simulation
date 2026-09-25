# Stage 1: Tamil / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry definition, steps to calculate amounts, worked mass-mass calculation, practical applications, and summary tips",
  "topic_match": "on_topic",
  "reason": "The explanation introduces stoichiometry, illustrates it with an everyday cooking analogy, outlines general steps, works through a stoichiometry calculation problem, and summarizes key points and applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Recipe and dosai-making analogy for chemical stoichiometry | {} | accurate |
| u3 | EXAMPLE | Water formation reaction showing molecular ratio | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | PROCEDURE | Key steps to solve stoichiometry problems | {} | accurate |
| u5 | EXAMPLE | Worked mass-mass calculation for oxygen reacting with hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | EXAMPLE | Real-world applications of stoichiometry in industry, medicine, and environment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | STUDY_SUPPORT | Summary tips and recap of stoichiometry fundamentals | {"subtype": "recap"} | accurate |

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
    "reason": "Correctly defines stoichiometry as the calculation of quantitative relationships between reactants and products in chemical equations.",
    "errors": []
  }
}
```

```text
Stoichiometry (ஸ்டாய்கியோமெட்ரி) என்பது **வேதியியல் சமன்பாடுகளில் (chemical equations) உள்ள reactants மற்றும் products இடையே உள்ள அளவு உறவை** கணக்கிடும் ஒரு முறை.
```


## u2: Recipe and dosai-making analogy for chemical stoichiometry

```json
{
  "attributes": {},
  "contextualization": {
    "value": "localized",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "தோசை"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately maps the concept of fixed reactant ratios yielding a definite amount of product to the everyday cooking process of making dosai.",
    "errors": []
  }
}
```

```text
எளிமையாக சொன்னால் - **"ஒரு recipe போன்றது"**

## ஒரு உதாரணத்துடன் புரிந்துகொள்வோம்

நீங்கள் ஒரு **தோசை** செய்கிறீர்கள் என வைத்துக்கொள்வோம்:
- 1 கப் மாவு + 2 முட்டை = 4 தோசை
```


## u3: Water formation reaction showing molecular ratio

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly states the stoichiometric relationship at the molecular level for the balanced water formation reaction.",
    "errors": []
  }
}
```

```text
இதேபோல தான் வேதியியலிலும்:

$$2H_2 + O_2 \rightarrow 2H_2O$$

இதன் அர்த்தம்:
- **2 மூலக்கூறு Hydrogen** + **1 மூலக்கூறு Oxygen** → **2 மூலக்கூறு Water** உருவாகும்
```


## u4: Key steps to solve stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Provides a correct general three-step procedure: balancing the equation, identifying mole ratios from coefficients, and calculating mass using molar mass.",
    "errors": []
  }
}
```

```text
## முக்கிய படிகள் (Steps)

### 1️⃣ சமன்பாட்டை Balance செய்யவும்
வேதியியல் சமன்பாடு சரியாக balance ஆகி இருக்க வேண்டும் (இரு பக்கமும் atoms எண்ணிக்கை சமமாக இருக்க வேண்டும்)

### 2️⃣ Mole Concept பயன்படுத்தவும்
- Coefficients (எண்கள்) mole ratio-வை காட்டும்
- 2H₂ + O₂ → 2H₂O என்றால், **2 mole H₂ க்கு 1 mole O₂** தேவை

### 3️⃣ Mass கணக்கிடவும்
$$Mass = Moles \times Molar\ Mass$$
```


## u5: Worked mass-mass calculation for oxygen reacting with hydrogen

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
    "reason": "The worked problem correctly calculates moles of H2 (4 g / 2 g/mol = 2 mol), uses the stoichiometric ratio (2:1) to find moles of O2 needed (1 mol), and calculates the required mass of O2 (1 mol * 32 g/mol = 32 g).",
    "errors": []
  }
}
```

```text
## நடைமுறை உதாரணம்

**கேள்வி:** 4g Hydrogen முழுவதும் வினைபுரிய, எத்தனை கிராம் Oxygen தேவை?

$$2H_2 + O_2 \rightarrow 2H_2O$$

**தீர்வு:**
1. Moles of H₂ = 4g ÷ 2g/mol = **2 moles**
2. Ratio படி: 2 mol H₂ க்கு 1 mol O₂ தேவை
3. Moles of O₂ = 1 mole
4. Mass of O₂ = 1 × 32 = **32g**
```


## u6: Real-world applications of stoichiometry in industry, medicine, and environment

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately lists real-world practical applications where stoichiometry is utilized.",
    "errors": []
  }
}
```

```text
## ஏன் இது முக்கியம்?

| பயன்பாடு | விளக்கம் |
|---------|----------|
| Industry | எவ்வளவு raw material தேவை என கணக்கிட |
| Medicine | சரியான அளவு மருந்து தயாரிக்க |
| Environment | Pollution அளவை கணக்கிட |
```


## u7: Summary tips and recap of stoichiometry fundamentals

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
    "reason": "Summarizes the essential takeaways and key formulas correctly for revision.",
    "errors": []
  }
}
```

```text
## நினைவில் கொள்ள வேண்டியவை (Tips)

✅ எப்போதும் **balanced equation** உடன் ஆரம்பிக்கவும்
✅ **Mole ratio** தான் stoichiometry-ன் அடிப்படை
✅ Formula: $Mass = Moles \times Molar\ Mass$ ஐ நினைவில் வைத்துக்கொள்ளுங்கள்

---

**சுருக்கமாக:** Stoichiometry என்பது "எவ்வளவு reactant இருந்தால், எவ்வளவு product கிடைக்கும்" என்பதை கணக்கிடும் கணித முறை! 🧪
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Contextualization value: Dosai is a traditional South Asian / Tamil dish, which could be considered culturally localized, or simply an everyday cooking food item.",
    "proposed_resolution": "Labeled as 'localized' because dosai represents a specific regional cuisine familiar to Tamil speakers, and the guideline states that when both everyday and localized apply, localized should be chosen."
  },
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "The table in 'ஏன் இது முக்கியம்?' lists three distinct fields (Industry, Medicine, Environment). A list of separate applications can sometimes be split into three units, or kept together as a single table unit.",
    "proposed_resolution": "Kept intact as a single illustrative EXAMPLE unit to avoid fragmenting the Markdown table syntax, per Section 5 guidelines regarding coherent tables."
  }
]
```

## Unassigned text for coverage review

```text
# Stoichiometry - ஒரு எளிய விளக்கம் (High School Student களுக்கு)

## Stoichiometry என்றால் என்ன?


```

```text


இதில் ஏதேனும் சந்தேகம் இருந்தால் கேளுங்கள்! 😊
```
