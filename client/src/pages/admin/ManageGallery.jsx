/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGallery, useCreateGallery, useDeleteGallery } from '../../hooks/useGallery';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManageGallery() {
  const { data, isLoading } = useGallery();
  const galleryList = data?.data?.gallery || [];

  const createMutation = useCreateGallery();
  const deleteMutation = useDeleteGallery();

  // Local state container managing interactive view variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Register form validator schemas and state fields
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Event controller responding to user gestures or navigation triggers
  const handleOpenAdd = () => {
    reset({
      title: '',
      description: '',
      projectType: '',
      location: '',
      imageUrl: '',
      videoUrl: '',
    });
    setIsModalOpen(true);
  };

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (formData) => {
    // Structure images and videos as arrays
    const images = formData.imageUrl ? [{ url: formData.imageUrl, caption: '' }] : [];
    const videos = formData.videoUrl ? [{ url: formData.videoUrl, caption: '', thumbnail: '' }] : [];

    const payload = {
      title: formData.title,
      description: formData.description,
      projectType: formData.projectType,
      location: formData.location,
      images,
      videos,
      completionDate: new Date(),
      isFeatured: false,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Gallery item created successfully!');
        setIsModalOpen(false);
      },
      onError: () => toast.error('Failed to create gallery item.'),
    });
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Gallery item deleted successfully!'),
        onError: () => toast.error('Failed to delete gallery item.'),
      });
    }
  };

  const headers = ['Title', 'Project Type', 'Location', 'Actions'];

  const renderRow = (item) => (
    <tr key={item._id}>
      <td className="px-6 py-4 text-sm font-bold text-white">{item.title}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{item.projectType}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{item.location || 'N/A'}</td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleDelete(item._id)}
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
          <h1 className="text-3xl font-bold text-white">Manage Gallery</h1>
          <p className="text-gray-500 text-xs mt-1">Configure images/videos visible on the completed projects gallery.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="text-xs px-5 py-2.5">
          Add Project Media
        </Button>
      </div>

      <DataTable
        headers={headers}
        data={galleryList}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No project media items found. Add one above."
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Project Media"
        onSubmit={handleSubmit(onSubmit)}
        submitLabel="Publish Media"
        isSubmitting={createMutation.isPending}
      >
        <div className="space-y-4">
          <Input
            label="Project Title"
            id="title"
            placeholder="e.g. Bailey Road Flyover Cost Estimate"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />

          <Input
            label="Project Type"
            id="projectType"
            placeholder="e.g. Civil Works / DPR Reports"
            error={errors.projectType?.message}
            {...register('projectType', { required: 'Project type is required' })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              id="location"
              placeholder="e.g. Danapur, Patna"
              {...register('location')}
            />
            
            <Input
              label="Direct Image URL (Cloudinary / Unsplash)"
              id="imageUrl"
              placeholder="https://res.cloudinary.com/.../img.jpg"
              {...register('imageUrl')}
            />
          </div>

          <Input
            label="Video URL (YouTube/Vimeo watch link)"
            id="videoUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            {...register('videoUrl')}
          />

          <div className="space-y-1">
            <label htmlFor="description" className="text-xs font-semibold text-gray-400">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Detailed description of project challenges, measurements, and work accomplishments..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm"
              {...register('description')}
            />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
