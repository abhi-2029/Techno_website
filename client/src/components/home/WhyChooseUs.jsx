/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function WhyChooseUs() {
  const points = [
    { title: 'Expert Team', desc: '15+ years of combined experience in engineering design, government compliance and bidding.' },
    { title: 'Fast Processing', desc: 'Accelerated application submission workflows to keep your files moving in departments.' },
    { title: 'Affordable Pricing', desc: 'Highly competitive and transparent pricing tables. No hidden administrative fees.' },
    { title: 'Government Approved', desc: 'Fully licensed consultancy operating strictly in compliance with government systems.' },
    { title: '24/7 Support Desk', desc: 'Round-the-clock availability for critical tender bids and query solutions.' },
    { title: 'Secure & Confidential', desc: 'Your sensitive company profile credentials, PAN, and drawings are fully encrypted and safe.' },
  ];

  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(6,182,212,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content & List */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-3">Our Edge</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
              Why Global Contractors{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Choose Us
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {points.map((pt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <CheckCircleIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{pt.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Premium Graphic/Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              
              <h4 className="text-2xl font-bold text-white mb-6">Our Mission & Value</h4>
              <p className="text-gray-300 mb-8 leading-relaxed">
                At CARD Technocrats & Engineers LLP, we bridge the gap between engineering excellence and governmental licensing compliance. We enable civil engineers and contractor firms to scale and bid for national-level infrastructure tenders seamlessly.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-medium">Compliance Rate</span>
                  <span className="text-blue-400 font-bold font-mono">100%</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-medium">Tender Win-Rate Support</span>
                  <span className="text-blue-400 font-bold font-mono">82%</span>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                  <span className="text-gray-400 text-sm font-medium">Customer Retention</span>
                  <span className="text-blue-400 font-bold font-mono">96%</span>
                </div>
              </div>
            </Card>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
