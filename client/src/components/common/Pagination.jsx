/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1 }) {
  if (totalPages <= 1) return null;

  const range = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  };

  const generatePages = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...range(1, leftItemCount), '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [1, '...', ...range(totalPages - rightItemCount + 1, totalPages)];
    }

    return [1, '...', ...range(leftSiblingIndex, rightSiblingIndex), '...', totalPages];
  };

  const pages = generatePages();

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      {/* Previous */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/5 border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </motion.button>

      {/* Pages */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-dark-500 text-sm">
            ⋯
          </span>
        ) : (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                : 'text-dark-400 hover:text-dark-50 hover:bg-white/5 border border-white/5'
            }`}
          >
            {page}
          </motion.button>
        )
      )}

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-dark-400 hover:text-dark-50 hover:bg-white/5 border border-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </motion.button>
    </nav>
  );
}
