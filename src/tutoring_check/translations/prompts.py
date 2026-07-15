"""The Translate -> Evaluate -> Refine prompts, verbatim from the paper
(https://aclanthology.org/2025.findings-naacl.218.pdf), and the evaluator's verdict.
"""
from __future__ import annotations

from dataclasses import dataclass

from tutoring_check.translations.model import strip_fences

SOURCE_LANG = "English"


@dataclass
class Evaluation:
    """The evaluator's verdict on one translation."""
    needs_fix: bool
    feedback: str
    raw: str


def build_translate_prompt(source: str, target_lang: str) -> str:
    """Stage 1 — first-pass translation of one conversation (paper's Translate prompt)."""
    return f"""Please provide the {target_lang} translation for the {SOURCE_LANG} sentences:
Source: {source}
Target:"""


def build_estimate_prompt(source: str, translation: str, target_lang: str) -> str:
    """Stage 2 — critique the translation. """
    return f"""Please identify errors and assess the quality of the translation.
The categories of errors are accuracy (addition, mistranslation, omission, untranslated text), fluency (character encoding, grammar, inconsistency, punctuation, register, spelling), locale convention (currency, date, name, telephone, or time format) style (awkward), terminology (inappropriate for context, inconsistent use), non-translation, other, or no-error.
Each error is classified as one of three categories: critical, major, and minor. Critical errors inhibit comprehension of the text. Major errors disrupt the flow, but what the text is trying to say is still understandable. Minor errors are technical errors but do not disrupt the flow or hinder comprehension.
Example1:
Chinese source: 大众点评乌鲁木齐家居商场频道为您提供居然之家地址，电话，营业时间等最新商户信息， 找装修公司，就上大众点评
English translation: Urumqi Home Furnishing Store Channel provides you with the latest business information such as the address, telephone number, business hours, etc., of high-speed rail, and find a decoration company, and go to the reviews.
MQM annotations:
critical: accuracy/addition - "of high-speed rail"
major: accuracy/mistranslation - "go to the reviews"
minor: style/awkward - "etc.,"
Example2:
English source: I do apologise about this, we must gain permission from the account holder to discuss an order with another person, I apologise if this was done previously, however, I would not be able to discuss this with yourself without the account holders permission.
German translation: Ich entschuldige mich dafür, wir müssen die Erlaubnis einholen, um eine Bestellung mit einer anderen Person zu besprechen. Ich entschuldige mich, falls dies zuvor geschehen wäre, aber ohne die Erlaubnis des Kontoinhabers wäre ich nicht in der Lage, dies mit dir involvement.
MQM annotations:
critical: no-error
major: accuracy/mistranslation - "involvement"
accuracy/omission - "the account holder"
minor: fluency/grammar - "wäre"
fluency/register - "dir"
Example3:
English source: Talks have resumed in Vienna to try to revive the nuclear pact, with both sides trying to gauge the prospects of success after the latest exchanges in the stop-start negotiations.
Czech transation: Ve Vídni se ve Vídni obnovily rozhovory o oživení jaderného paktu, pˇricemže ob ˇ eˇ partaje se snaží posoudit vyhlídky na úspech po posledních vým ˇ enách v jednáních. ˇ
MQM annotations:
critical: no-error
major: accuracy/addition - "ve Vídni"
accuracy/omission - "the stop-start"
minor: terminology/inappropriate for context - "partake"
{SOURCE_LANG} source: {source}
{target_lang} translation: {translation}
MQM annotations:
"""


def build_refine_prompt(source: str, translation: str, evaluation: Evaluation, target_lang: str) -> str:
    """Stage 3 — refine the translation using the evaluator's feedback. """
    return f"""Please provide the {target_lang} translation for the {SOURCE_LANG} sentences.
Source: {source}
Target: {translation}
I’m not satisfied with this target, because some defects exist: {evaluation.feedback}
Critical errors inhibit comprehension of the text. Major errors disrupt the flow, but what the text is trying to say is still understandable. Minor errors are technical errors but do not disrupt the flow or hinder comprehension.
Upon reviewing the translation examples and error information, please proceed to compose the final {target_lang} translation to the sentence: {source}. First, based on the defects information locate the error span in the target segment, comprehend its nature, and rectify it. Then, imagine yourself as a native {target_lang} speaker, ensuring that the rectified target segment is not only precise but also faithful to the source segment.
"""


# MQM error categories the estimator may emit (see `build_estimate_prompt`).
# Their presence in the annotations is what distinguishes a flagged translation
# from an all "no-error" verdict.
MQM_ERROR_CATEGORIES = (
    "accuracy",
    "fluency",
    "locale",
    "style",
    "terminology",
    "non-translation",
)


def parse_estimate(raw: str) -> Evaluation:
    """Read the estimator's MQM annotations; flag refinement when any error category is present."""
    text = strip_fences(raw)
    lowered = text.lower()
    needs_fix = any(category in lowered for category in MQM_ERROR_CATEGORIES)
    return Evaluation(needs_fix=needs_fix, feedback=text, raw=raw)
