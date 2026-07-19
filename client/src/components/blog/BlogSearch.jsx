/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import SearchBar from '../common/SearchBar';

export default function BlogSearch({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories = [],
  activeTag,
  onTagChange,
  tags = [],
}) {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search articles, announcements & guides..."
        />
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div>
          <h5 className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-3">Categories</h5>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange('')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                activeCategory === ''
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags Cloud */}
      {tags.length > 0 && (
        <div>
          <h5 className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-3">Popular Tags</h5>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTagChange('')}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-300 ${
                activeTag === ''
                  ? 'bg-cyan-600 border-cyan-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              All Tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagChange(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-cyan-600 border-cyan-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
