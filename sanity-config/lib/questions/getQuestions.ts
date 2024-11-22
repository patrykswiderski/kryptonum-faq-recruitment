import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import type { QuestionsResponse } from '@/types';

export const getAllQuestions = async () => {
  const ALL_QUESTIONS_QUERY = defineQuery(
    `*[_type == "faqQuestions"] | order(_createdAt asc)`,
  );

  try {
    const questions = await sanityFetch({ query: ALL_QUESTIONS_QUERY });

    return questions.data || [];
  } catch (error) {
    console.error('Error fetching all questions:', error);

    return [];
  }
};

export const getPaginatedQuestions = async (
  page: number = 1,
  pageSize: number = 10,
): Promise<QuestionsResponse> => {
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const PAGINATED_QUESTIONS_QUERY = defineQuery(`{
    "total": count(*[_type == "faqQuestions"]),
    "questions": *[_type == "faqQuestions"] | order(_createdAt asc) [${skip}...${skip + limit}],
  }`);

  try {
    const result = await sanityFetch({ query: PAGINATED_QUESTIONS_QUERY });

    if (!result.data) {
      console.warn('Brak danych w odpowiedzi zapytania.');
      return { questions: [], total: 0 };
    }

    const data = result.data as QuestionsResponse;

    return data;
  } catch (error) {
    console.error('Error fetching paginated questions:', error);
    return { questions: [], total: 0 };
  }
};
