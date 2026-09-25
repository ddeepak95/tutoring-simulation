# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, balanced chemical equations, and mole-mass relationships in reactions",
  "topic_match": "on_topic",
  "reason": "The response clearly and accurately teaches the requested topic of stoichiometry, including its definition, analogy, theoretical basis, stoichiometric coefficients, solving procedure, and a worked example.",
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
| u1 | ANALOGY | Kitchen recipe analogy comparing scaling tea ingredients to stoichiometry | {} | accurate |
| u2 | CONCEPT | Formal chemical definition of stoichiometry | {"depth": "statement"} | accurate |
| u3 | CONCEPT | Greek etymological origin of the term stoichiometry | {"depth": "statement"} | accurate |
| u4 | CONCEPT | Requirement of balanced chemical equations based on conservation of mass | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Water synthesis reaction illustrating stoichiometric coefficients at molecular, molar, and mass levels | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u6 | PROCEDURE | Four-step general method for solving stoichiometry problems | {} | accurate |
| u7 | EXAMPLE | Worked problem calculating required oxygen mass for reaction with hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | STUDY_SUPPORT | Summary recap of the core intuition of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Kitchen recipe analogy comparing scaling tea ingredients to stoichiometry

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "मान लीजिए आपको **चाय** बनानी है:"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The tea recipe analogy validly maps scaling proportional ingredients to stoichiometric relationships.",
    "errors": []
  }
}
```

```text
मान लीजिए आपको **चाय** बनानी है:
* **रेसिपी:** 1 कप दूध + 1 चम्मच चीनी + 1 चम्मच चायपत्ती = **1 कप चाय**

अगर आपके घर 5 मेहमान आ जाएं (यानी आपको 5 कप चाय बनानी हो), तो आप क्या करेंगे? आप सभी चीजों को 5 से गुणा कर देंगे:
* 5 कप दूध + 5 चम्मच चीनी + 5 चम्मच चायपत्ती = **5 कप चाय**

**बस, यही Stoichiometry है!** 
किचन में इसे हम "रेसिपी" कहते हैं, और केमिस्ट्री की भाषा में इसे **Stoichiometry** कहा जाता है।
```


## u2: Formal chemical definition of stoichiometry

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
    "reason": "The definition accurately describes stoichiometry as the quantitative relationship between reactants and products in a chemical reaction.",
    "errors": []
  }
}
```

```text
> **परिभाषा:** किसी रासायनिक अभिक्रिया (Chemical Reaction) में अभिकारकों (Reactants) और उत्पादों (Products) की मात्राओं (Mass, Moles, Volume) के बीच के गणितीय संबंध को **Stoichiometry** कहते हैं।
```


## u3: Greek etymological origin of the term stoichiometry

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
    "reason": "The Greek roots stoicheion (element) and metron (measure) are factually correct.",
    "errors": []
  }
}
```

```text
यह ग्रीक भाषा के दो शब्दों से मिलकर बना है:
* **Stoicheion** = तत्व (Element)
* **Metron** = मापना (Measure)
यानी **"तत्वों को मापना"**।
```


## u4: Requirement of balanced chemical equations based on conservation of mass

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
    "reason": "Correctly states the necessity of a balanced equation for stoichiometry based on the Law of Conservation of Mass.",
    "errors": []
  }
}
```

```text
स्टोइकियोमेट्री का कोई भी सवाल हल करने के लिए पहली शर्त यह है कि आपकी **रासायनिक समीकरण संतुलित (Balanced) होनी चाहिए** (क्योंकि द्रव्यमान संरक्षण का नियम / Law of Conservation of Mass कहता है कि द्रव्यमान न तो बनाया जा सकता है, न नष्ट किया जा सकता है)।
```


## u5: Water synthesis reaction illustrating stoichiometric coefficients at molecular, molar, and mass levels

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
    "reason": "The reaction, stoichiometric coefficients, and conversions to molecules, moles, and masses are mathematically and chemically accurate.",
    "errors": []
  }
}
```

```text
**उदाहरण देखते हैं:** पानी बनने की अभिक्रिया
$$2H_2 + O_2 \rightarrow 2H_2O$$

यहाँ जो आगे नंबर लिखे हैं ($H_2$ के आगे **2**, $O_2$ के आगे **1** (छुपा हुआ), और $H_2O$ के आगे **2**), इन्हें **Stoichiometric Coefficients** कहते हैं।

इसका मतलब क्या है?
1. **अणुओं (Molecules) के रूप में:**
   * हाइड्रोजन के 2 अणु + ऑक्सीजन का 1 अणु = पानी के 2 अणु
2. **मोल (Moles) के रूप में (सबसे महत्वपूर्ण):**
   * **2 मोल $H_2$ + 1 मोल $O_2$ $\rightarrow$ 2 मोल $H_2O$**
3. **द्रव्यमान (Mass) के रूप में:**
   * $2 \times 2\text{ g } (H_2) + 32\text{ g } (O_2) = 2 \times 18\text{ g } (H_2O)$
   * यानी **$4\text{ g } H_2 + 32\text{ g } O_2 = 36\text{ g } H_2O$** (दोनों तरफ कुल 36 ग्राम है!)
