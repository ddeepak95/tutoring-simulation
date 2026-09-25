# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses vapour phase refining in metallurgy, including its general operating principle, the Mond process for nickel, its benefits, and its specific applicability.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 24,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 24,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Basic principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the fundamental concept behind vapour phase refining: converting an impure metal into a gas and condensing/re-solidifying it elsewhere in pure form.

Accuracy: **accurate**. The introductory summary accurately states the core principle of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Le raffinage en phase vapeur | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Le principe de base | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Imagine que tu as un métal impur, mélangé à d&#x27;autres substances, et que tu veuilles obtenir ce métal **très pur**. Le raffinage en phase vapeur est une technique astucieuse qui utilise un principe simple :  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | **On transforme le métal en gaz, puis on le refait redevenir solide (ou liquide) ailleurs, pur.** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Distillation of salt water analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "Pense à l'eau salée. Si tu la fais bouillir, la vapeur d'eau qui s'échappe ne contient **pas de sel** ! Le sel reste dans le récipient. Si tu récupères cette vapeur et que tu la refroidis, tu obtiens de l'eau pure, sans sel."}]}

Annotation rationale: Compares vapour phase refining to the distillation of salt water, where boiling produces pure water vapor leaving behind impurities.

Accuracy: **accurate**. The analogy of boiling salt water to leave non-volatile salts behind accurately parallels the separation based on volatility.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ## Une analogie simple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Pense à l&#x27;eau salée. Si tu la fais bouillir, la vapeur d&#x27;eau qui s&#x27;échappe ne contient **pas de sel** ! Le sel reste dans le récipient. Si tu récupères cette vapeur et que tu la refroidis, tu obtiens de l&#x27;eau pure, sans sel. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | C&#x27;est exactement le même principe pour purifier certains métaux ! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Chemical mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the metal is converted via chemical reaction into a volatile compound and then regenerated in pure solid form by reversing the reaction.

Accuracy: **accurate**. Accurately presents the general two-step chemical mechanism of vapour phase refining (formation of volatile compound and subsequent decomposition).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## Comment ça marche concrètement ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Le métal impur est transformé en un **composé volatil** (qui se transforme facilement en gaz), grâce à une réaction chimique. Ce gaz est ensuite transporté vers un autre endroit, où on inverse la réaction pour récupérer le métal **pur** sous forme solide. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Mond process for the purification of nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the classic industrial Mond process for nickel with specific reaction steps, conditions, and word equations.

Accuracy: **accurate**. The reaction temperatures (50-60°C for tetracarbonylnickel formation, ~200°C for decomposition) and reaction stages accurately reflect the Mond process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### Exemple célèbre : le procédé Mond (purification du nickel) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | 1. **Étape 1 - Formation du gaz** : On fait réagir du nickel impur avec du monoxyde de carbone (CO) à une température modérée (environ 50-60°C) : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 |    Nickel (impur) + CO → Tétracarbonyle de nickel (gaz) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p13 |    Les impuretés, elles, ne réagissent pas avec le CO et restent solides ! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | 2. **Étape 2 - Transport** : Ce gaz est envoyé dans une autre zone. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | 3. **Étape 3 - Décomposition** : À une température plus élevée (environ 200°C), le gaz se décompose et redonne : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 |    Tétracarbonyle de nickel → Nickel (pur, solide) + CO (qui repart pour un nouveau cycle !) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u5: Advantages of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents three key advantages of vapour phase refining: high purity, cost-effectiveness through reagent recycling, and chemical selectivity.

Accuracy: **accurate**. The advantages of high product purity (>99.9%), reagent recyclability (CO), and selective volatile compound formation are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## Pourquoi cette méthode est-elle intéressante ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | - **Très efficace** : on peut obtenir des métaux avec une pureté supérieure à 99,9% ! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | - **Économique** : le monoxyde de carbone est récupéré et réutilisé en boucle. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | - **Sélective** : seul le métal qu&#x27;on veut purifier forme le composé volatil, les impuretés restent derrière. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Applicability and limitations of vapour phase refining (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Notes that the method is not universal and only applies to metals capable of forming volatile compounds under accessible conditions (e.g., Ni, Ti, Zr).

Accuracy: **accurate**. Correctly states the primary constraint (formation of a volatile compound) and cites valid examples (nickel via Mond process; titanium and zirconium via Van Arkel-de Boer process).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## Un point clé à retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | Cette technique fonctionne uniquement pour les métaux capables de former des **composés volatils** avec certains gaz (comme le CO). Ce n&#x27;est donc pas une méthode universelle, mais elle est parfaite pour certains métaux comme le **nickel**, le **titane** ou le **zirconium**. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | Est-ce que cette explication te semble claire ? Veux-tu que j&#x27;approfondisse un exemple en particulier ou que je te parle d&#x27;autres méthodes de purification des métaux ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

