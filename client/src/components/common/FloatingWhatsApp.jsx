/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/917529993812?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 transition-shadow duration-300 group-hover:shadow-green-500/50">
        <FaWhatsapp className="w-7 h-7 text-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-dark-800 border border-white/10 text-xs font-medium text-dark-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-dark-800 border-r border-t border-white/10 rotate-45" />
      </div>
    </motion.a>
  );
}
