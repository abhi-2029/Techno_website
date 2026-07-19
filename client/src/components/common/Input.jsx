/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    icon: Icon,
    type = 'text',
    className = '',
    containerClassName = '',
    ...props
  },
  ref
) {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="w-4 h-4 text-dark-500" />
          </div>
        )}
        <Component
          ref={ref}
          type={isTextarea ? undefined : type}
          rows={isTextarea ? 4 : undefined}
          className={`
            w-full rounded-xl text-sm text-dark-50 placeholder-dark-500
            bg-white/[0.03] border transition-all duration-300 outline-none
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${isTextarea ? 'py-3 resize-none' : 'py-3'}
            ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-white/[0.08] focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 hover:border-white/[0.15]'
            }
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
