# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains what isotopes are, how atomic number and neutron count determine them, illustrates with standard examples (carbon and hydrogen), shows notation, and summarizes their key properties.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 32,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 32,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes and atomic structure (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that elements are defined by their proton count, but can have varying neutron counts, defining isotopes and their etymology ('same place').

Accuracy: **accurate**. The nuclear definition of elements (protons) and isotopes (different neutrons, same protons) as well as the etymology of the word isotope from Greek are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Un isotope, c’est une version un peu différente d’un même élément chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Explication simple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Tous les atomes d’un même élément ont **le même nombre de protons**. C’est ce nombre de protons qui définit l’élément. Par exemple : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | - Tous les atomes de carbone ont 6 protons. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p5 | - Tous les atomes d’oxygène ont 8 protons. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p6 | Mais les atomes peuvent avoir un nombre **différent de neutrons**. C’est ça qui fait qu’on parle d’**isotopes**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | On les appelle « isotopes » parce qu’ils occupent **la même place** dans le tableau périodique (le mot « isotope » vient du grec et signifie « même place »). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Carbon isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents carbon-12, carbon-13, and carbon-14 in a comparison table, noting abundance, stability, and radiocarbon dating.

Accuracy: **accurate**. Proton and neutron numbers for C-12, C-13, and C-14, their stabilities, C-12 natural abundance (~99%), and C-14 dating use are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### Exemple concret : le carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Le carbone a toujours 6 protons, mais il existe plusieurs isotopes : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | &#124; Isotope       &#124; Protons &#124; Neutrons &#124; Masse totale &#124; Stable ou radioactif ? &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124;---------------&#124;---------&#124;----------&#124;--------------&#124;------------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p12 | &#124; Carbone-12    &#124; 6       &#124; 6        &#124; 12           &#124; Stable                 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124; Carbone-13    &#124; 6       &#124; 7        &#124; 13           &#124; Stable                 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; Carbone-14    &#124; 6       &#124; 8        &#124; 14           &#124; Radioactif             &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | - Le **carbone-12** est de loin le plus abondant (environ 99 % du carbone naturel). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - Le **carbone-14** est radioactif : il se désintègre lentement avec le temps. C’est grâce à lui qu’on peut dater les objets anciens (datation au carbone 14). | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Hydrogen isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes with protium, deuterium, and tritium along with typical applications.

Accuracy: **accurate**. The subatomic compositions of protium, deuterium, and tritium, along with their stability/radioactivity and standard uses, are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### Autre exemple très simple : l’hydrogène | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | L’hydrogène a 3 isotopes : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | - **Hydrogène** (ou protium) : 1 proton + 0 neutron | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | - **Deutérium** : 1 proton + 1 neutron (utilisé dans certaines centrales nucléaires) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | - **Tritium** : 1 proton + 2 neutrons (radioactif, utilisé dans certains éclairages ou en recherche) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Isotopic notation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how isotopic symbols are written using the mass number superscript on the upper left of the element symbol.

Accuracy: **accurate**. Writing the mass number (protons + neutrons) as an upper-left superscript is the standard IUPAC convention.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### Comment on les écrit ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | On écrit le nombre de masse (protons + neutrons) en haut à gauche du symbole : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p24 | - ¹²C = carbone-12 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | - ¹⁴C = carbone-14 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | - ²H = deutérium | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Summary of key isotope concepts (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a bulleted summary of key facts to remember about isotopes, followed by a conversational closing offer.

Accuracy: **accurate**. The recap correctly summarizes that identical proton numbers define elements, differing neutron numbers define isotopes, chemical properties are identical while masses differ, and some isotopes are stable while others are radioactive.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### En résumé (à retenir) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | - **Même nombre de protons** → même élément | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p29 | - **Nombre de neutrons différent** → isotopes différents | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p30 | - Les isotopes ont **les mêmes propriétés chimiques**, mais des **masses différentes** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p31 | - Certains sont stables, d’autres sont radioactifs | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p32 | Tu veux que je te donne des exemples avec un autre élément (uranium, oxygène…) ou que je t’explique pourquoi certains isotopes sont radioactifs ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

