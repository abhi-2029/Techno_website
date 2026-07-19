/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import * as HeroIcons from '@heroicons/react/24/outline';

// Helper to render icons or fallback
function ServiceIcon({ name }) {
  const IconComponent = HeroIcons[name + 'Icon'] || HeroIcons.DocumentTextIcon;
  return <IconComponent className="w-6 h-6 text-blue-500" />;
}

export default function ServiceCard({ service, onLearnMore }) {
  return (
    <Card
      onClick={() => onLearnMore(service)}
      className="h-full flex flex-col justify-between p-6 bg-white/5 border border-white/10 hover:border-blue-500/20 backdrop-blur-xl group transition-all duration-300 cursor-pointer hover:bg-white/[0.08]"
    >
      <div>
        {/* Icon & Category Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ServiceIcon name={service.icon} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {service.category?.name || 'Service'}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {service.title}
        </h4>

        {/* Short Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {service.shortDescription}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center text-xs py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl pointer-events-none"
        >
          Learn More
        </Button>
      </div>
    </Card>
  );
}
