/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Accordion from '../common/Accordion';
import {
  ClockIcon,
  CurrencyRupeeIcon,
  CheckBadgeIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function ServiceDetailPanel({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Info */}
      <div>
        <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          {service.category?.name || 'Category'}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {service.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {service.fullDescription || service.shortDescription}
        </p>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
          <ClockIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">Processing Time</div>
            <div className="text-xs text-white font-semibold">{service.processingTime || 'Varies'}</div>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
          <ShieldCheckIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">Eligibility</div>
            <div className="text-xs text-white font-semibold truncate">{service.eligibility || 'All eligible entities'}</div>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
          <CurrencyRupeeIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">Govt Fees</div>
            <div className="text-xs text-white font-semibold truncate">{service.governmentFees || 'Variable'}</div>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
          <CurrencyRupeeIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">Prof Charges</div>
            <div className="text-xs text-white font-semibold truncate">{service.professionalCharges || 'Ask for quote'}</div>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      {service.requiredDocuments && service.requiredDocuments.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <DocumentDuplicateIcon className="w-5 h-5 text-blue-500" />
            Required Documents
          </h4>
          <ul className="grid grid-cols-1 gap-2.5 bg-white/5 p-5 rounded-2xl border border-white/10">
            {service.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckBadgeIcon className="w-5 h-5 text-blue-500" />
            Key Benefits
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.benefits.map((benefit, idx) => (
              <li key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl text-xs text-gray-300 flex gap-2.5 items-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ Accordion */}
      {service.faqs && service.faqs.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Frequently Asked Questions
          </h4>
          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <Accordion key={idx} title={faq.question}>
                <p className="text-xs text-gray-400 leading-relaxed py-2">
                  {faq.answer}
                </p>
              </Accordion>
            ))}
          </div>
        </div>
      )}

      {/* Full Page & Apply CTAs */}
      <div className="flex gap-4 pt-4 border-t border-white/10">
        <Link to={`/services/${service.slug}`} className="w-1/2" onClick={onClose}>
          <Button variant="secondary" className="w-full justify-center">
            View Detail Page
          </Button>
        </Link>
        <Link to="/contact" state={{ subject: `Application for ${service.title}` }} className="w-1/2" onClick={onClose}>
          <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
