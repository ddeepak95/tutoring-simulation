# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains stoichiometry in Tamil, covering its definition, an everyday tea-making analogy, balancing chemical equations, mole relationships, and real-world applications.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 56,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 56,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 1,
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Tea-making analogy for stoichiometric ratios (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "உங்களுக்கு **ஒரு கப் டீ** போட வேண்டும் என்றால் என்ன தேவைப்படும்?"}]}

Annotation rationale: Uses the recipe for making tea (scaling up ingredients for 1 cup vs. 4 cups) as a cross-domain comparison to explain stoichiometric ratios in chemistry.

Accuracy: **accurate**. The analogy correctly illustrates how fixed ingredient ratios scale proportionally, matching the core idea of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! **Stoichiometry (வேதிவினை அளவியல்)** என்பதைப் பற்றி மிக எளிமையாகவும், சுவாரஸ்யமாகவும் பார்க்கலாம்.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | பெயர் கொஞ்சம் பயமுறுத்துவது போல இருந்தாலும், விஷயம் ரொம்ப சிம்பிள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### ஒரு எளிய உதாரணம்: &quot;டீ போடுவது எப்படி?&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | முதலில் வேதியியலை மறந்துவிட்டு, சமையலறைக்குச் செல்வோம்.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | உங்களுக்கு **ஒரு கப் டீ** போட வேண்டும் என்றால் என்ன தேவைப்படும்? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | * 1 கப் பால் | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | * 1 ஸ்பூன் டீத்தூள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | * 1 ஸ்பூன் சர்க்கரை | ANALOGY | {} | [&#x27;list&#x27;] |
| p10 | இப்போது உங்கள் வீட்டிற்கு 4 விருந்தினர்கள் வருகிறார்கள், மொத்தம் **4 கப் டீ** போட வேண்டும் என்றால் என்ன செய்வீர்கள்? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | அளவை 4 மடங்காக மாற்றுவீர்கள், சரியா? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | * 4 கப் பால் | ANALOGY | {} | [&#x27;list&#x27;] |
| p13 | * 4 ஸ்பூன் டீத்தூள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p14 | * 4 ஸ்பூன் சர்க்கரை | ANALOGY | {} | [&#x27;list&#x27;] |
| p15 | இதை நீங்கள் எப்படி கணக்கிட்டீர்கள்? ஒரு கப் டீக்கான &quot;விகிதம்&quot; (Ratio) உங்களுக்குத் தெரிந்ததால், 4 கப்புக்கான அளவைச் சரியாகக் கணக்கிட்டுவிட்டீர்கள்.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p16 | **சமையலில் நீங்கள் செய்த இதே கணக்குதான், வேதியியலில் &quot;Stoichiometry&quot;!** | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Etymology and definition of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the Greek origin of stoichiometry (stoicheion + metron) and defines it as the calculation of relative quantities of reactants and products in a chemical reaction.

Accuracy: **accurate**. The Greek roots and the definition of stoichiometry are correctly described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p18 | ### Stoichiometry என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | இது ஒரு கிரேக்கச் சொல்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | * **Stoicheion** = தனிமம் (Element) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p21 | * **Metron** = அளவிடுதல் (Measurement) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | **விளக்கம்:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | ஒரு வேதிவினையில் (Chemical reaction), எவ்வளவு **வினைபடு பொருட்கள் (Reactants)** தேவைப்படும், அவற்றிலிருந்து எவ்வளவு **விளைபொருட்கள் (Products)** கிடைக்கும் என்பதை அளந்து கணக்கிடும் முறைதான் **Stoichiometry**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Water formation reaction and stoichiometric ratio calculation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked chemical example using the balanced formation of water (2H2 + O2 -> 2H2O), explaining stoichiometric coefficients and working out how many oxygen molecules are required for 10 hydrogen molecules.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O is properly balanced, coefficients are correctly identified, and the calculation for 10 H2 molecules yielding 10 H2O using 5 O2 molecules is mathematically and chemically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | ### வேதியியல் உதாரணம் (Chemical Example): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | நமக்கு மிகவும் தெரிந்த **தண்ணீர் ($H_2O$)** உருவாவதை எடுத்துக்கொள்வோம். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | ஹைட்ரஜனும் ஆக்சிஜனும் சேர்ந்தால் நீர் கிடைக்கும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | இதன் சமன்பாடு (Equation): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | இதை நாம் எப்படிப் புரிந்துகொள்ள வேண்டும்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | * **2 மூலக்கூறு ஹைட்ரஜன் ($H_2$)** உடன்  | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | * **1 மூலக்கூறு ஆக்சிஜன் ($O_2$)** சேர்ந்தால்  | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | * **2 மூலக்கூறு நீர் ($H_2O$)** கிடைக்கும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | அந்த சமன்பாட்டில் முன்னால் இருக்கும் எண்கள் (2, 1, 2) தான் **&quot;Stoichiometric Coefficients&quot; (விகிதக் குணகங்கள்)**. இதுதான் கெமிஸ்ட்ரியின் &quot;ரெசிபி&quot; (Recipe)! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | இப்போது உங்களிடம் 10 ஹைட்ரஜன் மூலக்கூறுகள் இருந்தால், அதை முழுமையாக நீராக மாற்ற எத்தனை ஆக்சிஜன் தேவைப்படும்?  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | சரியாக **5 ஆக்சிஜன்** தேவைப்படும் ($10 \div 2$). இதன் மூலம் **10 நீர் மூலக்கூறுகள்** கிடைக்கும்! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Law of conservation of mass as the foundation of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical equations must be balanced based on the Law of Conservation of Mass.

Accuracy: **accurate**. The explanation accurately links the Law of Conservation of Mass to the necessity of balancing chemical equations before applying stoichiometric ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p38 | ### Stoichiometry-யின் மிக முக்கியமான விதி: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | இது **பொருண்மை அழியா விதி (Law of Conservation of Mass)** அடிப்படையில் இயங்குகிறது.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p40 | அதாவது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | &gt; **&quot;ஒரு வேதிவினையில் நிறையை (Mass) உருவாக்கவோ அல்லது அழிக்கவோ முடியாது.&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p42 | வினைக்கு முன் அணுக்களின் எடை என்னவோ, அதே எடைதான் வினை முடிந்த பிறகும் இருக்கும். அதனால்தான் நாம் எப்போதுமே **சமன்பாட்டைச் சமன் செய்கிறோம் (Balancing the Equation).** சமன் செய்யப்படாத சமன்பாட்டில் Stoichiometry வேலை செய்யாது! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: The mole concept in stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the mole as the standard unit used to count particles in chemical equations and connects mole quantities to mass in grams.

Accuracy: **accurate**. Correctly relates stoichiometric coefficients in balanced equations to mole ratios and notes the role of gram-to-mole conversions in stoichiometric problems.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p44 | ### உயர் வகுப்பில் நீங்கள் என்ன படிப்பீர்கள்? (The &quot;Mole&quot; Concept) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | நாம் சமையலில் &#x27;கப்&#x27; அல்லது &#x27;ஸ்பூன்&#x27; என்று அளப்பது போல, வேதியியலில் அணுக்களை **&#x27;மோல்&#x27; (Mole)** என்ற அலகால் அளப்போம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p46 | * மேலே பார்த்த சமன்பாட்டின்படி: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p47 |   **2 மோல் $H_2$ + 1 மோல் $O_2 \rightarrow$ 2 மோல் $H_2O$** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p48 | * மோல்களை கிராம் (Grams) அளவுக்கு மாற்றி கணக்கிடுவதுதான் உங்கள் பாடத்தில் இருக்கும் கணக்குகள் (Problems). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Real-world application: medicine manufacturing (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of stoichiometry in pharmaceutical tablet formulation to ensure exact dosages.

Accuracy: **accurate**. Accurately identifies medicine manufacturing as requiring precise chemical proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p50 | ### இது நிஜ வாழ்க்கையில் எங்கே பயன்படுகிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | 1. **மருந்து தயாரிப்பில் (Medicine):** மாத்திரைகள் தயாரிக்கும் போது ஒரு கெமிக்கல் அதிகமானாலும் ஆபத்து, குறைந்தாலும் வேலை செய்யாது. சரியான அளவில் சேர்க்க இது தேவை. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Real-world application: industrial production (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of stoichiometry in industrial production of soap and fertilizers to minimize raw material waste.

Accuracy: **accurate**. Correctly states that industrial manufacturing uses stoichiometry to prevent reactant wastage.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | 2. **தொழிற்சாலைகளில்:** சோப்பு, உரம் போன்றவை தயாரிக்கும் போது மூலப்பொருட்கள் வீணாகாமல் இருக்க. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Real-world application: rocket propulsion fuel calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of stoichiometry in calculating the exact amount of fuel and oxidizer needed for rocket propulsion.

Accuracy: **accurate**. Correctly identifies rocket propulsion as requiring stoichiometric fuel-to-oxidizer ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | 3. **ராக்கெட் ஏவுதலில்:** விண்வெளிக்குச் செல்லும் ராக்கெட்டிற்குத் தேவையான எரிபொருளையும் (Fuel) ஆக்சிஜனையும் மிகத் துல்லியமாகக் கணக்கிட Stoichiometry பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Summary recap of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary wrap-up capturing the core meaning of stoichiometry and includes a polite closing invitation for questions.

Accuracy: **accurate**. The concluding summary accurately captures the fundamental role of stoichiometry in chemical equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | **சுருக்கமாகச் சொன்னால்:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p55 | வேதியியல் சமன்பாடுகளைப் பயன்படுத்தி, &quot;எவ்வளவு போட்டா, எவ்வளவு கிடைக்கும்?&quot; என்று போடும் கணக்குதான் **Stoichiometry**!  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p56 | இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

