'use client';
import React from 'react';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import styles from '@/styles/components/QuestionItem.module.scss';
import AnimatedIcon from './AnimatedIcon';

interface QuestionItemProps {
  number: string;
  question?: string;
  answer?: string;
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
        <div className={styles.questionNumber}>{number}</div>
        <div className={styles.questionContent}>
          <div className={styles.questionText}>{question}</div>
          <div className={styles.animatedIcon}>
            <AnimatedIcon isOpen={isOpen} />
          </div>
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
