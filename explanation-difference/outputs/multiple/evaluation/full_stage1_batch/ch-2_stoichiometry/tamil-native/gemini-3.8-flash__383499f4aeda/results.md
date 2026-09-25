# Stage 1: Tamil / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry (வேதி வினைக் கூறுகளின் விகிதம்)",
  "topic_match": "on_topic",
  "reason": "The explanation defines stoichiometry, illustrates it with a chemical equation (formation of water) and mass conservation, outlines the procedure for solving stoichiometric problems, and describes real-world applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Tea recipe analogy for stoichiometric ratios | {} | accurate |
| u2 | CONCEPT | Etymology and definition of stoichiometry | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Water formation reaction and conservation of mass | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | PROCEDURE | General method for solving stoichiometry problems | {} | accurate |
| u5 | EXAMPLE | Application in medicine manufacturing | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | EXAMPLE | Application in rocket propulsion | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application in industrial chemical manufacturing | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | STUDY_SUPPORT | Recap summary of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Tea recipe analogy for stoichiometric ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "நீங்கள் அருமையான 'டீ' போடப் போகிறீர்கள் என்று வைத்துக்கொள்வோம்."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy correctly maps ingredient ratios in a culinary recipe to stoichiometric ratios in chemistry.",
    "errors": []
  }
}
```

```text
முதலில் வேதியியலை மறந்துவிட்டு, உங்கள் வீட்டிற்கு வருவோம். நீங்கள் அருமையான 'டீ' போடப் போகிறீர்கள் என்று வைத்துக்கொள்வோம். 

**செய்முறை (Recipe):**
> **1 கப் பால் + 1 கப் தண்ணீர் + 1 ஸ்பூன் சர்க்கரை = 2 கப் டீ**

இப்போது உங்களிடம் ஒரு கேள்வி: 
உங்களுக்கு **4 கப் டீ** வேண்டும் என்றால், என்ன செய்வீர்கள்?
உடனே சொல்வீர்கள்: "2 கப் பால், 2 கப் தண்ணீர், 2 ஸ்பூன் சர்க்கரை போட வேண்டும்!" என்று.

இதை நீங்கள் எப்படிச் சொன்னீர்கள்? ஏனென்றால், உங்களுக்கு அந்த டீ தயாரிப்பதற்கான **விகிதம் (Ratio)** தெரிந்திருக்கிறது. 

சமையலில் நாம் இதை **"Recipe" (செய்முறை விகிதம்)** என்கிறோம். வேதியியலில் இதையே **"Stoichiometry"** என்கிறோம். அவ்வளவுதான் வித்தியாசம்!
```


## u2: Etymology and definition of stoichiometry

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
    "reason": "The Greek root derivation and the definition connecting reactant and product quantities (mass/moles) are factually correct.",
    "errors": []
  }
}
```

```text
கிரேக்க மொழியில்:
* *Stoicheion* என்றால் **'தனிமம்' (Element)**
* *Metron* என்றால் **'அளவீடு' (Measurement)**

> **வரையறை:** ஒரு வேதிவினையில் ஈடுபடும் **வினைபடு பொருட்கள் (Reactants)** மற்றும் அதனால் உருவாகும் **வினைவிளை பொருட்கள் (Products)** ஆகியவற்றின் அளவுகளுக்கு (நிறை அல்லது மோல்) இடையேயான கணிதத் தொடர்புதான் 'வேதி வினைக் கூறுகளின் விகிதம்' ஆகும்.
```


## u3: Water formation reaction and conservation of mass

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
    "reason": "The stoichiometric coefficients, molar mass calculations, and demonstration of the law of conservation of mass are mathematically and scientifically correct.",
    "errors": []
  }
}
```

```text
ஹைட்ரஜனும் ஆக்சிஜனும் சேர்ந்து நீர் உருவாகும் வினையை எடுத்துக்கொள்வோம்.

**சமன் செய்யப்பட்ட சமன்பாடு (Balanced Chemical Equation):**
$$2H_2 + O_2 \rightarrow 2H_2O$$

இந்த சமன்பாடு நமக்கு என்ன சொல்கிறது?
* **2 மூலக்கூறு (அல்லது 2 மோல்) ஹைட்ரஜன்** வாயுவுடன், 
* **1 மூலக்கூறு (அல்லது 1 மோல்) ஆக்சிஜன்** வாயு சேர்ந்தால்,
* **2 மூலக்கூறு (அல்லது 2 மோல்) நீர்** கிடைக்கும்.

இங்கே உள்ள விகிதம் என்ன? **2 : 1 : 2**
இதுதான் ஸ்டாய்கியோமெட்ரிக் விகிதம் (Stoichiometric Ratio).

**நிறையின் அடிப்படையில் பார்த்தால் (Mass):**
* ஹைட்ரஜனின் நிறை ($2 \times 2$) = **4 கிராம்**
* ஆக்சிஜனின் நிறை ($1 \times 32$) = **32 கிராம்**
* உருவான நீரின் நிறை ($2 \times 18$) = **36 கிராம்**

