/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from '../../hooks/useBlogs';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function ManageBlogs() {
  const { data, isLoading } = useBlogs({ limit: 100 });
  const blogs = data?.data?.blogs || [];

  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();

  // Local state container managing interactive view variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Local state container managing interactive view variables
  const [editingBlog, setEditingBlog] = useState(null);

  // Register form validator schemas and state fields
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Event controller responding to user gestures or navigation triggers
  const handleOpenAdd = () => {
    setEditingBlog(null);
    reset({
      title: '',
      category: 'Guideline',
      coverImage: '',
      tags: '',
      content: '',
    });
    setIsModalOpen(true);
  };

  // Event controller responding to user gestures or navigation triggers
  const handleOpenEdit = (post) => {
    setEditingBlog(post);
    setIsModalOpen(true);
    setValue('title', post.title);
    setValue('category', post.category || 'Guideline');
    setValue('coverImage', post.coverImage || '');
    setValue('tags', post.tags?.join(', ') || '');
    setValue('content', post.content || '');
  };

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map((x) => x.trim()).filter(Boolean) : [],
      isPublished: true, // Auto publish on save for simplicity
    };

    if (editingBlog) {
      updateMutation.mutate(
        { id: editingBlog._id, data: payload },
        {
          onSuccess: () => {
            toast.success('Article updated successfully!');
            setIsModalOpen(false);
          },
          onError: () => toast.error('Failed to update article.'),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Article published successfully!');
          setIsModalOpen(false);
        },
        onError: () => toast.error('Failed to publish article.'),
      });
    }
  };

  // Event controller responding to user gestures or navigation triggers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Article deleted successfully!'),
        onError: () => toast.error('Failed to delete article.'),
      });
    }
  };

  const headers = ['Title', 'Category', 'Date Created', 'Actions'];

  const renderRow = (post) => (
    <tr key={post._id}>
      <td className="px-6 py-4 text-sm font-bold text-white max-w-sm truncate">{post.title}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{post.category || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-300">
        {new Date(post.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-sm space-x-2">
        <button
          onClick={() => handleOpenEdit(post)}
          className="text-xs text-blue-400 hover:text-white font-bold hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(post._id)}
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
          <h1 className="text-3xl font-bold text-white">Manage Blogs</h1>
          <p className="text-gray-500 text-xs mt-1">Publish guides and regulatory announcements on the blog.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} className="text-xs px-5 py-2.5">
          Write Post
        </Button>
      </div>

      <DataTable
        headers={headers}
        data={blogs}
        isLoading={isLoading}
        renderRow={renderRow}
        emptyMessage="No blog articles found. Write one above."
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? 'Edit Blog Post' : 'Write New Article'}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={editingBlog ? 'Update Article' : 'Publish Article'}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      >
        <div className="space-y-4">
          <Input
            label="Article Title"
            id="title"
            placeholder="e.g. New CPWD Bidding Threshold Guidelines"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="category" className="text-xs font-semibold text-gray-400">Category</label>
              <select
                id="category"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                {...register('category')}
              >
                <option value="Guideline" className="bg-gray-900">Guideline</option>
                <option value="Industry News" className="bg-gray-900">Industry News</option>
                <option value="GST Update" className="bg-gray-900">GST Update</option>
                <option value="Bidding Strategy" className="bg-gray-900">Bidding Strategy</option>
                <option value="Compliance" className="bg-gray-900">Compliance</option>
              </select>
            </div>
            <Input
              label="Cover Image URL"
              id="coverImage"
              placeholder="Unsplash / Cloudinary link"
              {...register('coverImage')}
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            id="tags"
            placeholder="e.g. CPWD, Bidding, Tender"
            {...register('tags')}
          />

          {/* Simple rich text placeholder using raw textarea */}
          <div className="space-y-1">
            <label htmlFor="content" className="text-xs font-semibold text-gray-400">Content (HTML allowed)</label>
            <textarea
              id="content"
              rows={12}
              placeholder="<p>Article body content goes here...</p>"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm font-mono"
              {...register('content', { required: 'Content is required' })}
            />
            {errors.content && <span className="text-[10px] text-red-500 font-bold">{errors.content.message}</span>}
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
