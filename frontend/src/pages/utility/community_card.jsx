import {
  AlignCenter,
  CircleEllipsis,
  Delete,
  Eye,
  Loader2,
  LucideView,
  MessageSquare,
  Pencil,
  PersonStanding,
  Plus,
  ThumbsUp,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Result from "./result";
import { toast, ToastContainer } from "react-toastify";

export const Community_card = ({ data, isown = false }) => {
  const [iscomment, setiscomment] = useState(false);
  const input = useRef(0);
  let userid = Cookies.get("userid");
  const {
    title,
    description,
    favarite,
    no_of_comment,
    code_id,
    views,
    community_id,
  } = data;
  const hasTokenInFavarite = favarite.some((elem) => elem.includes(userid));
  const [isLike, setIsLike] = useState(hasTokenInFavarite);
  const [countLike, setCountLike] = useState(favarite.length);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [ismenu, setismenu] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const [details, setdetails] = useState({});
  const [comment, setcomment] = useState([]);

  console.log(iscomment);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_SERVER}/user/live/community/showcode`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, community_id }),
          }
        );
        const result = await response.json();
        setdetails(result);
        setHtml(result.html);
        setCss(result.css);
        setJs(result.js);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };

    fetchData();
  }, [community_id]);

  useEffect(() => {
    let data = {
      token: Cookies.get("token"),
      community_id: community_id,
    };

    let play = async () => {
      try {
        let fetch_data = await fetch(`${import.meta.env.REACT_APP_SERVER}/user/comment/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        let res = await fetch_data.json();

        setcomment(res);
      } catch (error) {
        toast.error("Network issue please check and refresh page");
        console.log(error);
      }
    };
    play();
  }, []);

  let follow = () => {
    setisFollowing(!isFollowing);
    if (!isFollowing) {
      let data = { token: Cookies.get("token"), follower_id: userid };
      let play = async () => {
        try {
          let fetch_data = await fetch(`${import.meta.env.REACT_APP_SERVER}/user/follow/`, {
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
  const handleLike = () => {
    setIsLike((prev) => !prev);
    setCountLike((prev) => (isLike ? prev - 1 : prev + 1));
  };

  const addComment = () => {
    setload(true);
    let data = {
      token: Cookies.get("token"),
      community_id: details?.community_details[0]?.community_id,
      comment: input.current.value,
    };
    let play = async () => {
      try {
        let fetch_data = await fetch(
          `${import.meta.env.REACT_APP_SERVER}/user/comment/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        let res = await fetch_data.json();
        console.log(res);
        toast.success(res.msg);
      } catch (error) {
        toast.error("Comment will be not added");
        console.log(error);
      }
    };
    play();
    handleComment();
    window.location.reload();
  };
  useEffect(() => {
    let token = Cookies.get("token");

    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_SERVER}/user/favarite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, community_id }),
        });
        const result = await response.json();
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    if (isLike) {
      if (!hasTokenInFavarite) {
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    }
  }, [isLike]);
  const handleComment = () => {
    setiscomment(!iscomment);
    if (!iscomment) setload(false);
  };
  let shottext = (s, c) => {
    let lc = s.length;
    if (lc <= c) return s;
    else {
      return s.slice(0, c + 1) + "....";
    }
  };
  return (
    <>
      <div className="grid gap-2 mt-5 mb-4 bg-white w-[70%] relative p-3 rounded-lg">
        <div className="grid gap-3">
          <div className="result-container">
            <Result
              console={false}
              html={html}
              css={css}
              js={js}
              scrolling={false}
              className="w-[100vw] h-[100vh] bg-origin-content text-xs"
            />
          </div>
          <Link to={`/community/share/${community_id}`}>
            <h1 className="font-bold text-3xl capitalize">{title}</h1>
          </Link>
          <div className="flex justify-between">
            <p className="text-start">
              Description:{" "}
              <span className="font-semibold text-xl">
                {shottext(description, 60)}
              </span>
            </p>
            {isown && (
              <>
                <CircleEllipsis
                  className="cursor-pointer"
                  title="Menu"
                  onClick={() => {
                    setismenu(!ismenu);
                  }}
                />
              </>
            )}
            {/* {console.log(isown)} */}
          </div>
          {ismenu && (
            <>
              <div className="grid gap-5 bg-white p-2 absolute top-[80%] left-[70%] shadow-2xl mb-5">
                <Link to={`/community/edit/0/${community_id}`}>
                  <div className="flex gap-3  hover:bg-gray-100 p-2 cursor-pointer">
                    <Pencil /> Edit
                  </div>
                </Link>
                <div
                  className="flex gap-3  hover:bg-gray-100 p-2 cursor-pointer"
                  onClick={() => {
                    let play = async () => {
                      let data = {
                        token: Cookies.get("token"),
                        code_id,
                        is_public: true,
                      };
                      try {
                        let fetch_data = await fetch(
                          `${import.meta.env.REACT_APP_SERVER}/user/code/deletecode`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                          }
                        );
                        let res = await fetch_data.json();
                        toast.success(res.msg);
                        setTimeout(() => {
                          window.location.reload();
                        }, 5000);
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    play();
                  }}
                >
                  <Delete /> Delete
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 items-center">
            <p className="flex items-center gap-1">
              <ThumbsUp
                className={`cursor-pointer ${isLike ? "text-blue-500" : ""}`}
                onClick={handleLike}
              />
              <span>{countLike}</span>
            </p>

            <p
              className="flex items-center gap-1"
              onClick={() => {
                handleComment();
              }}
            >
              <MessageSquare className="cursor-pointer" onClick={() => {}} />
              <span>{no_of_comment.length}</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
          iscomment ? "block" : "hidden"
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg relative w-[90%] md:w-[65%] lg:w-[50%]">
          <button
            className="absolute top-2 right-2 text-black"
            onClick={handleComment}
          >
            &times;
          </button>
          <h2 className="flex gap-3 text-2xl font-bold mb-4 items-center shadow-2xl">
            <MessageSquare /> Comments...
          </h2>
          {comment.length == 0 && (
            <center className="p-3">No comment present here.</center>
          )}
          {comment.length != 0 && (
            <div className="h-[30vh]  overflow-y-auto">
              {comment.map((elem) => {
                return (
                  <>
                    <div className="flex gap-2">
                      <img
                        src={elem.avatar_url}
                        alt={elem.name}
                        className="border-black border-solid border-2 rounded-full h-[5%] w-[5%] "
                      />

                      <div className="grid gap-2 rounded-md p-2 shadow-sm w-fit border-black border-solid border-2 mb-3">
                        <h2 className="font-bold text-xl">{elem.name}</h2>
                        <p>{elem.comment_data}</p>
                        <p className="text-end">{elem.created}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}

          <form>
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                placeholder="Enter a Comment"
                className="border-solid border-2  border-black p-2 w-full"
                ref={input}
              />
              <div
                onClick={() => {
                  addComment();
                }}
                className="border-solid border-2 border-black p-2 rounded-full cursor-pointer"
              >
                <Plus />
              </div>
            </div>
          </form>
          {load && (
            <center>
              <Loader2 className="animate-spin" />
            </center>
          )}
        </div>
      </div>
    </>
  );
};
