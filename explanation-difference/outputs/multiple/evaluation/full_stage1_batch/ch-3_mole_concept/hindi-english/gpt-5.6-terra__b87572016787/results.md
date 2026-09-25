# Stage 1: Hindi / mole concept

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "mole concept",
  "observed_topic": "The mole concept, Avogadro's number, molar mass, stoichiometric formulas, and molar volume of gases with worked examples",
  "topic_match": "on_topic",
  "reason": "The response clearly and comprehensively explains the mole concept in chemistry, including Avogadro's number, molar mass, conversion formulas, molar volume at STP, and stoichiometric applications.",
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
| u1 | CONCEPT | Introduction and need for the mole unit | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Comparing mole to counting units like dozen and score | {} | accurate |
| u3 | CONCEPT | Avogadro's number and definition of mole | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition of molar mass and its relationship with atomic mass | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | Formula for calculating moles from given mass | {} | accurate |
| u6 | EXAMPLE | Calculating moles in 18 g of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | EXAMPLE | Calculating moles in 44 g of carbon dioxide | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | PROCEDURE | Formula relating moles and number of particles | {} | accurate |
| u9 | EXAMPLE | Calculating number of molecules in 2 moles of oxygen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u10 | STUDY_SUPPORT | Diagram and summary of mole-mass-particle conversion relationships | {"subtype": "study_strategy"} | accurate |
| u11 | CONCEPT | Mole concept for gases and molar volume at STP | {"depth": "explanation"} | accurate |
| u12 | EXAMPLE | Calculating moles and molecules for 11.2 L of oxygen gas at STP | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u13 | CONCEPT | Distinction between atom, molecule, and ion in the context of moles | {"depth": "explanation"} | accurate |
| u14 | EXAMPLE | Calculating total atoms in 1 mole of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u15 | CONCEPT | Using moles in chemical equations and conservation of mass | {"depth": "explanation"} | accurate |
| u16 | STUDY_SUPPORT | Summary table of formulas for quick revision | {"subtype": "recap"} | accurate |
| u17 | STUDY_SUPPORT | One-line recap of the mole concept | {"subtype": "recap"} | accurate |

## u1: Introduction and need for the mole unit

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
    "reason": "Correctly explains why a counting unit like the mole is necessary in chemistry due to the extremely small size and large number of particles.",
    "errors": []
  }
}
```

```text
रसायन विज्ञान में पदार्थ की मात्रा बहुत छोटे कणों—जैसे परमाणु, अणु और आयन—के रूप में होती है। ये कण इतने छोटे होते हैं कि इन्हें एक-एक करके गिनना संभव नहीं है।

इसलिए वैज्ञानिकों ने कणों को गिनने के लिए एक विशेष इकाई बनाई: **मोल (mole)**।
```


## u2: Comparing mole to counting units like dozen and score

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "1 दर्जन = 12 वस्तुएँ"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly draws an analogy between familiar grouping units (dozen, score) and the mole as a counting unit.",
    "errors": []
  }
}
```

```text
जैसे:

- 1 दर्जन = 12 वस्तुएँ  
- 1 स्कोर = 20 वस्तुएँ  
- उसी प्रकार **1 मोल = \(6.022 \times 10^{23}\) कण**
```


## u3: Avogadro's number and definition of mole

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
    "reason": "Accurately defines Avogadro's constant and 1 mole of a substance in terms of fundamental particles.",
    "errors": []
  }
}
```

```text
इस संख्या को **एवोगैड्रो संख्या (Avogadro Number)** कहते हैं।

\[
N_A = 6.022 \times 10^{23}
\]

अर्थात:

- 1 mol कार्बन परमाणु = \(6.022 \times 10^{23}\) कार्बन परमाणु  
- 1 mol पानी के अणु = \(6.022 \times 10^{23}\) पानी के अणु  
- 1 mol सोडियम आयन = \(6.022 \times 10^{23}\) सोडियम आयन  

---

# 1. मोल की परिभाषा

