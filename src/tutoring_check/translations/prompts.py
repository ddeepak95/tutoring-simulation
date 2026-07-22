"""The Translate -> Evaluate -> Refine prompts, adapted from the paper
(https://aclanthology.org/2025.findings-naacl.218.pdf), and the evaluator's verdict.

The paper's prompts are kept intact except for two instructions added at each stage:

- register: these are spoken tutoring conversations, so the target should read like
  everyday speech between a tutor and a student, not like a textbook translation.
- mode: whether the subject matter is carried in English or in the target language,
  modelling an English-medium against a vernacular-medium student (see MODES).
"""
from __future__ import annotations

from dataclasses import dataclass

from tutoring_check.translations.model import strip_fences

SOURCE_LANG = "English"

# Appended to the translate and refine prompts: the transcripts are spoken tutoring
# dialogue, so a formally correct but stiff rendering is a defect, not a safe default.
REGISTER_GUIDANCE = """These are turns of a spoken tutoring conversation between a tutor and a student, so translate them the way people actually talk:
- Use the colloquial, everyday spoken register a tutor and student would use with each other in {target_lang}, not formal, literary, or textbook language.
- Prefer the contracted, elided, and shortened forms that native speakers use in speech over their full written equivalents.
- Use the everyday word a speaker would reach for in conversation rather than its formal or technical synonym, except for subject-matter terms that must stay precise.
- Keep the natural markers of speech - fillers, hedges, discourse particles, tag questions, interjections, short fragments - rendering them with whatever plays the same role in spoken {target_lang} rather than translating them word for word.
- Match each speaker's tone and level of politeness in the source, using the form of address a tutor and student of this familiarity would really use.
- Keep it natural to say out loud: if a native speaker would not say it that way in conversation, rephrase it."""

# The two translation modes, modelling the two kinds of student we want to compare.
# Neither mode is "pure" target language: a vernacular-medium student learns the subject
# in the target language but still talks like a real speaker, so the split is about
# subject-matter terms only, never about the everyday speech carrying them.
CODE_MIXED = "code_mixed"
MONOLINGUAL = "monolingual"
MODES = (CODE_MIXED, MONOLINGUAL)

# Appended to the translate and refine prompts, after REGISTER_GUIDANCE.
TERM_GUIDANCE = {
    CODE_MIXED: """This student studies the subject in English, in an English-medium classroom, so their speech is naturally code-mixed. Carry the subject matter in English and everything else in {target_lang}:
- Keep technical and academic terms in English, as the speakers would really say them out loud - the English word sitting inside the {target_lang} sentence, not a {target_lang} coinage and not a transliteration of a translated term.
- Put everything else in colloquial spoken {target_lang}: the explanations, the reasoning, the questions, the encouragement, the asides.
- Bend the English terms to {target_lang} grammar the way a real speaker does, attaching {target_lang} case markers, plurals, and verb endings to the English word rather than leaving it as a bare quoted foreign word.
- Do not translate a term just because a {target_lang} translation exists: if this student would say the English word in class, keep the English word.
- Write the {target_lang} in its own script, never romanised, and leave the English terms in the Latin alphabet - do not spell them out in the {target_lang} script. Each language keeps its own writing system, so the two are visibly distinct on the page.""",
    MONOLINGUAL: """This student studies the subject in {target_lang}, in a {target_lang}-medium classroom, so the subject matter itself is in {target_lang}:
- Use the {target_lang} term for technical and academic concepts - the term this student would actually meet in a {target_lang}-medium textbook or hear from a {target_lang}-medium teacher.
- This does not mean pure or formal {target_lang}. A {target_lang}-medium student does not speak a cleaned-up language; only their subject-matter vocabulary is different, never the way they talk.
- So let them talk the way people around them really talk, mixing in whatever words and borrowings are ordinary in everyday conversation, and keeping all the colloquial speech habits described above.
- Write the {target_lang} in its own script, never romanised, and leave any borrowed word in the script it is borrowed from.""",
}

