/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useSubscribe } from '../../hooks/useNewsletter';

export default function Newsletter() {
  // Local state container managing interactive view variables
  const [email, setEmail] = useState('');
  const subscribe = useSubscribe();

  // Event controller responding to user gestures or navigation triggers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await subscribe.mutateAsync({ email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Failed to subscribe');
    }
  };

  return (
    <div>
      <h5 className="text-xs font-semibold uppercase tracking-widest text-dark-300 mb-3">Newsletter</h5>
      <p className="text-xs text-dark-500 mb-3">Get the latest updates and insights.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs text-dark-50 placeholder-dark-500 bg-white/[0.03] border border-white/[0.08] focus:border-primary-500/50 outline-none transition-all duration-300"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={subscribe.isPending}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 transition-all duration-300 flex-shrink-0"
        >
          {subscribe.isPending ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            'Subscribe'
          )}
        </motion.button>
      </form>
    </div>
  );
}
