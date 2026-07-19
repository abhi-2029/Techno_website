/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import BackToTop from '../components/common/BackToTop';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import CallNowButton from '../components/common/CallNowButton';
import PageTransition from '../components/common/PageTransition';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CallNowButton />
      <BackToTop />
    </div>
  );
}
