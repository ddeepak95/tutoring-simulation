# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly and thoroughly covers vapour phase refining, detailing its definition, requirements, two-step mechanism, and the two classic industrial examples (Mond and Van Arkel processes).

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 47,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 47,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Gold Coins and Magic Whistle Analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses an analogy of gold coins mixed with mud being temporarily transformed into ghosts to explain the concept of selective volatilization and subsequent decomposition in vapour phase refining.

Accuracy: **accurate**. The analogy accurately captures the conceptual logic of converting a metal selectively to a gas phase while leaving impurities behind, followed by reconverting it to a pure solid.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Hello! Welcome to our chemistry session. Today, we are going to look at a very clever technique used in metallurgy called **Vapour Phase Refining**.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Don&#x27;t let the fancy name intimidate you. By the end of this, you’ll see it’s just a smart, two-step trick to get extremely pure metals! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### The Big Idea: An Analogy First | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine you have a bucket of gold coins mixed with wet mud and rocks. It’s hard to pick the mud off every single coin.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | Now, imagine you had a magic whistle that could turn *only* the gold coins into invisible ghosts that float up into the air, leaving the mud and rocks sitting at the bottom of the bucket. Then, in another room, you blow a second whistle that turns the ghosts back into solid, shiny, clean gold coins. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | That is **exactly** what Vapour Phase Refining does.  | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition and Purpose of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining as a method of converting impure metal into a volatile compound and decomposing it to recover pure metal, highlighting its purpose for ultra-high purity.

Accuracy: **accurate**. The definition and stated application for achieving ultra-high purity metals are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p9 | ### What is Vapour Phase Refining? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | In simple terms: **It is a method where an impure metal is converted into a gas (vapour), separated from its impurities, and then broken down again to get the pure metal.** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | This is used when we need metals with **ultra-high purity** (for things like space technology or electronics). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Requirements for Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the essential conditions required for vapour phase refining: formation of a volatile compound at lower temperature, ease of decomposition at higher temperature, and non-reactivity of impurities.

Accuracy: **accurate**. Correctly states the two fundamental requirements and the qualification regarding unreactive impurities.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p13 | ### The Two Golden Rules | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | To use this method, the metal must follow two strict rules: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | 1. **Easy to turn into gas:** The metal must easily react with a chemical at a relatively low temperature to form a **volatile compound** (a compound that turns into a gas easily). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | 2. **Easy to break down:** That gas must easily decompose (break apart) at a higher temperature to give back the pure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | *(Crucially: The impurities mixed with the metal must **not** react, so they stay behind as solids).* | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u4: General Two-Step Procedure of Vapour Phase Refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the reusable two-step sequence: formation of the volatile compound at lower temperature followed by thermal decomposition at higher temperature.

Accuracy: **accurate**. The procedural sequence and general chemical word equations accurately describe the two-step mechanism of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### The 2-Step Process | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | #### **Step 1: Formation of the Volatile Compound** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | We take the impure metal and react it with a specific chemical reagent at a lower temperature. The metal combines with this chemical and turns into a gas. The impurities don&#x27;t react and are left behind. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p22 | $$\text{Impure Metal (Solid)} + \text{Reagent} \xrightarrow{\text{Lower Temp}} \text{Metal-Compound (Gas)}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p23 | #### **Step 2: Decomposition (Breaking it down)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | We collect that gas, move it to another chamber, and heat it to a much higher temperature. The compound breaks apart: the pure metal deposits as a solid, and the reagent gas flies away (and can be reused!). | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p25 | $$\text{Metal-Compound (Gas)} \xrightarrow{\text{Higher Temp}} \text{Pure Metal (Solid)} + \text{Reagent}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |

## u5: Mond's Process for Nickel Refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the industrial Mond process for nickel with carbon monoxide.

Accuracy: **accurate**. The reaction equations, reagent (CO), formation of nickel tetracarbonyl, and the approximate temperature ranges (330-350 K and 450-470 K) are fully consistent with standard metallurgical chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p27 | ### Two Classic High School Examples (Must-Know for Exams!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | You will usually see two specific processes on your exams: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | #### 1. Mond’s Process (Used to purify **Nickel**) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | *   **The Trick:** Nickel reacts with **Carbon Monoxide ($\text{CO}$)** gas. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | *   **Step 1:** Impure Nickel is heated with $\text{CO}$ at about $50^\circ\text{C} - 70^\circ\text{C}$ ($330 - 350\text{ K}$). It forms a gas called *Nickel tetracarbonyl*. Impurities are left behind. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 |     $$\text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 \text{ (Gas)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | *   **Step 2:** This gas is then heated to a higher temperature ($200^\circ\text{C}$ or $\approx 450 - 470\text{ K}$). It breaks apart, giving pure solid Nickel and releasing the $\text{CO}$ gas. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 |     $$\text{Ni(CO)}_4 \rightarrow \text{Ni (Pure Solid)} + 4\text{CO}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Van Arkel-de Boer Method for Zirconium and Titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel-de Boer method for purifying zirconium/titanium via iodide formation and tungsten wire decomposition.

Accuracy: **accurate**. The chemical reactions, reagents, volatile iodide formation, and decomposition over an electrically heated tungsten filament around 1800 K accurately describe the Van Arkel process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | #### 2. Van Arkel-de Boer Method (Used for **Zirconium** or **Titanium**) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | *   **The Trick:** These metals react with **Iodine ($\text{I}_2$)**. This is used for metals used in the aerospace industry where even tiny impurities cause brittleness. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p37 | *   **Step 1:** Impure Titanium or Zirconium is heated with Iodine in a vacuum to form a volatile iodide gas. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p38 |     $$\text{Zr} + 2\text{I}_2 \rightarrow \text{ZrI}_4 \text{ (Gas)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | *   **Step 2:** The gas is passed over an extremely hot **tungsten filament** (around $1800\text{ K}$). The intense heat breaks the gas apart. Pure metal sticks to the wire, and iodine vapour is recycled. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p40 |     $$\text{ZrI}_4 \xrightarrow{\text{Hot Tungsten Wire}} \text{Zr (Pure Solid)} + 2\text{I}_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: Summary and Practice Check (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a high-level summary of the main points and processes covered, concluding with an invitation to test understanding.

Accuracy: **accurate**. The summary points faithfully and accurately condense the principles and examples discussed.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p42 | ### Quick Summary to Remember: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | *   **Why do it?** To get ultra-pure metal. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p44 | *   **How?** Turn solid metal $\rightarrow$ gas compound $\rightarrow$ back to pure solid metal. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p45 | *   **Mond Process** = Nickel ($\text{Ni}$) using Carbon Monoxide. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p46 | *   **Van Arkel Process** = Zirconium ($\text{Zr}$) or Titanium ($\text{Ti}$) using Iodine. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p47 | Does this make sense? Would you like to try writing out the steps for Titanium using the Van Arkel method to test yourself? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

