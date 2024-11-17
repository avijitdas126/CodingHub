/* The above code is a React component named Dashboard. Here is a summary of what the code is doing: */
import React, { useState, useEffect, useRef } from "react";
import Nav from "./utility/nav";
import moment from "moment";
import data from "/src/pages/utility/details.json";
import Card from "./utility/card";
import { LogOut, Plus, X } from "lucide-react";
import Cookies from "js-cookie";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  let navigator = useNavigate();
  const input = useRef(0);
  const [model, setmodel] = useState(false);
  const [reload, setreload] = useState(true);
  const [user_detail, setuser_detail] = useState({});
  const [codes, setcodes] = useState([]);
  const [isLogout, setisLogout] = useState(false);
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play = async () => {
      try {
        let fetch_data = await fetch(`${import.meta.env.REACT_APP_SERVER}/user/get_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let status = fetch_data.status;
        let res = await fetch_data.json();
        if (status < 400) {
          setuser_detail(res);
          let code = res.codes.filter((elem) => {
            return elem.recent_delete == false && elem.community_id == null;
          });
          code = code.sort((a, b) => {
            const dateA = a.updated
              ? moment(a.updated, "MMM D, YYYY h:mm A").unix()
              : 0;
            const dateB = b.updated
              ? moment(b.updated, "MMM D, YYYY h:mm A").unix()
              : 0;

            // Sort in descending order (latest to earliest)
            return dateB - dateA;
          });
          console.log(code);
          setcodes(code);
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

  const open = () => {
    setmodel(true);
  };
  const onClose = () => {
    setmodel(false);
  };
  const submit = (e) => {
    e.preventDefault();
    let data = { token: Cookies.get("token"), file_name: input.current.value };
    console.log(data);
    let play = async () => {
      try {
        let fetch_data = await fetch(
          `${import.meta.env.REACT_APP_SERVER}/user/code/new/project`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let res = await fetch_data.json();
        let { code_id, msg, code } = res;
        if (Number(code) == 200) {
          toast.success(msg);
          setmodel(false);

          navigator(
            "/editor/0/" +
              user_detail.name +
              "/" +
              input.current.value +
              "/" +
              code_id
          );
          input.current.value = "";
          setreload(!reload);
        } else {
          toast.error(msg);
        }
      } catch (error) {
        toast.error("Something Wrong Went!");
        input.current.value = "";
        setmodel(false);
      }
    };
    play();
  };
  return (
    <>
      <div className="flex w-full backdrop-filter  backdrop-blur">
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
          profile_url={`/profile/${Cookies.get("userid")}`}
          user={false}
          user_img={user_detail.avatar_url}
          profile_img={user_detail.avatar_url}
          className="w-[13vw]"
          suggest={[]}
        />
        <div className="bg-red-200 w-[87vw] h-[100vh] relative overflow-x-hidden">
          <Nav
            data={[]}
            color={"gray"}
            parallel={true}
            logo={true}
            textColor=""
            searchIconColor={"blue"}
            search={true}
            profile={true}
            profile_url={`/profile/${Cookies.get("userid")}`}
            user={false}
            user_img={"/download.jfif"}
            suggest={[{ user: user_detail.name }, codes]}
            profile_img={user_detail.avatar_url}
            half={true}
            className="w-[87vw]"
          />
          <div className="grid gap-2 mt-16 relative  ">
            {!codes.length && (
              <>
                <center>
                  <h2 className="mt-[45%] md:mt-[15%] p-5 tracking-wider font-serif	font-bold	text-lg">
                    No items is present here.Now,you create a item using click
                    at plus button
                  </h2>
                </center>
              </>
            )}
            {codes.map((elem, idex) => {
              return (
                <Card
                  key={idex}
                  user_name={user_detail.name}
                  file_name={elem.file_name.split(".")[0]}
                  ele={elem}
                  created_at={elem.created}
                  updated={elem.updated}
                  file_id={elem.code_id}
                />
              );
            })}
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                model ? "block" : "hidden"
              }`}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-black"
                  onClick={onClose}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Create a New File</h2>
                <form>
                  <label htmlFor="FileName" className="mb-5">
                    File Name:(Max:10 characters){" "}
                  </label>
                  <div className="flex gap-2 mb-5">
                    <input
                      type="text"
                      placeholder="Enter the File Name"
                      autoFocus={true}
                      maxLength={10}
                      className="border-solid border-2  border-black p-2"
                      ref={input}
                    />
                    <div className="border-solid border-2 border-black p-2">
                      <kbd>.html</kbd>
                    </div>
                  </div>
                  <div className="flex gap-5 justify-center">
                    <input
                      type="submit"
                      value="Cancel"
                      className="btn bg-slate-600 hover:bg-slate-400 cursor-pointer text-white"
                      onClick={onClose}
                    />
                    <input
                      type="submit"
                      value="Submit"
                      className="btn cursor-pointer"
                      onClick={submit}
                    />
                  </div>
                </form>
              </div>
              {/* <h1 className='font-extrabold text-2xl mb-5 mx-auto'>Create a New File</h1> */}
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
          </div>
          <div
            className="btn w-10 fixed bottom-2 right-5 z-50 cursor-pointer"
            onClick={open}
          >
            <Plus />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
