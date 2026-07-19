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
import { useDownloads, useIncrementDownload } from '../hooks/useDownloads';
import Card from '../components/common/Card';
import Skeleton from '../components/common/Skeleton';
import Button from '../components/common/Button';
import { ArrowDownTrayIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function Downloads() {
  const { data, isLoading } = useDownloads();
  const downloads = data?.data?.downloads || [];
  const incrementMutation = useIncrementDownload();
  // Local state container managing interactive view variables
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { name: 'All Files', slug: 'all' },
    { name: 'Tender Forms', slug: 'tender-forms' },
    { name: 'Application Forms', slug: 'application-forms' },
    { name: 'Brochures', slug: 'brochures' },
    { name: 'Others', slug: 'others' },
  ];

  const filteredDownloads = useMemo(() => {
    if (activeCategory === 'all') return downloads;
    return downloads.filter((dl) => dl.category === activeCategory);
  }, [downloads, activeCategory]);

  // Event controller responding to user gestures or navigation triggers
  const handleDownload = (dl) => {
    // Increment download counter
    incrementMutation.mutate(dl._id);
    
    // Trigger file download in browser
    window.open(dl.fileUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Downloads | CARD Technocrats & Engineers LLP</title>
        <meta
          name="description"
          content="Download official tender documents, government application forms, guidelines checklists, and CARD Technocrats corporate brochures."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Downloads Center</h1>
            <p className="text-gray-400 text-sm">
              Get access to standardized tender formats, state public works application templates, checklists, guidelines documentation, and company brochures.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 ${
                  activeCategory === cat.slug
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid list of downloads */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-12" />
                </div>
              ))}
            </div>
          ) : filteredDownloads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDownloads.map((dl) => (
                <Card
                  key={dl._id}
                  className="p-6 bg-white/5 border border-white/10 flex flex-col justify-between h-full hover:border-blue-500/20 backdrop-blur-xl group transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* File Icon */}
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <DocumentArrowDownIcon className="w-7 h-7" />
                    </div>

                    {/* Meta info */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 leading-snug truncate">
                        {dl.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                        {dl.description || 'No description provided.'}
                      </p>
                    </div>
                  </div>

                  {/* Size & Download CTA */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="text-gray-500 font-mono">
                      {dl.fileSize || 'N/A'} • {dl.downloadCount || 0} DLs
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(dl)}
                      className="text-blue-400 hover:text-white p-0 flex items-center gap-1 font-bold"
                    >
                      Download File
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-gray-500 font-semibold text-base">No downloadable files found in this category.</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
