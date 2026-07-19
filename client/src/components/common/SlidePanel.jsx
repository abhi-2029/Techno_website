/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
  exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
};

export default function SlidePanel({ isOpen, onClose, title, children, width = 'max-w-lg' }) {
  // Event controller responding to user gestures or navigation triggers
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  // Lifecycle hook mapping automated side-effects on parameter changes
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-0 right-0 h-full w-full ${width} bg-dark-900 border-l border-white/10 shadow-2xl shadow-black/40 flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
              {title && <h3 className="text-lg font-semibold text-dark-50">{title}</h3>}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors text-dark-400 hover:text-dark-50"
              >
                <XMarkIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
