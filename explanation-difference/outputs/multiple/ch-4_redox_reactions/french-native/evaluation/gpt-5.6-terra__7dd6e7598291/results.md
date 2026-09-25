# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains redox reactions, covering definitions, electron transfers, oxidants and reductants, worked reaction examples, redox couples, oxidation numbers, daily life examples, and identification procedures.

## Counts

```json
{
  "total_content_units": 17,
  "substantive_content_units": 17,
  "total_passages": 144,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "STUDY_SUPPORT": 3,
    "EXAMPLE": 6,
    "CAVEAT": 1,
    "PROCEDURE": 1
  },
  "nested_passages": 144,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 14,
    "everyday": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 17
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définitions d'une réaction redox, de l'oxydation et de la réduction (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a redox reaction is in terms of electron transfer and establishes the basic definitions of oxidation and reduction.

Accuracy: **accurate**. The definitions of redox reaction, oxidation (electron loss), and reduction (electron gain) are standard and chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Réactions d’oxydoréduction (ou « redox ») | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | Une réaction d’oxydoréduction est une réaction chimique au cours de laquelle des **électrons sont transférés** d’une espèce chimique à une autre. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | Le mot *oxydoréduction* réunit deux phénomènes qui se produisent toujours en même temps : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **Oxydation** : une espèce **perd des électrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - **Réduction** : une espèce **gagne des électrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Astuce pour mémoriser l'oxydation et la réduction (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary tip reminding students that oxidation is loss and reduction is gain.

Accuracy: **accurate**. The memory aid accurately reflects the definitions of oxidation and reduction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | &gt; Astuce à retenir :   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p7 | &gt; **Oxydation = perte d’électrons**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p8 | &gt; **Réduction = gain d’électrons** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Simultanéité de l'oxydation et de la réduction (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why oxidation and reduction must always take place simultaneously due to electron conservation.

Accuracy: **accurate**. The explanation correctly invokes the principle that electrons cannot exist free in solution and must be transferred directly from donor to acceptor.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## 1. Pourquoi oxydation et réduction vont-elles toujours ensemble ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Les électrons ne peuvent pas disparaître : s’une espèce les perd, une autre doit forcément les recevoir. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | Ainsi, dans toute réaction redox : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p13 | - une substance donne des électrons ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | - une autre substance capte ces électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Définition du réducteur (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the chemical concept of a reducing agent as the species that donates electrons and becomes oxidized.

Accuracy: **accurate**. The definition and the explanation that a reducing agent is itself oxidized are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## 2. Oxydant et réducteur | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | On utilise deux mots importants. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | ### Le réducteur | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | Le **réducteur** est l’espèce qui **donne des électrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | Comme il perd des électrons, il est lui-même **oxydé**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Exemple d'oxydation : le zinc métallique comme réducteur (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked half-reaction showing metallic zinc donating two electrons and acting as a reductant.

Accuracy: **accurate**. The half-reaction Zn -> Zn2+ + 2e- and the conclusion that Zn is oxidized and acts as the reductant are chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | Exemple : un métal comme le zinc peut donner des électrons. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \text{Zn} \rightarrow \text{Zn}^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | Le zinc perd 2 électrons : il est donc oxydé.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | Le zinc est le **réducteur**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Définition de l'oxydant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines an oxidizing agent as an electron acceptor that undergoes reduction.

Accuracy: **accurate**. The definition of an oxidant and the fact that it gets reduced are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ### L’oxydant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | L’**oxydant** est l’espèce qui **capte des électrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p30 | Comme il gagne des électrons, il est lui-même **réduit**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Exemple de réduction : l'ion cuivre (II) comme oxydant (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the reduction half-reaction of copper(II) ions and identifies Cu2+ as the oxidant.

Accuracy: **accurate**. The half-reaction Cu2+ + 2e- -> Cu and the identification of Cu2+ as the oxidant are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | Exemple : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | \text{Cu}^{2+} + 2e^- \rightarrow \text{Cu} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | L’ion cuivre \( \text{Cu}^{2+} \) gagne 2 électrons : il est réduit.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | L’ion cuivre est donc l’**oxydant**. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Astuce mnémotechnique sur l'action de l'oxydant et du réducteur (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a mnemonic verbal cue focusing on the active verb stems (le réducteur réduit, l'oxydant oxyde) to avoid semantic confusion.

Accuracy: **accurate**. The mnemonic tip correctly states the chemical action of oxidants and reductants on partner species.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | &gt; Astuce :   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p38 | &gt; - Le **réducteur réduit** une autre espèce en lui donnant des électrons.   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p39 | &gt; - L’**oxydant oxyde** une autre espèce en lui prenant des électrons. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p40 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Étude complète de la réaction entre le zinc et les ions cuivre (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked laboratory reaction combining experimental observations, individual half-reactions, balanced overall equation, and reagent classification.

Accuracy: **accurate**. The reaction equations, experimental observations, half-equations, electron cancellation, and synthesis table are all chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ## 3. Exemple classique : zinc et ions cuivre | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | On plonge une lame de zinc dans une solution contenant des ions cuivre \( \text{Cu}^{2+} \), bleus. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | La réaction est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p44 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | \text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | Observations possibles : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | - un dépôt de cuivre rouge-orangé apparaît sur le zinc ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p49 | - la couleur bleue de la solution diminue ; | EXAMPLE | {} | [&#x27;list&#x27;] |
| p50 | - le zinc se dissout progressivement. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p51 | ### Étape 1 : demi-équation d’oxydation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | Le zinc perd deux électrons : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | \text{Zn} \rightarrow \text{Zn}^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | ### Étape 2 : demi-équation de réduction | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p57 | Les ions cuivre gagnent ces deux électrons : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p58 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \text{Cu}^{2+} + 2e^- \rightarrow \text{Cu} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p61 | ### Étape 3 : addition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | On additionne les deux équations ; les électrons se simplifient : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p63 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p64 | \boxed{\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p66 | Dans cette réaction : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p67 | &#124; Espèce &#124; Rôle &#124; Transformation &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p68 | &#124;---&#124;---&#124;---&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p69 | &#124; \( \text{Zn} \) &#124; Réducteur &#124; Il s’oxyde &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p70 | &#124; \( \text{Cu}^{2+} \) &#124; Oxydant &#124; Il se réduit &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p71 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Notion de couple oxydant/réducteur (Ox/Red) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the concept of redox couples, notation conventions (Ox/Red), and the corresponding half-equations for copper and zinc.

Accuracy: **accurate**. The standard notation Ox/Red, the definitions of oxidized/reduced forms, and the half-reactions for Cu2+/Cu and Zn2+/Zn are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p72 | ## 4. Les couples oxydant/réducteur | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p73 | Un **couple oxydant/réducteur**, noté généralement **Ox/Red**, regroupe deux formes d’une même espèce : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p74 | - la forme oxydée : l’**oxydant** ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p75 | - la forme réduite : le **réducteur**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p76 | Exemples : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p77 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p78 | \text{Cu}^{2+}/\text{Cu} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p79 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p80 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p81 | \text{Zn}^{2+}/\text{Zn} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p82 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p83 | Pour le couple cuivre : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p84 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p85 | \text{Cu}^{2+} + 2e^- \rightarrow \text{Cu} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p86 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p87 | - \( \text{Cu}^{2+} \) est l’oxydant ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p88 | - \( \text{Cu} \) est le réducteur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p89 | Pour le couple zinc : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p90 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p91 | \text{Zn}^{2+} + 2e^- \rightarrow \text{Zn} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p92 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p93 | - \( \text{Zn}^{2+} \) est l’oxydant ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p94 | - \( \text{Zn} \) est le réducteur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u11: Précision sur le rôle effectif d'une espèce dans une réaction donnée (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies that while a couple contains both conjugate forms, only one specific form acts as a reactant in a concrete reaction.

Accuracy: **accurate**. Accurately points out that in a given reaction, one specific chemical form acts as the reactant (e.g., Zn metal as reductant, Cu2+ as oxidant).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p95 | Attention : dans une réaction donnée, une espèce joue un rôle précis. Dans l’exemple zinc/cuivre, c’est le zinc métallique qui agit comme réducteur et l’ion cuivre qui agit comme oxydant. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p96 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Lien entre transferts d'électrons et nombre d'oxydation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how oxidation states/numbers track electron loss (increase in oxidation number) and electron gain (decrease in oxidation number), illustrated with the Zn/Cu reaction.

Accuracy: **accurate**. The correlation between oxidation state changes and redox processes (increase = oxidation, decrease = reduction) and the assigned values (Zn: 0 -> +2, Cu: +2 -> 0) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p97 | ## 5. Lien avec le nombre d’oxydation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | Le **nombre d’oxydation** permet de repérer plus facilement les transferts d’électrons. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p99 | - Lors d’une **oxydation**, le nombre d’oxydation **augmente**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p100 | - Lors d’une **réduction**, le nombre d’oxydation **diminue**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p101 | Dans la réaction : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p102 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p103 | \text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p104 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p105 | - Zinc : \(0 \rightarrow +2\) : il est oxydé. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p106 | - Cuivre : \(+2 \rightarrow 0\) : il est réduit. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p107 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Exemple du quotidien : la rouille du fer (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p108", "quote": "## 6. Exemples de réactions redox dans la vie quotidienne"}, {"passage_id": "p110", "quote": "Le fer réagit avec le dioxygène de l’air et l’eau. Il se transforme progressivement en rouille."}]}

Annotation rationale: Illustrates corrosion and redox processes in everyday life using the formation of rust on iron.

Accuracy: **accurate**. The description of iron corrosion as an oxidation of iron and reduction of oxygen is chemically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p108 | ## 6. Exemples de réactions redox dans la vie quotidienne | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p109 | ### La rouille du fer | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p110 | Le fer réagit avec le dioxygène de l’air et l’eau. Il se transforme progressivement en rouille. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p111 | - Le fer perd des électrons : il est oxydé. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p112 | - Le dioxygène gagne des électrons : il est réduit. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p113 | C’est une réaction de corrosion. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u14: Exemple du quotidien : la combustion (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p115", "quote": "Lorsqu’un combustible brûle, par exemple du carbone :"}]}

Annotation rationale: Illustrates combustion of carbon as a redox reaction where carbon is oxidized and oxygen is reduced.

Accuracy: **accurate**. The equation C + O2 -> CO2 and the identification of carbon oxidation and oxygen reduction are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p114 | ### La combustion | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p115 | Lorsqu’un combustible brûle, par exemple du carbone : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p116 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p117 | \text{C} + \text{O}_2 \rightarrow \text{CO}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p118 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p119 | Le carbone est oxydé et le dioxygène est réduit. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u15: Exemple du quotidien : les piles et accumulateurs (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p121", "quote": "Dans une pile, une réaction redox produit un déplacement d’électrons dans un circuit électrique."}]}

Annotation rationale: Explains electrochemical cells/batteries as a practical application where redox reactions generate an electric current.

Accuracy: **accurate**. The physical explanation of galvanic cells and batteries converting redox chemical energy into electric current is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p120 | ### Les piles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p121 | Dans une pile, une réaction redox produit un déplacement d’électrons dans un circuit électrique. Ce déplacement crée un courant électrique. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p122 | Les piles, batteries, accumulateurs et certaines piles à combustible reposent donc sur des réactions d’oxydoréduction. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p123 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Méthode pour reconnaître une réaction redox (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a practical 3-step decision procedure for determining whether a chemical equation represents a redox process.

Accuracy: **accurate**. The verification questions (loss/gain of electrons, variation in oxidation states) provide a valid and complete diagnostic method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p124 | ## 7. Méthode pour reconnaître une réaction redox | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p125 | Pour savoir si une réaction est une oxydoréduction, on peut se demander : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p126 | 1. Y a-t-il une espèce qui perd des électrons ? | PROCEDURE | {} | [&#x27;list&#x27;] |
| p127 | 2. Y a-t-il une autre espèce qui gagne ces électrons ? | PROCEDURE | {} | [&#x27;list&#x27;] |
| p128 | 3. Les nombres d’oxydation changent-ils ? | PROCEDURE | {} | [&#x27;list&#x27;] |
| p129 | Si la réponse est oui, c’est une réaction redox. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p130 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u17: Récapitulatif des règles fondamentales à retenir (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential definitions and rules of redox reactions in framed takeaway boxes.

Accuracy: **accurate**. All summarized relationships (oxidation = electron loss, reduction = electron gain, reductant = electron donor = gets oxidized, oxidant = electron acceptor = gets reduced) are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p131 | ## À retenir absolument | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p132 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p133 | \boxed{\text{Oxydation = perte d’électrons}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p134 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p135 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p136 | \boxed{\text{Réduction = gain d’électrons}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p137 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p138 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p139 | \boxed{\text{Réducteur = donne des électrons = s’oxyde}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p140 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p141 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p142 | \boxed{\text{Oxydant = capte des électrons = se réduit}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p143 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p144 | Une réaction d’oxydoréduction est donc toujours un **échange d’électrons entre un réducteur et un oxydant**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

