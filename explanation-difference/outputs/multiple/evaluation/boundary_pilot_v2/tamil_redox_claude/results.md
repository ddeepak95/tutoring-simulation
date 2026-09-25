# Tamil redox boundary pilot

Two stages with Gemini-3.8-flash; proposed boundaries only. No accuracy enrichment yet.

## Stage 1: 13 units

| ID | Kind | Label |
|---|---|---|
| u1 | CONCEPT | Definition and simultaneity of redox reactions |
| u2 | CONCEPT | Oxidation and reduction defined by electron transfer |
| u3 | STUDY_SUPPORT | OIL RIG mnemonic aid |
| u4 | STUDY_SUPPORT | LEO says GER mnemonic aid |
| u5 | EXAMPLE | Sodium and chlorine redox reaction |
| u6 | CONCEPT | Definitions of oxidizing and reducing agents |
| u7 | CONCEPT | Oxidation number concept and rules |
| u8 | EXAMPLE | Oxidation of iron(II) to iron(III) using oxidation number |
| u9 | EXAMPLE | Everyday example: rusting of iron |
| u10 | EXAMPLE | Everyday example: respiration |
| u11 | EXAMPLE | Everyday example: battery |
| u12 | STUDY_SUPPORT | Key reminder notes on redox reactions |
| u13 | STUDY_SUPPORT | Practice problem identifying oxidation and reduction |

### Changes and ambiguities

```json
{
  "changes": [],
  "ambiguities": [
    {
      "unit_ids": [
        "u5",
        "u6"
      ],
      "issue": "The table introduces definitions for oxidizing and reducing agents while also identifying agents for the NaCl reaction from unit u5. It could either be classified as an independent CONCEPT defining agents or merged into the EXAMPLE as agent identification.",
      "proposed_resolution": "Keep the table intact as an independent CONCEPT because its primary teaching function is providing general definitions of oxidizing and reducing agents, with the third column acting as contextual application."
    },
    {
      "unit_ids": [
        "u7",
        "u8"
      ],
      "issue": "The Fe2+ to Fe3+ reaction directly illustrates the oxidation number rule and could be integrated into the Oxidation Number CONCEPT unit rather than separated as an independent EXAMPLE.",
      "proposed_resolution": "Keep Fe2+ -> Fe3+ as an EXAMPLE unit since it is explicitly framed as a worked case with a reaction equation and interpretation, separating it from the general rule."
    }
  ]
}
```

### u1: Definition and simultaneity of redox reactions

```text
**Redox** என்பது **Red**uction (ஒடுக்கம்) + **Ox**idation (ஆக்சிஜனேற்றம்) என்ற இரு வார்த்தைகளின் சேர்க்கை. இந்த இரு வினைகளும் எப்போதும் **ஒரே நேரத்தில்** நடைபெறும். ஒன்று இல்லாமல் மற்றொன்று நடக்காது!
```

### u2: Oxidation and reduction defined by electron transfer

```text
Redox வினையின் மையக் கருத்து: **எலக்ட்ரான்களின் பரிமாற்றம் (transfer)**
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானை இழக்கும்** (lose electrons) போது அதை ஆக்சிஜனேற்றம் என்கிறோம்
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானைப் பெறும்** (gain electrons) போது அதை ஒடுக்கம் என்கிறோம்
```

### u3: OIL RIG mnemonic aid

```text
நினைவில் வைக்க: **OIL** - **O**xidation **I**s **L**oss (of electrons)
```

```text
நினைவில் வைக்க: **RIG** - **R**eduction **I**s **G**ain (of electrons)
```

### u4: LEO says GER mnemonic aid

```text
**சுருக்கமாக: LEO says GER**
- L (Loss) E (Electron) O (Oxidation)
- G (Gain) E (Electron) R (Reduction)
```

### u5: Sodium and chlorine redox reaction

```text
சோடியம் மற்றும் குளோரின் வினையைப் பார்ப்போம்:

$$2Na + Cl_2 \rightarrow 2NaCl$$

**என்ன நடக்கிறது?**

- **Na (சோடியம்)** → 1 எலக்ட்ரானை இழக்கிறது → Na⁺ ஆகிறது → **ஆக்சிஜனேற்றம் அடைகிறது**
- **Cl (குளோரின்)** → 1 எலக்ட்ரானைப் பெறுகிறது → Cl⁻ ஆகிறது → **ஒடுக்கம் அடைகிறது**

$$Na \rightarrow Na^+ + e^- \quad \text{(ஆக்சிஜனேற்றம்)}$$
$$Cl + e^- \rightarrow Cl^- \quad \text{(ஒடுக்கம்)}$$
```

### u6: Definitions of oxidizing and reducing agents

```text
| பெயர் | வரையறை | இந்த உதாரணத்தில் |
|------|---------|-------------------|
| **ஆக்சிஜனேற்றும் காரணி** (Oxidizing Agent) | மற்றவைகளை ஆக்சிஜனேற்றம் செய்யும், தானே ஒடுக்கம் அடையும் | Cl₂ |
| **ஒடுக்கும் காரணி** (Reducing Agent) | மற்றவைகளை ஒடுக்கம் செய்யும், தானே ஆக்சிஜனேற்றம் அடையும் | Na |
```

