# Stage 1: Hindi / mole concept

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "mole concept",
  "observed_topic": "The mole concept in chemistry, including Avogadro's number, molar mass, calculation formulas, and molar volume of gases",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains the mole concept, Avogadro's number, molar mass, conversions between mass, particles, and volume, with supporting examples and summary tables.",
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
    "u10",
    "u11",
    "u12",
    "u13",
    "u14",
    "u15",
    "u16",
    "u17"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Analogy of dozen to explain the mole and Avogadro's number | {} | accurate |
| u2 | CONCEPT | Reason why the mole unit is needed in chemistry | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Definition of particle types corresponding to 1 mole of different substances | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition and units of molar mass | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Molar mass and particle count for carbon | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | EXAMPLE | Molar mass and particle count for water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | PROCEDURE | Formula for calculating moles from mass | {} | accurate |
| u8 | EXAMPLE | Worked calculation of moles from mass for water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | PROCEDURE | Formula for calculating number of particles from moles | {} | accurate |
| u10 | EXAMPLE | Worked calculation of number of molecules in 2 moles of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u11 | PROCEDURE | Formula for calculating moles from number of particles | {} | accurate |
| u12 | EXAMPLE | Worked calculation of moles from given number of oxygen molecules | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u13 | CONCEPT | Molar volume of a gas at STP and related conversion formula | {"depth": "explanation"} | accurate |
| u14 | EXAMPLE | Worked calculation of moles of oxygen gas from volume at STP | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u15 | STUDY_SUPPORT | Summary table of formulas for mole conversions | {"subtype": "recap"} | accurate |
| u16 | STUDY_SUPPORT | Key takeaway points on the mole concept | {"subtype": "recap"} | accurate |
| u17 | EXAMPLE | Worked summary example of 1 mole of carbon dioxide | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |

## u1: Analogy of dozen to explain the mole and Avogadro's number

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "जैसे हम चीज़ों को गिनने के लिए “दर्जन” कहते हैं—\n\n- 1 दर्जन = 12 वस्तुएँ"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately links the everyday counting unit 'dozen' (12 items) to the chemical counting unit 'mole' (6.022 x 10^23 particles).",
    "errors": []
  }
}
```

```text
मोल (Mole) रसायन विज्ञान में पदार्थ की **बहुत बड़ी संख्या में कणों को गिनने** की इकाई है। जैसे हम चीज़ों को गिनने के लिए “दर्जन” कहते हैं—

- 1 दर्जन = 12 वस्तुएँ  
वैसे ही,
- **1 मोल = \(6.022 \times 10^{23}\) कण**

इस संख्या को **एवोगैड्रो संख्या (Avogadro’s number)** कहते हैं।
```


## u2: Reason why the mole unit is needed in chemistry

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
        "quote": "एक पानी की बूंद में भी अकल्पनीय रूप से बहुत सारे पानी के अणु होते हैं।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately explains the physical rationale for defining a macroscopic unit for microscopic entities like atoms and molecules.",
    "errors": []
  }
}
```

```text
परमाणु, अणु और आयन इतने छोटे होते हैं कि उन्हें एक-एक करके गिनना संभव नहीं है। उदाहरण के लिए, एक पानी की बूंद में भी अकल्पनीय रूप से बहुत सारे पानी के अणु होते हैं।

इसलिए वैज्ञानिकों ने कणों की विशाल संख्या को व्यक्त करने के लिए “मोल” का उपयोग किया।
```


## u3: Definition of particle types corresponding to 1 mole of different substances

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
    "reason": "Correctly defines how the constituent particle varies depending on whether the substance is monatomic, molecular, ionic, or subatomic.",
    "errors": []
  }
}
```

```text
1 मोल पदार्थ में हमेशा:

\[
6.022 \times 10^{23}
\]

कण होते हैं।

कण का अर्थ पदार्थ के अनुसार बदल सकता है:

| पदार्थ | 1 मोल में क्या होगा? |
|---|---|
| हीलियम (He) | \(6.022 \times 10^{23}\) हीलियम परमाणु |
| ऑक्सीजन गैस (\(O_2\)) | \(6.022 \times 10^{23}\) ऑक्सीजन अणु |
| सोडियम क्लोराइड (NaCl) | \(6.022 \times 10^{23}\) NaCl सूत्रक इकाइयाँ |
| इलेक्ट्रॉन | \(6.022 \times 10^{23}\) इलेक्ट्रॉन |
```


## u4: Definition and units of molar mass

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
    "reason": "Correctly defines molar mass as the mass of 1 mole of a substance in g/mol, noting that its numerical value equals atomic/molecular mass in unified atomic mass units.",
    "errors": []
  }
}
```