**किसी पदार्थ की वह मात्रा जिसमें \(6.022 \times 10^{23}\) कण उपस्थित हों, उसे 1 मोल कहते हैं।**

कण परमाणु, अणु, आयन, इलेक्ट्रॉन आदि कुछ भी हो सकते हैं।
```


## u4: Definition of molar mass and its relationship with atomic mass

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
    "reason": "Correctly defines molar mass, its SI/common units, and illustrates with carbon how atomic mass in u corresponds to molar mass in g/mol.",
    "errors": []
  }
}
```

```text
# 2. मोलर द्रव्यमान (Molar Mass)

**किसी पदार्थ के 1 मोल का द्रव्यमान मोलर द्रव्यमान कहलाता है।**

इसकी इकाई होती है:

\[
\text{g mol}^{-1}
\]

या simply **g/mol**

### उदाहरण: कार्बन
कार्बन का परमाणु द्रव्यमान = 12 u

इसलिए कार्बन का मोलर द्रव्यमान:

\[
12\ g/mol
\]

अर्थात:

\[
12\ g \text{ कार्बन} = 1\ mol \text{ कार्बन परमाणु}
\]

और इसमें होंगे:

\[
6.022 \times 10^{23} \text{ परमाणु}
\]
```


## u5: Formula for calculating moles from given mass

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Presents the standard formula n = m/M for finding the number of moles from mass correctly.",
    "errors": []
  }
}
```

```text
# 3. मोल निकालने का सूत्र

यदि किसी पदार्थ का द्रव्यमान दिया हो, तो:

\[
\boxed{\text{मोल की संख्या} = \frac{\text{दिया गया द्रव्यमान}}{\text{मोलर द्रव्यमान}}}
\]

अर्थात:

\[
\boxed{n = \frac{m}{M}}
\]

जहाँ:

- \(n\) = मोलों की संख्या  
- \(m\) = दिया गया द्रव्यमान (g में)  
- \(M\) = मोलर द्रव्यमान (g/mol में)  
```


## u6: Calculating moles in 18 g of water

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
    "reason": "Calculations of the molar mass of H2O and the resulting mole amount are completely accurate.",
    "errors": []
  }
}
```

```text
## उदाहरण 1: 18 g पानी में कितने मोल हैं?

पानी का सूत्र:

\[
H_2O
\]

मोलर द्रव्यमान:

\[
= 2(1) + 16 = 18\ g/mol
\]

अब,

\[
n = \frac{m}{M} = \frac{18}{18} = 1\ mol
\]

**उत्तर: 18 g पानी = 1 mol पानी**
```


## u7: Calculating moles in 44 g of carbon dioxide

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
    "reason": "Correctly calculates the molar mass of CO2 (44 g/mol) and finds the number of moles.",
    "errors": []
  }
}
```

```text
## उदाहरण 2: 44 g कार्बन डाइऑक्साइड में कितने मोल हैं?

\[
CO_2
\]

मोलर द्रव्यमान:

\[
= 12 + 2(16) = 44\ g/mol
\]

\[
n = \frac{44}{44} = 1\ mol
\]

**उत्तर: 44 g \(CO_2\) = 1 mol \(CO_2\)**
```


## u8: Formula relating moles and number of particles

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately gives the formula N = n * NA relating number of particles to number of moles.",
    "errors": []
  }
}
```

```text
# 4. मोल और कणों की संख्या का संबंध

\[
\boxed{\text{कणों की संख्या} = \text{मोल} \times 6.022 \times 10^{23}}
\]

या,

\[
\boxed{N = nN_A}
\]

जहाँ:

- \(N\) = कणों की संख्या  
- \(n\) = मोल  
- \(N_A\) = एवोगैड्रो संख्या  
```


## u9: Calculating number of molecules in 2 moles of oxygen

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
    "reason": "Calculations and clarification distinguishing molecules from atoms are correct.",
    "errors": []
  }
}
```

```text
## उदाहरण 3: 2 mol ऑक्सीजन अणुओं में कितने अणु होंगे?

