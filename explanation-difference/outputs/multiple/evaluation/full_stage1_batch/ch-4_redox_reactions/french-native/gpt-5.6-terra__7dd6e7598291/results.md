# Stage 1: French / redox reactions

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "redox reactions",
  "observed_topic": "Redox reactions (definitions of oxidation/reduction, oxidants/reductants, couples, worked example, oxidation numbers, everyday applications, and identification method)",
  "topic_match": "on_topic",
  "reason": "The text directly and thoroughly explains redox reactions, covering definitions, agents, half-reactions, couples, oxidation states, and applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of redox reactions, oxidation, reduction, and why they occur simultaneously | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Definitions and roles of reducing agents and oxidizing agents | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Worked example of the zinc-copper ion redox reaction | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Redox couples (Ox/Red convention and identification) | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Connection between redox reactions and oxidation numbers | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Iron rusting as an everyday redox reaction | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Combustion as an everyday redox reaction | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Batteries and cells as everyday applications of redox reactions | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | PROCEDURE | General method to identify whether a reaction is a redox reaction | {} | accurate |
| u10 | STUDY_SUPPORT | Final summary recap of essential redox definitions and relationships | {"subtype": "recap"} | accurate |

## u1: Definition of redox reactions, oxidation, reduction, and why they occur simultaneously

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition of redox reactions and the explanation of conservation of electrons justifying the paired nature of oxidation and reduction are chemically sound.",
    "errors": []
  }
}
```

```text
Une réaction d’oxydoréduction est une réaction chimique au cours de laquelle des **électrons sont transférés** d’une espèce chimique à une autre.

Le mot *oxydoréduction* réunit deux phénomènes qui se produisent toujours en même temps :

- **Oxydation** : une espèce **perd des électrons**.
- **Réduction** : une espèce **gagne des électrons**.

> Astuce à retenir :  
> **Oxydation = perte d’électrons**  
> **Réduction = gain d’électrons**

---

## 1. Pourquoi oxydation et réduction vont-elles toujours ensemble ?

Les électrons ne peuvent pas disparaître : s’une espèce les perd, une autre doit forcément les recevoir.

Ainsi, dans toute réaction redox :

- une substance donne des électrons ;
- une autre substance capte ces électrons.
```


## u2: Definitions and roles of reducing agents and oxidizing agents

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definitions of reducing and oxidizing agents, along with their complementary transformations and half-equations, are accurate.",
    "errors": []
  }
}
```

```text
## 2. Oxydant et réducteur

On utilise deux mots importants.

### Le réducteur

Le **réducteur** est l’espèce qui **donne des électrons**.

Comme il perd des électrons, il est lui-même **oxydé**.

Exemple : un métal comme le zinc peut donner des électrons.

\[
\text{Zn} \rightarrow \text{Zn}^{2+} + 2e^-
\]

Le zinc perd 2 électrons : il est donc oxydé.  
Le zinc est le **réducteur**.

---

### L’oxydant

L’**oxydant** est l’espèce qui **capte des électrons**.

Comme il gagne des électrons, il est lui-même **réduit**.

Exemple :

\[
\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}
\]

L’ion cuivre \( \text{Cu}^{2+} \) gagne 2 électrons : il est réduit.  
L’ion cuivre est donc l’**oxydant**.

> Astuce :  
> - Le **réducteur réduit** une autre espèce en lui donnant des électrons.  
> - L’**oxydant oxyde** une autre espèce en lui prenant des électrons.
```


## u3: Worked example of the zinc-copper ion redox reaction

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The qualitative observations, half-equations, electron balancing, overall equation, and table of roles are chemically accurate.",
    "errors": []
  }
}
```

```text
## 3. Exemple classique : zinc et ions cuivre

On plonge une lame de zinc dans une solution contenant des ions cuivre \( \text{Cu}^{2+} \), bleus.

La réaction est :

\[
\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}
\]

Observations possibles :

- un dépôt de cuivre rouge-orangé apparaît sur le zinc ;
- la couleur bleue de la solution diminue ;
- le zinc se dissout progressivement.

### Étape 1 : demi-équation d’oxydation

Le zinc perd deux électrons :

\[
\text{Zn} \rightarrow \text{Zn}^{2+} + 2e^-
\]

### Étape 2 : demi-équation de réduction

Les ions cuivre gagnent ces deux électrons :

\[
\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}
\]

### Étape 3 : addition

On additionne les deux équations ; les électrons se simplifient :

\[
\boxed{\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}}
\]

Dans cette réaction :

| Espèce | Rôle | Transformation |
|---|---|---|
| \( \text{Zn} \) | Réducteur | Il s’oxyde |
| \( \text{Cu}^{2+} \) | Oxydant | Il se réduit |
```


## u4: Redox couples (Ox/Red convention and identification)

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The Ox/Red convention and identification of oxidized and reduced conjugate forms are correct.",
    "errors": []
  }
}
```

