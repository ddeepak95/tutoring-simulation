# Stage 1: Tamil / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry in chemical reactions, including balancing chemical equations, mole ratios, molar mass, calculation steps, worked examples, limiting reactants, and percentage yield",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains stoichiometry in Tamil, covering fundamental definitions, balancing equations, mole ratios, calculation procedures, worked problems, limiting reactants, and percentage yield.",
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
    "u10"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Balancing chemical equations and mole ratios | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | The mole concept and Avogadro's number | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Molar mass definition and calculation | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | General procedure for stoichiometric calculations | {} | accurate |
| u6 | EXAMPLE | Worked stoichiometry problem: water synthesis from hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | EXAMPLE | Worked stoichiometry problem: thermal decomposition of calcium carbonate | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | CONCEPT | Concept of limiting reactant | {"depth": "explanation"} | accurate |
| u9 | CONCEPT | Theoretical yield, actual yield, and percentage yield | {"depth": "explanation"} | accurate |
| u10 | STUDY_SUPPORT | Summary recap of stoichiometry calculation pathway | {"subtype": "recap"} | accurate |

## u1: Definition of stoichiometry

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
    "reason": "The definition correctly describes stoichiometry as the quantitative relationship between reactants and products in a chemical reaction.",
    "errors": []
  }
}
```

```text
**ஸ்டாய்கியோமெட்ரி** என்பது ஒரு வேதிவினையில் (chemical reaction) கலந்து கொள்ளும் பொருட்களின் **அளவுகளுக்கிடையிலான கணித உறவை**ப் படிப்பதாகும்.

எளிமையாகச் சொன்னால்:

> “ஒரு பொருள் எவ்வளவு எடுத்தால், அதற்கு எதிர்வினை செய்ய மற்றொரு பொருள் எவ்வளவு வேண்டும்? எவ்வளவு புதிய பொருள் உருவாகும்?”  
> என்பதைக் கணக்கிடுவதே ஸ்டாய்கியோமெட்ரி.
```


## u2: Balancing chemical equations and mole ratios

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
    "reason": "The explanation of balancing equations using atom counting and interpreting the stoichiometric coefficients as mole ratios is factually accurate.",
    "errors": []
  }
}
```

```text
## 1. சமன்பாட்டை சமநிலைப்படுத்துதல்

உதாரணம்:

\[
H_2 + O_2 \rightarrow H_2O
\]

இது சமநிலையற்ற சமன்பாடு. இடப்புறத்தில் ஆக்சிஜன் 2 அணுக்கள் உள்ளன; வலப்புறத்தில் 1 ஆக்சிஜன் மட்டுமே உள்ளது.

சமநிலைப்படுத்தினால்:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

இதன் பொருள்:

- 2 மோல் ஹைட்ரஜன் (\(H_2\))
- 1 மோல் ஆக்சிஜன் (\(O_2\))
- வினைபுரிந்து
- 2 மோல் நீர் (\(H_2O\)) உருவாகும்.

இதிலுள்ள எண்கள் **மோல் விகிதம் (mole ratio)** எனப்படும்.

\[
H_2 : O_2 : H_2O = 2 : 1 : 2
\]
```


## u3: The mole concept and Avogadro's number

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
    "reason": "The mole is correctly defined as containing Avogadro's number (6.022 x 10^23) of representative particles.",
    "errors": []
  }
}
```

```text
## 2. மோல் (Mole) என்றால் என்ன?

வேதியியலில் மிகச் சிறிய துகள்களின் எண்ணிக்கையை அளவிட “மோல்” என்ற அலகு பயன்படுத்தப்படுகிறது.

\[
1 \text{ mole} = 6.022 \times 10^{23}
\]

துகள்கள் (அணுக்கள், மூலக்கூறுகள், அயனிகள்) ஆகும்.

உதாரணம்:

- 1 மோல் நீர் = \(6.022 \times 10^{23}\) நீர் மூலக்கூறுகள்
- 1 மோல் கார்பன் = \(6.022 \times 10^{23}\) கார்பன் அணுக்கள்

