# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of isotopes, explaining their atomic basis, providing analogies, concrete examples (carbon isotopes), real-world applications, and an exam summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 43,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 43,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 2,
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Atomic structure review: Protons and neutrons (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "Think of protons like an element's **Social Security Number** or **Fingerprint**"}]}

Annotation rationale: Reviews subatomic particles in the nucleus (protons determining atomic identity and neutrons contributing mass) as prerequisite knowledge for understanding isotopes.

Accuracy: **accurate**. Correctly describes the composition of the nucleus, with protons defining element identity and neutrons providing mass without altering identity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Hey there! Welcome to class. Don&#x27;t worry if chemistry sometimes feels like a completely different language—today, we’re going to break down **isotopes**, and I promise it’s much simpler than it sounds.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | To understand an isotope, let’s do a 10-second review of what makes up an atom.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### 1. The Quick Atomic Review | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | Deep inside every atom is a nucleus, which holds two main particles: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | *   **Protons:** These give the atom its identity. (Think of protons like an element&#x27;s **Social Security Number** or **Fingerprint**). If an atom has 6 protons, it is *always* Carbon. If you change the number of protons, it turns into a completely different element. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | *   **Neutrons:** These are neutral particles that sit in the nucleus with the protons. They don’t change the identity of the atom, but they add weight. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition and properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes as atoms of the same element with identical proton counts but differing neutron counts, explaining why they exhibit nearly identical chemical behavior but different masses.

Accuracy: **accurate**. The definition and reasoning regarding chemical identity and mass variation are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### 2. So, What is an Isotope? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Here is the official definition:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | **Isotopes are atoms of the same element that have the *same number of protons*, but a *different number of neutrons*.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | Because they have the same number of protons, they are the **exact same element** and behave almost identically in chemical reactions. But because they have different numbers of neutrons, they have **different weights (masses)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Backpack analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p16", "quote": "However, your twin puts on a heavy backpack full of textbooks, while you wear an empty one."}]}

Annotation rationale: Uses the comparison of identical twins carrying different weights in backpacks to help the student conceptualize identical elemental identity alongside differing masses.

Accuracy: **accurate**. The analogy maps target concepts (protons = identity, neutrons = weight) cleanly and accurately for introductory high school level.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### 3. The &quot;Backpack&quot; Analogy | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | Imagine you and your identical twin.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p15 | * You look the same, talk the same, and have the same DNA.  | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | * However, your twin puts on a heavy backpack full of textbooks, while you wear an empty one.  | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | Are you still identical twins? **Yes.** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p18 | Do you act the same? **Pretty much.** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p19 | Does one of you weigh more on a scale? **Definitely.** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p20 | In this analogy: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | * **You and your twin** = Protons (your identity). | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | * **The books in the backpack** = Neutrons (extra weight, but doesn&#x27;t change who you are). | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Carbon isotopes (Carbon-12, Carbon-13, and Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using carbon isotopes (C-12, C-13, C-14), showing how proton number remains 6 while neutron counts and mass numbers change.

Accuracy: **accurate**. All proton, neutron, and mass numbers for carbon isotopes, as well as their natural abundance and stability properties, are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### 4. A Real-World Example: Carbon | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | Let’s look at **Carbon**, the building block of life. In nature, Carbon comes in a few &quot;flavors&quot; (isotopes): | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | 1.  **Carbon-12:** Has 6 protons and 6 neutrons. (Total mass = 12).  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |     * *This is standard carbon. About 99% of all carbon on Earth is this type.* | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 | 2.  **Carbon-13:** Has 6 protons and 7 neutrons. (Total mass = 13).  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |     * *A little heavier, but still carbon!* | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | 3.  **Carbon-14:** Has 6 protons and 8 neutrons. (Total mass = 14).  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 |     * *Even heavier. In fact, it has too many neutrons, making it unstable (radioactive).* | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | Notice that the number of **protons (6) never changes**. If it had 7 protons, it would be Nitrogen! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Application: Radiocarbon dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a distinct real-world application of radioactive isotopes in archaeology using Carbon-14 decay.

Accuracy: **accurate**. Accurately summarizes the principle of carbon dating using C-14 decay in organic archaeological specimens.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ### 5. Why Do We Care? (How They Are Used) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | Why does this matter outside of a chemistry test? Isotopes are actually super useful in the real world: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | *   **Carbon Dating:** Remember Carbon-14? Because it’s radioactive, it slowly breaks down at a steady pace over thousands of years. Archeologists measure how much Carbon-14 is left in ancient fossils or mummy bones to figure out exactly how old they are! | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Application: Medical tracers (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a distinct real-world application of radioactive isotopes as diagnostic imaging tracers in healthcare.

Accuracy: **accurate**. Accurately describes how radioisotopes are administered as tracers in medical imaging procedures such as PET scans.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | *   **Medicine:** Doctors use harmless, unstable isotopes as &quot;tracers&quot; that you can drink or have injected. These light up on scans (like PET scans) to help find cancer or check blood flow in the heart. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Application: Nuclear energy (Uranium-235) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a distinct real-world application of fissile isotopes (U-235) in nuclear power generation.

Accuracy: **accurate**. Correctly states that Uranium-235 can undergo fission to generate electric power.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | *   **Nuclear Energy:** Certain heavy isotopes of Uranium (like Uranium-235) can be split to generate massive amounts of electricity. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Summary cheat sheet and concluding check (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise formulaic summary cheat sheet for exam recall and closes the lesson with an invitation for practice questions.

Accuracy: **accurate**. The summary formula correctly condenses the defining characteristics of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ### Summary Cheat Sheet | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | If you need to remember this for an exam, just memorize this: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p42 | &gt; **Isotopes = Same Element (Same Protons) + Different Mass (Different Neutrons)** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p43 | How does that feel? Does that make sense, or would you like to try a practice problem together? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

