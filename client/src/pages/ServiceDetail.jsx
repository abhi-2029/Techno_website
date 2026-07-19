/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useService, useServices } from '../hooks/useServices';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import Skeleton from '../components/common/Skeleton';
import {
  ClockIcon,
  CurrencyRupeeIcon,
  CheckBadgeIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function ServiceDetail() {
  // Unpacks route slug identifiers from the router parameters
  const { slug } = useParams();
  const { data, isLoading, error } = useService(slug);
  const service = data?.data?.service || data?.service;

  // Fetch related services under the same category
  const { data: relatedData } = useServices({
    category: service?.category?._id,
    limit: 4,
  });
  
  const relatedServices = (relatedData?.data?.services || [])
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white pt-28 pb-16">
        <div className="container mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-1/3 rounded-lg" />
          <Skeleton className="h-40 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The service details page you are trying to reach doesn't exist or has been moved by the administrator.
        </p>
        <Link to="/services">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${service.title} | CARD Technocrats & Engineers LLP`}</title>
        <meta
          name="description"
          content={`${service.title} consultancy. Eligibility: ${service.eligibility || 'N/A'}. Documents needed: ${service.requiredDocuments?.slice(0, 4).join(', ') || 'N/A'}. Processing time: ${service.processingTime || 'N/A'}.`}
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          
          {/* Breadcrumbs */}
          <div className="flex gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-blue-400">Services</Link>
            <span>/</span>
            <span className="text-gray-400">{service.title}</span>
          </div>

          {/* Header */}
          <div className="space-y-4">
            <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {service.category?.name || 'Consultancy'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black">{service.title}</h1>
            <p className="text-gray-400 leading-relaxed text-base max-w-4xl">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          {/* Quick Specifications Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <ClockIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-black">Processing Time</div>
                <div className="text-sm font-bold text-white mt-0.5">{service.processingTime || 'Varies'}</div>
              </div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <ShieldCheckIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-black">Eligibility</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate max-w-[150px]">{service.eligibility || 'All Entities'}</div>
              </div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <CurrencyRupeeIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-black">Govt Fees</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate max-w-[150px]">{service.governmentFees || 'Variable'}</div>
              </div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <CurrencyRupeeIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-black">Prof Charges</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate max-w-[150px]">{service.professionalCharges || 'Ask Quote'}</div>
              </div>
            </div>
          </div>

          {/* Details Content Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Columns: Documents, Benefits, FAQs */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Documents Needed */}
              {service.requiredDocuments && service.requiredDocuments.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <DocumentDuplicateIcon className="w-6 h-6 text-blue-500" />
                    Required Documentation
                  </h3>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <ul className="grid grid-cols-1 gap-3.5">
                      {service.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                    Key Benefits & Advantages
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl text-sm text-gray-300 flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {service.faqs.map((faq, idx) => (
                      <Accordion key={idx} title={faq.question}>
                        <p className="text-sm text-gray-400 py-2 leading-relaxed">
                          {faq.answer}
                        </p>
                      </Accordion>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Sidebar / Apply & Related */}
            <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              {/* Sticky Apply Card */}
              <div className="p-6 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl text-center space-y-6">
                <h4 className="text-lg font-bold text-white">Apply for {service.title}</h4>
                <p className="text-xs text-gray-400">
                  Ready to register or file? Simply click the button below to schedule a call with our support officers.
                </p>
                <Link to={`/apply/${service.slug}`} className="block">
                  <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3">
                    Start Online Registration
                  </Button>
                </Link>
                <a href="tel:+917529993812" className="block">
                  <Button variant="outline" className="w-full justify-center py-3 border-white/25 hover:bg-white/5">
                    Call Customer Care
                  </Button>
                </a>
                <a
                  href={`https://wa.me/917529993812?text=Hello,%20I'm%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full justify-center py-3 border-white/25 hover:bg-white/5">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Related Services</h4>
                  <div className="space-y-4">
                    {relatedServices.map((rs) => (
                      <Link key={rs._id} to={`/services/${rs.slug}`} className="block">
                        <Card className="p-4 bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all duration-300 flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-bold text-white hover:text-blue-400 transition-colors truncate max-w-[200px]">
                              {rs.title}
                            </h5>
                            <span className="text-[10px] text-gray-500 font-bold uppercase">{rs.category?.name}</span>
                          </div>
                          <span className="text-blue-400 font-bold">→</span>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