\[
N = nN_A
\]

\[
N = 2 \times 6.022 \times 10^{23}
\]

\[
N = 1.2044 \times 10^{24}
\]

**उत्तर: \(1.2044 \times 10^{24}\) ऑक्सीजन अणु**

ध्यान दें: यदि पदार्थ \(O_2\) है, तो ये **अणु** हैं, परमाणु नहीं।
```


## u10: Diagram and summary of mole-mass-particle conversion relationships

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
    "reason": "The memory scheme and conversion formulas are accurate.",
    "errors": []
  }
}
```

```text
# 5. मोल, द्रव्यमान और कण: मुख्य संबंध

इसे ऐसे याद रखें:

\[
\text{Mass (g)} \xleftrightarrow{\div/\times \text{ molar mass}} \text{Moles} \xleftrightarrow{\times/\div N_A} \text{Particles}
\]

### सूत्रों का सार

\[
\boxed{n = \frac{m}{M}}
\]

\[
\boxed{m = n \times M}
\]

\[
\boxed{N = n \times N_A}
\]

\[
\boxed{n = \frac{N}{N_A}}
\]
```


## u11: Mole concept for gases and molar volume at STP

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
    "reason": "Correctly states the molar volume of an ideal gas at traditional STP (0 °C, 1 atm) as 22.4 L and provides the corresponding mole calculation formula.",
    "errors": []
  }
}
```

```text
# 6. गैसों के लिए मोल कॉन्सेप्ट

मानक ताप और दाब (STP: \(0^\circ C\), 1 atm) पर:

\[
\boxed{1\ mol \text{ गैस} = 22.4\ L}
\]

इसे **मोलर आयतन (Molar Volume)** कहते हैं।

अतः:

\[
\boxed{n = \frac{\text{गैस का आयतन}}{22.4}}
\]

> यह सूत्र सामान्यतः STP पर ही उपयोग किया जाता है।
```


## u12: Calculating moles and molecules for 11.2 L of oxygen gas at STP

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
    "reason": "Calculations for moles and number of molecules from molar volume are fully correct.",
    "errors": []
  }
}
```

```text
## उदाहरण 4: STP पर 11.2 L ऑक्सीजन गैस के कितने मोल होंगे?

\[
n = \frac{V}{22.4}
\]

\[
n = \frac{11.2}{22.4} = 0.5\ mol
\]

**उत्तर: 0.5 mol \(O_2\)**

अब अणुओं की संख्या:

\[
N = 0.5 \times 6.022 \times 10^{23}
\]

\[
N = 3.011 \times 10^{23}
\]
```


## u13: Distinction between atom, molecule, and ion in the context of moles

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
    "reason": "Clearly clarifies the conceptual difference between atoms, molecules, and ions, and how 1 mole of each contains Avogadro's number of that specific entity.",
    "errors": []
  }
}
```

```text
# 7. परमाणु, अणु और आयन में अंतर

### (i) परमाणु (Atom)
एक तत्व का सबसे छोटा कण।

उदाहरण: He, Na, C

- 1 mol He = \(6.022 \times 10^{23}\) हीलियम परमाणु

### (ii) अणु (Molecule)
दो या अधिक परमाणुओं से बना कण।

उदाहरण: \(H_2\), \(O_2\), \(H_2O\), \(CO_2\)

- 1 mol \(H_2O\) = \(6.022 \times 10^{23}\) पानी के अणु

### (iii) आयन (Ion)
आवेशित कण।

उदाहरण: \(Na^+\), \(Cl^-\), \(SO_4^{2-}\)

- 1 mol \(Na^+\) = \(6.022 \times 10^{23}\) सोडियम आयन
```


## u14: Calculating total atoms in 1 mole of water

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
    "reason": "Correctly shows the stoichiometric breakdown of atoms per mole of H2O and computes the total atom count.",
    "errors": []
  }
}
```

