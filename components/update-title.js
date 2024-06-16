'use client'
// components/UpdateTitle.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { updateNote } from '@/lib/actions/update-note';
import toast, { Toaster } from 'react-hot-toast';

const UpdateTitle = ({ note }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [newTitle, setNewTitle] = useState(note.title); // State to hold the new title


  const toggleEditing = () => {
    setEditing(!editing);
  };
  const onCancel = () => {
    setNewTitle(note.title); // Reset newTitle state to the original note title
    toggleEditing(); // Close editing mode
  };
  const onSubmit = async (data) => {
    const { newTitle } = data;
    setLoading(true);

    try {
      await updateNote({ noteId: note.id, title: newTitle }); // Pass noteId and title to updateNote function
      toast.success('Note updated successfully');
      window.location.reload();
      toggleEditing(); // Close editing mode
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note');
    } finally {
      setLoading(false);
    }
  };

  if (editing) {
    return (
        <div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex items-center">
        <Input
          type="text"
          defaultValue={note.title}
          {...register('newTitle', { required: true })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm  focus:ring-opacity-50 bg-transparent cursor-pointer"
        />
          <div className="space-x-2 flex items-center">
        <Button
        className='bg-green-200'
          variant='light'
          type="submit"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
        <Button
        className='bg-orange-200'
        variant="light" onClick={onCancel}>
              Cancel
            </Button>
        </div>
      </form>
        </div>
    );
  }

  return (
    <div >
      <div onClick={toggleEditing} className="cursor-pointer">
      {note.title}
    </div>
    <Toaster />
    </div>
  );
};

export default UpdateTitle;
