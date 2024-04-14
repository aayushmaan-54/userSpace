import React from 'react';
import { Form, redirect, useLoaderData, Link } from 'react-router-dom';
import { getUsers, createPost } from '../exports';

export const AddPost = () => {

    const users = useLoaderData()

  return (
    <>
        <h1 className='strokeText text-6xl uppercase font-extrabold text-center pt-4 tracking-widest pb-20'>Add New Post</h1>
        <Form className='flex flex-col items-center justify-center' method='post'>
            <div className='flex w-full gap-10 items-center justify-center'>
                <div className='flex flex-col'>
                    <label htmlFor="title" className='text-slate-300 font-medium'>Title</label>
                    <input type="text" id='title' className='bg-4 h-fit outline-none p-1 text-slate-300 border border-3 rounded-lg text-base focus:ring-slate-100 focus:border-slate-100 font-medium pl-2 py-2 w-[45vw]' name="title"/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="author" className='text-slate-300 font-medium'>Author</label>
                    <select name="author" id="author" className='bg-4 h-fit outline-none p-1 text-slate-300 border border-3 rounded-lg text-base focus:ring-slate-100 focus:border-slate-100 font-medium pl-2 py-2 w-[30vw]'>
                        {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            <textarea name="body" id="body" cols="30" rows="10" className='bg-4 outline-none p-1 text-slate-300 border border-3 rounded-lg text-base focus:ring-slate-100 focus:border-slate-100 font-medium py-2 resize-none w-[76vw] h-[25vh] mt-10 pl-5' placeholder='message...'></textarea>
            <div className='mt-10'>
                <button type="submit" className='bg-2 h-fit shadow-lg shadow-2/50 text-4 hover:shadow-2/80 rounded-md font-semibold transition-all duration-200 ease-in-out disabled:bg-2/70 disabled:hover:shadow-1 disabled:shadow-1 px-7 py-2'>Save</button>
                <button className='bg-2 h-fit shadow-lg shadow-2/50 text-4 hover:shadow-2/80 rounded-md font-semibold transition-all duration-200 ease-in-out disabled:bg-2/70 disabled:hover:shadow-1 disabled:shadow-1 px-7 py-2 ml-20'><Link to="..">Cancel</Link></button>
            </div>
        </Form>
    </>
  )
}

async function action({ request }) {
    const formData = await request.formData()
    const title = formData.get("title")
    const body = formData.get("body")
    const author = formData.get("userId")
    
    const post = await createPost(
        { title, body, author },
        { signal: request.signal }
    )
    return redirect(`/posts/${post.id}`)
}

function loader({ request: { signal } }) {
    return getUsers({ signal })
  }
  
export const addPostRoute = {
    loader,
    action,
    element: <AddPost />,
}