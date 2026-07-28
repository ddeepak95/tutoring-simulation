"""Load the per-topic misconception libraries in `data/misconceptions/` (personas.md "Part 1").

The library carries topic facts; `traits.py` carries theory. Anything true of learners in general -
how stubbornly a wrong idea is held, how fast someone changes their mind - is a trait fixed by the
level. Anything true of this concept is a field here.

Entries are authored once per topic by the procedure in docs/misconception_library.md - an agent
researches, a second agent independently fetches every cited URL, and an entry whose source does not
check out is deleted rather than flagged. Verification is an authoring step, not a load-time one:
by the time a file is committed the unverified entries are gone. The citations themselves live in
`<topic_id>.sources.md` beside the data, because no code reads them - only a reviewer does.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

_DATA_DIR = Path(__file__).resolve().parents[3] / "data" / "misconceptions"


@dataclass(frozen=True)
class Misconception:
    """One documented alternative conception, as `render.py` receives it."""
    id: str
    name: str
    belief: str                             # first person, the student's own words
    predicts: str                           # the concrete wrong prediction it makes
    changes_only_when: tuple[str, ...]      # what shifts it, stated without giving away the answer
    slides_into: str                        # the next wrong idea; "" when the literature is silent


@dataclass(frozen=True)
class TopicLibrary:
    """Every documented alternative conception for one topic, plus what counts as the answer."""
    topic_id: str
    canonical_explanation: str
    answer_giveaway_terms: tuple[str, ...]   # out of reach until the teacher supplies them
    everyday_terms: tuple[str, ...]          # in reach: the student's own vocabulary for this topic
    misconceptions: tuple[Misconception, ...] = field(default_factory=tuple)

    @property
    def primary(self) -> Misconception:
        """The entry every persona for this topic is built on.

        File order is the authoring claim about which conception is best documented, so the first
        entry is the one that gets simulated. Later entries are kept because the research was done;
        which one a run uses is not currently a variable (see personas.md "Part 5").
        """
        return self.misconceptions[0]


def library_path(topic_id: str, data_dir: Path | None = None) -> Path:
    return (data_dir or _DATA_DIR) / f"{topic_id}.json"


def load_topic(topic_id: str, *, data_dir: Path | None = None) -> TopicLibrary:
    """Load one topic's library.

    There is no fallback for a topic without a library: a student whose wrong idea is unspecified is
    exactly the under-specified student this design exists to replace, so the error names the file
    that has to be authored.
    """
    path = library_path(topic_id, data_dir)
    if not path.exists():
        raise FileNotFoundError(
            f"no misconception library for topic {topic_id!r} at {path}. "
            "Author it with the procedure in docs/misconception_library.md before running this topic."
        )

    raw = json.loads(path.read_text(encoding="utf-8"))
    entries = [
        Misconception(
            id=item["id"],
            name=item["name"],
            belief=item["belief"],
            predicts=item["predicts"],
            changes_only_when=tuple(item["changes_only_when"]),
            slides_into=item.get("slides_into", ""),
        )
        for item in raw["misconceptions"]
    ]

    if not entries:
        raise ValueError(f"{path} defines no misconceptions")

    return TopicLibrary(
        topic_id=raw["topic_id"],
        canonical_explanation=raw["canonical_explanation"],
        answer_giveaway_terms=tuple(raw["answer_giveaway_terms"]),
        everyday_terms=tuple(raw["everyday_terms"]),
        misconceptions=tuple(entries),
    )
