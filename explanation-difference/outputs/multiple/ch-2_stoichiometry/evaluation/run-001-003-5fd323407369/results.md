# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains stoichiometry directly and comprehensively, introducing its conceptual definition, using a recipe analogy, explaining the role of the mole and atomic masses, outlining the standard calculation procedure, and providing a fully worked calculation example.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 65,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 65,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 5,
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "cooking with chemistry"}]}

Annotation rationale: Introduces the topic, demystifies the term, and provides the core functional definition of stoichiometry.

Accuracy: **accurate**. The definition correctly describes stoichiometry as the branch of chemistry dealing with quantitative relationships between reactants and products in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Welcome to chemistry class!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | First, let’s address the elephant in the room: **“Stoichiometry”** (pronounced *stoy-kee-AHM-uh-tree*) sounds like an intimidating, ancient spell. But I promise you, it isn&#x27;t.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | At its core, **stoichiometry is simply cooking with chemistry.** It’s the math we use to figure out how much stuff we need to start with, or how much stuff we will end up with, during a chemical reaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | Let’s break it down step-by-step. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Kitchen recipe analogy for balanced chemical equations (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "Imagine you are making grilled cheese sandwiches."}]}

Annotation rationale: Uses a grilled cheese sandwich recipe to explain how stoichiometric coefficients in balanced chemical equations dictate reactant and product ratios.

Accuracy: **accurate**. The analogy accurately illustrates how stoichiometric coefficients function as ingredient ratios, mapped directly onto the formation reaction of water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### Step 1: The Kitchen Analogy (The Recipe) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | Imagine you are making grilled cheese sandwiches. Here is your recipe: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | $$\text{2 slices of Bread} + \text{1 slice of Cheese} \rightarrow \text{1 Grilled Cheese}$$ | ANALOGY | {} | [&#x27;equation&#x27;] |
| p9 | * If you have **8 slices of bread** (and plenty of cheese), how many sandwiches can you make? **4 sandwiches.** | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | * If you want to make **10 sandwiches**, how many slices of bread do you need? **20 slices.** | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | Congratulations—you just did stoichiometry!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | In chemistry, our &quot;recipe&quot; is a **balanced chemical equation**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | Look at how water is made: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | $$2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p15 | This tells us: **2 molecules of hydrogen** react with **1 molecule of oxygen** to make **2 molecules of water**. The numbers in front (the coefficients) are just the recipe&#x27;s ingredient ratios. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: The necessity of the mole due to atomic mass differences (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p18", "quote": "In the kitchen, you can physically count 2 slices of bread."}]}

Annotation rationale: Explains why mass ratios cannot directly replace particle ratios in stoichiometry due to differences in atomic mass among elements.

Accuracy: **accurate**. The text accurately explains that atoms cannot be counted directly and that equal masses of different elements do not contain equal numbers of atoms, necessitating a bridging counting unit.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### Step 2: The Problem (We Can&#x27;t Count Atoms) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | In the kitchen, you can physically count 2 slices of bread. But in a chemistry lab, atoms are way too tiny to see or count. You can&#x27;t say, *&quot;Let me grab 200 hydrogen atoms.&quot;*  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | Instead, chemists **weigh** things on a scale in grams.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | However, you can&#x27;t just say *&quot;2 grams of hydrogen + 1 gram of oxygen = 2 grams of water.&quot;* Why? Because an oxygen atom is **16 times heavier** than a hydrogen atom! 100 grams of hydrogen has way more atoms in it than 100 grams of oxygen. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | To fix this, chemists invented a unit called **The Mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: The mole concept and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p25", "quote": "A dozen eggs = 12 eggs."}]}

Annotation rationale: Defines the mole as Avogadro's number using the dozen analogy and explains how the periodic table provides the molar mass to convert grams to moles.

Accuracy: **accurate**. The mole is accurately defined using Avogadro's constant (6.022 x 10^23) and connected correctly to atomic/molar mass from the periodic table.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### Step 3: The Secret Tool — The &quot;Mole&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | Think of the word **&quot;dozen.&quot;** When I say &quot;a dozen,&quot; you think of the number **12**.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p25 | * A dozen eggs = 12 eggs.  | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 | * A dozen cars = 12 cars.  | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | The cars weigh a lot more than the eggs, but there are still 12 of each. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p28 | **A &quot;mole&quot; is just a chemist&#x27;s dozen.** It’s just a specific number: **$6.022 \times 10^{23}$** (a huge number, because atoms are tiny).  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p29 | The best part? You can convert grams into moles using the **Periodic Table**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p30 | * Find Oxygen on the table: its mass is about **16 grams**. That means $1 \text{ mole of Oxygen atoms} = 16 \text{ grams}$. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Three-step stoichiometry problem-solving map (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable general procedure for converting from grams of a reactant to grams of a product via mole conversions and the mole ratio.

