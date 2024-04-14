import React from 'react'

export const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[70vh]'>
        <h1 className='[text-shadow:_0_4px_0_#262626] text-9xl text-3'>Error: 404</h1>
        <p className='text-4 text-3xl uppercase pt-7'>Not Found</p>
    </div>
  );
}