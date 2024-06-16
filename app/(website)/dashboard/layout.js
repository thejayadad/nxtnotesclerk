import Logo from '@/components/logo'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import {  currentUser } from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';
import NoteItem from '@/components/note-item';
import NewNote from '@/components/new-note';


const layout = async ({children}) => {
  const user = await currentUser()
  const creator = user.firstName
  const notes = await prisma.note.findMany({
    where: {
      creator: creator
    }
  })
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <Logo />
          <div className="flex md:grow md:flex-col sm:flex-wrap gap-1 md:space-y-2 border-r">
            <NewNote creator={creator} />
          {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))
        ) : (
          <div className="text-gray-600 text-center mt-4 cursor-pointer">
            Create your first note today!
          </div>
        )}
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          </div>
          <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <UserButton />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </div>
       </div>
       <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
      {children}
    </main>
    </div>
  )
}

export default layout