"""Who the student is, as distinct from what they believe or how they learn.

Three kinds of input make a persona, and keeping them apart is what keeps the study legible:

    profile.py         who they are      name, age, grade, languages  - held constant across levels
    misconceptions.py  what they believe the topic's documented wrong idea
    traits.py          how they learn    the level's bundle - the one manipulated factor

A profile is a catalog row in `data/students.json`, named by `student_id` in a run set, exactly like
a language or a model. Holding it constant while `level` varies is what makes a level comparison a
level comparison; varying it while `level` is held is a separate study you can now run.

`region` is not stored in the catalog. It is already an experimental dimension with its own catalog
and its own `region_id` in the run set, and it already reaches the tutor prompt and the transcript
header. A second nationality field beside it would be the same fact written twice, so it is passed
in when the profile is assembled and the persona says it in the student's own words.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class StudentProfile:
    """One student's identity. Everything here reaches the prompt verbatim, so write it as prose."""
    id: str
    name: str
    age: int
    grade: str        # written out - "Grade 8", "Year 9", "8th standard" all differ by school system
    speaks: str       # free prose, e.g. "Mandarin at home, and English in science lessons"
    region: str = ""  # where they are at school; supplied from the run set's `region_id`

    @classmethod
    def from_row(cls, row: dict, region: str = "") -> StudentProfile:
        return cls(
            id=row["id"],
            name=row["name"],
            age=int(row["age"]),
            grade=row["grade"],
            speaks=row["speaks"],
            region=region,
        )
