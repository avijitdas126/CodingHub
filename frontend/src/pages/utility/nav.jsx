import React, { useState, useEffect, useRef } from "react";
import Search from "./search";
import { MenuIcon, X } from "lucide-react";


let suggest=['avijit','roy','sunil','das']
function Nav(props) {
  const {
    parallel,
    data,
    logo,
    search,
    profile_url,
    profile_img,
    profile,
    color = "",
    textColor,
    searchIconColor,
    user,
    half,
    user_img,
  } = props;
  const [close, setclose] = useState(false);
const [api, setapi] = useState([])
  const handle = () => {
    setclose(!close);
  };
useEffect(() => {
    // fetch('https://dummyjson.com/products/?limit=190')
    // .then(res => res.json())
    // .then(json => {
    //     const titles = json.products.map((elem) => elem.title);
    //     setapi(titles);
    //   });
}, [])
console.log(api)
  return (
    <>
      {/* <Search /> */}
{/* {console.log(data)} */}
      <div
        className={`${half ?'w-[84.4vw]':' '}${
          parallel
            ? " flex w-full  bg-[#1A2130] bg-[" +
              color +
              "] text-white text-[" +
              textColor +
              "] items-center justify-between fixed z-50"
            : "grid h-[100vh]  bg-black w-1/6 bg-black text-white text-[" +
              textColor +
              "] lg:items-center shadow p-2 justify-center"
        }`}
        style={{background:{color}}}
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
            <a href="/">
              <img src="/icons8-code-64.png" alt="logo" />
            </a>
          </div>
        )}

        <div className="hidden lg:block">
          <nav>
            <ul
              className={`${
                parallel ? "flex" : "grid"
              } gap-4   bg-[${color}] text-white text-[${textColor}] p-2  ${
                parallel ? "w-full" : "lg:w-1/5"
              } w-1/4 `}
              style={{ background: "#00000" }}
            >
              {props.data.map((elem, index) => {
                return (
                  <li key={index} className="p-2 hover:bg-slate-600 rounded">
                    <a href={elem.route}>{elem.item}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className={` flex gap-2  ${parallel ? 'items-center':'lg:items-center'}  relative`}>
            {/* suggest ->api */}
          {search && <Search searchIconColor={searchIconColor} suggested_list={suggest} />}
          {profile && (
            <div>
              <a href={profile_url}>
                <img
                  src={profile_img}
                  alt="profile"
                  className="rounded-full m-2"
                />
              </a>
            </div>
          )}
          {/* {data.length!=0 &&( */}
 <MenuIcon
 onClick={handle}
 className={` ${data.length==0&&'hidden'} bg-slate-400 bg-[${color}] text-white text-[${textColor}] hover:bg-slate-600 ${
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
           <li
             key={index}
             className="p-2 hover:bg-slate-600 rounded"
           >
             <a href={elem.route}>{elem.item}</a>
           </li>
         );
       })}
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
