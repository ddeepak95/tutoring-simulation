# Tamil redox boundary pilot

Two stages with Gemini-3.8-flash; proposed boundaries only. No accuracy enrichment yet.

## Stage 1: 13 units

| ID | Kind | Label |
|---|---|---|
| u1 | CONCEPT | Definition and simultaneous nature of redox reactions |
| u2 | CONCEPT | Electron transfer definitions of oxidation and reduction |
| u3 | STUDY_SUPPORT | OIL RIG mnemonic for electron transfer |
| u4 | STUDY_SUPPORT | LEO says GER mnemonic |
| u5 | EXAMPLE | Redox reaction between sodium and chlorine |
| u6 | CONCEPT | Oxidizing and reducing agents |
| u7 | CONCEPT | Definition of oxidation number and redox rules |
| u8 | EXAMPLE | Oxidation of Fe2+ to Fe3+ via oxidation number increase |
| u9 | EXAMPLE | Rusting of iron as a redox reaction |
| u10 | EXAMPLE | Respiration as an everyday redox reaction |
| u11 | EXAMPLE | Batteries generating electricity through redox reactions |
| u12 | STUDY_SUPPORT | Key summary takeaways for redox reactions |
| u13 | STUDY_SUPPORT | Practice problem identifying oxidation and reduction |

### Changes and ambiguities

```json
{
  "changes": [],
  "ambiguities": [
    {
      "unit_ids": [
        "u6"
      ],
      "issue": "The table under 'ஆக்சிஜனேற்றும் காரணி & ஒடுக்கும் காரணி' combines general definitions of oxidizing and reducing agents with specific assignments for the preceding NaCl example in a single Markdown table.",
      "proposed_resolution": "Keep the entire table together as a single CONCEPT unit because Markdown table row syntax does not cleanly separate into disjoint concept and example units without fragmenting formatting."
    }
  ]
}
```

### u1: Definition and simultaneous nature of redox reactions

```text
**Redox** என்பது **Red**uction (ஒடுக்கம்) + **Ox**idation (ஆக்சிஜனேற்றம்) என்ற இரு வார்த்தைகளின் சேர்க்கை. இந்த இரு வினைகளும் எப்போதும் **ஒரே நேரத்தில்** நடைபெறும். ஒன்று இல்லாமல் மற்றொன்று நடக்காது!
```

### u2: Electron transfer definitions of oxidation and reduction

```text
Redox வினையின் மையக் கருத்து: **எலக்ட்ரான்களின் பரிமாற்றம் (transfer)**
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானை இழக்கும்** (lose electrons) போது அதை ஆக்சிஜனேற்றம் என்கிறோம்
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானைப் பெறும்** (gain electrons) போது அதை ஒடுக்கம் என்கிறோம்
```

### u3: OIL RIG mnemonic for electron transfer

```text
நினைவில் வைக்க: **OIL** - **O**xidation **I**s **L**oss (of electrons)
```

```text
நினைவில் வைக்க: **RIG** - **R**eduction **I**s **G**ain (of electrons)
```

### u4: LEO says GER mnemonic

```text
**சுருக்கமாக: LEO says GER**
- L (Loss) E (Electron) O (Oxidation)
- G (Gain) E (Electron) R (Reduction)
```

### u5: Redox reaction between sodium and chlorine

```text
சோடியம் மற்றும் குளோரின் வினையைப் பார்ப்போம்:

$$2Na + Cl_2 \rightarrow 2NaCl$$

**என்ன நடக்கிறது?**

- **Na (சோடியம்)** → 1 எலக்ட்ரானை இழக்கிறது → Na⁺ ஆகிறது → **ஆக்சிஜனேற்றம் அடைகிறது**
- **Cl (குளோரின்)** → 1 எலக்ட்ரானைப் பெறுகிறது → Cl⁻ ஆகிறது → **ஒடுக்கம் அடைகிறது**

$$Na \rightarrow Na^+ + e^- \quad \text{(ஆக்சிஜனேற்றம்)}$$
$$Cl + e^- \rightarrow Cl^- \quad \text{(ஒடுக்கம்)}$$
```

### u6: Oxidizing and reducing agents

