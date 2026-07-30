# Tutor comparison page

A turn-aligned view of the simulated conversations: pick a topic, pick any set of tutor models and
languages, and read the columns side by side against a shared turn number. It exists to answer
"does this tutor behave differently from that one, and does either behave differently in Tamil or
Mandarin than in English" by eye, before anything gets scored.

## Rebuilding

```
python viz/tutor_comparison/build.py
```

Writes `tutor_comparison.html` in this directory. No dependencies beyond the standard library, and
no build step for the page itself - the HTML is self-contained, with the CSS, the JavaScript and
the whole dataset inlined, so it opens from the filesystem and can be attached to an email.

Run it from anywhere; paths resolve from the file's own location, not the working directory.

## The three files

| File | What it is |
|---|---|
| `template.html` | The page. Everything visual lives here. `__DATA__` is where the dataset lands. |
| `extract.py` | Reads `runs/` and produces the dataset - which cells exist, the turns, the length stats. |
| `build.py` | Runs the extract, checks the template, inlines the result. |

`tutor_comparison.html` is generated. Edit the template, never the output.

## Editing the page

Everything the page draws comes from the `DATA` object, so most changes are CSS or the render
functions near the bottom of `template.html`. Two things to know before changing it:

**Theme tokens come in fours.** The palette is defined in `:root`, again under
`@media (prefers-color-scheme: dark)`, and again under `:root[data-theme="dark"]` and
`:root[data-theme="light"]`. The last two are what the viewer's own theme toggle sets, and they
have to win over the media query in both directions. Add a colour to one block and you must add it
to all four - `build.py` asserts this for the bubble tokens and will stop you.

**Style through the tokens.** Put `var(--bub-tutor)` on the rule and define the value in the theme
blocks. A colour written directly into a component only works in whichever theme you were looking
at when you wrote it.

## Adding a topic, model or language

`extract.py` has three tables at the top: `MODELS`, `LANGS`, `TOPICS`. Add a row and rebuild. A
topic with no finished runs still appears in the dropdown, disabled and labelled "(no runs yet)",
so the intended scope of a campaign stays visible while it fills in.

Cell ids differ by where a run came from, which is why `TOPICS` carries a directory and a flag.
`tree-mass` was run first, from `data/run_set_tutors.json` into `runs/tutors`, with ids like
`sonnet-en`. The other three came from `data/run_set_topics.json` into `runs/topics`, with the
topic in the id: `gravity-sonnet-en`. The flag says which shape to expect.

## Two measurement decisions worth knowing about

**Length is counted in characters for Mandarin, words for English and Tamil.** Chinese is written
without spaces, so `text.split()` returns one token for an entire sentence - the first version of
this page reported the Mandarin tutors at "1.0 words per turn", which measured the absence of
spaces and nothing else. The unit is labelled in the stats table (`w` or `c`) because this makes
lengths comparable *within* a language and not *across* one. Do not read the Mandarin column
against the English one.

**A run counts as finished only if its transcript contains a `session_end` record.** Testing that
the file exists is not enough: a run killed part way leaves a partial transcript that passes an
existence check and would quietly show up as a short conversation.

## Publishing

The page is also published as an artifact at
<https://claude.ai/code/artifact/2e15d3cb-0623-4707-8ff4-f4c01faf2192>. That copy is a snapshot -
rebuilding here does not update it. Republishing needs the artifact's owner.
