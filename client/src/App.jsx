/**
 * CARD Technocrats & Engineers LLP - Core Application Router
 * 
 * Google 15+ Years Senior Developer Architecture Notes:
 * 1. Code Splitting / Lazy Loading:
 *    All page components are lazy-loaded via React.lazy() and wrapped in Suspense.
 *    This splits the final production bundle into smaller, cached chunks. The initial 
 *    load size is minimized, preventing long white-screen delays for users on low-bandwidth networks.
 * 2. Nested Routing:
 *    - MainLayout: Injects the global Navbar, Footer, Floating WhatsApp, Call buttons, 
 *      and Scroll-to-Top helpers. Public routes are children under this layout.
 *    - AdminLayout: Secured via <ProtectedRoute> which verifies authorization (JWT cookie/localstate).
 *      Contains admin dashboard controls and sidebar navigators.
 * 3. Animated Transitions:
 *    AnimatePresence mode="wait" coordinates page transition animations. The router location 
 *    pathname acts as the anim key, triggering exit-then-entry transitions on route changes.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

/* ---------- Public Lazy-loaded Pages ---------- */
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Projects = lazy(() => import('./pages/Projects'));
const TenderServices = lazy(() => import('./pages/TenderServices'));
const RegistrationServices = lazy(() => import('./pages/RegistrationServices'));
const Downloads = lazy(() => import('./pages/Downloads'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const ApplyService = lazy(() => import('./pages/ApplyService'));
const TravelBooking = lazy(() => import('./pages/TravelBooking'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* ---------- Client Lazy-loaded Pages ---------- */
const ClientLogin = lazy(() => import('./pages/client/Login'));
const ClientRegister = lazy(() => import('./pages/client/Register'));
const ClientDashboard = lazy(() => import('./pages/client/ClientDashboard'));

/* ---------- Admin Lazy-loaded Pages ---------- */
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageServices = lazy(() => import('./pages/admin/ManageServices'));
const ManagePricing = lazy(() => import('./pages/admin/ManagePricing'));
const ManageBlogs = lazy(() => import('./pages/admin/ManageBlogs'));
const ManageDownloads = lazy(() => import('./pages/admin/ManageDownloads'));
const ManageContacts = lazy(() => import('./pages/admin/ManageContacts'));
const ManageGallery = lazy(() => import('./pages/admin/ManageGallery'));
const ManageTestimonials = lazy(() => import('./pages/admin/ManageTestimonials'));
const ManageApplications = lazy(() => import('./pages/admin/ManageApplications'));
const ManageBookings = lazy(() => import('./pages/admin/ManageBookings'));
const Careers = lazy(() => import('./pages/Careers'));
const ManageCareers = lazy(() => import('./pages/admin/ManageCareers'));
const TrackApplication = lazy(() => import('./pages/TrackApplication'));

/* ---------- Loading Fallback Spinner ---------- */
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '2s' }} />
        </div>
        <p className="text-sm text-dark-400 tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes location={location} key={location.pathname}>
          
          {/* ===== Public Routes (Wrapped in MainLayout) ===== */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tender-services" element={<TenderServices />} />
            <Route path="registration-services" element={<RegistrationServices />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="apply/:slug" element={<ApplyService />} />
            <Route path="apply" element={<ApplyService />} />
            <Route path="travel-booking" element={<TravelBooking />} />
            <Route path="careers" element={<Careers />} />
            <Route path="track" element={<TrackApplication />} />
            <Route path="login" element={<ClientLogin />} />
            <Route path="register" element={<ClientRegister />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <ClientDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* ===== Admin Login (Stands alone, no global layout) ===== */}
          <Route path="admin/login" element={<AdminLogin />} />

          {/* ===== Admin Routes (Secured & Wrapped in AdminLayout) ===== */}
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="pricing" element={<ManagePricing />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="downloads" element={<ManageDownloads />} />
            <Route path="contacts" element={<ManageContacts />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="applications" element={<ManageApplications />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="careers" element={<ManageCareers />} />
          </Route>

          {/* ===== Fallback 404 handler ===== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}
