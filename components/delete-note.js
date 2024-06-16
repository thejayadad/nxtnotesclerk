'use client'
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Button } from '@nextui-org/react';
import { deleteNote } from '@/lib/actions/delete-note';
import { useRouter } from 'next/navigation';


const DeleteNote = ({note}) => {
    const [deleting, setDeleting] = useState(false); // State for deleting status
    const router = useRouter();
  
    const handleDelete = async () => {
        try {
          setDeleting(true); // Set deleting status to true when deletion is in progress
          await deleteNote({ id: note.id }); // Call the deletePlayer action
          // You can handle any additional logic after successful deletion here
          window.location.reload();
          router.push('/dashboard');
            
        } catch (error) {
          console.error('Error deleting player:', error);
        } finally {
          setDeleting(false); // Reset deleting status to false
        }
      };
  return (
    <Button
    className='text-secondary'
    variant='light' onClick={handleDelete} disabled={deleting}>
    {deleting ? 'Deleting...' : <FiTrash className='h-4 w-4' />}
  </Button>
  )
}

export default DeleteNote