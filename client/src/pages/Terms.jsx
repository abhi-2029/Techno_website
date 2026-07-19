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

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | CARD Technocrats & Engineers LLP</title>
        <meta name="description" content="Review the Terms of Service for CARD Technocrats & Engineers LLP. Details regarding engineering and bidding advisory." />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-black">Terms of Service</h1>
            <p className="text-gray-500 text-xs font-mono">Last Updated: June 28, 2026</p>
          </div>

          <Card className="p-8 bg-white/5 border border-white/10 space-y-6 leading-relaxed text-sm text-gray-300">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Scope of Advisory Services</h2>
              <p>
                CARD Technocrats & Engineers LLP provides technical advisory, contractor licensing support, cost estimation, and government bidding liaison assistance. We coordinate documentation verification; however, final approvals remain subject to department inspections and government regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Accuracy of Client Data</h2>
              <p>
                Clients must provide authentic and valid credentials (such as experience certificates, SP character certificates, and solvency statements). We are not responsible for delays or rejections arising from forged, incomplete, or expired submissions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Payment Terms & Govt Fees</h2>
              <p>
                Government fees for registrations and tender securities are class-dependent and must be paid by the client directly or deposited as specified. Professional charges for our consultancy are structured transparently and must be cleared as per agreement milestones.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
              <p>
                While we deliver SOR-compliant estimations and experienced bidding advisory, we do not guarantee project awards or financial profit margins from bid tenders. We are not liable for external delays caused by department servers or portal modifications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">6. Refund & Cancellation Policy</h2>
              <p>
                Professional consultancy fees paid via our payment gateway (Razorpay) are strictly non-refundable once the service application process has been initiated with the respective government department. If an application is rejected due to our error, a partial or full refund may be issued at the sole discretion of the management. Cancellations must be requested within 24 hours of payment.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">7. Jurisdictional Authority</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any legal disputes arising from our advisory services shall be subject to the exclusive jurisdiction of the courts in Sheohar, Bihar.
              </p>
            </section>
          </Card>
        </div>
      </main>
    </>
  );
}
