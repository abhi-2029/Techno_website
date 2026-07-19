/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useServices } from '../hooks/useServices';
import ServiceCard from '../components/services/ServiceCard';
import ServiceFilter from '../components/services/ServiceFilter';
import ServiceDetailPanel from '../components/services/ServiceDetailPanel';
import SlidePanel from '../components/common/SlidePanel';
import SearchBar from '../components/common/SearchBar';
import Skeleton from '../components/common/Skeleton';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const categories = [
  { name: 'All Services', slug: 'all' },
  { name: 'Registrations', slug: 'registration' },
  { name: 'Tenders', slug: 'tender' },
  { name: 'Tax & Filings', slug: 'tax' },
  { name: 'Construction Engineering', slug: 'construction' },
  { name: 'Government Portals', slug: 'government' },
  { name: 'Others', slug: 'others' },
];

export default function Services() {
  const { data, isLoading } = useServices({ limit: 100 }); // Get all services
  const services = data?.data?.services || [];

  // Local state container managing interactive view variables
  const [activeCategory, setActiveCategory] = useState('all');
  // Local state container managing interactive view variables
  const [searchQuery, setSearchQuery] = useState('');
  // Local state container managing interactive view variables
  const [selectedService, setSelectedService] = useState(null);

  // Client-side instant filter and search
  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchCategory =
        activeCategory === 'all' ||
        svc.category?.slug === activeCategory ||
        svc.categoryName?.toLowerCase() === activeCategory; // fallback
      
      const matchSearch =
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [services, activeCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Our Services | CARD Technocrats & Engineers LLP</title>
        <meta
          name="description"
          content="Explore the full catalog of engineering designs and licensing services offered by CARD Technocrats. Contractor licensing, GeM setup, ITR, GST, and project cost sheets."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Our Services Catalog</h1>
            <p className="text-gray-400 text-sm">
              Search and filter through all our registrations, bidding supports, and engineering design operations. Click on any service card to view complete documentation, pricing and fees details.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search CPWD, GeM, ITR, BOQ etc..."
            />
            <ServiceFilter
              activeCategory={activeCategory}
              categories={categories}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Travel Booking Highlight Banner */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-transparent p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Partner Services
              </span>
              <h3 className="text-xl font-bold text-white">Flight & Train Ticket Booking</h3>
              <p className="text-xs text-gray-400 max-w-xl">
                Book passenger seats instantly with automated GDS airline clearance and train seat reservations for your site inspections and client travels.
              </p>
            </div>
            <Link to="/travel-booking" className="w-full md:w-auto flex-shrink-0">
              <Button variant="primary" className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 shadow-glow-blue flex items-center justify-center gap-1.5">
                Book Tickets Now &rarr;
              </Button>
            </Link>
          </div>

          {/* Services Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((svc) => (
                <ServiceCard
                  key={svc._id}
                  service={svc}
                  onLearnMore={setSelectedService}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-gray-500 font-semibold text-lg mb-2">No services match your filters</p>
              <p className="text-sm text-gray-600">Try adjusting your search query or switching categories</p>
            </div>
          )}
        </div>
      </main>

      {/* Slide Out Panel for Details */}
      <SlidePanel
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title="Service Details"
      >
        <ServiceDetailPanel
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      </SlidePanel>
    </>
  );
}
