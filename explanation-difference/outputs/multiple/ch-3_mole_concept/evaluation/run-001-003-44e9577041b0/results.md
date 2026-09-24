# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and thoroughly explains the mole concept, covering counting analogies, Avogadro's number, molar mass, and mass-to-mole conversions.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 54,
  "content_unit_kinds": {
    "ANALOGY": 2,
    "CONCEPT": 4,
    "EXAMPLE": 6,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 54,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 4,
    "none": 9
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: The dozen analogy for the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "* If I say \"a dozen eggs,\" you know that means **12** eggs."}]}

Annotation rationale: Uses the familiar everyday counting word 'dozen' to explain that a mole is simply a word representing a specific count.

Accuracy: **accurate**. The analogy correctly relates the everyday grouping term 'dozen' to the chemical counting unit 'mole'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Welcome to chemistry! Don’t worry if the **mole concept** sounds intimidating—almost every chemistry student struggles with it at first.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | As your teacher, I’m going to let you in on a secret: **A mole is just a counting word.**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | Let’s break it down step-by-step. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### Step 1: The &quot;Dozen&quot; Analogy | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Think about the word **&quot;dozen.&quot;**  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | * If I say &quot;a dozen eggs,&quot; you know that means **12** eggs. | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | * If I say &quot;a dozen donuts,&quot; that’s **12** donuts. | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | * If I say &quot;a dozen cars,&quot; that’s **12** cars. | ANALOGY | {} | [&#x27;list&#x27;] |
| p10 | The word &quot;dozen&quot; always means the number **12**, regardless of what you are counting. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | In chemistry, **a &quot;mole&quot; (abbreviated as *mol*) is the exact same thing.** It’s just a word that represents a specific number.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | However, because atoms and molecules are insanely tiny, a chemist&#x27;s &quot;dozen&quot; has to be insanely huge. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition of Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the specific numerical value of one mole as Avogadro's number (6.022 x 10^23).

Accuracy: **accurate**. Avogadro's number is accurately stated as 6.022 x 10^23.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### Step 2: What is the Number? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | One mole is equal to: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | $$\mathbf{6.022 \times 10^{23}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p17 | *(That is a 6 with 23 digits after it: 602,200,000,000,000,000,000,000!)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | This is called **Avogadro’s Number**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Example of a mole: carbon atoms (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the count in 1 mole of carbon atoms.

