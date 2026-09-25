# Stage 1: English / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "Vapour phase refining in metallurgy (principles, requirements, Mond's process, and Van Arkel method)",
  "topic_match": "on_topic",
  "reason": "The explanation directly covers vapour phase refining, including its definition, underlying criteria, the general two-step mechanism, and the two standard high-school examples (Mond's process and the Van Arkel method).",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Gold coins turning into ghosts analogy for vapour phase refining | {} | accurate |
| u2 | CONCEPT | Principles, requirements, and general two-step mechanism of vapour phase refining | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Mond's process for nickel refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | EXAMPLE | Van Arkel-de Boer method for zirconium and titanium refining | {"context": "real_world", "treatment": "worked"} | accurate |
| u5 | STUDY_SUPPORT | Quick summary of vapour phase refining and its two main processes | {"subtype": "recap"} | accurate |
| u6 | STUDY_SUPPORT | Self-test practice prompt for titanium refining | {"subtype": "practice_question"} | accurate |

## u1: Gold coins turning into ghosts analogy for vapour phase refining

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy clearly maps the selective volatilization of the desired metal and its subsequent re-deposition away from solid impurities.",
    "errors": []
  }
}
```

```text
Imagine you have a bucket of gold coins mixed with wet mud and rocks. It’s hard to pick the mud off every single coin. 

Now, imagine you had a magic whistle that could turn *only* the gold coins into invisible ghosts that float up into the air, leaving the mud and rocks sitting at the bottom of the bucket. Then, in another room, you blow a second whistle that turns the ghosts back into solid, shiny, clean gold coins.

That is **exactly** what Vapour Phase Refining does.
```


## u2: Principles, requirements, and general two-step mechanism of vapour phase refining

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
    "reason": "The conditions required for vapour phase refining and the two-step general mechanism are described correctly.",
    "errors": []
  }
}
```

```text
In simple terms: **It is a method where an impure metal is converted into a gas (vapour), separated from its impurities, and then broken down again to get the pure metal.**

This is used when we need metals with **ultra-high purity** (for things like space technology or electronics).

---

### The Two Golden Rules
To use this method, the metal must follow two strict rules:
1. **Easy to turn into gas:** The metal must easily react with a chemical at a relatively low temperature to form a **volatile compound** (a compound that turns into a gas easily).
2. **Easy to break down:** That gas must easily decompose (break apart) at a higher temperature to give back the pure metal.

*(Crucially: The impurities mixed with the metal must **not** react, so they stay behind as solids).*

---

### The 2-Step Process

#### **Step 1: Formation of the Volatile Compound**
We take the impure metal and react it with a specific chemical reagent at a lower temperature. The metal combines with this chemical and turns into a gas. The impurities don't react and are left behind.
$$\text{Impure Metal (Solid)} + \text{Reagent} \xrightarrow{\text{Lower Temp}} \text{Metal-Compound (Gas)}$$

#### **Step 2: Decomposition (Breaking it down)**
We collect that gas, move it to another chamber, and heat it to a much higher temperature. The compound breaks apart: the pure metal deposits as a solid, and the reagent gas flies away (and can be reused!).
$$\text{Metal-Compound (Gas)} \xrightarrow{\text{Higher Temp}} \text{Pure Metal (Solid)} + \text{Reagent}$$
```


## u3: Mond's process for nickel refining

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The reaction temperatures, reagents, chemical equations, and intermediate complex (nickel tetracarbonyl) are accurately stated.",
    "errors": []
  }
}
```

```text
#### 1. Mond’s Process (Used to purify **Nickel**)
*   **The Trick:** Nickel reacts with **Carbon Monoxide ($\text{CO}$)** gas.
*   **Step 1:** Impure Nickel is heated with $\text{CO}$ at about $50^\circ\text{C} - 70^\circ\text{C}$ ($330 - 350\text{ K}$). It forms a gas called *Nickel tetracarbonyl*. Impurities are left behind.
    $$\text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 \text{ (Gas)}$$
*   **Step 2:** This gas is then heated to a higher temperature ($200^\circ\text{C}$ or $\approx 450 - 470\text{ K}$). It breaks apart, giving pure solid Nickel and releasing the $\text{CO}$ gas.
    $$\text{Ni(CO)}_4 \rightarrow \text{Ni (Pure Solid)} + 4\text{CO}$$
```


## u4: Van Arkel-de Boer method for zirconium and titanium refining

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The reaction of zirconium with iodine to yield ZrI4 and its thermal decomposition on a hot tungsten filament at ~1800 K are accurately described.",
    "errors": []
  }
}
```

```text
#### 2. Van Arkel-de Boer Method (Used for **Zirconium** or **Titanium**)
*   **The Trick:** These metals react with **Iodine ($\text{I}_2$)**. This is used for metals used in the aerospace industry where even tiny impurities cause brittleness.
*   **Step 1:** Impure Titanium or Zirconium is heated with Iodine in a vacuum to form a volatile iodide gas.
    $$\text{Zr} + 2\text{I}_2 \rightarrow \text{ZrI}_4 \text{ (Gas)}$$
*   **Step 2:** The gas is passed over an extremely hot **tungsten filament** (around $1800\text{ K}$). The intense heat breaks the gas apart. Pure metal sticks to the wire, and iodine vapour is recycled.
    $$\text{ZrI}_4 \xrightarrow{\text{Hot Tungsten Wire}} \text{Zr (Pure Solid)} + 2\text{I}_2$$
```


## u5: Quick summary of vapour phase refining and its two main processes

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
    "reason": "The recap accurately condenses the core purpose, pathway, and key examples of vapour phase refining.",
    "errors": []
  }
}
```

```text
*   **Why do it?** To get ultra-pure metal.
*   **How?** Turn solid metal $\rightarrow$ gas compound $\rightarrow$ back to pure solid metal.
*   **Mond Process** = Nickel ($\text{Ni}$) using Carbon Monoxide.
*   **Van Arkel Process** = Zirconium ($\text{Zr}$) or Titanium ($\text{Ti}$) using Iodine.
```


## u6: Self-test practice prompt for titanium refining

```json
{
  "attributes": {
    "subtype": "practice_question"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The prompt poses a standard practice task directly relevant to the topic.",
    "errors": []
  }
}
```

```text
Would you like to try writing out the steps for Titanium using the Van Arkel method to test yourself?
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Whether 'The 2-Step Process' should be split off as a PROCEDURE unit rather than combined with the definition and rules under CONCEPT.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because the two-step breakdown explains how vapour phase refining functions generally, directly illustrating the two rules stated immediately before it, following the rule to keep uncertain splits within one teaching episode together."
  },
  {
    "unit_ids": [
      "u5",
      "u6"
    ],
    "issue": "Whether the summary bullet list and the concluding question should be merged into a single study support unit.",
    "proposed_resolution": "Separated into two units because they perform distinct study-support roles with differing required subtypes: u5 is a recap of taught facts, whereas u6 is a practice prompt for the student."
  }
]
```

## Unassigned text for coverage review

```text
Hello! Welcome to our chemistry session. Today, we are going to look at a very clever technique used in metallurgy called **Vapour Phase Refining**. 

Don't let the fancy name intimidate you. By the end of this, you’ll see it’s just a smart, two-step trick to get extremely pure metals!

---

### The Big Idea: An Analogy First

```

```text
 

---

### What is Vapour Phase Refining?

```

```text


---

### Two Classic High School Examples (Must-Know for Exams!)

You will usually see two specific processes on your exams:


```

```text


---

### Quick Summary to Remember:

```

```text


Does this make sense? 
```