ஆனால் கணக்குகளில் பெரும்பாலும் மோலை கிராமிலிருந்து மாற்றிப் பயன்படுத்துவோம்.
```


## u4: Molar mass definition and calculation

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
    "reason": "The definition of molar mass and the sample calculation for water (18 g/mol) are accurate.",
    "errors": []
  }
}
```

```text
## 3. மோலர் நிறை (Molar Mass)

ஒரு பொருளின் 1 மோலின் நிறைதான் அதன் **மோலர் நிறை**.

### உதாரணம்: நீர் \(H_2O\)

- H-ன் அணு நிறை = 1
- O-ன் அணு நிறை = 16

\[
H_2O = (2 \times 1) + 16 = 18 \text{ g/mol}
\]

அதாவது,

\[
1 \text{ mole } H_2O = 18 \text{ g}
\]
```


## u5: General procedure for stoichiometric calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The standard sequence for mass-to-mass stoichiometric calculations is correctly outlined.",
    "errors": []
  }
}
```

```text
# ஸ்டாய்கியோமெட்ரி கணக்கிடும் படிகள்

பொதுவாக பின்வரும் வழிமுறையைப் பின்பற்றலாம்:

1. **வேதிச் சமன்பாட்டை சமநிலைப்படுத்தவும்.**
2. கொடுக்கப்பட்ட நிறையை **மோலாக மாற்றவும்.**
3. சமன்பாட்டிலுள்ள **மோல் விகிதத்தை** பயன்படுத்தவும்.
4. தேவைப்பட்டால் மோலை மீண்டும் **கிராமாக மாற்றவும்.**
```


## u6: Worked stoichiometry problem: water synthesis from hydrogen

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
    "reason": "The calculation steps, conversions, mole ratio application, and final numerical result (36 g H2O) are correct.",
    "errors": []
  }
}
```

```text
## உதாரணம் 1: ஹைட்ரஜனில் இருந்து நீர் உருவாகுதல்

கேள்வி:

> 4 g ஹைட்ரஜன் முழுமையாக ஆக்சிஜனுடன் வினைபுரிந்தால் எத்தனை கிராம் நீர் உருவாகும்?

சமன்பாடு:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### படி 1: \(H_2\)-ன் மோலர் நிறை

\[
H_2 = 2 \times 1 = 2 \text{ g/mol}
\]

### படி 2: 4 g ஹைட்ரஜனை மோலாக மாற்றுதல்

\[
\text{Moles of } H_2 = \frac{4}{2} = 2 \text{ mol}
\]

### படி 3: மோல் விகிதம்

சமன்பாட்டில்:

\[
2H_2 \rightarrow 2H_2O
\]

அதாவது:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

எனவே 2 mol \(H_2\) மூலம் 2 mol \(H_2O\) உருவாகும்.

### படி 4: நீரின் நிறை

\[
H_2O = 18 \text{ g/mol}
\]

\[
\text{Mass of } H_2O = 2 \times 18 = 36 \text{ g}
\]

### விடை:

\[
\boxed{36 \text{ g நீர் உருவாகும்}}
\]
```


## u7: Worked stoichiometry problem: thermal decomposition of calcium carbonate

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
    "reason": "All calculations, molar masses, mole ratios, and the final value (44 g CO2) are correct.",
    "errors": []
  }
}
```

```text
## உதாரணம் 2: கால்சியம் கார்பனேட் சிதைவு

\[
CaCO_3 \rightarrow CaO + CO_2
\]

கேள்வி:

> 100 g கால்சியம் கார்பனேட் (\(CaCO_3\)) வெப்பப்படுத்தப்பட்டால் எத்தனை கிராம் கார்பன் டைஆக்சைடு (\(CO_2\)) உருவாகும்?

### படி 1: மோலர் நிறைகள்