```text
# 8. बहुत महत्वपूर्ण उदाहरण: पानी में परमाणुओं की संख्या

मान लीजिए आपके पास 1 mol पानी है।

\[
1\ mol\ H_2O = 6.022 \times 10^{23} \text{ पानी के अणु}
\]

हर एक पानी के अणु में:

- 2 हाइड्रोजन परमाणु
- 1 ऑक्सीजन परमाणु

इसलिए 1 mol पानी में:

### हाइड्रोजन परमाणुओं के मोल

\[
2\ mol \text{ H atoms}
\]

### ऑक्सीजन परमाणुओं के मोल

\[
1\ mol \text{ O atoms}
\]

### कुल परमाणु

\[
3\ mol \text{ atoms}
\]

अर्थात कुल परमाणुओं की संख्या:

\[
3 \times 6.022 \times 10^{23}
\]

\[
= 1.8066 \times 10^{24}
\]
```


## u15: Using moles in chemical equations and conservation of mass

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
    "reason": "Accurately explains mole ratios from stoichiometric coefficients and confirms the law of conservation of mass using molar masses.",
    "errors": []
  }
}
```

```text
# 9. रासायनिक समीकरण में मोल का उपयोग

रासायनिक समीकरण में गुणांक (coefficients) पदार्थों के **मोल अनुपात** बताते हैं।

उदाहरण:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

इसका अर्थ है:

- 2 mol \(H_2\)
- 1 mol \(O_2\)
- मिलकर 2 mol \(H_2O\) बनाते हैं।

द्रव्यमान के रूप में:

- \(2 mol H_2 = 2 \times 2 = 4 g\)
- \(1 mol O_2 = 32 g\)
- \(2 mol H_2O = 2 \times 18 = 36 g\)

अर्थात:

\[
4g\ H_2 + 32g\ O_2 \rightarrow 36g\ H_2O
\]

यह **द्रव्यमान संरक्षण के नियम** को भी दिखाता है।
```


## u16: Summary table of formulas for quick revision

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
    "reason": "The formulas summarized in the table are all correct.",
    "errors": []
  }
}
```

```text
# जल्दी याद करने के लिए सारांश

| Quantity | Formula |
|---|---|
| मोल ज्ञात करने के लिए | \(\displaystyle n=\frac{m}{M}\) |
| द्रव्यमान ज्ञात करने के लिए | \(\displaystyle m=nM\) |
| कणों की संख्या | \(\displaystyle N=nN_A\) |
| मोल ज्ञात करने के लिए (कणों से) | \(\displaystyle n=\frac{N}{N_A}\) |
| STP पर गैस के मोल | \(\displaystyle n=\frac{V}{22.4}\) |

जहाँ:

\[
N_A = 6.022 \times 10^{23}
\]
```


## u17: One-line recap of the mole concept

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "जैसे दर्जन वस्तुओं की संख्या बताता है"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately captures the essence of the mole concept in a single sentence summary.",
    "errors": []
  }
}
```

```text
## एक पंक्ति में मोल कॉन्सेप्ट

**मोल पदार्थ की मात्रा बताने की इकाई है, जैसे दर्जन वस्तुओं की संख्या बताता है; लेकिन 1 मोल में \(6.022 \times 10^{23}\) कण होते हैं।**
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u2",
      "u3"
    ],
    "issue": "The introductory part contains a brief analogy comparing mole to dozen/score alongside definitions of mole and Avogadro's number.",
    "proposed_resolution": "Separated the explicit everyday analogy (u2) from the preceding motivation (u1) and subsequent formal definitions (u3), as it performs a distinct explanatory mapping function."
  },
  {
    "unit_ids": [
      "u10"
    ],
    "issue": "Section 5 presents both a mnemonic memory aid diagram and a list of formulas.",
    "proposed_resolution": "Classified as STUDY_SUPPORT with subtype 'study_strategy' because its primary explicit purpose is to guide memorization ('इसे ऐसे याद रखें:')."
  }
]
```

## Unassigned text for coverage review

```text
## मोल कॉन्सेप्ट (Mole Concept) क्या है?


```

```text


### सरल उदाहरण

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
