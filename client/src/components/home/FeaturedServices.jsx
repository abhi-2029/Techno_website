/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import * as HeroIcons from '@heroicons/react/24/outline';

// Helper to render icons or fallback
function ServiceIcon({ name }) {
  const IconComponent = HeroIcons[name + 'Icon'] || HeroIcons.DocumentTextIcon;
  return <IconComponent className="w-8 h-8 text-blue-500" />;
}

export default function FeaturedServices() {
  const { data, isLoading } = useServices({ limit: 6 });
  const services = data?.data?.services || [];

  return (
    <section className="py-24 bg-[#0b0f1e] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.05),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-3">Our Offerings</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Comprehensive Consultancy{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                For Your Enterprise
              </span>
            </h3>
          </div>
          <Link to="/services" className="mt-4 md:mt-0">
            <button className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center group transition-all duration-300">
              View All Services
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
              ))
            : services.map((svc, index) => (
                <motion.div
                  key={svc._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/services/${svc.slug}`} className="block h-full">
                    <Card className="h-full flex flex-col justify-between p-8 group cursor-pointer hover:bg-white/[0.08] transition-colors duration-300">
                      <div>
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <ServiceIcon name={svc.icon} />
                        </div>
                        
                        {/* Title */}
                        <h4 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                          {svc.title}
                        </h4>
                        
                        {/* Category Badge */}
                        <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                          {svc.category?.name || 'Consultancy'}
                        </span>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                          {svc.shortDescription}
                        </p>
                      </div>

                      <div className="text-blue-400 group-hover:text-white flex items-center gap-1 font-semibold text-sm transition-colors duration-300">
                        Learn More
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
