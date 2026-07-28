# Authoring a misconception library

One JSON file per topic under `data/misconceptions/<topic_id>.json`, carrying the documented
alternative conceptions middle-school students hold about that topic. It is read when a persona is rendered (see [student_personas.md](student_personas.md)) and by nothing else.

This is **authoring, not runtime code** — the procedure below is run once per topic inside Claude
Code. No Python is needed to produce a library.

## Why it is a two-agent procedure

The whole design claims its student personas are grounded in the science-education literature. That
claim is only as good as the citations, and citations are exactly what a language model will invent
most fluently. So the procedure separates the agent that *finds* a misconception from the agent that
*checks the source exists*.

The check happens at authoring time, not at load time: an entry whose source does not resolve is
deleted before the file is committed, so there is nothing for the loader to gate on. What is in the
file is what was verified. Read the file yourself before running a campaign on it — but that is your
judgement, not a flag the code enforces.

A topic without a library cannot be run at all — there is no fallback persona, because a student
whose wrong idea is unspecified is precisely the under-specified student this work replaces.

## Stage 1 — Research

An agent with WebSearch and WebFetch collects documented alternative conceptions for the topic.

Source priority, highest first:

1. **AAAS Project 2061 Science Assessment** — the most valuable source in the set, because its
   distractors are field-tested misconceptions with *measured* selection rates. It is the only
   source type that tells you how common an idea is rather than that it exists.

   **Access note, verified 2026-07-28.** The original host `assessment.aaas.org` is **offline**
   (connection timeout on both HTTP and HTTPS). AAAS transferred the item bank to BSCS, and it is
   live at **`https://assess.bscs.org/science/`** with the same URL structure plus a `/science`
   prefix — `/science/topics/1/ME`, `/science/misconceptions/1/ME/80/MEM123`,
   `/science/items/1/ME/80/ME029006/breakdown:true`. Append `/breakdown:true` to an item URL for the
   per-grade-band response percentages.

   That host serves an **incomplete TLS certificate chain**, so WebFetch refuses it. Retrieve pages
   with `curl -k -s '<url>'` instead. An agent that skips `-k` will report the pages as missing.

   The page markup contains the string "Work in progress - Do not quote, cite, or reproduce", but it
   sits inside an HTML comment and is not rendered — there is no active citation restriction. Two
   agents disagreed about this; it was settled by inspecting the raw markup.
2. **Driver, Squires, Rushworth & Wood-Robinson (1994), *Making Sense of Secondary Science*** — the
   reference work for what students actually believe, organised by topic.
3. Discipline concept inventories (Force Concept Inventory and its relatives).
4. Peer-reviewed studies in JRST, IJSE, *Science Education*, *Journal of Biological Education*.

Teacher-resource sites and textbook blogs are usable **only as a pointer to a primary source** —
chase the citation, cite the primary.

The agent must report, per misconception, the fields in the schema below, plus which URLs it
actually fetched versus only saw in a search-result snippet. Anything it could not source goes in a
separate "unsourced but plausible" list rather than getting a citation attached to it.

## Stage 2 — Verify

**A second agent, which does not see Stage 1's reasoning.** For every entry it fetches every cited
URL and confirms the page resolves and actually states the misconception. A citation is written into
`<topic_id>.sources.md` only on that basis.

An entry with no verified source is **deleted, not downgraded**. A misconception with a broken
citation is indistinguishable from one the model invented, so there is nothing to salvage by keeping
it flagged.

Do not let the Stage 1 agent verify its own sources.

## Schema

```json
{
  "topic_id": "tree-mass",
  "canonical_explanation": "One sentence. What the correct answer actually is.",
  "answer_giveaway_terms": ["carbon dioxide", "photosynthesis", "carbon", "from the air"],
  "misconceptions": [
    {
      "id": "tree-mass.from-the-soil",
      "name": "A tree's mass comes from the soil",
      "belief": "Second person, in the student's own register, no hedging. Reaches the student verbatim.",
      "predicts": "The concrete wrong prediction the belief makes about the world.",
      "changes_only_when": ["you weigh it yourself and have to account for the difference", "you are shown that something you cannot see can register a weight"],
      "slides_into": "The next wrong idea they move to. Free prose. Omit if the literature is silent.",
    }
  ]
}
```

**Citations go in a sibling `data/misconceptions/<topic_id>.sources.md`, not in the JSON.** Nothing
in the code reads them, and a field no code reads belongs in prose where it can carry the prevalence
figures and the caveats that make it worth having. Group it by misconception id — see
[tree-mass.sources.md](../data/misconceptions/tree-mass.sources.md).

### Field notes

**`answer_giveaway_terms` is a blocklist, not a description of the topic.** It is only the terms
whose presence in a persona prompt means the answer has leaked. Do not fill it with *tree*, *mass*,
*soil* — a persona must be free to use those. It cannot be derived from `canonical_explanation`,
because that sentence contains ordinary words too, and deciding which words constitute the answer is
the human judgement this field records.

**`changes_only_when` must not state the correct answer.** "Shown that a gas can be weighed" is
fine. "Told that plants take carbon from the air" is not. This field is written into the persona's
*what changes your mind* section, so a careless entry here leaks the answer into every conversation
the student has. The `no_answer_leak` lint catches the listed terms, but it cannot catch a
paraphrase you invented — write it carefully.

Anything **not** on the list is something the student re-explains away rather than accepts, so there
is no separate "what doesn't work" field.

**`slides_into` is prose, not an id.** Conceptual change usually runs wrong-idea → *different*
wrong-idea → right idea, and this is what makes a slow student slow without the prompt having to say
"be dumb". Making it prose means a topic needs only one entry to be usable.

**Ordering matters.** Every persona for the topic is built on the **first** entry, so put the
best-documented conception there. Later entries are recorded because the research was done; which
conception a run uses is not currently a variable.

**Robustness is deliberately not a field here.** How tenaciously a belief is held is the
`misconception_robustness` trait, fixed by the student level — if the library pinned it per topic,
`struggling` and `advanced` could not differ on the same topic, which would defeat the level design.
The library carries topic facts; `personas/traits.py` carries theory.

## After authoring

```bash
PYTHONPATH=src python -m tutoring_check.personas.cli lint --topic <topic_id>
PYTHONPATH=src python -m tutoring_check.personas.cli show --topic <topic_id> --sections-only
```

`lint` checks the entry for answer leaks and scripted utterances; `show` renders every level so you
can read the fields in the context they will actually appear in. Neither calls a model.

Note that `belief`, `predicts`, `changes_only_when` and `slides_into` reach the student **verbatim**,
so write them in the second person and in a register a middle schooler would use.
