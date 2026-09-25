# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of isotopes, explaining their atomic structure, notation, physical and chemical properties, and practical applications.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 7,
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

## u1: Rappels sur la structure atomique et le numéro atomique (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains atomic composition (nucleus with protons/neutrons, orbiting electrons) and how the number of protons defines the chemical element.

Accuracy: **accurate**. The description of the atomic model (protons, neutrons, electrons) and the definition of atomic number Z defining the chemical element is standard and accurate for high-school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Les isotopes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Pour commencer : structure de l&#x27;atome | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Rappelle-toi qu&#x27;un atome est constitué : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | - d&#x27;un **noyau** contenant des **protons** (charge +) et des **neutrons** (pas de charge) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - d&#x27;**électrons** (charge -) qui gravitent autour | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | Le nombre de protons définit **l&#x27;élément chimique** (c&#x27;est le numéro atomique Z). Par exemple, tout atome avec 6 protons est du carbone, tout atome avec 8 protons est de l&#x27;oxygène. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Définition des isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes as atoms of the same chemical element sharing the same number of protons but differing in neutron count.

Accuracy: **accurate**. The definition of isotopes as atoms of the same element with identical proton counts but different neutron counts is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## Qu&#x27;est-ce qu&#x27;un isotope ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | Les **isotopes** sont des atomes d&#x27;un **même élément chimique** (donc avec le **même nombre de protons**) mais qui ont un **nombre de neutrons différent**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Exemple des isotopes du carbone (carbone 12, 13 et 14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the isotope concept using carbon isotopes (C-12, C-13, C-14) in a comparative table.

Accuracy: **accurate**. The proton, neutron, and mass numbers for carbon-12, carbon-13, and carbon-14 are correctly listed.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### Exemple concret : le carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | &#124; Isotope &#124; Protons &#124; Neutrons &#124; Nombre de masse (A) &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124;---------&#124;---------&#124;----------&#124;---------------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | &#124; Carbone 12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124; Carbone 13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; Carbone 14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | Ces trois atomes sont tous du **carbone** (6 protons), mais ils diffèrent par leur masse. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Notation symbolique d'un isotope (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains standard isotopic nuclear notation AZX with its constituent parts (mass number A, atomic number Z, chemical symbol X) and provides an illustrative example.

Accuracy: **accurate**. The notation formula and component definitions (A as mass number, Z as atomic number, X as element symbol) and pronunciation are entirely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## Notation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | On note un isotope ainsi : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | $$^{A}_{Z}X$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | - **X** : symbole de l&#x27;élément | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p20 | - **Z** : numéro atomique (nombre de protons) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | - **A** : nombre de masse (protons + neutrons) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p22 | Exemple : $^{14}_{6}C$ se lit &quot;carbone 14&quot; | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Propriétés chimiques et physiques des isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have virtually identical chemical properties (governed by electron configuration) but differing physical properties (stability vs radioactivity).

Accuracy: **accurate**. The distinction between identical chemical reactivity (due to electrons) and different physical properties/nuclear stability is scientifically accurate and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## Propriétés importantes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | 1. **Chimiquement**, les isotopes se comportent presque de la même façon (car les propriétés chimiques dépendent des électrons, donc du nombre de protons). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p25 | 2. **Physiquement**, ils peuvent être différents : certains isotopes sont **stables** (comme le carbone 12), d&#x27;autres sont **radioactifs** (comme le carbone 14, qui se désintègre avec le temps). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Application concrète : la datation au carbone 14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents radiocarbon dating as a concrete real-world application of radioactive isotopes.

Accuracy: **accurate**. The explanation of carbon-14 dating based on radioactive decay rate and measuring remaining carbon-14 is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## Application concrète : la datation au carbone 14 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | Le carbone 14 est utilisé pour dater des fossiles ou des objets anciens ! Comme il se désintègre à vitesse connue, on peut calculer l&#x27;âge d&#x27;un objet en mesurant la quantité de carbone 14 restante. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Résumé et conclusion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a one-sentence summary to remember and closes with a tutor-style offer to practice.

Accuracy: **accurate**. The recap accurately synthesizes the core definition of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | **À retenir en une phrase** : Des isotopes = même élément (même nombre de protons), mais nombre de neutrons différent, donc masse différente. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p30 | Tu veux qu&#x27;on fasse un exercice ensemble pour vérifier que c&#x27;est bien compris ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

