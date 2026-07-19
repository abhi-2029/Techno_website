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
import PricingTable from '../components/pricing/PricingTable';
import Accordion from '../components/common/Accordion';

export default function Pricing() {
  const faqs = [
    { question: 'What is professional charges versus government fees?', answer: 'Government fees are the exact official charges requested by the department to process the registration, which vary depending on class or turnover. Professional charges are our service fees for document check, portal registration, filing, and coordination.' },
    { question: 'Is the pricing same for partnership firms and companies?', answer: 'Generally, yes. However, company files have higher verification workloads (such as board resolutions, MOA/AOA verification), which might require slight adjustments in the professional fee.' },
    { question: 'Can I pay the government fee directly?', answer: 'Yes! In fact, we prefer that clients pay government fees directly into the official portal using their credit card or net banking. If not feasible, we can pay on your behalf and present the official receipt for reimbursement.' },
    { question: 'Do you offer discount packages for multiple registrations?', answer: 'Yes! If you are getting a combination of CPWD/PWD registrations + Digital Signatures + GST registration, we offer custom discounted packages. Contact our sales desk for details.' },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing & Packages | CARD Technocrats & Engineers LLP</title>
        <meta
          name="description"
          content="Find out about our transparent professional pricing rates. Get detailed packages for contractor registrations, tender filing assistance, and detailed project reports."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase">Pricing Plans</h2>
            <h1 className="text-4xl md:text-5xl font-black">Transparent, Professional Pricing</h1>
            <p className="text-gray-400 text-sm">
              We offer flat professional rates with absolutely no hidden charges. Select your desired service below to view package options or contact our sales desk for custom quotes.
            </p>
          </div>

          {/* Pricing Table Component */}
          <PricingTable />

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto space-y-8 pt-12 border-t border-white/5">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Pricing Questions</h3>
              <p className="text-gray-500 text-xs mt-1">Frequently asked questions about our fees and billing models</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Accordion key={idx} title={faq.question}>
                  <p className="text-sm text-gray-400 leading-relaxed py-2">
                    {faq.answer}
                  </p>
                </Accordion>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
