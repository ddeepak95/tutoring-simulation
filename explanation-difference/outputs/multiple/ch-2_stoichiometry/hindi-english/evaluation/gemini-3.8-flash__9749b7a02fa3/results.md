# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response explains stoichiometry in Hindi using analogies, formal definitions, etymology, balanced equations, a step-by-step problem-solving procedure, and a worked numerical example.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 54,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 54,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 1,
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Kitchen tea recipe analogy for stoichiometry (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "मान लीजिए आपको **चाय** बनानी है:"}]}

Annotation rationale: Introduces stoichiometry by drawing a cross-domain comparison to making and scaling a recipe for tea.

Accuracy: **accurate**. The analogy accurately illustrates proportional relationships between recipe ingredients and product amounts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम केमिस्ट्री का एक बहुत ही महत्वपूर्ण और दिलचस्प टॉपिक समझने जा रहे हैं — **स्टोइकियोमेट्री (Stoichiometry)**।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | नाम सुनकर डरने की बिल्कुल जरूरत नहीं है, यह सुनने में जितना मुश्किल लगता है, समझने में उतना ही आसान है! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. आसान शब्दों में Stoichiometry क्या है? (The Kitchen Analogy) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | मान लीजिए आपको **चाय** बनानी है: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | * **रेसिपी:** 1 कप दूध + 1 चम्मच चीनी + 1 चम्मच चायपत्ती = **1 कप चाय** | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | अगर आपके घर 5 मेहमान आ जाएं (यानी आपको 5 कप चाय बनानी हो), तो आप क्या करेंगे? आप सभी चीजों को 5 से गुणा कर देंगे: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | * 5 कप दूध + 5 चम्मच चीनी + 5 चम्मच चायपत्ती = **5 कप चाय** | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | **बस, यही Stoichiometry है!**  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | किचन में इसे हम &quot;रेसिपी&quot; कहते हैं, और केमिस्ट्री की भाषा में इसे **Stoichiometry** कहा जाता है।  | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Formal definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the formal definition of stoichiometry as the mathematical relationship between amounts of reactants and products in a chemical reaction.

Accuracy: **accurate**. The definition correctly describes stoichiometry in terms of relationships between quantities of reactants and products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | &gt; **परिभाषा:** किसी रासायनिक अभिक्रिया (Chemical Reaction) में अभिकारकों (Reactants) और उत्पादों (Products) की मात्राओं (Mass, Moles, Volume) के बीच के गणितीय संबंध को **Stoichiometry** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Etymology of the term stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the Greek roots of the term: stoicheion (element) and metron (measure).

Accuracy: **accurate**. The Greek etymology provided for 'stoicheion' and 'metron' is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p13 | ### 2. यह शब्द आया कहाँ से? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | यह ग्रीक भाषा के दो शब्दों से मिलकर बना है: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | * **Stoicheion** = तत्व (Element) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | * **Metron** = मापना (Measure) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | यानी **&quot;तत्वों को मापना&quot;**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Requirement of a balanced equation and conservation of mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical equations must be balanced before solving stoichiometry problems, grounded in the Law of Conservation of Mass.

Accuracy: **accurate**. Correctly states the prerequisite of equation balancing based on the conservation of mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### 3. Stoichiometry का सबसे बड़ा नियम: संतुलित समीकरण (Balanced Equation) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | स्टोइकियोमेट्री का कोई भी सवाल हल करने के लिए पहली शर्त यह है कि आपकी **रासायनिक समीकरण संतुलित (Balanced) होनी चाहिए** (क्योंकि द्रव्यमान संरक्षण का नियम / Law of Conservation of Mass कहता है कि द्रव्यमान न तो बनाया जा सकता है, न नष्ट किया जा सकता है)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Interpreting stoichiometric coefficients in water formation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how coefficients in the reaction 2H2 + O2 -> 2H2O map onto molecules, moles, and masses.

