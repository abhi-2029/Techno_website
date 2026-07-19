/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestimonials } from '../../hooks/useTestimonials';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Testimonials() {
  const { data, isLoading } = useTestimonials();
  const testimonials = data?.data?.testimonials || [];
  // Local state container managing interactive view variables
  const [activeIndex, setActiveIndex] = useState(0);

  // Event controller responding to user gestures or navigation triggers
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Event controller responding to user gestures or navigation triggers
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-[#0b0f1e] text-white">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/3 mx-auto mb-8 rounded-lg" />
          <Skeleton className="h-64 max-w-2xl mx-auto rounded-2xl" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#0b0f1e] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Loved by Leading{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Contractors & Enterprises
            </span>
          </h3>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card className="p-8 md:p-12 bg-white/5 border border-white/10 backdrop-blur-xl relative">
                  <div className="absolute -top-6 left-12 text-6xl text-blue-500/20 font-serif">“</div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500 mb-6">
                    {Array.from({ length: testimonials[activeIndex].rating || 5 }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-xl text-gray-300 italic mb-8 leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </p>

                  {/* Profile info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[activeIndex].avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'}
                      alt={testimonials[activeIndex].name}
                      className="w-14 h-14 rounded-full border-2 border-blue-500/30 object-cover"
                    />
                    <div>
                      <h5 className="text-lg font-bold text-white">
                        {testimonials[activeIndex].name}
                      </h5>
                      <p className="text-sm text-gray-400">
                        {testimonials[activeIndex].role}, <span className="text-blue-400 font-semibold">{testimonials[activeIndex].company}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-4">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-blue-500' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
