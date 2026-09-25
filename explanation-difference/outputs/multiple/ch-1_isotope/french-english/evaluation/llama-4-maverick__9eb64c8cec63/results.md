# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and comprehensively explains the concept of isotopes, including their definition, an illustrative example with carbon, their chemical and physical properties, practical applications, and a summary.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 19,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 19,
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

## u1: Definition of an isotope (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what an isotope is, stating that it has the same number of protons but a different number of neutrons.

Accuracy: **accurate**. The definition accurately states that isotopes share the same atomic number (protons) but vary in neutron count.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Aujourd&#x27;hui, nous allons parler des isotopes en chimie. Les isotopes sont un concept fondamental en chimie et en physique, et je suis ravi de vous aider à comprendre ce sujet. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | **Qu&#x27;est-ce qu&#x27;un isotope ?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Un isotope est un atome d&#x27;un élément chimique qui a le même nombre de protons dans son noyau que les autres atomes de cet élément, mais qui diffère par le nombre de neutrons. Oui, vous avez bien entendu, le nombre de protons reste le même, mais le nombre de neutrons varie. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a multi-part illustrative example using carbon to explain how the same atomic number can pair with different neutron numbers (carbon 12, 13, and 14).

Accuracy: **accurate**. The proton and neutron numbers for carbon-12, carbon-13, and carbon-14 are described correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | **Comprenons mieux avec un exemple** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Prenons l&#x27;exemple du carbone. Le carbone a un numéro atomique de 6, ce qui signifie qu&#x27;il a 6 protons dans son noyau. Les atomes de carbone peuvent avoir différents nombres de neutrons : 6, 7 ou 8. Cela nous donne trois isotopes du carbone : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p6 | * Le carbone 12 (6 protons + 6 neutrons) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | * Le carbone 13 (6 protons + 7 neutrons) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 | * Le carbone 14 (6 protons + 8 neutrons) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share chemical properties (same electron configuration) while differing slightly in physical properties (mass difference, radioactivity vs. stability).

Accuracy: **accurate**. The explanation correctly attributes chemical similarity to identical electron counts and physical variance to mass differences, accurately contrasting stable carbon-12/13 with radioactive carbon-14.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **Propriétés des isotopes** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Les isotopes d&#x27;un même élément ont les mêmes propriétés chimiques, car ils ont le même nombre d&#x27;électrons (et donc le même nombre de protons). Cependant, ils peuvent avoir des propriétés physiques légèrement différentes en raison de leur différence de masse. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | Par exemple, les isotopes du carbone ont tous les mêmes propriétés chimiques, mais le carbone 14 est radioactif, c&#x27;est-à-dire qu&#x27;il se désintègre en émettant des particules, alors que le carbone 12 et le carbone 13 sont stables. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Archaeological dating with carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the practical application of radioactive isotopes using carbon-14 dating for archaeological samples.

Accuracy: **accurate**. Carbon-14 is genuinely used as a standard method for dating archaeological artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | **Utilisations des isotopes** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Les isotopes ont de nombreuses applications en science et dans l&#x27;industrie. Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | * Les isotopes radioactifs, comme le carbone 14, sont utilisés pour dater des échantillons archéologiques. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Spectroscopy using carbon-13 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of stable isotopes in molecular structure determination via spectroscopy.

Accuracy: **accurate**. Carbon-13 NMR spectroscopy is a well-established technique for determining molecular structures in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | * Les isotopes stables, comme le carbone 13, sont utilisés en spectroscopie pour analyser la structure des molécules. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Isotopes in nuclear medicine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates medical applications of isotopes for disease diagnosis and therapy.

Accuracy: **accurate**. Medical radioisotopes are widely employed in diagnostic imaging (e.g., PET, SPECT) and radiation therapy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | * Les isotopes sont également utilisés en médecine nucléaire pour diagnostiquer et traiter certaines maladies. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Recap of isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the main learning points covered in the lesson and closes with an invitation for questions.

Accuracy: **accurate**. The recap accurately synthesizes the definition, properties, and applications of isotopes without introducing any errors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | **En résumé** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | En résumé, les isotopes sont des atomes d&#x27;un même élément qui ont le même nombre de protons, mais un nombre de neutrons différent. Ils ont les mêmes propriétés chimiques, mais peuvent avoir des propriétés physiques différentes. Les isotopes ont de nombreuses applications en science et dans l&#x27;industrie. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p19 | J&#x27;espère que cette explication vous a aidé à comprendre les isotopes. Avez-vous des questions ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

