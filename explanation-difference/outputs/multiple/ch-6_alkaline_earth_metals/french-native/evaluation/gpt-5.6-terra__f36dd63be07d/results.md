# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains alkaline earth metals, covering their position in the periodic table, electronic structure, chemical reactivity, daily-life applications, and flame test colors.

## Counts

```json
{
  "total_content_units": 13,
  "substantive_content_units": 13,
  "total_passages": 113,
  "content_unit_kinds": {
    "CONCEPT": 7,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 113,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 11,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 13
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Position in the Periodic Table and Listing of Group 2 Elements (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies alkaline earth metals as Group 2 elements of the periodic table and enumerates them (Be, Mg, Ca, Sr, Ba, Ra).

Accuracy: **accurate**. Correctly states the Group 2 composition and notes radium's radioactivity and rarity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Les **métaux alcalino-terreux** sont une famille d’éléments chimiques du tableau périodique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## 1. Où se trouvent-ils dans le tableau périodique ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Ils sont dans la **2ᵉ colonne** du tableau périodique, appelée aussi **groupe 2**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | Ils comprennent : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | &#124; Symbole &#124; Élément &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; Be &#124; Béryllium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; Mg &#124; Magnésium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; Ca &#124; Calcium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; Sr &#124; Strontium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; Ba &#124; Baryum &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &#124; Ra &#124; Radium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p13 | Le radium est radioactif et très rare. Au lycée, on rencontre surtout le **magnésium** et le **calcium**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Origin and Meaning of the Name 'Alkaline Earth' (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the etymology of 'alcalino-terreux', connecting 'alcalino-' to basic solutions and '-terreux' to historical terminology for insoluble mineral oxides.

Accuracy: **accurate**. The etymological explanation accurately reflects historical and chemical terminology.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## 2. Pourquoi les appelle-t-on « alcalino-terreux » ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - **Alcalino-** : leurs oxydes ou hydroxydes peuvent former des solutions **basiques** (ou alcalines) dans l’eau. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 |   - Exemple : l’hydroxyde de calcium, \( \text{Ca(OH)}_2 \), donne une solution basique appelée **eau de chaux**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | - **-terreux** : anciennement, on appelait « terres » certains solides minéraux difficiles à faire fondre ou à dissoudre. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electronic Configuration and Formation of Divalent Cations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that Group 2 elements possess two valence electrons and readily lose them to form M2+ cations.

Accuracy: **accurate**. Accurately presents the two valence electrons and the oxidation half-equations yielding M2+.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## 3. Leur structure électronique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | Les métaux alcalino-terreux possèdent **2 électrons sur leur couche externe**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | Exemples : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | - Magnésium : \( \text{Mg} \) possède 2 électrons de valence. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | - Calcium : \( \text{Ca} \) possède aussi 2 électrons de valence. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | Ils ont tendance à **perdre ces 2 électrons** pour devenir des ions positifs de charge \(2+\) : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p26 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p27 | \text{Mg} \rightarrow \text{Mg}^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p28 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p29 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p30 | \text{Ca} \rightarrow \text{Ca}^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p31 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p32 | C’est pourquoi leurs ions ont généralement la formule : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p33 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p34 | \boxed{\text{M}^{2+}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p35 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p36 | où M représente un métal alcalino-terreux. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: General Physical and Chemical Characteristics (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists general macroscopic physical properties of alkaline earth metals and explains their natural state as bonded minerals due to reactivity.

Accuracy: **accurate**. The description of metallic appearance, conductivity, reactivity relative to alkali metals, and occurrence in nature is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## 4. Propriétés générales | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | Les métaux alcalino-terreux sont : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | - des **métaux solides** à température ambiante ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 | - plutôt **gris argentés** lorsqu’ils sont purs ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p42 | - de bons conducteurs de la chaleur et de l’électricité ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p43 | - réactifs, mais en général **moins réactifs que les métaux alcalins** (comme le sodium ou le potassium, situés juste à gauche dans le tableau). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p44 | Ils ne se trouvent presque jamais seuls dans la nature, car ils réagissent facilement avec d’autres éléments, notamment l’oxygène, l’eau ou le dioxyde de carbone. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p45 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reactivity Trend with Water (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that the reactivity with water increases going down the group from beryllium to barium.

Accuracy: **accurate**. The reactivity trend Be < Mg < Ca < Sr < Ba is chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ## 5. Réactivité avec l’eau | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | La réactivité augmente généralement en descendant dans la colonne : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p48 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p49 | \text{Be} &lt; \text{Mg} &lt; \text{Ca} &lt; \text{Sr} &lt; \text{Ba} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p50 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u6: Reaction of Calcium and Magnesium with Water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a specific illustrative example of the reaction of calcium with water, its balanced equation and observations, followed by magnesium's behavior.

Accuracy: **accurate**. The chemical equation Ca + 2H2O -> Ca(OH)2 + H2 and the described observations (gas evolution, basicity, turbidity) as well as Mg's temperature-dependent behavior are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | ### Exemple avec le calcium | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | Le calcium réagit avec l’eau en formant de l’hydroxyde de calcium et du dihydrogène : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | \text{Ca} + 2\text{H}_2\text{O} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \rightarrow | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | \text{Ca(OH)}_2 + \text{H}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p57 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | On observe : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p59 | - des bulles de dihydrogène ; | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p60 | - une solution qui devient basique ; | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p61 | - parfois un aspect trouble dû à l’hydroxyde de calcium. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p62 | Le magnésium réagit très lentement avec l’eau froide, mais plus facilement avec de l’eau chaude ou de la vapeur d’eau. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p63 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reactivity with Dioxygen to Form Metal Oxides (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that alkaline earth metals react with dioxygen in air to form metal oxides.

Accuracy: **accurate**. Accurately states that alkaline earth metals react with dioxygen to yield metal oxides.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p64 | ## 6. Réactivité avec le dioxygène | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p65 | Ils peuvent réagir avec le dioxygène de l’air pour former des **oxydes métalliques**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u8: Combustion of Magnesium in Oxygen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the combustion reaction of magnesium ribbon with oxygen to form magnesium oxide, including safety notes and visual observations.

Accuracy: **accurate**. The equation 2Mg + O2 -> 2MgO and descriptions of the intense white flame and white solid product are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p66 | Exemple avec le magnésium : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p67 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p68 | 2\text{Mg} + \text{O}_2 \rightarrow 2\text{MgO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | Lorsqu’on brûle du magnésium, il produit une lumière blanche très intense. Il faut éviter de regarder cette lumière directement. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p71 | L’oxyde formé, \( \text{MgO} \), est un solide blanc. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Practical and Biological Uses of Magnesium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p76", "quote": "dans des alliages légers pour les avions, les vélos ou les voitures ;"}, {"passage_id": "p78", "quote": "dans le corps humain, où il est important pour le fonctionnement des muscles et des nerfs."}]}

Annotation rationale: Details real-world applications of magnesium in lightweight alloys, pyrotechnics, and human physiology.

Accuracy: **accurate**. Correctly describes the uses of magnesium in light structural alloys, fireworks/flares, and neuromuscular biochemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p73 | ## 7. Exemples importants dans la vie quotidienne | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | ### Le magnésium, Mg | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p75 | Le magnésium est utilisé : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p76 | - dans des alliages légers pour les avions, les vélos ou les voitures ; | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p77 | - dans certains feux d’artifice et fusées éclairantes ; | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p78 | - dans le corps humain, où il est important pour le fonctionnement des muscles et des nerfs. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u10: Occurrences and Uses of Calcium and Calcium Carbonate (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p81", "quote": "aux os et aux dents ;"}, {"passage_id": "p88", "quote": "Le carbonate de calcium est présent dans la craie, le marbre, les coquilles d’œufs et certaines roches."}]}

Annotation rationale: Presents natural occurrences and daily-life roles of calcium, including skeletal biology, construction, and calcium carbonate in shells, chalk, and marble.

Accuracy: **accurate**. The physiological role of calcium and the occurrence of CaCO3 in limestone, chalk, marble, and eggshells are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p79 | ### Le calcium, Ca | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | Le calcium est essentiel : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p81 | - aux os et aux dents ; | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p82 | - aux coquillages et aux coraux ; | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p83 | - à certains matériaux de construction. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p84 | On le trouve dans le calcaire, principalement sous forme de carbonate de calcium : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p85 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | \text{CaCO}_3 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | Le carbonate de calcium est présent dans la craie, le marbre, les coquilles d’œufs et certaines roches. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Medical Application of Barium Sulfate (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the medical imaging application of barium sulfate as a radiocontrast agent for X-rays.

Accuracy: **accurate**. Barium sulfate is widely used as a radiopaque contrast agent in gastrointestinal radiography.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p89 | ### Le baryum, Ba | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p90 | Le sulfate de baryum, \( \text{BaSO}_4 \), est utilisé en médecine lors de certaines radiographies du système digestif, car il arrête bien les rayons X. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p91 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Flame Test Colors of Group 2 Cations (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents characteristic flame test emission colors for Ca2+, Sr2+, Ba2+, and Mg2+, and notes their use in pyrotechnics.

Accuracy: **accurate**. The flame colors (Ca2+ brick red/orange-red, Sr2+ bright red, Ba2+ apple green, and no distinct flame color for Mg2+) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p92 | ## 8. Couleurs dans la flamme | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | Certains ions alcalino-terreux donnent une couleur caractéristique à la flamme : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p94 | &#124; Ion &#124; Couleur de la flamme &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p95 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p96 | &#124; \( \text{Ca}^{2+} \) &#124; orange-rouge / rouge brique &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p97 | &#124; \( \text{Sr}^{2+} \) &#124; rouge intense &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p98 | &#124; \( \text{Ba}^{2+} \) &#124; vert &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p99 | &#124; \( \text{Mg}^{2+} \) &#124; pas de coloration nette en test de flamme &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p100 | Ces couleurs sont notamment utilisées dans les feux d’artifice. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p101 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Key Takeaways and Memory Rule (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential points learned about alkaline earth metals and provides a concise takeaway formula.

Accuracy: **accurate**. The recap accurately synthesizes all core concepts presented in the text.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p102 | ## À retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p103 | - Les métaux alcalino-terreux sont les éléments de la **colonne 2** du tableau périodique. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p104 | - Ils ont **2 électrons de valence**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p105 | - Ils forment habituellement des ions de charge : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p106 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p107 | \boxed{\text{M}^{2+}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p108 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p109 | - Leur réactivité augmente en descendant dans la colonne. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p110 | - Les plus connus sont le **magnésium** et le **calcium**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p111 | - Ils forment souvent des composés basiques, comme les hydroxydes. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p112 | Une idée simple à retenir :   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p113 | **colonne 2 → perte de 2 électrons → ion \(2+\)**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