Accuracy: **accurate**. The 3-step sequence (mass A -> moles A -> moles B -> mass B) accurately outlines the standard algorithmic pathway for mass-mass stoichiometry calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### Step 4: The Master Plan (The Stoichiometry Map) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | Whenever you get a stoichiometry problem, it almost always follows this **3-step journey**: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p34 | $$\text{Grams of A} \xrightarrow{\text{Step 1}} \text{Moles of A} \xrightarrow{\text{Step 2}} \text{Moles of B} \xrightarrow{\text{Step 3}} \text{Grams of B}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p35 | 1. **Grams to Moles:** Weigh your starting chemical and convert it to moles (using the Periodic Table). | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 | 2. **Mole to Mole (The Recipe Bridge):** Use the numbers from your balanced equation to switch from Chemical A to Chemical B. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p37 | 3. **Moles to Grams:** Convert your new moles back into grams so you know what it weighs (using the Periodic Table again). | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Worked mass-to-mass calculation of water production from oxygen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a complete calculation determining the mass of water formed from 32 grams of oxygen gas.

Accuracy: **accurate**. All calculations, molar masses (32 g/mol for O2, 18 g/mol for H2O), mole ratios (1:2), and the final result of 36 grams of water are mathematically and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | ### Let&#x27;s Do a Real Example Together! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p40 | **Question:** How many grams of water ($\text{H}_2\text{O}$) can you make from **32 grams of Oxygen gas ($\text{O}_2$)**? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | **The Recipe:**  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p42 | $$2\text{H}_2 + 1\text{O}_2 \rightarrow 2\text{H}_2\text{O}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | #### **Step 1: Convert Grams of $\text{O}_2$ to Moles of $\text{O}_2$** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | * One Oxygen atom is 16g. Since $\text{O}_2$ has two, the molar mass is $16 \times 2 = 32\text{ g/mol}$. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p45 | * You have 32 grams: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p46 | $$\frac{32\text{ g}}{32\text{ g/mol}} = \mathbf{1\text{ mole of } O_2}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | #### **Step 2: Use the Recipe (Mole Ratio)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | * Look at the coefficients in the reaction: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p49 |   * For every **$1\text{ O}_2$**, you produce **$2\text{ H}_2\text{O}$**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p50 | * So, if you have $1\text{ mole of } \text{O}_2$, you will make: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p51 | $$1 \times 2 = \mathbf{2\text{ moles of } H_2O}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | #### **Step 3: Convert Moles of $\text{H}_2\text{O}$ to Grams** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p53 | * Let’s find the weight of 1 mole of water using the Periodic Table: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p54 |   * $\text{Hydrogen} = 1\text{ g} \times 2 = 2\text{ g}$ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p55 |   * $\text{Oxygen} = 16\text{ g}$ | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p56 |   * Water ($\text{H}_2\text{O}$) weighs $2 + 16 = 18\text{ g/mol}$. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p57 | * Since you made 2 moles: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p58 | $$2\text{ moles} \times 18\text{ g/mol} = \mathbf{36\text{ grams of water!}}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | **Answer:** 32 grams of oxygen will give you 36 grams of water. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p60 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Summary checklist and problem-solving tips (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p62", "quote": "You can't bake without an accurate recipe."}]}

Annotation rationale: Provides a concluding checklist of tips and study strategies for approaching stoichiometry problems.

Accuracy: **accurate**. The tips accurately highlight fundamental requirements in stoichiometry: starting with a balanced equation, converting masses through moles, and checking unit cancellations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | ### Summary Checklist for Success: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | 1. **Always balance your equation first.** You can&#x27;t bake without an accurate recipe. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p63 | 2. **Convert to moles.** You cannot cross from one chemical to another using grams. Moles are the only universal bridge! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p64 | 3. **Cancel your units.** When writing your math out, make sure the units on top and bottom cancel out.  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p65 | Does this make the concept feel a little more approachable? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

