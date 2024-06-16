import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const HomePage = async () => {
  const { userId } = auth();
if(userId){
  redirect('/dashboard')
}
  return (
    <section className='py-6'>
      <div className='container mx-auto flex px-5 items-center justify-center flex-col'>
        <img
          className='lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded'
          src='../hero.png'
        />
        <div className='text-center lg:w-2/3 w-full'>
          <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>Thought Tracker</h1>
          <p className='mb-8 leading-relaxed'>Thought Track is your digital companion for capturing, organizing, and revisiting your thoughts effortlessly. Seamlessly designed for intuitive note-taking, Thought Track helps you stay organized and focused on what matters most in your day-to-day life</p>
        </div>
        <div>
      <Link href={'/sign-up'}>
      <Button
          variant='light'
          className='bg-primary text-white'
          >LogIn Here</Button>
      </Link>
        </div>
      </div>
    </section>
  )
}

export default HomePage