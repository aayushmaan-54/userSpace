import React, { useRef } from 'react';
import { Link, Form, redirect, useActionData, useNavigation } from 'react-router-dom';

const url = import.meta.env.VITE_API_URL;

export const AddTodo = () => {
  const addRef = useRef();
  const errorMsg = useActionData();
  const { state } = useNavigation();
  const isSubmitting = (state === "submitting" || state === "loading");

  return (
    <>
      <h1 className='strokeText text-6xl uppercase font-extrabold text-center tracking-widest pb-7 pt-10'>Add New ToDo</h1>
      <Form
        className=' w-[100vw] h-[40vh] p-0 m-0 flex items-center justify-center gap-5'
        method='post'
      >
        <div className='flex flex-col'>
          <input
            type="text"
            className=' bg-4 h-fit outline-none p-1 text-slate-300 border border-3 rounded-lg text-base focus:ring-slate-100 focus:border-slate-100 font-medium w-[50vw] pl-2 py-2'
            id='title'
            ref={addRef}
            placeholder='Add Todo...'
            name='title'
          />
          <div className=' text-[#FF0000] text-xs'>{errorMsg}</div>
        </div>
        <button
            type="submit"
            className="bg-2 h-fit shadow-lg shadow-2/50 text-4 hover:shadow-2/80 px-4 py-1 rounded-md font-semibold transition-all duration-200 ease-in-out disabled:bg-2/70 disabled:hover:shadow-1 disabled:shadow-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Add"}
          </button>
        <Link
          className='bg-2 h-fit shadow-lg shadow-2/50 text-4 hover:shadow-2/80 px-4 py-1 rounded-md font-semibold transition-all duration-200 ease-in-out' 
          to='..'
        >
          Back
        </Link>
      </Form>
    </>
  );
};

export async function addTodoAction({ request }) {
  const formData = await request.formData();
  const title = formData.get('title');

  if(title === "") {
    return "* Title is Required *";
  }

  const todo = await fetch(`${url}/todos`, {
    method: "POST",
    signal: request.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  }).then(res => res.json());
  return redirect("/");
}