\[
CaCO_3 = 40 + 12 + (3 \times 16) = 100 \text{ g/mol}
\]

\[
CO_2 = 12 + (2 \times 16) = 44 \text{ g/mol}
\]

### படி 2: சமன்பாட்டின் மோல் விகிதம்

\[
1CaCO_3 \rightarrow 1CO_2
\]

அதாவது:

\[
1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2
\]

100 g \(CaCO_3\) = 1 mol.

எனவே உருவாகும் \(CO_2\) = 1 mol.

\[
1 \text{ mol } CO_2 = 44 \text{ g}
\]

### விடை:

\[
\boxed{44 \text{ g } CO_2 \text{ உருவாகும்}}
\]
```


## u8: Concept of limiting reactant

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
    "reason": "The definition and the qualitative example distinguishing stoichiometric and limiting conditions are accurate.",
    "errors": []
  }
}
```

```text
# முக்கியமான கருத்து: வரம்பிடும் வினைப்பொருள்  
## (Limiting Reactant)

சில நேரங்களில் இரண்டு வினைப்பொருட்களும் கொடுக்கப்பட்டிருக்கும். அவற்றில் முதலில் முழுமையாகத் தீர்ந்துபோகும் பொருள் **வரம்பிடும் வினைப்பொருள்** எனப்படும்.

அதுவே எவ்வளவு விளைபொருள் உருவாகும் என்பதை நிர்ணயிக்கும்.

உதாரணம்:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

2 mol \(H_2\) க்கு 1 mol \(O_2\) தேவை.

- உங்களிடம் 2 mol \(H_2\), 1 mol \(O_2\) இருந்தால் இரண்டும் முழுமையாக வினைபுரியும்.
- உங்களிடம் 2 mol \(H_2\), ஆனால் 0.5 mol \(O_2\) மட்டும் இருந்தால், ஆக்சிஜன் முதலில் தீர்ந்துவிடும்.
- எனவே \(O_2\) தான் **limiting reactant**.
```


## u9: Theoretical yield, actual yield, and percentage yield

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
    "reason": "The definitions of theoretical and actual yields, the percentage yield formula, and the sample calculation are factually correct.",
    "errors": []
  }
}
```

```text
# சதவீத விளைச்சல் (Percentage Yield)

கணக்கில் கிடைக்க வேண்டிய அளவு **தத்துவ விளைச்சல்** (Theoretical yield).

ஆய்வகத்தில் உண்மையில் கிடைக்கும் அளவு **உண்மையான விளைச்சல்** (Actual yield).

\[
\text{Percentage Yield} =
\frac{\text{Actual Yield}}{\text{Theoretical Yield}}
\times 100
\]

உதாரணம்:

கணக்குப்படி 36 g நீர் கிடைக்க வேண்டும். ஆனால் உண்மையில் 30 g மட்டுமே கிடைத்தது என்றால்:

\[
\text{Percentage Yield} =
\frac{30}{36} \times 100 = 83.3\%
\]
```


## u10: Summary recap of stoichiometry calculation pathway

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
    "reason": "The summary provides an accurate concise recap of the core gram-to-mole-to-ratio-to-gram pathway.",
    "errors": []
  }
}
```

```text
# நினைவில் வைத்துக்கொள்ள வேண்டிய சுருக்கம்

ஸ்டாய்கியோமெட்ரி கணக்குகளில்:

\[
\boxed{\text{கிராம்} \rightarrow \text{மோல்} \rightarrow \text{மோல் விகிதம்} \rightarrow \text{கிராம்}}
\]

அதாவது:

1. கிராமை மோலாக மாற்று  
2. சமன்பாட்டின் விகிதத்தைப் பயன்படுத்து  
3. மீண்டும் மோலை கிராமாக மாற்று  

இதுவே ஸ்டாய்கியோமெட்ரியின் அடிப்படை முறையாகும்.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
## ஸ்டாய்கியோமெட்ரி (Stoichiometry) என்றால் என்ன?


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
