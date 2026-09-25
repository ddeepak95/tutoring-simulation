# Stage 1: Tamil / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, its definition, underlying principles (conservation of mass, mole concept), worked reaction example, and real-world applications",
  "topic_match": "on_topic",
  "reason": "The explanation clearly and accurately introduces stoichiometry, defining it, showing its derivation and balancing principles, providing a chemical example, and describing applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Making tea analogy for stoichiometric ratios | {} | accurate |
| u2 | CONCEPT | Etymology and definition of stoichiometry | {"depth": "statement"} | accurate |
| u3 | EXAMPLE | Water formation reaction stoichiometry calculation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Law of conservation of mass as basis for stoichiometry | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Mole concept connection in stoichiometry | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Application of stoichiometry in medicine manufacturing | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of stoichiometry in chemical industries | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of stoichiometry in rocket propulsion fuel calculations | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | STUDY_SUPPORT | Summary recap of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Making tea analogy for stoichiometric ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "உங்களுக்கு **ஒரு கப் டீ** போட வேண்டும் என்றால் என்ன தேவைப்படும்?\n* 1 கப் பால்\n* 1 ஸ்பூன் டீத்தூள்\n* 1 ஸ்பூன் சர்க்கரை"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The comparison maps everyday recipe scaling and proportions accurately to the concept of stoichiometry.",
    "errors": []
  }
}
```

```text
முதலில் வேதியியலை மறந்துவிட்டு, சமையலறைக்குச் செல்வோம். 

உங்களுக்கு **ஒரு கப் டீ** போட வேண்டும் என்றால் என்ன தேவைப்படும்?
* 1 கப் பால்
* 1 ஸ்பூன் டீத்தூள்
* 1 ஸ்பூன் சர்க்கரை

இப்போது உங்கள் வீட்டிற்கு 4 விருந்தினர்கள் வருகிறார்கள், மொத்தம் **4 கப் டீ** போட வேண்டும் என்றால் என்ன செய்வீர்கள்?
அளவை 4 மடங்காக மாற்றுவீர்கள், சரியா?
* 4 கப் பால்
* 4 ஸ்பூன் டீத்தூள்
* 4 ஸ்பூன் சர்க்கரை

இதை நீங்கள் எப்படி கணக்கிட்டீர்கள்? ஒரு கப் டீக்கான "விகிதம்" (Ratio) உங்களுக்குத் தெரிந்ததால், 4 கப்புக்கான அளவைச் சரியாகக் கணக்கிட்டுவிட்டீர்கள். 

**சமையலில் நீங்கள் செய்த இதே கணக்குதான், வேதியியலில் "Stoichiometry"!**
```


## u2: Etymology and definition of stoichiometry

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
    "reason": "The Greek roots and chemical definition of stoichiometry are correctly stated.",
    "errors": []
  }
}
```

```text
இது ஒரு கிரேக்கச் சொல்:
* **Stoicheion** = தனிமம் (Element)
* **Metron** = அளவிடுதல் (Measurement)

**விளக்கம்:** 
ஒரு வேதிவினையில் (Chemical reaction), எவ்வளவு **வினைபடு பொருட்கள் (Reactants)** தேவைப்படும், அவற்றிலிருந்து எவ்வளவு **விளைபொருட்கள் (Products)** கிடைக்கும் என்பதை அளந்து கணக்கிடும் முறைதான் **Stoichiometry**.
```


## u3: Water formation reaction stoichiometry calculation

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
    "reason": "The balanced chemical equation, stoichiometric coefficient interpretation, and the worked numerical deduction (10 H2 molecules reacting with 5 O2 molecules to yield 10 H2O molecules) are mathematically and chemically correct.",
    "errors": []
  }
}
```

```text
நமக்கு மிகவும் தெரிந்த **தண்ணீர் ($H_2O$)** உருவாவதை எடுத்துக்கொள்வோம்.

ஹைட்ரஜனும் ஆக்சிஜனும் சேர்ந்தால் நீர் கிடைக்கும்.
இதன் சமன்பாடு (Equation):

$$2H_2 + O_2 \rightarrow 2H_2O$$

இதை நாம் எப்படிப் புரிந்துகொள்ள வேண்டும்?
* **2 மூலக்கூறு ஹைட்ரஜன் ($H_2$)** உடன் 
* **1 மூலக்கூறு ஆக்சிஜன் ($O_2$)** சேர்ந்தால் 
* **2 மூலக்கூறு நீர் ($H_2O$)** கிடைக்கும்.

அந்த சமன்பாட்டில் முன்னால் இருக்கும் எண்கள் (2, 1, 2) தான் **"Stoichiometric Coefficients" (விகிதக் குணகங்கள்)**. இதுதான் கெமிஸ்ட்ரியின் "ரெசிபி" (Recipe)!

இப்போது உங்களிடம் 10 ஹைட்ரஜன் மூலக்கூறுகள் இருந்தால், அதை முழுமையாக நீராக மாற்ற எத்தனை ஆக்சிஜன் தேவைப்படும்? 
சரியாக **5 ஆக்சிஜன்** தேவைப்படும் ($10 \div 2$). இதன் மூலம் **10 நீர் மூலக்கூறுகள்** கிடைக்கும்!
```


## u4: Law of conservation of mass as basis for stoichiometry

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
    "reason": "Correctly states the law of conservation of mass and explains its relationship to equation balancing and stoichiometry.",
    "errors": []
  }
}
```