```text
## 4. Les couples oxydant/réducteur

Un **couple oxydant/réducteur**, noté généralement **Ox/Red**, regroupe deux formes d’une même espèce :

- la forme oxydée : l’**oxydant** ;
- la forme réduite : le **réducteur**.

Exemples :

\[
\text{Cu}^{2+}/\text{Cu}
\]

\[
\text{Zn}^{2+}/\text{Zn}
\]

Pour le couple cuivre :

\[
\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}
\]

- \( \text{Cu}^{2+} \) est l’oxydant ;
- \( \text{Cu} \) est le réducteur.

Pour le couple zinc :

\[
\text{Zn}^{2+} + 2e^- \rightarrow \text{Zn}
\]

- \( \text{Zn}^{2+} \) est l’oxydant ;
- \( \text{Zn} \) est le réducteur.

Attention : dans une réaction donnée, une espèce joue un rôle précis. Dans l’exemple zinc/cuivre, c’est le zinc métallique qui agit comme réducteur et l’ion cuivre qui agit comme oxydant.
```


## u5: Connection between redox reactions and oxidation numbers

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The rule that oxidation corresponds to an increase in oxidation number and reduction to a decrease is accurately stated and applied.",
    "errors": []
  }
}
```

```text
## 5. Lien avec le nombre d’oxydation

Le **nombre d’oxydation** permet de repérer plus facilement les transferts d’électrons.

- Lors d’une **oxydation**, le nombre d’oxydation **augmente**.
- Lors d’une **réduction**, le nombre d’oxydation **diminue**.

Dans la réaction :

\[
\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}
\]

- Zinc : \(0 \rightarrow +2\) : il est oxydé.
- Cuivre : \(+2 \rightarrow 0\) : il est réduit.
```


## u6: Iron rusting as an everyday redox reaction

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "La rouille du fer\n\nLe fer réagit avec le dioxygène de l’air et l’eau. Il se transforme progressivement en rouille."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The description of iron corrosion/rusting as a redox process involving iron oxidation and oxygen reduction is correct.",
    "errors": []
  }
}
```

```text
### La rouille du fer

Le fer réagit avec le dioxygène de l’air et l’eau. Il se transforme progressivement en rouille.

- Le fer perd des électrons : il est oxydé.
- Le dioxygène gagne des électrons : il est réduit.

C’est une réaction de corrosion.
```


## u7: Combustion as an everyday redox reaction

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Lorsqu’un combustible brûle, par exemple du carbone"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The combustion of carbon to carbon dioxide is correctly identified as a redox reaction where carbon is oxidized and dioxygen is reduced.",
    "errors": []
  }
}
```

```text
### La combustion

Lorsqu’un combustible brûle, par exemple du carbone :

\[
\text{C} + \text{O}_2 \rightarrow \text{CO}_2
\]

Le carbone est oxydé et le dioxygène est réduit.
```


## u8: Batteries and cells as everyday applications of redox reactions

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Les piles, batteries, accumulateurs"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The explanation that electrochemical cells and batteries generate electric current from redox electron transfer is accurate.",
    "errors": []
  }
}
```

```text
### Les piles

Dans une pile, une réaction redox produit un déplacement d’électrons dans un circuit électrique. Ce déplacement crée un courant électrique.

Les piles, batteries, accumulateurs et certaines piles à combustible reposent donc sur des réactions d’oxydoréduction.
```


## u9: General method to identify whether a reaction is a redox reaction

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The diagnostic questions provided for determining whether a chemical reaction is redox are valid.",
    "errors": []
  }
}
```

```text
## 7. Méthode pour reconnaître une réaction redox

Pour savoir si une réaction est une oxydoréduction, on peut se demander :

1. Y a-t-il une espèce qui perd des électrons ?
2. Y a-t-il une autre espèce qui gagne ces électrons ?
3. Les nombres d’oxydation changent-ils ?

Si la réponse est oui, c’est une réaction redox.
```


## u10: Final summary recap of essential redox definitions and relationships

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All summarized relationships are factually correct.",
    "errors": []
  }
}
```

```text
## À retenir absolument

\[
\boxed{\text{Oxydation = perte d’électrons}}
\]

\[
\boxed{\text{Réduction = gain d’électrons}}
\]

\[
\boxed{\text{Réducteur = donne des électrons = s’oxyde}}
\]

\[
\boxed{\text{Oxydant = capte des électrons = se réduit}}
\]

Une réaction d’oxydoréduction est donc toujours un **échange d’électrons entre un réducteur et un oxydant**.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The callout '> Astuce à retenir : Oxydation = perte d’électrons / Réduction = gain d’électrons' could be split as a STUDY_SUPPORT (recap) unit rather than kept within the introductory CONCEPT unit.",
    "proposed_resolution": "Kept inside u1 because it directly restates the definitions given immediately above within the same introductory teaching episode, following the guideline to prefer keeping uncertain splits together."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "The closing warning in section 4 ('Attention : dans une réaction donnée, une espèce joue un rôle précis...') could be classified as a separate CAVEAT (qualification).",
    "proposed_resolution": "Kept within u4 because it serves as a brief qualification directly tied to applying the concept of redox couples in concrete reactions rather than an independently developed caveat."
  }
]
```

## Unassigned text for coverage review

```text
# Réactions d’oxydoréduction (ou « redox »)


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---

## 6. Exemples de réactions redox dans la vie quotidienne


```

```text


---


```

```text


---


```
