'use client'
// components/NewNoteForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from 'next/dynamic';
import { createNote } from '@/lib/actions/create-note';
import toast, { Toaster } from 'react-hot-toast';
import { Input } from '@nextui-org/react';

const Editor = dynamic(() => import('../components/editor'), { ssr: false });

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const NewNoteForm = ({ creator }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { title, description } = data;
    try {
      // Show 'Creating...' button state
      // Example: setLoading(true);

      await createNote({ title, description, creator });

      // Show success toast
      toast.success('Note created successfully');

      // Reset form
      reset();

      // Reload the window to reflect changes (optional)
      window.location.reload();
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');

      // Handle error state
      // Example: setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" name="creator" defaultValue={creator} />
      <div>
        <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              id="title"
              type="text"
              {...field}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          )}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Editor
              {...field}
            />
          )}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <button type="submit" className="w-full inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
        Create
      </button>
      <Toaster />
    </form>
  );
};

export default NewNoteForm;
