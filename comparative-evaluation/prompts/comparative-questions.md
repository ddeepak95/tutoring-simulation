# Comparative questions for instructional explanations

## Instructions

Choose **A is better**, **B is better**, or **Tie / equally good** for each question independently. Evaluate each tutor response using its own preceding learner context. Use the original language to assess wording; translations may support interpretation. Compare instructional usefulness, not length or the number of examples. Do not infer actual learning solely from the explanation.

The first tutor turn uses five questions. Follow-up turns first ask about the student's follow-up, then repeat all five first-turn questions. After all tutor turns have been rated and saved, ask the overall-conversation question. Save it separately from turn ratings; the comparison is complete when the overall answer has been saved.

## First turn

1. Which of the two responses better explains the underlying concept or principle, rather than only presenting facts or steps?
2. Which of the two responses uses instructional features such as examples, analogies, diagrams, and memory aids more effectively to teach the concept?
3. Which of the two responses stays focused and provides a more appropriate amount of information?
4. Which of the two responses gives the learner a better opportunity to demonstrate understanding?
5. Which of the two responses better guides the learner toward useful next steps?

## Follow-up

1. Which of the two responses better addresses the student's follow-up?

Then ask all five first-turn questions in the same order.

## Overall conversation

1. Which of the two conversations overall addressed the learning goal better?

This question appears only after every turn comparison has been saved. Consider the complete conversations, including how each tutor uses learner contributions across turns.

## Portal question definitions

This table is the source for `annotation-portal/scripts/sync-comparison-questions.mjs`. The turn-question keys, labels, and order match `conversation-evaluation/human-annotation/rating-questions.md`; the wording asks annotators to compare A and B. Timing determines display order: **Follow-up turns** precedes **All turns** on later turns; **Overall conversation** is a separate final stage. All questions use A/B/tie choices. The question set is version `instructional-comparison-v5`.

| Key | Label | Comparative question (`description`) | Judging guidance | Timing | Source basis |
| --- | --- | --- | --- | --- | --- |
| `explaining_the_core_principle` | Explaining the Core Principle | Which of the two responses better explains the underlying concept or principle, rather than only presenting facts or steps? | Compare how clearly and accurately each response explains why or how the concept works and connects facts or steps to the principle. | All turns | Current rating question: Explaining the Core Principle. |
| `use_of_instructional_features` | Use of Instructional Features | Which of the two responses uses instructional features such as examples, analogies, diagrams, and memory aids more effectively to teach the concept? | Compare the accuracy and teaching value of features actually shown. A clear explanation without a feature may be equally good when no feature is needed. | All turns | Current rating question: Use of Instructional Features. |
| `focus_and_amount_of_information` | Focus and Amount of Information | Which of the two responses stays focused and provides a more appropriate amount of information? | Prefer essential ideas with enough detail to understand them, without major gaps, digressions, repetition, or overload. Shorter is not automatically better. | All turns | Current rating question: Focus and Amount of Information. |
| `opportunity_to_demonstrate_understanding` | Opportunity to Demonstrate Understanding | Which of the two responses gives the learner a better opportunity to demonstrate understanding? | Compare relevant, concrete questions or tasks that ask the learner to explain, predict, or apply the concept. A generic understanding check gives less evidence. | All turns | Current rating question: Opportunity to Demonstrate Understanding. |
| `guidance_for_next_steps` | Guidance for Next Steps | Which of the two responses better guides the learner toward useful next steps? | Compare how relevant and clear each suggested next concept, practice activity, resource, or action is. Vague or confusing directions are less useful. | All turns | Current rating question: Guidance for Next Steps. |
| `follow_up_responsiveness` | Follow-up Responsiveness | Which of the two responses better addresses the student's follow-up? | Compare how directly and helpfully each tutor responds to its own student's questions, requests, or confusion and adapts to relevant learner information. Do not assume the two student replies are identical. | Follow-up turns | Current rating question: Follow-up Responsiveness. |
| `overall_learning_goal` | Overall Learning Goal | Which of the two conversations overall addressed the learning goal better? | Consider how well the full conversation develops the intended topic and addresses learner needs. Do not equate this preference judgment with measured learning gains. | Overall conversation | Study-specific synthesis informed by S1's explanatory process and S2's goal-sensitive framework. |

## Source basis and versioning

These are study-specific questions informed by the two papers, not a validated scale published in them.

- **S1:** Kulgemeyer, *Towards a framework for effective instructional explanations in science teaching*, DOI: 10.1080/03057267.2018.1598054. The local filename says 2018; the PDF records online publication on 15 April 2019. PDF pages 7-9 describe the core ideas and explanatory process.
- **S2:** Kulgemeyer (2020), *A Framework of Effective Science Explanation Videos Informed by Criteria for Instructional Explanations*, *Research in Science Education*, 50, 2441-2462, DOI: 10.1007/s11165-018-9787-7. Table 2 on PDF page 10 lists the framework's features.

New and active comparisons use this set. Retired questions remain in completed comparison records and revision history for audit purposes, but are hidden from the annotation view. Annotate ratings remain separate. Scientific correctness remains a separate error check, while incorrect explanations or aids can affect the corresponding comparative judgments.
