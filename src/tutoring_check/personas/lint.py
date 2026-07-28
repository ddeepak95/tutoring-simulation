"""Checks on the one input that is still model-drafted: the misconception library.

When personas were compiled by an LLM, nine checks ran on the generated sections. Rendering them
from hand-authored templates instead turns most of those into guarantees - a template cannot use
jargon you did not write, cannot drop the number that is sitting in the prose, cannot slip into
third person, cannot leave a section empty.

What is NOT guaranteed is the library. Its `belief`, `predicts`, `changes_only_when` and
`slides_into` fields are drafted by an agent in Stage 1 of docs/misconception_library.md and flow
verbatim into every persona for that topic. So the two checks that survive are pointed there.

The registry is linted too, but for a different reason: `prose` is hand-written, and the failure
mode is a careless edit rather than a model going off-script.
"""
from __future__ import annotations

import re
from dataclasses import dataclass

from tutoring_check.personas import render
from tutoring_check.personas.misconceptions import TopicLibrary
from tutoring_check.personas.traits import TRAITS

# Research vocabulary that must not reach the student. The point is that `prose` has to *realize*
# a construct without *naming* it: a student told it "holds a misconception" performs having one -
# theatrical confusion that folds the moment the tutor pushes - instead of simply believing the
# thing. Same for "low self-efficacy", which produces a textbook illustration rather than a kid.
#
# One flat list rather than a field on each Trait: nothing needed it per-trait, and the check is
# the same everywhere. Kept deliberately short - ordinary English that happens to be a construct
# name ("affect", "register", "constructive") was removed, because a false positive here blocks
# valid prose and costs more than the miss.
BANNED_TERMS: tuple[str, ...] = (
    "misconception", "alternative conception", "wrong idea",
    "labile", "p-prim", "ontological", "miscategorisation", "knowledge in pieces",
    "conceptual change", "learning rate",
    "ICAP", "self-explanation", "cognitive engagement",
    "help-seeking", "help avoidance", "help abuse", "gaming the system",
    "goal orientation", "mastery goal", "performance-avoidance", "performance-approach",
    "self-efficacy", "mindset",
    "affective state", "flow state", "disengagement",
    "verbosity", "colloquial register",
    "persona", "trait", "student level", "scaffold",
)

# Only double quotes. Apostrophes in contractions make single-quote matching produce constant false
# positives, and a scripted utterance the student then echoes is always written with double quotes.
_QUOTED = re.compile(r'"([^"]{1,400})"|“([^”]{1,400})”')
MAX_QUOTED_WORDS = 3

# Budget is a guard against instruction dilution: past some amount of persona instruction the model
# averages everything toward a bland default and the levels stop separating.
#
# TREAT THIS NUMBER AS NOISE UNTIL IT IS CALIBRATED. It has never been checked against a transcript.
# It started at 800, went to 850 when the student profile was added, and is now 900 because the
# check was found to be measuring the section bodies without their headings - about 45 tokens short
# of what the model is actually sent. 900 is roughly the old 850 restated against a correct
# measurement, not a new claim about where dilution starts.
#
# The check that would make it real: run the same four levels at several budgets and see where the
# behavioural contrast between them starts to collapse. Until then this catches runaway prose and
# nothing more, and it should not be used to argue against a feature that earns its tokens.
TOKEN_BUDGET = 900


@dataclass(frozen=True)
class Violation:
    rule_id: str
    where: str
    message: str

    def __str__(self) -> str:
        return f"[{self.where}] {self.message}"


def estimate_tokens(text: str) -> int:
    """Rough count without a tokenizer dependency; deliberately an over-estimate (~1.35/word)."""
    return int(len(text.split()) * 1.35)


def _jargon_pattern() -> re.Pattern[str]:
    """Word-boundary alternation - substring matching fires on "ICAP" inside "handicap"."""
    alts = sorted((re.escape(t) for t in BANNED_TERMS), key=len, reverse=True)
    return re.compile(rf"\b(?:{'|'.join(alts)})\b", re.IGNORECASE)


