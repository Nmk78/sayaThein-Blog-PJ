import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <main className='w-full h-full flex flex-col justify-center gap-4 text-center p-4 lg:p-8 lg:gap-8 lg:text-left lg:flex-row lg:justify-between lg:items-center lg:text-xl xl:text-2xl 2xl:text-3xl 2xl:gap-16 2xl:p-16 2xl:px-24'>
      <span className=' font-bold text-5xl text-red-600 '>
            404
      </span>
      <span className='font-bold text-4xl dark:text-sky-500   text-sky-600'>Page Not Found</span>
      <Link href="/" className='underline'>
            Back to home page?
      </Link>
    </main>
  )
}

export default NotFound;