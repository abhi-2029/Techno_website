/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PhotoIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  TicketIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
  { to: '/admin', icon: HomeIcon, label: 'Dashboard', end: true },
  { to: '/admin/services', icon: Cog6ToothIcon, label: 'Services' },
  { to: '/admin/pricing', icon: CurrencyDollarIcon, label: 'Pricing' },
  { to: '/admin/blogs', icon: DocumentTextIcon, label: 'Blogs' },
  { to: '/admin/downloads', icon: ArrowDownTrayIcon, label: 'Downloads' },
  { to: '/admin/contacts', icon: EnvelopeIcon, label: 'Contacts' },
  { to: '/admin/applications', icon: ClipboardDocumentCheckIcon, label: 'Registrations' },
  { to: '/admin/bookings', icon: TicketIcon, label: 'Bookings' },
  { to: '/admin/careers', icon: BriefcaseIcon, label: 'Careers & Jobs' },
  { to: '/admin/gallery', icon: PhotoIcon, label: 'Gallery' },
  { to: '/admin/testimonials', icon: StarIcon, label: 'Testimonials' },
];

export default function AdminLayout() {
  // Local state container managing interactive view variables
  const [collapsed, setCollapsed] = useState(false);
  // Local state container managing interactive view variables
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  // Instantiates navigation controller for program routing
  const navigate = useNavigate();

  // Event controller responding to user gestures or navigation triggers
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sidebarWidth = collapsed ? 'w-20' : 'w-64';

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col ${sidebarWidth} bg-dark-900 border-r border-white/5 transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold gradient-text whitespace-nowrap"
              >
                CARD Admin
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/5 transition-colors"
          >
            {collapsed ? <ChevronRightIcon className="w-4 h-4 text-dark-400" /> : <ChevronLeftIcon className="w-4 h-4 text-dark-400" />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden">
            <XMarkIcon className="w-5 h-5 text-dark-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-400 shadow-lg shadow-primary-500/5'
                    : 'text-dark-400 hover:text-dark-50 hover:bg-white/5'
                }`
              }
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-dark-900/50 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Bars3Icon className="w-5 h-5 text-dark-400" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-sm font-semibold text-dark-400">Welcome back</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-dark-50">{user?.name || 'Admin'}</p>
              <p className="text-xs text-dark-400">{user?.email || 'admin@cardtechnocrats.com'}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
