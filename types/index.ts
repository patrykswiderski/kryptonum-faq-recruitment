import type { FaqQuestions } from '@/sanity.types';

export interface QuestionsResponse {
  questions: FaqQuestions[];
  total: number;
}
