import React from 'react';
import { Link, Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

export const RootLayout = () => {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <nav className='flex justify-between px-5 bg-4 py-5'>
        <div>
          <Link to='/' className='link text-xl'>userSpace</Link>
        </div>
        <ul className='flex gap-6 text-lg'>
          <li><Link to='/posts' className='link'>Posts</Link></li>
          <li><Link to='/users' className='link'>Users</Link></li>
          <li><Link to='/todos' className='link'>Todos</Link></li>
        </ul>
      </nav>
      <ScrollRestoration />
      {isLoading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="flex justify-center items-center h-full">
            <div className="animate-ping h-20 w-20 rounded-full bg-2"></div>
          </div>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </>
  );
};