# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains stoichiometry directly and comprehensively in Tamil, covering its definition, conceptual foundation using a recipe analogy, chemical reaction demonstration, step-by-step procedure for stoichiometry problems, and real-world applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 52,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 4,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 52,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Tea recipe analogy for stoichiometric ratios (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "முதலில் வேதியியலை மறந்துவிட்டு, உங்கள் வீட்டிற்கு வருவோம். நீங்கள் அருமையான 'டீ' போடப் போகிறீர்கள் என்று வைத்துக்கொள்வோம்."}, {"passage_id": "p8", "quote": "1 கப் பால் + 1 கப் தண்ணீர் + 1 ஸ்பூன் சர்க்கரை = 2 கப் டீ"}]}

Annotation rationale: Uses the everyday domestic experience of brewing tea with fixed ingredient ratios (milk, water, sugar) to explain the concept of stoichiometric ratios in chemical reactions.

Accuracy: **accurate**. The analogy accurately describes proportional scaling of ingredients and bridges the intuitive recipe concept to stoichiometric ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வாருங்கள், வேதியியலின் மிக முக்கியமான, அதே சமயம் மிகவும் சுவாரசியமான ஒரு தலைப்பைப் பற்றி இன்று நாம் எளிமையாகப் புரிந்து கொள்ளலாம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | அதன் பெயர்: **வேதி வினைக் கூறுகளின் விகிதம் (Stoichiometry - ஸ்டாய்கியோமெட்ரி)**.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | பெயர் ஏதோ பயமுறுத்துவது போலத் தோன்றினாலும், விஷயம் மிக மிக எளிது! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### 1. ஒரு எளிய சமையல் உதாரணம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | முதலில் வேதியியலை மறந்துவிட்டு, உங்கள் வீட்டிற்கு வருவோம். நீங்கள் அருமையான &#x27;டீ&#x27; போடப் போகிறீர்கள் என்று வைத்துக்கொள்வோம்.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | **செய்முறை (Recipe):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | &gt; **1 கப் பால் + 1 கப் தண்ணீர் + 1 ஸ்பூன் சர்க்கரை = 2 கப் டீ** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | இப்போது உங்களிடம் ஒரு கேள்வி:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p10 | உங்களுக்கு **4 கப் டீ** வேண்டும் என்றால், என்ன செய்வீர்கள்? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | உடனே சொல்வீர்கள்: &quot;2 கப் பால், 2 கப் தண்ணீர், 2 ஸ்பூன் சர்க்கரை போட வேண்டும்!&quot; என்று. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | இதை நீங்கள் எப்படிச் சொன்னீர்கள்? ஏனென்றால், உங்களுக்கு அந்த டீ தயாரிப்பதற்கான **விகிதம் (Ratio)** தெரிந்திருக்கிறது.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p13 | சமையலில் நாம் இதை **&quot;Recipe&quot; (செய்முறை விகிதம்)** என்கிறோம். வேதியியலில் இதையே **&quot;Stoichiometry&quot;** என்கிறோம். அவ்வளவுதான் வித்தியாசம்! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Etymology and formal definition of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down the Greek origins of the term stoichiometry and provides its formal chemical definition.

Accuracy: **accurate**. The Greek roots stoicheion (element) and metron (measurement) and the definition of stoichiometry as the quantitative relationship between reactants and products are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 2. ஸ்டாய்கியோமெட்ரி என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | கிரேக்க மொழியில்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | * *Stoicheion* என்றால் **&#x27;தனிமம்&#x27; (Element)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | * *Metron* என்றால் **&#x27;அளவீடு&#x27; (Measurement)** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | &gt; **வரையறை:** ஒரு வேதிவினையில் ஈடுபடும் **வினைபடு பொருட்கள் (Reactants)** மற்றும் அதனால் உருவாகும் **வினைவிளை பொருட்கள் (Products)** ஆகியவற்றின் அளவுகளுக்கு (நிறை அல்லது மோல்) இடையேயான கணிதத் தொடர்புதான் &#x27;வேதி வினைக் கூறுகளின் விகிதம்&#x27; ஆகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Water formation reaction and conservation of mass (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked chemical example of water synthesis, demonstrating mole ratios, molar masses, and the law of conservation of mass.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O, mole ratio 2:1:2, masses (4g H2 + 32g O2 = 36g H2O), and verification of the law of conservation of mass are chemically and mathematically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### 3. ஒரு வேதியியல் உதாரணம் (தண்ணீர் தயாரிப்போம்): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | ஹைட்ரஜனும் ஆக்சிஜனும் சேர்ந்து நீர் உருவாகும் வினையை எடுத்துக்கொள்வோம். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | **சமன் செய்யப்பட்ட சமன்பாடு (Balanced Chemical Equation):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | இந்த சமன்பாடு நமக்கு என்ன சொல்கிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | * **2 மூலக்கூறு (அல்லது 2 மோல்) ஹைட்ரஜன்** வாயுவுடன்,  | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | * **1 மூலக்கூறு (அல்லது 1 மோல்) ஆக்சிஜன்** வாயு சேர்ந்தால், | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | * **2 மூலக்கூறு (அல்லது 2 மோல்) நீர்** கிடைக்கும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | இங்கே உள்ள விகிதம் என்ன? **2 : 1 : 2** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | இதுதான் ஸ்டாய்கியோமெட்ரிக் விகிதம் (Stoichiometric Ratio). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | **நிறையின் அடிப்படையில் பார்த்தால் (Mass):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | * ஹைட்ரஜனின் நிறை ($2 \times 2$) = **4 கிராம்** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | * ஆக்சிஜனின் நிறை ($1 \times 32$) = **32 கிராம்** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | * உருவான நீரின் நிறை ($2 \times 18$) = **36 கிராம்** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | பார்த்தீர்களா?  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p36 | வினைபடு பொருட்களின் மொத்த நிறை ($4 + 32 = 36$ கிராம்) = விளைபொருளின் மொத்த நிறை ($36$ கிராம்).  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | இதன் மூலம் **&#x27;பொருண்மை அழிவின்மை விதி&#x27; (Law of Conservation of Mass)** உண்மையாகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Three-step procedure for stoichiometry problem solving (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a clear 3-step procedural method for solving stoichiometry exam problems.

