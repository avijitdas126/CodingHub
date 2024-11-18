/* The above code is a React component called `Nav`. It is a navigation bar component that takes in
various props to customize its appearance and functionality. Here is a summary of what the code is
doing: */
import React, { useState, useEffect, useRef } from "react";
import Search from "./search";
import { MenuIcon, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

// let suggest=['avijit','roy','sunil','das']
function Nav(props) {
  const {
    className,
    parallel,
    data,
    logo,
    search,
    profile_url = "",
    profile_img,
    profile,
    color = "",
    textColor,
    isCommunity = false,
    searchIconColor,
    user,
    half,
    user_img,
    isLive = [],
    suggest = [],
    set = false,
    isSet = () => {},
  } = props;
  const [close, setclose] = useState(false);
  const [api, setapi] = useState([]);
  const [isLogout, setisLogout] = useState(false);

  const handle = () => {
    setclose(!close);
  };
  useEffect(() => {
    if (!isCommunity) {
      if (isLive && isLive?.length) {
        // Use a single state update instead of calling `setapi` multiple times inside the loop.
        const newData = isLive.map((elem) => {
          const file = elem.file_name.split(".")[0];
          const url = elem.public_url;
          return { file, url };
        });

        // Use `Set` to avoid duplicate entries
        // if(!isCommunity){
        setapi((prevValue) => [
          ...prevValue,
          ...newData.filter(
            (item) => !prevValue.some((entry) => entry.url === item.url)
          ),
        ]);
      }
      // console.log(api)
    } else {
      // console.log(isLive)
      if (isLive && isLive?.length) {
        const newData = isLive.map((elem) => {
          const title = elem.title;
          const description = elem.description;
          const time = elem.created;
          let tags = elem.tags;
          const url = `/community/share/${elem.community_id}`;
          return { title, description, time, tags, url };
        });
        // console.log(newData)
        setapi((prevValue) => [
          ...prevValue,
          ...newData.filter(
            (item) => !prevValue.some((entry) => entry.url === item.url)
          ),
        ]);
      }
    }
  }, [isLive]);
  useEffect(() => {
    if (suggest && suggest[1]?.length) {
      // Use a single state update instead of calling `setapi` multiple times inside the loop.
      const newData = suggest[1].map((elem) => {
        const file = elem.file_name.split(".")[0];
        const time = elem.created;
        const url = `/editor/1/${suggest[0].user}/${file}/${elem.code_id}`;

        return { file, time, url };
      });

      // Avoid duplicate entries by checking URLs
      setapi((prevValue) => [
        ...prevValue,
        ...newData.filter(
          (item) => !prevValue.some((entry) => entry.url === item.url)
        ),
      ]);
    }
  }, [suggest]);

  return (
    <>
      {/* <Search /> */}
      {/* {console.log(data)} */}
      <div
        className={`${
          parallel
            ? " flex    bg-[#1A2130] bg-[" +
              color +
              "] text-white text-[" +
              textColor +
              "] items-center justify-between fixed z-50 "
            : "grid h-[100vh]  bg-black w-1/6 bg-black text-white text-[" +
              textColor +
              "] lg:items-center shadow p-2 justify-center "
        }${className}`}
        style={{ background: { color } }}
      >
        {user && (
          <>
            <div className="">
              <img
                src={user_img}
                alt="user"
                className="cursor-pointer border-x-4 border-white border-solid rounded-full aspect-square w-[88px] h-[70px]"
              />
            </div>
          </>
        )}
        {logo && (
          <div className="  logo p-2">
            <Link to="/">
              <img src="/icons8-code-64.png" alt="logo" />
            </Link>
          </div>
        )}
        {console.log(api)}
        <div className="hidden lg:block">
          <nav>
            <ul
              className={`${
                parallel ? "flex" : "grid"
              } gap-4   bg-[${color}] text-white text-[${textColor}] p-2  ${
                parallel ? "w-full" : " "
              }  `}
              style={{ background: "#00000" }}
            >
              {props.data.map((elem, index) => {
                return (
                  <>
                    {elem.item.includes("Profile") ? (
                      <>
                        <li
                          key={index}
                          className="p-2 hover:bg-slate-600 rounded"
                        >
                          <NavLink to={profile_url}>{elem.item}</NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          key={index}
                          className="p-2 hover:bg-slate-600 rounded"
                        >
                          <NavLink to={elem.route}>{elem.item}</NavLink>
                        </li>
                      </>
                    )}
                  </>
                );
              })}
              {props.data.length != 0 && (
                <li
                  key={7}
                  className="p-2 hover:bg-slate-600 rounded cursor-pointer"
                >
                  {/* <NavLink to={elem.route}>{elem.item}</NavLink> */}
                  <p
                    onClick={() => {
                      isSet(!isLogout);
                    }}
                  >
                    Logout
                  </p>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div
          className={` flex gap-2  ${
            parallel ? "items-center" : "lg:items-center"
          }  relative`}
        >
          {/* suggest ->api */}
          {search && (
            <Search
              searchIconColor={searchIconColor}
              suggested_list={api}
              isCommunity={isCommunity}
            />
          )}
          {profile && (
            <div>
              <Link to={profile_url}>
<img
  width={30}
  height={30}
  src={profile_img}
  alt="profile"
  className="rounded-full w-[70px] h-[70px] m-2"
/>

              </Link>
            </div>
          )}
          {/* {data.length!=0 &&( */}
          <MenuIcon
            onClick={handle}
            className={` ${
              data.length == 0 && "hidden"
            } bg-slate-500 bg-[${color}] text-white text-[${textColor}] hover:bg-slate-600 ${
              close && "hidden"
            } block lg:hidden m-2`}
          />
          {close ? (
            <X
              onClick={handle}
              className={` bg-slate-400 bg-[${color}] text-white text-[${textColor}] hover:bg-slate-600 block lg:hidden m-2`}
            />
          ) : (
            ""
          )}
          {close && (
            <div
              className={`block lg:hidden absolute top-14 left-0 m-2  z-50 w-[200px] lg:w-1/5 ${
                profile && "right-0"
              }`}
            >
              <nav>
                <ul
                  className={`grid gap-4 bg-[#1A2130] box  bg-[${color}] text-white text-[${textColor}] p-2 shadow `}
                >
                  {data.map((elem, index) => {
                    return (
                      <>
                        {elem.item.includes("Profile") ? (
                          <>
                            <li
                              key={index}
                              className="p-2 hover:bg-slate-600 rounded"
                            >
                              <NavLink to={profile_url}>{elem.item}</NavLink>
                            </li>
                          </>
                        ) : (
                          <>
                            <li
                              key={index}
                              className="p-2 hover:bg-slate-600 rounded"
                            >
                              <NavLink to={elem.route}>{elem.item}</NavLink>
                            </li>
                          </>
                        )}
                      </>
                    );
                  })}
                  {props.data.length != 0 && (
                    <li
                      key={7}
                      className="p-2 hover:bg-slate-600 rounded cursor-pointer"
                    >
                      {/* <NavLink to={elem.route}>{elem.item}</NavLink> */}
                      <p
                        onClick={() => {
                          isSet(!isLogout);
                        }}
                      >
                        Logout
                      </p>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          )}

          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default React.memo(Nav);
