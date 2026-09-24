# Explanation annotation codebook

Version: 0.2 - proposed boundary refinements implemented in the pilot prompts; not yet validated by a new annotation run.

## 1. Purpose and scope

Describe **what an explanation covers, how it teaches it, and how it presents it**.
This scheme supports comparisons across models, topics and prompt conditions. It
does not equate more categories, longer answers, or more equations with higher quality.
Correctness, language quality and learning effectiveness require separate evaluations.

The unit of analysis is one saved explanation. Annotate its English evaluation text:
the unchanged original for English responses, or the saved English translation for
Tamil responses. Preserve links and hashes for both original and evaluation text.
Consult the original when a translation is ambiguous, and flag the issue. Do not
silently edit the translation while annotating. Assess Tamil fluency on the original,
not on its English translation.

The existing extraction module produces response-level subtopics and examples. This
scheme adds passage-level annotation. Existing inventories are candidate annotations,
not automatically validated annotations under this codebook.

## 2. Annotation layers

| Layer | Question | Representation |
|---|---|---|
| Teaching function | What is this passage doing for the learner? | One primary label; optional secondary labels |
| Presentation format | How is it expressed? | One or more format labels |
| Subtopic | What scientific content does it concern? | Response-local subtopic IDs, later mapped to a topic codebook |
| Content instance | Is this part of one example, procedure, analogy or question? | Shared instance ID across related passages |
| Relations | How do passages connect? | For example, answers, illustrates, recaps, or qualifies |
| Review flags | Where is interpretation uncertain? | Flags and a short rationale |

An equation is a format, not necessarily a separate teaching function. A worked
example may occupy several passages and include several equations. Count the example
once using its instance ID.

## 3. Passage boundaries

Use the **smallest self-contained passage with a coherent teaching function**.

1. Start with sentences, list items, table rows and standalone equations.
2. Split a sentence at a clause boundary only when the clauses clearly serve different
   functions and each remains interpretable. Do not split every scientific claim.
3. Keep closely dependent sentences together when splitting would make the function
   unclear. There is no fixed word limit.
4. Keep an equation with the sentence immediately explaining it when they jointly
   express one step. A standalone equation can be its own passage.
5. Treat a table header as a structural passage and each data row as a candidate
   content passage. Retain table structure through a shared block ID.
6. Treat headings as structural unless they assert content. “Oxidation” is structural;
   “Oxidation means electron loss” is a definition.
7. Use ordered, non-overlapping contiguous spans. Every non-whitespace character in
   the evaluation text belongs to a span. Markdown delimiters belong to their block;
   standalone separators are structural. Whitespace between spans can be unassigned.
8. Preserve the exact source text. Store start-inclusive/end-exclusive offsets in
   Unicode code points, using Python string indexing. Do not calculate offsets on
   normalized, translated-again or Markdown-stripped text.

A span can have multiple teaching functions, but choose one primary function. Split
separable functions first; use secondary labels only when functions remain intertwined.
An instance may link multiple spans; it is not an overlapping span itself.

## 4. Teaching-function labels

Examples below are invented coding illustrations, not gold-standard chemistry answers.

### DEF — Definition

States the meaning or identifying criterion of a term.

- Include: “Oxidation is loss of electrons.”
- Include: “Covalent radius is half the internuclear distance between identical
  single-bonded atoms.”
- Exclude: explanations of why a trend occurs; label those CONCEPT.
- Exclude: a bare heading or term with no definition.

### CONCEPT — Concept explanation or factual description

Presents scientific properties, relationships, classifications, mechanisms or reasons.
This includes descriptive scientific content that does not explain why; record depth
as an attribute rather than forcing it into another category.

- Include: “Group 2 atoms have two outer-shell electrons.”
- Include: “Radius increases down a group because additional electron shells are occupied.”
- Include: a scientific comparison of two substances or processes.
- Exclude: a meaning statement that is primarily a definition.
- Attribute `depth`: `descriptive` or `explanatory`. Explanatory requires an explicit
  relationship, mechanism or reason; length and the word “because” are insufficient.

### ILLUSTRATION — Illustrative example

A concrete instance used to instantiate a concept, without a demonstrated solution.

- Include: “In Cl2, the Cl–Cl bond provides a way to estimate chlorine's covalent radius.”
- Include: a named reaction used as an instance of redox.
- Exclude: a calculation with given values and shown reasoning; use WORKED.
- Exclude: a real-world application as the main purpose; use REALWORLD.
- Do not automatically label every element name, formula or list member as an example.
  Its role must be to illustrate a broader concept.

### WORKED — Worked example

Demonstrates solving a specific problem or deriving an answer from a concrete setup.
Requires **a task or givens, a reasoning/transformation step, and an answer or conclusion**.
One meaningful step is sufficient; a numerical calculation is not required.

