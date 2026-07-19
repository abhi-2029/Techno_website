/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchBar({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  debounceMs = 400,
  className = '',
}) {
  // Local state container managing interactive view variables
  const [internalValue, setInternalValue] = useState(controlledValue || '');
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const debouncedChange = useCallback(
    (val) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onChange?.(val);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  // Lifecycle hook mapping automated side-effects on parameter changes
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Event controller responding to user gestures or navigation triggers
  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    debouncedChange(val);
  };

  // Event controller responding to user gestures or navigation triggers
  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  // Event controller responding to user gestures or navigation triggers
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (timerRef.current) clearTimeout(timerRef.current);
      onSearch?.(currentValue);
      onChange?.(currentValue);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <MagnifyingGlassIcon className="w-4 h-4 text-dark-500 group-focus-within:text-primary-400 transition-colors duration-300" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-dark-50 placeholder-dark-500 bg-white/[0.03] border border-white/[0.08] focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 hover:border-white/[0.15] transition-all duration-300 outline-none"
      />
      <AnimatePresence>
        {currentValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/5 text-dark-500 hover:text-dark-300 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
