import {
  Delete,
  Dot,
  LucideView,
  MessageSquarePlus,
  PersonStanding,
  ThumbsUp,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function Card(props) {
  const card = useRef(0);
  let navi = useNavigate();
  let { file_name, user_name, client_id, file_id, des, bool, created_at, ele,  updated=''} =
    props;
  const [like, setlike] = useState(false);
  const [act, setact] = useState(false);
  const [pub, setpub] = useState(false);
  const handle = () => {
    setlike(!like);
  };
  const hand = () => {
    setact(!act);
  };
  useEffect(() => {
    if (ele.web_id) {
      setpub(true);
      console.log();
    }
  }, []);

  const livedeploy = () => {
    let id = card.current.id;
    let file_na = card.current.getAttribute("name");

    if (ele.web_id) {
      //day-4 start here
      const data = {
        code_id: id,
        token: Cookies.get("token"),
        webid: ele.web_id,
      };
      const play = async () => {
        try {
          let res = await fetch(
            `https://codinghub-5gt0.onrender.com/user/live/public/again`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          let json = await res.json();
          console.log(json);
          let { code, msg } = json;

          if (Number(code) == 200) {
            alert("Your is redeploy in :" + ele.public_url);
            toast.success(msg);
          } else {
            toast.error(msg);
          }
        } catch (err) {
          throw new Error(err.message);
        }
      };
      play();
    } else {
      navi("/webid/" + file_na + ".html/" + id);
    }
  };
  //Delete the recent card
  const deletecode = () => {
    let id = card.current.id;
    let data = {
      token: Cookies.get("token"),
      code_id: id,
      webid_bool: false,
      is_public: false,
      del_code: true,
     
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
  const communitycode = () => {
    let id = card.current.id;
    let file_na = card.current.getAttribute("name");
    navi("/public/" + file_na + ".html/" + id);
  };
  let code = (
    <div className="flex w-1/4 justify-start gap-5 items-center my-4">
      <ThumbsUp onClick={handle} className={`${like && "like"}`} />

      <a href="">
        {" "}
        <MessageSquarePlus />
      </a>
    </div>
  );
  return (
    <>
      <div
        className=" cursor-pointer flex justify-between relative bg-electric_indigo-500 text-white px-2 py-1 m-3 rounded shadow hover:shadow-2xl"
        id={file_id}
        ref={card}
        name={file_name}
      >
        <div className="grid gap-1 m-2 w-3/4">
          <h2 className="font-bold text-2xl">
            <Link to={`/editor/1/${user_name}/${file_name}/${file_id}`}>
              {file_name}
              <kbd>.html</kbd>
            </Link>
          </h2>

          <h6 className="text-xs font-extrabold tracking-widest text-gray-300">
            <br />
            {
              updated.includes(created_at) ?(<>
                 Created at: {created_at} <br /> <br />
              
              </>):
              (
                <>
                 Updated at: {updated} <br /> <br />
                </>
              )
            }
         
            <Link to="">{user_name}</Link>
          </h6>
          <p className="text-gray-100 text-justify">{des}</p>
          {bool && code}
        </div>

        <div
          className={`cursor-pointer  ${bool ? "hidden" : "block"}`}
          onClick={hand}
        >
          <svg viewBox="0 0 21 21" fill="currentColor" height="4em" width="4em">
            <g fill="currentColor" fillRule="evenodd">
              <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
              <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
              <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
            </g>
          </svg>
        </div>
        {!bool && (
          <div
            className={`bg-white absolute top-[4.5rem] z-50 right-[2.8rem] shadow-2xl text-black p-3 flex gap-4 ${
              act ? "block" : "hidden"
            }`}
          >
            <div className="grid gap-5 ">
              <div
                className="flex gap-3 hover:bg-gray-100 p-2"
                onClick={livedeploy}
              >
                <LucideView /> {pub ? "Redeploy Again" : "Live Deploy"}
              </div>
              <div
                className="flex gap-3  hover:bg-gray-100 p-2"
                onClick={communitycode}
              >
                <PersonStanding /> Community
              </div>
              <div
                className="flex gap-3  hover:bg-gray-100 p-2"
                onClick={deletecode}
              >
                <Delete /> Delete
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
