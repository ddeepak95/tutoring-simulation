# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains the mole concept in Hindi, including its definition via counting analogies (dozen and pair), Avogadro's number, molar mass, conversion formulas, a worked numerical example, and a summary.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 60,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 7,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 60,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 4,
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy comparing mole to a dozen and a pair (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "जब आप बाज़ार में केले खरीदने जाते हैं, तो क्या बोलते हैं? *\"मुझे 1 दर्जन केले दीजिए।\"* "}, {"passage_id": "p9", "quote": "ठीक इसी तरह, जूते हमेशा **'जोड़ी' (Pair)** में आते हैं:"}]}

Annotation rationale: Introduces the concept of a mole by drawing a direct cross-domain comparison to familiar counting units such as a dozen of bananas and a pair of shoes.

Accuracy: **accurate**. The analogy accurately describes the mole as a counting unit for subatomic particles analogous to a dozen or a pair.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम केमिस्ट्री (Chemistry) का एक बहुत ही महत्वपूर्ण और बेसिक टॉपिक समझेंगे—**Mole Concept (मोल संकल्पना)**।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | अक्सर स्टूडेंट्स को यह टॉपिक थोड़ा मुश्किल लगता है, लेकिन यकीन मानिए, यह बाज़ार से सब्ज़ी या फल खरीदने जितना ही आसान है। आइए इसे बिल्कुल आसान तरीके से समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. &#x27;मोल&#x27; (Mole) आखिर है क्या? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | इसको समझने के लिए पहले एक उदाहरण लेते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | * जब आप बाज़ार में केले खरीदने जाते हैं, तो क्या बोलते हैं? *&quot;मुझे 1 दर्जन केले दीजिए।&quot;*  | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | * दुकानदार समझ जाता है कि आपको **12 केले** चाहिए।  | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | * यानी: **1 दर्जन = 12** | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | ठीक इसी तरह, जूते हमेशा **&#x27;जोड़ी&#x27; (Pair)** में आते हैं: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | * **1 जोड़ी = 2 जूते** | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | केमिस्ट्री में एटम्स (Atoms - परमाणु) और मॉलिक्यूल्स (Molecules - अणु) इतने छोटे होते हैं कि हम उन्हें आँखों से देख भी नहीं सकते और 1, 2, 3 करके गिन भी नहीं सकते।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | इसलिए, वैज्ञानिकों ने केमिस्ट्स के लिए एक &#x27;केमिस्ट्री का दर्जन&#x27; बनाया, जिसे हम **Mole (मोल)** कहते हैं! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition of Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the exact numerical value of 1 mole (6.022 x 10^23 particles) and identifies it as Avogadro's number (N_A).

Accuracy: **accurate**. The value of Avogadro's number and the definition of a mole in terms of constituent particles are correctly presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p14 | ### 2. एक मोल में कितनी चीज़ें होती हैं? (The Magic Number) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | जैसे 1 दर्जन में हमेशा 12 चीज़ें होती हैं, वैसे ही: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | &gt; **1 Mole = $6.022 \times 10^{23}$ कण (Particles)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p17 | इस संख्या को हम **Avogadro&#x27;s Number (आवोगाद्रो संख्या)** कहते हैं और इसे **$N_A$** से दर्शाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Application to carbon atoms (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates 1 mole specifically with carbon atoms.

