import type { Conversation, Profile, RatingDimension, Status, Turn } from './types';

export type ComparisonChoice = 'a' | 'b' | 'tie';
export interface ComparisonAnswer { values: Record<string, ComparisonChoice>; notes: string; }
export interface ComparisonQuestion extends RatingDimension { scope?: string; }
export interface ComparisonAssignment {
  id: string; conversation_a_id: string; conversation_b_id: string; annotator_id: string;
  questions: ComparisonQuestion[]; answers: ComparisonAnswer[]; overall_answer?: ComparisonAnswer | null; status: Status; revision: number;
  updated_at: string; submitted_at: string | null; profiles?: Profile;
}
export interface ComparisonRound { tutor: Turn; students: Turn[]; }

const comparisonPrompts: Record<string, string> = {
  concept_summarization: 'Which of the two responses better recaps the key points of each newly explained concept?',
  information_load_appropriateness: 'Which of the two responses provides a more appropriate amount of information?',
  relevance: 'Which of the two responses provides information more relevant to the core learning topic and makes clearer connections when discussing tangential information?',
  real_world_connection_and_usefulness: 'Which of the two responses better explains how the learning topic relates to real-world situations or serves a practical purpose?',
  appropriateness_for_the_learners_level: 'Which of the two responses provides information more appropriate for a high-school student?',
  opportunities_to_demonstrate_understanding: 'Which of the two responses provides better opportunities for the learner to practise or demonstrate understanding of the core concept?',
  conversational_naturalness: 'Which of the two responses uses more natural conversational language and addresses the learner more personally, making the exchange feel like a dialogue?',
  positivity_of_tone: 'Which of the two responses expresses more warmth, encouragement, or empathy toward the learner?',
  coherence: 'Which of the two responses builds more logically on the explanations and examples in previous turns?',
  responsiveness: 'Which of the two responses better addresses the learner’s questions, requests, and confusion, and adapts to their knowledge, misconceptions, or interests?',
};

export function comparisonRounds(conversation: Conversation): ComparisonRound[] {
  const rounds: ComparisonRound[] = [];
  let students: Turn[] = [];
  for (const turn of conversation.messages) {
    if (turn.speaker === 'student') students.push(turn);
    else { rounds.push({ tutor: turn, students: rounds.length ? students : [] }); students = []; }
  }
  return rounds;
}
export function overallComparisonQuestions(questions: ComparisonQuestion[]) {
  return questions.filter(question => question.scope === 'overall');
}
export function comparisonQuestions(questions: ComparisonQuestion[], index: number) {
  return questions.filter(question => question.scope !== 'overall' && question.key !== 'instructional_sequence' && (index > 0 || !question.subsequent_only)).sort((a, b) => Number(b.key === 'follow_up_responsiveness') - Number(a.key === 'follow_up_responsiveness')).map(question => {
    // New and previously pinned comparative wording is authoritative. Only adapt
    // legacy snapshots that still contain the original single-tutor questions.
    if (question.description.startsWith('Which of the two responses')) return question;
    const prompt = comparisonPrompts[question.key];
    return prompt ? { ...question, description: prompt, guidance: prompt } : question;
  });
}
export function comparisonComplete(answer: ComparisonAnswer, questions: ComparisonQuestion[], index: number) {
  const active = comparisonQuestions(questions, index);
  return active.length > 0 && active.every(question => ['a', 'b', 'tie'].includes(answer.values[question.key]));
}