பார்த்தீர்களா? 
வினைபடு பொருட்களின் மொத்த நிறை ($4 + 32 = 36$ கிராம்) = விளைபொருளின் மொத்த நிறை ($36$ கிராம்). 
இதன் மூலம் **'பொருண்மை அழிவின்மை விதி' (Law of Conservation of Mass)** உண்மையாகிறது.
```


## u4: General method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The 3-step sequence (balance equation -> convert to moles -> apply stoichiometric mole ratio) is standard and correct for introductory stoichiometry.",
    "errors": []
  }
}
```

```text
பரீட்சையில் இதைப் பற்றி கணக்கு கேட்டால், இந்த 3 படிகளை மட்டும் நினைவில் வையுங்கள்:

1. **சமன்பாட்டைச் சமன் செய் (Balance the equation):** சமன் செய்யப்படாத சமன்பாட்டை வைத்து கணக்கு போடவே கூடாது.
2. **மோல்களாக மாற்று (Convert to Moles):** கொடுக்கப்பட்ட எடையை மோல்களாக மாற்றிக்கொள்ள வேண்டும் ($\text{Mole} = \frac{\text{Mass}}{\text{Molar mass}}$).
3. **விகிதத்தைப் பயன்படுத்து (Use the Ratio):** சமன்பாட்டில் உள்ள விகிதத்தை வைத்து விடையைக் கண்டுபிடி.
```


## u5: Application in medicine manufacturing

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
    "reason": "Accurately conveys that pharmaceutical synthesis and dosage formulation require precise stoichiometric quantities.",
    "errors": []
  }
}
```

```text
* **மருந்து தயாரிப்பில் (Medicines):** ஒரு பாராசிட்டமால் மாத்திரை செய்யும்போது, வேதிப்பொருட்களின் விகிதம் மில்லி கிராம் அளவில் கூட மாறக்கூடாது. மாறினால் அது விஷமாகிவிடும்!
```


## u6: Application in rocket propulsion

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
    "reason": "Correctly notes that rocket propellants require a precise stoichiometric ratio between fuel and oxidizer for efficient combustion.",
    "errors": []
  }
}
```

```text
* **ராக்கெட் ஏவுதலில் (Rockets):** ராக்கெட் சீறிப் பாய, எரிபொருளும் (Fuel) ஆக்சிஜனேற்றியும் (Oxidizer) மிகச் சரியான விகிதத்தில் கலக்கப்பட வேண்டும்.
```


## u7: Application in industrial chemical manufacturing

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
    "reason": "Industrial chemical synthesis relies on stoichiometric optimization to maximize atom economy and minimize waste and economic cost.",
    "errors": []
  }
}
```

```text
* **தொழிற்சாலைகளில்:** தேவையற்ற கழிவுகள் உருவாவதைத் தடுத்து, பணத்தை மிச்சப்படுத்த இந்த விகிதக் கணக்கீடு மிக அவசியம்.
```


## u8: Recap summary of stoichiometry

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
    "reason": "Correctly summarizes stoichiometry as a tool to calculate expected products from given reactants.",
    "errors": []
  }
}
```

```text
**சுருக்கமாகச் சொன்னால்:**
வேதி வினைக் கூறுகளின் விகிதம் என்பது **"வேதியியலின் செய்முறை புத்தகம் (Recipe Book)"**. எவ்வளவு மூலப்பொருள் போட்டால், எவ்வளவு தயாரிப்பு கிடைக்கும் என்று முன்கூட்டியே கணக்கிடும் ஒரு சூப்பர் கருவி!
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u5",
      "u6",
      "u7"
    ],
    "issue": "Section 5 lists three real-world application areas under a single heading. They could either be grouped as a single multi-application EXAMPLE unit or split into distinct illustrative EXAMPLE units.",
    "proposed_resolution": "Split into three distinct EXAMPLE units (u5, u6, u7) following guideline 4, which specifies that a list naming independent applications constitutes separate example units when they do not jointly demonstrate a single comparative relationship."
  }
]
```

## Unassigned text for coverage review

```text
வணக்கம்! வாருங்கள், வேதியியலின் மிக முக்கியமான, அதே சமயம் மிகவும் சுவாரசியமான ஒரு தலைப்பைப் பற்றி இன்று நாம் எளிமையாகப் புரிந்து கொள்ளலாம்.

அதன் பெயர்: **வேதி வினைக் கூறுகளின் விகிதம் (Stoichiometry - ஸ்டாய்கியோமெட்ரி)**. 

பெயர் ஏதோ பயமுறுத்துவது போலத் தோன்றினாலும், விஷயம் மிக மிக எளிது!

---

### 1. ஒரு எளிய சமையல் உதாரணம்:

```

```text


---

### 2. ஸ்டாய்கியோமெட்ரி என்றால் என்ன?

```

```text


---

### 3. ஒரு வேதியியல் உதாரணம் (தண்ணீர் தயாரிப்போம்):

```

```text


---

### 4. இதை கணக்குகளில் எப்படிப் பயன்படுத்துவது? (3 தங்க விதிகள்)


```

```text


---

### 5. இது நிஜ வாழ்க்கையில் எங்கே பயன்படுகிறது?

```

```text


---


```

```text


இப்போது சொல்லுங்கள், இது எளிமையாக இருக்கிறதா? இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள்!
```
