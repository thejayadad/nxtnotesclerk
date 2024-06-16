import DeleteNote from '@/components/delete-note';
import UpdateDescription from '@/components/update-description';
import UpdateTitle from '@/components/update-title';
import prisma from '@/lib/prisma';
import React from 'react'

const SingleNote = async ({params}) => {
  const noteId = params.id; 
  const note = await prisma.note.findUnique({
    where: {
      id: noteId
  },
  })
  return (
    <section className='py-6'>
      <div className='flex gap-6'>
          <div className='flex flex-col gap-8 w-full'>
            <div className='flex justify-center space-x-6 items-center border rounded-xl bg-orange-900 text-white'>
            <UpdateTitle note={note}/>
            <DeleteNote note={note}/>
            </div>
              <div className='border rounded-xl'>
              <UpdateDescription note={note} />
              </div>
          </div>
      </div>  
    </section>
  )
}

export default SingleNote