```text
| பெயர் | வரையறை | இந்த உதாரணத்தில் |
|------|---------|-------------------|
| **ஆக்சிஜனேற்றும் காரணி** (Oxidizing Agent) | மற்றவைகளை ஆக்சிஜனேற்றம் செய்யும், தானே ஒடுக்கம் அடையும் | Cl₂ |
| **ஒடுக்கும் காரணி** (Reducing Agent) | மற்றவைகளை ஒடுக்கம் செய்யும், தானே ஆக்சிஜனேற்றம் அடையும் | Na |
```

### u7: Definition of oxidation number and redox rules

```text
இது ஒரு அணுவின் "மின்சார நிலையை" குறிக்கும் எண். இதன் மூலம் நாம் எளிதாக கண்டறியலாம்:

- ஆக்சிஜனேற்ற எண் **அதிகரித்தால்** → ஆக்சிஜனேற்றம்
- ஆக்சிஜனேற்ற எண் **குறைந்தால்** → ஒடுக்கம்
```

### u8: Oxidation of Fe2+ to Fe3+ via oxidation number increase

```text
$$Fe^{2+} \rightarrow Fe^{3+} + e^- $$
இங்கு Fe இன் ஆக்சிஜனேற்ற எண் +2 இலிருந்து +3 ஆக அதிகரிக்கிறது → **ஆக்சிஜனேற்றம்**
```

### u9: Rusting of iron as a redox reaction

```text
1. **இரும்பு துருப்பிடித்தல்** (Rusting):
$$4Fe + 3O_2 \rightarrow 2Fe_2O_3$$
Fe ஆக்சிஜனேற்றம் அடைகிறது, O₂ ஒடுக்கம் அடைகிறது
```

### u10: Respiration as an everyday redox reaction

```text
2. **சுவாசித்தல்** - உணவு ஆக்சிஜனேற்றம் அடைந்து ஆற்றல் தருகிறது
```

### u11: Batteries generating electricity through redox reactions

```text
3. **மின்கலம் (Battery)** - redox வினை மூலமே மின்சாரம் உற்பத்தி செய்யப்படுகிறது
```

### u12: Key summary takeaways for redox reactions

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
| u1 | CONCEPT | Definition and simultaneous nature of redox reactions |
| u2 | CONCEPT | Electron transfer definitions of oxidation and reduction |
| u3 | STUDY_SUPPORT | OIL RIG mnemonic for electron transfer |
| u4 | STUDY_SUPPORT | LEO says GER mnemonic |
| u5 | EXAMPLE | Redox reaction between sodium and chlorine |
| u6 | CONCEPT | Oxidizing and reducing agents |
| u7 | CONCEPT | Definition of oxidation number and redox rules |
| u8 | EXAMPLE | Oxidation of Fe2+ to Fe3+ via oxidation number increase |
| u9 | EXAMPLE | Rusting of iron as a redox reaction |
| u10 | EXAMPLE | Respiration as an everyday redox reaction |
| u11 | EXAMPLE | Batteries generating electricity through redox reactions |
| u12 | STUDY_SUPPORT | Key summary takeaways for redox reactions |
| u13 | STUDY_SUPPORT | Practice problem identifying oxidation and reduction |

### Changes and ambiguities

```json
{
  "changes": [],
  "ambiguities": [
    {
      "unit_ids": [
        "u6"
      ],
      "issue": "The table under 'ஆக்சிஜனேற்றும் காரணி & ஒடுக்கும் காரணி' combines general definitions of oxidizing and reducing agents with specific assignments for the preceding NaCl example in a single Markdown table.",
      "proposed_resolution": "Keep the entire table together as a single CONCEPT unit because Markdown table row syntax does not cleanly separate into disjoint concept and example units without fragmenting formatting."
    }
  ]
}
```

### u1: Definition and simultaneous nature of redox reactions

```text
**Redox** என்பது **Red**uction (ஒடுக்கம்) + **Ox**idation (ஆக்சிஜனேற்றம்) என்ற இரு வார்த்தைகளின் சேர்க்கை. இந்த இரு வினைகளும் எப்போதும் **ஒரே நேரத்தில்** நடைபெறும். ஒன்று இல்லாமல் மற்றொன்று நடக்காது!
```

