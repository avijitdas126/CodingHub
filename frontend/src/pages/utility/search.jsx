import { Loader, SearchIcon } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";

function Search({ searchIconColor, suggested_list, pass }) {
  const [target, settarget] = useState("  ");
  const [load, setload] = useState(false);
  const [error, seterror] = useState(false);
  const suggest = (e) => {
    if (e.target.value.length != 0) {
      setload(true);
      settarget(e.target.value);
    } else {
      setload(false);
      seterror(false);
      settarget("  ");
    }
  };
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const suggestion = useMemo(() => {
    return suggested_list.filter((elem) => {
      return elem.toLowerCase().includes(target.toLowerCase());
    });
  }, [target]);

  useEffect(() => {
    if (suggestion.length != 0) {
      setload(false);
      seterror(false);
    }
    if (suggestion.length == 0 && !target.includes("  ")) {
      seterror(true);
      setload(false);
      // console.log("gg");
    }
  }, [suggestion]);

  // console.log(load);
  return (
    <>
      <div className="grid relative">
        <div className="flex items-center m-2 gap-1">
          <input
            type="text"
            placeholder="Search a pin"
            autoFocus={true}
            className=" text-black p-2 border-solid border-2 border-black   "
            onKeyUp={suggest}
          />
          <button
            className={`  bg-blue-700 p-2  text-white font-bold border-solid border-2 border-slate-400 rounded `}
          >
            <SearchIcon />
          </button>
        </div>
        <div
          className={` ${
            suggestion.length != 0 || load || error ? "block" : "hidden"
          } max-h-[150px] overflow-y-auto scroll-smooth z-50 grid gap-2 list-none bg-white text-black absolute top-[3.3rem] left-2 shadow-md p-2 `}
        >
          {load && <Loader className="animate-spin" />}
          {error && "No results for ->" + target}
          {suggestion.map((elem, index) => {
            return (
              <li key={index} className=" hover:bg-slate-200 p-2 mb-2 pb-2 ">
                {highlightText(elem, target)}
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default React.memo(Search);
