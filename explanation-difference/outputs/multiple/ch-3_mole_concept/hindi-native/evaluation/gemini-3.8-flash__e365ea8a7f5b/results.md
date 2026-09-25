# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains the mole concept in chemistry, including Avogadro's number, molar mass, and formula-based calculations, using pedagogical analogies and examples suited for high school students.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 53,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 53,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 3,
    "none": 8,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Dozen and century analogy for counting units (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "* \"मुझे **एक दर्जन** (1 Dozen) केले दे दो।\" दुकानदार तुरंत समझ जाता है कि तुम्हें **12 केले** चाहिए।"}]}

Annotation rationale: Introduces the concept of counting units by comparing the mole to familiar counting terms such as dozen and century.

Accuracy: **accurate**. The analogy correctly represents how dozen and century function as counting units.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! रसायन विज्ञान (Chemistry) की इस कक्षा में तुम्हारा स्वागत है।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | अक्सर छात्र &#x27;मोल&#x27; (Mole) का नाम सुनकर थोड़ा डर जाते हैं, लेकिन यकीन मानो, यह उतना ही आसान है जितना बाज़ार से केले खरीदना! आओ, इसे बिल्कुल सरल तरीके से समझते हैं। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. रोज़मर्रा की ज़िंदगी से एक उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | जब तुम बाज़ार जाते हो, तो दुकानदार से क्या कहते हो? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | * &quot;मुझे **एक दर्जन** (1 Dozen) केले दे दो।&quot; दुकानदार तुरंत समझ जाता है कि तुम्हें **12 केले** चाहिए। | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | * अगर कोई कहे **&quot;एक शतक&quot;** (Century), तो तुम्हारे दिमाग में तुरंत आता है— **100 रन**। | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | यहाँ &#x27;दर्जन&#x27; या &#x27;शतक&#x27; क्या हैं? ये सिर्फ **गिनती करने के शब्द (Units)** हैं।  | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Why chemists need the mole unit (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "पानी की एक छोटी सी बूँद में भी अरबों-खरबों अणु होते हैं।"}]}

Annotation rationale: Explains why a macroscopic counting unit is necessary in chemistry due to the extremely small size and vast quantity of atoms and molecules.

Accuracy: **accurate**. The rationale for defining the mole as a macroscopic grouping of microscopic particles is scientifically valid.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### 2. हमें &#x27;मोल&#x27; की ज़रूरत क्यों पड़ी? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | रसायन विज्ञान में हम परमाणु (Atoms) और अणु (Molecules) की बात करते हैं। ये इतने छोटे होते हैं कि इन्हें आँखों से देखना नामुमकिन है। पानी की एक छोटी सी बूँद में भी अरबों-खरबों अणु होते हैं।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | अब अगर कोई वैज्ञानिक कहे कि &quot;मुझे 500 परमाणु कार्बन दे दो,&quot; तो उन्हें गिनना असंभव है। इसलिए, वैज्ञानिकों को परमाणुओं और अणुओं को गिनने के लिए एक बहुत बड़े &#x27;दर्जन&#x27; की ज़रूरत थी।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | **उसी &#x27;सुपर दर्जन&#x27; का नाम है — मोल (Mole)।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Definition of 1 mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the numerical value of 1 mole as 6.022 x 10^23 particles and introduces Avogadro's number (N_A).

Accuracy: **accurate**. Avogadro's constant is accurately given as 6.022 x 10^23 particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p14 | ### 3. तो 1 मोल में कितना होता है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | जैसे 1 दर्जन = 12 वस्तुएं,  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | वैसे ही: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | $$\mathbf{1 \text{ मोल}} = \mathbf{6.022 \times 10^{23} \text{ कण (परमाणु, अणु या आयन)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | इस जादुई संख्या ($6.022 \times 10^{23}$) को हम **आवोगाद्रो संख्या (Avogadro&#x27;s Number)** कहते हैं, और इसे $N_A$ से दर्शाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Example of 1 mole of carbon atoms (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the definition of a mole specifically to carbon atoms.

Accuracy: **accurate**. 1 mole of carbon contains 6.022 x 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | * **1 मोल कार्बन** = $6.022 \times 10^{23}$ कार्बन के परमाणु। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Example of 1 mole of water molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the definition of a mole to molecular water.

