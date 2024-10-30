/* The above code is a React functional component named `Community`. It is a part of a larger React
application and is responsible for rendering a community page. Here is a summary of what the code is
doing: */
import React, { useState, useEffect } from "react";
import Nav from "./utility/nav";
import data from "/src/pages/utility/details.json";
import Card from "./utility/card";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import Public from "./utility/public";
import Result from "./utility/result";
import { Community_card } from "./utility/community_card";
import { LogOut, X } from "lucide-react";
const Community = () => {
  const [reload, setreload] = useState(true);
  const [allcommunity, setallcommunity] = useState([]);
  const [user_detail, setuser_detail] = useState({});
  const [codes, setcodes] = useState([]);
  const [isLogout, setisLogout] = useState(false);
  const [ispopular, setispopular] = useState(false);
  const [isrecent, setisrecent] = useState(true);
  const [isall, setisall] = useState(false);
  const [isown, setisown] = useState(false);
  const [iscomment, setiscomment] = useState(false);
  const [recent, setrecent] = useState([]);
  const [popular, setpopular] = useState([]);
  const [own, setown] = useState([]);

  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play = async () => {
      try {
        let fetch_data = await fetch("https://codinghub-5gt0.onrender.com/user/get_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let res = await fetch_data.json();
        // console.log(res)
        setuser_detail(res);
        let code = res.codes.filter((elem) => {
          return elem.community_id != null;
        });
        setcodes(code);
      } catch (error) {
        console.log(error);
      }
    };
    play();
  }, [reload]);

  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play1 = async () => {
      try {
        let fetch_data = await fetch(
          "https://codinghub-5gt0.onrender.com/user/live/community/all",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let res = await fetch_data.json();

        setallcommunity(res);
        setown(
          res.filter((elem) => {
            return elem.userid.includes(Cookies.get("userid"));
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    play1();
  }, [isall]);

  const handleChildData = (data) => {
    setiscomment(data);
  };

  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play1 = async () => {
      try {
        let fetch_data = await fetch(
          "https://codinghub-5gt0.onrender.com/user/live/community/popular",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let res = await fetch_data.json();

        setpopular(res);
      } catch (error) {
        console.log(error);
      }
    };
    play1();
  }, [ispopular]);

  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play1 = async () => {
      try {
        let fetch_data = await fetch(
          "https://codinghub-5gt0.onrender.com/user/live/community/recent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let res = await fetch_data.json();

        setrecent(res);
      } catch (error) {
        console.log(error);
      }
    };
    play1();
  }, [isrecent]);

  console.log(iscomment);

  return (
    <>
      <ToastContainer />
      <div className="flex w-full">
        <Nav
          data={data[2].dashboard}
          color={"#000000"}
          parallel={false}
          logo={false}
          textColor=""
          isCommunity={true}
          searchIconColor={"blue"}
          set={isLogout}
          isSet={setisLogout}
          search={false}
          profile={false}
          profile_url={`/profile/${Cookies.get("userid")}`}
          user={false}
          user_img={user_detail?.avatar_url}
          profile_img={user_detail?.avatar_url}
          className="w-[15%]"
        />
        <div className="bg-red-200 w-[85%] h-[100vh] relative overflow-x-hidden">
          <Nav
            data={[]}
            color={"gray"}
            parallel={true}
            logo={true}
            isCommunity={true}
            textColor=""
            searchIconColor={"blue"}
            search={true}
            profile={true}
            profile_url={`/profile/${Cookies.get("userid")}`}
            user={false}
            user_img={user_detail?.avatar_url}
            profile_img={user_detail?.avatar_url}
            isLive={allcommunity}
            half={true}
            className="w-[85%]"
          />
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
          {iscomment && (
            <>
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
            </>
          )}
          <div className="flex gap-2 mt-16 p-2">
            <button
              className={`btn ${isrecent && "bg-green-900"}`}
              onClick={() => {
                setisrecent(true);
                setisown(false);
                setispopular(false);
                setisall(false);
              }}
            >
              Recent
            </button>
            <button
              className={`btn ${ispopular && "bg-green-900"}`}
              onClick={() => {
                setisrecent(false);
                setisown(false);
                setispopular(true);
                setisall(false);
              }}
            >
              Popular
            </button>
            <button
              className={`btn ${isall && "bg-green-900"}`}
              onClick={() => {
                setisrecent(false);
                setisown(false);
                setispopular(false);
                setisall(true);
              }}
            >
              All
            </button>
            <button
              className={`btn ${isown && "bg-green-900"}`}
              onClick={() => {
                setisrecent(false);
                setisown(true);
                setispopular(false);
                setisall(false);
              }}
            >
              Own
            </button>
          </div>
          <div className="grid  gap-10 items-baseline justify-items-center md:items-start lg:grid-cols-3 md:grid-cols-2 grid-cols-1  m-2 ">
            {isall ? (
              <>
                {allcommunity.length == 0 && (
                  <>
                    <center>No Items is here.</center>
                  </>
                )}
                {allcommunity.map((elem, index) => {
                  return (
                    <>
                      <Community_card key={index} data={elem} />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {ispopular ? (
                  <>
                    {/* popular */}
                    {popular.length == 0 && (
                      <>
                        <center>No Items is here.</center>
                      </>
                    )}
                    {popular.map((elem, index) => {
                      return (
                        <>
                          <Community_card key={index} data={elem} />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {isown ? (
                      <>
                        {/* own */}
                        {own.length == 0 && (
                          <>
                            <center>No Items is here.</center>
                          </>
                        )}
                        {own.map((elem, index) => {
                          return (
                            <>
                              <Community_card
                                key={index}
                                isown={true}
                                data={elem}
                              />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {isrecent ? (
                          <>
                            {/* recent */}
                            {recent.length == 0 && (
                              <>
                                <center>No Items is here.</center>
                              </>
                            )}
                            {recent.map((elem, index) => {
                              return (
                                <>
                                  <Community_card key={index} data={elem} />
                                </>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            <center>No items</center>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Community);
