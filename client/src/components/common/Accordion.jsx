/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export function AccordionItem({ title, children, isOpen, onToggle, index }) {
  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden transition-colors duration-300 hover:border-white/[0.1]">
      <button
        onClick={() => onToggle(index)}
        className="flex items-center justify-between w-full px-5 py-4 text-left group"
      >
        <span className={`text-sm font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-gray-400'
          }`}
        >
          {isOpen ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SingleAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AccordionItem
      title={title}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      index={0}
    >
      {children}
    </AccordionItem>
  );
}

export default function Accordion({ items, allowMultiple = false, title, children }) {
  if (title) {
    return <SingleAccordion title={title}>{children}</SingleAccordion>;
  }

  // Otherwise treat as a group of items
  const [openItems, setOpenItems] = useState(new Set());

  // Event controller responding to user gestures or navigation triggers
  const handleToggle = (index) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const accordionItems = items || [];

  return (
    <div className="space-y-3">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          isOpen={openItems.has(index)}
          onToggle={handleToggle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
