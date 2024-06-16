'use client'
// components/UpdateDescription.js
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { updateNote } from '@/lib/actions/update-note';
import PreviewEditor from './preview-description';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Dynamic import for Editor component (SSR-safe)
const Editor = dynamic(() => import('../components/editor'), { ssr: false });

// Schema validation using Yup
const schema = yup.object().shape({
  description: yup.string().required('Description is required'),
});

const UpdateDescription = ({ note }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema), // Apply schema validation resolver
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle editing mode
  const toggleEditing = () => {
    setEditing(!editing);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const { description } = data; // Access description from form data
    setLoading(true); // Set loading state while submitting

    try {
      await updateNote({ noteId: note.id, description }); // Update note with new description
      toast.success('Description updated successfully'); // Show success toast
      // Consider alternative approaches to refreshing without full reload
      window.location.reload(); // Refresh the page after update (consider alternative UX)
    } catch (error) {
      console.error('Error updating description:', error);
      toast.error('Failed to update description'); // Show error toast on update failure
    } finally {
      setLoading(false); // Reset loading state after submission
      toggleEditing(); // Exit editing mode after submission
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    toggleEditing(); // Simply toggle editing to exit editing mode without saving
  };

  return (
    <div>
      {editing ? (
        // Render form for editing description
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className='p-4'>
            <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue={note.description}
              render={({ field }) => (
                <Editor
                  {...field} // Pass field props to Editor component
                />
              )}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div className="space-x-4 flex items-center p-4">
            <button
              type="submit"
              className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-orange-900 transition duration-200 w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-block px-4 py-2 bg-secondary text-gray-700 rounded-md hover:bg-gray-400 transition duration-200 w-full"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // Render preview mode with clickable PreviewEditor
        <div className="cursor-pointer" onClick={toggleEditing}>
          <PreviewEditor value={note.description} />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default UpdateDescription;
