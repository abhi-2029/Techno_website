/**
 * CARD Technocrats & Engineers LLP - Public Tracking Portal
 * 
 * Senior Developer Notes:
 * - Exposes real-time verification and tracking status for clients.
 * - Supports searching by Application ID, phone number, or email address.
 * - Renders a professional visual progress timeline tracker.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTrackApplication } from '../hooks/useApplications';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

export default function TrackApplication() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  // Fetch status using our react-query hook
  const { data, isLoading, error, isFetched } = useTrackApplication(activeQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery.trim());
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Reviewing': return 2;
      case 'Approved':
      case 'Rejected': return 3;
      default: return 1;
    }
  };

  const application = data?.data?.application;
  const currentStep = application ? getStatusStep(application.status) : 1;

  return (
    <>
      <Helmet>
        <title>Track & Verify Registration | CARD Technocrats</title>
        <meta
          name="description"
          content="Verify and track the status of your government contractor licensing, CPWD/PWD solvency documentation, and bidding applications."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-sm font-semibold tracking-wider text-blue-500 uppercase">Verification Hub</span>
            <h1 className="text-4xl md:text-5xl font-black">Track Your Application</h1>
            <p className="text-gray-400 text-sm">
              Enter your registration Reference ID, registered email address, or phone number to check the status of your license file or solvency estimation.
            </p>
          </div>

          {/* Search Form Card */}
          <Card className="p-6 bg-white/5 border border-white/10 backdrop-blur-xl">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <Input
                  label="Search Tracking ID / Email / Phone"
                  id="search"
                  placeholder="e.g. 64a2c918e9d3910c283401fa or +91 9999988888"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="w-full sm:w-auto h-[46px] justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-3"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                Track Status
              </Button>
            </form>
          </Card>

          {/* Status Results Display */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Querying database registry records...</p>
            </div>
          )}

          {error && isFetched && (
            <Card className="p-8 border border-red-500/20 bg-red-500/5 text-center space-y-3">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Application Record Found</h3>
              <p className="text-gray-400 text-xs max-w-md mx-auto">
                We could not find any active submissions matching "{activeQuery}". Please double check your input or contact support at ctellp@gmail.com.
              </p>
            </Card>
          )}

          {application && (
            <div className="space-y-8 animate-fadeIn">
              {/* Detailed Progress Timeline */}
              <Card className="p-8 bg-white/5 border border-white/10 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{application.serviceTitle}</h3>
                    <p className="text-xs text-gray-500 mt-1">Ref ID: <span className="font-mono text-gray-400 select-all">{application._id}</span></p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    application.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    application.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    application.status === 'Reviewing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {application.status}
                  </span>
                </div>

                {/* Progress Steps Visual Timeline */}
                <div className="relative pt-6">
                  {/* Timeline connector bar */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded hidden md:block" />
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 -translate-y-1/2 rounded transition-all duration-500 hidden md:block"
                    style={{ width: `${(currentStep - 1) * 50}%` }}
                  />

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    
                    {/* Step 1: Submitted */}
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 text-center md:items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        currentStep >= 1 ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-800 text-gray-500'
                      }`}>
                        <CheckCircleIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="text-sm font-bold text-white">Application Received</h4>
                        <p className="text-[11px] text-gray-500">File successfully saved in MDB</p>
                      </div>
                    </div>

                    {/* Step 2: Under Review */}
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 text-center md:items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        currentStep >= 2 ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-gray-800 text-gray-500'
                      }`}>
                        <ClockIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="text-sm font-bold text-white">Under Evaluation</h4>
                        <p className="text-[11px] text-gray-500">Licensing advisors checking SOR files</p>
                      </div>
                    </div>

                    {/* Step 3: Action */}
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 text-center md:items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        currentStep >= 3 
                          ? application.status === 'Rejected' 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                            : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                          : 'bg-gray-800 text-gray-500'
                      }`}>
                        <ShieldCheckIcon className="w-5 h-5" />
                      </div>
                      <div className="text-left md:text-center">
                        <h4 className="text-sm font-bold text-white">Official Action</h4>
                        <p className="text-[11px] text-gray-500">Approval certificate or feedback status</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Admin Note alerts */}
                {application.notes && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Official Advisory Note:</span>
                    <p className="text-xs text-gray-300 italic">"{application.notes}"</p>
                  </div>
                )}
              </Card>

              {/* Company Verification Details */}
              <Card className="p-6 bg-white/[0.02] border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <DocumentTextIcon className="w-4 h-4" />
                  Submission Metadata
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-500 font-medium">Applicant Representative:</span>
                    <p className="text-white font-semibold">{application.applicantName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 font-medium">Company / Entity:</span>
                    <p className="text-white font-semibold">{application.companyName || 'Individual'} ({application.entityType})</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 font-medium">Solvency Level Requested:</span>
                    <p className="text-emerald-400 font-bold">₹{Number(application.solvencyAmount || 0).toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 font-medium">Primary Verification Phone:</span>
                    <p className="text-white font-semibold font-mono">{application.phone}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
