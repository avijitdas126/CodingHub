import React, { useState, useEffect } from "react";
import Theme from "./utility/theme";
import { BugIcon } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Share_community = () => {
  let { id } = useParams();
  const [details, setdetails] = useState({});

  const [iserror, setiserror] = useState(false);
  const [isload, setisload] = useState(true);
  const [start, setstart] = useState(false);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [community, setcommunity] = useState({});
  const [isLogin, setisLogin] = useState(false);
  let navi = useNavigate();
  let play = async (token) => {
    try {
      let fetch_data = await fetch("https://codinghub-5gt0.onrender.com/user/check_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      let res = await fetch_data.json();
      setisLogin(res.bool);
    } catch (error) {
      setisLogin(false);
    }
  };
  useEffect(() => {
    let token = Cookies.get("token");
    if (token) {
      play(token);
    } else {
      navi("/login");
    }
  }, []);

  useEffect(() => {
    let token = Cookies.get("token");
    if (!token) navi("/login");
    let data = { token, community_id: id, isviews: true };
    let play = async () => {
      try {
        let fetch_data = await fetch(
          "https://codinghub-5gt0.onrender.com/user/live/community/showcode",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!fetch_data.ok) throw Error;

        let res = await fetch_data.json();

        console.log(res);
        setcommunity(res);
        setdetails(res.user_info);
        setHtml(res.html);
        setCss(res.css);
        setJs(res.js);
        setstart(true);
        setisload(false);
      } catch (error) {
        setiserror(true);
        setisload(false);
      }
    };
    play();
  }, []);

  return (
    <>
      {isload && (
        <img
          src="/code_loader.gif"
          alt="Loader"
          width={200}
          className="text-center mx-auto md:pt-[5%] py-[35%]"
        />
      )}

      {iserror && (
        <>
          <img src="/loader.gif" alt="loader" className="m-auto p-1" />
          <p className="text-center m-auto pt-2 mb-2 ">
            {" "}
            <kbd>Something Wrong went</kbd>{" "}
            <center>
              <BugIcon className="text-center" />
            </center>
          </p>
          <center>
            <Link
              to="/"
              className="underline text-blue-700 font-serif font-bold text-center mb-5"
            >
              Go to Home
            </Link>
          </center>
        </>
      )}

      {start && (
        <Theme
          
          file={community.community_details[0].title}
          isCommnity={true}
          file_id={id}
          avatar_url={community.user_info[0].avatar_url}
          profile_name={community.user_info[0].name}
          client_id=""
          Html={html}
          isFollow={community.user_info[0].followers.some((elem) => elem.includes(Cookies.get('userid')))}
          Css={css}
          Js={js}
          readonly={false}
          follower_id={community.user_info[0].userid}
          isLogin={isLogin}
          userid={details?.[0]?.userid}
        />
      )}
    </>
  );
};

export default Share_community;
