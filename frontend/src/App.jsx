import React from "react";
import "./index.css";
import Theme from "./pages/utility/theme";
import CodeEditor from "./Editor";
import Card from "./pages/utility/card";
import Asset from "./pages/utility/assets";
import Upload from "./pages/utility/uploads";
import Nav from "./pages/utility/nav";
import data from "/src/pages/utility/details.json";
import Dashboard from "./pages/dashboard";
import PublicRoute from "./public_route";
export default function App() {
  let color = "#000000";
  return (
    <>
<PublicRoute />
    </>
  );
}
