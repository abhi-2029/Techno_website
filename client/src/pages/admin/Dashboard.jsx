/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import DashboardStats from '../../components/admin/DashboardStats';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  // Fetch dashboard stats using react-query
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/analytics/stats').then((res) => res.data),
  });

  const stats = data?.data?.stats || {};
  const recentContacts = data?.data?.recentContacts || [];
  const popularServices = data?.data?.popularServices || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-500 text-xs mt-1">
          Welcome to the CARD Technocrats admin workspace. Here is a summary of your site's metrics.
        </p>
      </div>

      {/* Stats Counter Panels */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : (
        <DashboardStats stats={stats} />
      )}

      {/* Grid: Recent Inquiries + Popular Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Inquiries List */}
        <Card className="lg:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                Recent Contact Inquiries
              </h3>
              <Link to="/admin/contacts" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                View All
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-12 rounded-xl" />
                ))}
              </div>
            ) : recentContacts.length > 0 ? (
              <div className="divide-y divide-white/5 space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact._id} className="pt-4 first:pt-0 flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">{contact.name}</h4>
                      <p className="text-xs text-gray-500">{contact.subject}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">"{contact.message}"</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 block">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                      {!contact.isRead && (
                        <span className="inline-block mt-1 text-[8px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-sm font-semibold">
                No recent contact messages found.
              </div>
            )}
          </div>
        </Card>

        {/* Popular Services Quick View */}
        <Card className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Featured Services</h3>
            
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-10 rounded-xl" />
                ))}
              </div>
            ) : popularServices.length > 0 ? (
              <div className="space-y-3">
                {popularServices.map((svc) => (
                  <div key={svc._id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-white">{svc.title}</h4>
                      <p className="text-[9px] text-gray-500 line-clamp-1">{svc.shortDescription}</p>
                    </div>
                    <Link to={`/services/${svc.slug}`} target="_blank" className="text-xs text-blue-400 hover:text-white">
                      →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-sm">
                No services configured.
              </div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