```text
இது **பொருண்மை அழியா விதி (Law of Conservation of Mass)** அடிப்படையில் இயங்குகிறது. 
அதாவது:
> **"ஒரு வேதிவினையில் நிறையை (Mass) உருவாக்கவோ அல்லது அழிக்கவோ முடியாது."**

வினைக்கு முன் அணுக்களின் எடை என்னவோ, அதே எடைதான் வினை முடிந்த பிறகும் இருக்கும். அதனால்தான் நாம் எப்போதுமே **சமன்பாட்டைச் சமன் செய்கிறோம் (Balancing the Equation).** சமன் செய்யப்படாத சமன்பாட்டில் Stoichiometry வேலை செய்யாது!
```


## u5: Mole concept connection in stoichiometry

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
    "reason": "Accurately introduces the mole as the counting unit for stoichiometry and notes molar-to-mass conversions.",
    "errors": []
  }
}
```

```text
நாம் சமையலில் 'கப்' அல்லது 'ஸ்பூன்' என்று அளப்பது போல, வேதியியலில் அணுக்களை **'மோல்' (Mole)** என்ற அலகால் அளப்போம்.

* மேலே பார்த்த சமன்பாட்டின்படி:
  **2 மோல் $H_2$ + 1 மோல் $O_2 \rightarrow$ 2 மோல் $H_2O$**
* மோல்களை கிராம் (Grams) அளவுக்கு மாற்றி கணக்கிடுவதுதான் உங்கள் பாடத்தில் இருக்கும் கணக்குகள் (Problems).
```


## u6: Application of stoichiometry in medicine manufacturing

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
    "reason": "Correctly identifies dosage and chemical proportion control in pharmaceutical manufacturing as an application of stoichiometry.",
    "errors": []
  }
}
```

```text
1. **மருந்து தயாரிப்பில் (Medicine):** மாத்திரைகள் தயாரிக்கும் போது ஒரு கெமிக்கல் அதிகமானாலும் ஆபத்து, குறைந்தாலும் வேலை செய்யாது. சரியான அளவில் சேர்க்க இது தேவை.
```


## u7: Application of stoichiometry in chemical industries

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
    "reason": "Correctly describes stoichiometric efficiency to avoid waste in manufacturing products like soap and fertilizers.",
    "errors": []
  }
}
```

```text
2. **தொழிற்சாலைகளில்:** சோப்பு, உரம் போன்றவை தயாரிக்கும் போது மூலப்பொருட்கள் வீணாகாமல் இருக்க.
```


## u8: Application of stoichiometry in rocket propulsion fuel calculations

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
    "reason": "Accurately points out that fuel-to-oxidizer ratios in rocket propulsion are calculated using stoichiometry.",
    "errors": []
  }
}
```

```text
3. **ராக்கெட் ஏவுதலில்:** விண்வெளிக்குச் செல்லும் ராக்கெட்டிற்குத் தேவையான எரிபொருளையும் (Fuel) ஆக்சிஜனையும் மிகத் துல்லியமாகக் கணக்கிட Stoichiometry பயன்படுகிறது.
```


## u9: Summary recap of stoichiometry

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
    "reason": "Concise and correct summary of what stoichiometry calculates.",
    "errors": []
  }
}
```

```text
**சுருக்கமாகச் சொன்னால்:**
வேதியியல் சமன்பாடுகளைப் பயன்படுத்தி, "எவ்வளவு போட்டா, எவ்வளவு கிடைக்கும்?" என்று போடும் கணக்குதான் **Stoichiometry**!
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Unit u1 presents making tea as an analogy for stoichiometric ratios, but it is explicitly titled as 'ஒரு எளிய உதாரணம்' (a simple example) in the source text.",
    "proposed_resolution": "Classified as ANALOGY rather than EXAMPLE because making tea is drawn from a non-chemical everyday domain (cooking) to explain chemical reaction stoichiometry by mapping recipe proportions to stoichiometric ratios."
  },
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8"
    ],
    "issue": "The three real-world applications appear under a single heading 'இது நிஜ வாழ்க்கையில் எங்கே பயன்படுகிறது?'. They could potentially be seen as a single comparative example or three independent illustrative examples.",
    "proposed_resolution": "Separated into three EXAMPLE units (u6, u7, u8) following the guideline that a list naming independent applications constitutes separate units unless they jointly demonstrate a specific comparison or relationship."
  }
]
```

## Unassigned text for coverage review

```text
வணக்கம்! **Stoichiometry (வேதிவினை அளவியல்)** என்பதைப் பற்றி மிக எளிமையாகவும், சுவாரஸ்யமாகவும் பார்க்கலாம். 

பெயர் கொஞ்சம் பயமுறுத்துவது போல இருந்தாலும், விஷயம் ரொம்ப சிம்பிள்!

---

### ஒரு எளிய உதாரணம்: "டீ போடுவது எப்படி?"


```

```text


---

### Stoichiometry என்றால் என்ன?


```

```text


---

### வேதியியல் உதாரணம் (Chemical Example):


```

```text


---

### Stoichiometry-யின் மிக முக்கியமான விதி:


```

```text


---

### உயர் வகுப்பில் நீங்கள் என்ன படிப்பீர்கள்? (The "Mole" Concept)


```

```text


---

### இது நிஜ வாழ்க்கையில் எங்கே பயன்படுகிறது?


```

```text
 

இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள்!
```
