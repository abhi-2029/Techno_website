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
import ServiceDetailPanel from '../components/services/ServiceDetailPanel';
import SlidePanel from '../components/common/SlidePanel';
import Skeleton from '../components/common/Skeleton';

export default function RegistrationServices() {
  const { data, isLoading } = useServices({ limit: 100 });
  const services = data?.data?.services || [];
  // Local state container managing interactive view variables
  const [selectedService, setSelectedService] = useState(null);

  // Filter only Registration category items
  const registrationServices = useMemo(() => {
    return services.filter(
      (svc) =>
        svc.category?.slug === 'registration' ||
        svc.categoryName?.toLowerCase() === 'registration'
    );
  }, [services]);

  return (
    <>
      <Helmet>
        <title>Government Contractor & Business Registrations | CARD Technocrats</title>
        <meta
          name="description"
          content="Obtain central and state registrations for contractors. Expert consulting for CPWD, PWD, RWD, PHED, MSME, Startup India and local municipal classifications."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black">Registrations Consultancy</h1>
            <p className="text-gray-400 text-sm">
              We compile documentation, handle portal submissions and coordinate departments follow-up for CPWD, PWD, Indian Railways, Startup India, and corporate business licensing.
            </p>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-20" />
                </div>
              ))}
            </div>
          ) : registrationServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {registrationServices.map((svc) => (
                <ServiceCard
                  key={svc._id}
                  service={svc}
                  onLearnMore={setSelectedService}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 font-semibold bg-white/5 rounded-2xl border border-white/5">
              No registration services listed.
            </div>
          )}

        </div>
      </main>

      {/* Detail SlidePanel */}
      <SlidePanel
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title="Registration Details"
      >
        <ServiceDetailPanel
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      </SlidePanel>
    </>
  );
}
