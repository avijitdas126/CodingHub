import React from 'react'
import {
  BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";
import Index from './pages';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
import Login from './pages/login';
import Live from './pages/live';
import Community from './pages/community';
import Auth from './pages/utility/auth';
import Error from './pages/404';
import EditorFile from './pages/editorfile';
import Webid from './pages/utility/webid';
function PublicRoute() {
  return (
    <>
   
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<Index/>} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
      
       <Route path='/:type' element={<Auth/>}/>
       <Route path={`/dashboard/:id`} element={<Dashboard />} />
      <Route path={`/live/:id`} element={<Live />} />
      <Route path={`/community/:id`} element={<Community />} />
      <Route path='/editor/:mode/:profile/:file_name/:id' element={<EditorFile />} />
      <Route path="/webid/:name/:id" element={<Webid />} />

      <Route path="*" element={<Error />} />
       </Routes>
     </BrowserRouter>
    </>
  )
}
// /webid/:id
export default PublicRoute
