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
      {/* <Theme file="Hello_world" file_id="" profile_name="Avijit Das" client_id="" Html="" Css="" Js="" readonly={false}/> */}
      {/* {/* < Card bool={true} user_name="Avijit Das" file_name="Hello_world"/> */}
{/* < Card bool={false} user_name="Avijit Das" file_name="Hello_world"/>  */}
      {/* <Asset url="/download.jfif" index="1"/> */}
      {/* <Upload /> */}
      {/* <Nav
        data={data[2]}
        color={color}
        parallel={true}
        logo={true}
        textColor=''
        searchIconColor={'blue'}
        search={true}
        profile={true}
        profile_url={"/"}
        user={false}
        user_img={'/download.jfif'}
        profile_img={
          "https://lh3.googleusercontent.com/ogw/AF2bZyhGZHzvEXxL4xS4OxPKg60bWU-gzRssFPPutFiVBsdLftg=s32-c-mo"
        }
      /> */}
{/* <Dashboard /> */}
<PublicRoute />
    </>
  );
}
