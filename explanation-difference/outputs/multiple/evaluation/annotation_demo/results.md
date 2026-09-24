# Annotation demonstration

Judge: Gemini-3.8-flash. Source: one Claude redox explanation.

**Unreviewed pilot:** deterministic line segmentation; labels need human review. This is not a quality score.

[Original explanation](source.md) | [Judge prompt](prompt.md) | [Annotated spans](annotated_spans.json) | [Inventory](annotations.json)

| Passage | Source text | Primary | Secondary | Format | Instances | Rationale |
|---|---|---|---|---|---|---|
| p1 | # Redox Reactions Explained | STRUCTURAL |  | heading |  | Main document title heading. |
| p2 | ## What Does &quot;Redox&quot; Mean? | STRUCTURAL |  | heading |  | Section heading framing the definition of redox. |
| p3 | **Redox** is short for **Red**uction-**Ox**idation. It&#x27;s a type of chemical reaction where **electrons are transferred** between substances. | DEF | CONCEPT | prose |  | Defines what &#x27;redox&#x27; stands for and its core scientific criterion (transfer of electrons). |
| p4 | Think of it like a trade: one substance gives away electrons, and another substance receives them. | ANALOGY | CONCEPT | prose | i1 | Uses a commercial trade comparison to explain the simultaneous giving and receiving of electrons. |
| p5 | --- | STRUCTURAL |  | separator |  | Horizontal divider separating introductory concept from the two halves section. |
| p6 | ## The Two Halves of Redox | STRUCTURAL |  | heading |  | Section heading introducing oxidation and reduction halves. |
| p7 | ### 1. Oxidation | STRUCTURAL |  | heading |  | Subheading organizing the discussion of oxidation. |
| p8 | - Definition: **Loss** of electrons | DEF |  | list |  | Defines oxidation explicitly as the loss of electrons. |
| p9 | - Memory trick: **&quot;OIL&quot;** = **O**xidation **I**s **L**oss | STUDY_TIP | DEF | list | i2 | Presents the mnemonic &#x27;OIL&#x27; for remembering oxidation is loss. |
| p10 | ### 2. Reduction | STRUCTURAL |  | heading |  | Subheading organizing the discussion of reduction. |
| p11 | - Definition: **Gain** of electrons | DEF |  | list |  | Defines reduction explicitly as the gain of electrons. |
| p12 | - Memory trick: **&quot;RIG&quot;** = **R**eduction **I**s **G**ain | STUDY_TIP | DEF | list | i2 | Presents the mnemonic &#x27;RIG&#x27; for remembering reduction is gain. |
| p13 | **Combined memory trick: &quot;OIL RIG&quot;** 🛢️ | STUDY_TIP | DEF | prose | i2 | Presents the combined mnemonic &#x27;OIL RIG&#x27;. |
| p14 | --- | STRUCTURAL |  | separator |  | Horizontal divider separating mnemonics from the example section. |
| p15 | ## A Simple Example | STRUCTURAL |  | heading |  | Section heading for the worked example. |
| p16 | Consider this reaction: | WORKED |  | prose | i3 | Introduces the specific reaction to be analyzed. |
| p17 | $$Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$$ | WORKED |  | equation | i3 | Displays the chemical equation for the reaction being broken down. |
| p18 | Let&#x27;s break it down: | WORKED | STRUCTURAL | prose | i3 | Transitional prompt indicating the breakdown of the reaction. |
| p19 | &#124; Substance &#124; What Happens &#124; Electrons &#124; Term &#124; | STRUCTURAL | WORKED | table | i3 | Header row of the table categorizing each half of the reaction. |
| p20 | &#124;-----------&#124;--------------&#124;-----------&#124;------&#124; | STRUCTURAL |  | table, separator | i3 | Markdown table formatting separator line. |
| p21 | &#124; Zn → Zn²⁺ &#124; Loses 2 electrons &#124; Zn → Zn²⁺ + 2e⁻ &#124; **Oxidized** &#124; | WORKED | CONCEPT | table, equation | i3 | Analyzes the zinc half-reaction by identifying electron loss and concluding that Zn is oxidized. |
| p22 | &#124; Cu²⁺ → Cu &#124; Gains 2 electrons &#124; Cu²⁺ + 2e⁻ → Cu &#124; **Reduced** &#124; | WORKED | CONCEPT | table, equation | i3 | Analyzes the copper half-reaction by identifying electron gain and concluding that Cu2+ is reduced. |
| p23 | --- | STRUCTURAL |  | separator |  | Horizontal divider separating the worked example from vocabulary. |
| p24 | ## Key Vocabulary | STRUCTURAL |  | heading |  | Section heading for key vocabulary. |
| p25 | - **Oxidizing Agent**: The substance that *causes* oxidation by *accepting* electrons (it gets reduced itself) | DEF | CONCEPT | list |  | Defines the term &#x27;oxidizing agent&#x27; and explains its role. |
| p26 |   - In our example: Cu²⁺ is the oxidizing agent | WORKED |  | list | i3 | Applies the oxidizing agent definition back to the Zn/Cu2+ example. |
| p27 | - **Reducing Agent**: The substance that *causes* reduction by *donating* electrons (it gets oxidized itself) | DEF | CONCEPT | list |  | Defines the term &#x27;reducing agent&#x27; and explains its role. |
| p28 |   - In our example: Zn is the reducing agent | WORKED |  | list | i3 | Applies the reducing agent definition back to the Zn/Cu2+ example. |
| p29 | --- | STRUCTURAL |  | separator |  | Horizontal divider separating vocabulary from real-world applications. |
| p30 | ## Why Does This Matter? | STRUCTURAL |  | heading |  | Section heading motivating real-world relevance. |
| p31 | Redox reactions are everywhere in daily life: | CONCEPT |  | prose |  | States that redox reactions are ubiquitous in daily life. |
| p32 | - 🔋 **Batteries** (electron transfer creates electrical energy) | REALWORLD | CONCEPT | list | i4 | Mentions batteries and explicitly connects them to electron transfer generating electrical energy. |
| p33 | - 🔥 **Combustion** (burning fuel, like wood or gasoline) | REALWORLD |  | list | i5 | Mentions combustion of fuels like wood and gasoline as real-world redox. |
| p34 | - 🍎 **Metabolism** (your body breaking down food for energy) | REALWORLD | CONCEPT | list | i6 | Mentions metabolism as the body breaking down food for energy via redox. |
| p35 | - 🚗 **Rusting** (iron reacting with oxygen) | REALWORLD |  | list | i7 | Mentions rusting as iron reacting with oxygen in everyday life. |
| p36 | --- | STRUCTURAL |  | separator |  | Horizontal divider separating real-world examples from oxidation numbers. |
| p37 | ## Quick Check: Oxidation Numbers | STRUCTURAL |  | heading |  | Section heading introducing oxidation numbers. |
| p38 | Another way to spot redox reactions is by tracking **oxidation numbers** (also called oxidation states): | CONCEPT | PROCEDURE | prose |  | Introduces oxidation numbers/states as an alternative method to identify redox reactions. |
| p39 | - If an element&#x27;s oxidation number **increases** → it&#x27;s **oxidized** | CONCEPT | DEF | list |  | States the general rule that an increase in oxidation number indicates oxidation. |
| p40 | - If an element&#x27;s oxidation number **decreases** → it&#x27;s **reduced** | CONCEPT | DEF | list |  | States the general rule that a decrease in oxidation number indicates reduction. |
| p41 | **Example:** | WORKED | STRUCTURAL | prose | i8 | Introduces a specific worked example demonstrating oxidation numbers. |
| p42 | $$2Na + Cl_2 \rightarrow 2NaCl$$ | WORKED |  | equation | i8 | Presents the chemical equation for the reaction of sodium and chlorine. |
| p43 | - Na: 0 → +1 (increased) → **oxidized** | WORKED | CONCEPT | list | i8 | Traces Na oxidation state change from 0 to +1 and classifies it as oxidized. |
| p44 | - Cl: 0 → −1 (decreased) → **reduced** | WORKED | CONCEPT | list | i8 | Traces Cl oxidation state change from 0 to -1 and classifies it as reduced. |
| p45 | --- | STRUCTURAL |  | separator |  | Horizontal divider preceding the summary table. |
| p46 | ## Summary Table | STRUCTURAL |  | heading |  | Heading for the summary table. |
| p47 | &#124; Term &#124; Electron Change &#124; Oxidation Number &#124; Role &#124; | STRUCTURAL |  | table |  | Summary table column header row. |
| p48 | &#124;------&#124;-----------------&#124;-------------------&#124;------&#124; | STRUCTURAL |  | table, separator |  | Summary table markdown separator row. |
| p49 | &#124; Oxidation &#124; Loses electrons &#124; Increases &#124; Reducing agent gets oxidized &#124; | RECAP | DEF, CONCEPT | table |  | Recapitulates criteria for oxidation (electron loss, oxidation number increase, reducing agent). |
| p50 | &#124; Reduction &#124; Gains electrons &#124; Decreases &#124; Oxidizing agent gets reduced &#124; | RECAP | DEF, CONCEPT | table |  | Recapitulates criteria for reduction (electron gain, oxidation number decrease, oxidizing agent). |
| p51 | --- | STRUCTURAL |  | separator |  | Horizontal divider separating summary table from concluding takeaway. |
| p52 | **Remember:** In every redox reaction, oxidation and reduction happen **together**—you can&#x27;t have one without the other, just like you can&#x27;t have a trade with only one person! 🤝 | CONCEPT | ANALOGY, RECAP | prose | i1 | Explains the core principle that oxidation and reduction are coupled and must happen together, reiterating the trade analogy. |
| p53 | Would you like me to walk through a practice problem to test your understanding? | SOCIAL |  | prose |  | Offers to provide a practice problem; does not contain a question itself. |

## Content instances

- **i1 analogy**: two-way trade analogy for electron transfer (p4, p52)
- **i2 study_tip**: OIL RIG mnemonic (p9, p12, p13)
- **i3 worked_example**: zinc reacting with copper(II) ions (p16, p17, p18, p19, p20, p21, p22, p26, p28)
- **i4 realworld_example**: batteries (p32)
- **i5 realworld_example**: combustion of fuels (p33)
- **i6 realworld_example**: cellular metabolism (p34)
- **i7 realworld_example**: rusting of iron (p35)
- **i8 worked_example**: sodium reacting with chlorine gas (p41, p42, p43, p44)
