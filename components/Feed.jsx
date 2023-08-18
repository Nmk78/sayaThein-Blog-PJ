import Image from 'next/image'
import React from 'react'

const Feed = () => {
  return (
    <div className='w-full h-72 bg-slate-400'>
        <Image
          src="/images/sample5.jpg"
          alt="logo"
          width={250}
          height={100}
          className="object-contain bg-slate-600"
        />    </div>
  )
}

export default Feed