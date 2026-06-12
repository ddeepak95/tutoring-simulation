from __future__ import annotations

from litellm import acompletion

from tutoring_check.teachtune.config import SessionConfig

# Generic, subject-agnostic self-report statements derived from arxiv:2410.04078.
_GOAL_COMMITMENT_STATEMENTS = [
    "I am strongly committed to pursuing this goal.",
    "I think this is a good goal to shoot for.",
    "I am willing to put forth a great deal of effort beyond what I'd normally do to achieve this goal.",
]
_MOTIVATION_STATEMENTS = [
    "I keep working on a problem until I understand it.",
    "I try to learn more about something that I don't understand right away so that I will understand it.",
    "When I know I have learned something new, I feel good inside.",
]
_SELF_EFFICACY_STATEMENTS = [
    "I believe I am the kind of person who is good at the subject.", # Changed from "science" to "the subject" to be more general.
    "I believe I am the type of person who can do the subject.",     # Changed from "science" to "the subject" to be more general.
    "I believe I can learn well in a course.",                       # Removed mention of science.
]
_STRESS_STATEMENTS = [
    "I feel a lot of pressure in my daily studying.",
    "Future education and employment bring me a lot of academic pressure.",
    "I feel that I have disappointed my parents when my test/exam results are poor.",
]


def _scale_to_likert(value: int) -> str:
    labels = {
        1: "Strongly disagree",
        2: "Disagree",
        3: "Neutral",
        4: "Agree",
        5: "Strongly agree",
    }
    return labels[value]


def _format_trait_block(statements: list[str], value: int) -> str:
    """ Format a block of self-report statements, prefixing with a Likert label. """
    label = _scale_to_likert(value)
    return "\n".join(f"{label}: {s}" for s in statements)


async def generate_trait_overview(config: SessionConfig, *, model: str) -> str:
    """TeachTune Interpret (Appendix A.3): traits -> prose character description.

    `model` is the litellm model string.
    """
    system_prompt = (
        "You are a playwright who describes the psychology and behavior of characters well."
    )
    user_prompt = (
        # Removed mention of the school level of student
        "You need to describe a school student, and the direct responses to the student's goal commitment, motivation, self-efficacy, and stress are below. \n"
        "<student's-goal-commitment>\n"
        f"{_format_trait_block(_GOAL_COMMITMENT_STATEMENTS, config.goal_commitment)}\n"
        "</student's-goal-commitment>\n"
        "<student's-motivation>\n"
        f"{_format_trait_block(_MOTIVATION_STATEMENTS, config.intrinsic_motivation)}\n"
        "</student's-motivation>\n"
        "<student's-self-efficacy>\n"
        f"{_format_trait_block(_SELF_EFFICACY_STATEMENTS, config.academic_self_efficacy)}\n"
        "</student's-self-efficacy>\n"
        "<student's-stress>\n"
        f"{_format_trait_block(_STRESS_STATEMENTS, config.academic_stress)}\n"
        "</student's-stress>\n"
        "Based on the information above, describe the student profile in detail about the student's goal commitment, motivation, self-efficacy, and stress.\n"
        "Interpret each category as independently as possible and it should be interpreted as high, medium, and low, not positive/negative.\n"
        "For 'neutral,' you must write in a neutral way.\n"
        f"Write in {config.language}."
    )

    response = await acompletion(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    return (getattr(response.choices[0].message, "content", None) or "").strip()