- Include: “The bond length is 198 pm. Radius = 198/2 = 99 pm.”
- Include: identifying oxidation and reduction in a given reaction by tracking changes
  in oxidation numbers and explaining the classifications.
- Exclude: a reaction equation alone or a table of final values with no reasoning.
- Link setup, steps and answer with one instance ID when they occupy separate spans.
- Attribute `solution_status`: `complete` or `partial`. A partial worked example must
  still show reasoning; an unanswered task is PRACTICE.
- Attributes: `step_role` = `setup`, `reasoning`, `answer`, or `combined`.

### REALWORLD — Real-world example or application

Connects the concept to an actual phenomenon, process, use or practical context.

- Include: rusting, batteries, metallurgy, uses of specific compounds.
- Include: an industrial process explained as a practical instance of a general principle.
- Exclude: “This is important in daily life” without naming a context.
- Exclude: an invented comparison such as passing a ball; use ANALOGY.
- Attribute `context_detail`: `named_only`, `described`, or `mechanism_linked`.
- Named contexts can be separate instances even within one span (“batteries and rusting”).
  They should not receive the same depth credit as developed examples.

### ANALOGY — Analogy or explanatory comparison

Uses a different domain or a simplified familiar situation to explain the target concept.

- Include: electron transfer compared with passing a ball.
- Include: atomic boundaries compared with a fuzzy cloud.
- Exclude: comparing magnesium with calcium; that is a scientific comparison, CONCEPT.
- Attributes: `source_domain`, `target_concept`, `mapping_explicit` (boolean),
  `limitations_stated` (boolean).
- A story that only entertains or motivates is not an analogy unless a mapping is made.

### PROCEDURE — Procedure or method

Provides a general sequence of actions to solve, identify, calculate or carry out something.

- Include: steps for assigning oxidation numbers or balancing a redox reaction.
- Include: instructions for conducting a purification method.
- Exclude: a numbered list of unrelated properties.
- Exclude: a causal sequence describing what happens naturally without instructing an
  action; ordinarily CONCEPT.
- A procedure applied to a particular problem is WORKED as primary, PROCEDURE as
  secondary only if the transferable method is also made explicit.

### CAVEAT — Misconception, qualification or exception

Explicitly warns against a mistaken interpretation or limits a rule's scope.

- Include: “The oxidising agent is itself reduced, not oxidised.”
- Include: a stated exception to a general reactivity trend.
- Include: “This method works only when a suitable volatile compound can form.”
- Exclude: a fact the annotator considers surprising without a textual contrast or limit.
- Attribute `kind`: `misconception`, `exception`, `limitation`, or `qualification`.

### STUDY_TIP — Study or memory support

Offers a strategy for remembering, revising, recognizing or approaching assessment.

- Include: OIL RIG, an acronym, an exam-recognition shortcut, a retrieval-practice suggestion.
- Exclude: a summary merely labelled “Remember”; classify by what it does.
- Exclude: a general chemistry-solving procedure unless an explicit study strategy is added.
- Attribute `kind`: `mnemonic`, `memory_association`, `exam_strategy`, or `study_strategy`.

### PRACTICE — Practice question or comprehension check

Invites the learner to recall, explain, calculate, predict or apply content.

- Include: “Which species is oxidised in this reaction?”
- Exclude: “Would you like another example?” or “Do you have questions?”; use SOCIAL.
- Exclude: a rhetorical question used as a heading and immediately explained without
  inviting learner effort. Label the question STRUCTURAL or CONCEPT as appropriate.
- Attribute `response_provided`: `none`, `answer_only`, or `worked_solution`.
- Link the question to its answer with `answered_by`; do not count the question and
  solution as two independent example instances.

### RECAP — Summary or recap

Restates material already presented in this response for consolidation.

- Include: a final table repeating earlier definitions and relationships.
- Exclude: new material appearing under a “Summary” heading; code its actual function.
- RECAP is primary when consolidation dominates; DEF or CONCEPT can be secondary.
- Link to earlier spans using `recaps` where practical.

### SOCIAL — Social, motivational or conversational content

Greetings, encouragement, classroom framing, offers of further help and sign-offs.

- Include: “Welcome to chemistry class”; “Feel free to ask questions.”
- Retain this category to measure non-instructional material without forcing it into
  concept explanation. Do not automatically treat friendliness as a quality defect.

### STRUCTURAL — Structural content

Non-assertive headings, table headers, labels and separators that organize the response.
Exclude headings that themselves define or assert scientific content.

### OTHER — Unclassified content

Use only when no defined label fits. A rationale and review flag are mandatory.
Frequent use indicates the codebook needs revision; do not use it to avoid a difficult decision.

## 5. Presentation formats

Assign all formats visibly present in a span:

