'use client';
import React from 'react';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import styles from '@/styles/components/QuestionItem.module.scss';

interface QuestionItemProps {
  number: string;
  question: string;
  answer: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ number, question, answer }) => {
  const [isOpen, toggleIsOpen] = useCycle(false, true);

  return (
    <div className={styles.questionItem}>
      <button
        onClick={() => toggleIsOpen()}
        aria-expanded={isOpen}
        className={styles.questionButton}
      >
        <span className={styles.questionNumber}>{number}</span>
        <div className={styles.questionContent}>
          <p>{question}</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="8.333" stroke="url(#gradientStroke)" />
            <motion.path
              d="M7.5 10H12.5"
              stroke="url(#gradientStroke)"
              strokeLinecap="round"
              initial={{ opacity: 1 }}
              animate={{ opacity: isOpen ? 1 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M10 7.5V10"
              stroke="url(#gradientStroke)"
              strokeLinecap="round"
              animate={{ scaleY: isOpen ? 0 : 1 }}
              initial={{ scaleY: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'bottom' }}
            />
            <motion.path
              d="M10 10V12.5"
              stroke="url(#gradientStroke)"
              strokeLinecap="round"
              animate={{ scaleY: isOpen ? 0 : 1 }}
              initial={{ scaleY: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
            <defs>
              <linearGradient
                id="gradientStroke"
                x1="18.0182"
                y1="4.666"
                x2="0.673"
                y2="5.771"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2DD282" />
                <stop offset="1" stopColor="#90F4E8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`answer-${number}`}
            aria-hidden={!isOpen}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={styles.answerContainer}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(QuestionItem);
