/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';

export default function CTABanner() {
  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4">
        {/* Sleek, premium dark bento-box panel with backdrop blur and cyan lights */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] py-16 px-8 md:px-16 text-center shadow-2xl backdrop-blur-3xl">
          
          {/* Subtle cyan and purple background glow spotlights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Accelerate Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Business Growth?
              </span>
            </h3>
            
            <p className="text-sm md:text-base text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Consult with CARD Technocrats & Engineers LLP today. Get expert support on contractor registration, GeM catalogue listing, accurate cost estimates, and high-value tender bidding.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+917529993812" className="w-full sm:w-auto">
                {/* Premium gradient primary button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 inline-flex items-center justify-center text-sm transition-all duration-300 gap-2"
                >
                  📞 Call Support Now
                </motion.button>
              </a>
              <a
                href="https://wa.me/917529993812"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                {/* Sleek glass secondary button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center text-sm"
                >
                  Chat on WhatsApp
                </motion.button>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
