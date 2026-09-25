# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly explains the concept of covalent radius, how it is determined from bond lengths, worked and illustrative examples, its role in predicting molecular properties, and periodic trends.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 14,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 14,
  "unique_subtopics": 3,
  "contextualization": {
    "everyday": 1,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius based on internuclear distance (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "Atoms don’t have a hard edge like a basketball"}]}

Annotation rationale: Explains why covalent radius is defined operationally via bonded atoms (due to atoms lacking sharp boundaries) and defines it as half the bond length of identical covalently bonded atoms.

Accuracy: **accurate**. Accurately describes the fuzzy nature of electron clouds and standard definition of homonuclear covalent radius as half the bond length.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Covalent radius is a way to measure the size of an atom when it forms a covalent bond with another atom. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | Think of an atom as a tiny nucleus (made of protons and neutrons) surrounded by a fuzzy cloud of electrons. Atoms don’t have a hard edge like a basketball, so scientists need a practical way to say “this atom is this big.” One common way is to look at atoms that are actually bonded together. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | When two identical atoms share electrons in a covalent bond (like the two chlorine atoms in a Cl₂ molecule), they sit at a certain distance from each other. That distance is called the bond length. The covalent radius is simply **half** of that bond length. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Calculation of chlorine's covalent radius from bond length (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a step-by-step worked example deriving the covalent radius of chlorine from the internuclear distance in a Cl2 molecule.

Accuracy: **accurate**. The Cl-Cl bond length of 198 pm and resulting covalent radius of 99 pm are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### Simple Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | - In a chlorine molecule, the two nuclei are 198 picometers apart. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p6 | - Half of that distance = 99 picometers. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | - So the covalent radius of chlorine is 99 pm. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Illustrative covalent radii for hydrogen and oxygen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents values of covalent radii for hydrogen and oxygen in their diatomic forms.

Accuracy: **contains_error**. The passage conflates tabulated single-bond covalent radii with half the bond length of homonuclear diatomic molecules. In O2, the bond is a double bond (length ~121 pm), giving a radius of ~60.5 pm rather than the single-bond value of 66 pm. In H2, half the bond length is 37 pm (74 pm / 2), whereas 31 pm comes from statistical fits across diverse compounds.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | This works for other non-metal elements too. For hydrogen in H₂, the covalent radius is about 31 pm. For oxygen in O₂, it’s about 66 pm. | EXAMPLE | {} | [&#x27;prose&#x27;] |

Error (minor; p8): The passage states that for oxygen in O₂, the covalent radius is about 66 pm, and for hydrogen in H₂, it is about 31 pm. In O₂, the oxygen atoms share a double bond (~121 pm), so half the internuclear distance is ~60.5 pm. The value of 66 pm corresponds to oxygen's single-bond covalent radius. Similarly, half the bond length in H₂ (74 pm) is 37 pm, whereas 31 pm is an empirical average across various compounds.

Correction: In O₂, the double-bond length is approximately 121 pm (giving ~60.5 pm); the single-bond covalent radius of ~66 pm is obtained from single bonds (e.g., in peroxides). For H₂, half the 74 pm bond length is 37 pm.

## u4: Applications and periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the significance of covalent radius in predicting molecular sizes and bond lengths, as well as the underlying causes of horizontal and vertical periodic trends.

Accuracy: **accurate**. The applications and periodic trends (decreasing across a period due to increased nuclear pull, increasing down a group due to added shells) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### Why This Matters | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Covalent radius helps us predict: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | - How big atoms are when they form molecules | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - How long bonds will be | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | - Trends across the periodic table (atoms get smaller as you move right across a row because the nucleus pulls the electrons tighter; they get bigger as you go down a column because extra electron shells are added) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Summary recap of covalent radius definition (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key definition and practical meaning of covalent radius in a concluding wrap-up.

Accuracy: **accurate**. The recap accurately synthesizes the main definition and rationale of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | So, in short: covalent radius = half the distance between two identical atoms that are covalently bonded. It’s a practical “size” we assign to an atom based on real chemical bonds rather than trying to measure a single, isolated atom. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