```


## u6: Four-step general method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four-step algorithm (balance equation, convert to moles, apply mole ratio, convert to target units) is the standard and correct procedure.",
    "errors": []
  }
}
```

```text
अगर परीक्षा में Stoichiometry का कोई सवाल आ जाए, तो बस ये 4 कदम याद रखना:

* **Step 1:** समीकरण को **बैलेंस (संतुलित)** करो।
* **Step 2:** जो भी मात्रा (Grams या Litres में) दी गई है, उसे **मोल्स (Moles)** में बदलो।  
  $$\text{Moles} = \frac{\text{दिया गया भार (Given Mass)}}{\text{मोलर द्रव्यमान (Molar Mass)}}$$
* **Step 3:** समीकरण के **अनुपात (Mole Ratio)** का इस्तेमाल करके पता लगाओ कि दूसरे पदार्थ के कितने मोल्स बनेंगे या चाहिए।
* **Step 4:** अंत में, पूछे गए उत्तर के अनुसार मोल्स को वापस **ग्राम या लीटर** में बदल लो।
```


## u7: Worked problem calculating required oxygen mass for reaction with hydrogen

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
    "reason": "Every calculation step (molar masses, moles of H2, mole ratio 2:1, moles of O2, mass of O2 = 64 g) is correct.",
    "errors": []
  }
}
```

```text
**सवाल:** $8\text{ ग्राम } H_2$ को पूरी तरह जलाने के लिए कितने ग्राम $O_2$ की आवश्यकता होगी?

1. **समीकरण:** $2H_2 + O_2 \rightarrow 2H_2O$
2. **मोल्स निकालो:** $H_2$ का मोलर द्रव्यमान = $2\text{ g/mol}$  
   * $H_2$ के मोल्स = $\frac{8}{2} = 4\text{ मोल्स}$
3. **अनुपात देखो:** समीकरण कहता है कि **2 मोल $H_2$** के लिए **1 मोल $O_2$** चाहिए (यानी आधा)।  
   * तो **4 मोल $H_2$** के लिए कितने मोल $O_2$ चाहिए होंगे? = $2\text{ मोल्स } O_2$
4. **ग्राम में बदलो:** $O_2$ का मोलर द्रव्यमान = $32\text{ g/mol}$  
   * $O_2$ का भार = $2\text{ मोल} \times 32\text{ g/mol} = \mathbf{64\text{ ग्राम}}$।

**उत्तर:** हमें **64 ग्राम** ऑक्सीजन की जरूरत होगी!
```


## u8: Summary recap of the core intuition of stoichiometry

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
    "reason": "Accurately and concisely summarizes the primary objective and central role of moles in stoichiometry.",
    "errors": []
  }
}
```

```text
Stoichiometry सिर्फ इतना बताती है कि **"अगर इतना डालोगे, तो कितना बनेगा"** या **"इतना बनाने के लिए, कितना डालना पड़ेगा"**। इसका दिल **'मोल' (Mole)** है।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3"
    ],
    "issue": "Whether the definition of stoichiometry and its Greek etymology should be combined into a single CONCEPT unit or kept as two separate units.",
    "proposed_resolution": "Separated into two CONCEPT units because the source explicitly partitions them into separate numbered sections with distinct teaching jobs (formal definition vs. word roots)."
  },
  {
    "unit_ids": [
      "u4",
      "u5"
    ],
    "issue": "Whether Section 3 should be kept together as a single CONCEPT unit explaining balanced equations and stoichiometric coefficients via an illustrative example, or split into a CONCEPT unit and an illustrative EXAMPLE unit.",
    "proposed_resolution": "Split into u4 (CONCEPT stating the foundational law of conservation of mass requirement) and u5 (EXAMPLE developing the specific water formation reaction across molecular, molar, and mass levels) because the example is explicitly introduced ('उदाहरण देखते हैं') and elaborates concrete quantitative representations."
  }
]
```

## Unassigned text for coverage review

```text
नमस्ते! आज हम केमिस्ट्री का एक बहुत ही महत्वपूर्ण और दिलचस्प टॉपिक समझने जा रहे हैं — **स्टोइकियोमेट्री (Stoichiometry)**। 

नाम सुनकर डरने की बिल्कुल जरूरत नहीं है, यह सुनने में जितना मुश्किल लगता है, समझने में उतना ही आसान है!

---

### 1. आसान शब्दों में Stoichiometry क्या है? (The Kitchen Analogy)


```

```text


---

### 2. यह शब्द आया कहाँ से?

```

```text


---

### 3. Stoichiometry का सबसे बड़ा नियम: संतुलित समीकरण (Balanced Equation)

```

```text


---

### 4. एग्जाम में सवाल कैसे हल करें? (4 Golden Steps)


```

```text


---

### एक छोटा-सा सवाल करके देखते हैं:

```

```text


---

### सारांश (Summary)

```

```text
 

क्या आपको यह समझ आया, या हम इसका एक और उदाहरण हल करें?
```
