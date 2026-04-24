from __future__ import annotations

from pydantic import BaseModel, Field


class RunSetItem(BaseModel):
    id: str
    language_id: str
    topic_id: str
    misconception_set_id: str
    teacher_model_id: str | None = None
    student_model_id: str | None = None


class RunSetFile(BaseModel):
    items: list[RunSetItem]


class MisconceptionSet(BaseModel):
    id: str
    misconceptions: list[str] = Field(default_factory=list)


class Topic(BaseModel):
    id: str
    question: str
    criteria: list[str] = Field(default_factory=list)
    misconception_sets: list[MisconceptionSet] = Field(default_factory=list)


class TopicsFile(BaseModel):
    topics: list[Topic]


class Language(BaseModel):
    id: str
    locale: str
    name: str


class LanguagesFile(BaseModel):
    languages: list[Language]


class ModelPreset(BaseModel):
    id: str
    litellm_model: str
    label: str | None = None


class ModelsFile(BaseModel):
    models: list[ModelPreset]


class ResolvedSession(BaseModel):
    run_set_item_id: str
    topic_id: str
    misconception_set_id: str
    language_id: str
    language_locale: str
    language_name: str
    question: str
    criteria: list[str]
    misconceptions: list[str]
    teacher_model_id: str | None
    student_model_id: str | None
    teacher_litellm_model: str
    student_litellm_model: str
