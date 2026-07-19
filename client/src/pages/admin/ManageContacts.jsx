/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useContacts, useMarkRead, useDeleteContact } from '../../hooks/useContacts';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManageContacts() {
  const { data, isLoading } = useContacts();
  const contacts = data?.data?.contacts || data?.contacts || [];

  const readMutation = useMarkRead();
  const deleteMutation = useDeleteContact();

  // Local state container managing interactive view variables
  const [activeMessage, setActiveMessage] = useState(null); // Full message object

  // Event controller responding to user gestures or navigation triggers
  const handleOpenMessage = (msg) => {
    setActiveMessage(msg);
    if (!msg.isRead) {
      readMutation.mutate(msg._id, {
        onSuccess: () => {
          msg.isRead = true; // Local update
        },
      });
    }
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Message deleted successfully!');
          setActiveMessage(null);
        },
        onError: () => toast.error('Failed to delete message.'),
      });
    }
  };

  const headers = ['Sender', 'Email', 'Subject', 'Date', 'Status', 'Actions'];

  const renderRow = (msg) => (
    <tr key={msg._id} className={!msg.isRead ? 'bg-blue-600/5' : ''}>
      <td className="px-6 py-4 text-sm font-bold text-white">{msg.name}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{msg.email}</td>
      <td className="px-6 py-4 text-sm text-gray-300 truncate max-w-xs">{msg.subject}</td>
      <td className="px-6 py-4 text-sm text-gray-300">
        {new Date(msg.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
            msg.isRead ? 'bg-gray-800 text-gray-400' : 'bg-amber-500/20 text-amber-400 border border-amber-500/10'
          }`}
        >
          {msg.isRead ? 'Read' : 'New'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenMessage(msg)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Read
        </button>
        <button
          onClick={() => handleDelete(msg._id)}
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
        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
        <p className="text-gray-500 text-xs mt-1">Review contact inquiries submitted by site visitors.</p>
      </div>

      <DataTable
        headers={headers}
        data={contacts}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No contact inquiries found."
      />

      {/* Read Message Detail Modal */}
      {activeMessage && (
        <Modal
          isOpen={!!activeMessage}
          onClose={() => setActiveMessage(null)}
          title="Inquiry Message Details"
        >
          <div className="space-y-6">
            {/* Sender Coordinates */}
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">From</div>
                <div className="text-sm font-bold text-white">{activeMessage.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{activeMessage.phone}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Date Received</div>
                <div className="text-sm font-bold text-white">
                  {new Date(activeMessage.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 font-mono">{activeMessage.email}</div>
              </div>
            </div>

            {/* Subject & Message Content */}
            <div className="space-y-2">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Subject</div>
              <h4 className="text-base font-bold text-white">{activeMessage.subject}</h4>
              
              <div className="text-[10px] text-gray-500 font-bold uppercase pt-2">Message Body</div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-300 leading-relaxed min-h-[120px]">
                {activeMessage.message}
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <Button
                variant="outline"
                onClick={() => handleDelete(activeMessage._id)}
                className="border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
              >
                Delete Message
              </Button>
              <Button variant="secondary" onClick={() => setActiveMessage(null)}>
                Close Message
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
