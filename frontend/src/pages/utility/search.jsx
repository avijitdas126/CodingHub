import { Code2, Loader, SearchIcon } from "lucide-react";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Search({ searchIconColor, suggested_list, pass, isCommunity }) {
  const [target, settarget] = useState("  ");
  const [load, setload] = useState(false);
  const [error, seterror] = useState(false);
  const [isSearch, setisSearch] = useState(false);
  const input = useRef(0);
  const suggest = (e) => {
    if (e?.target?.value?.length != 0) {
      setload(true);
      settarget(e.target.value);
    } else {
      setload(false);
      seterror(false);
      settarget("  ");
    }
  };
  let shottext = (s, c) => {
    let lc = s.length;
    if (lc <= c) return s;
    else {
      return s.slice(0, c + 1) + "....";
    }
  };
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="font-bold text-gray-900">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  console.log(suggested_list);
  const suggestion = useMemo(() => {
    if (!isCommunity) {
      return suggested_list.filter((elem) => {
        console.log(elem);
        return elem.file.toLowerCase().includes(target.toLowerCase());
      });
    } else {
      return suggested_list.filter((elem) => {
        console.log(elem);
        return elem.title.toLowerCase().includes(target.toLowerCase());
      });
    }
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

  console.log(load);
  return (
    <>
      <div
        className="p-3 cursor-pointer"
        onClick={() => [setisSearch(!isSearch)]}
      >
        <SearchIcon />
      </div>
      <div className={`grid relative `}>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
            isSearch ? "block" : "hidden"
          }`}
        >
          <div className="bg-white text-black p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={() => [setisSearch(!isSearch)]}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Search anything....</h2>
            <form>
              <label htmlFor="FileName" className="mb-5">
                Search :
              </label>
              <div className={`grid relative `}>
                <div className="flex gap-3 mb-5">
                  <input
                    type="text"
                    placeholder="Search anything..."
                    autoFocus={true}
                    className="border-solid border-2  border-black p-2"
                    onKeyUp={suggest}
                  />
                  <button
                    className={`  bg-blue-700 p-2  text-white font-bold border-solid border-2 border-slate-400 rounded `}
                  >
                    <SearchIcon />
                  </button>
                </div>
                {isCommunity ? (
                  <>
                    <div
                      className={` ${
                        suggestion.length != 0 || load || error
                          ? "block"
                          : "hidden"
                      } max-h-[150px]  overflow-y-auto scroll-smooth z-50 grid gap-2 list-none bg-white text-black absolute top-[3.3rem] w-[95%] left-2 shadow-md  `}
                    >
                      {load && <Loader className="animate-spin" />}
                      {error && "No results for ->" + target}
                      {suggestion.map((elem, index) => {
                        return (
                          <div
                            key={index}
                            className=" hover:bg-slate-200   pb-2 p-2 border-black border-b-2 border-solid "
                          >
                            <Link to={elem.url} className="flex gap-5">
                              <Code2 />
                              <div className="grid gap-2">
                                <p className="font-medium text-gray-700 text-2xl">
                                  {shottext(
                                    highlightText(elem.title, target),
                                    25
                                  )}
                                </p>
                                <p>{shottext(elem.description, 50)}</p>
                                {elem.time}
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={` ${
                        suggestion.length != 0 || load || error
                          ? "block"
                          : "hidden"
                      } max-h-[150px]  overflow-y-auto scroll-smooth z-50 grid gap-2 list-none bg-white text-black absolute top-[3.3rem] w-[75%] left-2 shadow-md  `}
                    >
                      {load && <Loader className="animate-spin" />}
                      {error && "No results for ->" + target}
                      {suggestion.map((elem, index) => {
                        return (
                          <div
                            key={index}
                            className=" hover:bg-slate-200   pb-2 p-2 border-black border-b-2 border-solid "
                          >
                            <Link to={elem.url} className="flex gap-5">
                              <Code2 />
                              <div className="grid gap-2">
                                <p>{highlightText(elem.file, target)}.html</p>
                                {elem.time}
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Search);
