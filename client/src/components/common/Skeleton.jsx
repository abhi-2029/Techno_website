/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

const variants = {
  text: 'h-4 rounded-md',
  heading: 'h-8 rounded-lg w-3/4',
  image: 'h-48 rounded-2xl',
  avatar: 'h-12 w-12 rounded-full',
  card: 'h-64 rounded-2xl',
  'table-row': 'h-12 rounded-lg',
  button: 'h-10 w-32 rounded-xl',
};

export default function Skeleton({ variant = 'text', count = 1, className = '', width }) {
  const elements = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {elements.map((i) => (
        <div
          key={i}
          className={`shimmer ${variants[variant]} ${className}`}
          style={width ? { width } : undefined}
        />
      ))}
    </>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <Skeleton variant="image" />
      <Skeleton variant="heading" />
      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Skeleton variant="avatar" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="25%" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} variant="table-row" className="w-full" />
      ))}
    </div>
  );
}
