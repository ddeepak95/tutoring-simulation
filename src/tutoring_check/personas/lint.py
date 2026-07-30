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

# A `no_jargon` rule used to live here: a 30-term blocklist of research vocabulary
# ("misconception", "conceptual change", "self-efficacy", "p-prim" …) checked against every trait
# prose string. Its reasoning was that `prose` has to *realize* a construct without *naming* it,
# because a student told it "holds a misconception" performs having one - theatrical confusion that
# folds the moment the tutor pushes - instead of simply believing the thing.
#
# It was removed as unnecessarily restrictive, and because the prompt's own section headings now
# name several of those constructs outright ("Belief persistence and conceptual change", "Learning
# goals and motivation"); a blocklist the prompt openly violates one line above the text it polices
# is not a check, it is a contradiction. The reasoning above is not retracted, only its enforcement.
# `git log` has the term list if it is wanted back.
#
# What remains are three rules that catch mechanical errors rather than exercising vocabulary
# judgement: `second_person`, `no_example_utterances`, and `no_answer_leak`.

# Only double quotes. Apostrophes in contractions make single-quote matching produce constant false
# positives, and a scripted utterance the student then echoes is always written with double quotes.
_QUOTED = re.compile(r'"([^"]{1,400})"|“([^”]{1,400})”')
MAX_QUOTED_WORDS = 3

# Persona size is REPORTED, not enforced. It used to be a violation above a fixed ceiling, on the
# theory that past some amount of instruction the model averages everything toward a bland default
# and the levels stop separating. That theory may well be right. The ceiling was not.
#
# It went 800 -> 850 (student profile) -> 900 (the check was found to be measuring section bodies
# without their headings, ~45 tokens short of what the model is actually sent) -> 950 (writing
# mechanics). Four moves, zero measurements: every time a feature earned its tokens, the number
# moved to accommodate it. A threshold that always yields is not measuring anything - but it was
# still shaping the prose on the way, because text got trimmed to reach it.
#
# So it is a number you read, not a number that fails. `cli lint` prints it per level. To make it
# a real check, calibrate first: run the four levels at several sizes and find where the
# behavioural contrast between them actually collapses. Then set the ceiling there and enforce it.
NOMINAL_TOKENS = 1000  # what the personas cost around now; a reference point, not a limit


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
    """Catch a careless edit to hand-written `prose`: scripted lines, wrong person."""
    out: list[Violation] = []
    for trait, values in TRAITS.items():
        for value, prose in values.items():
            where = f"{trait}={value}"
            out.extend(_scripted_utterances(prose, where))
            if "the student" in prose.lower():
                out.append(Violation("second_person", where, "prose says 'the student'; write to them as 'you'"))
    return out


def persona_tokens(sections: dict[str, str]) -> int:
    """What the model is actually sent, headings included.

    Not what the old budget check measured - it joined the raw section bodies, a string that
    appears nowhere, and so under-counted by the seven headings (about 45 tokens).
    """
    return estimate_tokens(render.render(sections))


def check_rendered(sections: dict[str, str], library: TopicLibrary, where: str) -> list[Violation]:
    """A leak the library lint could miss: an answer term reaching a section it should not."""
    out: list[Violation] = []
    for key, text in sections.items():
        if key in render.ANSWER_LEAK_EXEMPT:
            continue
        hits = sorted({t for t in library.answer_giveaway_terms if t.lower() in (text or "").lower()})
        if hits:
            out.append(Violation("no_answer_leak", f"{where}/{key}", f"renders {hits}, which is the answer"))
    return out
