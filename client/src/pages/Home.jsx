/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Renders a public section of the corporate advisory portal.
 * - Helmet-async enabled for custom SEO metadata rendering.
 * - Tailored responsive layout for mobile and desktop screens.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import FeaturedServices from '../components/home/FeaturedServices';
import StatsCounter from '../components/home/StatsCounter';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';
import Leadership from '../components/common/Leadership';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CARD Technocrats & Engineers LLP | Premier Govt Consultancy</title>
        <meta
          name="description"
          content="CARD Technocrats & Engineers LLP provides professional engineering & government registration consultancy. Specializing in PWD/CPWD contractor registration, GeM portals, ITR, GST, Project Reports, and online tender filings."
        />
        <meta name="keywords" content="CPWD registration, PWD registration, Tender filing, GeM portal, MSME registration, Project report, BOQ estimation, Digital Signature, CARD Technocrats" />
      </Helmet>

      <main className="bg-[#030712] text-white">
        <Hero />
        <Partners />
        <FeaturedServices />
        <StatsCounter />
        <WhyChooseUs />
        <div className="container mx-auto px-4 max-w-7xl">
          <Leadership />
        </div>
        <Testimonials />
        <CTABanner />
      </main>
    </>
  );
}
