import React, { useState, useEffect, useRef } from "react";
import Nav from "./utility/nav";
import data from "/src/pages/utility/details.json";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Card from "./utility/card";
import { Copy, Delete, LogOut, Plus, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Upload from "./utility/uploads";
import Uploads from "./utility/uploads";
function Webupload() {
  const aref = useRef([]);
  const [user, setuser] = useState({});
  const [isLogout, setisLogout] = useState(false);
  const [reload, setreload] = useState(true);

  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play = async () => {
      try {
        let fetch_data = await fetch(`https://codinghub-5gt0.onrender.com/user/get_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let status = fetch_data.status;
        let res = await fetch_data.json();
        if (status < 400) {
          setuser(res);
        } else {
          throw res;
        }
      } catch (error) {
        console.log(error);
        navigator("/login");
      }
    };
    play();
  }, [reload]);
  return (
    <>
      <div className="flex w-full">
        <Nav
          data={data[2].dashboard}
          color={"#000000"}
          parallel={false}
          logo={false}
          textColor=""
          searchIconColor={"blue"}
          search={false}
          profile={false}
          set={isLogout}
          isSet={setisLogout}
          profile_url={`/profile/${Cookies.get("userid")}`}
          user={false}
          user_img={user?.avatar_url}
          profile_img={user?.avatar_url}
          className="w-[13vw]"
        />
        <div className="bg-red-200 w-[87vw] h-[100vh] relative overflow-x-hidden">
          <Nav
            data={[]}
            color={"gray"}
            parallel={true}
            logo={true}
            textColor=""
            searchIconColor={"blue"}
            search={false}
            profile={true}
            profile_url={`/profile/${Cookies.get("userid")}`}
            user={false}
            user_img={user?.avatar_url}
            profile_img={user?.avatar_url}
            half={true}
            className="w-[87vw]"
          />

          <Uploads />
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ${
          isLogout ? "block" : "hidden"
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <button
            className="absolute top-2 right-2 text-black"
            onClick={() => {
              setisLogout(!isLogout);
            }}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">
            Want to logout from dashboard?
          </h2>
          <div className="flex justify-around">
            <button
              className="btn"
              onClick={() => {
                setisLogout(!isLogout);
              }}
            >
              <X /> Cancel
            </button>
            <button
              className="btn bg-red-600 hover:bg-red-700"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("userid");
                window.location.reload();
              }}
            >
              {" "}
              <LogOut /> Logout
            </button>
          </div>
        </div>
        {/* <h1 className='font-extrabold text-2xl mb-5 mx-auto'>Create a New File</h1> */}
      </div>
      <ToastContainer />
    </>
  );
}

export default Webupload;
