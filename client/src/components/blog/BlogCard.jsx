/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import LazyImage from '../common/LazyImage';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col justify-between overflow-hidden bg-white/5 border border-white/10 group hover:border-blue-500/20 backdrop-blur-xl transition-all duration-300">
      <div>
        {/* Cover Image */}
        <Link to={`/blog/${blog.slug}`}>
          <div className="h-48 overflow-hidden relative">
            <LazyImage
              src={blog.coverImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'}
              alt={blog.title}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {blog.category && (
              <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#030712]/80 backdrop-blur-md text-blue-400 border border-blue-500/30">
                {blog.category}
              </span>
            )}
          </div>
        </Link>

        {/* Info Content */}
        <div className="p-6">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4 text-blue-500" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-blue-500" />
              5 min read
            </div>
          </div>

          {/* Title */}
          <Link to={`/blog/${blog.slug}`}>
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {blog.title}
            </h4>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 150) + '...'}
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="p-6 pt-0">
        <Link
          to={`/blog/${blog.slug}`}
          className="text-xs font-bold text-blue-400 hover:text-white flex items-center gap-1 group-hover:underline"
        >
          Read Full Article
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </Card>
  );
}
