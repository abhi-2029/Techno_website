/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Directs dashboard controls, travel lists, and ticket confirmations.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useBookings, useUpdateBookingStatus, useDeleteBooking } from '../../hooks/useBookings';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { PaperAirplaneIcon, TicketIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function ManageBookings() {
  const { data, isLoading } = useBookings();
  const bookings = data?.data?.bookings || data?.bookings || [];

  const updateMutation = useUpdateBookingStatus();
  const deleteMutation = useDeleteBooking();

  const [activeBooking, setActiveBooking] = useState(null);
  const [statusVal, setStatusVal] = useState('');
  const [ticketUrlVal, setTicketUrlVal] = useState('');

  const handleOpenBooking = (booking) => {
    setActiveBooking(booking);
    setStatusVal(booking.status);
    setTicketUrlVal(booking.ticketUrl || '');
  };

  const handleUpdate = () => {
    if (!activeBooking) return;

    updateMutation.mutate(
      { id: activeBooking._id, status: statusVal, ticketUrl: ticketUrlVal },
      {
        onSuccess: () => {
          toast.success('Travel booking updated successfully!');
          setActiveBooking(null);
        },
        onError: () => toast.error('Failed to update booking status.')
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking record?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Booking record deleted successfully!');
          setActiveBooking(null);
        },
        onError: () => toast.error('Failed to delete booking record.')
      });
    }
  };

  const headers = ['Type', 'Travelers', 'Route & Date', 'Estimate', 'Status', 'Actions'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/10';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border border-red-500/10';
      default: return 'bg-amber-500/20 text-amber-400 border border-amber-500/10';
    }
  };

  const renderRow = (b) => (
    <tr key={b._id}>
      <td className="px-6 py-4 text-sm font-bold text-white flex items-center gap-2">
        {b.bookingType === 'Flight' ? (
          <PaperAirplaneIcon className="w-4 h-4 text-blue-400 rotate-45 flex-shrink-0" />
        ) : (
          <TicketIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        )}
        <div>
          <div className="font-bold">{b.bookingType}</div>
          <span className="text-[10px] text-gray-500 font-mono">{b.carrierName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">
        <div>{b.passengers[0]?.name || 'N/A'} {b.passengers.length > 1 && `+${b.passengers.length - 1} more`}</div>
        <span className="text-[9px] font-bold text-gray-500 font-mono">{b.contactPhone}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        <div className="font-bold text-white capitalize">{b.from} &rarr; {b.to}</div>
        <span className="text-xs text-gray-500">{new Date(b.departureDate).toLocaleDateString()} ({b.travelClass})</span>
      </td>
      <td className="px-6 py-4 text-sm font-bold text-emerald-400">
        ₹{b.price.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-sm">
        <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(b.status)}`}>
          {b.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenBooking(b)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Review
        </button>
        <button
          onClick={() => handleDelete(b._id)}
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
        <h1 className="text-3xl font-bold text-white">Travel Bookings</h1>
        <p className="text-gray-500 text-xs mt-1">Review flight and train ticket bookings, issue seat codes, and upload ticket PDFs.</p>
      </div>

      <DataTable
        headers={headers}
        data={bookings}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No travel bookings found."
      />

      {/* Review Booking Modal */}
      {activeBooking && (
        <Modal
          isOpen={!!activeBooking}
          onClose={() => setActiveBooking(null)}
          title="Travel Booking Details"
        >
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            
            {/* Route Summary */}
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Journey</div>
                <div className="text-base font-black text-white capitalize">{activeBooking.from} &rarr; {activeBooking.to}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(activeBooking.departureDate).toLocaleDateString()}</div>
                <div className="text-[10px] text-blue-400 uppercase font-bold mt-0.5">{activeBooking.bookingType} Class: {activeBooking.travelClass}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Carrier</div>
                <div className="text-sm font-bold text-white">{activeBooking.carrierName}</div>
                <div className="text-xs text-gray-400 mt-0.5">Total Fare Charged</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">₹{activeBooking.price.toLocaleString()}</div>
              </div>
            </div>

            {/* Passenger List */}
            <div className="space-y-2">
              <div className="text-[10px] text-gray-500 font-bold uppercase">Travelers ({activeBooking.passengers.length})</div>
              <div className="space-y-2">
                {activeBooking.passengers.map((p, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{p.name}</span>
                      <span className="text-gray-400 ml-2">(Age: {p.age})</span>
                    </div>
                    {p.identityNumber && (
                      <span className="font-mono text-gray-500">ID: {p.identityNumber}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-3">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase">Contact Phone</span>
                <p className="text-xs text-white font-mono">{activeBooking.contactPhone}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase">Contact Email</span>
                <p className="text-xs text-white font-mono">{activeBooking.contactEmail}</p>
              </div>
            </div>

            {/* Status & Review Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Booking Status</label>
                <select
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                >
                  <option value="Pending" className="bg-dark-900">Pending</option>
                  <option value="Confirmed" className="bg-dark-900">Confirmed</option>
                  <option value="Cancelled" className="bg-dark-900">Cancelled</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Ticket PDF / Confirmation Link</label>
                <input
                  type="text"
                  placeholder="Paste direct download URL"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  value={ticketUrlVal}
                  onChange={(e) => setTicketUrlVal(e.target.value)}
                />
              </div>
            </div>

            {/* Issued Ticket Display */}
            {activeBooking.ticketUrl && (
              <div className="pt-2">
                <a
                  href={activeBooking.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-bold"
                >
                  <span className="flex items-center gap-1.5"><DocumentArrowDownIcon className="w-4 h-4" /> Download Issued Ticket</span>
                  <span>View &rarr;</span>
                </a>
              </div>
            )}

            {/* Footer Action */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <Button
                variant="outline"
                onClick={() => handleDelete(activeBooking._id)}
                className="border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
              >
                Delete Record
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setActiveBooking(null)}>
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
