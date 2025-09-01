'use client'

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Preloader = ({ text, variant = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
        // Wait for fade animation (500ms) before hiding completely
        setTimeout(() => setIsVisible(false), 500);
      }, 200);
      return () => clearTimeout(fadeTimer);
    }
  }, [currentIndex, text]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.preloader} ${variant ? styles[variant] : ''} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <span className={styles.text}>{displayText}</span>
          <span className={styles.cursor}>|</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
