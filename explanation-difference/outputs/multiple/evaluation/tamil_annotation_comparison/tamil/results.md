# Annotation demonstration

Judge: Gemini-3.8-flash. Source: one Claude redox explanation.

**Unreviewed pilot:** deterministic line segmentation; labels need human review. This is not a quality score.

[Original explanation](source.md) | [Judge prompt](prompt.md) | [Annotated spans](annotated_spans.json) | [Inventory](annotations.json)

| Passage | Source text | Primary | Secondary | Format | Instances | Rationale |
|---|---|---|---|---|---|---|
| p1 | # ஆக்சிஜனேற்ற - ஒடுக்க வினைகள் (Redox Reactions) | STRUCTURAL |  | heading |  | Main document heading naming the topic. |
| p2 | வணக்கம்! இந்த முக்கியமான தலைப்பை எளிமையாகப் புரிந்துகொள்வோம். | SOCIAL |  | prose |  | Greeting and friendly introductory framing. |
| p3 | ## 1. அடிப்படை வரையறை | STRUCTURAL |  | heading |  | Section heading for the basic definition. |
| p4 | **ஆக்சிஜனேற்றம் (Oxidation)** மற்றும் **ஒடுக்கம் (Reduction)** எப்போதும் ஒன்றாகவே நடக்கும். ஒன்று இல்லாமல் மற்றொன்று நடக்காது - அதனால்தான் இதை **&quot;Redox&quot;** (Reduction + Oxidation) என்று அழைக்கிறோம். | CONCEPT | DEF | prose |  | Explains why oxidation and reduction occur together and explains the term &#x27;Redox&#x27;. |
| p5 | ## 2. மூன்று வகையான வரையறைகள் | STRUCTURAL |  | heading |  | Organizational section heading introducing three types of definitions. |
| p6 | ### அ) பழைய முறை (ஆக்சிஜன் அடிப்படையில்) | STRUCTURAL |  | heading |  | Subsection heading for classical oxygen/hydrogen definitions. |
| p7 | &#124; &#124; ஆக்சிஜனேற்றம் &#124; ஒடுக்கம் &#124; | STRUCTURAL |  | table |  | Table header row for comparing oxidation and reduction. |
| p8 | &#124;---&#124;---&#124;---&#124; | STRUCTURAL |  | separator, table |  | Table markdown delimiter line. |
| p9 | &#124; ஆக்சிஜன் &#124; சேர்க்கப்படும் &#124; நீக்கப்படும் &#124; | DEF |  | table |  | Defines oxidation as addition of oxygen and reduction as removal of oxygen. |
| p10 | &#124; ஹைட்ரஜன் &#124; நீக்கப்படும் &#124; சேர்க்கப்படும் &#124; | DEF |  | table |  | Defines oxidation as removal of hydrogen and reduction as addition of hydrogen. |
| p11 | **உதாரணம்:**  | STRUCTURAL |  | prose |  | Text label introducing an example. |
| p12 | $$2Mg + O_2 \rightarrow 2MgO$$ | WORKED |  | equation | i1 | Reaction equation setup for the magnesium oxidation example. |
| p13 | இங்கு Mg ஆக்சிஜனேற்றம் அடைகிறது (O சேர்கிறது) | WORKED | CONCEPT | prose | i1 | Applies the oxygen addition definition to conclude that Mg is oxidized. |
| p14 | ### ஆ) எலக்ட்ரான் அடிப்படையில் (முக்கியமானது!) | STRUCTURAL |  | heading |  | Subsection heading for the electron transfer definition. |
| p15 | - **ஆக்சிஜனேற்றம்** = எலக்ட்ரான் **இழத்தல்** (Loss of electrons) | DEF |  | list |  | Defines oxidation as the loss of electrons. |
| p16 | - **ஒடுக்கம்** = எலக்ட்ரான் **பெறுதல்** (Gain of electrons) | DEF |  | list |  | Defines reduction as the gain of electrons. |
| p17 | **நினைவில் வைக்க எளிய வழி - &quot;OIL RIG&quot;** | STUDY_TIP |  | prose | i2 | Introduces the mnemonic OIL RIG for remembering electron definitions. |
| p18 | - **O**xidation **I**s **L**oss (ஆக்சிஜனேற்றம் = இழத்தல்) | STUDY_TIP | DEF | list | i2 | Elaborates the OIL component of the mnemonic while stating the definition. |
| p19 | - **R**eduction **I**s **G**ain (ஒடுக்கம் = பெறுதல்) | STUDY_TIP | DEF | list | i2 | Elaborates the RIG component of the mnemonic while stating the definition. |
| p20 | **உதாரணம்:** | STRUCTURAL |  | prose |  | Text label introducing the half-reaction examples. |
| p21 | $$Zn \rightarrow Zn^{2+} + 2e^-$$ (Zn எலக்ட்ரானை இழக்கிறது → ஆக்சிஜனேற்றம்) | WORKED | CONCEPT | equation, prose | i3 | Shows Zn electron loss half-reaction and classifies it as oxidation. |
| p22 | $$Cu^{2+} + 2e^- \rightarrow Cu$$ (Cu எலக்ட்ரானைப் பெறுகிறது → ஒடுக்கம்) | WORKED | CONCEPT | equation, prose | i3 | Shows Cu2+ electron gain half-reaction and classifies it as reduction. |
| p23 | ### இ) ஆக்சிஜனேற்ற எண் அடிப்படையில் | STRUCTURAL |  | heading |  | Subsection heading for the oxidation state definition. |
| p24 | - ஆக்சிஜனேற்றம் = ஆக்சிஜனேற்ற எண் **அதிகரிக்கும்** | DEF |  | list |  | Defines oxidation as an increase in oxidation number. |
| p25 | - ஒடுக்கம் = ஆக்சிஜனேற்ற எண் **குறையும்** | DEF |  | list |  | Defines reduction as a decrease in oxidation number. |
| p26 | ## 3. முழு எடுத்துக்காட்டு | STRUCTURAL |  | heading |  | Section heading for the comprehensive worked example. |
| p27 | $$Zn + CuSO_4 \rightarrow ZnSO_4 + Cu$$ | WORKED |  | equation | i3 | Overall chemical equation setup for the Zn + CuSO4 displacement reaction. |
| p28 | &#124; உலோகம் &#124; மாற்றம் &#124; ஆக்சிஜனேற்ற எண் &#124; செயல்முறை &#124; | STRUCTURAL |  | table |  | Table header row analyzing oxidation state changes. |
| p29 | &#124;---&#124;---&#124;---&#124;---&#124; | STRUCTURAL |  | separator, table |  | Table markdown separator line. |
| p30 | &#124; Zn &#124; Zn → Zn²⁺ &#124; 0 → +2 &#124; ஆக்சிஜனேற்றம் &#124; | WORKED | CONCEPT | table | i3 | Tracks Zn oxidation number change (0 to +2) and classifies it as oxidation. |
| p31 | &#124; Cu &#124; Cu²⁺ → Cu &#124; +2 → 0 &#124; ஒடுக்கம் &#124; | WORKED | CONCEPT | table | i3 | Tracks Cu oxidation number change (+2 to 0) and classifies it as reduction. |
| p32 | ## 4. முக்கிய சொற்கள் | STRUCTURAL |  | heading |  | Section heading for key terms (agents). |
| p33 | - **ஆக்சிஜனேற்றி (Oxidizing agent)**: மற்றொரு பொருளை ஆக்சிஜனேற்றம் செய்யும் பொருள் (தானே ஒடுக்கம் அடையும்) | DEF |  | list |  | Defines an oxidizing agent as a substance that oxidizes another and is itself reduced. |
| p34 | - **ஒடுக்கி (Reducing agent)**: மற்றொரு பொருளை ஒடுக்கும் பொருள் (தானே ஆக்சிஜனேற்றம் அடையும்) | DEF |  | list |  | Defines a reducing agent as a substance that reduces another and is itself oxidized. |
| p35 | மேலே உள்ள உதாரணத்தில்: | STRUCTURAL |  | prose |  | Lead-in phrase connecting the definitions to the preceding example. |
| p36 | - Zn → ஒடுக்கி (Cu-ஐ ஒடுக்குகிறது) | WORKED | CONCEPT | list | i3 | Identifies Zn as the reducing agent in the Zn + CuSO4 reaction. |
| p37 | - CuSO₄ → ஆக்சிஜனேற்றி (Zn-ஐ ஆக்சிஜனேற்றம் செய்கிறது) | WORKED | CONCEPT | list | i3 | Identifies CuSO4 as the oxidizing agent in the Zn + CuSO4 reaction. |
| p38 | ## 5. அன்றாட வாழ்வில் உதாரணங்கள் | STRUCTURAL |  | heading |  | Section heading for real-world everyday examples. |
| p39 | 1. **இரும்பு துருப்பிடித்தல்**: $4Fe + 3O_2 \rightarrow 2Fe_2O_3$ | REALWORLD |  | list, equation | i4 | Presents iron rusting with its chemical reaction equation. |
| p40 | 2. **சுவாசம்**: குளுக்கோஸ் ஆக்சிஜனேற்றம் அடைந்து ஆற்றல் தருகிறது | REALWORLD |  | list | i5 | Presents cellular respiration as glucose oxidation producing energy. |
| p41 | 3. **மின்கலன்கள் (Batteries)**: redox வினைகள் மூலமே மின்சாரம் உற்பத்தி செய்யப்படுகிறது | REALWORLD |  | list | i6 | Presents batteries generating electricity via redox reactions. |
| p42 | ## பயிற்சி கேள்வி | STRUCTURAL |  | heading |  | Section heading introducing the practice problem. |
| p43 | கீழ்கண்ட வினையில் எது ஆக்சிஜனேற்றம், எது ஒடுக்கம் எனக் கண்டறியவும்: | PRACTICE |  | prose | i7 | Prompts the student to identify oxidation and reduction in the reaction below. |
| p44 | $$Fe_2O_3 + 2Al \rightarrow Al_2O_3 + 2Fe$$ | PRACTICE |  | equation | i7 | Supplies the chemical reaction equation for the practice problem. |
| p45 | *(உங்கள் பதிலை முயற்சி செய்யுங்கள் - நான் சரி பார்க்க உதவுவேன்!)* | SOCIAL |  | prose |  | Encouraging conversational sign-off offering to check the student&#x27;s answer. |

## Content instances

- **i1 worked_example**: magnesium oxidation reaction (p12, p13)
- **i2 study_tip**: OIL RIG mnemonic (p17, p18, p19)
- **i3 worked_example**: zinc and copper displacement redox reaction (p21, p22, p27, p30, p31, p36, p37)
- **i4 realworld_example**: rusting of iron (p39)
- **i5 realworld_example**: cellular respiration (p40)
- **i6 realworld_example**: chemical batteries (p41)
- **i7 practice_question**: thermite reaction redox identification (p43, p44)
