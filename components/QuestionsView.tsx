'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { FaqQuestions } from '@/sanity.types';
import QuestionItem from './QuestionItem';
import styles from '@/styles/components/QuestionsView.module.scss';
import type { QuestionsResponse } from '@/types';

const QUESTIONS_PER_LOAD = 10;

const QuestionsView: React.FC = memo(() => {
  const [questions, setQuestions] = useState<FaqQuestions[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: any) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions(1);
  }, [fetchQuestions]);

  const handleLoadMore = useCallback(() => {
    fetchQuestions(currentPage + 1);
  }, [fetchQuestions, currentPage]);

  const percentageLoaded = totalQuestions
    ? Math.min((questions.length / totalQuestions) * 100, 100)
    : 0;

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.questionsView}>
      <h2>
        <Image
          src="/assets/imgs/page/faq/faqIcon.svg"
          width={20}
          height={20}
          alt="FAQ Icon"
          priority
          className={styles.icon}
        />
        <span>Pytaj</span>, jakby jutra miało nie być. Odpowiemy!
      </h2>
      <div className={styles.accordion}>
        <ul>
          {questions.map((question, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <li key={question._id}>
                <QuestionItem
                  number={number}
                  question={question?.question}
                  answer={question?.answer}
                />
              </li>
            );
          })}
        </ul>
        <div className={styles.loadMore}>
          <div className={styles.loadBar}>
            <div className={styles.boxIndicator}>
              <div
                className={styles.indicator}
                style={{ left: `${percentageLoaded}%` }}
                aria-label={`Załadowano ${questions.length} z ${totalQuestions} pytań`}
              >
                <div className={styles.number}>
                  <span>{questions.length}</span>
                  {` / ${totalQuestions}`}
                </div>
              </div>
            </div>
            <div
              className={styles.bar}
              style={{ '--bar-length': `${percentageLoaded}%` } as React.CSSProperties}
              aria-label={`Załadowano ${percentageLoaded}%`}
            ></div>
          </div>
          {questions.length < totalQuestions && (
            <button
              onClick={handleLoadMore}
              aria-label="Wczytaj więcej pytań"
              disabled={loading}
            >
              Wczytaj więcej
              <Image
                src="/assets/imgs/page/faq/arrowDown.svg"
                width={16}
                height={16}
                alt="Strzałka w dół"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default QuestionsView;
