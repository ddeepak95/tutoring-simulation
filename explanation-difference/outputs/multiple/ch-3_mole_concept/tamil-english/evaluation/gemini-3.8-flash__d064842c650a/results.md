# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high-school level explanation of the mole concept in Tamil, covering everyday analogies, definition and Avogadro's number, molar mass, calculation formulas, and a worked example.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 48,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 48,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 3,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: The dozen analogy for counting microscopic particles (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "நீங்கள் ஒரு கடைக்குச் சென்று \"12 வாழைப்பழங்கள் கொடுங்கள்\" என்று கேட்பதற்குப் பதிலாக, **\"ஒரு டஜன் (Dozen)\"** என்று கேட்பீர்கள் அல்லவா?"}]}

Annotation rationale: Introduces the mole concept through familiar everyday counting units such as pair, dozen, and century.

Accuracy: **accurate**. The comparison between everyday counting units (pair, dozen, century) and the mole as a macroscopic unit to count atoms and molecules is pedagogically sound and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வேதியியலில் (Chemistry) மிக முக்கியமான, ஆனால் பல மாணவர்கள் குழப்பிக்கொள்ளும் ஒரு தலைப்பு **&quot;மோல் கருத்துரு&quot; (Mole Concept)**.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | இதை மிக எளிமையாக, நம் அன்றாட வாழ்க்கையோடு ஒப்பிட்டுப் புரிந்து கொள்ளலாம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. ஒரு எளிய உதாரணம் (The &quot;Dozen&quot; Analogy) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | நீங்கள் ஒரு கடைக்குச் சென்று &quot;12 வாழைப்பழங்கள் கொடுங்கள்&quot; என்று கேட்பதற்குப் பதிலாக, **&quot;ஒரு டஜன் (Dozen)&quot;** என்று கேட்பீர்கள் அல்லவா? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | * 1 ஜோடி (Pair) = 2 பொருட்கள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | * 1 டஜன் (Dozen) = 12 பொருட்கள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | * 1 செஞ்சுரி (Century) = 100 ரன்கள் | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | அதேபோல, வேதியியலில் மிக நுண்ணிய துகள்களான **அணுக்கள் (Atoms)** மற்றும் **மூலக்கூறுகளை (Molecules)** எண்ணுவதற்கு விஞ்ஞானிகள் பயன்படுத்தும் ஒரு சொல்லே **&quot;மோல்&quot; (Mole)** ஆகும். | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p12", "quote": "ஒரு துளி தண்ணீரில் கூட கோடிக்கணக்கான மூலக்கூறுகள் இருக்கும்."}]}

Annotation rationale: Explains why a very large number is needed for atomic-scale counting, defines Avogadro's number, and specifies particle counts for elements and molecules.

Accuracy: **accurate**. The definition of the mole, the numerical value 6.022 x 10^23, and its application to atoms of iron and molecules of water are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ### 2. ஒரு மோல் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | அணுக்கள் நம் கண்களுக்குத் தெரியாத அளவுக்கு மிக மிகச் சிறியவை. ஒரு துளி தண்ணீரில் கூட கோடிக்கணக்கான மூலக்கூறுகள் இருக்கும். அதனால், அவற்றை 100, 1000 என்று எண்ண முடியாது.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | இதற்காக விஞ்ஞானிகள் ஒரு மிகப்பெரிய எண்ணை உருவாக்கினார்கள்: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | &gt; **1 மோல் = $6.022 \times 10^{23}$ துகள்கள்** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p15 | இந்த எண்ணை **&quot;அவகேட்ரோ எண்&quot; (Avogadro&#x27;s Number - $N_A$)** என்று அழைப்போம்.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | *(யோசித்துப் பாருங்கள்: 6 பக்கத்தில் 23 பூஜ்ஜியங்களை (zeros) போட்டால் எவ்வளவு பெரிய எண்ணோ, அவ்வளவு துகள்கள் சேர்ந்ததுதான் 1 மோல்!)* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | * 1 மோல் இரும்பு = $6.022 \times 10^{23}$ இரும்பு அணுக்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | * 1 மோல் தண்ணீர் = $6.022 \times 10^{23}$ தண்ணீர் மூலக்கூறுகள். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u3: Connecting moles to mass via atomic mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how counting atoms directly in a laboratory is avoided by converting atomic mass from the periodic table into grams to obtain 1 mole.

Accuracy: **accurate**. Correctly states the relationship that expressing the atomic mass of an element in grams corresponds to one mole of atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p20 | ### 3. அணுக்களை எண்ண முடியாது, பின் எப்படி அளப்பது? (மோல் மற்றும் நிறை) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | உங்களுக்கு ஒரு சந்தேகம் வரலாம்: &quot;சார், இவ்வளவு பெரிய எண்ணிக்கையை ஆய்வகத்தில் (Lab) எப்படி எண்ணுவது?&quot;  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | இங்குதான் ஒரு மேஜிக் இருக்கிறது! **நாம் அணுக்களை எண்ணத் தேவையில்லை, எடை போட்டாலே போதும்.** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | தனிம வரிசை அட்டவணையில் (Periodic Table) உள்ள ஒரு தனிமத்தின் **அணு நிறையை (Atomic mass)** கிராமுக்கு (grams) மாற்றினால், அதில் சரியாக 1 மோல் துகள்கள் இருக்கும்! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the molar mass principle using carbon, showing that 12 grams of carbon contains one mole of carbon atoms.

