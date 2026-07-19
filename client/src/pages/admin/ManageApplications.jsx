/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useApplications, useUpdateApplicationStatus, useDeleteApplication } from '../../hooks/useApplications';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { DocumentIcon } from '@heroicons/react/24/outline';

export default function ManageApplications() {
  const { data, isLoading } = useApplications();
  const applications = data?.data?.applications || data?.applications || [];

  const updateMutation = useUpdateApplicationStatus();
  const deleteMutation = useDeleteApplication();

  const [activeApp, setActiveApp] = useState(null);
  const [statusVal, setStatusVal] = useState('');
  const [notesVal, setNotesVal] = useState('');
  const [amountDueVal, setAmountDueVal] = useState(0);

  const handleOpenApp = (app) => {
    setActiveApp(app);
    setStatusVal(app.status);
    setNotesVal(app.notes || '');
    setAmountDueVal(app.amountDue || 0);
  };

  const handleUpdate = () => {
    if (!activeApp) return;

    updateMutation.mutate(
      { id: activeApp._id, status: statusVal, notes: notesVal, amountDue: amountDueVal },
      {
        onSuccess: () => {
          toast.success('Registration application updated successfully!');
          setActiveApp(null);
        },
        onError: () => toast.error('Failed to update application status.')
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this registration record?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Registration record deleted successfully!');
          setActiveApp(null);
        },
        onError: () => toast.error('Failed to delete registration record.')
      });
    }
  };

  const headers = ['Applicant', 'Service Requested', 'Company Structure', 'Submitted', 'Status', 'Actions'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/10';
      case 'Rejected': return 'bg-red-500/20 text-red-400 border border-red-500/10';
      case 'Reviewing': return 'bg-blue-500/20 text-blue-400 border border-blue-500/10';
      default: return 'bg-amber-500/20 text-amber-400 border border-amber-500/10';
    }
  };

  const renderRow = (app) => (
    <tr key={app._id}>
      <td className="px-6 py-4 text-sm font-bold text-white">
        <div>{app.applicantName}</div>
        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{app.phone}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-300 font-bold">{app.serviceTitle}</td>
      <td className="px-6 py-4 text-sm text-gray-400">
        <div>{app.companyName || 'Individual'}</div>
        <span className="text-[9px] font-bold text-gray-500 uppercase">{app.entityType}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {new Date(app.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-sm">
        <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(app.status)}`}>
          {app.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenApp(app)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Review
        </button>
        <button
          onClick={() => handleDelete(app._id)}
          className="text-xs text-red-500 hover:text-red-400 font-bold hover:underline cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Service Registrations</h1>
        <p className="text-gray-500 text-xs mt-1">Review official service applications, verify solvency/PAN documents, and update statuses.</p>
      </div>

      <DataTable
        headers={headers}
        data={applications}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No registration applications found."
      />

      {/* Review Application Modal */}
      {activeApp && (
        <Modal
          isOpen={!!activeApp}
          onClose={() => setActiveApp(null)}
          title="Registration Details"
        >
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            
            {/* Applicant Profile */}
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Applicant</div>
                <div className="text-sm font-bold text-white">{activeApp.applicantName}</div>
                <div className="text-xs text-gray-400 mt-0.5">{activeApp.phone}</div>
                <div className="text-xs text-gray-400 font-mono">{activeApp.email}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Target Service</div>
                <div className="text-sm font-bold text-blue-400">{activeApp.serviceTitle}</div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-bold">{activeApp.entityType} Structure</div>
                {activeApp.solvencyAmount > 0 && (
                  <div className="text-xs text-emerald-400 mt-0.5 font-bold">Solvency: ₹{activeApp.solvencyAmount.toLocaleString()}</div>
                )}
                <div className="text-[10px] mt-2 text-gray-500 font-bold uppercase">Payment Status</div>
                <div className={`text-xs font-bold ${activeApp.paymentStatus === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {activeApp.paymentStatus} {activeApp.amountDue > 0 && `(₹${activeApp.amountDue})`}
                </div>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="space-y-2">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Uploaded Credentials</div>
              {activeApp.documents && activeApp.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeApp.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-xl flex items-center gap-2 text-xs text-gray-300 font-bold hover:text-white transition-colors"
                    >
                      <DocumentIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="truncate">{doc.name}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No files whitelisted or uploaded.</p>
              )}
            </div>

            {/* Applicant Notes */}
            <div className="space-y-2">
              <div className="text-[10px] text-gray-500 font-bold uppercase">User Notes</div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-gray-300 leading-relaxed min-h-[60px]">
                {activeApp.notes || 'No custom notes provided.'}
              </div>
            </div>

            {/* Status & Review Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Application Status</label>
                <select
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                >
                  <option value="Pending" className="bg-dark-900">Pending</option>
                  <option value="Reviewing" className="bg-dark-900">Reviewing</option>
                  <option value="Approved" className="bg-dark-900">Approved</option>
                  <option value="Rejected" className="bg-dark-900">Rejected</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Admin Notes / Comments</label>
                <input
                  type="text"
                  placeholder="e.g. Verified solvency sheet"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  value={notesVal}
                  onChange={(e) => setNotesVal(e.target.value)}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase text-blue-400">Invoice Client (Amount Due in ₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  value={amountDueVal}
                  onChange={(e) => setAmountDueVal(e.target.value)}
                  disabled={activeApp.paymentStatus === 'Completed'}
                />
                <p className="text-[9px] text-gray-500">Entering an amount will generate a Pay Now button on the client's dashboard.</p>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <Button
                variant="outline"
                onClick={() => handleDelete(activeApp._id)}
                className="border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
              >
                Delete Application
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setActiveApp(null)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleUpdate} 
                  loading={updateMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  Save Changes
                </Button>
              </div>
            </div>

          </div>
        </Modal>
      )}
    </div>
  );
}
