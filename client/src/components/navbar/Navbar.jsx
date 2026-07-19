/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    label: 'Services',
    children: [
      { to: '/services', label: 'All Services' },
      { to: '/tender-services', label: 'Tender Services' },
      { to: '/registration-services', label: 'Registration Services' },
      { to: '/travel-booking', label: 'Flight & Train Booking' },
    ],
  },
  {to: '/pricing', label: 'Pricing' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/track', label: 'Track Status' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  // Local state container managing interactive view variables
  const [scrolled, setScrolled] = useState(false);
  // Local state container managing interactive view variables
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const { user, logout } = useAuth();

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  /* Close dropdown on outside click */
  useEffect(() => {
    // Event controller responding to user gestures or navigation triggers
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? 'text-primary-400' : 'text-dark-300 hover:text-dark-50'
    }`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-950/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img 
                src="/logo.png" 
                alt="CARD Technocrats Logo" 
                className="w-10 h-10 object-contain rounded-xl bg-white/90 p-0.5 shadow-glow-blue group-hover:scale-105 transition-all duration-300"
              />
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-dark-50 tracking-tight">
                  CARD <span className="gradient-text">Technocrats</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-white/5 ${
                        location.pathname.startsWith('/services') || 
                        location.pathname.startsWith('/tender') || 
                        location.pathname.startsWith('/registration') ||
                        location.pathname.startsWith('/travel-booking')
                          ? 'text-primary-400'
                          : 'text-dark-300 hover:text-dark-50'
                      }`}
                    >
                      {link.label}
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 py-2 rounded-2xl glass shadow-2xl shadow-black/20"
                        >
                          {link.children.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={() => setDropdownOpen(false)}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm transition-all duration-200 ${
                                  isActive
                                    ? 'text-primary-400 bg-primary-500/10'
                                    : 'text-dark-300 hover:text-dark-50 hover:bg-white/5'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/5 ${
                        isActive ? 'text-primary-400' : 'text-dark-300 hover:text-dark-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">


              {/* CTA Button */}
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
              </Link>
              {/* Auth Logic */}
              {user ? (
                <div className="relative hidden sm:block" ref={userDropdownRef}>
                  <button 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        className="absolute right-0 top-full mt-2 w-48 py-2 rounded-2xl glass shadow-2xl shadow-black/20"
                      >
                        <div className="px-4 py-2 border-b border-white/10 mb-2">
                          <div className="text-sm font-bold text-white truncate">{user.name}</div>
                          <div className="text-xs text-gray-400 truncate">{user.email}</div>
                        </div>
                        <Link 
                          to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                        >
                          <UserCircleIcon className="w-4 h-4" />
                          {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                        </Link>
                        <button 
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors mt-1"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              )}

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Open menu"
              >
                <Bars3Icon className="w-5 h-5 text-dark-50" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-dark-950/95 backdrop-blur-2xl border-l border-white/5 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
                  <span className="text-lg font-bold gradient-text">Menu</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileOpen(false)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-dark-400" />
                  </motion.button>
                </div>

                {/* Mobile links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                  {navLinks.map((link, i) =>
                    link.children ? (
                      <div key={link.label} className="space-y-1">
                        <p className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-dark-500">
                          {link.label}
                        </p>
                        {link.children.map((child) => (
                          <motion.div
                            key={child.to}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? 'text-primary-400 bg-primary-500/10'
                                    : 'text-dark-300 hover:text-dark-50 hover:bg-white/5'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <NavLink
                          to={link.to}
                          className={({ isActive }) =>
                            `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? 'text-primary-400 bg-primary-500/10'
                                : 'text-dark-300 hover:text-dark-50 hover:bg-white/5'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </motion.div>
                    )
                  )}
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-white/5">
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>
                    <button className="w-full py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
