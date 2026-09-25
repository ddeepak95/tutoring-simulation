# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text provides a comprehensive and accessible explanation of redox reactions for a high school audience, covering definitions, electron transfers, oxidizing and reducing agents, oxidation numbers, half-reactions, and everyday examples.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 64,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "STUDY_SUPPORT": 2,
    "EXAMPLE": 5,
    "PROCEDURE": 1
  },
  "nested_passages": 64,
  "unique_subtopics": 10,
  "contextualization": {
    "everyday": 1,
    "none": 12
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and importance of redox reactions (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "dans les piles, la corrosion, la respiration, la photosynthèse, la combustion"}]}

Annotation rationale: Defines redox reactions as chemical reactions involving electron transfer between species and states their ubiquity.

Accuracy: **accurate**. Correctly defines redox reactions and highlights notable occurrences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Les réactions d’oxydoréduction (ou réactions **redox**) sont des réactions chimiques au cours desquelles des électrons sont transférés d’une espèce à une autre. C’est un des types de réactions les plus importants en chimie, car on les retrouve partout : dans les piles, la corrosion, la respiration, la photosynthèse, la combustion, etc. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Definitions of oxidation and reduction (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that oxidation is electron loss, reduction is electron gain, and that both processes occur simultaneously.

Accuracy: **accurate**. Oxidation and reduction are accurately defined in terms of electron transfer and their coupled nature.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### 1. Les deux notions fondamentales : oxydation et réduction | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Ces deux phénomènes sont **toujours simultanés**. On ne peut pas avoir l’un sans l’autre. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **L’oxydation** = **perte d’électrons**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 |   Un atome, un ion ou une molécule perd des électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - **La réduction** = **gain d’électrons**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 |   Un atome, un ion ou une molécule gagne des électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Mnemonic for oxidation and reduction (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the 'LEO the lion says GER' mnemonic as well as a direct French reminder.

Accuracy: **accurate**. The mnemonic accurately matches Loss of Electrons = Oxidation and Gain of Electrons = Reduction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | **Astuce pour retenir** :   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | **« LEO le lion dit GER »**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p10 | - **LEO** = Loss of Electrons → Oxidation   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p11 | - **GER** = Gain of Electrons → Reduction | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p12 | Ou en français : « **Perte** d’électrons = **Oxydation** » et « **Gain** d’électrons = **Réduction** ». | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u4: Definitions of oxidizing and reducing agents (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents general definitions of oxidizing agents (electron acceptors) and reducing agents (electron donors).

Accuracy: **accurate**. The definitions of reducing agent and oxidizing agent and their oxidation number changes are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### 2. L’oxydant et le réducteur | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - Le **réducteur** est l’espèce qui **donne** des électrons. Elle s’oxyde (son nombre d’oxydation augmente). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - L’**oxydant** est l’espèce qui **accepte** des électrons. Elle se réduit (son nombre d’oxydation diminue). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Redox reaction between zinc and copper(II) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the Zn + Cu2+ reaction, identifying the oxidation, reduction, reducing agent, oxidizing agent, and physical observations.

Accuracy: **accurate**. The reaction equations, agent assignments, and physical observations are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | **Exemple classique** : la réaction entre le zinc et le cuivre | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p18 | \text{Zn (s)} + \text{Cu}^{2+} \text{(aq)} \rightarrow \text{Zn}^{2+} \text{(aq)} + \text{Cu (s)} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p20 | - Le zinc **perd 2 électrons** : Zn → Zn²⁺ + 2e⁻ → **oxydation**   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p21 |   → Le zinc est le **réducteur**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | - Le cuivre(II) **gagne 2 électrons** : Cu²⁺ + 2e⁻ → Cu → **réduction**   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p23 |   → Cu²⁺ est l’**oxydant**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | On voit concrètement que le zinc se « dissout » et que du cuivre métallique se dépose. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Oxidation numbers and identification of redox reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains oxidation state rules and demonstrates how tracking changes in oxidation numbers identifies redox processes.

Accuracy: **accurate**. The standard oxidation number rules and their application to Zn and Cu are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### 3. Le nombre d’oxydation (NO) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | C’est l’outil le plus important pour repérer une réaction redox. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | **Règles simples à retenir** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | - Élément seul (Zn, Cu, O₂, etc.) → NO = 0 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | - Ion monoatomique → NO = charge de l’ion (Na⁺ = +1, Cl⁻ = –1) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | - Oxygène → généralement –2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | - Hydrogène → généralement +1 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | - La somme des nombres d’oxydation dans une espèce neutre = 0 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | **Dans l’exemple précédent** : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | - Zn : 0 → +2 → **augmente** → oxydation | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | - Cu : +2 → 0 → **diminue** → réduction | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | Si le nombre d’oxydation d’un élément change entre les réactifs et les produits, **il y a une réaction redox**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u7: Writing half-reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the principle of decomposing a redox reaction into two separate half-reactions (oxidation and reduction).

Accuracy: **accurate**. The half-equations for zinc oxidation and copper(II) reduction are written and balanced correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ### 4. Écrire les demi-réactions | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | On sépare toujours la réaction en deux : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p39 | **Demi-réaction d’oxydation** (perte d’électrons) : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p40 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p41 | \text{Zn} \rightarrow \text{Zn}^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p43 | **Demi-réaction de réduction** (gain d’électrons) : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p44 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p45 | \text{Cu}^{2+} + 2e^- \rightarrow \text{Cu} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Example: Combustion of magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents magnesium combustion as a common redox reaction in a summary table.

Accuracy: **accurate**. Correctly identifies O2 as oxidant, Mg as reductant, and notes the bright white light and white MgO product.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### 5. Autres exemples courants | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | &#124; Réaction &#124; Oxydant &#124; Réducteur &#124; Observation &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p49 | &#124;---------&#124;---------&#124;-----------&#124;-------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;, &#x27;separator&#x27;] |
| p50 | &#124; Combustion du magnésium &#124; O₂ &#124; Mg &#124; Lumière vive, MgO blanc &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u9: Example: Rusting of iron (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents iron rusting as a common redox reaction.

Accuracy: **accurate**. Correctly indicates that iron is the reducing agent oxidized in the presence of oxygen and water.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | &#124; Rouille du fer &#124; O₂ + H₂O &#124; Fe &#124; Formation de rouille &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u10: Example: Cellular respiration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents cellular respiration as a biological redox process.

Accuracy: **accurate**. Accurately identifies O2 as the oxidant and glucose as the reductant resulting in energy release.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | &#124; Respiration cellulaire &#124; O₂ &#124; Glucose &#124; Libération d’énergie &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u11: Example: Photosynthesis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents photosynthesis as a redox reaction producing glucose and O2.

Accuracy: **accurate**. Accurately identifies CO2 as oxidant (reduced to glucose) and H2O as reductant (oxidized to O2).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | &#124; Photosynthèse &#124; CO₂ &#124; H₂O &#124; Production de glucose et O₂ &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u12: Procedure to determine if a reaction is redox (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick decision process to determine whether a given chemical reaction is a redox reaction.

Accuracy: **accurate**. Checking for changes in oxidation numbers or electron transfer correctly identifies redox reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ### 6. Comment savoir si une réaction est redox ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | Demande-toi simplement : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p56 | 1. Y a-t-il un changement de nombre d’oxydation ? | PROCEDURE | {} | [&#x27;list&#x27;] |
| p57 | 2. Y a-t-il un transfert d’électrons (même s’il n’est pas écrit) ? | PROCEDURE | {} | [&#x27;list&#x27;] |
| p58 | Si oui → c’est une réaction d’oxydoréduction. | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u13: Summary of redox concepts and closing offer (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key principles of redox reactions and concludes with conversational follow-up questions.

Accuracy: **accurate**. The recap accurately synthesizes all core concepts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p59 | ### Pour résumer | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p60 | - **Oxydation** = perte d’électrons (NO augmente) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p61 | - **Réduction** = gain d’électrons (NO diminue) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p62 | - Les deux se produisent toujours ensemble | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p63 | - L’**oxydant** se réduit, le **réducteur** s’oxyde | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p64 | Tu veux que je développe un exemple précis (comme l’équilibrage d’une équation redox ou le fonctionnement d’une pile) ? Ou préfères-tu des exercices pour t’entraîner ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

