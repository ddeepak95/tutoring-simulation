# Stage 1: Tamil / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Isotopes: definition, subatomic particle composition, mass number calculation, carbon isotope examples, nuclide notation, chemical and physical properties, stable vs radioactive isotopes, and applications.",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains isotopes in high school level Tamil, covering definition, atomic composition, comparative examples, notation, properties, and applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotopes, atomic structure context, and relationship to mass number | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparative example of carbon isotopes (carbon-12, carbon-13, and carbon-14) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Isotope nuclide notation convention and calculation of neutron number | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Classification of stable and radioactive isotopes | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Application of carbon-14 in radiometric dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of iodine-131 in thyroid treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of cobalt-60 in cancer treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | EXAMPLE | Application of uranium-235 in nuclear power generation | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | STUDY_SUPPORT | Recap summary of isotope definition and core rule | {"subtype": "recap"} | accurate |

## u1: Definition of isotopes, atomic structure context, and relationship to mass number

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
    "reason": "The definitions of isotopes, subatomic particles, atomic number, and the formula relating mass number to protons and neutrons are factually accurate.",
    "errors": []
  }
}
```

```text
**ஐசோடோப்புகள் (Isotopes)** என்பது ஒரே தனிமத்தைச் சேர்ந்த, ஆனால் **நியூட்ரான்களின் எண்ணிக்கையில் வேறுபடும் அணுக்கள்** ஆகும்.

### அணுவின் அடிப்படை அமைப்பு
ஒரு அணுவில் மூன்று முக்கிய துகள்கள் உள்ளன:

- **புரோட்டான் (Proton)** – நேர்ம மின்சுமை; அணுக்கருவில் இருக்கும்  
- **நியூட்ரான் (Neutron)** – மின்சுமை இல்லாதது; அணுக்கருவில் இருக்கும்  
- **எலக்ட்ரான் (Electron)** – எதிர்ம மின்சுமை; அணுக்கருவைச் சுற்றி இருக்கும்  

ஒரு தனிமம் எது என்பதை அதன் **புரோட்டான் எண்ணிக்கை** தீர்மானிக்கிறது. இதுவே அதன் **அணு எண் (Atomic Number, Z)**.

---

## ஐசோடோப்புகளின் முக்கிய கருத்து

ஒரே தனிமத்தின் அனைத்து ஐசோடோப்புகளிலும்:

✅ புரோட்டான்களின் எண்ணிக்கை ஒரே மாதிரியாக இருக்கும்.  
✅ எலக்ட்ரான்களின் எண்ணிக்கையும் (நடுநிலை அணுவில்) ஒரே மாதிரியாக இருக்கும்.  
❌ ஆனால் நியூட்ரான்களின் எண்ணிக்கை வேறுபடும்.  

இதனால் அவற்றின் **நிறை எண் (Mass Number)** மாறும்.

### நிறை எண்:
\[
\text{நிறை எண்} = \text{புரோட்டான்கள் எண்ணிக்கை} + \text{நியூட்ரான்கள் எண்ணிக்கை}
\]
```


## u2: Comparative example of carbon isotopes (carbon-12, carbon-13, and carbon-14)

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
    "reason": "The subatomic particle numbers and mass numbers for carbon-12, carbon-13, and carbon-14 are correctly listed and compared.",
    "errors": []
  }
}
```

```text
## உதாரணம்: கார்பன் ஐசோடோப்புகள்

கார்பன் (Carbon) அணு எண் **6**. அதனால் எல்லா கார்பன் அணுக்களிலும் 6 புரோட்டான்கள் இருக்கும்.

| ஐசோடோப்பு | புரோட்டான்கள் | நியூட்ரான்கள் | நிறை எண் |
|---|---:|---:|---:|
| கார்பன்-12 (¹²C) | 6 | 6 | 12 |
| கார்பன்-13 (¹³C) | 6 | 7 | 13 |
| கார்பன்-14 (¹⁴C) | 6 | 8 | 14 |

இவை மூன்றும் கார்பன் தான்; ஏனெனில் மூன்றிலும் 6 புரோட்டான்கள் உள்ளன. ஆனால் நியூட்ரான்கள் வேறுபடுவதால் இவை ஐசோடோப்புகள் எனப்படுகின்றன.
```


## u3: Isotope nuclide notation convention and calculation of neutron number

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
    "reason": "The standard isotopic notation showing mass number as superscript and atomic number as subscript, along with the calculation of neutron count (12 - 6 = 6), is factually correct.",
    "errors": []
  }
}
```

```text
## குறியீட்டு முறை

ஒரு ஐசோடோப்பை இவ்வாறு எழுதலாம்:

\[
{}^{12}_{6}\text{C}
\]

இதில்:

- மேலே உள்ள **12** = நிறை எண்  
- கீழே உள்ள **6** = அணு எண்  
- C = கார்பன் தனிமம்  

நியூட்ரான்களின் எண்ணிக்கை:

\[
12 - 6 = 6
\]
```


## u4: Chemical and physical properties of isotopes

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
    "reason": "Correctly explains why chemical properties are similar (identical electron structure) and why physical properties such as density and melting point vary slightly (difference in mass).",
    "errors": []
  }
}
```

```text
## ஐசோடோப்புகளின் பண்புகள்

### வேதியியல் பண்புகள்
ஐசோடோப்புகளின் வேதியியல் பண்புகள் பெரும்பாலும் ஒரே மாதிரியாக இருக்கும். காரணம், அவற்றின் புரோட்டான் மற்றும் எலக்ட்ரான் எண்ணிக்கை ஒரே மாதிரி.

### இயற்பியல் பண்புகள்
நிறை மாறுபடுவதால் சில இயற்பியல் பண்புகள் மாறலாம். உதாரணம்: அடர்த்தி, உருகுநிலை போன்றவை சிறிது மாறலாம்.
```


## u5: Classification of stable and radioactive isotopes

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
    "reason": "Accurately defines stable and radioactive isotopes and provides correct examples for each category.",
    "errors": []
  }
}
```

```text
## நிலையான மற்றும் கதிரியக்க ஐசோடோப்புகள்

1. **நிலையான ஐசோடோப்புகள் (Stable isotopes)**  
   இவை கதிர்வீச்சை வெளியிடாது.  
   உதாரணம்: கார்பன்-12, கார்பன்-13.

2. **கதிரியக்க ஐசோடோப்புகள் (Radioactive isotopes)**  
   இவை நிலையற்றவை; கதிர்வீச்சை வெளியிடும்.  
   உதாரணம்: கார்பன்-14, யுரேனியம்-235.
```


## u6: Application of carbon-14 in radiometric dating

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
    "reason": "Carbon-14 is accurately identified as being used for radiocarbon dating of ancient organic materials such as bones and wood.",
    "errors": []
  }
}
```

```text
- **கார்பன்-14**: பழமையான எலும்புகள், மரப்பொருட்கள் போன்றவற்றின் வயதை கண்டறிய பயன்படுகிறது.
```


## u7: Application of iodine-131 in thyroid treatment

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
    "reason": "Iodine-131 is accurately identified as being used in the medical treatment of thyroid disorders.",
    "errors": []
  }
}
```

```text
- **அயோடின்-131**: தைராய்டு நோய்களின் சிகிச்சையில் பயன்படுகிறது.
```


## u8: Application of cobalt-60 in cancer treatment

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
    "reason": "Cobalt-60 is accurately identified as a source of gamma radiation used in cancer therapy.",
    "errors": []
  }
}
```

```text
- **கோபால்ட்-60**: புற்றுநோய் சிகிச்சையில் பயன்படுகிறது.
```


## u9: Application of uranium-235 in nuclear power generation

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
    "reason": "Uranium-235 is accurately identified as nuclear fuel used to generate electricity in nuclear power plants.",
    "errors": []
  }
}
```

```text
- **யுரேனியம்-235**: அணு மின்நிலையங்களில் ஆற்றல் உற்பத்திக்கு பயன்படுகிறது.
```


## u10: Recap summary of isotope definition and core rule

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
    "reason": "The recap accurately summarizes the fundamental defining criteria for isotopes.",
    "errors": []
  }
}
```

```text
### சுருக்கமாக
**ஒரே அணு எண், வேறு நிறை எண் கொண்ட ஒரே தனிமத்தின் அணுக்கள் ஐசோடோப்புகள் ஆகும்.**  
அதாவது: **புரோட்டான்கள் ஒரே எண்ணிக்கை; நியூட்ரான்கள் வேறு எண்ணிக்கை.**
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "The section 'குறியீட்டு முறை' (Notation method) teaches how nuclide notation works using Carbon-12 as a concrete case. This could be categorized as PROCEDURE (a method for reading/writing isotope symbols and calculating neutrons) or as EXAMPLE (a worked notation problem).",
    "proposed_resolution": "Classified as CONCEPT because its primary instructional function is defining and explaining the standard symbolic convention of isotopic notation rather than teaching an algorithmic multi-step procedure."
  },
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8",
      "u9"
    ],
    "issue": "The four bulleted applications share a single section header ('## பயன்பாடுகள்') and could be grouped into a single unit.",
    "proposed_resolution": "Separated into individual illustrative EXAMPLE units in accordance with the boundary guidelines (which specify that a list of distinct applications like dating, medicine, and power generation represents independent examples even if presented under a shared heading)."
  }
]
```

## Unassigned text for coverage review

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


---

## பயன்பாடுகள்


```

```text


---


```