### u7: Oxidation number concept and rules

```text
இது ஒரு அணுவின் "மின்சார நிலையை" குறிக்கும் எண். இதன் மூலம் நாம் எளிதாக கண்டறியலாம்:

- ஆக்சிஜனேற்ற எண் **அதிகரித்தால்** → ஆக்சிஜனேற்றம்
- ஆக்சிஜனேற்ற எண் **குறைந்தால்** → ஒடுக்கம்
```

### u8: Oxidation of iron(II) to iron(III) using oxidation number

```text
$$Fe^{2+} \rightarrow Fe^{3+} + e^- $$
இங்கு Fe இன் ஆக்சிஜனேற்ற எண் +2 இலிருந்து +3 ஆக அதிகரிக்கிறது → **ஆக்சிஜனேற்றம்**
```

### u9: Everyday example: rusting of iron

```text
**இரும்பு துருப்பிடித்தல்** (Rusting):
$$4Fe + 3O_2 \rightarrow 2Fe_2O_3$$
Fe ஆக்சிஜனேற்றம் அடைகிறது, O₂ ஒடுக்கம் அடைகிறது
```

### u10: Everyday example: respiration

```text
**சுவாசித்தல்** - உணவு ஆக்சிஜனேற்றம் அடைந்து ஆற்றல் தருகிறது
```

### u11: Everyday example: battery

```text
**மின்கலம் (Battery)** - redox வினை மூலமே மின்சாரம் உற்பத்தி செய்யப்படுகிறது
```

### u12: Key reminder notes on redox reactions

```text
நினைவில் கொள்ளுங்கள்:
✅ Redox வினையில் மொத்த எலக்ட்ரான்கள் இழந்தது = மொத்த எலக்ட்ரான்கள் பெற்றது
✅ ஆக்சிஜனேற்றம் மற்றும் ஒடுக்கம் எப்போதும் **ஒன்றாகவே** நடக்கும்
```

### u13: Practice problem identifying oxidation and reduction

```text
**பயிற்சி கேள்வி:** கீழ்க்கண்ட வினையில் எது ஆக்சிஜனேற்றம் அடைகிறது, எது ஒடுக்கம் அடைகிறது என கண்டறியவும்:

$$Zn + CuSO_4 \rightarrow ZnSO_4 + Cu$$

இதை நீங்கள் முயற்சி செய்து பாருங்கள், சந்தேகம் இருந்தால் கேளுங்கள்! 😊
```

## Stage 2: 13 units

| ID | Kind | Label |
|---|---|---|
| u1 | CONCEPT | Definition and simultaneity of redox reactions |
| u2 | CONCEPT | Oxidation and reduction defined by electron transfer |
| u3 | STUDY_SUPPORT | OIL RIG mnemonic aid |
| u4 | STUDY_SUPPORT | LEO says GER mnemonic aid |
| u5 | EXAMPLE | Sodium and chlorine redox reaction |
| u6 | CONCEPT | Definitions of oxidizing and reducing agents |
| u7 | CONCEPT | Oxidation number concept and rules |
| u8 | EXAMPLE | Oxidation of iron(II) to iron(III) using oxidation number |
| u9 | EXAMPLE | Everyday example: rusting of iron |
| u10 | EXAMPLE | Everyday example: respiration |
| u11 | EXAMPLE | Everyday example: battery |
| u12 | STUDY_SUPPORT | Key reminder notes on redox reactions |
| u13 | STUDY_SUPPORT | Practice problem identifying oxidation and reduction |

### Changes and ambiguities

```json
{
  "changes": [],
  "ambiguities": [
    {
      "unit_ids": [
        "u5",
        "u6"
      ],
      "issue": "The table introduces definitions for oxidizing and reducing agents while also identifying agents for the NaCl reaction from unit u5. It could either be classified as an independent CONCEPT defining agents or merged into the EXAMPLE as agent identification.",
      "proposed_resolution": "Keep the table intact as an independent CONCEPT because its primary teaching function is providing general definitions of oxidizing and reducing agents, with the third column acting as contextual application."
    },
    {
      "unit_ids": [
        "u7",
        "u8"
      ],
      "issue": "The Fe2+ to Fe3+ reaction directly illustrates the oxidation number rule and could be integrated into the Oxidation Number CONCEPT unit rather than separated as an independent EXAMPLE.",
      "proposed_resolution": "Keep Fe2+ -> Fe3+ as an EXAMPLE unit since it is explicitly framed as a worked case with a reaction equation and interpretation, separating it from the general rule."
    }
  ]
}
```

### u1: Definition and simultaneity of redox reactions

