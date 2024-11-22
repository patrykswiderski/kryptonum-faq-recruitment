'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  isOpen: boolean;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ isOpen, className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={isOpen ? 'Zamknij odpowiedź' : 'Otwórz odpowiedź'}
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
);

export default React.memo(AnimatedIcon);
