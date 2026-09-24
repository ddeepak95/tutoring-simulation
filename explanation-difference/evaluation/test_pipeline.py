import asyncio
import json
import tempfile
import unittest
from pathlib import Path

import extraction
import pipeline
import translation


class PipelineTests(unittest.TestCase):
    def source(self, text):
        return dict(path='/original.json', topic_folder='topic', source_sha256=pipeline.digest(text),
                    text=text, job=dict(job_id='job1', model='original', run_index=2))

    def response(self, text):
        return {'status': 'completed', 'output': [{'type': 'message', 'content': [
            {'type': 'output_text', 'text': text}]}]}

    def test_actual_text_language_and_passthrough(self):
        self.assertTrue(translation.needs_translation('தமிழ் with English'))
        with self.assertRaises(ValueError):
            translation.validate('தமிழ்')
        async def forbidden(**kwargs):
            self.fail('English passthrough called API')
        with tempfile.TemporaryDirectory() as directory:
            result = asyncio.run(pipeline.process('translate', self.source('English **exact**'),
                                 {'id': 'test', 'litellm_model': 'test'}, Path(directory), 10, forbidden))
            self.assertEqual(result['english_text'], 'English **exact**')

    def test_translation_extraction_cache_and_stale_source(self):
        english = 'Nickel forms a volatile compound. Nickel is an example.'
        inventory = {'subtopics': [{'id': 's1', 'label': 'Volatile compounds', 'coverage': 'explained',
                                   'evidence': 'Nickel forms a volatile compound.'}],
                     'examples': [{'id': 'e1', 'label': 'Nickel', 'kind': 'illustrative_example',
                                   'subtopic_ids': ['s1'], 'evidence': 'Nickel is an example.'}]}
        calls = []
        async def fake(**kwargs):
            calls.append(kwargs)
            return self.response(english if len(calls) == 1 else json.dumps(inventory))
        model = {'id': 'test', 'litellm_model': 'test', 'litellm_params': {'api_key': 'secret-value'}}
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            source = self.source('தமிழ்')
            for stage in ('translate', 'extract', 'translate', 'extract'):
                result = asyncio.run(pipeline.process(stage, source, model, output, 10, fake))
                self.assertEqual(result['status'], 'completed')
            self.assertEqual(len(calls), 2)
            self.assertEqual(result['inventory'], inventory)
            log = (output / 'translate/api_calls.jsonl').read_text(encoding='utf-8')
            self.assertNotIn('secret-value', log)
            with self.assertRaises(ValueError):
                asyncio.run(pipeline.process('translate', self.source('மாற்றம்'), model, output, 10, fake))

    def test_evidence_and_references_required(self):
        item = {'subtopics': [{'id': 's1', 'label': 'Concept', 'coverage': 'mentioned', 'evidence': 'invented'}], 'examples': []}
        with self.assertRaises(ValueError):
            extraction.parse(json.dumps(item), 'Actual text')
        item['subtopics'][0]['evidence'] = 'Actual'
        item['examples'] = [{'id': 'e1', 'label': 'Example', 'kind': 'analogy', 'subtopic_ids': ['s2'], 'evidence': 'text'}]
        with self.assertRaises(ValueError):
            extraction.parse(json.dumps(item), 'Actual text')

    def test_validation_failure_retries_and_retains_raw_response(self):
        async def fake(**kwargs):
            return self.response('தமிழ்')
        with tempfile.TemporaryDirectory() as directory:
            result = asyncio.run(pipeline.process('translate', self.source('தமிழ்'),
                                 {'id': 'test', 'litellm_model': 'test'}, Path(directory), 10, fake))
            self.assertEqual(result['status'], 'failed')
            self.assertIn('response', result)

    def test_failed_translation_gets_feedback_on_retry(self):
        calls = []
        async def fake(**kwargs):
            calls.append(kwargs)
            return self.response('\u0ba4' if len(calls) == 1 else 'English translation')
        with tempfile.TemporaryDirectory() as directory:
            source = self.source('\u0ba4')
            model = {'id': 'test', 'litellm_model': 'test'}
            first = asyncio.run(pipeline.process('translate', source, model, Path(directory), 10, fake))
            second = asyncio.run(pipeline.process('translate', source, model, Path(directory), 10, fake))
            self.assertEqual(first['status'], 'failed')
            self.assertEqual(second['status'], 'completed')
            self.assertIn('previous attempt failed', calls[1]['input'][-1]['content'])


if __name__ == '__main__':
    unittest.main()
