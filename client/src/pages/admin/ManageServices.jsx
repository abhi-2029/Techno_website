/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useServices, useCreateService, useUpdateService, useDeleteService } from '../../hooks/useServices';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManageServices() {
  const { data, isLoading } = useServices({ showAll: true, limit: 100 });
  const services = data?.data?.services || [];

  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  // Local state container managing interactive view variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Local state container managing interactive view variables
  const [editingService, setEditingService] = useState(null);

  // Register form validator schemas and state fields
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Event controller responding to user gestures or navigation triggers
  const handleOpenAdd = () => {
    setEditingService(null);
    reset({
      title: '',
      shortDescription: '',
      fullDescription: '',
      icon: '',
      eligibility: '',
      processingTime: '',
      governmentFees: '',
      professionalCharges: '',
      requiredDocuments: '',
      benefits: '',
    });
    setIsModalOpen(true);
  };

  // Event controller responding to user gestures or navigation triggers
  const handleOpenEdit = (svc) => {
    setEditingService(svc);
    setIsModalOpen(true);
    // Populate form values
    setValue('title', svc.title);
    setValue('shortDescription', svc.shortDescription);
    setValue('fullDescription', svc.fullDescription || '');
    setValue('icon', svc.icon || '');
    setValue('eligibility', svc.eligibility || '');
    setValue('processingTime', svc.processingTime || '');
    setValue('governmentFees', svc.governmentFees || '');
    setValue('professionalCharges', svc.professionalCharges || '');
    setValue('requiredDocuments', svc.requiredDocuments?.join(', ') || '');
    setValue('benefits', svc.benefits?.join(', ') || '');
  };

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (formData) => {
    // Parse comma-separated documents/benefits
    const parsedData = {
      ...formData,
      requiredDocuments: formData.requiredDocuments
        ? formData.requiredDocuments.split(',').map((x) => x.trim()).filter(Boolean)
        : [],
      benefits: formData.benefits
        ? formData.benefits.split(',').map((x) => x.trim()).filter(Boolean)
        : [],
    };

    if (editingService) {
      updateMutation.mutate(
        { id: editingService._id, data: parsedData },
        {
          onSuccess: () => {
            toast.success('Service updated successfully!');
            setIsModalOpen(false);
          },
          onError: () => toast.error('Failed to update service.'),
        }
      );
    } else {
      createMutation.mutate(parsedData, {
        onSuccess: () => {
          toast.success('Service created successfully!');
          setIsModalOpen(false);
        },
        onError: () => toast.error('Failed to create service.'),
      });
    }
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Service deleted successfully!'),
        onError: () => toast.error('Failed to delete service.'),
      });
    }
  };

  const headers = ['Title', 'Processing Time', 'Govt Fees', 'Prof Charges', 'Actions'];

  const renderRow = (svc) => (
    <tr key={svc._id}>
      <td className="px-6 py-4 text-sm font-bold text-white">{svc.title}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{svc.processingTime || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{svc.governmentFees || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{svc.professionalCharges || 'N/A'}</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenEdit(svc)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(svc._id)}
          className="text-xs text-red-500 hover:text-red-400 font-bold hover:underline cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Services</h1>
          <p className="text-gray-500 text-xs mt-1">Add, update or delete services offered on the catalog.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="text-xs px-5 py-2.5">
          Add Service
        </Button>
      </div>

      {/* Services DataTable */}
      <DataTable
        headers={headers}
        data={services}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No services found. Add one above."
      />

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={editingService ? 'Update Service' : 'Create Service'}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <Input
            label="Service Title"
            id="title"
            placeholder="e.g. CPWD Registration"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Icon Name (Heroicons)"
              id="icon"
              placeholder="e.g. DocumentCheck"
              {...register('icon')}
            />
            <Input
              label="Processing Time"
              id="processingTime"
              placeholder="e.g. 15 to 30 working days"
              {...register('processingTime')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Government Fees"
              id="governmentFees"
              placeholder="e.g. ₹5,000"
              {...register('governmentFees')}
            />
            <Input
              label="Professional Charges"
              id="professionalCharges"
              placeholder="e.g. ₹15,000 onwards"
              {...register('professionalCharges')}
            />
          </div>

          <Input
            label="Eligibility"
            id="eligibility"
            placeholder="e.g. Licensed Civil Engineers or experienced firms"
            {...register('eligibility')}
          />

          <div className="space-y-1">
            <label htmlFor="shortDescription" className="text-xs font-semibold text-gray-400">Short Description</label>
            <textarea
              id="shortDescription"
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm"
              {...register('shortDescription', { required: 'Short description is required' })}
            />
            {errors.shortDescription && <span className="text-[10px] text-red-500 font-bold">{errors.shortDescription.message}</span>}
          </div>

          <div className="space-y-1">
            <label htmlFor="fullDescription" className="text-xs font-semibold text-gray-400">Full Description</label>
            <textarea
              id="fullDescription"
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm"
              {...register('fullDescription')}
            />
          </div>

          <Input
            label="Required Documents (comma-separated)"
            id="requiredDocuments"
            placeholder="PAN Card, GST registration, Bank solvency"
            {...register('requiredDocuments')}
          />

          <Input
            label="Benefits (comma-separated)"
            id="benefits"
            placeholder="Direct Bidding eligibility, Higher credit history"
            {...register('benefits')}
          />
        </div>
      </AdminModal>
    </div>
  );
}
