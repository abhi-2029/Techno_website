/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - High-fidelity Careers portal designed in the styling of Amazon Jobs (jobs.amazon.com).
 * - Interactive department filter tabs, search field, sliding detail panel drawer, and applicant checkout form.
 */

import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCareers, useSubmitApplication } from '../hooks/useCareers';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import SlidePanel from '../components/common/SlidePanel';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  BuildingOfficeIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

const DEPARTMENTS = [
  { name: 'All Teams', slug: 'all' },
  { name: 'Engineering', slug: 'Engineering' },
  { name: 'Corporate Compliance', slug: 'Corporate Compliance' },
  { name: 'Sales & Advisory', slug: 'Sales & Advisory' },
  { name: 'Admin Operations', slug: 'Admin Operations' }
];

export default function Careers() {
  const { data, isLoading } = useCareers();
  const jobs = data?.data?.jobs || [];

  const [activeDept, setActiveDept] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal & Slide Drawer state
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Application Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  const applyMutation = useSubmitApplication();

  // Filter jobs based on search query and department tabs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchDept = activeDept === 'all' || job.department === activeDept;
      const matchSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [jobs, activeDept, searchTerm]);

  const handleOpenJob = (job) => {
    setSelectedJob(job);
  };

  const handleOpenApply = () => {
    setShowApplyModal(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !coverLetter || !resumeUrl) {
      toast.error('Please fill in all candidate application details.');
      return;
    }

    const payload = {
      jobId: selectedJob._id,
      name,
      email,
      phone,
      coverLetter,
      resumeUrl
    };

    applyMutation.mutate(payload, {
      onSuccess: () => {
        toast.success(`Application for ${selectedJob.title} submitted successfully!`);
        setShowApplyModal(false);
        setSelectedJob(null);
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setCoverLetter('');
        setResumeUrl('');
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to submit application.');
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Careers at CARD Technocrats | Amazon-inspired Job Portal</title>
        <meta
          name="description"
          content="Find your next role at CARD Technocrats. Explore civil engineering, compliance consulting, and operations careers."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-24 min-h-screen">
        
        {/* Amazon Jobs Style Hero Search Area */}
        <div className="relative bg-gradient-to-b from-blue-950/20 to-transparent py-16 md:py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Join CARD Technocrats & Engineers LLP
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white">Find your next role</h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto">
              We build compliance databases and advisory portals for CPWD and private developers. Build your engineering or legal advisory career with us.
            </p>

            {/* Keyword Search box */}
            <div className="max-w-2xl mx-auto relative rounded-2xl border border-white/10 bg-white/[0.02] p-2 flex items-center gap-2 focus-within:border-blue-500 transition-colors shadow-2xl">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search jobs by title, keyword, or tech..."
                className="w-full bg-transparent border-0 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0 py-2.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.slug}
                onClick={() => setActiveDept(dept.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeDept === dept.slug ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Jobs Listing */}
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-3 animate-pulse">
                  <div className="h-6 bg-white/10 rounded w-1/3" />
                  <div className="h-4 bg-white/10 rounded w-1/4" />
                  <div className="h-10 bg-white/10 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job._id}
                  className="p-6 bg-white/[0.01] border-white/10 hover:border-blue-500/40 hover:bg-blue-500/[0.01] transition-all flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">{job.title}</h3>
                        <span className="text-[10px] text-blue-400 font-bold uppercase mt-1 inline-block">{job.department}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-[10px] text-gray-500 font-mono">
                      <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><BriefcaseIcon className="w-3.5 h-3.5" /> {job.experienceRequired}</span>
                      <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" /> {job.salaryRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[10px] text-gray-600">Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleOpenJob(job)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-3xl space-y-2">
              <BuildingOfficeIcon className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-sm font-bold text-gray-400">No matching positions found</h3>
              <p className="text-xs text-gray-500">Try modifying your keyword search or select a different team.</p>
            </div>
          )}
        </div>

        {/* Job Details Sliding Panel Drawer */}
        <SlidePanel
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title="Job Description Details"
        >
          {selectedJob && (
            <div className="space-y-6 pb-20 pr-1">
              
              {/* Job Header */}
              <div className="space-y-2 border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {selectedJob.department}
                </span>
                <h2 className="text-2xl font-black text-white">{selectedJob.title}</h2>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 text-xs font-mono text-gray-400">
                  <div>Location: <span className="text-white capitalize">{selectedJob.location}</span></div>
                  <div>Experience: <span className="text-white">{selectedJob.experienceRequired}</span></div>
                  <div>Department: <span className="text-white">{selectedJob.department}</span></div>
                  <div>Offered Pay: <span className="text-emerald-400">{selectedJob.salaryRange}</span></div>
                </div>
              </div>

              {/* Job Body */}
              <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
                <div>
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-1.5">Overview</h4>
                  <p>{selectedJob.description}</p>
                </div>

                {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">Key Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">Basic Qualifications</h4>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Apply action button */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-dark-950 border-t border-white/5 flex gap-3 z-10">
                <Button variant="secondary" onClick={() => setSelectedJob(null)} className="flex-1 justify-center">
                  Back to List
                </Button>
                <Button variant="primary" onClick={handleOpenApply} className="flex-1 justify-center bg-gradient-to-r from-blue-600 to-cyan-500 font-bold">
                  Apply for this Job
                </Button>
              </div>

            </div>
          )}
        </SlidePanel>

        {/* Apply Job Form Modal */}
        {showApplyModal && selectedJob && (
          <Modal
            isOpen={showApplyModal}
            onClose={() => setShowApplyModal(false)}
            title={`Application: ${selectedJob.title}`}
          >
            <form onSubmit={handleApplySubmit} className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
              
              <div className="text-xs text-gray-400 border-b border-white/10 pb-3">
                Applying for **{selectedJob.title}** ({selectedJob.location}). Complete your contact profiles and links your CV document.
              </div>

              <Input
                label="Candidate Full Name"
                placeholder="e.g. Amit Kumar"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Contact Phone"
                  placeholder="e.g. +91 98765 43210"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Cover Letter / Professional Pitch</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly pitch why you are a great fit for this engineering/compliance position..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Input
                  label="Resume / Portfolio PDF URL"
                  placeholder="Paste direct download URL (e.g. Google Drive, Dropbox, or portfolio PDF)"
                  required
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                />
                <span className="text-[9px] text-gray-500 flex items-center gap-1.5 mt-1 font-mono"><PaperClipIcon className="w-3.5 h-3.5" /> Paste a direct shareable link to your PDF resume.</span>
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={applyMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 font-bold"
                >
                  Submit Application
                </Button>
              </div>

            </form>
          </Modal>
        )}

      </main>
    </>
  );
}
