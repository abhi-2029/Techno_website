/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePricing } from '../../hooks/usePricing';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';
import Button from '../common/Button';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function PricingTable() {
  const { data, isLoading } = usePricing();
  const pricingList = data?.data?.pricing || [];
  // Local state container managing interactive view variables
  const [selectedSlug, setSelectedSlug] = useState('');

  // Set default selected slug when data is loaded
  React.useEffect(() => {
    if (pricingList.length > 0 && !selectedSlug) {
      setSelectedSlug(pricingList[0].slug);
    }
  }, [pricingList, selectedSlug]);

  const activePricing = pricingList.find((p) => p.slug === selectedSlug);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64 mx-auto rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-[420px] rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Service Selector Tabs */}
      <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
        {pricingList.map((pricing) => (
          <button
            key={pricing._id}
            onClick={() => setSelectedSlug(pricing.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
              selectedSlug === pricing.slug
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {pricing.serviceName}
          </button>
        ))}
      </div>

      {/* Tiers Grid */}
      {activePricing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {activePricing.tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                className={`h-full flex flex-col justify-between p-8 relative overflow-hidden ${
                  tier.isPopular
                    ? 'border-2 border-blue-500 bg-blue-950/20 shadow-xl shadow-blue-500/5'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {/* Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                    Popular Choice
                  </div>
                )}

                <div>
                  {/* Tier Name */}
                  <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">
                      {tier.price}
                    </span>
                    {tier.price !== 'Custom Pricing' && (
                      <span className="text-xs text-gray-400">/ project</span>
                    )}
                  </div>

                  <hr className="border-white/10 mb-6" />

                  {/* Features list */}
                  <ul className="space-y-4">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                        <CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <div className="mt-8">
                  <Button
                    variant={tier.isPopular ? 'primary' : 'secondary'}
                    className="w-full justify-center py-3 text-sm font-bold"
                    onClick={() => {
                      window.location.href = `/contact?subject=Inquiry for ${activePricing.serviceName} - ${tier.name}`;
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          No pricing plans configured yet.
        </div>
      )}
    </div>
  );
}
