# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text comprehensively introduces Group 2 alkaline earth metals, including their identity, position on the periodic table, name origin, electronic configuration, chemical reactivity trends, characteristic flame colors, and real-world applications.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 53,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 53,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6,
    "everyday": 3,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy comparing alkaline earth metals to calmer siblings of alkali metals (ANALOGY)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses a family sibling analogy to intuitively contrast the high reactivity of Group 2 metals with the even higher reactivity of Group 1 alkali metals.

Accuracy: **accurate**. The analogy accurately captures the comparative chemical reactivity between Group 2 and Group 1 elements.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Welcome to chemistry class! Today, we are going to explore a very famous family on the periodic table: **The Alkaline Earth Metals**.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Think of them as the slightly calmer, more grounded younger siblings of the wild Alkali Metals in Group 1.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p3 | Let’s break them down by where they live, what makes them tick, and why they matter in your daily life. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Periodic table location and member elements of Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies Group 2 on the periodic table and lists the specific member elements from top to bottom with atomic numbers.

Accuracy: **accurate**. All listed elements, chemical symbols, atomic numbers, and radium's radioactive nature are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### 1. Where are they on the Periodic Table? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Look at your periodic table. Find the second column from the left—that is **Group 2**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | Meet the family members (from top to bottom): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | *   **Beryllium (Be)** – Atom #4 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p9 | *   **Magnesium (Mg)** – Atom #12 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | *   **Calcium (Ca)** – Atom #20 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | *   **Strontium (Sr)** – Atom #38 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | *   **Barium (Ba)** – Atom #56 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | *   **Radium (Ra)** – Atom #88 *(Warning: this one is radioactive!)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Historical origin and meaning of the name Alkaline Earth (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the elements are designated 'alkaline' (forming basic solutions with water) and 'earth' (alchemical terminology for heat-resistant, insoluble oxides).

Accuracy: **accurate**. Correctly explains the historical derivation of both 'alkaline' and 'earth'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 2. Why are they called &quot;Alkaline Earth&quot;? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | The name sounds fancy, but it comes from two simple historical ideas: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | 1.  **Alkaline:** When these metals react with water, they form basic (alkaline) solutions—meaning they have a high pH (the opposite of acidic). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | 2.  **Earth:** Early scientists and alchemists used the word &quot;earths&quot; to describe substances that were insoluble in water and didn&#x27;t melt easily under fire (specifically, their oxides).  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | Put them together, and you get *Alkaline Earth Metals*! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Valence electrons, cation formation, and high chemical reactivity (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how having two valence electrons leads to the loss of two electrons according to the octet rule, forming +2 cations and causing high elemental reactivity.

Accuracy: **accurate**. The explanation of valence electrons, octet stability, +2 charge formulation, and natural bonded states is standard and scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### 3. The Chemistry Secret: The &quot;Rule of Two&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | In high school chemistry, the most important rule to remember is: **Valence electrons determine behavior.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | *   Every single element in Group 2 has **2 valence electrons** (outermost electrons). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p24 | *   All atoms want a stable outer shell of 8 electrons (the Octet Rule). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 | *   For these metals, it is *much easier* to kick out those 2 extra electrons than to hunt for 6 more. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | Because they lose 2 negatively charged electrons, they always form **$+2$ ions** (written as $\text{Mg}^{2+}$, $\text{Ca}^{2+}$, etc.).  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p27 | **Reactivity:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | Because they are eager to lose those 2 electrons, they are **very reactive**. You will never find pure, raw calcium or magnesium just lying around in nature; they are always bonded to other elements (like oxygen, chlorine, or carbon). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Physical properties, downward reactivity trend, and flame tests (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes appearance, hardness, and density, explains the downward trend of increasing reactivity due to atomic radius and shielding, and details flame test emission colors.

