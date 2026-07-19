/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePricing, useCreatePricing, useUpdatePricing, useDeletePricing } from '../../hooks/usePricing';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManagePricing() {
  const { data, isLoading } = usePricing();
  const pricingList = data?.data?.pricing || [];

  const createMutation = useCreatePricing();
  const updateMutation = useUpdatePricing();
  const deleteMutation = useDeletePricing();

  // Local state container managing interactive view variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Local state container managing interactive view variables
  const [editingPricing, setEditingPricing] = useState(null);

  // Register form validator schemas and state fields
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Event controller responding to user gestures or navigation triggers
  const handleOpenAdd = () => {
    setEditingPricing(null);
    reset({
      serviceName: '',
      slug: '',
      tier1Price: '',
      tier2Price: '',
      tier3Price: '',
    });
    setIsModalOpen(true);
  };

  // Event controller responding to user gestures or navigation triggers
  const handleOpenEdit = (prc) => {
    setEditingPricing(prc);
    setIsModalOpen(true);
    setValue('serviceName', prc.serviceName);
    setValue('slug', prc.slug);
    setValue('tier1Price', prc.tiers?.[0]?.price || '');
    setValue('tier2Price', prc.tiers?.[1]?.price || '');
    setValue('tier3Price', prc.tiers?.[2]?.price || '');
  };

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (formData) => {
    // Structure tiers: Basic, Standard, Enterprise
    const structuredTiers = [
      {
        name: 'Basic Filing',
        price: formData.tier1Price || '₹1,999',
        features: ['Document checklist verification', 'Portal registration setup', 'Single application filing', 'Email support'],
        isPopular: false,
      },
      {
        name: 'Standard Consultancy',
        price: formData.tier2Price || '₹4,999',
        features: ['Complete end-to-end documentation', 'Dedicated support officer', 'Official liaison representation', 'Correction support if rejected', 'WhatsApp support'],
        isPopular: true,
      },
      {
        name: 'Enterprise VIP Service',
        price: formData.tier3Price || 'Custom Pricing',
        features: ['Priority 24/7 submission track', 'On-site consultant review', 'Multiple state representation', 'Complementary GST/DSC services', 'Lifetime renewal tracking'],
        isPopular: false,
      },
    ];

    const payload = {
      serviceName: formData.serviceName,
      slug: formData.slug || formData.serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tiers: structuredTiers,
      isActive: true,
    };

    if (editingPricing) {
      updateMutation.mutate(
        { id: editingPricing._id, data: payload },
        {
          onSuccess: () => {
            toast.success('Pricing updated successfully!');
            setIsModalOpen(false);
          },
          onError: () => toast.error('Failed to update pricing.'),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Pricing created successfully!');
          setIsModalOpen(false);
        },
        onError: () => toast.error('Failed to create pricing.'),
      });
    }
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pricing?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Pricing deleted successfully!'),
        onError: () => toast.error('Failed to delete pricing.'),
      });
    }
  };

  const headers = ['Service Name', 'Basic Price', 'Standard Price', 'Enterprise Price', 'Actions'];

  const renderRow = (prc) => (
    <tr key={prc._id}>
      <td className="px-6 py-4 text-sm font-bold text-white">{prc.serviceName}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{prc.tiers?.[0]?.price || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{prc.tiers?.[1]?.price || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-300 font-mono">{prc.tiers?.[2]?.price || 'N/A'}</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenEdit(prc)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(prc._id)}
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
          <h1 className="text-3xl font-bold text-white">Manage Pricing</h1>
          <p className="text-gray-500 text-xs mt-1">Set service package tiers visible on the pricing table.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="text-xs px-5 py-2.5">
          Add Pricing
        </Button>
      </div>

      <DataTable
        headers={headers}
        data={pricingList}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No pricing configured yet. Add one above."
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPricing ? 'Edit Pricing Plan' : 'Add New Pricing'}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={editingPricing ? 'Update Pricing' : 'Create Pricing'}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <Input
            label="Service Name"
            id="serviceName"
            placeholder="e.g. CPWD Registration"
            error={errors.serviceName?.message}
            {...register('serviceName', { required: 'Service name is required' })}
          />

          <Input
            label="Service Slug"
            id="slug"
            placeholder="e.g. cpwd-registration"
            {...register('slug')}
          />

          <div className="border-t border-white/5 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tiers Price Setup</h4>
            
            <Input
              label="Basic Plan Price"
              id="tier1Price"
              placeholder="e.g. ₹1,999"
              {...register('tier1Price')}
            />

            <Input
              label="Standard Plan Price"
              id="tier2Price"
              placeholder="e.g. ₹4,999"
              {...register('tier2Price')}
            />

            <Input
              label="Enterprise Plan Price"
              id="tier3Price"
              placeholder="e.g. Custom Pricing"
              {...register('tier3Price')}
            />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