Accuracy: **accurate**. All calculations and interpretations across molecular, molar, and mass levels are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | **उदाहरण देखते हैं:** पानी बनने की अभिक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | यहाँ जो आगे नंबर लिखे हैं ($H_2$ के आगे **2**, $O_2$ के आगे **1** (छुपा हुआ), और $H_2O$ के आगे **2**), इन्हें **Stoichiometric Coefficients** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | इसका मतलब क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | 1. **अणुओं (Molecules) के रूप में:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p26 |    * हाइड्रोजन के 2 अणु + ऑक्सीजन का 1 अणु = पानी के 2 अणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | 2. **मोल (Moles) के रूप में (सबसे महत्वपूर्ण):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p28 |    * **2 मोल $H_2$ + 1 मोल $O_2$ $\rightarrow$ 2 मोल $H_2O$** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | 3. **द्रव्यमान (Mass) के रूप में:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p30 |    * $2 \times 2\text{ g } (H_2) + 32\text{ g } (O_2) = 2 \times 18\text{ g } (H_2O)$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p31 |    * यानी **$4\text{ g } H_2 + 32\text{ g } O_2 = 36\text{ g } H_2O$** (दोनों तरफ कुल 36 ग्राम है!) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u6: Four golden steps to solve stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable four-step method for solving stoichiometry problems on high school exams.

Accuracy: **accurate**. The four-step algorithm accurately reflects the standard stoichiometry conversion pathway (balance -> moles -> mole ratio -> desired units).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p33 | ### 4. एग्जाम में सवाल कैसे हल करें? (4 Golden Steps) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | अगर परीक्षा में Stoichiometry का कोई सवाल आ जाए, तो बस ये 4 कदम याद रखना: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p35 | * **Step 1:** समीकरण को **बैलेंस (संतुलित)** करो। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p36 | * **Step 2:** जो भी मात्रा (Grams या Litres में) दी गई है, उसे **मोल्स (Moles)** में बदलो।   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p37 |   $$\text{Moles} = \frac{\text{दिया गया भार (Given Mass)}}{\text{मोलर द्रव्यमान (Molar Mass)}}$$ | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p38 | * **Step 3:** समीकरण के **अनुपात (Mole Ratio)** का इस्तेमाल करके पता लगाओ कि दूसरे पदार्थ के कितने मोल्स बनेंगे या चाहिए। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p39 | * **Step 4:** अंत में, पूछे गए उत्तर के अनुसार मोल्स को वापस **ग्राम या लीटर** में बदल लो। | PROCEDURE | {} | [&#x27;list&#x27;] |

## u7: Worked problem calculating required oxygen mass (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a complete step-by-step worked solution determining the mass of O2 needed to react completely with 8 g of H2.

Accuracy: **accurate**. Calculations are entirely correct: 8 g H2 / 2 g/mol = 4 mol H2; 4 mol H2 requires 2 mol O2; 2 mol * 32 g/mol = 64 g O2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p41 | ### एक छोटा-सा सवाल करके देखते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | **सवाल:** $8\text{ ग्राम } H_2$ को पूरी तरह जलाने के लिए कितने ग्राम $O_2$ की आवश्यकता होगी? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | 1. **समीकरण:** $2H_2 + O_2 \rightarrow 2H_2O$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p44 | 2. **मोल्स निकालो:** $H_2$ का मोलर द्रव्यमान = $2\text{ g/mol}$   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 |    * $H_2$ के मोल्स = $\frac{8}{2} = 4\text{ मोल्स}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p46 | 3. **अनुपात देखो:** समीकरण कहता है कि **2 मोल $H_2$** के लिए **1 मोल $O_2$** चाहिए (यानी आधा)।   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p47 |    * तो **4 मोल $H_2$** के लिए कितने मोल $O_2$ चाहिए होंगे? = $2\text{ मोल्स } O_2$ | EXAMPLE | {} | [&#x27;list&#x27;] |
| p48 | 4. **ग्राम में बदलो:** $O_2$ का मोलर द्रव्यमान = $32\text{ g/mol}$   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p49 |    * $O_2$ का भार = $2\text{ मोल} \times 32\text{ g/mol} = \mathbf{64\text{ ग्राम}}$। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p50 | **उत्तर:** हमें **64 ग्राम** ऑक्सीजन की जरूरत होगी! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Summary of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the fundamental intuition of stoichiometry and highlights the central importance of the mole.

Accuracy: **accurate**. Accurately captures the essence of stoichiometric analysis and the central role of the mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p52 | ### सारांश (Summary) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | Stoichiometry सिर्फ इतना बताती है कि **&quot;अगर इतना डालोगे, तो कितना बनेगा&quot;** या **&quot;इतना बनाने के लिए, कितना डालना पड़ेगा&quot;**। इसका दिल **&#x27;मोल&#x27; (Mole)** है।  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p54 | क्या आपको यह समझ आया, या हम इसका एक और उदाहरण हल करें? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

