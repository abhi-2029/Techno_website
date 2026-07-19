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
import Card from '../components/common/Card';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | CARD Technocrats & Engineers LLP</title>
        <meta name="description" content="Read the privacy policy of CARD Technocrats & Engineers LLP. We protect your company documents and bidding credentials." />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-black">Privacy Policy</h1>
            <p className="text-gray-500 text-xs font-mono">Last Updated: June 28, 2026</p>
          </div>

          <Card className="p-8 bg-white/5 border border-white/10 space-y-6 leading-relaxed text-sm text-gray-300">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when submitting inquiries, requesting contractor registrations (CPWD, PWD, Railways), or uploading documents for cost estimations. This includes your name, email, phone number, business license particulars, and credentials.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Use of Information</h2>
              <p>
                We use the collected information solely to process your applications, coordinate with government licensing departments, prepare accurate BOQ cost sheets, and contact you regarding updates on your inquiries. We do not sell or trade your details.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Document Confidentiality & Safety</h2>
              <p>
                As a professional engineering LLP, we maintain strict confidentiality over your technical designs, balance sheets, and SP character certificates. All files are securely processed and accessed only by authorized regulatory consultants.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. Cookies & Web Analytics</h2>
              <p>
                Our site uses cookies to remember login sessions for the Admin Portal and analyze visitor traffic to improve user experiences. You can disable cookies in your browser settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">5. Data Retention & User Rights</h2>
              <p>
                We retain your information as long as your account is active or as needed to provide you services and comply with our legal obligations. You have the right to request access to, correction of, or deletion of your personal data by contacting our compliance officer.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact us at:
                <br />
                <span className="text-blue-400 font-semibold">ctellp@gmail.com</span> or via hotlines at <span className="text-blue-400 font-semibold">+91 7529993812</span>.
              </p>
            </section>
          </Card>
        </div>
      </main>
    </>
  );
}