| Format | Rule |
|---|---|
| `prose` | Natural-language sentences or fragments |
| `equation` | A mathematical/chemical relation, transformation or calculation |
| `list` | An item in a numbered or bulleted structure |
| `table` | A table header or row |
| `diagram` | An actual diagram or meaningful ASCII schematic |
| `heading` | A heading or title |
| `separator` | A structural divider |

An isolated formula such as H2O or Ni(CO)4 is not an equation. An arrow reaction,
half-equation or r = d/2 is an equation. A request to imagine a diagram is not a diagram.
Equation attributes: `kind` = `chemical_reaction`, `half_equation`, `mathematical_relation`,
or `calculation`; `role` = `general_rule`, `example`, `worked_step`, or `recap`.
These attributes describe use, not whether the equation is correct or balanced.

## 6. Subtopics, examples and repeated content

Maintain a response-local subtopic inventory with specific, content-bearing labels,
such as “electron-loss definition of oxidation” or “oxidising-agent identification”.
Avoid labels such as “basics”, “introduction” or “examples”. Do not infer absent content.

For comparisons, build a separate, reviewed topic codebook and map local labels to it.
Freeze that codebook before full annotation; retain `unmapped` for genuinely new content.
Do not use raw differences in judge-generated label counts as evidence of better coverage.

One instance can link several spans and several subtopics. Merge repeated uses of the
same concrete example, even when paraphrased. Different numerical values in the same
problem type are different instances but can share a template-family ID. Reuse of one
reaction to explain both oxidation and agent identity remains one example instance with
multiple subtopic links. For counting, distinguish:

- **Occurrence count:** how often a function or example appears.
- **Unique instance count:** distinct examples, analogies, questions or procedures.
- **Unique concept coverage:** distinct reviewed subtopic codes present.

Scientific correctness is orthogonal. An incorrect equation can still be an equation
inside a worked example. Record the claimed content faithfully and use `possible_factual_issue`
as a review flag; a later accuracy module adjudicates it.

## 7. Boundary decisions

| Passage | Primary | Secondary / format | Reason |
|---|---|---|---|
| “Oxidation is loss of electrons.” | DEF | prose | Defines a term |
| “Losing electrons increases the ion's positive charge.” | CONCEPT | prose | Explains a relationship |
| “Zn → Zn²⁺ + 2e⁻” used as an example | ILLUSTRATION | equation | Concrete instance, no shown solution |
| “Zn changes from 0 to +2, so it is oxidised.” in a supplied reaction problem | WORKED | prose | Applies a rule to givens; no additional general explanation |
| “Batteries use redox reactions.” | REALWORLD | prose; named_only | Names an application |
| “Think of electron transfer as passing a ball.” | ANALOGY | prose | Cross-domain comparison |
| “OIL RIG: Oxidation Is Loss, Reduction Is Gain.” | STUDY_TIP | DEF; prose | Explicit mnemonic |
| “Remember: oxidation is loss of electrons.” at the end | RECAP | DEF; prose | Repeats prior content, no new memory strategy |
| “Would you like a practice problem?” | SOCIAL | prose | Offers practice but does not supply a question |

Avoid a global label-priority ladder. Decide from the local communicative purpose.
For example, an industrial process may be REALWORLD when illustrating vapour refining,
but CONCEPT when the requested topic is that very process. Record the topic and context.

## 8. Proposed data contract

This is a specification for a future annotation module, not the current extractor's schema.

Each record contains:

- `schema_version`, `source_job_id`, `original_path`, `original_sha256`.
- `evaluation_text_path`, `evaluation_text_sha256`, `translation_record_path` (nullable).
- `annotator`: type (`human` or `llm`), ID/model, prompt version, timestamp.
- `subtopics`: local IDs, labels, optional reviewed topic-codebook mappings.
- `spans`: IDs, exact text and offsets, primary/secondary functions, formats,
  subtopic IDs, instance IDs, block IDs, label-specific attributes, review flags.
- `instances`: IDs, kind, short description, participating span IDs and subtopic IDs.
- `relations`: source ID, relation type and target ID.
- `review`: status (`unreviewed`, `reviewed`, `adjudicated`), reviewer and notes.

For the complete text `Oxidation is loss of electrons.` an illustrative span is:

```json
{
  "id": "p1",
  "start": 0,
  "end": 31,
  "text": "Oxidation is loss of electrons.",
  "primary_function": "DEF",
  "secondary_functions": [],
  "formats": ["prose"],
  "subtopic_ids": ["s1"],
  "instance_ids": [],
  "block_id": "b1",
  "attributes": {},
  "review_flags": []
}
```

Required validation:

1. `evaluation_text[start:end] == span.text`; spans are ordered and non-overlapping.
2. All non-whitespace source characters are accounted for.
3. IDs and labels are valid; all referenced subtopics, blocks and instances exist.
4. Primary function is not repeated among secondary functions.
5. Label-specific attributes follow the definitions above.
6. Content instances link to actual supporting spans; no invented evidence.
7. Source and evaluation hashes match the files being annotated.

Have code compute exact offsets from proposed quotes/segments and verify them. Do not
trust LLM-generated character arithmetic. Repeated identical text requires occurrence
disambiguation using document order or block identity.

## 9. Pilot and adjudication workflow

1. Begin with the 15 redox explanations: all five models and all three conditions.
2. Use two independent annotators. Hide model identity; retain necessary topic context.
3. First compare segmentation. Resolve ambiguous boundary rules before interpreting
   label agreement. Retain both independent annotations and adjudicated versions.
4. On agreed or matched spans, report primary-label agreement, a confusion matrix,
   and a chance-adjusted agreement statistic. Measure secondary labels with set-based
   agreement. Do not conflate boundary disagreement with category disagreement.
5. Compare unique example counts and merging decisions separately from span labels.
6. Review examples from the other three topics before freezing version 1.0, so the
   codebook is not tailored only to redox. Reannotate pilot items affected by revisions.
7. Evaluate an LLM annotator against the human-reviewed pilot before scaling it up.
   Exact evidence validation establishes textual support, not correct categorization.

Suggested review flags: `ambiguous_function`, `unclear_boundary`, `translation_issue`,
`possible_factual_issue`, `uncertain_instance_merge`, `unmapped_subtopic`, `other_content`.
Annotator confidence can be recorded as high/medium/low but is not a calibrated probability.

## 10. Comparisons enabled by this scheme

- Presence/absence of each teaching function per response.
- Unique illustrative, worked and real-world example counts, reported separately.
- Fraction of examples that show reasoning; fraction of questions with worked solutions.
- Number of reviewed subtopics with definitions, mechanisms, examples or caveats.
- Function-specific text allocation, using non-overlapping primary labels.
- Equation occurrence and unique equation counts, split by role.
- Repeated/recap content versus new content; social/structural content separately.
- Topic-matched differences between English-to-English, Tamil-to-Tamil and English-to-Tamil.

For word-based allocations, assign each counted token to one primary span using an
explicit boundary rule. Secondary-label percentages can overlap and must not be summed
as a composition. Do not compare raw English/Tamil word counts as equivalent teaching
amounts. Translated-text lengths also reflect translation decisions.

Report category coverage and depth alongside a separate accuracy assessment. A response
need not contain every function to be effective: the appropriate mix depends on the topic
and learner. No overall quality score or category weights are defined by this scheme.


## 11. Version 0.2 boundary refinements

These refinements supersede broader interpretations of the examples above. They
were motivated by the redox language-comparison pilot and need validation on other
examples/topics; previous annotations are not automatically recoded.

### Worked reasoning versus secondary concept explanation

Using a concept is not a separate teaching function by itself. A specific
classification, calculation or identification step is WORKED without secondary
CONCEPT unless that same passage also explicitly states a general principle,
relationship or mechanism beyond the particular answer. Annotators must identify
the additional clause in their rationale. Do not attach `depth` unless CONCEPT is
actually assigned. This is a convention for reliable content coding, not a claim
that worked examples have no conceptual teaching value.

- "Zn changes from 0 to +2, so it is oxidised": WORKED only.
- The same statement followed by "In general, an increase in oxidation number
  identifies oxidation": WORKED plus CONCEPT (the added general statement).

### Definition versus relationship

An identifying criterion is DEF. A relationship or property is CONCEPT. Explaining
the origin of a name does not by itself turn a relational assertion into a definition.
Thus a passage asserting that oxidation and reduction always occur together and
explaining the name redox is CONCEPT; "A redox reaction is a reaction involving both
oxidation and reduction" is DEF. A passage containing a genuine definition and a
separate relationship may receive both, supported by distinct clauses. For mixed
passages with no clear main assertion, flag ambiguity instead of forcing certainty.

### Example and subtopic grouping

Use one instance for explicitly connected half-reactions and their full reaction,
including later agent identification for the same chemical event. Matching
reactant/product pairs and text can support the connection; a spectator ion or a
net-ionic representation alone is not a new example. Shared elements or topic alone
are insufficient to merge unrelated reactions. Different givens or independent tasks
can remain distinct. Retain separate instances and flag uncertain_instance_merge if
the connection is unclear.

Do not invent an additional broad "identification" subtopic merely because examples
apply existing oxidation-number or electron-transfer criteria. An additional method
must actually be taught to warrant a separate subtopic.

The current second-pass reviewer can propose function-label changes only. It must
flag grouping issues as unresolved rather than silently altering instance identities
or subtopic inventories. Apply all rules equally to Tamil and English.
