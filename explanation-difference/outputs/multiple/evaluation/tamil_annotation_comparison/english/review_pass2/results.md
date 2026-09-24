# Second-pass annotation review

Gemini-3.8-flash reviewed 45 passages; proposed 5 passage revisions.

**Proposals, not adjudicated corrections.** Source text, segmentation, subtopics and instance links are unchanged.

[First-pass report](../results.md) | [Review prompt](prompt.md) | [Proposed annotations](annotations_proposed.json) | [Full change log](changes.json)

| Passage | Source text | Before: primary / secondary | Proposed: primary / secondary | Reason |
|---|---|---|---|---|
| p4 | **Oxidation** and **Reduction** always happen together. One does not happen without the other - that is why we call this **&quot;Redox&quot;** (Reduction + Oxidation). | DEF / CONCEPT | DEF /  | The primary function is DEF; the &#x27;depth&#x27; attribute applies to CONCEPT and is invalid on DEF without independent explanatory development. |
| p13 | Here Mg undergoes oxidation (O is added) | WORKED / CONCEPT | WORKED /  | The primary function is WORKED; &#x27;depth&#x27; belongs to CONCEPT and is invalid as a WORKED attribute. |
| p17 | **Easy way to remember - &quot;OIL RIG&quot;** | STUDY_TIP /  | STUDY_TIP /  | Remove invalid attribute &#x27;tip_kind&#x27; from STUDY_TIP passage. |
| p18 | - **O**xidation **I**s **L**oss (Oxidation = loss) | STUDY_TIP / DEF | STUDY_TIP / DEF | Remove invalid attribute &#x27;tip_kind&#x27; from STUDY_TIP passage. |
| p19 | - **R**eduction **I**s **G**ain (Reduction = gain) | STUDY_TIP / DEF | STUDY_TIP / DEF | Remove invalid attribute &#x27;tip_kind&#x27; from STUDY_TIP passage. |

## Unresolved issues

None flagged by the reviewer. This does not establish that every label is correct.
