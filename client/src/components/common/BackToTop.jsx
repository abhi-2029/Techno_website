/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function BackToTop() {
  // Local state container managing interactive view variables
  const [visible, setVisible] = useState(false);

  // Lifecycle hook mapping automated side-effects on parameter changes
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-dark-800/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-dark-300 hover:text-primary-400 hover:border-primary-500/30 shadow-lg shadow-black/20 transition-colors duration-300"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
