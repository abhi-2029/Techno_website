/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-6">
        <h1 className="text-[120px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 leading-none">
          404
        </h1>
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
        The page you are trying to find doesn't exist, has been removed or is temporarily unavailable.
      </p>

      <Link to="/">
        <Button variant="primary" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg">
          Back to Home
        </Button>
      </Link>
    </main>
  );
}
