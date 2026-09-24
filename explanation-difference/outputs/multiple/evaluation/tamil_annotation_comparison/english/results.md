# Annotation demonstration

Judge: Gemini-3.8-flash. Source: one Claude redox explanation.

**Unreviewed pilot:** deterministic line segmentation; labels need human review. This is not a quality score.

[Original explanation](source.md) | [Judge prompt](prompt.md) | [Annotated spans](annotated_spans.json) | [Inventory](annotations.json)

| Passage | Source text | Primary | Secondary | Format | Instances | Rationale |
|---|---|---|---|---|---|---|
| p1 | # Oxidation - Reduction Reactions (Redox Reactions) | STRUCTURAL |  | heading |  | Main document heading introducing the topic. |
| p2 | Hello! Let us understand this important topic simply. | SOCIAL |  | prose |  | Introductory greeting and conversational framing. |
| p3 | ## 1. Basic Definition | STRUCTURAL |  | heading |  | Section heading for the basic definition. |
| p4 | **Oxidation** and **Reduction** always happen together. One does not happen without the other - that is why we call this **&quot;Redox&quot;** (Reduction + Oxidation). | DEF | CONCEPT | prose |  | Defines redox as the simultaneous occurrence of oxidation and reduction. |
| p5 | ## 2. Three Types of Definitions | STRUCTURAL |  | heading |  | Section heading introducing three perspectives on redox definitions. |
| p6 | ### a) Old method (Based on oxygen) | STRUCTURAL |  | heading |  | Subsection heading for the classical oxygen-based definition. |
| p7 | &#124; &#124; Oxidation &#124; Reduction &#124; | STRUCTURAL |  | table |  | Header row of the summary table comparing oxidation and reduction. |
| p8 | &#124;---&#124;---&#124;---&#124; | STRUCTURAL |  | separator, table |  | Markdown table separator line. |
| p9 | &#124; Oxygen &#124; is added &#124; is removed &#124; | DEF |  | table |  | Defines oxidation and reduction in terms of oxygen gain and loss. |
| p10 | &#124; Hydrogen &#124; is removed &#124; is added &#124; | DEF |  | table |  | Defines oxidation and reduction in terms of hydrogen loss and gain. |
| p11 | **Example:**  | STRUCTURAL |  | prose |  | Structural label introducing an example. |
| p12 | $$2Mg + O_2 \rightarrow 2MgO$$ | WORKED |  | equation | i1 | Presents the chemical equation acting as givens for classification. |
| p13 | Here Mg undergoes oxidation (O is added) | WORKED | CONCEPT | prose | i1 | Classifies Mg as undergoing oxidation and provides the mechanistic rationale (oxygen added). |
| p14 | ### b) Based on electrons (Important!) | STRUCTURAL |  | heading |  | Subsection heading for the electron-transfer definition. |
| p15 | - **Oxidation** = **Loss** of electrons (Loss of electrons) | DEF |  | list |  | Defines oxidation as loss of electrons. |
| p16 | - **Reduction** = **Gain** of electrons (Gain of electrons) | DEF |  | list |  | Defines reduction as gain of electrons. |
| p17 | **Easy way to remember - &quot;OIL RIG&quot;** | STUDY_TIP |  | prose | i2 | Introduces the OIL RIG mnemonic for remembering electron transfer. |
| p18 | - **O**xidation **I**s **L**oss (Oxidation = loss) | STUDY_TIP | DEF | list | i2 | Expands the mnemonic letter O-I-L to define oxidation. |
| p19 | - **R**eduction **I**s **G**ain (Reduction = gain) | STUDY_TIP | DEF | list | i2 | Expands the mnemonic letter R-I-G to define reduction. |
| p20 | **Example:** | STRUCTURAL |  | prose |  | Structural label introducing half-reaction examples. |
| p21 | $$Zn \rightarrow Zn^{2+} + 2e^-$$ (Zn loses electrons → Oxidation) | WORKED |  | prose, equation | i3 | Provides a half-reaction, identifies electron loss, and concludes oxidation. |
| p22 | $$Cu^{2+} + 2e^- \rightarrow Cu$$ (Cu gains electrons → Reduction) | WORKED |  | prose, equation | i3 | Provides a half-reaction, identifies electron gain, and concludes reduction. |
| p23 | ### c) Based on oxidation number | STRUCTURAL |  | heading |  | Subsection heading for oxidation number criteria. |
| p24 | - Oxidation = oxidation number **increases** | DEF |  | list |  | Defines oxidation as an increase in oxidation number. |
| p25 | - Reduction = oxidation number **decreases** | DEF |  | list |  | Defines reduction as a decrease in oxidation number. |
| p26 | ## 3. Full Example | STRUCTURAL |  | heading |  | Section heading introducing a comprehensive worked example. |
| p27 | $$Zn + CuSO_4 \rightarrow ZnSO_4 + Cu$$ | WORKED |  | equation | i4 | Sets up the reaction to be analyzed. |
| p28 | &#124; Metal &#124; Change &#124; Oxidation number &#124; Process &#124; | STRUCTURAL |  | table |  | Header row of the analysis table. |
| p29 | &#124;---&#124;---&#124;---&#124;---&#124; | STRUCTURAL |  | separator, table |  | Table separator line. |
| p30 | &#124; Zn &#124; Zn → Zn²⁺ &#124; 0 → +2 &#124; Oxidation &#124; | WORKED |  | table | i4 | Tracks zinc&#x27;s oxidation state change from 0 to +2 to deduce oxidation. |
| p31 | &#124; Cu &#124; Cu²⁺ → Cu &#124; +2 → 0 &#124; Reduction &#124; | WORKED |  | table | i4 | Tracks copper&#x27;s oxidation state change from +2 to 0 to deduce reduction. |
| p32 | ## 4. Key Terms | STRUCTURAL |  | heading |  | Section heading for key redox terms. |
| p33 | - **Oxidizing agent (Oxidizing agent)**: The substance that oxidizes another substance (itself undergoes reduction) | DEF |  | list |  | Defines an oxidizing agent. |
| p34 | - **Reducing agent (Reducing agent)**: The substance that reduces another substance (itself undergoes oxidation) | DEF |  | list |  | Defines a reducing agent. |
| p35 | In the example above: | STRUCTURAL |  | prose |  | Transitions from definitions to applying them to the preceding example. |
| p36 | - Zn → Reducing agent (reduces Cu) | WORKED |  | list | i4 | Applies definition to conclude Zn is the reducing agent. |
| p37 | - CuSO₄ → Oxidizing agent (oxidizes Zn) | WORKED |  | list | i4 | Applies definition to conclude CuSO4 is the oxidizing agent. |
| p38 | ## 5. Examples in Daily Life | STRUCTURAL |  | heading |  | Section heading for real-world applications. |
| p39 | 1. **Rusting of iron**: $4Fe + 3O_2 \rightarrow 2Fe_2O_3$ | REALWORLD |  | list, equation | i5 | Presents iron rusting as an everyday redox reaction with its equation. |
| p40 | 2. **Respiration**: Glucose undergoes oxidation and gives energy | REALWORLD |  | list | i6 | Mentions respiration as glucose oxidation yielding energy. |
| p41 | 3. **Batteries (Batteries)**: Electricity is produced through redox reactions only | REALWORLD |  | list | i7 | Mentions batteries generating electricity via redox processes. |
| p42 | ## Practice Question | STRUCTURAL |  | heading |  | Section heading introducing practice. |
| p43 | Identify which is oxidation and which is reduction in the following reaction: | PRACTICE |  | prose | i8 | Prompts the student to identify oxidation and reduction. |
| p44 | $$Fe_2O_3 + 2Al \rightarrow Al_2O_3 + 2Fe$$ | PRACTICE |  | equation | i8 | Provides the reaction equation for the practice problem. |
| p45 | *(Try your answer - I will help check it!)* | SOCIAL |  | prose |  | Offers conversational encouragement and assistance to check answers. |

## Content instances

- **i1 worked_example**: oxidation of magnesium by oxygen (p12, p13)
- **i2 study_tip**: OIL RIG mnemonic (p17, p18, p19)
- **i3 worked_example**: zinc and copper half-reaction classifications (p21, p22)
- **i4 worked_example**: zinc and copper sulfate displacement reaction (p27, p30, p31, p36, p37)
- **i5 realworld_example**: rusting of iron (p39)
- **i6 realworld_example**: cellular respiration (p40)
- **i7 realworld_example**: batteries (p41)
- **i8 practice_question**: identifying oxidation and reduction in thermite reaction (p43, p44)
