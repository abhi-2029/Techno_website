/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { motion } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function CallNowButton() {
  return (
    <motion.a
      href="tel:+917529993812"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-40 md:hidden group"
      aria-label="Call now"
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full bg-primary-500/30 animate-ping" style={{ animationDuration: '2s' }} />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-shadow duration-300 group-hover:shadow-primary-500/50">
        <PhoneIcon className="w-6 h-6 text-white" />
      </div>
    </motion.a>
  );
}
