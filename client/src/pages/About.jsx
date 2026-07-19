/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Leadership from '../components/common/Leadership';
import {
  ShieldCheckIcon,
  CpuChipIcon,
  ClockIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function About() {
  const leadership = [
    {
      name: 'Er. Himanshu Kaushal',
      role: 'Managing Partner & Principal Engineer',
      bio: 'Civil Engineer with over 12 years of hands-on expertise in public infrastructure designs, government bid advisory, and Schedule of Rates (SOR) cost estimations.',
      credentials: 'B.Tech in Civil Engineering',
      initials: 'HK',
      phone: '+91 7529993812',
      email: 'ctellp@gmail.com'
    }
  ];

  const pillars = [
    {
      title: 'Regulatory Compliance',
      description: 'Navigating government portals requires strict legal adherence. We ensure all registrations (CPWD, PWD, Railway) are flawless, avoiding query cycles or rejections.',
      icon: ShieldCheckIcon
    },
    {
      // Tech precision
      title: 'Technical Accuracy',
      description: 'Our civil cost sheets, BBS schedules, and BOQ preparations are engineered to standard specifications (SOR/DSR), preventing cost overruns in live execution.',
      icon: CpuChipIcon
    },
    {
      title: 'Time-Bound Delivery',
      description: 'Tenders have tight deadlines. We prioritize fast-tracked preparation, secure DSC setups, and rapid application processing to keep you ahead.',
      icon: ClockIcon
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | CARD Technocrats & Engineers LLP</title>
        <meta
          name="description"
          content="Learn about CARD Technocrats & Engineers LLP. Discover our leadership, corporate registry coordinates, core pillars of compliance, and engineering milestones."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-24 max-w-6xl">
          
          {/* Corporate Header */}
          <section className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-28 h-28 rounded-3xl bg-white/90 p-1.5 border border-white/20 shadow-xl shadow-blue-500/10 mx-auto flex items-center justify-center"
            >
              <img 
                src="/logo.png" 
                alt="CARD Technocrats & Engineers LLP Logo" 
                className="w-full h-full object-contain rounded-2xl"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black leading-tight"
            >
              Corporate{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Profile
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed"
            >
              CARD Technocrats & Engineers LLP is a registered Limited Liability Partnership specializing in licensing compliance, engineering estimates, and government bidding solutions.
            </motion.p>
          </section>

          {/* Legal Registry Bento Grid */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest text-center">Company Registry Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Card className="p-6 bg-white/5 border border-white/10 flex items-start gap-4 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <BuildingOffice2Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Entity Name</h4>
                  <p className="text-sm text-white font-bold">CARD Technocrats & Engineers LLP</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">Registered LLP (Ministry of Corporate Affairs)</span>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 border border-white/10 flex items-start gap-4 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <IdentificationIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Taxation ID (GSTIN)</h4>
                  <p className="text-sm text-white font-mono font-bold">10AAQFC2847P1Z3</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">Registered under State of Bihar (GST Act)</span>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 border border-white/10 flex items-start gap-4 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Registered Office</h4>
                  <p className="text-sm text-white font-bold">01, Ward No. 15, Sheohar, Bihar - 843329</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">Main Operations & Liaison Hub</span>
                </div>
              </Card>

            </div>
          </section>

          {/* Core Values / Pillars */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-2">Our Pillars</h2>
              <h3 className="text-3xl font-bold text-white">How We Maintain Quality</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <Card key={idx} className="p-6 bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3">{pillar.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* CEO Vision Spotlight Section */}
          {/* <Leadership /> */}

          {/* Executive Leadership Team Section */}
          <section className="space-y-12 max-w-4xl mx-auto pb-12">
            <div className="text-center">
              <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase mb-2">Administration</h2>
              <h3 className="text-3xl font-bold text-white">Managing Partners</h3>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {leadership.map((leader, index) => (
                <Card key={index} className="p-8 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-8">
                  {/* Left Side: Photo or initials */}
                  {leader.image ? (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-white/10 overflow-hidden flex-shrink-0 shadow-lg shadow-blue-500/5">
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover object-top" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center text-blue-400 font-black text-3xl md:text-4xl flex-shrink-0 select-none">
                      {leader.initials}
                      <span className="text-[9px] uppercase tracking-wider font-semibold mt-1">Engineer</span>
                    </div>
                  )}
                  {/* Right Side: Details */}
                  <div className="space-y-4 text-center md:text-left flex-1">
                    <div>
                      <h4 className="text-2xl font-black text-white">{leader.name}</h4>
                      <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-1">{leader.role}</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">{leader.credentials}</div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {leader.bio}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                      <a href={`tel:${leader.phone}`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                        <PhoneIcon className="w-4 h-4 text-blue-500" />
                        {leader.phone}
                      </a>
                      <a href={`mailto:${leader.email}`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                        <EnvelopeIcon className="w-4 h-4 text-blue-500" />
                        {leader.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
