/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40',
  secondary: 'glass text-dark-50 hover:bg-white/10 hover:border-white/20',
  ghost: 'bg-transparent text-dark-300 hover:text-dark-50 hover:bg-white/5',
  danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25',
  success: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10',
};

const sizes = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon: Icon,
    iconRight: IconRight,
    className = '',
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={disabled || loading ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg
          className="absolute animate-spin w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <span className={`flex items-center gap-inherit ${loading ? 'invisible' : ''}`}>
        {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
        {children}
        {IconRight && <IconRight className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      </span>
    </motion.button>
  );
});

export default Button;
