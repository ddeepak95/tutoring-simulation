# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly and comprehensively covers the alkaline earth metals (Group 2 of the periodic table), including their constituent elements, name origin, electron configurations, physical properties, chemical reactivity, natural occurrence, practical uses, and a summary.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 112,
  "content_unit_kinds": {
    "CONCEPT": 8,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 112,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 8,
    "everyday": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Overview and constituent elements of Group 2 (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the alkaline earth metals as Group 2 elements and enumerates the six members of the family (Be, Mg, Ca, Sr, Ba, Ra).

Accuracy: **accurate**. The list of Group 2 elements and their symbols is completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Les **métaux alcalino-terreux** sont une famille d’éléments chimiques située dans la **colonne 2** du tableau périodique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## 1. Quels éléments appartiennent à cette famille ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Ils sont, du haut vers le bas : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | &#124; Symbole &#124; Élément &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; Be &#124; Béryllium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; Mg &#124; Magnésium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; Ca &#124; Calcium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; Sr &#124; Strontium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; Ba &#124; Baryum &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; Ra &#124; Radium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | Le radium est radioactif et très rare. Au lycée, on étudie surtout le **magnésium** et le **calcium**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Origin of the term alkaline earth (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the historical and chemical reasons behind the name 'alcalino-terreux' (alkaline and earth).

Accuracy: **accurate**. Accurately connects the alkaline property to basic oxides/hydroxides and the historical term earth to sparingly soluble refractory metal oxides.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## 2. Pourquoi les appelle-t-on « alcalino-terreux » ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - **Alcalino-** : leurs oxydes et hydroxydes peuvent former des solutions basiques, donc alcalines, dans l’eau. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 |   - Exemple : l’hydroxyde de calcium, \(Ca(OH)_2\), est une base. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - **-terreux** : historiquement, leurs oxydes étaient appelés des « terres » car ce sont des solides peu solubles et difficiles à faire fondre. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic structure and formation of 2+ cations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the ns2 valence configuration and how losing these two outer electrons leads to stable M2+ ions.

Accuracy: **accurate**. The electronic configurations and ionization half-reactions are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## 3. Leur structure électronique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | Les métaux alcalino-terreux possèdent **deux électrons sur leur couche externe**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | Configuration électronique générale : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | ns^2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p24 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | - Magnésium : \(1s^2\,2s^2\,2p^6\,3s^2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | - Calcium : \(1s^2\,2s^2\,2p^6\,3s^2\,3p^6\,4s^2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | Comme ils ont deux électrons externes, ils ont tendance à les perdre pour former des ions de charge \(2+\) : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p29 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | Ca \rightarrow Ca^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | Ils forment donc principalement des **cations \(M^{2+}\)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Physical properties and periodic reactivity trend (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents physical properties and explains the increasing reactivity trend down the group based on atomic radius and shielding.

Accuracy: **accurate**. The stated physical properties and the explanation of the reactivity trend down Group 2 are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## 4. Propriétés physiques | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | Les métaux alcalino-terreux sont : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | - des **métaux solides** à température ambiante ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | - de bons conducteurs de chaleur et d’électricité ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | - généralement gris ou argentés ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p42 | - moins mous et moins réactifs que les métaux alcalins, comme le sodium ou le potassium. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | Ils deviennent globalement plus réactifs lorsqu’on descend dans la colonne : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p44 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p45 | Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p46 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p47 | Cela s’explique car les électrons externes sont de plus en plus éloignés du noyau et donc plus faciles à enlever. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reaction of alkaline earth metals with dioxygen (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the oxidation of alkaline earth metals by oxygen to form oxides, illustrated by magnesium combustion.

Accuracy: **accurate**. The reaction equation 2Mg + O2 -> 2MgO and the optical hazard of magnesium combustion are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | ## 5. Réactions chimiques importantes | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | ### A. Réaction avec le dioxygène | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | Ils réagissent avec le dioxygène de l’air pour former des oxydes métalliques. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p52 | Exemple avec le magnésium : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | Le magnésium brûle avec une **lumière blanche très intense**. Il ne faut jamais regarder directement cette lumière, car elle peut endommager les yeux. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p57 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction of alkaline earth metals with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Discusses how reactivity with water varies across the group and provides the reaction of calcium with water yielding hydroxide and hydrogen gas.

Accuracy: **accurate**. The differential reactivity with water (Be inert, Mg slow, Ca/Sr/Ba fast) and the reaction stoichiometry are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p58 | ### B. Réaction avec l’eau | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | La réactivité avec l’eau dépend de l’élément. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p60 | - Le **béryllium** ne réagit pratiquement pas avec l’eau. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p61 | - Le **magnésium** réagit très lentement avec l’eau froide, mais davantage avec l’eau chaude ou la vapeur. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p62 | - Le **calcium**, le strontium et le baryum réagissent plus facilement avec l’eau. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p63 | Exemple avec le calcium : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p64 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p66 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p67 | Cette réaction produit : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p68 | - de l’**hydroxyde de calcium**, une base ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p69 | - du **dihydrogène**, un gaz inflammable. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p70 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction of alkaline earth metals with acids (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the reaction of alkaline earth metals with acids to yield a salt and dihydrogen, illustrated with Mg and HCl.

Accuracy: **accurate**. The reaction of Mg with HCl to produce MgCl2 and H2 is balanced and chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p71 | ### C. Réaction avec les acides | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p72 | Ils réagissent avec les acides en produisant un sel et du dihydrogène. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p73 | Exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p74 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | Mg + 2HCl \rightarrow MgCl_2 + H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | Le magnésium forme ici du chlorure de magnésium \(MgCl_2\) et libère du dihydrogène. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p78 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Natural occurrence of alkaline earth metal compounds (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why alkaline earth metals occur primarily in ionic mineral forms rather than native metals, listing common minerals.

Accuracy: **accurate**. Formulas and identities for limestone, chalk, gypsum, dolomite, and hard water constituents are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p79 | ## 6. Présence dans la nature | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | Les métaux alcalino-terreux sont rarement présents sous forme de métaux purs, car ils sont trop réactifs. On les trouve surtout dans des composés ioniques. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p81 | Quelques exemples : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p82 | - **Calcaire** : carbonate de calcium, \(CaCO_3\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p83 | - **Craie** : principalement \(CaCO_3\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p84 | - **Gypse** : sulfate de calcium hydraté, \(CaSO_4 \cdot 2H_2O\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p85 | - **Dolomite** : contient du carbonate de calcium et de magnésium | EXAMPLE | {} | [&#x27;list&#x27;] |
| p86 | - **Eau dure** : contient souvent des ions calcium \(Ca^{2+}\) et magnésium \(Mg^{2+}\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p87 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Applications of magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p90", "quote": "- Alliages légers pour l’automobile, l’aéronautique et les vélos."}, {"passage_id": "p93", "quote": "- Important aussi pour le fonctionnement des muscles et des nerfs."}]}

Annotation rationale: Presents concrete real-world uses of magnesium in alloys, pyrotechnics, photosynthesis, and physiology.

Accuracy: **accurate**. Magnesium's presence in chlorophyll, biological roles, and alloy uses are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p88 | ## 7. Exemples d’utilisations | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | ### Magnésium \(Mg\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p90 | - Alliages légers pour l’automobile, l’aéronautique et les vélos. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p91 | - Feux d’artifice et fusées éclairantes : sa combustion produit une lumière blanche intense. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p92 | - Présent dans la chlorophylle des plantes : il est essentiel à la photosynthèse. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p93 | - Important aussi pour le fonctionnement des muscles et des nerfs. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Applications of calcium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p95", "quote": "- Indispensable aux os et aux dents."}, {"passage_id": "p96", "quote": "- Utilisé dans la fabrication du ciment, du plâtre et de la chaux."}]}

Annotation rationale: Presents real-world applications of calcium in biological structures (bones, teeth) and construction materials (cement, plaster, lime).

Accuracy: **accurate**. The listed applications and biological roles of calcium are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p94 | ### Calcium \(Ca\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p95 | - Indispensable aux os et aux dents. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p96 | - Utilisé dans la fabrication du ciment, du plâtre et de la chaux. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p97 | - Les composés du calcium sont très présents dans les roches. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u11: Applications of strontium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p99", "quote": "- Donne une couleur rouge aux feux d’artifice."}]}

Annotation rationale: Presents the use of strontium compounds in pyrotechnics to generate red flames.

Accuracy: **accurate**. Strontium salts are widely used in pyrotechnics to produce red coloration.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p98 | ### Strontium \(Sr\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | - Donne une couleur rouge aux feux d’artifice. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u12: Applications of barium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p101", "quote": "- Certains composés sont utilisés en médecine pour observer le tube digestif par radiographie, notamment le sulfate de baryum \\(BaSO_4\\), qui est peu soluble."}]}

Annotation rationale: Presents the medical application of insoluble barium sulfate as a radiopaque contrast agent.

Accuracy: **accurate**. Barium sulfate's insolubility and use as an X-ray radio-contrast agent for the GI tract is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p100 | ### Baryum \(Ba\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p101 | - Certains composés sont utilisés en médecine pour observer le tube digestif par radiographie, notamment le sulfate de baryum \(BaSO_4\), qui est peu soluble. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p102 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Summary of alkaline earth metal characteristics (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p110", "quote": "6. comprennent notamment le magnésium et le calcium, très importants dans la vie quotidienne."}]}

Annotation rationale: Provides a numbered recap of the six key concepts and a concise concluding summary sentence.

Accuracy: **accurate**. All summary bullet points and the concluding statement accurately reflect high school chemistry knowledge.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p103 | ## 8. À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p104 | Les métaux alcalino-terreux : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p105 | 1. sont dans la **colonne 2** du tableau périodique ; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p106 | 2. ont **deux électrons de valence** ; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p107 | 3. forment généralement des ions \(M^{2+}\) ; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p108 | 4. sont réactifs, surtout vers le bas de la colonne ; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p109 | 5. forment des oxydes et hydroxydes souvent basiques ; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p110 | 6. comprennent notamment le magnésium et le calcium, très importants dans la vie quotidienne. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p111 | Une phrase-bilan possible : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p112 | &gt; Les métaux alcalino-terreux sont des métaux de la colonne 2 qui perdent facilement deux électrons pour former des ions positifs de charge \(2+\). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

