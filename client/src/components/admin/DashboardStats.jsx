/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import {
  BriefcaseIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ArrowDownTrayIcon,
  UsersIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function DashboardStats({ stats = {} }) {
  const statCards = [
    {
      label: 'Active Services',
      value: stats.services || 0,
      icon: BriefcaseIcon,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
      path: '/admin/services',
    },
    {
      label: 'Published Blogs',
      value: stats.blogs || 0,
      icon: DocumentTextIcon,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40',
      path: '/admin/blogs',
    },
    {
      label: 'Unread / Total Messages',
      value: `${stats.contacts?.unread || 0} / ${stats.contacts?.total || 0}`,
      icon: EnvelopeIcon,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40',
      path: '/admin/contacts',
    },
    {
      label: 'Download Files',
      value: stats.downloads || 0,
      icon: ArrowDownTrayIcon,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40',
      path: '/admin/downloads',
    },
    {
      label: 'Newsletter Subscribers',
      value: stats.subscribers || 0,
      icon: UsersIcon,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      label: 'Gallery Projects',
      value: stats.gallery || 0,
      icon: PhotoIcon,
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20 hover:border-pink-500/40',
      path: '/admin/gallery',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials || 0,
      icon: ChatBubbleLeftRightIcon,
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20 hover:border-teal-500/40',
      path: '/admin/testimonials',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const CardElement = (
          <Card className={`p-6 bg-white/5 border border-white/10 flex items-center justify-between h-full transition-all duration-300 ${card.path ? 'cursor-pointer hover:bg-white/[0.08] hover:border-white/20' : ''}`}>
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {card.label}
              </span>
              <h4 className="text-2xl md:text-3xl font-black text-white font-mono">
                {card.value}
              </h4>
            </div>
            
            {/* Round Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${card.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </Card>
        );

        if (card.path) {
          return (
            <Link key={index} to={card.path} className="block h-full">
              {CardElement}
            </Link>
          );
        }

        return <div key={index}>{CardElement}</div>;
      })}
    </div>
  );
}
