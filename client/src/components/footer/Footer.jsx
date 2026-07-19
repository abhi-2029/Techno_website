/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Newsletter from '../common/Newsletter';

const licensingLinks = [
  { to: '/services?category=registration', label: 'CPWD Registration' },
  { to: '/services?category=registration', label: 'PWD Registration' },
  { to: '/services?category=registration', label: 'RWD Registration' },
  { to: '/services?category=registration', label: 'Railway Registration' },
];

const engineeringLinks = [
  { to: '/services?category=construction', label: 'Project Cost Estimation' },
  { to: '/services?category=construction', label: 'BOQ Preparation' },
  { to: '/services?category=construction', label: 'Billing Work & MB Entries' },
  { to: '/services?category=tender', label: 'Tender Bidding Advisory' },
];

const corporateLinks = [
  { to: '/services?category=tax', label: 'GST Filing & Services' },
  { to: '/services?category=tax', label: 'Income Tax Return (ITR)' },
  { to: '/services?category=registration', label: 'MSME Udyam Registration' },
  { to: '/services?category=registration', label: 'Startup India Recognition' },
];

const companyLinks = [
  { to: '/about', label: 'About Our LLP' },
  { to: '/pricing', label: 'Advisory Pricing' },
  { to: '/projects', label: 'Completed Projects' },
  { to: '/blog', label: 'Knowledge Blog' },
  { to: '/downloads', label: 'Document Downloads' },
  { to: '/travel-booking', label: 'Flight & Train Booking' },
  { to: '/careers', label: 'Careers at CARD' },
  { to: '/track', label: 'Track Registration' },
];

const socialLinks = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500 hover:bg-pink-500/10' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400 hover:bg-blue-400/10' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400 hover:bg-sky-400/10' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-500 hover:bg-red-500/10' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  return (
    <footer className="relative bg-[#030712] border-t border-white/10 overflow-hidden">
      {/* Premium background radial glow lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/5 to-cyan-500/0 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Pre-Footer Section: Glassmorphic Newsletter Banner */}
        <div className="pt-12 pb-8 border-b border-white/5">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/0 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center lg:text-left max-w-xl">
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1">
                  Updates & Briefings
                </span>
                <h4 className="text-xl md:text-2xl font-black text-white">Subscribe to Regulatory Briefings</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Get weekly updates on CPWD amendments, new tenders, and state registration guidelines.
                </p>
              </div>
              <div className="w-full lg:w-auto min-w-[320px] max-w-md">
                <Newsletter />
              </div>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 py-16 border-b border-white/5"
        >
          {/* Column 1: Brand Info */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="CARD Technocrats Logo" 
                className="w-10 h-10 object-contain rounded-xl bg-white/95 p-0.5 shadow-glow-blue group-hover:scale-105 transition-all duration-300"
              />
              <span className="text-base font-extrabold text-white tracking-tight">
                CARD <span className="text-blue-400">Technocrats</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              CARD Technocrats & Engineers LLP is a premier contracting consultancy delivering verified licensing solutions, technical estimations, and compliance audits for builders and contractors.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 ${social.color} hover:border-white/10 transition-all duration-300`}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Licensing Services */}
          <motion.div variants={itemVariants} className="space-y-4 lg:pl-4">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Contractor Licensing</h4>
            <ul className="space-y-3">
              {licensingLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-xs text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <ArrowRightIcon className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Engineering Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Engineering & Bidding</h4>
            <ul className="space-y-3">
              {engineeringLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-xs text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <ArrowRightIcon className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Compliance Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Compliance & Tax</h4>
            <ul className="space-y-3">
              {corporateLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-xs text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <ArrowRightIcon className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Corporate Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Company Profile</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-xs text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-1 group"
                  >
                    <ArrowRightIcon className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Corporate Address & Registry Sub-footer */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-400 border-b border-white/5">
          <div className="space-y-2 md:max-w-md">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Registered Office</h5>
            <p className="leading-relaxed">
              01, Ward No. 15, Sheohar, Post: Sheohar, Dist: Sheohar, Bihar - 843329
            </p>
            <p className="text-[10px] text-gray-500 font-mono">
              LLPIN: CARD Technocrats & Engineers LLP | GSTIN: 10AAQFC2847P1Z3
            </p>
          </div>
          <div className="space-y-2 lg:pr-20">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Advisory Hotlines</h5>
            <p className="flex flex-col gap-1 font-mono">
              <span>Mob: +91 7529993812</span>
              <span>Landline: +91 6222-796684</span>
              <span>Email: ctellp@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Bottom copyright & legal row */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} CARD Technocrats & Engineers LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center lg:pr-20">
            <Link to="/privacy" className="text-[11px] text-gray-500 hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <span className="text-white/10 text-[11px]">•</span>
            <Link to="/terms" className="text-[11px] text-gray-500 hover:text-white transition-colors duration-300">Terms of Service</Link>
            <span className="text-white/10 text-[11px]">•</span>
            <Link to="/admin/login" className="text-[11px] text-gray-500 hover:text-white transition-colors duration-300 font-semibold">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
