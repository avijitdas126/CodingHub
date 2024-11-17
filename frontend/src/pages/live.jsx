import React, { useState, useEffect, useRef } from "react";
import Nav from "./utility/nav";
import data from "/src/pages/utility/details.json";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Card from "./utility/card";
import { Copy, Delete, LogOut, Plus, X } from "lucide-react";
import { NavLink } from "react-router-dom";
function Live() {
  const aref = useRef([]);
  const [user, setuser] = useState();
  const [reload, setreload] = useState("");
  const [isLogout, setisLogout] = useState(false)
  const [code, setcode] = useState([]);
  const copy = async (href) => {
    try {
      await navigator.clipboard.writeText(href);
      toast.success("Copied !");
      // console.log(href);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
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
        let res = await fetch_data.json();
        console.log(res);
        setuser(res);
        let code = res.codes.filter((elem) => {
          return elem.web_id;
        });
        aref.current = code.map((_, i) => aref.current[i] || React.createRef());
        setcode(code);
      } catch (error) {
        console.log(error);
      }
    };
    play();
  }, [reload]);
  const deletebox = (id) => {
    let data = {
      token: Cookies.get("token"),
      code_id: id,
      webid_bool: true,
      is_public: false,
      del_code: false,
    };
    const play = async () => {
      try {
        let res = await fetch(`https://codinghub-5gt0.onrender.com/user/code/deletecode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let json = await res.json();
        console.log(json);
        let { code, msg } = json;

        if (Number(code) == 200) {
          toast.success(msg);
          window.location.reload();
        } else {
          toast.error(msg);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    };
    play();
  };
  console.log(code);
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
          set={isLogout}
          isSet={setisLogout}
          profile={false}
          profile_url={`/profile/${Cookies.get('userid')}`}
          user={false}
          user_img={ user?.avatar_url || ""}
          profile_img={
             user?.avatar_url || ""
          }
          className="w-[15%]"
        />
        <div className="bg-red-200 w-[85%] h-[100vh] relative overflow-x-hidden">
          <Nav
            data={[]}
            color={"gray"}
            parallel={true}
            logo={true}
            textColor=""
            searchIconColor={"blue"}
            search={true}
            profile={true}
            profile_url={`/profile/${Cookies.get('userid')}`}
            user={false}
            user_img={ user?.avatar_url || ""}
            profile_img={
              user?.avatar_url || ""
            }
            half={true}
            isLive={code}
            className="w-[85%]"
          />


<div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ${isLogout?'block':'hidden'}`  }>
  <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-black" onClick={()=>{
          setisLogout(!isLogout)
        }}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Want to logout from dashboard?</h2>
        <div className='flex justify-around'>
        <button className='btn' onClick={()=>{
          setisLogout(!isLogout)
        }} ><X /> Cancel</button>
        <button className='btn bg-red-600 hover:bg-red-700' onClick={()=>{
          Cookies.remove('token')
          Cookies.remove('userid')
          window.location.reload()
        }}> <LogOut /> Logout</button>
        
        </div>
      </div>
        {/* <h1 className='font-extrabold text-2xl mb-5 mx-auto'>Create a New File</h1> */}
        
      </div>
 {!code.length && (
              <>
             
                <center>
                  <h2 className="mt-[45%] md:mt-[15%] p-5 tracking-wider font-serif	font-bold	text-lg">
                    No items is present here.
                  </h2>
                </center>
              </>
            )}
          <div className="flex gap-5 mt-20 ml-2 flex-wrap justify-center lg:justify-normal">
           
            {code.map((elem, id) => {
              return (
                <>
                  <div className="bg-white text-black p-3 rounded shadow hover:shadow-lg relative">
                    <h1 className="text-bold text-2xl mb-4">
                      {elem.file_name}
                    </h1>
                    <a
                      href={elem.public_url}
                      target="_blank"
                      className="text-blue-700 font-semibold pb-4"
                      ref={aref.current[id]}
                      id={elem.code_id}
                    >
                      {elem.public_url}
                    </a>
                    <div className="flex gap-10 p-3">
                      <Copy
                        className="cursor-pointer "
                        onClick={() => copy(aref.current[id].current.href)}
                      />

                      <Delete
                        className="cursor-pointer"
                        onClick={() => deletebox(aref.current[id].current.id)}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Live;