Accuracy: **accurate**. The three steps (balance equation, convert mass to moles using mass/molar mass, and apply stoichiometric mole ratios) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### 4. இதை கணக்குகளில் எப்படிப் பயன்படுத்துவது? (3 தங்க விதிகள்) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | பரீட்சையில் இதைப் பற்றி கணக்கு கேட்டால், இந்த 3 படிகளை மட்டும் நினைவில் வையுங்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | 1. **சமன்பாட்டைச் சமன் செய் (Balance the equation):** சமன் செய்யப்படாத சமன்பாட்டை வைத்து கணக்கு போடவே கூடாது. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p42 | 2. **மோல்களாக மாற்று (Convert to Moles):** கொடுக்கப்பட்ட எடையை மோல்களாக மாற்றிக்கொள்ள வேண்டும் ($\text{Mole} = \frac{\text{Mass}}{\text{Molar mass}}$). | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p43 | 3. **விகிதத்தைப் பயன்படுத்து (Use the Ratio):** சமன்பாட்டில் உள்ள விகிதத்தை வைத்து விடையைக் கண்டுபிடி. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Pharmaceutical application: paracetamol synthesis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p46", "quote": "ஒரு பாராசிட்டமால் மாத்திரை செய்யும்போது, வேதிப்பொருட்களின் விகிதம் மில்லி கிராம் அளவில் கூட மாறக்கூடாது."}]}

Annotation rationale: Illustrates the necessity of stoichiometric precision in pharmaceutical formulation using paracetamol.

Accuracy: **accurate**. Accurately highlights the criticality of precise reactant proportions in pharmaceutical manufacturing.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | ### 5. இது நிஜ வாழ்க்கையில் எங்கே பயன்படுகிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | * **மருந்து தயாரிப்பில் (Medicines):** ஒரு பாராசிட்டமால் மாத்திரை செய்யும்போது, வேதிப்பொருட்களின் விகிதம் மில்லி கிராம் அளவில் கூட மாறக்கூடாது. மாறினால் அது விஷமாகிவிடும்! | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Aerospace application: rocket propulsion fuel-oxidizer ratios (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of stoichiometry to the fuel-to-oxidizer ratio in rocket propulsion.

Accuracy: **accurate**. Accurately identifies the need for precise stoichiometric balance between fuel and oxidizer in rocketry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | * **ராக்கெட் ஏவுதலில் (Rockets):** ராக்கெட் சீறிப் பாய, எரிபொருளும் (Fuel) ஆக்சிஜனேற்றியும் (Oxidizer) மிகச் சரியான விகிதத்தில் கலக்கப்பட வேண்டும். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Industrial application: waste minimization and cost efficiency (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how industrial chemical manufacturing uses stoichiometry to minimize waste and optimize yield.

Accuracy: **accurate**. Accurately states that stoichiometric calculations prevent excessive byproduct waste and save costs in industrial settings.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | * **தொழிற்சாலைகளில்:** தேவையற்ற கழிவுகள் உருவாவதைத் தடுத்து, பணத்தை மிச்சப்படுத்த இந்த விகிதக் கணக்கீடு மிக அவசியம். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Summary recap of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essence of stoichiometry as chemistry's recipe book and concludes the lesson.

Accuracy: **accurate**. The recap appropriately and accurately distills the core function of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | **சுருக்கமாகச் சொன்னால்:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p51 | வேதி வினைக் கூறுகளின் விகிதம் என்பது **&quot;வேதியியலின் செய்முறை புத்தகம் (Recipe Book)&quot;**. எவ்வளவு மூலப்பொருள் போட்டால், எவ்வளவு தயாரிப்பு கிடைக்கும் என்று முன்கூட்டியே கணக்கிடும் ஒரு சூப்பர் கருவி! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p52 | இப்போது சொல்லுங்கள், இது எளிமையாக இருக்கிறதா? இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