### u2: Electron transfer definitions of oxidation and reduction

```text
Redox வினையின் மையக் கருத்து: **எலக்ட்ரான்களின் பரிமாற்றம் (transfer)**
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானை இழக்கும்** (lose electrons) போது அதை ஆக்சிஜனேற்றம் என்கிறோம்
```

```text
ஒரு அணு/மூலக்கூறு **எலக்ட்ரானைப் பெறும்** (gain electrons) போது அதை ஒடுக்கம் என்கிறோம்
```

### u3: OIL RIG mnemonic for electron transfer

```text
நினைவில் வைக்க: **OIL** - **O**xidation **I**s **L**oss (of electrons)
```

```text
நினைவில் வைக்க: **RIG** - **R**eduction **I**s **G**ain (of electrons)
```

### u4: LEO says GER mnemonic

```text
**சுருக்கமாக: LEO says GER**
- L (Loss) E (Electron) O (Oxidation)
- G (Gain) E (Electron) R (Reduction)
```

### u5: Redox reaction between sodium and chlorine

```text
சோடியம் மற்றும் குளோரின் வினையைப் பார்ப்போம்:

$$2Na + Cl_2 \rightarrow 2NaCl$$

**என்ன நடக்கிறது?**

- **Na (சோடியம்)** → 1 எலக்ட்ரானை இழக்கிறது → Na⁺ ஆகிறது → **ஆக்சிஜனேற்றம் அடைகிறது**
- **Cl (குளோரின்)** → 1 எலக்ட்ரானைப் பெறுகிறது → Cl⁻ ஆகிறது → **ஒடுக்கம் அடைகிறது**

$$Na \rightarrow Na^+ + e^- \quad \text{(ஆக்சிஜனேற்றம்)}$$
$$Cl + e^- \rightarrow Cl^- \quad \text{(ஒடுக்கம்)}$$
```

### u6: Oxidizing and reducing agents

```text
| பெயர் | வரையறை | இந்த உதாரணத்தில் |
|------|---------|-------------------|
| **ஆக்சிஜனேற்றும் காரணி** (Oxidizing Agent) | மற்றவைகளை ஆக்சிஜனேற்றம் செய்யும், தானே ஒடுக்கம் அடையும் | Cl₂ |
| **ஒடுக்கும் காரணி** (Reducing Agent) | மற்றவைகளை ஒடுக்கம் செய்யும், தானே ஆக்சிஜனேற்றம் அடையும் | Na |
```

### u7: Definition of oxidation number and redox rules

```text
இது ஒரு அணுவின் "மின்சார நிலையை" குறிக்கும் எண். இதன் மூலம் நாம் எளிதாக கண்டறியலாம்:

- ஆக்சிஜனேற்ற எண் **அதிகரித்தால்** → ஆக்சிஜனேற்றம்
- ஆக்சிஜனேற்ற எண் **குறைந்தால்** → ஒடுக்கம்
```

### u8: Oxidation of Fe2+ to Fe3+ via oxidation number increase

```text
$$Fe^{2+} \rightarrow Fe^{3+} + e^- $$
இங்கு Fe இன் ஆக்சிஜனேற்ற எண் +2 இலிருந்து +3 ஆக அதிகரிக்கிறது → **ஆக்சிஜனேற்றம்**
```

### u9: Rusting of iron as a redox reaction

```text
1. **இரும்பு துருப்பிடித்தல்** (Rusting):
$$4Fe + 3O_2 \rightarrow 2Fe_2O_3$$
Fe ஆக்சிஜனேற்றம் அடைகிறது, O₂ ஒடுக்கம் அடைகிறது
```

### u10: Respiration as an everyday redox reaction

```text
2. **சுவாசித்தல்** - உணவு ஆக்சிஜனேற்றம் அடைந்து ஆற்றல் தருகிறது
```

### u11: Batteries generating electricity through redox reactions

```text
3. **மின்கலம் (Battery)** - redox வினை மூலமே மின்சாரம் உற்பத்தி செய்யப்படுகிறது
```

### u12: Key summary takeaways for redox reactions

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
