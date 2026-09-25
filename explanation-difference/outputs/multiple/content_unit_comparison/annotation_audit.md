# Content-unit annotation audit

## Scope

Read source text and nested annotations for eight responses: GPT isotope in English, French-English, French-native, Tamil-English and Tamil-native; Claude redox in English, French-English and Tamil-English. Seven are on-topic. Tamil-native isotope is about endemic species and was excluded from the comparison. This is a small purposive spot check, not a blinded bilingual reliability study. No annotations were changed and no new API calls were made.

## Findings

1. **Mnemonic boundary inconsistency.** [English redox](../ch-4_redox_reactions/english/evaluation/claude-sonnet-5__83e2a3b51afc/results.md) gives OIL/RIG its own STUDY_SUPPORT unit u4 (p9, p12, p13). [Tamil redox](../ch-4_redox_reactions/tamil-english/evaluation/claude-sonnet-5__24ffc2a278c9/results.md) labels OIL and RIG passages p9/p12 STUDY_SUPPORT but embeds them in CONCEPT u2. It separately counts LEO/GER as u3. Extracting OIL/RIG together would add one study-support unit in Tamil. This is a proposed correction, not an applied edit.

2. **Comparable calculation, different classification.** [French-English isotope](../ch-1_isotope/french-english/evaluation/gpt-5.6-terra__18b7401bcb47/results.md) places the carbon-14 calculation, 6 protons + 8 neutrons = 14 (p17-p20), in CONCEPT u3 alongside a general rule and notation. [French-native isotope](../ch-1_isotope/french-native/evaluation/gpt-5.6-terra__c5e8f9a3704d/results.md) places the equivalent calculation (p25-p28) and notation in EXAMPLE/worked u3. Context differs, but the treatment of specific calculations needs a consistent rule. Moving the calculation into an existing example versus creating a new unit has different effects on total count; do not duplicate the example.

3. **Same application counted separately or embedded.** [Tamil-English isotope](../ch-1_isotope/tamil-english/evaluation/gpt-5.6-terra__e828bdcb8870/results.md) counts carbon-14 dating as EXAMPLE u8 (p57-p58). [French-native isotope](../ch-1_isotope/french-native/evaluation/gpt-5.6-terra__c5e8f9a3704d/results.md) labels dating passage p46 EXAMPLE but embeds it in CONCEPT u5. [English isotope](../ch-1_isotope/english/evaluation/gpt-5.6-terra__151e5ec4ca87/results.md) combines stability, radioactivity and dating in p13/u3. Example-unit counts therefore do not count all applications present. Clarify when an application is independently countable.

4. **Fixed passages can prevent correct splitting.** [French redox](../ch-4_redox_reactions/french-english/evaluation/claude-sonnet-5__2e5db42cd5aa/results.md) combines photosynthesis and cellular respiration in one bullet, p41, and one EXAMPLE u9. The prompt demands separate units for distinct phenomena but also assigns each supplied passage exactly once, with no splitting. That representation cannot express two units for these two phenomena. Allow source-preserving sub-passages or smaller spans before grouping.

5. **Short examples absorbed into concepts.** [French redox](../ch-4_redox_reactions/french-english/evaluation/claude-sonnet-5__2e5db42cd5aa/results.md) u4 contains example-labelled p15-p17 (Cu2+/Cu, Fe3+/Fe2+, H+/H2), yet contributes no EXAMPLE units. These could be supporting instances of notation, but the instruction to count distinct short examples separately leaves the boundary ambiguous.

## Corpus-wide screening

Across 368 on-topic responses there are 3088 units. 132 non-EXAMPLE units contain EXAMPLE passages; 11 non-STUDY_SUPPORT units contain STUDY_SUPPORT passages. Mixed roles are allowed, so these are candidates for review, not an annotation error rate. This screening also misses examples whose passages were themselves mislabelled CONCEPT.

[Candidate inventory](annotation_audit_candidates.json)

## Interpretation

There are concrete boundary inconsistencies and a segmentation constraint that can affect counts. The audit does not establish a systematic language bias or explain the whole word-count versus unit-count result. These generated responses are not parallel translations, so genuine differences in content also exist.

Counts currently measure annotated containers and their dominant kinds, not every embedded example or mnemonic. Counting passages instead is not a solution: one worked example can span many passages.

Specify consistent rules for independent examples/mnemonics, concept granularity and multi-function source passages. Adjudicate a small cross-language set, then rerun it under a versioned prompt while retaining the original annotations. Independent bilingual review is needed to estimate reliability. More units need not imply higher quality; corrections need not make differences statistically significant.