Accuracy: **accurate**. 1 mole of water contains 6.022 x 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | * **1 मोल पानी** = $6.022 \times 10^{23}$ पानी के अणु। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Humorous hypothetical example of 1 mole of samosas (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p21", "quote": "* (मज़ाक के लिए: अगर तुम्हारे पास 1 मोल समोसे हों, तो तुम्हारे पास $6.022 \\times 10^{23}$ समोसे होंगे!)"}]}

Annotation rationale: Uses a culturally familiar food item (samosas) to illustrate the universality of mole as a number.

Accuracy: **accurate**. Correctly applies Avogadro's number conceptually to macroscopic items.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | * (मज़ाक के लिए: अगर तुम्हारे पास 1 मोल समोसे हों, तो तुम्हारे पास $6.022 \times 10^{23}$ समोसे होंगे!) | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Relationship between mole, mass, and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how molar mass links macroscopic mass in grams on a scale to atomic/molecular mass and moles.

Accuracy: **accurate**. Accurately introduces molar mass as the mass in grams numerically equal to atomic mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p23 | ### 4. मोल और वज़न (द्रव्यमान) का संबंध: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | हम लैब में परमाणुओं को गिन तो नहीं सकते, लेकिन हम तराज़ू पर उन्हें **तौल (weigh)** ज़रूर सकते हैं। यहीं पर मोल संकल्पना का असली जादू काम आता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | **नियम बहुत सीधा है:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | किसी भी तत्व के **परमाणु भार (Atomic Mass)** को यदि तुम **ग्राम (grams)** में लिख दो, तो वह **1 मोल** बन जाता है! इसे हम **मोलर द्रव्यमान (Molar Mass)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u8: Molar mass calculation and particle count for carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the molar mass relationship using carbon (12 u to 12 g).

Accuracy: **accurate**. Carbon's atomic mass is 12 u, giving a molar mass of 12 g/mol containing 6.022 x 10^23 atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | **उदाहरण से समझो:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | 1. **कार्बन (Carbon):** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |    * कार्बन का परमाणु भार = $12 \, \text{u}$ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 |    * तो, **12 ग्राम कार्बन = 1 मोल कार्बन** = $6.022 \times 10^{23}$ कार्बन के परमाणु। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Molar mass calculation and particle count for water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p34", "quote": "यानी, जब तुम 18 ग्राम पानी (लगभग एक घूँट) पीते हो, तो तुम वास्तव में $6.022 \\times 10^{23}$ पानी के अणु पी जाते हो!"}]}

Annotation rationale: Demonstrates molecular mass calculation and molar mass for water, connecting it to drinking a sip of water.

Accuracy: **accurate**. Molecular mass of H2O is correctly calculated as 18 u, corresponding to 18 g/mol and 6.022 x 10^23 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | 2. **पानी ($H_2O$):** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 |    * पानी का अणु भार = $(2 \times 1) + 16 = 18 \, \text{u}$ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 |    * तो, **18 ग्राम पानी = 1 मोल पानी** = $6.022 \times 10^{23}$ पानी के अणु। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 | यानी, जब तुम 18 ग्राम पानी (लगभग एक घूँट) पीते हो, तो तुम वास्तव में $6.022 \times 10^{23}$ पानी के अणु पी जाते हो! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u10: Formula for calculating number of moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the standard formula n = m / M used to calculate moles from given mass and molar mass.

Accuracy: **accurate**. The formula n = m / M is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p36 | ### 5. याद रखने योग्य मुख्य सूत्र (Formula): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | परीक्षा के प्रश्नों को हल करने के लिए बस यह एक सूत्र याद रखो: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p38 | $$\text{मोलों की संख्या (n)} = \frac{\text{दिया गया द्रव्यमान (m)}}{\text{मोलर द्रव्यमान (M)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u11: Worked problem calculating moles and molecule count in 36 g water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a step-by-step worked problem calculating the number of moles and total molecules in 36 g of water.

Accuracy: **accurate**. Calculations are correct: 36 / 18 = 2 moles, and 2 * 6.022 x 10^23 = 1.204 x 10^24 molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | **एक छोटा सा सवाल हल करें?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | &gt; **सवाल:** 36 ग्राम पानी ($H_2O$) में कितने मोल होंगे? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | &gt;  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p42 | &gt; **हल:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | &gt; * दिया गया द्रव्यमान ($m$) = 36 ग्राम | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p44 | &gt; * पानी का मोलर द्रव्यमान ($M$) = 18 ग्राम/मोल | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p45 | &gt; * $\text{मोल (n)} = \frac{36}{18} = \mathbf{2 \text{ मोल}}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p46 | &gt;  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p47 | &gt; *(और अगर कोई पूछे कि 36 ग्राम में अणु कितने होंगे, तो $2 \times 6.022 \times 10^{23} = 1.204 \times 10^{24}$ अणु होंगे!)* | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u12: Summary recap of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key points of the lesson and concludes with an encouraging remark.

Accuracy: **accurate**. The recap accurately synthesizes the definition, numerical value, and utility of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p49 | ### निष्कर्ष (Summary): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | * **मोल क्या है?** सूक्ष्म कणों (परमाणुओं/अणुओं) को गिनने का एक मात्रक (Unit) है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p51 | * **इसका मान:** $6.022 \times 10^{23}$ कण। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p52 | * **काम क्या करता है?** यह **कणों की संख्या** को तराज़ू पर **ग्राम के वज़न** से जोड़ता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p53 | क्या अब मोल संकल्पना का डर दूर हुआ? यदि कोई बात समझ न आई हो, तो बेझिझक पूछो! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

