/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '../../hooks/useTestimonials';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManageTestimonials() {
  const { data, isLoading } = useTestimonials({ showAll: true });
  const testimonials = data?.data?.testimonials || [];

  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  // Local state container managing interactive view variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Local state container managing interactive view variables
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Register form validator schemas and state fields
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Event controller responding to user gestures or navigation triggers
  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    reset({
      name: '',
      role: '',
      company: '',
      rating: 5,
      avatar: '',
      content: '',
    });
    setIsModalOpen(true);
  };

  // Event controller responding to user gestures or navigation triggers
  const handleOpenEdit = (tst) => {
    setEditingTestimonial(tst);
    setIsModalOpen(true);
    setValue('name', tst.name);
    setValue('role', tst.role);
    setValue('company', tst.company || '');
    setValue('rating', tst.rating || 5);
    setValue('avatar', tst.avatar || '');
    setValue('content', tst.content || '');
  };

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      rating: parseInt(formData.rating, 10) || 5,
      isActive: true,
    };

    if (editingTestimonial) {
      updateMutation.mutate(
        { id: editingTestimonial._id, data: payload },
        {
          onSuccess: () => {
            toast.success('Testimonial updated successfully!');
            setIsModalOpen(false);
          },
          onError: () => toast.error('Failed to update testimonial.'),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Testimonial added successfully!');
          setIsModalOpen(false);
        },
        onError: () => toast.error('Failed to add testimonial.'),
      });
    }
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial review?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Testimonial deleted successfully!'),
        onError: () => toast.error('Failed to delete testimonial.'),
      });
    }
  };

  const headers = ['Client Name', 'Role & Company', 'Rating', 'Actions'];

  const renderRow = (tst) => (
    <tr key={tst._id}>
      <td className="px-6 py-4 text-sm font-bold text-white">{tst.name}</td>
      <td className="px-6 py-4 text-sm text-gray-300">
        {tst.role} • <span className="text-blue-400 font-semibold">{tst.company || 'N/A'}</span>
      </td>
      <td className="px-6 py-4 text-sm text-amber-500 font-bold font-mono">{tst.rating || 5} ★</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenEdit(tst)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(tst._id)}
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
          <h1 className="text-3xl font-bold text-white">Manage Testimonials</h1>
          <p className="text-gray-500 text-xs mt-1">Review and manage client reviews displayed on the home page.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="text-xs px-5 py-2.5">
          Add Testimonial
        </Button>
      </div>

      <DataTable
        headers={headers}
        data={testimonials}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No testimonials found. Add one above."
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTestimonial ? 'Edit Testimonial Review' : 'Add New Testimonial'}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <Input
            label="Client Name"
            id="name"
            placeholder="e.g. Amit Kumar Singh"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Designation / Role"
              id="role"
              placeholder="e.g. Managing Director"
              error={errors.role?.message}
              {...register('role', { required: 'Role is required' })}
            />
            <Input
              label="Company Name"
              id="company"
              placeholder="e.g. A. K. Builders"
              {...register('company')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="rating" className="text-xs font-semibold text-gray-400">Rating Stars</label>
              <select
                id="rating"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                {...register('rating')}
              >
                <option value="5" className="bg-gray-900">5 Stars (Excellent)</option>
                <option value="4" className="bg-gray-900">4 Stars (Good)</option>
                <option value="3" className="bg-gray-900">3 Stars (Average)</option>
              </select>
            </div>
            <Input
              label="Avatar Image URL"
              id="avatar"
              placeholder="Unsplash profile link"
              {...register('avatar')}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="content" className="text-xs font-semibold text-gray-400">Review Content</label>
            <textarea
              id="content"
              rows={4}
              placeholder="Client quote/review details..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm"
              {...register('content', { required: 'Review content is required' })}
            />
            {errors.content && <span className="text-[10px] text-red-500 font-bold">{errors.content.message}</span>}
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
