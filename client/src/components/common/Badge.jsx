/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

const colorMap = {
  primary: 'bg-primary-500/15 text-primary-400 border-primary-500/20',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  danger: 'bg-red-500/15 text-red-400 border-red-500/20',
  info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  neutral: 'bg-white/5 text-dark-300 border-white/10',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({ children, variant = 'primary', size = 'md', dot = false, className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full border
        ${colorMap[variant]}
        ${sizeMap[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'primary' ? 'bg-primary-400' :
          variant === 'success' ? 'bg-emerald-400' :
          variant === 'warning' ? 'bg-amber-400' :
          variant === 'danger' ? 'bg-red-400' :
          variant === 'info' ? 'bg-cyan-400' :
          'bg-dark-400'
        }`} />
      )}
      {children}
    </span>
  );
}
