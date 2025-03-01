'use client';

import Image from 'next/image';
import { useBanner } from '@/contexts/BannerContext';
import { motion, AnimatePresence } from 'framer-motion'; // Optional: for smooth transitions

export function BannerImage() {
  const { currentBanner } = useBanner();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentBanner.src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full h-full"
      >
        <Image 
          src={currentBanner} 
          alt="Page Banner" 
          className="object-cover h-full w-full"
          priority 
          fill={true}
        />
      </motion.div>
    </AnimatePresence>
  );
}