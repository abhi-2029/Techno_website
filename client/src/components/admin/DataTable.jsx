/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React from 'react';
import Skeleton from '../common/Skeleton';

export default function DataTable({ headers = [], data = [], isLoading, renderRow, emptyMessage = 'No records found.' }) {
  if (isLoading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 space-y-4">
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-1/4 rounded-lg" />
          ))}
        </div>
        <hr className="border-white/10" />
        {Array.from({ length: 5 }).map((_, rIdx) => (
          <div key={rIdx} className="flex gap-4">
            {Array.from({ length: 4 }).map((_, cIdx) => (
              <Skeleton key={cIdx} className="h-8 w-1/4 rounded-md" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length > 0 ? (
              data.map((item, idx) => renderRow(item, idx))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-sm text-gray-500 font-semibold">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
