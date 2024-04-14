import React from 'react'
import { useRouteError } from 'react-router-dom';

export const ErrorMsg = () => {

    const error = useRouteError();

    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <h1 className='[text-shadow:_0_4px_0_#262626] text-6xl text-3'>Error: Something Went Wrong</h1>
            <p className='text-4 text-3xl uppercase pt-7'></p>
            <p>
                {import.meta.env.MODE !== "production" && (
                    <div className='bg-4 w-[80vw] px-4 py-2 rounded-xl'>
                        <pre className="whitespace-pre-wrap">{error.message}</pre>
                        <pre className="whitespace-pre-wrap">{error.stack}</pre>
                    </div>
                )}
            </p>
        </div>
      );
}