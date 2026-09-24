"""Create a portable screenshot-link index grouped by intended topic and language."""
import csv
import os
from pathlib import Path

BUNDLE = Path(__file__).resolve().parents[1] / 'consolidated-study'
LANGUAGES = ['English', 'Bengali', 'German', 'Hindi', 'Korean', 'Punjabi', 'Swahili', 'Tamil']
TOPICS = ["coulomb's law", 'crystal field theory', 'electrostatic shielding',
          'lorentz force', 'optical isomerism', 'theory of relativity', 'vapour phase refining']


def main():
    with (BUNDLE / 'metadata/answer-inventory.csv').open(encoding='utf-8-sig', newline='') as stream:
        rows = list(csv.DictReader(stream))
    output = BUNDLE / 'raw/screenshots-by-topic.md'
    cells = {}
    for row in rows:
        screenshot = (BUNDLE / row['bundle_html']).with_name('conversation.png')
        if not screenshot.is_file():
            raise FileNotFoundError(screenshot)
        key = (row['matched_topic'], row['language'], row['prompt_type'])
        if key in cells:
            raise ValueError(f'Duplicate topic/language/condition: {key}')
        cells[key] = os.path.relpath(screenshot, output.parent).replace(os.sep, '/')
    if set(r['matched_topic'] for r in rows) != set(TOPICS):
        raise ValueError('Update the topic list for this inventory')
    lines = ['# Conversation screenshots by topic and language', '',
        f'{len(rows)} verified local screenshot links. Each link opens the full saved conversation-panel screenshot, including the prompt and answer.', '',
        'Native and code-mixed prompts are shown separately. Topic grouping follows the intended topic in the experiment; it does not imply every answer was relevant. Language labels describe the requested prompt condition.', '',
        'Six topics have all eight native-language conditions and seven code-mixed conditions. English has no separate code-mixed condition. Vapour phase refining is supplementary and has English and Tamil only.', '',
        '## Topics', '']
    for topic in TOPICS:
        anchor = topic.replace("'", '').replace(' ', '-')
        lines.append(f'- [{topic.capitalize()}](#{anchor})')
    lines.append('')
    for topic in TOPICS:
        lines += [f'## {topic.capitalize()}', '', '| Language | Native prompt | Code-mixed prompt |',
                  '| --- | --- | --- |']
        for language in LANGUAGES:
            links = []
            for condition in ['native', 'code-mixed']:
                path = cells.get((topic, language, condition))
                links.append(f'[Screenshot]({path})' if path else '—')
            if links != ['—', '—']:
                lines.append(f'| {language} | {links[0]} | {links[1]} |')
        lines.append('')
        if topic == 'electrostatic shielding':
            lines += ['Review note: the native Bengali answer discusses conservation of charge rather than the intended electrostatic-shielding topic.', '']
        if topic == 'vapour phase refining':
            lines += ['Review note: the native Tamil answer asks for clarification rather than explaining the intended topic.', '']
    output.write_text('\n'.join(lines), encoding='utf-8')
    print(f'Created {output}: {len(cells)} verified screenshot links across {len(TOPICS)} topics.')


if __name__ == '__main__':
    main()
