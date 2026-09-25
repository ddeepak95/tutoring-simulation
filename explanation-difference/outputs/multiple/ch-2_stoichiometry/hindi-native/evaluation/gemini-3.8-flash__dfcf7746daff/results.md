# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the requested topic of stoichiometry in detail, including its definition, the law of conservation of mass, balanced chemical equations, stoichiometric coefficients, mole-mass calculations, problem-solving steps, and real-world applications.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 50,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "EXAMPLE": 4,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 50,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 3,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Sandwich recipe analogy for stoichiometry (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "मान लीजिए आपको एक **सैंडविच** बनाना है।"}]}

Annotation rationale: Introduces the concept of fixed stoichiometric ratios using the everyday analogy of making a sandwich from bread and cheese.

Accuracy: **accurate**. The sandwich recipe analogy accurately illustrates stoichiometric ratios and proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते प्यारे छात्र! रसायन विज्ञान की इस खूबसूरत कक्षा में आपका स्वागत है।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | मुझे पता है कि **&quot;रससमीकरणमिति&quot; (Stoichiometry - स्टोइकीओमेट्री)** नाम सुनने में थोड़ा कठिन और डरावना लगता है, लेकिन यकीन मानिए, यह उतना ही आसान है जितना कि रसोई में चाय या मैगी बनाना!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | आइए, इसे बिल्कुल आसान भाषा में समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### 1. रससमीकरणमिति आखिर है क्या? (एक आसान उदाहरण) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | मान लीजिए आपको एक **सैंडविच** बनाना है।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | आपकी रेसिपी है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | **2 ब्रेड + 1 चीज़ स्लाइस = 1 सैंडविच** | ANALOGY | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p9 | अब अगर मैं आपसे पूछूँ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | * 10 ब्रेड से कितने सैंडविच बनेंगे? आप तुरंत कहेंगे – **5 सैंडविच** (और इसके लिए 5 चीज़ स्लाइस चाहिए होंगे)। | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u2: Definition and etymology of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the quantitative relationship between reactants and products in a chemical reaction and explains its Greek etymology.