_JARGON = _jargon_pattern()


def _scripted_utterances(text: str, where: str) -> list[Violation]:
    out = []
    for match in _QUOTED.finditer(text or ""):
        quoted = match.group(1) or match.group(2) or ""
        if len(quoted.split()) > MAX_QUOTED_WORDS:
            out.append(
                Violation(
                    "no_example_utterances",
                    where,
                    f'quoted line "{quoted[:60]}" will be echoed verbatim by the student in most of '
                    "its turns. State the behaviour as a rule instead.",
                )
            )
    return out


def check_library(library: TopicLibrary) -> list[Violation]:
    """The Stage-1 prose is the remaining un-authored input; check it does not give the game away.

    `answer_giveaway_terms` and `canonical_explanation` are exempt from the leak check for the
    obvious reason: they ARE the answer, recorded so everything else can be checked against them.
    """
    out: list[Violation] = []
    terms = [t.lower() for t in library.answer_giveaway_terms]

    for m in library.misconceptions:
        fields = {
            "belief": m.belief,
            "predicts": m.predicts,
            "slides_into": m.slides_into,
            **{f"changes_only_when[{i}]": c for i, c in enumerate(m.changes_only_when)},
        }
        for name, text in fields.items():
            where = f"{m.id}.{name}"
            low = (text or "").lower()
            hits = sorted({t for t in terms if t in low})
            if hits:
                out.append(
                    Violation(
                        "no_answer_leak",
                        where,
                        f"names {hits}, which is the answer. Every persona for this topic renders "
                        "this field verbatim, so the student would be told what it is meant to "
                        "not know. Say what would convince them without naming the mechanism.",
                    )
                )
            out.extend(_scripted_utterances(text, where))

    if not library.everyday_terms:
        out.append(
            Violation(
                "boundary_nonempty",
                library.topic_id,
                "everyday_terms is empty, so the boundary of competence has only a far side. "
                "List the words this student does already have for the topic.",
            )
        )
    return out


def check_registry() -> list[Violation]:
    """Catch a careless edit to hand-written `prose`: jargon, scripted lines, wrong person."""
    out: list[Violation] = []
    for trait, values in TRAITS.items():
        for value, prose in values.items():
            where = f"{trait}={value}"
            hits = sorted({m.group(0).lower() for m in _JARGON.finditer(prose)})
            if hits:
                out.append(
                    Violation(
                        "no_jargon",
                        where,
                        f"prose uses research vocabulary {hits}; describe what the student does, "
                        "not the construct it instantiates",
                    )
                )
            out.extend(_scripted_utterances(prose, where))
            if "the student" in prose.lower():
                out.append(Violation("second_person", where, "prose says 'the student'; write to them as 'you'"))
    return out


def check_rendered(sections: dict[str, str], library: TopicLibrary, where: str) -> list[Violation]:
    """Belt-and-braces on the assembled persona: budget, and a leak the library lint could miss."""
    out: list[Violation] = []
    # Measure what the model is actually sent, headings included. This used to join the raw section
    # bodies, which is not a string that appears anywhere - it under-counted by the seven headings,
    # about 45 tokens, so the budget was quietly 45 looser than it claimed.
    total = estimate_tokens(render.render(sections))
    if total > TOKEN_BUDGET:
        out.append(
            Violation(
                "budget",
                where,
                f"about {total} tokens, over the {TOKEN_BUDGET} budget. It is prepended to every "
                "student turn, and past this the levels stop separating.",
            )
        )
    for key, text in sections.items():
        if key in render.ANSWER_LEAK_EXEMPT:
            continue
        hits = sorted({t for t in library.answer_giveaway_terms if t.lower() in (text or "").lower()})
        if hits:
            out.append(Violation("no_answer_leak", f"{where}/{key}", f"renders {hits}, which is the answer"))
    return out
