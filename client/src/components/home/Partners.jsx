/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function Partners() {
  const partners = [
    { name: 'CPWD', label: 'Central PWD' },
    { name: 'Railways', label: 'Indian Railways' },
    { name: 'NHAI', label: 'NHAI' },
    { name: 'PWD', label: 'State PWD' },
    { name: 'PHED', label: 'PHED Water' },
    { name: 'GeM', label: 'Govt e-Marketplace' },
    { name: 'MSME', label: 'MSME India' },
    { name: 'Startup', label: 'Startup India' },
  ];

  return (
    <section className="py-16 bg-[#030712] border-t border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
          Trusted consultancy for departments and systems including
        </p>
      </div>

      {/* Scrolling Ticker */}
      <div className="flex overflow-hidden select-none relative w-full">
        {/* Left and Right Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex flex-shrink-0 items-center justify-around gap-12 min-w-full"
        >
          {/* Double list for smooth infinite scrolling loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-8 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md text-white font-black text-lg md:text-xl font-mono tracking-wider shadow-sm hover:border-blue-500/20 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              {partner.name}
              <span className="text-[10px] text-gray-400 font-sans font-semibold tracking-normal uppercase ml-1">
                {partner.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
