import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { getPosts, getTodos, getUser } from '../exports';

export const User = () => {
  const { user, posts, todos } = useLoaderData();
  return (
    <>
      <h1 className='text-xl uppercase font-bold text-center tracking-widest pb-10 pt-10'>{user.name}</h1>
      <hr className='text-3 w-4/5 mx-auto pb-4' />
      <div className='w-3/4 mx-auto text-lg font-normal'>
        <p className='pb-10'>{user.email}</p>
        <p className='pb-2'><b>Company: </b> {user.company.name}</p>
        <p className='pb-2'><b>Website: </b> {user.website}</p>
        <p className='pb-2'><b>Address: </b>{user.address.street} {user.address.suite} {user.address.city} {user.address.zipcode}</p>
      </div>
      <hr className='text-3 w-4/5 mx-auto pb-4 mt-6' size="80px" />
      <div>
        <h1 className='text-2xl uppercase font-extrabold pt-4 tracking-widest pb-7  pl-24'>Posts: </h1>
        <div className='flex items-center flex-wrap gap-8 justify-center pb-5'>
      {posts.map(post => (
        <div key={`${post.id}`}>
          <div className='bg-4 w-[300px] max-h-[260px] px-4 py-6 rounded-lg'>
            <div className='flex flex-col h-full'>
              <h1 className='text-2xl pb-1 truncate'>{post.title}</h1>
              <hr className='text-3' size="80px" />
              <div className='flex-grow overflow-hidden'>
                <p className='text-3 line-clamp-5'>
                  {post.body}
                </p>
              </div>
              <hr className='text-3 hr pb-4' />
              <Link to={`/posts/${post.id}`} className='text-1 rounded px-8 py-2 font-medium bg-gradient-to-r from-slate-300 via-slate-50 to-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:via-slate-50 hover:to-slate-50 w-fit'>View</Link>
            </div>
          </div>
        </div>
      ))}
      </div>

        <h1 className='text-2xl uppercase font-extrabold tracking-widest pb-7  pl-14 pt-10'>Todos:</h1>
        <ul className='list-disc pl-20 text-xl'>
        {todos.map(todo => {
          const todoCompletedStyle = todo.completed
            ? {
                textDecoration: 'line-through',
                color: '#9d9d9d',
                textDecorationColor: 'white',
              }
            : {};

          return (
            <li key={`${todo.id}`} style={todoCompletedStyle} className='pb-3'>
              {todo.title}
            </li>
          );
        })}
      </ul>
      </div>
    </>
  )
}

async function loader({ request: { signal }, params: { userId } }) {
  const posts = getPosts( { signal, params: { userId } } );
  const todos = getTodos( { signal, params: { userId } } );
  const user = getUser( userId, { signal });
  return { user: await user, posts: await posts, todos: await todos };
}

export const userRoute = {
  loader,
  element: <User />
}