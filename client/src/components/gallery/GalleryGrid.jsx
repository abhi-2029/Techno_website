/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card';
import LazyImage from '../common/LazyImage';
import Modal from '../common/Modal';
import { PlayIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function GalleryGrid({ items = [] }) {
  // Local state container managing interactive view variables
  const [activeMedia, setActiveMedia] = useState(null); // { url, type, title, description }

  // Event controller responding to user gestures or navigation triggers
  const handleOpenLightbox = (item, mediaUrl, type) => {
    setActiveMedia({
      url: mediaUrl,
      type,
      title: item.title,
      description: item.description,
      location: item.location,
      date: item.completionDate,
    });
  };

  const formattedDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div>
      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="overflow-hidden bg-white/5 border border-white/10 group hover:border-blue-500/20 backdrop-blur-xl transition-all duration-300">
              
              {/* Image/Video Showcase Container */}
              <div className="h-64 overflow-hidden relative">
                {/* Check if there are videos first, otherwise show first image */}
                {item.videos && item.videos.length > 0 ? (
                  <div
                    onClick={() => handleOpenLightbox(item, item.videos[0].url, 'video')}
                    className="w-full h-full cursor-pointer relative"
                  >
                    <LazyImage
                      src={item.videos[0].thumbnail || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600'}
                      alt={item.title}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/45 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <PlayIcon className="w-8 h-8 ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  item.images && item.images.length > 0 && (
                    <div
                      onClick={() => handleOpenLightbox(item, item.images[0].url, 'image')}
                      className="w-full h-full cursor-pointer"
                    >
                      <LazyImage
                        src={item.images[0].url}
                        alt={item.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )
                )}

                {/* Project Category Tag */}
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#030712]/80 backdrop-blur-md text-blue-400 border border-blue-500/30">
                  {item.projectType}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {item.description}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                  {item.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-blue-500" />
                      {item.location}
                    </div>
                  )}
                  {item.completionDate && (
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-blue-500" />
                      {formattedDate(item.completionDate)}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeMedia && (
          <Modal
            isOpen={!!activeMedia}
            onClose={() => setActiveMedia(null)}
            title={activeMedia.title}
          >
            <div className="space-y-6">
              {/* Media viewer */}
              <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
                {activeMedia.type === 'video' ? (
                  <iframe
                    src={activeMedia.url.replace('watch?v=', 'embed/')}
                    title={activeMedia.title}
                    className="w-full h-full border-none"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="max-h-[70vh] max-w-full object-contain"
                  />
                )}
              </div>

              {/* Metadata & Description */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {activeMedia.description}
                </p>

                <div className="flex flex-wrap gap-6 text-xs text-gray-400 font-semibold border-t border-white/10 pt-4">
                  {activeMedia.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPinIcon className="w-4.5 h-4.5 text-blue-500" />
                      Location: {activeMedia.location}
                    </div>
                  )}
                  {activeMedia.date && (
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-4.5 h-4.5 text-blue-500" />
                      Completed: {formattedDate(activeMedia.date)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
