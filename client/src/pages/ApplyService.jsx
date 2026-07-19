/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Multi-step registration wizard allowing clients to officially apply for CPWD, PWD, or tax filings.
 * - Collects applicant data, company structures, and handles simulated document attachments.
 * - Connected directly to the backend Application controller via React Query.
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useService, useServices } from '../hooks/useServices';
import { useCreateApplication } from '../hooks/useApplications';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import {
  DocumentIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

export default function ApplyService() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Queries service details if a specific slug is provided
  const { data: serviceData, isLoading: isServiceLoading, error: serviceError } = useService(slug);
  const singleService = serviceData?.data?.service || serviceData?.service;

  // Queries all services in case they are registering via the general 'Apply Now' hero button
  const { data: allServicesData, isLoading: isAllLoading } = useServices({ limit: 100 });
  const allServices = allServicesData?.data?.services || allServicesData?.services || [];

  const [step, setStep] = useState(1);
  const createApplicationMutation = useCreateApplication();

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [entityType, setEntityType] = useState('Individual');
  const [solvencyAmount, setSolvencyAmount] = useState('');
  const [notes, setNotes] = useState('');
  
  // Selected files list
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Auto-select first service if accessing general /apply route
  useEffect(() => {
    if (!slug && allServices.length > 0 && !selectedServiceId) {
      setSelectedServiceId(allServices[0]._id);
    }
  }, [slug, allServices, selectedServiceId]);

  // Determine active service selection
  const activeService = slug ? singleService : allServices.find(s => s._id === selectedServiceId);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      url: `/uploads/${encodeURIComponent(file.name)}`
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`Attached: ${files.length} document(s)`);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!applicantName || !email || !phone) {
        toast.error('Please fill in all required contact details');
        return;
      }
      if (!slug && !selectedServiceId) {
        toast.error('Please select a service category to register');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (!activeService) {
      toast.error('Please select a service to proceed');
      return;
    }

    const payload = {
      serviceId: activeService._id,
      applicantName,
      email,
      phone,
      companyName,
      entityType,
      solvencyAmount: Number(solvencyAmount) || 0,
      documents: uploadedFiles,
      notes
    };

    createApplicationMutation.mutate(payload, {
      onSuccess: () => {
        setStep(4); // Success step
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to submit registration. Please try again.');
      }
    });
  };

  const isLoading = slug ? isServiceLoading : isAllLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white pt-28 pb-16 flex items-center justify-center">
        <p className="text-gray-400">Loading registration form...</p>
      </div>
    );
  }

  // Handle errors
  const isInvalid = slug ? (serviceError || !singleService) : (allServices.length === 0);
  if (isInvalid) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 font-sans">Service Registration Unavailable</h2>
        <Link to="/services">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply for {activeService?.title || 'Registration'} | CARD Technocrats</title>
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl space-y-8">
          
          {/* Form Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Official Registration Portal
            </span>
            <h1 className="text-3xl font-black text-white">Apply for {activeService?.title || 'Registration'}</h1>
            <p className="text-xs text-gray-400">Fill in your business details and upload credentials below.</p>
          </div>

          {/* Step Progress Indicators */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-gray-500'}`}>1</span>
              <span className="w-8 h-px bg-white/10" />
              <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-gray-500'}`}>2</span>
              <span className="w-8 h-px bg-white/10" />
              <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-gray-500'}`}>3</span>
            </div>
          )}

          {/* Form Container */}
          <Card className="p-8 bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            
            {/* Step 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Step 1: Contact Information</h3>
                <div className="space-y-4">
                  
                  {/* Service Dropdown - only shown if accessing generally without a slug */}
                  {!slug && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-400">Select Service to Register</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                      >
                        {allServices.map((s) => (
                          <option key={s._id} value={s._id} className="bg-dark-900">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <Input
                    label="Applicant Name (Required)"
                    placeholder="Enter full name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address (Required)"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      label="Phone Number (Required)"
                      placeholder="e.g. +91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <Input
                    label="Company/Firm Name (Optional)"
                    placeholder="Enter legal business name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button variant="primary" onClick={nextStep} className="gap-1.5">
                    Next Step <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Entity & Specs */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Step 2: Business Entity Specifications</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Entity Type</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                    >
                      <option value="Individual" className="bg-dark-900">Individual Proprietor</option>
                      <option value="Proprietorship" className="bg-dark-900">Sole Proprietorship</option>
                      <option value="Partnership" className="bg-dark-900">Partnership Firm</option>
                      <option value="LLP" className="bg-dark-900">Limited Liability Partnership (LLP)</option>
                      <option value="Pvt Ltd" className="bg-dark-900">Private Limited (Pvt Ltd)</option>
                      <option value="Public Ltd" className="bg-dark-900">Public Limited</option>
                    </select>
                  </div>

                  <Input
                    label="Target Solvency Amount (INR, if applicable)"
                    type="number"
                    placeholder="e.g. 500000"
                    value={solvencyAmount}
                    onChange={(e) => setSolvencyAmount(e.target.value)}
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Application Notes/Requirements</label>
                    <textarea
                      rows={4}
                      placeholder="Add any specific details regarding class categories, experience years, or portal registrations..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-between">
                  <Button variant="ghost" onClick={prevStep} className="gap-1.5">
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                  </Button>
                  <Button variant="primary" onClick={nextStep} className="gap-1.5">
                    Next Step <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Document Attachments */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Step 3: Document Upload Verification</h3>
                
                {/* File Upload Zone */}
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center space-y-4 hover:border-blue-500/30 transition-all relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <PaperClipIcon className="w-10 h-10 text-gray-500 mx-auto" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Drag & drop files or click to upload</p>
                    <p className="text-xs text-gray-400">Upload solvency certs, PAN card, Aadhaar, and experience sheets (PDF, PNG, JPG)</p>
                  </div>
                </div>

                {/* Uploaded Files Grid */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Credentials ({uploadedFiles.length})</p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-gray-300 font-bold truncate max-w-[400px]">
                            <DocumentIcon className="w-4 h-4 text-blue-400" />
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-red-400 hover:text-red-300 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <Button variant="ghost" onClick={prevStep} className="gap-1.5">
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    loading={createApplicationMutation.isPending}
                    className="gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500"
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Success View */}
            {step === 4 && (
              <div className="text-center space-y-6 py-6">
                <CheckCircleIcon className="w-20 h-20 text-emerald-500 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Application Submitted!</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
                    Your registration request for <strong>{activeService?.title}</strong> has been stored successfully. Our expert advisory team will review your uploads and email your login keys shortly.
                  </p>
                </div>
                
                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" onClick={() => navigate('/services')} className="gap-1.5">
                    Return to Services
                  </Button>
                  <Button variant="outline" onClick={() => window.print()} className="gap-1.5 border-white/20 hover:bg-white/5">
                    Print Confirmation
                  </Button>
                </div>
              </div>
            )}

          </Card>
        </div>
      </main>
    </>
  );
}
