# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and comprehensively explains vapour phase refining, including its definition, basic principles, major industrial examples (Mond's process and Van Arkel method), advantages, an explanatory analogy, and a summary table.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 52,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 52,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition, Principles, and Requirements of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the two-step mechanism as well as key conditions necessary for the process to work.

Accuracy: **accurate**. The definition, two-step principle, and fundamental requirements for vapour phase refining are scientifically sound and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Vapour Phase Refining | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## What is it? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **Vapour Phase Refining** is a method used to purify metals by converting them into a **volatile compound**, which is then decomposed to give back the **pure metal**. This technique is used when a metal has impurities that are difficult to remove by other methods like electrolytic refining. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## Basic Principle | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | The method works on a simple two-step idea: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. **Step 1:** The impure metal is converted into a **volatile compound** (a compound that easily vaporizes) by reacting it with a suitable substance. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | 2. **Step 2:** This volatile compound is then **decomposed** (usually by heating) to give the **pure metal**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p8 | ### Key Requirements: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | - The volatile compound must be **easy to form** from the impure metal. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | - The compound must be **easily decomposable** to give the pure metal back. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Mond's Process for Nickel Refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of vapour phase refining to the purification of nickel using carbon monoxide.

Accuracy: **accurate**. The reaction temperatures (330–350 K for formation and 450–470 K for decomposition) and chemical equations for nickel tetracarbonyl formation and breakdown are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## Important Examples | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | ### 1. **Mond&#x27;s Process (for Nickel)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | Used to refine impure nickel. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | **Step 1:** Impure nickel is heated in a stream of **carbon monoxide (CO)** gas at about 330–350 K. This forms a volatile compound called **nickel tetracarbonyl**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | $$Ni + 4CO \xrightarrow{330-350K} Ni(CO)_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | **Step 2:** The nickel tetracarbonyl vapor is then heated to a higher temperature (450–470 K), where it **decomposes** to give pure nickel and releases CO gas (which can be reused). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | $$Ni(CO)_4 \xrightarrow{450-470K} Ni \text{ (pure)} + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Van Arkel Method for Zirconium and Titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using iodine to purify zirconium or titanium on a heated tungsten filament.

Accuracy: **accurate**. The reaction details, tungsten filament decomposition at ~1800 K, and specific removal of oxygen and nitrogen impurities match textbook metallurgical facts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### 2. **Van Arkel Method (for Zirconium or Titanium)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | Used for removing **oxygen and nitrogen impurities** from metals like zirconium and titanium. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | **Step 1:** Impure metal is heated with **iodine** to form a volatile compound. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | $$Zr + 2I_2 \rightarrow ZrI_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | **Step 2:** The zirconium iodide vapor is then decomposed on a **very hot tungsten filament** (about 1800 K), giving pure zirconium. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | $$ZrI_4 \xrightarrow{1800K} Zr \text{ (pure)} + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | The iodine gas released can be reused to purify more metal. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Process Flow Diagram of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a generalized schematic diagram depicting the two-stage cycle of volatile compound synthesis and subsequent decomposition.

Accuracy: **accurate**. The flow diagram accurately summarizes the cyclic nature of the method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## Simple Diagram of the Process | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | Impure Metal  +  Suitable Reagent  →  Volatile Compound | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p31 |                                               ↓ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p32 |                                          (Heating/Decomposition) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p33 |                                               ↓ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p34 |                                         Pure Metal + Reagent (reused) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p35 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Advantages and Utility of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the primary benefits of vapour phase refining, including high product purity and reagent recyclability.

Accuracy: **accurate**. Correctly states the advantages of high purity and reagent recycling.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## Why is this method useful? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | - It gives **very high purity** metals. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 | - The **reagent (CO or Iodine) is recycled**, making the process efficient. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | - It&#x27;s especially useful for metals that are hard to purify by other chemical methods. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Analogy of Packing and Unpacking a Box (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p43", "quote": "Think of it like **\"packing and unpacking\"**:"}, {"passage_id": "p44", "quote": "- You \"pack\" the impure metal into a **volatile (gaseous) box** (the compound)."}]}

Annotation rationale: Explains vapour phase refining via a cross-domain analogy of packing an impure item into a gaseous box and unpacking pure metal.

Accuracy: **accurate**. The analogy captures the conceptual essence of the purification process clearly without introducing misconceptions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ## Quick Memory Trick 🧠 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | Think of it like **&quot;packing and unpacking&quot;**: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p44 | - You &quot;pack&quot; the impure metal into a **volatile (gaseous) box** (the compound). | ANALOGY | {} | [&#x27;list&#x27;] |
| p45 | - Then you &quot;unpack&quot; it by heating, and only the **pure metal comes out**, leaving impurities behind! | ANALOGY | {} | [&#x27;list&#x27;] |
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Summary Table of Vapour Phase Refining Methods (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a recap table summarizing the two processes, target metals, volatile intermediates, and decomposition temperatures, followed by a closing interactive remark.

Accuracy: **accurate**. The table correctly recaps the processes, chemical species, and reaction conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### Summary Table | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | &#124; Process &#124; Metal &#124; Volatile Compound &#124; Decomposition Temp &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p49 | &#124;---------&#124;-------&#124;-------------------&#124;---------------------&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p50 | &#124; Mond&#x27;s Process &#124; Nickel (Ni) &#124; Ni(CO)₄ &#124; 450–470 K &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p51 | &#124; Van Arkel Method &#124; Zirconium/Titanium &#124; ZrI₄ &#124; ~1800 K &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p52 | Would you like me to explain **why** these specific temperatures are chosen, or how this compares to other refining methods like electrolytic refining? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

