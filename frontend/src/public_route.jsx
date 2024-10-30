import React from "react";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Live from "./pages/live";
import Community from "./pages/community";
import Auth from "./pages/utility/auth";
import Error from "./pages/404";
import EditorFile from "./pages/editorfile";
import Webid from "./pages/utility/webid";
import Public from "./pages/utility/public";
import Upload from "./pages/utility/uploads";
import Webupload from "./pages/webupload";
import Share from "./pages/share";
import Share_community from "./pages/share_community";
import { Profile } from "./pages/profile";

function PublicRoute() {
  return (
    <>
      {/* Define all public routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/asserts" element={<Webupload />} />
          <Route path="/:type" element={<Auth />} />
          <Route path={`/dashboard/:id`} element={<Dashboard />} />
          <Route path={`/live/:id`} element={<Live />} />
          <Route path={`/community/:id`} element={<Community />} />
          <Route
            path="/editor/:mode/:profile/:file_name/:id"
            element={<EditorFile />}
          />
          <Route path="/community/share/:id" element={<Share_community />} />
          <Route path="/webid/:name/:id" element={<Webid />} />
          <Route path="/profile/:userid" element={<Profile />} />
          <Route path="/community/edit/:mode/:id" element={<Public />} />
          <Route path="/public/:name/:id" element={<Public />} />
          <Route path="/share/:id" element={<Share />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
// /webid/:id
export default PublicRoute;
