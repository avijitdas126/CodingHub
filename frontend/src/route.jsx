import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Index from './pages';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
import Login from './pages/login';
const Route = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Index />
        },
        {
            path: "/dashboard/",
            element: <Dashboard />  
        },
        {
            path: "/signup",
            element: <Signup />  
        },
        {
            path: "/login",
            element: <Login />
        }
      ]);
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default Route
