/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from './Skeleton';

export default function LazyImage({ src, alt, className = '', containerClassName = '', ...props }) {
  // Local state container managing interactive view variables
  const [loaded, setLoaded] = useState(false);
  // Local state container managing interactive view variables
  const [visible, setVisible] = useState(false);
  const imgRef = useRef(null);

  // Lifecycle hook mapping automated side-effects on parameter changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${containerClassName}`}>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <Skeleton className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {visible && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onLoad={() => setLoaded(true)}
          className={`${className} ${loaded ? 'filter-none' : 'blur-lg scale-105'}`}
          {...props}
        />
      )}
    </div>
  );
}
