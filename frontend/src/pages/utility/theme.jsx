import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { Code, Braces, FileJson2, Play, Save, Settings } from "lucide-react";
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
  let {file, file_id, profile_name, client_id, Html, Css, Js,readonly}=props
  const [theme, setTheme] = useState("");
  const [font, setfont] = useState('');

  const [show, setshow] = useState("html");
  const [html, sethtml] = useState("<h1>Hello World</h1>\n<p>Hello</p>");
  const [css, setcss] = useState("*{margin:0;}");
  const [js, setjs] = useState("console.log('Hello World!')");
  const [simplecode, setsimplecode] = useState(
    "<h1>Hello World</h1>\n<p>Hello</p>"
  );
  const [active, setactive] = useState(true);
  const [data, setdata] = useState("");
  const handleChange = (data) => {
    //  console.log(data)
    let { code, type } = data;
    handle(type, code);
    if (type.includes("html")) {
      sethtml(code);
    } else if (type.includes("css")) {
      setcss(code);
    } else {
      setjs(code);
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
      setsimplecode(code);
    } else if (event.includes("css")) {
      setsimplecode(code);
    } else {
      setsimplecode(code);
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
    }
    else{
      setfont(14)
    }

  }, []);

  // Save theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save font to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  return (
    <div>
      <div className="flex justify-between bg-indigo-700 text-white fixed z-50 w-full top-0">
        <div className="grid gap-2 m-2">
          <h2 className="font-bold">
            <a href="#">{file}</a>
          </h2>
          <h6 className="text-xs">
            <a href="">{profile_name}</a>
          </h6>
        </div>
        <div className="flex flex-wrap items-center">
          <button className="btn">
            <Save /> Save
          </button>
          <button className="btn">
            <Play />
            Run
          </button>
          <button
            className={`btn1 ${active ? "" : "btnactive"}`}
            onClick={open}
          >
            <Settings />
          </button>
        </div>
      </div>

      <div className="relative ">
        <div
          className={`absolute -top-4 right-0 z-50 bg-gray-400 grid gap-10 m-2 w-1/2 mr-3 shadow-inner pb-3 p-4 rounded hover:shadow-2xl ${
            active ? "hidden" : "block"
          }`}
        >
          <div>
            <label htmlFor="theme-select">Select Theme: </label>
            <select
              id="theme-select"
              className="bg-gray-100 px-2 py-1"
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
              className="bg-gray-100 px-2 py-1 ml-4"
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
        className="flex gap-5 justify-around p-2 bg-gray-950 lg:hidden mt-16"
      >
        <button className="buttn" onClick={() => handle("html", html)}>
          {" "}
          <Code />
          .html
        </button>
        <button className="buttn" onClick={() => handle("css", css)}>
          <Braces /> .css
        </button>
        <button className="buttn" onClick={() => handle("javascript", js)}>
          <FileJson2 /> .js
        </button>
      </div>
      <div className="hidden lg:block mt-16">
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
      {/* {`container ${isActive ? 'active' : ''}`} */}
      {/* {`flex gap-10 m-2 ${active?"hidden":"block"}`} */}

      <div className="flex gap-5 bg-gray-600 p-3">
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
      </div>

      <Result html={html} css={css} js={js} />
    </div>
  );
}

export default Theme;
