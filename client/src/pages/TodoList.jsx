import React, { useEffect, useRef } from 'react';
import { useLoaderData, Form, Link, useSearchParams  } from 'react-router-dom';
import { getTodos } from '../exports';

const url = import.meta.env.VITE_API_URL;

export const TodoList = () => {

  const todos = useLoaderData();

  const [searchParams] = useSearchParams();
  const searchRef = useRef(null);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    searchRef.current.value = query;
  }, [query]);

  return (
    <>
      <h1 className='strokeText text-6xl uppercase font-extrabold text-center pt-4 tracking-widest pb-7'>Todos</h1>
      <div className='flex justify-between items-center mx-10'>
        <Form>
          <label htmlFor="search" className='block text-xl font-semibold pl-16 pb-3'>Search:</label>
          <div className='pl-16 pb-6'>
            <input type="search" className=' bg-4 outline-none p-1 text-slate-300 border border-3 rounded-lg text-base focus:ring-slate-100 focus:border-slate-100 font-medium w-[20vw]' id='search' name='query' ref={searchRef} />
            <button className='bg-2 shadow-lg shadow-2/50 text-4 hover:shadow-2/80 px-4 py-1  rounded-md font-semibold transition-all duration-200 ease-in-out'>Search</button>
          </div>
        </Form>
      <Link className='bg-2 shadow-lg shadow-2/50 text-4 hover:shadow-2/80 px-6 py-1  rounded-md font-semibold transition-all duration-200 ease-in-out h-fit mr-14' to='/todos/new'>New</Link>
      </div>
      <hr className='text-3 w-[90%] mx-auto pb-4' />
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
    </>
  );
}

function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";

  return getTodos({ signal })
    .then(todos => {
      if (query) {
        return todos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      return todos;
    });
}

export const todoListRoute = {
  loader,
  element: <TodoList />
}