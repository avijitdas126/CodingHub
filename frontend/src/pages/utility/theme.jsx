import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import Cookies from "js-cookie";
import {
  Code,
  Braces,
  FileJson2,
  Play,
  Save,
  Settings,
  Upload,
  ArrowLeftCircleIcon,
  Share,
  Share2,
  FolderClosed,
  PanelTopClose,
  Eraser,
  X,
  Loader2,
  Copy,
  LogInIcon,
  UserCircle2,
  Plus,
  Minus,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useParams, Link, useNavigate } from "react-router-dom";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
// Import Ace Editor themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-vibrant_ink";

// Import Ace modes if you need syntax highlighting for specific languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import Editorjs from "./editor";
import Result from "./result";
import Console from "./console";
import Uploads from "./uploads";

// ...other modes

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "chaos",
  "dracula",
  "eclipse",
  "clouds",
  "dawn",
  "cobalt",
  "ambiance",
  "clouds_midnight",
  "crimson_editor",
  "idle_fingers",
  "kr_theme",
  "merbivore",
  "merbivore_soft",
  "pastel_on_dark",
  "sqlserver",
  "tomorrow_night",
  "tomorrow_night_blue",
  "tomorrow_night_bright",
  "tomorrow_night_eighties",
  "vibrant_ink",
];
let fonts = [14, 15, 16, 17, 18, 20, 24];
function Theme(props) {
  let {
    file,
    file_id,
    profile_name,
    Html,
    Css,
    Js,
    userid = Cookies.get("userid"),
    isCommnity = false,
    isFollow = false,
    readonly,
    avatar_url,
    shareable = false,
    isLogin = true,
    follower_id = "",
  } = props;
  let navi = useNavigate();
  const [theme, setTheme] = useState("");
  const [isFollowing, setisFollowing] = useState(isFollow);
  const [font, setfont] = useState("");
  const [show, setshow] = useState("html");
  const [html, setHtml] = useState(Html || "");
  const [css, setCss] = useState(Css || "");
  const [js, setJs] = useState(Js || "");
  const [isShare, setisShare] = useState(false);
  const [simplecode, setsimplecode] = useState(Html || "");
  const [upload, setupload] = useState(false);
  const [active, setactive] = useState(true);
  const [ishtml, setishtml] = useState(true);
  const [iscss, setiscss] = useState(false);
  const [isjs, setisjs] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [isLoad, setisLoad] = useState(true);
  const [url, seturl] = useState("");
  const [id, setid] = useState("");

  useEffect(() => {
    let data = { code_id: file_id, file_name: file, profile: profile_name };
    let play = async () => {
      try {
        let fetch_data = await fetch(`https://codinghub-5gt0.onrender.com/user/share/url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!fetch_data.ok) throw Error;

        let res = await fetch_data.json();
        seturl(res.url);
      } catch (error) {
        let fetch_data = await fetch(`https://codinghub-5gt0.onrender.com/user/share/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!fetch_data.ok) throw Error;

        let res = await fetch_data.json();
        seturl(res.url);
        setisLoad(false);
      }
    };
    play();
    console.log(data);
  }, [isShare]);

  const handleChange = (data) => {
    let { code, type } = data;
    handle(type, code);
    if (type.includes("html")) {
      setHtml(code);
    } else if (type.includes("css")) {
      setCss(code);
    } else {
      setJs(code);
    }
    clearTimeout(id);
    setid(
      setTimeout(() => {
        saveCode();
      }, 60000*5)
    );
  };
  const saveCode = () => {
    if(isCommnity || shareable ){
 
  }
  else{
    let payload = {
      token: Cookies.get("token"),
      code_id: file_id,
      html: html,
      css: css,
      js: js,
    };
    console.log(payload);
    let play = async () => {
      try {
        let fetch_data = await fetch(
          `https://codinghub-5gt0.onrender.com/user/code/savecode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        let res = await fetch_data.json();
        let { msg, code } = res;
        if (Number(code) == 200) {
          toast.success(msg);
        } else {
          toast.error(msg);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    play();
    console.log(payload);
  }
  };
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };
  const handlefontChange = (event) => {
    setfont(event.target.value);
  };

  const handle = (event, code) => {
    setshow(event);
    if (event.includes("html")) {
      setsimplecode(code || ""); // Ensure code is a string
      setishtml(true);
      setiscss(false);
      setisjs(false);
    } else if (event.includes("css")) {
      setsimplecode(code || "");
      setishtml(false);
      setiscss(true);
      setisjs(false);
    } else {
      setsimplecode(code || "");
      setishtml(false);
      setiscss(false);
      setisjs(true);
    }
  };

  let open = () => {
    setactive(!active);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedFont = localStorage.getItem("font");

    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedFont) {
      setfont(savedFont);
    } else {
      setfont(14);
    }
  }, []);
  let follow = () => {
    setisFollowing(!isFollowing);
    if (!isFollowing) {
      let data = { token: Cookies.get("token"), follower_id };
      let play = async () => {
        try {
          let fetch_data = await fetch(`https://codinghub-5gt0.onrender.com/user/follow/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.log(error);
        }
      };
      play();
    }
  };
  // Save theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save font to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);
  const uploadmodal = () => {
    setupload(!upload);
  };
  return (
    <div>
      <div className="flex justify-between bg-indigo-700 text-white fixed z-50 w-full top-0">
        <div className="flex items-center pl-2 gap-2">
          {!shareable && (
            <Link
              to={`${isCommnity ? "/community" : "/dashboard"}`}
              title="Back to Dashboard"
            >
              <ArrowLeftCircleIcon />
            </Link>
          )}

          <div className="grid gap-2 m-2">
            <h2 className="font-bold">
              {isCommnity ? (
                <Link to="" title={file}>
                  {file}
                </Link>
              ) : (
                <Link to="" title="File Name">
                  {file}
                  <kbd>.html</kbd>
                </Link>
              )}
            </h2>
            <h6 className="text-xs flex items-center gap-2" title="User Name">
              {isCommnity ? (
                <>
                  {avatar_url == null ? (
                    <>
                      <UserCircle2 />
                    </>
                  ) : (
                    <>
                      <img
                        src={avatar_url}
                        alt="profile"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />{" "}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              <Link to={`/profile/${userid}`}>{profile_name}</Link>
              {follower_id.includes(Cookies.get("userid")) ? (
                <></>
              ) : (
                <>
                  {isCommnity ? (
                    <>
                      {isFollowing ? (
                        <>
                          <button
                            className="btn items-center bg-slate-400 hover:bg-slate-700 h-7 m-0 "
                            onClick={follow}
                          >
                            <Minus /> Following
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn items-center h-7 m-0 "
                            onClick={follow}
                          >
                            <Plus /> Follow
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </h6>
          </div>
        </div>

        <div className="flex  items-center">
          <ToastContainer />

          {!shareable && (
            <>
              {/* {isCommnity &&( */}
              <>
                <button
                  className={`btn ${isCommnity ? "hidden" : " block"}`}
                  onClick={(e) => {}}
                  title="Share"
                >
                  <Share2
                    onClick={() => {
                      setisShare(true);
                    }}
                  />
                </button>
                <button
                  className={`btn ${isCommnity ? "hidden" : " block"}`}
                  onClick={() => {
                    saveCode();
                    clearTimeout(id);
                  }}
                  title="Save"
                >
                  <Save />
                </button>
                <button
                  className={`btn ${isShow && "bg-green-950"} ${
                    isCommnity ? "hidden" : " block"
                  }`}
                  onClick={uploadmodal}
                  title="Upload"
                >
                  <Upload
                    onClick={() => {
                      setisShow(!isShow);
                    }}
                  />
                </button>
              </>
              {/* // )} */}
            </>
          )}

          {((shareable && !isLogin) || (isCommnity && !isLogin)) && (
            <>
              <button
                className="btn"
                title="Login"
                onClick={() => {
                  navi("/login");
                }}
              >
                <LogInIcon />
                Login
              </button>
            </>
          )}
          <button className="btn" title="Run">
            <Play />
          </button>
          <button
            className={`btn1 ${active ? "" : "btnactive"}`}
            onClick={open}
            title="Setting"
          >
            <Settings />
          </button>
        </div>
      </div>

      {(!shareable || !isCommnity) && (
        <>
          {isShare && (
            <div className="p-4 fixed top-12 right-2 z-50 bg-white lg:w-[20%]  rounded-sm shadow-2xl">
              <div className="flex justify-between justify-items-center mb-2">
                <h2 className="font-bold text-[20px]">Share this</h2>
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setisShare(false);
                  }}
                />
              </div>
              {isLoad ? (
                <center>
                  <Loader2 className="animate-spin text-green-600" />
                </center>
              ) : (
                <>
                  <input
                    type="text"
                    className="border-2 border-black p-3 my-4"
                    value={url}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      const handleCopy = async () => {
                        try {
                          await navigator.clipboard.writeText(url)
                        } catch (err) {
                          console.error("Failed to copy text: ", err.message);
                        }
                      };
                      handleCopy();
                    }}
                  >
                    <Copy />
                  </button>
                </>
              )}
            </div>
          )}

          <Uploads
            isbox={true}
            className={`${
              isShow ? "block" : "hidden"
            } fixed top-1 right-0 z-50 justify-center`}
          />
        </>
      )}
      <div className="relative">
        <div
          className={`fixed top-12 right-0 z-50 bg-gray-400 grid gap-10 m-2 w-[70%] lg:w-1/2 mr-4 shadow-inner p-5 rounded hover:shadow-2xl ${
            active ? "hidden" : "block"
          }`}
        >
          <div className="">
            <label htmlFor="theme-select">Select Theme: </label>
            <select
              id="theme-select"
              className="bg-gray-100 px-1 py-1 m-1"
              value={theme}
              onChange={handleThemeChange}
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="font-select">Select Font Size: </label>
            <select
              id="font-select"
              className="bg-gray-100 px-2 py-1"
              value={font}
              onChange={handlefontChange}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div
        id="switcher"
        className={`flex gap-5 justify-around p-2 bg-gray-950 lg:hidden  ${
          isCommnity && !follower_id.includes(Cookies.get("userid"))
            ? "mt-[4.7rem]"
            : "mt-16"
        }`}
      >
        <button
          className={`buttn ${ishtml && "bg-slate-700"}`}
          onClick={() => handle("html", html)}
        >
          {" "}
          <Code />
          .html
        </button>
        <button
          className={`buttn ${iscss && "bg-slate-700"}`}
          onClick={() => handle("css", css)}
        >
          <Braces /> .css
        </button>
        <button
          className={`buttn ${isjs && "bg-slate-700"}`}
          onClick={() => handle("javascript", js)}
        >
          <FileJson2 /> .js
        </button>
      </div>
      <div
        className={`hidden lg:block ${
          isCommnity && !follower_id.includes(Cookies.get("userid"))
            ? "mt-[4.7rem]"
            : "mt-16"
        } `}
      >
        <div
          id="switcher2"
          className="flex gap-5 justify-around p-2 bg-gray-950"
        >
          <button className="buttn" value="html">
            {" "}
            <Code />
            .html
          </button>
          <button className="buttn" value="css">
            <Braces /> .css
          </button>
          <button className="buttn" value="javascript">
            <FileJson2 /> .js
          </button>
        </div>
      </div>
      <div className="flex gap-5 bg-gray-600 p-3">
        <>
          <Editorjs
            font={font}
            readonly={readonly}
            code={simplecode}
            handle={handleChange}
            type={show}
            theme={theme}
            class1={`block lg:hidden h-[400px]`}
          />
          <Editorjs
            font={font}
            code={html}
            type="html"
            readonly={readonly}
            theme={theme}
            handle={handleChange}
            class1="hidden lg:block"
          />
          <Editorjs
            font={font}
            code={css}
            type="css"
            theme={theme}
            readonly={readonly}
            handle={handleChange}
            className="w-[100%]"
            bool="true"
            class1="hidden lg:block"
          />
          <Editorjs
            font={font}
            code={js}
            type="javascript"
            readonly={readonly}
            handle={handleChange}
            theme={theme}
            class1="hidden lg:block"
          />
        </>
      </div>

      <Result html={html} css={css} js={js} />
    </div>
  );
}

export default Theme;
