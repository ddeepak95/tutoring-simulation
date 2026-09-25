# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides an accurate and comprehensive explanation of redox reactions in French, covering core definitions, oxidizing and reducing agents, worked examples, oxidation numbers, balancing procedures, real-world applications, and summary points.

## Counts

```json
{
  "total_content_units": 15,
  "substantive_content_units": 15,
  "total_passages": 108,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 9,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 108,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 10,
    "everyday": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 15
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of redox reactions (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines an oxidation-reduction reaction as a chemical transformation involving electron transfer between chemical species.

Accuracy: **accurate**. The definition accurately captures the defining characteristic of redox reactions as electron transfers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Une **réaction d’oxydoréduction** (ou réaction **redox**) est une transformation chimique au cours de laquelle des **électrons sont transférés** d’une espèce chimique à une autre. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Oxidation and reduction processes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two simultaneous half-phenomena comprising redox reactions (oxidation as electron loss and reduction as electron gain) and conservation of electrons.

Accuracy: **accurate**. Correctly defines oxidation and reduction in terms of electron transfer and highlights that electrons lost must equal electrons gained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ## 1. Les deux phénomènes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Une réaction redox comporte toujours simultanément : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - une **oxydation** : une espèce **perd des électrons** ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - une **réduction** : une espèce **gagne des électrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | &gt; Astuce :   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p7 | &gt; **Oxydation = perte d’électrons**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p8 | &gt; **Réduction = gain d’électrons** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p9 | Les électrons perdus par une espèce sont obligatoirement gagnés par une autre : ils ne disparaissent pas. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Definitions and roles of oxidizing and reducing agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidant and reductant, tabulates their behaviors, and explains the counterintuitive relationship that reductants undergo oxidation and oxidants undergo reduction.

Accuracy: **accurate**. Accurately distinguishes between oxidant and reductant and clarifies the naming convention that can confuse students.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## 2. Oxydant et réducteur | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Les espèces qui participent au transfert d’électrons ont des rôles précis : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | &#124; Espèce &#124; Ce qu’elle fait &#124; Évolution &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p14 | &#124;---&#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p15 | &#124; **Réducteur** &#124; Donne/perd des électrons &#124; Il s’oxyde &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p16 | &#124; **Oxydant** &#124; Reçoit/gagne des électrons &#124; Il se réduit &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p17 | Cela peut sembler paradoxal : | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p18 | - le **réducteur** réduit une autre espèce, mais il est lui-même **oxydé** ; | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p19 | - l’**oxydant** oxyde une autre espèce, mais il est lui-même **réduit**. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Worked example of redox reaction between zinc and copper ions (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through a classic laboratory redox reaction between solid zinc and aqueous copper ions, writing half-equations, identifying agents, and describing physical observations.

Accuracy: **accurate**. All half-equations, full reaction equations, agent identities, and qualitative observations (copper deposit and fading blue color) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## 3. Exemple simple : zinc et ions cuivre | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | Plaçons une lame de zinc dans une solution contenant des ions cuivre \(Cu^{2+}\), bleus. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | La réaction est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | ### Étape 1 : écrire les demi-équations | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | Le zinc perd deux électrons : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | Zn(s) \rightarrow Zn^{2+}(aq) + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | C’est une **oxydation**. Le zinc est donc le **réducteur**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | Les ions cuivre gagnent deux électrons : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | Cu^{2+}(aq) + 2e^- \rightarrow Cu(s) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | C’est une **réduction**. Les ions cuivre sont donc l’**oxydant**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | ### Bilan | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | On observe souvent un dépôt de cuivre rouge-orangé sur le zinc, tandis que la couleur bleue de la solution s’atténue. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Identifying redox reactions via oxidation numbers (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces oxidation numbers as a tool for tracking electrons and determining whether species undergo oxidation or reduction, illustrated with the Zn/Cu reaction.

Accuracy: **accurate**. The rule relating changes in oxidation number to oxidation/reduction is correct, and the values assigned to Zn and Cu are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## 4. Comment reconnaître une réaction redox ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | On peut utiliser le **nombre d’oxydation** : c’est un nombre qui permet de suivre les électrons dans une réaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p46 | - Si le nombre d’oxydation **augmente**, l’espèce est **oxydée**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p47 | - S’il **diminue**, l’espèce est **réduite**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p48 | Dans l’exemple précédent : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | Zn : 0 \rightarrow +2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | Le nombre d’oxydation augmente : le zinc est oxydé. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | Cu : +2 \rightarrow 0 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | Le nombre d’oxydation diminue : l’ion cuivre est réduit. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p57 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Real-world example of redox reaction: rust formation on iron (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p62", "quote": "C’est pourquoi on protège le fer par de la peinture, du vernis, du zinc galvanisé ou de l’acier inoxydable."}]}

Annotation rationale: Presents corrosion of iron into rust as a real-world, everyday redox reaction and discusses corrosion prevention methods.

Accuracy: **accurate**. The description of iron rusting as a slow redox process between iron, oxygen, and water, along with common protective coatings, is chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p58 | ## 5. Exemple avec le fer : la rouille | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | La formation de rouille est une réaction redox lente. Le fer réagit avec le dioxygène de l’air, en présence d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p60 | - Le fer perd des électrons : il est **oxydé**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p61 | - Le dioxygène gagne des électrons : il est **réduit**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p62 | La rouille est principalement constituée d’oxydes de fer hydratés. C’est pourquoi on protège le fer par de la peinture, du vernis, du zinc galvanisé ou de l’acier inoxydable. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p63 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Procedure for balancing redox reactions using half-equations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the standard five-step algorithm used in secondary school chemistry to balance redox reactions through electronic half-equations.

Accuracy: **accurate**. The steps described form the correct, standard methodology for balancing redox reactions via half-equations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p64 | ## 6. Équilibrer une réaction redox : méthode des demi-équations | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p65 | Pour équilibrer une réaction redox, on peut suivre cette méthode : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p66 | 1. Identifier l’espèce oxydée et l’espèce réduite. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p67 | 2. Écrire les deux **demi-équations électroniques**. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p68 | 3. Vérifier le nombre d’électrons échangés. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p69 | 4. Multiplier les demi-équations si nécessaire pour avoir autant d’électrons perdus que gagnés. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p70 | 5. Additionner les deux demi-équations et simplifier les électrons. | PROCEDURE | {} | [&#x27;list&#x27;] |

## u8: Worked example of balancing a redox reaction: iron(II) and chlorine (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the half-equation balancing procedure to the reaction between Fe2+ and Cl2, showing equation scaling and addition.

Accuracy: **accurate**. The half-equations, electron balancing step (multiplying by 2), and final summed redox equation are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p71 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p72 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | Fe^{2+} \rightarrow Fe^{3+} + e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | Le fer(II) perd un électron : oxydation. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p76 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | Cl_2 + 2e^- \rightarrow 2Cl^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | Le dichlore gagne deux électrons : réduction. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p80 | Pour équilibrer les électrons, on multiplie la première équation par 2 : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p81 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | 2Fe^{2+} \rightarrow 2Fe^{3+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | Puis on additionne : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p85 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | 2Fe^{2+} + Cl_2 \rightarrow 2Fe^{3+} + 2Cl^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Redox application: electrical cells and batteries (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p91", "quote": "- dans les **piles et batteries** ;"}]}

Annotation rationale: Cites electrical cells and batteries as a prominent practical domain where redox reactions occur. The shared section heading and introductory lead-in are attached to this first bullet.

Accuracy: **accurate**. Batteries and electrochemical cells function based on redox reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p89 | ## 7. Où rencontre-t-on les réactions redox ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p90 | Les réactions redox sont très courantes : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p91 | - dans les **piles et batteries** ; | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Redox application: fuel combustion (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p92", "quote": "- lors de la **combustion** d’un carburant ;"}]}

Annotation rationale: Cites the combustion of fuel as an illustrative occurrence of redox reactions.

Accuracy: **accurate**. Combustion of fuels is a classic oxidation-reduction reaction with oxygen.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p92 | - lors de la **combustion** d’un carburant ; | EXAMPLE | {} | [&#x27;list&#x27;] |

## u11: Redox application: cellular respiration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites cellular respiration as a biological process driven by redox reactions.

Accuracy: **accurate**. Cellular respiration is fundamentally a metabolic series of redox reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p93 | - dans la **respiration cellulaire** ; | EXAMPLE | {} | [&#x27;list&#x27;] |

## u12: Redox application: photosynthesis (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites photosynthesis as a biological occurrence of redox processes.

Accuracy: **accurate**. Photosynthesis is an anabolic redox process involving light-driven electron transport.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p94 | - dans la **photosynthèse** ; | EXAMPLE | {} | [&#x27;list&#x27;] |

## u13: Redox application: metal corrosion (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p95", "quote": "- lors de la **corrosion** des métaux ;"}]}

Annotation rationale: Cites metallic corrosion as an example of redox transformations.

Accuracy: **accurate**. Corrosion is an electrochemical redox reaction between metals and environmental agents.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p95 | - lors de la **corrosion** des métaux ; | EXAMPLE | {} | [&#x27;list&#x27;] |

## u14: Redox application: bleaching and disinfection (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p96", "quote": "- dans le blanchiment, certaines réactions de désinfection, etc."}]}

Annotation rationale: Cites bleaching and chemical disinfection as examples of redox reactions, carrying the terminating separator.

Accuracy: **accurate**. Bleaching agents and many disinfectants (e.g., sodium hypochlorite, hydrogen peroxide) operate via oxidative redox mechanisms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p96 | - dans le blanchiment, certaines réactions de désinfection, etc. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p97 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Summary of key redox principles (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding review highlighting core definitions: oxidation as electron loss, reduction as electron gain, and electron exchange between reductant and oxidant.

Accuracy: **accurate**. The boxed formulas and concluding synthesis correctly reiterate the foundational concepts of oxidation, reduction, reductants, and oxidants.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p98 | ### À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p100 | \boxed{\text{Oxydation = perte d’électrons}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p101 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p102 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p103 | \boxed{\text{Réduction = gain d’électrons}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p104 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p105 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p106 | \boxed{\text{Le réducteur donne des électrons ; l’oxydant les capte.}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p107 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p108 | Une réaction redox est donc toujours un échange d’électrons entre un réducteur et un oxydant. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