```text
**Redox** என்பது **Red**uction (ஒடுக்கம்) + **Ox**idation (ஆக்சிஜனேற்றம்) என்ற இரு வார்த்தைகளின் சேர்க்கை. இந்த இரு வினைகளும் எப்போதும் **ஒரே நேரத்தில்** நடைபெறும். ஒன்று இல்லாமல் மற்றொன்று நடக்காது!
```

### u2: Oxidation and reduction defined by electron transfer

```text
Redox வினையின் மையக் கருத்து: **எலக்ட்ரான்களின் பரிமாற்றம் (transfer)**
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானை இழக்கும்** (lose electrons) போது அதை ஆக்சிஜனேற்றம் என்கிறோம்
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானைப் பெறும்** (gain electrons) போது அதை ஒடுக்கம் என்கிறோம்
```

### u3: OIL RIG mnemonic aid

```text
நினைவில் வைக்க: **OIL** - **O**xidation **I**s **L**oss (of electrons)
```

```text
நினைவில் வைக்க: **RIG** - **R**eduction **I**s **G**ain (of electrons)
```

### u4: LEO says GER mnemonic aid

```text
**சுருக்கமாக: LEO says GER**
- L (Loss) E (Electron) O (Oxidation)
- G (Gain) E (Electron) R (Reduction)
```

### u5: Sodium and chlorine redox reaction

```text
சோடியம் மற்றும் குளோரின் வினையைப் பார்ப்போம்:

$$2Na + Cl_2 \rightarrow 2NaCl$$

**என்ன நடக்கிறது?**

- **Na (சோடியம்)** → 1 எலக்ட்ரானை இழக்கிறது → Na⁺ ஆகிறது → **ஆக்சிஜனேற்றம் அடைகிறது**
- **Cl (குளோரின்)** → 1 எலக்ட்ரானைப் பெறுகிறது → Cl⁻ ஆகிறது → **ஒடுக்கம் அடைகிறது**

$$Na \rightarrow Na^+ + e^- \quad \text{(ஆக்சிஜனேற்றம்)}$$
$$Cl + e^- \rightarrow Cl^- \quad \text{(ஒடுக்கம்)}$$
```

### u6: Definitions of oxidizing and reducing agents

```text
| பெயர் | வரையறை | இந்த உதாரணத்தில் |
|------|---------|-------------------|
| **ஆக்சிஜனேற்றும் காரணி** (Oxidizing Agent) | மற்றவைகளை ஆக்சிஜனேற்றம் செய்யும், தானே ஒடுக்கம் அடையும் | Cl₂ |
| **ஒடுக்கும் காரணி** (Reducing Agent) | மற்றவைகளை ஒடுக்கம் செய்யும், தானே ஆக்சிஜனேற்றம் அடையும் | Na |
```

### u7: Oxidation number concept and rules

```text
இது ஒரு அணுவின் "மின்சார நிலையை" குறிக்கும் எண். இதன் மூலம் நாம் எளிதாக கண்டறியலாம்:

- ஆக்சிஜனேற்ற எண் **அதிகரித்தால்** → ஆக்சிஜனேற்றம்
- ஆக்சிஜனேற்ற எண் **குறைந்தால்** → ஒடுக்கம்
```

### u8: Oxidation of iron(II) to iron(III) using oxidation number

```text
$$Fe^{2+} \rightarrow Fe^{3+} + e^- $$
இங்கு Fe இன் ஆக்சிஜனேற்ற எண் +2 இலிருந்து +3 ஆக அதிகரிக்கிறது → **ஆக்சிஜனேற்றம்**
```

### u9: Everyday example: rusting of iron

```text
**இரும்பு துருப்பிடித்தல்** (Rusting):
$$4Fe + 3O_2 \rightarrow 2Fe_2O_3$$
Fe ஆக்சிஜனேற்றம் அடைகிறது, O₂ ஒடுக்கம் அடைகிறது
```

### u10: Everyday example: respiration

```text
**சுவாசித்தல்** - உணவு ஆக்சிஜனேற்றம் அடைந்து ஆற்றல் தருகிறது
```

### u11: Everyday example: battery

```text
**மின்கலம் (Battery)** - redox வினை மூலமே மின்சாரம் உற்பத்தி செய்யப்படுகிறது
```

### u12: Key reminder notes on redox reactions

```text
நினைவில் கொள்ளுங்கள்:
✅ Redox வினையில் மொத்த எலக்ட்ரான்கள் இழந்தது = மொத்த எலக்ட்ரான்கள் பெற்றது
✅ ஆக்சிஜனேற்றம் மற்றும் ஒடுக்கம் எப்போதும் **ஒன்றாகவே** நடக்கும்
```

### u13: Practice problem identifying oxidation and reduction

```text
**பயிற்சி கேள்வி:** கீழ்க்கண்ட வினையில் எது ஆக்சிஜனேற்றம் அடைகிறது, எது ஒடுக்கம் அடைகிறது என கண்டறியவும்:

$$Zn + CuSO_4 \rightarrow ZnSO_4 + Cu$$

இதை நீங்கள் முயற்சி செய்து பாருங்கள், சந்தேகம் இருந்தால் கேளுங்கள்! 😊
```
