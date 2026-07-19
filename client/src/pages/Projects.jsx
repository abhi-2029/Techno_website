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
import { useGallery } from '../hooks/useGallery';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Skeleton from '../components/common/Skeleton';

export default function Projects() {
  const { data, isLoading } = useGallery();
  const galleryItems = data?.data?.gallery || [];
  // Local state container managing interactive view variables
  const [activeTab, setActiveTab] = useState('All');

  // Extract unique project types for filter tabs
  const projectTypes = useMemo(() => {
    const types = new Set(galleryItems.map((item) => item.projectType));
    return ['All', ...Array.from(types)];
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return galleryItems;
    return galleryItems.filter((item) => item.projectType === activeTab);
  }, [galleryItems, activeTab]);

  return (
    <>
      <Helmet>
        <title>Completed Projects Gallery | CARD Technocrats</title>
        <meta
          name="description"
          content="View photographs and video recordings of our successfully executed engineering designs, billing projects, and sites completed by CARD Technocrats & Engineers LLP."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Completed Projects</h1>
            <p className="text-gray-400 text-sm">
              Take a visual tour of the construction sites, structural engineering cost sheets, and project reports successfully delivered to our municipal and corporate clients.
            </p>
          </div>

          {/* Filter Tabs */}
          {projectTypes.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    activeTab === type
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-10" />
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <GalleryGrid items={filteredItems} />
          ) : (
            <div className="text-center py-16 bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-gray-500 font-semibold">No project gallery entries found.</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
