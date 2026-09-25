# Stage 1: Tamil / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometric ratios in chemical reactions, mole ratios, balanced equations, and their importance",
  "topic_match": "on_topic",
  "reason": "The explanation defines and illustrates stoichiometry, focusing on mole ratios and coefficients from balanced chemical equations with examples.",
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
| u1 | CONCEPT | Law of conservation of mass and the necessity of balancing chemical equations | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Stoichiometric ratio in water formation reaction | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Definition of mole and mole ratio | {"depth": "explanation"} | contains_error |
| u4 | EXAMPLE | Stoichiometric ratio in methane combustion | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | CONCEPT | Importance and practical applications of stoichiometric ratios | {"depth": "explanation"} | contains_error |
| u6 | STUDY_SUPPORT | Summary recap of key rules about stoichiometric ratios | {"subtype": "recap"} | accurate |

## u1: Law of conservation of mass and the necessity of balancing chemical equations

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
    "reason": "Correctly defines a chemical reaction, mentions the conservation of mass/atoms, and explains that balancing is required to determine stoichiometric ratios.",
    "errors": []
  }
}
```

```text
### வேதி வினை என்றால் என்ன?
வேதி வினை என்பது, இரண்டு அல்லது அதற்கு மேற்பட்ட பொருட்கள் ஒன்றுடன் ஒன்று வினைபுரிந்து, புதிய பொருட்களை உருவாக்கும் செயல். இதில் **அணுக்கள் எண்ணிக்கை மாறாது** (நிறை பாதுகாப்பு விதி). அதாவது, வினைக்கு முன் இருந்த அணுக்கள் எண்ணிக்கை, வினைக்குப் பின் இருக்கும் அணுக்கள் எண்ணிக்கைக்கு சமம்.

இதைச் சரியாகக் காட்ட, வேதி சமன்பாட்டை **சமநிலைப்படுத்த** வேண்டும். சமநிலைப்படுத்திய சமன்பாட்டிலிருந்துதான் கூறுகளின் விகிதம் தெரியும்.
```


## u2: Stoichiometric ratio in water formation reaction

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
    "reason": "The equation is balanced correctly and the molecular/stoichiometric ratios derived from the coefficients are accurate.",
    "errors": []
  }
}
```

```text
### எளிய உதாரணம்: நீர் உருவாக்கம்
ஹைட்ரஜன் வாயு + ஆக்ஸிஜன் வாயு → நீர்

சமன்பாட்டை சமநிலைப்படுத்திய பிறகு:
**2H₂ + O₂ → 2H₂O**

இங்கு:
- **2** மூலக்கூறு ஹைட்ரஜன் (H₂)
- **1** மூலக்கூறு ஆக்ஸிஜன் (O₂)
- இவை வினைபுரிந்து **2** மூலக்கூறு நீர் (H₂O) உருவாகிறது.

இதிலிருந்து நாம் பெறும் விகிதம்:
- ஹைட்ரஜன் : ஆக்ஸிஜன் = **2 : 1**
- ஹைட்ரஜன் : நீர் = **2 : 2** (அல்லது 1 : 1)
- ஆக்ஸிஜன் : நீர் = **1 : 2**

இந்த எண்கள் (2, 1, 2) **குணகங்கள்** (coefficients) என்று அழைக்கப்படும். இவைதான் விகிதத்தைக் காட்டுகின்றன.
```


## u3: Definition of mole and mole ratio

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
    "verdict": "contains_error",
    "reason": "The claim that the reaction will not occur properly if the ratio is changed is misleading; a reaction still proceeds until the limiting reactant is consumed, leaving excess reactant.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "இந்த விகிதத்தை மாற்றினால் வினை சரியாக நடக்காது."
          }
        ],
        "description": "Stating that if the ratio is altered the reaction will not happen properly is chemically imprecise and misleading; reactants react in their stoichiometric ratio regardless of initial proportions, leaving excess reagent unreacted.",
        "correction": "தொடக்கத்தில் உள்ள பொருட்களின் விகிதத்தை மாற்றினாலும் வினை நிகழும்; ஆனால் ஒரு பொருள் (வரம்பு வினைபடுபொருள்) முழுமையாகத் தீர்ந்துவிடும், மற்றொன்று மீதமிருக்கும்.",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### மோல் விகிதம் என்றால் என்ன?
வேதியியலில் நாம் பொருட்களை **மோல்** என்ற அலகில் அளக்கிறோம் (1 மோல் = 6.022 × 10²³ துகள்கள்). மேலே உள்ள எண்கள் மோல் விகிதத்தையும் காட்டுகின்றன:

- 2 மோல் H₂ + 1 மோல் O₂ → 2 மோல் H₂O

அதாவது, **2 மோல் ஹைட்ரஜன்**க்கு **1 மோல் ஆக்ஸிஜன்** தேவை. இந்த விகிதத்தை மாற்றினால் வினை சரியாக நடக்காது.
```


## u4: Stoichiometric ratio in methane combustion

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
    "reason": "The combustion equation is properly balanced and the stated stoichiometric ratios are correct.",
    "errors": []
  }
}
```

```text
### இன்னொரு உதாரணம்: மீத்தேன் எரிதல்
CH₄ + O₂ → CO₂ + H₂O  
சமநிலைப்படுத்திய பிறகு:  
**CH₄ + 2O₂ → CO₂ + 2H₂O**

விகிதம்:
- CH₄ : O₂ = **1 : 2**
- CH₄ : CO₂ = **1 : 1**
- O₂ : H₂O = **2 : 2** (அல்லது 1 : 1)
```


## u5: Importance and practical applications of stoichiometric ratios

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
    "verdict": "contains_error",
    "reason": "The Tamil translation 'வரம்பு உற்பத்திப் பொருள்' incorrectly translates 'Limiting reagent' as limiting product ('உற்பத்திப் பொருள்' means product), whereas limiting reagent refers to a reactant ('வினைபடுபொருள்').",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "**வரம்பு உற்பத்திப் பொருள் (Limiting reagent)**: எந்தப் பொருள் முதலில் தீர்ந்துவிடுமோ அது வினையை நிறுத்திவிடும்."
          }
        ],
        "description": "Limiting reagent is translated as 'வரம்பு உற்பத்திப் பொருள்' (limiting product). In chemistry, reagents/reactants are 'வினைபடுபொருட்கள்' (reactants), whereas 'உற்பத்திப் பொருள்' refers to products.",
        "correction": "வரம்பு வினைபடுபொருள் (Limiting reactant/reagent)",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### இந்த விகிதம் ஏன் முக்கியம்?
1. **தேவையான அளவு கணக்கிட**: எத்தனை கிராம் ஹைட்ரஜன் எடுத்தால் எத்தனை கிராம் நீர் வரும் என்பதை அறியலாம்.
2. **வரம்பு உற்பத்திப் பொருள் (Limiting reagent)**: எந்தப் பொருள் முதலில் தீர்ந்துவிடுமோ அது வினையை நிறுத்திவிடும்.
3. **தொழிலில் பயன்**: உரம், மருந்து, எரிபொருள் தயாரிப்பில் சரியான விகிதம் தெரிந்தால் வீணாகாது.
```


## u6: Summary recap of key rules about stoichiometric ratios

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
    "reason": "Correctly summarizes key takeaways: balance the equation first, coefficients show the ratio, and stoichiometric ratios apply to moles/particles, not direct masses.",
    "errors": []
  }
}
```

```text
### சுருக்கமாக நினைவில் கொள்ள வேண்டியவை
- எப்போதும் சமன்பாட்டை முதலில் சமநிலைப்படுத்து.
- குணகங்களே விகிதத்தைக் காட்டும்.
- விகிதம் மோல் அல்லது துகள்களின் எண்ணிக்கையில் இருக்கும் (நிறையில் அல்ல).
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "Whether u5 could be split into separate application examples (calculating mass, limiting reagent, industrial synthesis) or kept together as a single concept on why stoichiometry matters.",
    "proposed_resolution": "Kept as a single CONCEPT unit explaining the significance and utility of stoichiometric ratios, as the points are presented together in a numbered list answering the single question 'Why is this ratio important?'."
  }
]
```

## Unassigned text for coverage review

```text
வணக்கம் மாணவரே! நீங்கள் வேதி வினைக் கூறுகளின் விகிதம் (stoichiometric ratio) பற்றி கேட்டீர்கள். இதை ஒரு நல்ல ஆசிரியர் மாதிரி, எளிய உதாரணங்களுடன் படிப்படியாக விளக்குகிறேன்.


```

```text


இப்போது உனக்கு புரிந்ததா? இன்னும் எந்த உதாரணத்தை விரிவாக விளக்க வேண்டும்? அல்லது ஒரு கணக்கு (எ.கா. 5 மோல் H₂ இருந்தால் எத்தனை மோல் நீர் வரும்?) கேட்க வேண்டுமா? சொல்லு, உனக்கு ஏற்றவாறு விளக்குகிறேன்!
```
