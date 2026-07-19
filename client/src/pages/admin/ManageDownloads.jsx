/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDownloads, useCreateDownload, useDeleteDownload } from '../../hooks/useDownloads';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManageDownloads() {
  const { data, isLoading } = useDownloads();
  const downloads = data?.data?.downloads || [];

  const createMutation = useCreateDownload();
  const deleteMutation = useDeleteDownload();

  // Local state container managing interactive view variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Register form validator schemas and state fields
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Event controller responding to user gestures or navigation triggers
  const handleOpenAdd = () => {
    reset({
      title: '',
      description: '',
      fileUrl: '',
      fileSize: '',
      fileType: 'pdf',
      category: 'tender-forms',
    });
    setIsModalOpen(true);
  };

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (formData) => {
    // Extract file name from URL or use title
    const fileName = formData.fileUrl.split('/').pop() || `${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${formData.fileType}`;

    const payload = {
      title: formData.title,
      description: formData.description,
      fileUrl: formData.fileUrl,
      fileName,
      fileSize: formData.fileSize || '1.2 MB',
      fileType: formData.fileType,
      category: formData.category,
      isActive: true,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Download entry created successfully!');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Failed to create download entry.'),
    });
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this file entry?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Download entry deleted successfully!'),
        onError: () => toast.error('Failed to delete download entry.'),
      });
    }
  };

  const headers = ['Title', 'Category', 'Size', 'DL Count', 'Actions'];

  const renderRow = (dl) => (
    <tr key={dl._id}>
      <td className="px-6 py-4 text-sm font-bold text-white">{dl.title}</td>
      <td className="px-6 py-4 text-sm text-gray-300 capitalize">{dl.category?.replace('-', ' ')}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{dl.fileSize || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{dl.downloadCount || 0}</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <a
          href={dl.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline"
        >
          View
        </a>
        <button
          onClick={() => handleDelete(dl._id)}
          className="text-xs text-red-500 hover:text-red-400 font-bold hover:underline cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Downloads</h1>
          <p className="text-gray-500 text-xs mt-1">Upload and link official forms/brochures for user downloading.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="text-xs px-5 py-2.5">
          Upload File
        </Button>
      </div>

      <DataTable
        headers={headers}
        data={downloads}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No downloads configured yet. Upload one above."
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Downloadable File"
        onSubmit={handleSubmit(onSubmit)}
        submitLabel="Publish File"
        isSubmitting={createMutation.isPending}
      >
        <div className="space-y-4">
          <Input
            label="File Title"
            id="title"
            placeholder="e.g. CPWD Class-IV Application Form"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />

          <Input
            label="File Description"
            id="description"
            placeholder="e.g. Official application template form in PDF format."
            {...register('description')}
          />

          <Input
            label="File Direct URL (Cloudinary or Google Drive)"
            id="fileUrl"
            placeholder="https://res.cloudinary.com/.../document.pdf"
            error={errors.fileUrl?.message}
            {...register('fileUrl', { required: 'File URL is required' })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="File Size"
              id="fileSize"
              placeholder="e.g. 1.5 MB"
              {...register('fileSize')}
            />
            
            <div className="space-y-1">
              <label htmlFor="fileType" className="text-xs font-semibold text-gray-400">File Format</label>
              <select
                id="fileType"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                {...register('fileType')}
              >
                <option value="pdf" className="bg-gray-900">PDF</option>
                <option value="doc" className="bg-gray-900">Word Document</option>
                <option value="xlsx" className="bg-gray-900">Excel Sheet</option>
                <option value="zip" className="bg-gray-900">ZIP File</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="category" className="text-xs font-semibold text-gray-400">Category</label>
              <select
                id="category"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                {...register('category')}
              >
                <option value="tender-forms" className="bg-gray-900">Tender Forms</option>
                <option value="application-forms" className="bg-gray-900">Application Forms</option>
                <option value="brochures" className="bg-gray-900">Brochures</option>
                <option value="others" className="bg-gray-900">Others</option>
              </select>
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
