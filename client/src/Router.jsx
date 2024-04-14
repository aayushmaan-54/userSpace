import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout, postListRoute, userListRoute, todoListRoute, postRoute, userRoute, NotFound, ErrorMsg, AddTodo, addTodoAction, addPostRoute } from './exports';


export const routes = createBrowserRouter([{
        path: '/',
        element: <RootLayout />,
        children: [
            { errorElement: <ErrorMsg />, children: [
                { index: true, element: <Navigate to='/posts' /> },
                { path: 'posts', children: [
                    { index: true, ...postListRoute },
                    { path: ":postId", ...postRoute },
                    { path: "new", ...addPostRoute }
                ]},
                { path: 'users', children: [
                    { index: true, ...userListRoute },
                    { path: ':userId', ...userRoute }
                ]},
                { path: 'todos', children: [
                    { index: true, ...todoListRoute },
                    { path: 'new', element: <AddTodo />,  action: addTodoAction }]
                },
                { path: '*', element: <NotFound /> }
            ]}
        ]
    },
])