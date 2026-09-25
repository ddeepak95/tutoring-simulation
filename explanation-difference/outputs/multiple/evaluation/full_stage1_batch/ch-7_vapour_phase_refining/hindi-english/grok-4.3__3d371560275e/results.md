# Stage 1: Hindi / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Vapour phase refining: principles, general procedure, Mond process for nickel, Van Arkel process for titanium, advantages, and essential conditions/limitations.",
  "topic_match": "on_topic",
  "reason": "The explanation directly and accurately teaches vapour phase refining, including its definition, working mechanism, and both standard textbook examples (Mond process and Van Arkel process).",
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
| u1 | CONCEPT | Definition and basic principle of vapour phase refining | {"depth": "explanation"} | accurate |
| u2 | PROCEDURE | General step-by-step procedure of vapour phase refining | {} | accurate |
| u3 | EXAMPLE | Mond process for nickel purification | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | EXAMPLE | Van Arkel process for titanium and zirconium refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u5 | CONCEPT | Advantages and characteristics of vapour phase refining | {"depth": "explanation"} | accurate |
| u6 | CAVEAT | Essential conditions and limitations of vapour phase refining | {"subtype": "limitation"} | accurate |

## u1: Definition and basic principle of vapour phase refining

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
    "reason": "Correctly defines vapour phase refining and explains the underlying chemical principle of forming and decomposing a volatile compound.",
    "errors": []
  }
}
```

```text
यह धातुओं को शुद्ध करने की एक महत्वपूर्ण विधि है, जो खासकर उन धातुओं के लिए इस्तेमाल होती है जिनका यौगिक आसानी से वाष्प (गैस) बन जाता है।

### सरल परिभाषा
वाष्प प्रावस्था शोधन में अशुद्ध धातु को पहले एक **वाष्पशील यौगिक** (volatile compound) में बदल दिया जाता है। फिर इस यौगिक को गर्म करके तोड़ा जाता है, जिससे शुद्ध धातु अलग हो जाती है और अशुद्धियाँ पीछे रह जाती हैं।
```


## u2: General step-by-step procedure of vapour phase refining

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately describes the three general steps involved in the process: formation of a volatile compound, separation of the vapor, and thermal decomposition to recover the pure metal.",
    "errors": []
  }
}
```

```text
1. **अशुद्ध धातु को वाष्पशील यौगिक में बदलना**  
   अशुद्ध धातु को किसी रसायन (जैसे CO या आयोडीन) के साथ गर्म किया जाता है। इससे धातु का एक ऐसा यौगिक बनता है जो आसानी से वाष्प बन जाता है। अशुद्धियाँ इस यौगिक में नहीं घुलतीं या वाष्प नहीं बनातीं।

2. **वाष्प को अलग करना**  
   यह वाष्पशील यौगिक वाष्प के रूप में ऊपर उठ जाता है और एक अलग जगह पर ले जाया जाता है।

3. **यौगिक को विघटित करके शुद्ध धातु प्राप्त करना**  
   इस वाष्प को उच्च तापमान पर गर्म किया जाता है। यौगिक टूट जाता है और शुद्ध धातु जमा हो जाती है। गैसें (जैसे CO या आयोडीन) वापस निकल जाती हैं और दोबारा इस्तेमाल की जा सकती हैं।
```


## u3: Mond process for nickel purification

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The reaction equations and temperatures for formation (50–60°C / 330–350 K) and decomposition (150–180°C / 450–470 K) of nickel tetracarbonyl are chemically accurate.",
    "errors": []
  }
}
```

```text
**1. मॉन्ड प्रक्रम (Mond’s Process) – निकेल (Ni) के शोधन के लिए**
- अशुद्ध निकेल को 50–60°C पर कार्बन मोनोऑक्साइड (CO) गैस के साथ गर्म किया जाता है।
- प्रतिक्रिया:  
  **Ni + 4CO → Ni(CO)₄** (निकल टेट्राकार्बोनिल – वाष्पशील)
- फिर Ni(CO)₄ को 150–180°C पर गर्म किया जाता है।
- **Ni(CO)₄ → Ni (शुद्ध) + 4CO**
```


## u4: Van Arkel process for titanium and zirconium refining

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly represents the formation of volatile titanium tetraiodide and its subsequent thermal decomposition at high temperature (~1400°C / ~1700 K) to yield pure titanium.",
    "errors": []
  }
}
```

```text
**2. वैन आर्केल प्रक्रम (van Arkel Process) – टाइटेनियम (Ti) या जिरकोनियम (Zr) के लिए**
- अशुद्ध Ti को आयोडीन (I₂) के साथ गर्म किया जाता है।
- **Ti + 2I₂ → TiI₄** (टाइटेनियम टेट्राआयोडाइड – वाष्पशील)
- TiI₄ को 1400°C पर गर्म करने पर:
  **TiI₄ → Ti (शुद्ध) + 2I₂**
```


## u5: Advantages and characteristics of vapour phase refining

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
    "reason": "Explains why the method is effective (impurities do not volatilize) and accurately states that it yields ultra-pure metals.",
    "errors": []
  }
}
```

```text
### क्यों उपयोगी है यह विधि?
- बहुत उच्च शुद्धता (99.9% तक) मिलती है।
- अशुद्धियाँ वाष्प नहीं बनातीं, इसलिए अलग हो जाती हैं।
- मुख्य रूप से Ni, Ti, Zr जैसी धातुओं के लिए इस्तेमाल होती है।
```


## u6: Essential conditions and limitations of vapour phase refining

```json
{
  "attributes": {
    "subtype": "limitation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately highlights the necessary requirements and boundary of applicability for vapour phase refining (volatility of the compound and reversible thermal sensitivity).",
    "errors": []
  }
}
```

```text
### याद रखने वाली बातें
- यह विधि केवल उन्हीं धातुओं के लिए काम करती है जिनका यौगिक आसानी से वाष्प बनता हो।
- प्रक्रिया में तापमान बहुत महत्वपूर्ण है – एक तापमान पर यौगिक बनता है, दूसरे पर टूटता है।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "The section is headed 'याद रखने वाली बातें' (Things to remember), which could be interpreted as STUDY_SUPPORT (subtype: recap). However, the actual text explicitly articulates the two fundamental criteria/limitations for the applicability of vapour phase refining (only works if a volatile compound forms, and strict temperature conditions).",
    "proposed_resolution": "Classified as CAVEAT with subtype 'limitation' because its main teaching function is specifying the conditions and restricted scope of the method rather than merely reviewing earlier statements."
  }
]
```

## Unassigned text for coverage review

```text
**वाष्प प्रावस्था शोधन (Vapour Phase Refining)**

नमस्ते! आज हम **वाष्प प्रावस्था शोधन** को आसान भाषा में समझेंगे। 
```

```text


### प्रक्रिया कैसे काम करती है? (Step-by-step)

```

```text


### महत्वपूर्ण उदाहरण (High School के लिए)


```

```text


अगर आपको कोई उदाहरण और विस्तार से समझना हो, या डायग्राम के साथ, या कोई प्रश्न हो (जैसे Mond process का पूरा समीकरण), तो बताओ! 😊
```