Accuracy: **accurate**. Correctly states that 1 mole of carbon atoms contains 6.022 x 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | * **1 मोल कार्बन एटम्स** = $6.022 \times 10^{23}$ कार्बन के एटम्स। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Application to water molecules (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates 1 mole specifically with water molecules.

Accuracy: **accurate**. Correctly states that 1 mole of water molecules contains 6.022 x 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | * **1 मोल पानी के मॉलिक्यूल्स** = $6.022 \times 10^{23}$ पानी के मॉलिक्यूल्स। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Hypothetical illustration using marbles (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p20", "quote": "यहाँ तक कि अगर आपके पास **1 मोल मार्बल (कंचे)** हों, तो आपके पास $6.022 \\times 10^{23}$ कंचे होंगे! (यह संख्या इतनी बड़ी है कि पूरी पृथ्वी कंचों से ढक जाएगी!)"}]}

Annotation rationale: Uses a hypothetical macroscopic example of 1 mole of marbles covering the earth to convey the immense magnitude of Avogadro's number.

Accuracy: **accurate**. The scale comparison highlighting the vast size of Avogadro's number using marbles is conceptually accurate and a standard pedagogical illustration.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | * यहाँ तक कि अगर आपके पास **1 मोल मार्बल (कंचे)** हों, तो आपके पास $6.022 \times 10^{23}$ कंचे होंगे! (यह संख्या इतनी बड़ी है कि पूरी पृथ्वी कंचों से ढक जाएगी!) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Molar mass concept and determination from atomic mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p23", "quote": "दुकानदार 1-1 दाना गिनकर चावल नहीं बेचता, वह उसे **तौलता (weigh)** है। "}]}

Annotation rationale: Explains why chemists weigh instead of counting, defines molar mass, and explains the rule of converting atomic mass in u to grams.

Accuracy: **accurate**. The definition of molar mass and its numerical correspondence to atomic mass expressed in grams per mole are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | ### 3. मोल का वज़न से क्या रिश्ता है? (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | दुकानदार 1-1 दाना गिनकर चावल नहीं बेचता, वह उसे **तौलता (weigh)** है।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p24 | वैज्ञानिकों ने भी यही तरकीब निकाली: उन्होंने गिनने के बजाय **तौलना** शुरू किया। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p25 | किसी भी तत्व (element) के **1 मोल कणों का ग्राम (grams) में जो वज़न होता है**, उसे उसका **Molar Mass (मोलर द्रव्यमान)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | **यह कैसे निकालते हैं? बहुत आसान है:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | पीरियोडिक टेबल (Periodic Table) में जो **Atomic Mass (परमाणु भार)** लिखा होता है, बस उसके आगे &#x27;ग्राम&#x27; (g) लगा दो! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates determining the molar mass of carbon (12 g) from its atomic mass (12 u).

Accuracy: **accurate**. The atomic mass of carbon (12 u) and molar mass of carbon-12 (12 g) containing Avogadro's number of atoms are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | * **कार्बन (C):** इसका Atomic Mass 12 u है।  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |   * तो, **1 मोल कार्बन = 12 ग्राम** (यानी 12 ग्राम कार्बन में $6.022 \times 10^{23}$ एटम्स होंगे!) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Molar mass of oxygen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates determining the molar mass of oxygen atoms (16 g) from atomic mass (16 u).

Accuracy: **accurate**. The atomic mass and molar mass of oxygen atoms are accurately stated as 16 u and 16 g.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | * **ऑक्सीजन (O):** Atomic Mass 16 u है।  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 |   * तो, **1 मोल ऑक्सीजन = 16 ग्राम** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Molar mass calculation of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p36", "quote": "  * इसका मतलब, अगर आप एक घूंट में **18 ग्राम पानी** पीते हैं, तो आप असल में पानी के **$6.022 \\times 10^{23}$ मॉलिक्यूल्स** पी रहे हैं!"}]}

Annotation rationale: Works through computing the molecular molar mass of water (H2O) by summing atomic masses and connects 18 g to a sip of water.

Accuracy: **accurate**. The molecular mass calculation of H2O (2 + 16 = 18 g/mol) and its particle equivalent in 18 g are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | * **पानी ($H_2O$):**  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 |   * $H$ का भार = $1 \times 2 = 2$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 |   * $O$ का भार = 16 | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 |   * कुल भार = $2 + 16 = 18\text{ g/mol}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 |   * इसका मतलब, अगर आप एक घूंट में **18 ग्राम पानी** पीते हैं, तो आप असल में पानी के **$6.022 \times 10^{23}$ मॉलिक्यूल्स** पी रहे हैं! | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u10: Fundamental formulas for mole calculations (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents standard algebraic formulas for converting given mass and particle counts into moles.

Accuracy: **accurate**. The formulas n = m/M and n = N/N_A are correct representations of mole relationships.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### 4. परीक्षा के लिए ज़रूरी फॉर्मूले (Formula Sheet) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | न्यूमेरिकल्स (Numericals) सॉल्व करने के लिए आपको बस यह 2 मुख्य फॉर्मूले याद रखने हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | 1. **अगर वज़न (Mass) दिया हो और मोल निकालना हो:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 |    $$\text{Moles } (n) = \frac{\text{Given Mass (दिया गया वज़न)}}{\text{Molar Mass (मोलर द्रव्यमान)}} = \frac{m}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p42 | 2. **अगर कणों की संख्या (Particles) दी हो और मोल निकालना हो:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p43 |    $$\text{Moles } (n) = \frac{\text{Number of Particles (कणों की संख्या)}}{\text{Avogadro&#x27;s Number } (N_A)} = \frac{N}{6.022 \times 10^{23}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u11: Worked numerical problem for 36 grams of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a complete step-by-step worked solution calculating the number of moles and molecules in 36 g of water.

Accuracy: **accurate**. All calculations for moles (36/18 = 2 moles) and total molecules (2 * 6.022 * 10^23 = 1.2044 * 10^24 molecules) are mathematically and physically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p45 | ### 5. एक छोटा-सा सवाल हल करते हैं! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | **सवाल:** 36 ग्राम पानी ($H_2O$) में कितने मोल्स होंगे? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | **हल:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p48 | * दिया गया वज़न ($m$) = 36 ग्राम | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p49 | * पानी का मोलर मास ($M$) = 18 ग्राम | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p50 | * फॉर्मूला: $\text{Moles} = \frac{m}{M}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p51 | * $\text{Moles} = \frac{36}{18} = \mathbf{2 \text{ moles}}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p52 | *अगर कोई पूछे इसमें पानी के कितने मॉलिक्यूल्स हैं?* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | * $1 \text{ mole} = 6.022 \times 10^{23}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p54 | * $2 \text{ moles} = 2 \times 6.022 \times 10^{23} = \mathbf{1.2044 \times 10^{24} \text{ मॉलिक्यूल्स}}$। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u12: Summary recap of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key points of the mole concept into three concise takeaways and concludes the explanation.

Accuracy: **accurate**. The recap accurately synthesizes the definition of a mole, its numerical value, and its role as a bridge between particle count and mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p55 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p56 | ### संक्षेप में (Quick Summary): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | * **मोल क्या है?** सूक्ष्म कणों (atoms/molecules) को गिनने का एक पैमाना (यूनिट) है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p58 | * **1 मोल का मान:** $6.022 \times 10^{23}$ (Avogadro Number)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p59 | * **मोल का काम:** यह &#x27;कणों की संख्या&#x27; और &#x27;ग्राम में उनके वज़न&#x27; के बीच का पुल (Bridge) है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p60 | क्या आपको यह समझ आया, या आप किसी खास सवाल (numerical) को हल करना चाहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

