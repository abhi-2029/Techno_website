/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverable = true, gradient = false, padding = 'p-6', onClick }) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -8, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      className={`
        relative rounded-2xl overflow-hidden
        bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]
        transition-all duration-500
        ${hoverable ? 'hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/20 cursor-pointer' : ''}
        ${padding}
        ${className}
      `}
    >
      {/* Gradient border on hover */}
      {gradient && (
        <div className="absolute inset-0 rounded-2xl p-px opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.3), rgba(168,85,247,0.3))',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />
        </div>
      )}
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}
