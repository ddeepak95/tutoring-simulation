# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains isotopes in Hindi for a high school level, covering definitions, atomic structure, examples (hydrogen and carbon), etymology/mnemonic, applications, and properties.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 35,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 35,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 9,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and atomic characteristics of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what isotopes are in terms of identical atomic number (protons) but differing neutron counts and mass numbers.

Accuracy: **accurate**. The definition accurately states that isotopes belong to the same element, have identical proton numbers, and differ in neutron counts and mass numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # समस्थानिक (Isotopes) 🔬 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम एक बहुत ही रोचक विषय समझेंगे - **समस्थानिक**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## समस्थानिक क्या हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **समस्थानिक** उन परमाणुओं को कहते हैं जो: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | - एक ही **तत्व** के होते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | - जिनमें **प्रोटॉन की संख्या समान** होती है (परमाणु क्रमांक समान) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | - लेकिन **न्यूट्रॉन की संख्या अलग-अलग** होती है | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p8 | - इसलिए इनका **द्रव्यमान संख्या (Mass Number) अलग** होता है | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Sibling analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "सोचिए एक ही परिवार के भाई-बहन हैं - सबका सरनेम (उपनाम) एक जैसा है, लेकिन उनका वज़न अलग-अलग हो सकता है।"}]}

Annotation rationale: Compares isotopes to siblings sharing the same family surname but possessing different body weights.

Accuracy: **accurate**. The everyday sibling analogy correctly mirrors how isotopes share an identity (element/protons) but vary in mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## आसान भाषा में समझें 🎯 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | सोचिए एक ही परिवार के भाई-बहन हैं - सबका सरनेम (उपनाम) एक जैसा है, लेकिन उनका वज़न अलग-अलग हो सकता है। ठीक वैसे ही समस्थानिक एक ही तत्व के &quot;भाई-बहन&quot; जैसे होते हैं। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Hydrogen isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Protium, Deuterium, and Tritium with their respective proton, neutron, and mass numbers in a table.

Accuracy: **accurate**. All proton, neutron, and mass numbers given for Protium, Deuterium, and Tritium are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## मुख्य उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | ### 1️⃣ हाइड्रोजन के समस्थानिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | &#124; नाम &#124; प्रोटॉन &#124; न्यूट्रॉन &#124; द्रव्यमान संख्या &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124;------&#124;---------&#124;-----------&#124;-------------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | &#124; प्रोटियम (¹H) &#124; 1 &#124; 0 &#124; 1 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124; ड्यूटीरियम (²H) &#124; 1 &#124; 1 &#124; 2 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124; ट्राइटियम (³H) &#124; 1 &#124; 2 &#124; 3 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u4: Carbon isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates Carbon-12, Carbon-13, and Carbon-14, noting the radioactivity of Carbon-14.

Accuracy: **accurate**. The proton and neutron counts for C-12, C-13, and C-14, as well as C-14's radioactivity, are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### 2️⃣ कार्बन के समस्थानिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | - **कार्बन-12** (⁶ प्रोटॉन + ⁶ न्यूट्रॉन) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - **कार्बन-13** (⁶ प्रोटॉन + ⁷ न्यूट्रॉन) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | - **कार्बन-14** (⁶ प्रोटॉन + ⁸ न्यूट्रॉन) - यह रेडियोधर्मी होता है! | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Etymological mnemonic for Samasthanik (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down the Sanskrit-derived Hindi term 'Samasthanik' (sam = equal/same, sthanik = place) to help students remember that isotopes share the same position in the periodic table.

Accuracy: **accurate**. Correctly derives and relates 'समान स्थान' to occupying the same slot in the periodic table due to having the same atomic number.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ## याद रखने की सरल ट्रिक 💡 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | **&quot;समस्थानिक&quot; शब्द का अर्थ ही है - &quot;समान स्थान&quot;** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p24 | - **सम** = समान | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p25 | - **स्थानिक** = स्थान (आवर्त सारणी में) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p26 | यानी समस्थानिक आवर्त सारणी में **एक ही स्थान** पर रहते हैं, क्योंकि उनके रासायनिक गुण समान होते हैं (प्रोटॉन संख्या समान होने के कारण)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u6: Application: Carbon-14 in carbon dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides Carbon-14 used for dating archaeological artifacts as an application example.

Accuracy: **accurate**. Carbon-14 is standardly used for radiocarbon dating of archaeological artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## समस्थानिकों के उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | 1. **कार्बन-14** → पुरातात्विक वस्तुओं की उम्र पता करने में (Carbon Dating) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Application: Cobalt-60 in cancer treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Cobalt-60 used in cancer radiotherapy as a distinct real-world application.

Accuracy: **accurate**. Cobalt-60 is an established radioisotope used in radiotherapy for cancer treatment.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | 2. **कोबाल्ट-60** → कैंसर के इलाज में (रेडियोथेरेपी) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Application: Uranium-235 in nuclear power generation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Uranium-235 used as fuel in nuclear reactors as a distinct application.

Accuracy: **accurate**. Uranium-235 is the standard fissile isotope used in nuclear energy generation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | 3. **यूरेनियम-235** → परमाणु ऊर्जा उत्पादन में | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Application: Iodine-131 in thyroid diagnosis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Iodine-131 used in medical thyroid investigations as an application.

Accuracy: **accurate**. Iodine-131 is widely used in medicine for thyroid imaging and therapy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | 4. **आयोडीन-131** → थायरॉइड की जांच में | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Chemical vs. physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have identical chemical properties (same electron count) but different physical properties (different mass). Also contains closing social remarks.

Accuracy: **accurate**. Correctly attributes identical chemical properties to electron configurations and differing physical properties (like density and boiling point) to mass differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## एक महत्वपूर्ण बात ध्यान रखें ⚠️ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | समस्थानिकों के **रासायनिक गुण एक जैसे** होते हैं (क्योंकि इलेक्ट्रॉन की संख्या समान होती है), लेकिन **भौतिक गुण अलग** हो सकते हैं (जैसे घनत्व, क्वथनांक) क्योंकि द्रव्यमान अलग होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | **क्या आप कोई विशेष उदाहरण या प्रश्न पूछना चाहेंगे?** मैं और विस्तार से समझा सकता हूँ! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