Accuracy: **accurate**. Correctly states that 1 mole of carbon atoms contains 6.022 x 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | * **1 mole of Carbon atoms** = $6.022 \times 10^{23}$ carbon atoms. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Example of a mole: water molecules (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the count in 1 mole of water molecules.

Accuracy: **accurate**. Correctly states that 1 mole of water molecules contains 6.022 x 10^23 water molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | * **1 mole of Water molecules** = $6.022 \times 10^{23}$ water molecules. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Example of a mole: basketballs (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p21", "quote": "* **1 mole of basketballs** = $6.022 \\times 10^{23}$ basketballs (which would actually cover the entire Earth in a layer miles thick!)."}]}

Annotation rationale: Provides a hypothetical macroscopic example of 1 mole of basketballs to illustrate the enormous scale of Avogadro's number.

Accuracy: **accurate**. The calculation that 6.022 x 10^23 basketballs would cover Earth in a layer miles thick is physically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | * **1 mole of basketballs** = $6.022 \times 10^{23}$ basketballs (which would actually cover the entire Earth in a layer miles thick!). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Why the mole is needed: bridging microscopic and macroscopic scales (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p25", "quote": "You cannot pick up individual atoms with tweezers—they are too small to see, let alone hold! You have to use a scale to weigh them in **grams**."}]}

Annotation rationale: Explains the practical need for the mole to connect unseeable individual atoms to measurable masses in grams.

Accuracy: **accurate**. Accurately conveys the role of the mole as the conceptual link between atomic-scale particle counts and macroscopic masses measured in grams.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### Step 3: Why Do We Need Such a Huge Number? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | Imagine you are in a lab, and your experiment requires you to react Hydrogen with Oxygen.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | You cannot pick up individual atoms with tweezers—they are too small to see, let alone hold! You have to use a scale to weigh them in **grams**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p26 | **The mole is the bridge between the microscopic world of atoms and the real world of grams.** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Molar mass and its relationship to atomic mass on the periodic table (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how molar mass allows the numerical values of atomic mass on the periodic table to represent grams per mole.

Accuracy: **accurate**. Correctly explains the correspondence between atomic mass units and grams per mole for one mole of an element.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ### Step 4: The Magic of the Periodic Table (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | Here is where the magic happens. Grab a Periodic Table and look at **Carbon (C)**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | You will see its atomic mass is roughly **12.01**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | * One single atom of carbon weighs 12.01 *atomic mass units* (amu) — an impossibly tiny amount. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | * But if you gather **1 MOLE** ($6.022 \times 10^{23}$ atoms) of Carbon, it will weigh exactly **12.01 GRAMS**! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p33 | Scientists chose the number $6.022 \times 10^{23}$ on purpose so that the numbers on the periodic table match real-world grams. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | This weight is called the **Molar Mass** (the mass of one mole of a substance), and its unit is **grams per mole (g/mol)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u8: Example of molar mass: oxygen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the molar mass of oxygen as an illustrative example.

Accuracy: **accurate**. 16.00 g is the correct molar mass for 1 mole of oxygen atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | * **1 mole of Oxygen (O)** weighs **16.00 grams**. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Example of molar mass: gold (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the molar mass of gold as an illustrative example.

Accuracy: **accurate**. 197.0 g is the correct rounded molar mass for 1 mole of gold atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | * **1 mole of Gold (Au)** weighs **197.0 grams**. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Analogy for molar mass variation: feathers vs. bowling balls (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p37", "quote": "*(Just like a dozen feathers weighs less than a dozen bowling balls, a mole of light atoms weighs less than a mole of heavy atoms!)*"}]}

Annotation rationale: Uses a dozen feathers versus a dozen bowling balls to explain why one mole of different elements has different masses.

Accuracy: **accurate**. The analogy accurately reflects why equal counts of particles of different masses result in different total masses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | *(Just like a dozen feathers weighs less than a dozen bowling balls, a mole of light atoms weighs less than a mole of heavy atoms!)* | ANALOGY | {} | [&#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Formula for converting grams to moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the fundamental conversion formula relating moles, mass, and molar mass.

Accuracy: **accurate**. The formula Moles = Mass / Molar Mass is scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### Step 5: How You Will Use It (The Math) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | In class, you will mostly be converting between **Grams** and **Moles**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p41 | Here is the golden formula to remember: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p42 | $$\text{Moles} = \frac{\text{Mass (in grams)}}{\text{Molar Mass (from Periodic Table)}}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u12: Worked example: calculating moles from grams of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete worked problem showing how to calculate the number of moles in 24 grams of carbon.

Accuracy: **accurate**. The calculation 24 g / 12 g/mol = 2 moles is correct, as is the particle conversion noted in p48.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | #### Let&#x27;s try a quick problem: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | **Question:** You have **24 grams of Carbon**. How many moles do you have? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p45 | 1. **Find Molar Mass:** Look at the periodic table for Carbon $\rightarrow$ **12 g/mol**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p46 | 2. **Do the math:**  | EXAMPLE | {} | [&#x27;list&#x27;] |
| p47 |    $$\text{Moles} = \frac{24\text{ g}}{12\text{ g/mol}} = \mathbf{2\text{ moles}}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p48 | That&#x27;s it! If you have 2 moles of carbon, you also know you have twice Avogadro&#x27;s number of atoms ($2 \times 6.022 \times 10^{23}$). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Mole concept summary checklist (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways of the mole concept lesson in a three-point checklist.

Accuracy: **accurate**. All summary points accurately summarize the key concepts of the mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ### Summary Checklist: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | 1. **A mole is a number:** $6.022 \times 10^{23}$. Think of it as the &quot;chemist&#x27;s dozen.&quot; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p52 | 2. **It connects counting to weighing:** It allows us to count atoms by simply placing them on a scale. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p53 | 3. **The Periodic Table is your cheat sheet:** The decimal number under each element tells you how many grams are in 1 mole of that element. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p54 | How does that feel? Would you like to try a practice problem together to test it out? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

