'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NoteItem = ({ note }) => {
  const pathname = usePathname();


  return (
    <Link
      href={`/dashboard/note/${note.id}`}
      passHref
    
  
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-primary p-3 text-sm font-medium hover:bg-slate-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            pathname === `/dashboard/note/${note.id}` && 'bg-orange-900 text-white'
            
        )}
   
      >
        {note.title}

    </Link>
  );
};

export default NoteItem;