```text
किसी पदार्थ के **1 मोल का द्रव्यमान** उसका **मोलर द्रव्यमान** कहलाता है।

इसकी इकाई होती है:

\[
\text{ग्राम प्रति मोल (g/mol)}
\]

मोलर द्रव्यमान संख्यात्मक रूप से परमाणु/आणविक द्रव्यमान के बराबर होता है, पर उसकी इकाई g/mol होती है।
```


## u5: Molar mass and particle count for carbon

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
    "reason": "The atomic mass of carbon-12 (12 u) translates correctly to 12 g/mol, which corresponds to 1 mole and 6.022 x 10^23 carbon atoms.",
    "errors": []
  }
}
```

```text
कार्बन का परमाणु द्रव्यमान = 12 u

अतः कार्बन का मोलर द्रव्यमान:

\[
12\ \text{g/mol}
\]

इसका अर्थ:

\[
12\ \text{g कार्बन} = 1\ \text{मोल कार्बन परमाणु}
\]

और इनमें \(6.022 \times 10^{23}\) कार्बन परमाणु होंगे।
```


## u6: Molar mass and particle count for water

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
    "reason": "The molecular mass of H2O is calculated correctly as 18, giving a molar mass of 18 g/mol and equating 18 g to 1 mole and 6.022 x 10^23 molecules.",
    "errors": []
  }
}
```

```text
पानी का आणविक द्रव्यमान:

\[
2(1) + 16 = 18
\]

अतः पानी का मोलर द्रव्यमान:

\[
18\ \text{g/mol}
\]

यानि:

\[
18\ \text{g पानी} = 1\ \text{मोल पानी} = 6.022 \times 10^{23}\ \text{पानी के अणु}
\]
```


## u7: Formula for calculating moles from mass

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The standard relationship n = m / M is accurately presented with definitions of variables.",
    "errors": []
  }
}
```

```text
\[
\text{मोलों की संख्या} = \frac{\text{दिया गया द्रव्यमान (g)}}{\text{मोलर द्रव्यमान (g/mol)}}
\]

अथवा,

\[
n = \frac{m}{M}
\]

जहाँ:  
- \(n\) = मोलों की संख्या  
- \(m\) = द्रव्यमान  
- \(M\) = मोलर द्रव्यमान
```


## u8: Worked calculation of moles from mass for water

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
    "reason": "Calculation 36 / 18 = 2 mol is correct.",
    "errors": []
  }
}
```

```text
36 g पानी में मोल कितने हैं?

पानी का मोलर द्रव्यमान = 18 g/mol

\[
n = \frac{36}{18} = 2\ \text{mol}
\]

अर्थात 36 g पानी में 2 मोल पानी है।
```


## u9: Formula for calculating number of particles from moles

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The formula correctly multiplies the number of moles by Avogadro's constant to get total particles.",
    "errors": []
  }
}
```

```text
\[
\text{कणों की संख्या} = \text{मोल} \times 6.022 \times 10^{23}
\]
```


## u10: Worked calculation of number of molecules in 2 moles of water

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
    "reason": "The arithmetic 2 * 6.022 x 10^23 = 1.2044 x 10^24 is correct.",
    "errors": []
  }
}
```

```text
2 मोल पानी में अणुओं की संख्या:

\[
2 \times 6.022 \times 10^{23}
\]

\[
= 1.2044 \times 10^{24}
\]

अर्थात 2 मोल पानी में \(1.2044 \times 10^{24}\) पानी के अणु होते हैं।
```


## u11: Formula for calculating moles from number of particles

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly states that moles equal total particle count divided by Avogadro's number.",
    "errors": []
  }
}
```

```text
\[
\text{मोल} = \frac{\text{कणों की संख्या}}{6.022 \times 10^{23}}
\]
```


## u12: Worked calculation of moles from given number of oxygen molecules

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
    "reason": "Calculation (3.011 x 10^23) / (6.022 x 10^23) = 0.5 mol is correct.",
    "errors": []
  }
}
```

```text
यदि किसी नमूने में \(3.011 \times 10^{23}\) ऑक्सीजन अणु हैं, तो मोल होंगे:

\[
\frac{3.011 \times 10^{23}}{6.022 \times 10^{23}} = 0.5\ \text{mol}
\]
```


## u13: Molar volume of a gas at STP and related conversion formula

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
    "reason": "Correctly states the traditional standard molar volume of an ideal gas at STP (0 °C, 1 atm) as 22.4 L and gives the corresponding formula.",
    "errors": []
  }
}
```

```text
मानक ताप और दाब (STP: 0°C और 1 atm) पर:

\[
1\ \text{मोल गैस} = 22.4\ \text{लीटर}
\]

इसलिए:

\[
\text{मोल} = \frac{\text{गैस का आयतन (L)}}{22.4}
\]
```


## u14: Worked calculation of moles of oxygen gas from volume at STP

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
    "reason": "The calculation 44.8 / 22.4 = 2 mol is correct.",
    "errors": []
  }
}
```

