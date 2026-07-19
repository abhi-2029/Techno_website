import React, { useState } from 'react';
import { 
  useCareers, 
  useCreateJob, 
  useUpdateJob, 
  useDeleteJob,
  useApplications, 
  useUpdateApplicationStatus, 
  useDeleteApplication 
} from '../../hooks/useCareers';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import {
  UserIcon,
  BriefcaseIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function ManageCareers() {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'

  // --- HOOKS FOR JOBS ---
  const { data: jobsData, isLoading: isLoadingJobs } = useCareers();
  const jobs = jobsData?.data?.jobs || jobsData?.jobs || [];
  const createJobMut = useCreateJob();
  const updateJobMut = useUpdateJob();
  const deleteJobMut = useDeleteJob();

  // --- HOOKS FOR APPLICATIONS ---
  const { data: appData, isLoading: isLoadingApps } = useApplications();
  const applications = appData?.data?.applications || appData?.applications || [];
  const updateAppMut = useUpdateApplicationStatus();
  const deleteAppMut = useDeleteApplication();

  // --- STATE FOR JOBS ---
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '', department: '', location: '', type: 'Full-time', description: ''
  });

  // --- STATE FOR APPLICATIONS ---
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [statusVal, setStatusVal] = useState('');

  // ====== JOB HANDLERS ======
  const handleOpenJobModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setJobFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description
      });
    } else {
      setEditingJob(null);
      setJobFormData({ title: '', department: '', location: '', type: 'Full-time', description: '' });
    }
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (editingJob) {
      updateJobMut.mutate({ id: editingJob._id, ...jobFormData }, {
        onSuccess: () => {
          toast.success('Job updated successfully');
          setIsJobModalOpen(false);
        }
      });
    } else {
      createJobMut.mutate(jobFormData, {
        onSuccess: () => {
          toast.success('Job created successfully');
          setIsJobModalOpen(false);
        }
      });
    }
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Delete this job posting? All associated applications will also be deleted.')) {
      deleteJobMut.mutate(id, {
        onSuccess: () => toast.success('Job deleted')
      });
    }
  };

  const handleToggleJobStatus = (job) => {
    updateJobMut.mutate({ id: job._id, isClosed: !job.isClosed }, {
      onSuccess: () => toast.success(job.isClosed ? 'Job reopened' : 'Job closed')
    });
  };

  // ====== APPLICATION HANDLERS ======
  const handleOpenCandidate = (app) => {
    setActiveCandidate(app);
    setStatusVal(app.status);
  };

  const handleUpdateApp = () => {
    if (!activeCandidate) return;
    updateAppMut.mutate(
      { id: activeCandidate._id, status: statusVal },
      {
        onSuccess: () => {
          toast.success('Candidate status updated successfully!');
          setActiveCandidate(null);
        }
      }
    );
  };

  const handleDeleteApp = (id) => {
    if (window.confirm('Are you sure you want to delete this application record?')) {
      deleteAppMut.mutate(id, {
        onSuccess: () => {
          toast.success('Application record deleted successfully!');
          setActiveCandidate(null);
        }
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/10';
      case 'Rejected': return 'bg-red-500/20 text-red-400 border border-red-500/10';
      case 'Interviewing': return 'bg-sky-500/20 text-sky-400 border border-sky-500/10';
      case 'Shortlisted': return 'bg-purple-500/20 text-purple-400 border border-purple-500/10';
      default: return 'bg-amber-500/20 text-amber-400 border border-amber-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Careers & Recruitment</h1>
          <p className="text-gray-500 text-xs mt-1">Manage job vacancies and review candidate applications.</p>
        </div>
        {activeTab === 'jobs' && (
          <Button variant="primary" onClick={() => handleOpenJobModal()} className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" /> Post New Job
          </Button>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'jobs' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          Job Postings
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            activeTab === 'applications' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          Candidate Applications
        </button>
      </div>

      {/* TAB CONTENT: JOBS */}
      {activeTab === 'jobs' && (
        <DataTable
          headers={['Job Title & Dept', 'Location & Type', 'Status', 'Date Posted', 'Actions']}
          data={jobs}
          isLoading={isLoadingJobs}
          emptyMessage="No job postings found."
          renderRow={(job) => (
            <tr key={job._id}>
              <td className="px-6 py-4 text-sm text-gray-300">
                <div className="font-bold text-white">{job.title}</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase">{job.department}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">
                <div className="font-bold">{job.location}</div>
                <div className="text-xs text-gray-500">{job.type}</div>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${job.isClosed ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {job.isClosed ? 'Closed' : 'Active'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm space-x-3">
                <button onClick={() => handleOpenJobModal(job)} className="text-blue-400 hover:text-white font-bold hover:underline text-xs">Edit</button>
                <button onClick={() => handleToggleJobStatus(job)} className="text-amber-400 hover:text-white font-bold hover:underline text-xs">
                  {job.isClosed ? 'Reopen' : 'Close'}
                </button>
                <button onClick={() => handleDeleteJob(job._id)} className="text-red-500 hover:text-red-400 font-bold hover:underline text-xs">Delete</button>
              </td>
            </tr>
          )}
        />
      )}

      {/* TAB CONTENT: APPLICATIONS */}
      {activeTab === 'applications' && (
        <DataTable
          headers={['Candidate', 'Applied Position', 'Contact Info', 'Date', 'Status', 'Actions']}
          data={applications}
          isLoading={isLoadingApps}
          emptyMessage="No candidate applications found."
          renderRow={(app) => (
            <tr key={app._id}>
              <td className="px-6 py-4 text-sm font-bold text-white flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-bold">{app.name}</div>
                  <span className="text-[10px] text-gray-500 font-mono">ID: {app._id.slice(-6).toUpperCase()}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                <div className="font-bold text-white">{app.jobId?.title || 'Unknown Position'}</div>
                <span className="text-[9px] font-bold text-gray-500 font-mono uppercase">{app.jobId?.department || 'N/A'}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">
                <div className="font-mono text-xs">{app.email}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">{app.phone}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <button onClick={() => handleOpenCandidate(app)} className="text-xs text-blue-400 hover:text-white font-bold hover:underline">Review</button>
                <button onClick={() => handleDeleteApp(app._id)} className="text-xs text-red-500 hover:text-red-400 font-bold hover:underline">Delete</button>
              </td>
            </tr>
          )}
        />
      )}

      {/* MODAL: CREATE/EDIT JOB */}
      <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title={editingJob ? "Edit Job Posting" : "Post New Job"}>
        <form onSubmit={handleSaveJob} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Job Title</label>
            <input required type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" value={jobFormData.title} onChange={e => setJobFormData({...jobFormData, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Department</label>
              <input required type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" value={jobFormData.department} onChange={e => setJobFormData({...jobFormData, department: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</label>
              <input required type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" value={jobFormData.location} onChange={e => setJobFormData({...jobFormData, location: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Employment Type</label>
            <select className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-xl text-white" value={jobFormData.type} onChange={e => setJobFormData({...jobFormData, type: e.target.value})}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</label>
            <textarea required rows={4} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white" value={jobFormData.description} onChange={e => setJobFormData({...jobFormData, description: e.target.value})} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsJobModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={createJobMut.isPending || updateJobMut.isPending}>Save Job Posting</Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: REVIEW APPLICATION */}
      {activeCandidate && (
        <Modal isOpen={!!activeCandidate} onClose={() => setActiveCandidate(null)} title="Review Candidate">
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Candidate Name</div>
                <div className="text-base font-black text-white">{activeCandidate.name}</div>
                <div className="text-[10px] text-blue-400 uppercase font-bold mt-1">Applied: {activeCandidate.jobId?.title || 'Unknown Position'}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Applied Date</div>
                <div className="text-sm font-bold text-white">{new Date(activeCandidate.createdAt).toLocaleDateString()}</div>
                <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-block mt-2 ${getStatusColor(activeCandidate.status)}`}>
                  {activeCandidate.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs">
                <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Email Address</span>
                  <a href={`mailto:${activeCandidate.email}`} className="text-white hover:underline font-mono">{activeCandidate.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <PhoneIcon className="w-4 h-4 text-gray-500" />
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Phone Number</span>
                  <a href={`tel:${activeCandidate.phone}`} className="text-white hover:underline font-mono">{activeCandidate.phone}</a>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Cover Letter</div>
              <p className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                {activeCandidate.coverLetter}
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1.5">Resume File</span>
              <a href={activeCandidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 rounded-xl flex items-center justify-between text-xs text-blue-400 font-bold transition-all">
                <span className="flex items-center gap-1.5"><DocumentArrowDownIcon className="w-4 h-4" /> Download / Open Resume</span>
                <span className="flex items-center gap-1">Open <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" /></span>
              </a>
            </div>

            <div className="space-y-1 border-t border-white/10 pt-4">
              <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1.5">Recruitment Stage</label>
              <select className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white" value={statusVal} onChange={(e) => setStatusVal(e.target.value)}>
                <option value="Applied" className="bg-dark-900">Applied</option>
                <option value="Shortlisted" className="bg-dark-900">Shortlisted</option>
                <option value="Interviewing" className="bg-dark-900">Interviewing</option>
                <option value="Selected" className="bg-dark-900">Selected (Hired)</option>
                <option value="Rejected" className="bg-dark-900">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="secondary" onClick={() => setActiveCandidate(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdateApp} loading={updateAppMut.isPending}>Save Status</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
