import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link 
    className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
    href={'/'}
    >
      <span className='text-brown-900'>Thought</span><span className='text-orange-900'>Track</span>
    </Link> 
  )
}

export default Logo