# Appended to the estimate prompt. Without this the evaluator reads an English term inside
# a target-language sentence as accuracy/untranslated text and "corrects" the very
# code-mixing the mode is there to produce.
MODE_EVAL_GUIDANCE = {
    CODE_MIXED: """This conversation is code-mixed on purpose: the student is in an English-medium classroom, so English technical and academic terms inside {target_lang} sentences are correct here. Never report those as accuracy/untranslated text or as non-translation. Treat these as errors instead:
terminology/inappropriate for context - a technical term rendered in {target_lang} where this speaker would have said the English word.
fluency/grammar - an English term dropped in bare, without the {target_lang} case markers, plurals, or verb endings a real speaker would attach to it.
fluency/spelling - {target_lang} written in romanised form instead of its own script, or an English term spelled out in the {target_lang} script instead of the Latin alphabet. The two languages must stay in their own writing systems throughout.""",
    MONOLINGUAL: """This conversation is from a {target_lang}-medium classroom, so technical and academic concepts should carry their {target_lang} term. Treat these as errors:
terminology/inappropriate for context - an English technical term left standing where a {target_lang}-medium student would use the {target_lang} term; or an invented, unnatural {target_lang} coinage in place of the word speakers really use.
fluency/spelling - {target_lang} written in romanised form instead of its own script.
Do not flag the ordinary words and borrowings that speakers mix into casual speech, and do not push the language towards a pure or formal variety - this is a {target_lang}-medium student talking, not a textbook.""",
}


def build_mode_guidance(target_lang: str, mode: str) -> str:
    """The register and term instructions for one mode, resolved for `target_lang`."""
    if mode not in MODES:
        raise ValueError(f"unknown translation mode {mode!r}; expected one of {list(MODES)}")
    return "\n".join((
        REGISTER_GUIDANCE.format(target_lang=target_lang),
        TERM_GUIDANCE[mode].format(target_lang=target_lang),
    ))


@dataclass
class Evaluation:
    """The evaluator's verdict on one translation."""
    needs_fix: bool
    feedback: str
    raw: str


def build_translate_prompt(source: str, target_lang: str, mode: str) -> str:
    """Stage 1 — first-pass translation of one conversation (paper's Translate prompt)."""
    return f"""Please provide the {target_lang} translation for the {SOURCE_LANG} sentences:
{build_mode_guidance(target_lang, mode)}
Source: {source}
Target:"""


def build_estimate_prompt(source: str, translation: str, target_lang: str, mode: str) -> str:
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
The text below is a spoken tutoring conversation between a tutor and a student, so judge it as speech: the translation should read the way people actually talk to each other in {target_lang}, not like a textbook or written prose. Treat these as errors even when the translation is otherwise accurate:
fluency/register - formal, literary, or textbook wording where a speaker would use an everyday colloquial form; full written forms where speech would contract, elide, or shorten; a form of address or politeness level that does not match the speaker's tone in the source.
style/awkward - phrasing a native speaker would not say out loud in conversation; fillers, hedges, discourse particles, tag questions, or interjections rendered word for word instead of by whatever plays the same role in spoken {target_lang}; spoken fragments inflated into full written sentences.
Do not flag informality, contractions, or conversational looseness that is faithful to the source - in this text those are correct, not defects.
{MODE_EVAL_GUIDANCE[mode].format(target_lang=target_lang)}
{SOURCE_LANG} source: {source}
{target_lang} translation: {translation}
MQM annotations:
"""


def build_refine_prompt(
    source: str, translation: str, evaluation: Evaluation, target_lang: str, mode: str
) -> str:
    """Stage 3 — refine the translation using the evaluator's feedback. """
    return f"""Please provide the {target_lang} translation for the {SOURCE_LANG} sentences.
{build_mode_guidance(target_lang, mode)}
Source: {source}
Target: {translation}
I’m not satisfied with this target, because some defects exist: {evaluation.feedback}
Critical errors inhibit comprehension of the text. Major errors disrupt the flow, but what the text is trying to say is still understandable. Minor errors are technical errors but do not disrupt the flow or hinder comprehension.
Upon reviewing the translation examples and error information, please proceed to compose the final {target_lang} translation to the sentence: {source}. First, based on the defects information locate the error span in the target segment, comprehend its nature, and rectify it. Then, imagine yourself as a native {target_lang} speaker in this conversation, saying these turns out loud, ensuring that the rectified target segment is precise, faithful to the source segment, and phrased the way a tutor and student would really say it rather than how it would be written down.
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
