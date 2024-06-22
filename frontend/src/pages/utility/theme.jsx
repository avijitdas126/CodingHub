import React, { useState } from "react";
import AceEditor from "react-ace";

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
import Js from "./js";
import Css from "./css";
import Html from "./html";
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

function Theme() {
  const [theme, setTheme] = useState("monokai");

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <h1>Ace Editor with Theme Switcher</h1>
      <div>
        <label htmlFor="theme-select">Select Theme: </label>
        <select id="theme-select" value={theme} onChange={handleThemeChange}>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-5">
      <Html theme={theme} />
      <Css theme={theme} />
      <Js theme={theme} />
      </div>
   
      {/* <AceEditor
        mode="javascript" // Or any mode you imported
        theme={theme}
        name="editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="400px"
      /> */}
    </div>
  );
}

export default Theme;
