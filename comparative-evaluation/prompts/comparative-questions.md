# Comparative questions for instructional explanations

## Instructions

Choose **A is better**, **B is better**, or **Tie / equally good** for each question independently. Evaluate each tutor response using its own preceding learner context. Use the original language to assess wording; translations may support interpretation. Compare instructional usefulness, not length or the number of examples. Do not infer actual learning solely from the explanation.

The first tutor turn uses five questions. Follow-up turns first ask about the student's follow-up, then repeat all five first-turn questions. After all tutor turns have been rated and saved, ask the two overall-conversation questions. Save these separately from turn ratings; the comparison is complete only when both overall questions have been saved.

## First turn

1. Which of the two responses better explains the underlying concept or principle, rather than only presenting facts or steps?
2. Which of the two responses better matches a high-school student's understanding level through its content, language, and use of formulas and mathematical notation?
3. Which of the two responses uses examples, analogies, models, or representations more effectively to clarify the concept?
4. Which of the two responses stays focused on the essential ideas while providing the right amount of information for the learner without information overload?
5. Which of the two responses provides a better opportunity for the learner to demonstrate their understanding of the concepts learned?

## Follow-up

1. Which of the two responses better addresses the student's follow-up?

Then ask all five first-turn questions in the same order.

## Overall conversation

1. Which of the two conversations felt more natural and conversational?
2. Which of the two conversations overall addressed the learning goal better?

These questions appear only after every turn comparison has been saved. Consider the complete conversations, including how each tutor uses learner contributions across turns.

## Portal question definitions

This table is the source for `annotation-portal/scripts/sync-comparison-questions.mjs`. Timing determines display order: **Follow-up turns** precedes **All turns** on later turns; **Overall conversation** is a separate final stage. All questions use A/B/tie choices. The user-selected set is version `instructional-comparison-v3`.

| Key | Label | Comparative question (`description`) | Judging guidance | Timing | Source basis |
| --- | --- | --- | --- | --- | --- |
| `principle_focus` | Understanding the Core Principle | Which of the two responses better explains the underlying concept or principle, rather than only presenting facts or steps? | Compare whether the response explains why or how the concept works and connects facts or steps to the underlying principle. | All turns | S1: Core idea 6 and Factor 8; S2: Feature 14. |
| `learner_fit` | Fit for a High-School Student | Which of the two responses better matches a high-school student's understanding level through its content, language, and use of formulas and mathematical notation? | Consider suitable content depth, accessible wording, explained technical terms, and understandable formulas and notation where relevant. Do not reward unnecessary formulas or oversimplification. | All turns | S1: Core ideas 1 and 2; S2: Features 3, 7, and 8. High-school level is the study's chosen target. |
| `explanatory_aids_usefulness` | Usefulness of Explanatory Aids | Which of the two responses uses examples, analogies, models, or representations more effectively to clarify the concept? | Judge the clarity, accuracy, and instructional value of the aids used, not their number. Plain explanation may be sufficient. Judge only representations actually available in the transcript. | All turns | S1: Core idea 2; S2: Features 4, 5, and 6. |
| `focus_and_information_load` | Focus and Amount of Information | Which of the two responses stays focused on the essential ideas while providing the right amount of information for the learner without information overload? | Prefer enough reasoning and detail to understand the concept without digressions, needless repetition, or excessive information. Shorter is not automatically better. | All turns | S1: Core idea 5 and Factor 3; S2: Feature 9. |
| `opportunities_to_demonstrate_understanding` | Demonstrating Understanding | Which of the two responses provides a better opportunity for the learner to demonstrate their understanding of the concepts learned? | Compare questions or tasks that invite the learner to explain, predict, or apply the concept. A generic understanding check gives less evidence than a concrete task. Consider whether a task is appropriate at this point. | All turns | S1: Core idea 7, Factors 5 and 6; S2: Feature 13. |
| `follow_up_responsiveness` | Addressing the Student's Follow-Up | Which of the two responses better addresses the student's follow-up? | Compare how directly and helpfully each tutor responds to its own student's questions, requests, confusion, or demonstrated understanding. Consider adaptation when needed; do not assume the two student replies are identical. | Follow-up turns | S1: explanation-diagnosis-adaptation process, Core ideas 1 and 7. |
| `overall_conversational_naturalness` | Overall Conversational Naturalness | Which of the two conversations felt more natural and conversational? | Consider the full exchange, including flow, wording, and how tutor contributions connect with student contributions. Judge from original wording, not translation polish. | Overall conversation | Study-specific whole-conversation judgment; related to direct address in S2 Feature 12, broader than that paper criterion. |
| `overall_learning_goal` | Overall Learning Goal | Which of the two conversations overall addressed the learning goal better? | Consider how well the full conversation develops the intended topic and addresses learner needs. Do not equate this preference judgment with measured learning gains. | Overall conversation | Study-specific synthesis informed by S1's explanatory process and S2's goal-sensitive framework. |

## Source basis and versioning

These are study-specific questions informed by the two papers, not a validated scale published in them.

- **S1:** Kulgemeyer, *Towards a framework for effective instructional explanations in science teaching*, DOI: 10.1080/03057267.2018.1598054. The local filename says 2018; the PDF records online publication on 15 April 2019. PDF pages 7-9 describe the core ideas and explanatory process.
- **S2:** Kulgemeyer (2020), *A Framework of Effective Science Explanation Videos Informed by Criteria for Instructional Explanations*, *Research in Science Education*, 50, 2441-2462, DOI: 10.1007/s11165-018-9787-7. Table 2 on PDF page 10 lists the framework's features.

New and not-yet-started comparisons use this set. Comparisons with saved turn answers retain their stored questions and completion rules. Annotate ratings remain separate. Scientific correctness remains a separate error check, while incorrect explanations or aids can affect the corresponding comparative judgments.
