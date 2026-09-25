# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly addresses the requested topic of isotopes, explaining their subatomic definition, contrasting protons and neutrons, presenting carbon isotopes, and outlining practical applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 24,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 24,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 7,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of an isotope (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic and defines an isotope based on having the same number of protons but a different number of neutrons.

Accuracy: **accurate**. The definition correctly specifies that isotopes share the same atomic number (number of protons) but have differing numbers of neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **Bienvenue dans le monde de la chimie !** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;heading&#x27;] |
| p2 | Aujourd&#x27;hui, nous allons explorer un concept fascinant : les isotopes. Ne t&#x27;inquiète pas si cela te semble compliqué au début, car je vais t&#x27;expliquer cela de manière simple et claire. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | **Qu&#x27;est-ce qu&#x27;un isotope ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | Un isotope est une variante d&#x27;un élément chimique qui a le même nombre de protons dans son noyau (ce qui définit l&#x27;élément), mais un nombre différent de neutrons. Oui, cela peut sembler un peu technique, mais décomposons cela étape par étape. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Basic atomic structure (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the constituent subatomic particles of an atom (protons, neutrons, and electrons) and their basic roles regarding charge and mass.

Accuracy: **accurate**. Accurately describes protons, neutrons, and electrons with respect to their locations, charges, and contributions to element identity and mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **Comprendre les atomes** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Pour comprendre les isotopes, il faut d&#x27;abord savoir un peu sur la structure des atomes. Un atome est composé de trois parties principales : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | 1. **Protons** : Ce sont des particules chargées positivement qui se trouvent dans le noyau de l&#x27;atome. Le nombre de protons dans un atome définit l&#x27;élément chimique (par exemple, l&#x27;hydrogène a 1 proton, l&#x27;hélium en a 2). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 2. **Neutrons** : Ce sont des particules qui n&#x27;ont pas de charge et qui se trouvent également dans le noyau. Les neutrons contribuent à la masse de l&#x27;atome mais n&#x27;affectent pas sa charge. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | 3. **Électrons** : Ce sont des particules chargées négativement qui orbitent autour du noyau. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Isotopes and variation in atomic mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the variation in neutron count leads to different atomic masses among isotopes of the same element while retaining identical chemical identity.

Accuracy: **accurate**. Correctly notes that having the same number of protons preserves elemental identity, while differing numbers of neutrons result in different atomic masses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | **Isotopes : le même élément, des neutrons différents** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Revenons aux isotopes. Puisque les isotopes d&#x27;un élément ont le même nombre de protons, ils sont considérés comme étant le même élément chimique. Cependant, ils diffèrent par le nombre de neutrons dans leur noyau. Cela signifie que les isotopes ont des masses atomiques différentes en raison de la différence dans le nombre de neutrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Carbon isotopes (carbon-12, carbon-13, carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world example using carbon isotopes to illustrate how proton count remains constant while neutron count and mass change.

Accuracy: **contains_error**. The isotopic symbols use an erroneous notation format ('⁶C¹²', '⁶C¹³', '⁶C¹⁴') with the atomic number placed as a left superscript and mass number as a right superscript.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | **Exemples d&#x27;isotopes** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Un exemple classique est celui du carbone. Le carbone a plusieurs isotopes, notamment : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - Le carbone-12 (⁶C¹²) avec 6 protons et 6 neutrons. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | - Le carbone-13 (⁶C¹³) avec 6 protons et 7 neutrons. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | - Le carbone-14 (⁶C¹⁴) avec 6 protons et 8 neutrons. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | Tous ces isotopes sont du carbone parce qu&#x27;ils ont 6 protons, mais ils ont des nombres différents de neutrons, ce qui les rend différents en termes de masse. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p14, p15, p16): The nuclide notation is inverted and placed incorrectly. In standard IUPAC isotopic notation, the mass number A is written as a left superscript and the atomic number Z as a left subscript (e.g., ¹²₆C or ¹²C, ¹³₆C or ¹³C, ¹⁴₆C or ¹⁴C), not '⁶C¹²', '⁶C¹³', and '⁶C¹⁴'.

Correction: Write the isotopes as ¹²C (or ¹²₆C), ¹³C (or ¹³₆C), and ¹⁴C (or ¹⁴₆C).

## u5: Isotope application: radioactive dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of carbon-14 decay in radiocarbon dating to determine the age of ancient organic artifacts.

Accuracy: **accurate**. Accurately describes how the known decay rate of carbon-14 is utilized in dating organic materials.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | **Pourquoi les isotopes sont-ils importants ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | Les isotopes ont diverses applications dans différents domaines : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | 1. **Datation radioactive** : Certains isotopes, comme le carbone-14, sont utilisés pour dater des objets anciens. Le carbone-14 se désintègre à un rythme connu, ce qui permet aux scientifiques de déterminer l&#x27;âge d&#x27;objets organiques. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Isotope application: nuclear medicine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates medical applications of radioactive isotopes in disease diagnostics and therapeutics.

Accuracy: **accurate**. Accurately highlights the role of radioisotopes in diagnostics and radiotherapy in nuclear medicine.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | 2. **Médecine nucléaire** : Les isotopes radioactifs sont utilisés dans certaines procédures médicales pour diagnostiquer et traiter des maladies. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Isotope application: scientific research and isotopic tracers (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of isotopic tracers in environmental, biological, and chemical research.

Accuracy: **accurate**. Accurately states the scientific application of isotopes as tracers to monitor substances and processes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | 3. **Recherche scientifique** : Les isotopes sont utilisés pour tracer les mouvements de substances dans l&#x27;environnement, dans les organismes vivants, et pour étudier divers processus chimiques et biologiques. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Recap of isotopes and concluding encouragement (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key concept of isotopes and concludes the lesson with a welcoming closing.

Accuracy: **accurate**. The recap accurately synthesizes the main definition and significance of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | **Conclusion** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | Les isotopes sont des variantes d&#x27;éléments chimiques qui ont le même nombre de protons mais des nombres différents de neutrons. Comprendre les isotopes nous aide à apprécier la complexité et la diversité de la matière qui nous entoure. Ils jouent un rôle crucial dans divers domaines, de la datation des artefacts anciens à la médecine moderne. J&#x27;espère que cette explication t&#x27;a aidé à comprendre ce qu&#x27;est un isotope et pourquoi ils sont importants. N&#x27;hésite pas à poser d&#x27;autres questions si tu as besoin de clarifications ! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

