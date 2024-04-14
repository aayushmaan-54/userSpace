import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { getComments, getPost, getUser } from '../exports';

export const Post = () => {

  const { comments, post, user } = useLoaderData();

  return (
    <>
      <h1 className='text-xl uppercase font-bold text-center tracking-widest pt-10'>{post.title}</h1>
      <p className='pb-16 ml-10 pt-5'>By: <Link to={`/users/${user.id}`} className='link font-semibold'>{user.name}</Link></p>
      <hr className='text-3 w-4/5 mx-auto pb-4' />
      <p className='w-3/4 mx-auto text-lg font-normal'>{ post.body }</p>
      
        <h3 className='text-3xl font-semibold pt-12 pb-5 pl-14'>Comments: </h3>
        <div className='flex flex-col items-center'>
        {comments.map(comment => (
            <div className='pb-4 w-3/4' key={comment.id}>
              <div className='bg-4 px-6 py-4 rounded-md'>
                <div className='text-sm text-3 font-semibold'>{ comment.email }</div>
                <div>{ comment.body }</div>
              </div>
            </div>
        ))}
      </div>
    </>
  );
};


async function loader({ request: { signal }, params: {postId} }) {
  const comments = getComments( postId, { signal }  );
  const post = await getPost( postId, { signal } );
  const user = getUser( post.userId, { signal } );

  return { comments: await comments, post, user: await user }
}

export const postRoute = {
  loader,
  element: <Post />
}