```text
STP पर 44.8 L ऑक्सीजन गैस में मोल कितने होंगे?

\[
n = \frac{44.8}{22.4} = 2\ \text{mol}
\]
```


## u15: Summary table of formulas for mole conversions

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
    "reason": "All conversion formulas in the summary table are mathematically and scientifically correct.",
    "errors": []
  }
}
```

```text
| क्या ज्ञात है? | क्या निकालना है? | सूत्र |
|---|---|---|
| द्रव्यमान | मोल | \(\frac{m}{M}\) |
| मोल | द्रव्यमान | \(n \times M\) |
| मोल | कणों की संख्या | \(n \times 6.022 \times 10^{23}\) |
| कणों की संख्या | मोल | \(\frac{N}{6.022 \times 10^{23}}\) |
| गैस का आयतन (STP) | मोल | \(\frac{V}{22.4}\) |
```


## u16: Key takeaway points on the mole concept

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
    "reason": "All summary points accurately reflect the core principles of the mole concept.",
    "errors": []
  }
}
```

```text
1. **1 मोल में हमेशा \(6.022 \times 10^{23}\) कण होते हैं।**
2. अलग-अलग पदार्थों के 1 मोल का द्रव्यमान अलग होता है।
3. 1 मोल कार्बन = 12 g, लेकिन 1 मोल पानी = 18 g।
4. STP पर 1 मोल किसी भी आदर्श गैस का आयतन लगभग 22.4 L होता है।
5. मोल रासायनिक अभिक्रियाओं में पदार्थों की मात्रा की तुलना करने का सबसे महत्वपूर्ण तरीका है।
```

```text
संक्षेप में, **मोल पदार्थ की “गिनती” और “द्रव्यमान” के बीच पुल का काम करता है।**
```


## u17: Worked summary example of 1 mole of carbon dioxide

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
    "reason": "The molecular mass of CO2 is correctly computed as 44 g/mol, corresponding to 44 g per mole and 6.022 x 10^23 molecules.",
    "errors": []
  }
}
```

```text
कार्बन डाइऑक्साइड का सूत्र: \(CO_2\)

मोलर द्रव्यमान:

\[
12 + 2(16) = 44\ \text{g/mol}
\]

अतः:

\[
1\ \text{मोल CO}_2 = 44\ \text{g CO}_2
\]

और इसमें:

\[
6.022 \times 10^{23}
\]

CO₂ अणु होंगे।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "u1 introduces the mole concept via an analogy to a dozen. It could be classified as CONCEPT (depth: statement/explanation) or ANALOGY.",
    "proposed_resolution": "Classified as ANALOGY because the primary teaching mechanism used to introduce the concept and number is the explicit comparison to 'dozen' (1 dozen = 12 items, 1 mole = 6.022 x 10^23 particles)."
  },
  {
    "unit_ids": [
      "u7",
      "u8",
      "u9",
      "u10",
      "u11",
      "u12"
    ],
    "issue": "Each sub-part of Section 4 presents a general conversion formula followed by a specific worked example. They could either be combined into single EXAMPLE or PROCEDURE units, or kept separate.",
    "proposed_resolution": "Separated the reusable general calculation formulas (PROCEDURE) from their specific numerical demonstrations (EXAMPLE) following the guideline that when a source first teaches a general method and then separately applies it, they can be counted separately."
  },
  {
    "unit_ids": [
      "u16",
      "u17"
    ],
    "issue": "Section 7 contains a summary list of 5 points, followed by a short example for CO2, and ends with a concluding summary sentence. The concluding sentence could be a separate CONCEPT or part of u16.",
    "proposed_resolution": "Included the concluding sentence as a second excerpt of u16 since both function together as the closing review/recap of the lesson."
  }
]
```

## Unassigned text for coverage review

```text


---

## 1. मोल की आवश्यकता क्यों पड़ती है?


```

```text


---

## 2. 1 मोल का अर्थ


```

```text


---

## 3. मोलर द्रव्यमान (Molar Mass)


```

```text


### उदाहरण 1: कार्बन


```

```text


### उदाहरण 2: पानी (\(H_2O\))


```

```text


---

## 4. महत्वपूर्ण सूत्र

### (क) द्रव्यमान से मोल निकालना


```

```text
  

### उदाहरण


```

```text


---

### (ख) मोल से कणों की संख्या निकालना


```

```text


### उदाहरण


```

```text


---

### (ग) कणों की संख्या से मोल निकालना


```

```text


### उदाहरण


```

```text


---

## 5. गैसों के लिए मोल


```

```text


### उदाहरण


```

```text


---

## 6. एक उपयोगी सारणी


```

```text


---

## 7. याद रखने योग्य बातें


```

```text


---

### छोटा उदाहरण: CO₂ का 1 मोल


```
