/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const { logout, user } = useAuth();
  // Instantiates navigation controller for program routing
  const navigate = useNavigate();

  // Event controller responding to user gestures or navigation triggers
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboardIcon },
    { name: 'Services', to: '/admin/services', icon: BriefcaseIcon },
    { name: 'Pricing', to: '/admin/pricing', icon: CurrencyRupeeIcon },
    { name: 'Blogs', to: '/admin/blogs', icon: DocumentTextIcon },
    { name: 'Downloads', to: '/admin/downloads', icon: ArrowDownTrayIcon },
    { name: 'Contacts', to: '/admin/contacts', icon: EnvelopeIcon },
    { name: 'Gallery', to: '/admin/gallery', icon: PhotoIcon },
    { name: 'Testimonials', to: '/admin/testimonials', icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-white/10 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white">
            C
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-none">CARD Admin</h4>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Management Portal
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 mx-4 my-6 bg-white/5 rounded-xl border border-white/5">
          <div className="text-xs text-gray-400 font-medium">Logged in as:</div>
          <div className="text-sm font-bold text-white truncate">{user?.name || 'Administrator'}</div>
          <div className="text-[10px] text-blue-400 font-mono mt-0.5">{user?.email}</div>
        </div>

        {/* Navigation List */}
        <nav className="px-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