Accuracy: **accurate**. The definition of stoichiometry and the Greek etymology ('stoicheion' meaning element and 'metron' meaning measure) are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | बस! यही **रससमीकरणमिति (Stoichiometry)** है।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | * **परिभाषा:** रसायन विज्ञान में, किसी रासायनिक अभिक्रिया (Chemical Reaction) में भाग लेने वाले पदार्थों (अभिकारक/Reactants) और बनने वाले पदार्थों (उत्पाद/Products) की मात्रा के हिसाब-किताब को ही **रससमीकरणमिति** कहते हैं। इसे आप **&quot;केमिस्ट्री की रेसिपी&quot;** कह सकते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | *(यह शब्द ग्रीक भाषा के दो शब्दों से बना है: &#x27;Stoicheion&#x27; यानी तत्व और &#x27;Metron&#x27; यानी मापना।)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Balanced chemical equations and stoichiometric coefficients (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "जैसे 1 दर्जन = 12 केले"}]}

Annotation rationale: Explains the law of conservation of mass as the governing rule for balancing chemical equations, and demonstrates how stoichiometric coefficients represent ratios of molecules and moles using water synthesis as an illustrative example.

Accuracy: **accurate**. The explanation correctly defines stoichiometric coefficients, demonstrates mole and molecule ratios in water synthesis, and accurately states the law of conservation of mass and Avogadro's number.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | ### 2. इसका सबसे बड़ा नियम: &#x27;संतुलित समीकरण&#x27; (Balanced Equation) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | जैसे रसोई में आप कोई चीज़ गायब नहीं कर सकते, वैसे ही प्रकृति में **द्रव्यमान संरक्षण का नियम (Law of Conservation of Mass)** काम करता है—*द्रव्यमान को न तो बनाया जा सकता है, न ही नष्ट किया जा सकता है।* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | इसलिए, स्टोइकीओमेट्री का पहला नियम है: **समीकरण हमेशा संतुलित (Balanced) होना चाहिए।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | **उदाहरण देखिए:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p19 | पानी बनने की अभिक्रिया: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | यहाँ आगे लिखे हुए नंबर ($2, 1, 2$) को **रससमीकरणमितीय गुणांक (Stoichiometric Coefficients)** कहते हैं। यह हमें &#x27;अनुपात&#x27; (Ratio) बताते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | * हाइड्रोजन के **2 अणु** + ऑक्सीजन का **1 अणु** मिलकर पानी के **2 अणु** बनाते हैं। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 | * या बड़े स्तर पर कहें तो: हाइड्रोजन के **2 मोल** + ऑक्सीजन का **1 मोल** मिलकर पानी के **2 मोल** बनाते हैं। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | *(नोट: &#x27;मोल&#x27; को आप केमिस्ट्री का &#x27;दर्जन&#x27; समझ सकते हैं, जैसे 1 दर्जन = 12 केले, वैसे ही 1 मोल = $6.022 \times 10^{23}$ कण।)* | ANALOGY | {} | [&#x27;prose&#x27;] |

## u4: Mass conservation calculation in water formation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates mass stoichiometry and proves conservation of mass by calculating molar masses and total masses of reactants and products in the synthesis of water.

Accuracy: **accurate**. All molar masses (H2 = 2 g/mol, O2 = 32 g/mol, H2O = 18 g/mol) and the mass balance (4 g + 32 g = 36 g) are correctly calculated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | ### 3. यह ग्राम (द्रव्यमान) में कैसे काम करता है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | आइए उसी पानी वाले उदाहरण को ग्राम में देखें: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | * $H_2$ (हाइड्रोजन) का मोलर द्रव्यमान = 2 ग्राम। तो $2H_2$ = $2 \times 2 = 4$ ग्राम। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | * $O_2$ (ऑक्सीजन) का मोलर द्रव्यमान = 32 ग्राम। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | * $H_2O$ (पानी) का मोलर द्रव्यमान = 18 ग्राम। तो $2H_2O$ = $2 \times 18 = 36$ ग्राम। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | समीकरण के अनुसार: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | **4 ग्राम हाइड्रोजन + 32 ग्राम ऑक्सीजन = 36 ग्राम पानी** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | जाँचिए:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | बाएँ हाथ की तरफ कुल भार = $4 + 32 = 36$ ग्राम। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | दाएँ हाथ की तरफ कुल भार = $36$ ग्राम। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | हिसाब बिल्कुल पक्का है! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |

## u5: Three-step method for solving stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable three-step sequence for tackling stoichiometry problems in examinations.

Accuracy: **accurate**. The procedural steps (balancing equation, converting mass to moles, and using stoichiometric ratios) form the correct standard methodology.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### 4. परीक्षा में प्रश्न कैसे हल करें? (3 आसान कदम) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | जब भी परीक्षा में रससमीकरणमिति का कोई सवाल आए, तो बस ये तीन कदम (Steps) याद रखना: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | 1. **कदम 1 (समीकरण संतुलित करें):** सबसे पहले रासायनिक समीकरण को बैलेंस करें। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 | 2. **कदम 2 (मोल में बदलें):** जो भी वज़न (ग्राम) दिया गया है, उसे **मोल** में बदल लें। ($\text{मोल} = \frac{\text{दिया गया भार}}{\text{मोलर द्रव्यमान}}$) | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p42 | 3. **कदम 3 (अनुपात से उत्तर निकालें):** संतुलित समीकरण के अनुपात को देखकर पता लगाएँ कि कितना उत्पाद बनेगा, और फिर ज़रूरत पड़ने पर उसे वापस ग्राम में बदल लें। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Application of stoichiometry in medicine formulation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p45", "quote": "अगर पैरासिटामोल बनाते समय केमिकल का अनुपात थोड़ा भी गलत हो गया, तो दवा ज़हर बन सकती है।"}]}

Annotation rationale: Illustrates the practical importance of stoichiometry in pharmaceutical manufacturing, citing paracetamol.

Accuracy: **accurate**. Accurately illustrates that incorrect reactant ratios in pharmaceutical synthesis can lead to toxic impurities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p44 | ### 5. हम इसे क्यों पढ़ते हैं? (दैनिक जीवन में उपयोग) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | * **दवाइयां बनाने में:** अगर पैरासिटामोल बनाते समय केमिकल का अनुपात थोड़ा भी गलत हो गया, तो दवा ज़हर बन सकती है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Application of stoichiometry in rocket propulsion (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the practical importance of stoichiometry in calculating the precise ratio of fuel to oxidizer in rocketry.

Accuracy: **accurate**. Accurately describes the role of stoichiometry in determining fuel and oxidizer proportions in rocket engines.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | * **रॉकेट साइंस में:** रॉकेट में कितना ईंधन और कितनी ऑक्सीजन भरनी है ताकि वह अंतरिक्ष तक पहुँच सके, यह गणना इसी से होती है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Application of stoichiometry in industrial manufacturing (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how industrial factories use stoichiometric calculations to prevent raw material wastage.

Accuracy: **accurate**. Accurately states that factories rely on exact stoichiometry to optimize raw material usage.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | * **फ़ैक्टरी में:** कोई भी कंपनी कच्चा माल बर्बाद नहीं करना चाहती, इसलिए वे सटीक हिसाब लगाते हैं। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Summary of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap defining stoichiometry as the mathematics of chemistry, along with an interactive teacher-student sign-off.

Accuracy: **accurate**. The recap accurately synthesizes the core meaning of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | ### सारांश (Summary): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | रससमीकरणमिति कुछ और नहीं, बस **रसायन विज्ञान का गणित** है, जो हमें बताता है कि कितना कच्चा माल डालने पर कितना उत्पाद मिलेगा। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p50 | क्या आपको यह समझ आया, या हम इस पर एक छोटा सा न्यूमेरिकल (सवाल) हल करके देखें? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

