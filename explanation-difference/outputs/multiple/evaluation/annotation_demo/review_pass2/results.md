# Second-pass annotation review

Gemini-3.8-flash reviewed 53 passages; proposed 5 passage revisions.

**Proposals, not adjudicated corrections.** Source text, segmentation, subtopics and instance links are unchanged.

[First-pass report](../results.md) | [Review prompt](prompt.md) | [Proposed annotations](annotations_proposed.json) | [Full change log](changes.json)

| Passage | Source text | Before: primary / secondary | Proposed: primary / secondary | Reason |
|---|---|---|---|---|
| p3 | **Redox** is short for **Red**uction-**Ox**idation. It&#x27;s a type of chemical reaction where **electrons are transferred** between substances. | DEF / CONCEPT | DEF /  | R2 states that secondary CONCEPT should not be added to every definition unless it contains distinct descriptive or explanatory development. The phrase &#x27;electrons are transferred between substances&#x27; provides the core identifying criterion of the term itself. |
| p16 | Consider this reaction: | WORKED /  | STRUCTURAL /  | Under R1, organizational transitions are STRUCTURAL even when linked to a worked example instance. WORKED passages must supply actual givens, reasoning, or an answer. |
| p18 | Let&#x27;s break it down: | WORKED / STRUCTURAL | STRUCTURAL /  | Under R1, procedural/organizational transitions like &#x27;Let&#x27;s break it down:&#x27; serve a structural organizing role and lack the substantive content required for WORKED. |
| p19 | &#124; Substance &#124; What Happens &#124; Electrons &#124; Term &#124; | STRUCTURAL / WORKED | STRUCTURAL /  | Under R1 and R6, column headers are structural and do not provide concrete givens, steps, or answers. Secondary WORKED and its associated step attributes should not be propagated to a table header. |
| p41 | **Example:** | WORKED / STRUCTURAL | STRUCTURAL /  | Under R1, bare labels are STRUCTURAL while retaining instance links. They do not contain givens, reasoning steps, or answers. |

## Unresolved issues

None flagged by the reviewer. This does not establish that every label is correct.
