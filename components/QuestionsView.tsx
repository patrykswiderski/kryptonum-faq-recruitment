'use client';
import { memo } from 'react';
import Image from 'next/image';
import useFetchQuestions from '@/hooks/useFetchQuestions';
import useDelayedLoading from '@/hooks/useDelayedLoading';
import QuestionItem from './QuestionItem';
import styles from '@/styles/components/QuestionsView.module.scss';
import stylesLoader from '@/styles/loading.module.scss';

const QuestionsView = memo((): JSX.Element => {
  const { questions, loadMore, loading, error, totalQuestions } = useFetchQuestions();
  const showLoading = useDelayedLoading(loading, 500);

  const percentageLoaded = totalQuestions
    ? Math.min((questions.length / totalQuestions) * 100, 100)
    : 0;

  if (!loading && questions.length === 0) {
    return <div className={stylesLoader.loader}></div>;
  }

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
        {questions.length < totalQuestions && (
          <>
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
                      {`/${totalQuestions}`}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.bar}
                  style={
                    { '--bar-length': `${percentageLoaded}%` } as React.CSSProperties
                  }
                  aria-label={`Załadowano ${percentageLoaded}%`}
                ></div>
              </div>
              <button
                onClick={loadMore}
                aria-label="Wczytaj więcej pytań"
                disabled={loading}
              >
                {showLoading ? (
                  <>
                    <Image
                      src="/assets/imgs/page/faq/loadingDots.svg"
                      width={16}
                      height={16}
                      alt="Ładowanie"
                    />
                  </>
                ) : (
                  <>
                    Wczytaj więcej
                    <Image
                      src="/assets/imgs/page/faq/arrowDown.svg"
                      width={16}
                      height={16}
                      alt="Strzałka w dół"
                    />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

QuestionsView.displayName = 'QuestionsView';

export default QuestionsView;