Accuracy: **accurate**. Correctly states the atomic weight of carbon (~12) and notes that 12 g of carbon equals 1 mole (6.022 x 10^23 atoms).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | **எடுத்துக்காட்டுகள்:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | 1. **கார்பன் (Carbon):** இதன் அணு எடை 12. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 |    * நீங்கள் சரியாக **12 கிராம் கார்பன்** எடுத்தால், அதில் $6.022 \times 10^{23}$ கார்பன் அணுக்கள் (1 மோல்) இருக்கும். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Molar mass of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p28", "quote": "நீங்கள் சரியாக **18 கிராம் தண்ணீர்** குடித்தால், உங்கள் உடலுக்குள் $6.022 \\times 10^{23}$ தண்ணீர் மூலக்கூறுகள் (1 மோல்) செல்கிறது!"}]}

Annotation rationale: Illustrates molecular mass calculation for water and connects 18 grams of water to one mole of water molecules.

Accuracy: **accurate**. The molecular weight calculation of water ((2 x 1) + 16 = 18) and the statement that 18 g contains 1 mole of water molecules are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | 2. **தண்ணீர் ($H_2O$):** இதன் மூலக்கூறு எடை = $(2 \times 1) + 16 = 18$. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 |    * நீங்கள் சரியாக **18 கிராம் தண்ணீர்** குடித்தால், உங்கள் உடலுக்குள் $6.022 \times 10^{23}$ தண்ணீர் மூலக்கூறுகள் (1 மோல்) செல்கிறது! | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Formulas for calculating moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the standard high school chemistry formulas for calculating moles from mass and from particle count.

Accuracy: **accurate**. Both formulas (n = m/M and n = N/N_A) are accurate standard chemistry equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p30 | ### 4. தேர்வுக்குத் தேவையான முக்கியமான சூத்திரங்கள் (Formulas): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | கணக்குகளைத் தீர்க்க இந்த இரண்டு சூத்திரங்களை மட்டும் நினைவில் வைத்துக் கொள்ளுங்கள்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p32 | 1. **நிறை (Mass) கொடுக்கப்பட்டிருந்தால்:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 |    $$\text{மோல்களின் எண்ணிக்கை (n)} = \frac{\text{கொடுக்கப்பட்ட நிறை (Given Mass)}}{\text{மோலார் நிறை (Molar Mass)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p34 | 2. **துகள்களின் எண்ணிக்கை (Particles) கொடுக்கப்பட்டிருந்தால்:** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 |    $$\text{மோல்களின் எண்ணிக்கை (n)} = \frac{\text{துகள்களின் எண்ணிக்கை (N)}}{\text{அவகேட்ரோ எண் } (N_A)}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u7: Worked calculation: Moles in 36 grams of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked problem calculating moles and particle count from a given mass of water.

Accuracy: **accurate**. The givens, substitution, calculation (36/18 = 2 moles), and interpretation in terms of molecules are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p37 | ### ஒரு சின்ன கணக்கு போட்டுப் பார்ப்போமா? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | **கேள்வி:** 36 கிராம் தண்ணீரில் ($H_2O$) எத்தனை மோல்கள் உள்ளன? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | * கொடுக்கப்பட்ட நிறை (Given Mass) = 36 g | EXAMPLE | {} | [&#x27;list&#x27;] |
| p40 | * தண்ணீரின் மோலார் நிறை (Molar Mass of $H_2O$) = 18 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p41 | $$\text{மோல்களின் எண்ணிக்கை (n)} = \frac{36}{18} = 2 \text{ மோல்கள்}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | **விடை:** 36 கிராம் தண்ணீரில் **2 மோல்கள்** உள்ளன (அதாவது $2 \times 6.022 \times 10^{23}$ மூலக்கூறுகள் உள்ளன). | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Recap of key mole concept takeaways (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary list of the main points covered in the lesson and closes with social remarks.

Accuracy: **accurate**. The recap points accurately summarize the definition of a mole, Avogadro's number, and the molar mass relationship.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p44 | ### சுருக்கம் (Summary): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | * **மோல்** என்பது அணுக்களை எண்ணும் ஒரு அளவீடு. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p46 | * 1 மோல் = **$6.022 \times 10^{23}$** (அவகேட்ரோ எண்). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p47 | * ஒரு பொருளின் அணு/மூலக்கூறு எடையை கிராமாக மாற்றினால் அதுவே **1 மோல்**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p48 | இப்போது உங்களுக்கு மோல் கருத்து தெளிவாகப் புரிந்திருக்கும் என்று நம்புகிறேன்! இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேளுங்கள். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

