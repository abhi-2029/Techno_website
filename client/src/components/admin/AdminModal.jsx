/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export default function AdminModal({ isOpen, onClose, title, children, onSubmit, submitLabel = 'Save Changes', isSubmitting }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
          {children}
        </div>
        
        {/* Actions Footer */}
        <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xs px-5 py-2.5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            className="text-xs px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
