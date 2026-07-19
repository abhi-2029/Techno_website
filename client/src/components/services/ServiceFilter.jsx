/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';

export default function ServiceFilter({ activeCategory, categories, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center pb-8">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelectCategory(cat.slug)}
          className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${
            activeCategory === cat.slug
              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