Accuracy: **accurate**. All physical descriptions, periodic trend rationale based on Coulombic attraction and atomic size, and flame test colors (Ca orange-red, Sr crimson, Ba apple green) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### 4. Key Properties to Remember for Your Test | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | If this comes up on an exam, here are the main traits teachers look for: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | *   **Physical Appearance:** They are shiny, silvery-white metals.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | *   **Hardness &amp; Density:** They are somewhat soft (harder than Group 1, but much softer than transition metals like iron). They also have relatively low densities. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | *   **The Trend (Crucial!):** **Reactivity increases as you go DOWN the column.**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 |     *   *Why?* Radium and Barium are huge atoms. Their outer 2 electrons are very far away from the positive nucleus holding them, so they fly off very easily. Beryllium is tiny, so its nucleus holds onto its electrons much tighter. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p36 | *   **Flame Tests:** When you burn them, many produce distinct colors!  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 |     *   Calcium burns **orange-red**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 |     *   Strontium burns bright **crimson red**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 |     *   Barium burns **apple green**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Applications of calcium in biological structures and building materials (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p43", "quote": "Builds your bones and teeth, and it's a primary ingredient in concrete and chalk."}]}

Annotation rationale: Provides concrete real-world instances of calcium in human physiology (bones, teeth) and everyday materials (concrete, chalk).

Accuracy: **accurate**. Calcium compounds are indeed central components of bone mineral (hydroxyapatite), chalk (calcium carbonate), and concrete (calcium silicates/aluminates).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ### 5. Where do you see them in real life? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | You interact with Group 2 elements every single day: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | *   **Calcium (Ca):** Builds your bones and teeth, and it&#x27;s a primary ingredient in concrete and chalk. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Applications of magnesium in chlorophyll and lightweight alloys (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p44", "quote": "It’s also used in lightweight metals for car wheels and laptops."}]}

Annotation rationale: Provides real-world examples of magnesium in biological systems (chlorophyll) and structural alloys (car wheels, laptops).

Accuracy: **accurate**. Magnesium is the central coordination atom in the porphyrin ring of chlorophyll and is widely used in magnesium alloys for wheels and electronics casings.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | *   **Magnesium (Mg):** Sits right at the center of the chlorophyll molecule in plants (without it, plants couldn&#x27;t do photosynthesis!). It’s also used in lightweight metals for car wheels and laptops. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Applications of strontium and barium in pyrotechnics (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p45", "quote": "If you’ve ever watched a 4th of July or New Year’s fireworks show, the bright red flashes are Strontium, and the deep green ones are Barium."}]}

Annotation rationale: Illustrates the use of strontium and barium salts to produce red and green colors in fireworks.

Accuracy: **accurate**. Strontium compounds provide red emission and barium compounds produce green emission in commercial pyrotechnics.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | *   **Strontium (Sr) &amp; Barium (Ba):** If you’ve ever watched a 4th of July or New Year’s fireworks show, the bright red flashes are Strontium, and the deep green ones are Barium. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Historical application of radium in luminescent watch dials (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p46", "quote": "It used to be painted onto watch hands so they would glow in the dark, before people realized how dangerous radiation was!"}]}

Annotation rationale: Cites the historical use of radium in radioluminescent paint on watch hands and its discovery by Marie Curie.

Accuracy: **accurate**. Marie and Pierre Curie discovered radium, and radium-based radioluminescent paint was historically applied to watch dials and aircraft instruments.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | *   **Radium (Ra):** Famous for being discovered by **Marie Curie**. It used to be painted onto watch hands so they would glow in the dark, before people realized how dangerous radiation was! | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Summary checklist of alkaline earth metal properties (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise checklist summarizing group identity, valence shell configuration, physical traits, and applications, concluded by an interactive review prompt.

Accuracy: **accurate**. All bullet points correctly synthesize the core concepts taught in the lesson.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p48 | ### Summary Checklist | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | 1. **Group 2** on the Periodic Table. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p50 | 2. Have **2 valence electrons** and form **$+2$ cations**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p51 | 3. Shiny, silvery, and **reactive** (reactivity increases going down). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p52 | 4. Vital for life (Calcium, Magnesium) and great for pyrotechnics (Strontium, Barium). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p53 | Do you have any questions about their electron shells, or would you like to see how they react with water? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

