import copy
import unittest
import evaluate_v3 as v

class EvaluationTests(unittest.TestCase):
    def fixture(self):
        source=[{'id':'p1','text':'Oxidation is electron loss.','start':0,'end':26}]
        unit={'id':'u1','kind':'CONCEPT','label':'Oxidation','attributes':{'depth':'statement'},
              'subtopic_ids':['s1'],'rationale':'Definition','review_flags':[],
              'contextualization':{'value':'none','evidence':[]},
              'passages':[{'id':'p1','category':'CONCEPT','attributes':{'depth':'statement'},'formats':['prose'],'review_flags':[]}],
              'accuracy':{'verdict':'accurate','reason':'Correct definition','errors':[]}}
        data={'topic_relevance':{'requested_topic':'redox','observed_topic':'redox','topic_match':'on_topic','content_unit_ids':['u1'],'reason':'Relevant','major_task_failure':False},
              'subtopics':[{'id':'s1','label':'Oxidation'}],'content_units':[unit]}
        return source,data

    def test_enriched_source_and_counts(self):
        source,data=self.fixture()
        v.validate(v.enrich(data,source),source,'redox')
        self.assertEqual(data['content_units'][0]['passages'][0]['text'],source[0]['text'])
        self.assertEqual(v.metrics(data)['substantive_content_units'],1)

    def test_coverage_links_attributes_and_offsets(self):
        source,data=self.fixture()
        edits=[lambda d:d['content_units'][0]['passages'].append(copy.deepcopy(d['content_units'][0]['passages'][0])),
               lambda d:d['content_units'][0]['passages'][0].update(id='p2'),
               lambda d:d['content_units'][0]['passages'][0].update(text='changed'),
               lambda d:d['content_units'][0].update(attributes={}),
               lambda d:d['topic_relevance'].update(content_unit_ids=['u2'])]
        for edit in edits:
            candidate=copy.deepcopy(data); edit(candidate)
            with self.assertRaises(ValueError): v.validate(candidate,source,'redox')
        source.append({'id':'p2','text':'Extra','start':27,'end':32})
        with self.assertRaises(ValueError): v.validate(data,source,'redox')

    def test_context_exact_and_local(self):
        source,data=self.fixture(); ctx=data['content_units'][0]['contextualization']
        ctx.update(value='everyday',evidence=[{'passage_id':'p1','quote':'electron loss'}])
        v.validate(data,source,'redox')
        ctx['evidence'][0]['quote']='invented'
        with self.assertRaises(ValueError): v.validate(data,source,'redox')

    def test_errors_and_off_topic_gate(self):
        source,data=self.fixture(); acc=data['content_units'][0]['accuracy']
        acc['verdict']='contains_error'
        with self.assertRaises(ValueError): v.validate(data,source,'redox')
        acc['errors']=[{'passage_ids':['p1'],'description':'Test','correction':'Test','severity':'minor'}]
        v.validate(data,source,'redox')
        acc['errors'][0]['passage_ids']=['p2']
        with self.assertRaises(ValueError): v.validate(data,source,'redox')
        data['topic_relevance'].update(topic_match='off_topic',major_task_failure=True)
        acc.update(verdict='not_assessed_due_to_topic_mismatch',errors=[])
        v.validate(data,source,'redox')

    def test_organization_excluded(self):
        source,data=self.fixture(); u=data['content_units'][0]
        u.update(kind='ORGANIZATION',attributes={'subtype':'structural'})
        with self.assertRaises(v.jsonschema.ValidationError): v.validate(data,source,'redox')

    def test_organizational_coverage(self):
        source,data=self.fixture()
        source.append({'id':'p2','text':'Thank you','start':27,'end':36})
        org={'id':'p2','category':'ORGANIZATION','attributes':{'subtype':'social'},'formats':['prose'],'review_flags':[]}
        data['content_units'][0]['passages'].append(org)
        v.validate(v.enrich(data,source),source,'redox')
        self.assertEqual(v.metrics(data)['total_content_units'],1)
        self.assertEqual(v.metrics(data)['total_passages'],2)
        data['content_units'][0]['passages'].append(copy.deepcopy(org))
        with self.assertRaises(ValueError): v.validate(data,source,'redox')
        data['content_units'][0]['passages'].pop()
        data['organizational_passages']=[]
        with self.assertRaises(v.jsonschema.ValidationError): v.validate(data,source,'redox')

if __name__=='__main__': unittest.main()
