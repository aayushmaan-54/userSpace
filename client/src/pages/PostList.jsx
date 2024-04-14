import React from 'react';
import { getPosts } from '../exports';
import { Link, useLoaderData } from 'react-router-dom';

export const PostList = () => {

  const posts = useLoaderData();

  return (
    <>
      <h1 className='strokeText text-6xl uppercase font-extrabold text-center pt-4 tracking-widest pb-7'>Posts</h1>
      <div className='flex'>
        <div className='flex flex-col'>
          <label htmlFor=""></label>
          
        </div>
        <div className='flex flex-col'>
          <label htmlFor=""></label>
          
        </div>
        <button></button>
        <Link
            className='bg-2 h-fit shadow-lg shadow-2/50 text-4 hover:shadow-2/80 px-4 py-1 rounded-md font-semibold transition-all duration-200 ease-in-out' 
            to='/posts/new'
          >Add</Link>
      </div>
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
    </>
  )
}


function loader({ request: { signal } }) {
  return getPosts({ signal })
}

export const postListRoute = {
  loader,
  element: <PostList />
}