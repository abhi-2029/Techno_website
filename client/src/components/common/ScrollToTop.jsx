/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Listens to React Router navigation changes.
 * - Forces viewport coordinates back to (0,0) on pathname transitions, 
 *   preventing pages from loading scrolled at the bottom.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant scroll prevents visual jump during page load transitions
    });
  }, [pathname]);

  return null;
}
