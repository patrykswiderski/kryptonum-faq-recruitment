import { useState, useCallback, useEffect, useRef } from 'react';
import type { FaqQuestions } from '@/sanity.types';
import type { QuestionsResponse } from '@/types';

const QUESTIONS_PER_LOAD = 10;

interface UseFetchQuestionsResult {
  questions: FaqQuestions[];
  loadMore: () => void;
  loading: boolean;
  error: string | null;
  totalQuestions: number;
}

const useFetchQuestions = (): UseFetchQuestionsResult => {
  const [questions, setQuestions] = useState<FaqQuestions[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedInitial = useRef(false); // Dodano ref

  const fetchQuestions = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/questions?page=${page}&pageSize=${QUESTIONS_PER_LOAD}`,
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: QuestionsResponse = await response.json();
      setQuestions((prev) => {
        const newQuestions = [...prev, ...data.questions];
        if (newQuestions.length > data.total) {
          return newQuestions.slice(0, data.total);
        }
        return newQuestions;
      });
      setTotalQuestions(data.total);
      setCurrentPage(page);
    } catch (err: unknown) {
      console.error('Error fetching questions:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (questions.length < totalQuestions && !loading) {
      fetchQuestions(currentPage + 1);
    }
  }, [fetchQuestions, currentPage, questions.length, totalQuestions, loading]);

  useEffect(() => {
    if (!hasFetchedInitial.current) {
      fetchQuestions(1);
      hasFetchedInitial.current = true;
    }
  }, [fetchQuestions]);

  return {
    questions,
    loadMore,
    loading,
    error,
    totalQuestions,
  };
};

export default useFetchQuestions;
