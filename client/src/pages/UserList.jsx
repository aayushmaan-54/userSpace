import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getUsers } from '../exports';

export const UserList = () => {

  const users = useLoaderData();

  return (
    <>
      <h1 className='strokeText text-6xl uppercase font-extrabold text-center pt-4 tracking-widest pb-7'>Users</h1>
      <div className='flex items-center flex-wrap gap-8 justify-center pb-5'>
      {users.map(user => (
        <div key={user.id}>
          <div className='bg-4 w-[300px] max-h-[260px] px-4 py-6 rounded-lg'>
            <div className='flex flex-col h-full'>
              <h1 className='text-2xl pb-1 truncate'>{user.name}</h1>
              <hr className='text-3' size="80px" />
              <div className='flex-grow overflow-hidden'>
                <p className='text-3 line-clamp-5'>
                  {user.company.name}
                </p>
                <p className='text-3 line-clamp-5'>
                  {user.website}
                </p>
                <p className='text-3 line-clamp-5'>
                  {user.email}
                </p>
              </div>
              <hr className='text-3 hr pb-4' />
              <Link to={user.id.toString()} className='text-1 rounded px-8 py-2 font-medium bg-gradient-to-r from-slate-300 via-slate-50 to-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:via-slate-50 hover:to-slate-50 w-fit'>View</Link>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  )
}

function loader({ request: { signal } }) {
  return getUsers({ signal })
}

export const userListRoute = {
  loader,
  element: <UserList />,
}