/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] pt-24 pb-16">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.1),transparent_60%)]" />
        
        {/* Animated shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none"
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-sm text-blue-400 font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
            Empowering Infrastructure & Enterprise
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            CARD Technocrats &{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Engineers LLP
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
            Professional Consultancy for Government Registrations, Tender Filing, Project Reports, 
            BOQ Preparation, GST, MSME, GeM Registration, Digital Signature, and Contractor Registration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/apply">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4 font-semibold text-base">
                Apply Now
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-4 font-semibold text-base">
                View Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-400 cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight - 80,
              behavior: 'smooth'
            });
          }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Explore</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
