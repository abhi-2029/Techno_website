/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Card from '../common/Card';

function CountUp({ target, duration = 2 }) {
  // Local state container managing interactive view variables
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Lifecycle hook mapping automated side-effects on parameter changes
  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsCounter() {
  const stats = [
    { value: '500', suffix: '+', label: 'Projects Completed' },
    { value: '1000', suffix: '+', label: 'Happy Clients' },
    { value: '50', suffix: '+', label: 'Services Offered' },
    { value: '10', suffix: '+', label: 'Years Experience' },
  ];

  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 text-center bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 font-mono">
                  <CountUp target={stat.value} />
                  <span className="text-blue-500">{stat.suffix}</span>
                </div>
                <div className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
