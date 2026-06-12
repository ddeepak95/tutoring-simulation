from __future__ import annotations

import json

from litellm import acompletion


class KnowledgeStateTracker:
    """Log of which knowledge components have been covered so far. """

    def __init__(self, component_names: list[str]) -> None:
        self.component_names = list(component_names)
        self.covered_indices: set[int] = set()

    def update(self, indices: list[int]) -> None:
        """Add Reflect-returned component indices to the coverage set. """
        for i in indices:
            if isinstance(i, int) and 0 <= i < len(self.component_names):
                self.covered_indices.add(i)

    def get_coverage_summary(self) -> str:
        covered = [self.component_names[i] for i in sorted(self.covered_indices)]
        remaining = [
            name
            for i, name in enumerate(self.component_names)
            if i not in self.covered_indices
        ]
        return (
            f"Covered {len(covered)}/{len(self.component_names)} knowledge components.\n"
            f"Covered: {', '.join(covered) if covered else '(none yet)'}\n"
            f"Remaining: {', '.join(remaining) if remaining else '(none)'}"
        )

    def is_complete(self, total_components: int) -> bool:
        return self.covered_indices == set(range(total_components))


async def reflect_coverage(
    conversation_history: list[dict],
    component_names: list[str],
    *,
    model: str,
    teacher_name: str,
    student_name: str,
) -> list[int]:
    """TeachTune Reflect (Appendix A.4): which components were just covered.

    Returns a flat list of component indices that the teacher explained
    correctly or the student correctly demonstrated in the recent exchange.
    Degrades to an empty list if the model output cannot be parsed.
    """
    system_prompt = (
        "You are a teacher who evaluates which knowledge components have been covered in a tutoring conversation." # Removed detail about science
    )
    convo_text = _format_conversation(
        conversation_history[-2:], teacher_name, student_name
    )
    components_text = "\n".join(f"{i}. {name}" for i, name in enumerate(component_names))
    user_prompt = (
        f"Read the recent conversation between {teacher_name} and {student_name}.\n"
        "<conversation>\n"
        f"{convo_text}\n"
        "</conversation>\n"
        "<knowledge-components>\n"
        f"{components_text}\n"
        "</knowledge-components>\n"
        f"Identify the knowledge components that {teacher_name} has explained "
        f"correctly, OR that {student_name} has correctly demonstrated, in this "
        "conversation.\n"
        "First, reason briefly through each component in plain text.\n"
        "Then, on the final line, output only a JSON array of the matching "
        "component indices, e.g. [0, 2].\n"
        "If no component qualifies, output null.\n"
        "Do not add any explanation after the array."
    )

    response = await acompletion(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    content = getattr(response.choices[0].message, "content", None) or ""
    return _parse_indices(content, len(component_names))


def _format_conversation(
    history: list[dict], teacher_name: str, student_name: str
) -> str:
    role_names = {"teacher": teacher_name, "student": student_name}
    lines = []
    for entry in history:
        role = entry.get("role", "")
        speaker = role_names.get(role, role)
        lines.append(f"{speaker}: {entry.get('content', '')}")
    return "\n".join(lines)


def _parse_indices(content: str, total: int) -> list[int]:
    """Extracts the list of covered knowledge-component indices from the last raw LLM reflection. """
    for line in reversed(content.strip().splitlines()):
        line = line.strip()
        if line == "null":
            return []
        if line.startswith("[") and line.endswith("]"):
            try:
                data = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(data, list):
                return [i for i in data if isinstance(i, int) and 0 <= i < total]
    return []
