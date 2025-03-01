// src/components/elements/jumpToTop.mjs
"use client";
import { useState, useEffect } from 'react';
import Icons from '@/assets/icons/index.jsx';

const JumpToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-8 h-8 hover:scale-110 transition-transform rounded flex items-center justify-center text-center bg-apeRed cursor-pointer">
      <button
        onClick={scrollToTop}
        className="cursor-pointer"
        aria-label="Jump to top"
      >
        <Icons.CaretUp size="3xl" color="white" />
      </button>
    </div>

  );
};

export default JumpToTop;