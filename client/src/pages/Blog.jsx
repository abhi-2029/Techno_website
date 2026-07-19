/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useBlogs } from '../hooks/useBlogs';
import BlogCard from '../components/blog/BlogCard';
import BlogSearch from '../components/blog/BlogSearch';
import Skeleton from '../components/common/Skeleton';
import Pagination from '../components/common/Pagination';

export default function Blog() {
  // Local state container managing interactive view variables
  const [page, setPage] = useState(1);
  // Local state container managing interactive view variables
  const [search, setSearch] = useState('');
  // Local state container managing interactive view variables
  const [category, setCategory] = useState('');
  // Local state container managing interactive view variables
  const [tag, setTag] = useState('');

  // Fetch blogs using react-query hook with pagination and filters
  const { data, isLoading } = useBlogs({
    page,
    limit: 6,
    search,
    category,
    tag,
  });

  const blogs = data?.data?.blogs || [];
  const pagination = data?.data?.pagination || { page: 1, pages: 1 };

  // Static options for categories & tags based on common topics
  const blogCategories = ['Guideline', 'Industry News', 'GST Update', 'Bidding Strategy', 'Compliance'];
  const blogTags = ['CPWD', 'PWD', 'GST', 'MSME', 'Tenders', 'Estimation', 'DigitalSignature'];

  return (
    <>
      <Helmet>
        <title>Blogs & Announcements | CARD Technocrats</title>
        <meta
          name="description"
          content="Read latest government contracting guides, CPWD/PWD update announcements, GST compliance news, and civil cost estimation blogs by CARD Technocrats."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Blogs & Insights</h1>
            <p className="text-gray-400 text-sm">
              Keep up with recent policy adjustments on government portals, contractor registration upgrades, GST returns schedules, and engineering guidelines.
            </p>
          </div>

          {/* Main Grid: Content + Search Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* Left: Blog posts list */}
            <div className="lg:col-span-3 space-y-8">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 space-y-4">
                      <Skeleton className="h-48 w-full rounded-xl" />
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-16" />
                    </div>
                  ))}
                </div>
              ) : blogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((post) => (
                      <BlogCard key={post._id} blog={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="pt-6">
                      <Pagination
                        currentPage={page}
                        totalPages={pagination.pages}
                        onPageChange={setPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white/5 border border-white/5 rounded-2xl">
                  <p className="text-gray-500 font-semibold">No articles match your query.</p>
                </div>
              )}
            </div>

            {/* Right: Search Sidebar */}
            <aside className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl space-y-6">
              <BlogSearch
                searchQuery={search}
                onSearchChange={(q) => {
                  setSearch(q);
                  setPage(1);
                }}
                activeCategory={category}
                onCategoryChange={(c) => {
                  setCategory(c);
                  setPage(1);
                }}
                categories={blogCategories}
                activeTag={tag}
                onTagChange={(t) => {
                  setTag(t);
                  setPage(1);
                }}
                tags={blogTags}
              />
            </aside>

          </div>

        </div>
      </main>
    </>
  );
}
