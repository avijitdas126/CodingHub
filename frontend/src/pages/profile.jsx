import React, { useState, useEffect, useRef } from "react";
import Nav from "./utility/nav";
import data from "/src/pages/utility/details.json";
import Card from "./utility/card";
import { NavLink, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import moment from "moment";
import Public from "./utility/public";
import Result from "./utility/result";
import { Community_card } from "./utility/community_card";
import { Edit, LogOut, Minus, Plus, X } from "lucide-react";

export const Profile = () => {
  const { userid } = useParams();
  const [isOwnProfile, setisOwnProfile] = useState(
    userid.includes(Cookies.get("userid"))
  );
  const input = useRef(0);
  const upload = useRef(0);
  const textbox = useRef(0);
  const [url, seturl] = useState("");
  const [isFollowing, setisFollowing] = useState(false);
  const [isLogout, setisLogout] = useState(false);
  const [model, setmodel] = useState(false);
  const [user_detail, setuser_detail] = useState({});
  const [code, setcode] = useState([]);
  const [recent, setrecent] = useState(true);
  const [community, setcommunity] = useState(false);
  const onClose = () => {
    setmodel(false);
  };
  const open = () => {
    setmodel(true);
  };

  const submit = (e) => {
    e.preventDefault();
    let image = upload.current.files[0];
    const updateUserProfile = async (data) => {
      const url = `${import.meta.env.SERVER}/user/edit`;
      try {
        let fetch_data = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let res = await fetch_data.json();
        if (res.code === 200) {
          toast.success(res.msg);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error("Profile update failed");
        }
      } catch (error) {
        toast.error("User updated unsuccessfully");
        console.error("Error updating user:", error);
      }
    };
    // If no image is uploaded, submit data directly
    if (!image) {
      updateUserProfile({
        token: Cookies.get("token"),
        name: input.current.value,
        avatar_url: url,
        bio: textbox.current.value,
      });
      return;
    }
    // Validate image type using MIME types
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/avif",
      "image/jfif",
    ];

    if (!validTypes.includes(image.type)) {
      alert(
        "Invalid format\nInstruction\n* JPG, PNG, BMP, GIF, WEBP, AVIF, JFIF file extensions\n* Maximum file size 10MB"
      );
      return;
    }

    // Check if the image size is within the limit
    if (image.size / 1024 > 10240) {
      alert("Maximum file size 10MB");
      return;
    }

    // Choose a random ImgBB API key
    const apiKeys = [
      import.meta.env.REACT_APP_ASSET_1,
      import.meta.env.REACT_APP_ASSET_2,
      import.meta.env.REACT_APP_ASSET_3,
      import.meta.env.REACT_APP_ASSET_4,
      import.meta.env.REACT_APP_ASSET_5,
      import.meta.env.REACT_APP_ASSET_6,
    ];
    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    // Prepare FormData for image upload
    const formData = new FormData();
    formData.append("image", image);

    // Upload the image to ImgBB
    fetch(`https://api.imgbb.com/1/upload?key=${randomKey}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateUserProfile({
            token: Cookies.get("token"),
            name: input.current.value,
            avatar_url: data.data.url,
            bio: textbox.current.value,
          }); // Ensure the latest state is used
        } else {
          toast.error("Profile update failed");
        }
      })
      .catch((error) => {
        toast.error("Profile update failed");
        console.error("Error uploading image:", error);
      });
  };

  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: userid };
    let play = async () => {
      try {
        let fetch_data = await fetch(`${import.meta.env.SERVER}/user/get_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let res = await fetch_data.json();
        console.log(res);
        setisFollowing(
          res.followers.some((elem) => elem.includes(Cookies.get("userid")))
        );
        seturl(res.avatar_url);
        input.current.value = res.name;

        if (res.bio) {
          textbox.current.value = res.bio;
        }

        setuser_detail(res);
        let code = res.codes.filter((elem) => {
          return elem.recent_delete == false && elem.community_id == null;
        });
        code = code.sort((a, b) => {
          const dateA = a.updated
            ? moment(a.updated, "MMM D, YYYY h:mm A").unix()
            : 0;
          const dateB = b.updated
            ? moment(b.updated, "MMM D, YYYY h:mm A").unix()
            : 0;

          // Sort in descending order (latest to earliest)
          return dateB - dateA;
        });
        setcode(code);
        console.log(code);
      } catch (error) {
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
          let fetch_data = await fetch(`${import.meta.env.SERVER}/user/follow/`, {
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
  return (
    <>
      {console.log(user_detail)}
      <ToastContainer />
      <div className="flex w-full">
        <Nav
          data={data[2].dashboard}
          color={"#000000"}
          parallel={false}
          logo={false}
          textColor=""
          searchIconColor={"blue"}
          set={isLogout}
          isSet={setisLogout}
          search={false}
          profile={false}
          profile_url={`/profile/${Cookies.get("userid")}`}
          user={false}
          user_img={
            Cookies.get("userid").includes(userid)
              ? user_detail?.avatar_url
              : user_detail.avatar_url_own
          }
          profile_img={
            Cookies.get("userid").includes(userid)
              ? user_detail?.avatar_url
              : user_detail.avatar_url_own
          }
          className="w-[15%]"
        />
        <div className="bg-red-200 w-[85%] h-[100vh] relative overflow-x-hidden">
          <Nav
            data={[]}
            color={"gray"}
            parallel={true}
            logo={true}
            textColor=""
            searchIconColor={"blue"}
            search={true}
            profile={true}
            profile_url={`/profile/${Cookies.get("userid")}`}
            user={false}
            user_img={
              Cookies.get("userid").includes(userid)
                ? user_detail?.avatar_url
                : user_detail.avatar_url_own
            }
            profile_img={
              Cookies.get("userid").includes(userid)
                ? user_detail?.avatar_url
                : user_detail.avatar_url_own
            }
            half={true}
            className="w-[85%]"
          />
          <div className="p-5  m-4  mb-5 ">
            <div className="bg-slate-700 text-white pb-5 rounded-lg">
              <div className="flex mt-16 items-center p-5 justify-around gap-2 ">
                <img
                  src={user_detail?.avatar_url}
                  alt={user_detail?.name}
                  title={user_detail?.name}
                  className="rounded-full w-[25%] h-[25%] lg:w-[15%] lg:h-[15%]"
                />
                <p className="grid gap-2 justify-items-center">
                  <span className="title-font font-medium sm:text-4xl text-3xl ">
                    {user_detail?.followers?.length}
                  </span>
                  <span className="leading-relaxed">Followers</span>
                </p>
                <p className="grid gap-2 justify-items-center">
                  <span className="title-font font-medium sm:text-4xl text-3xl">
                    {user_detail?.follows?.length}
                  </span>
                  <span className="leading-relaxed">Follows</span>
                </p>
                <p className="grid gap-2 justify-items-center">
                  <span className="title-font font-medium sm:text-4xl text-3xl">
                    {user_detail?.views?.length}
                  </span>
                  <span className="leading-relaxed">Views</span>
                </p>
              </div>
              <div className="grid md:pl-[10%] pl-10 gap-2">
                <p className="font-bold text-base lg:text-lg">
                  {user_detail?.name}
                </p>
                <p className="text-justify w-[75%] lg:w-[50%]">
                  {isOwnProfile ? (
                    <>
                      {user_detail?.bio == undefined ||
                      user_detail?.bio?.length == 0 ? (
                        <>
                          <p
                            className="flex gap-2 cursor-pointer"
                            onClick={() => {
                              setmodel(true);
                            }}
                          >
                            <Edit /> Add Bio
                          </p>
                        </>
                      ) : (
                        <>{user_detail?.bio}</>
                      )}
                    </>
                  ) : (
                    <>{user_detail?.bio}</>
                  )}
                </p>
              </div>
            </div>
            <div className="p-2 overflow-hidden">
              {isOwnProfile ? (
                <>
                  <div
                    className="cursor-pointer btn shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]  font-bold"
                    onClick={() => {
                      setmodel(true);
                    }}
                  >
                    Edit
                  </div>
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <>
                      <div
                        className="btn justify-center  bg-slate-200 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] text-black font-bold hover:bg-slate-500 hover:text-white m-0 "
                        onClick={follow}
                      >
                        <Minus /> Following
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="btn justify-center shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] font-bold  m-0 "
                        onClick={follow}
                      >
                        <Plus /> Follow
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="w-full bg-black h-1"></div>
            {isOwnProfile ? (
              <>
                {" "}
                <div
                  className={`flex justify-around  items-center mt-2 w-full bg-[#ffffff69] `}
                >
                  <div
                    className={`cursor-pointer hover:bg-slate-400 p-2  w-[50%] text-center align-middle ${
                      recent && "bg-slate-400"
                    }`}
                    onClick={() => {
                      setrecent(true);
                      setcommunity(false);
                    }}
                  >
                    Recent
                  </div>
                  <div
                    className={`cursor-pointer hover:bg-slate-400 p-2  w-[50%] text-center align-middle ${
                      community && "bg-slate-400"
                    }`}
                    onClick={() => {
                      setrecent(false);
                      setcommunity(true);
                    }}
                  >
                    Community
                  </div>
                </div>
                <div>
                  {recent && (
                    <>
                      {code.length == 0 && (
                        <center>No Items is present here</center>
                      )}
                      {code.map((elem, idex) => {
                        return (
                          <>
                            <Card
                              key={idex}
                              user_name={user_detail.name}
                              file_name={elem.file_name.split(".")[0]}
                              ele={elem}
                              updated={elem.updated}
                              created_at={elem.created}
                              file_id={elem.code_id}
                            />
                          </>
                        );
                      })}
                    </>
                  )}

                  {community && (
                    <>
                      <div className="grid  gap-10 items-baseline justify-items-center md:items-start lg:grid-cols-3 md:grid-cols-2 grid-cols-1  m-2 ">
                        {user_detail.community?.length == 0 && (
                          <center>No Items is present here</center>
                        )}
                        {user_detail.community?.map((elem, index) => {
                          return (
                            <>
                              <Community_card
                                key={index}
                                data={elem}
                                isProfile={true}
                                isown={true}
                              />
                            </>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="font-extrabold text-2xl mt-5 mb-3">
                  Community's Collection:
                </h2>
                {user_detail.community?.length == 0 && (
                  <>
                    <center>No Items is present here</center>
                  </>
                )}
                <div className="grid  gap-10 items-baseline justify-items-center md:items-start lg:grid-cols-3 md:grid-cols-2 grid-cols-1  m-2 ">
                  {user_detail.community?.map((elem, index) => {
                    return (
                      <>
                        <Community_card
                          key={index}
                          data={elem}
                          isProfile={true}
                          isown={true}
                        />
                      </>
                    );
                  })}
                </div>
              </>
            )}

            <div
              className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                model ? "block" : "hidden"
              }`}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-black"
                  onClick={onClose}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>
                <form>
                  <label htmlFor="FileName" className="mb-5">
                    Name{" "}
                  </label>
                  <div className="flex gap-2 mb-5">
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      autoFocus={true}
                      className="border-solid border-2  border-black p-2"
                      ref={input}
                    />
                  </div>
                  <label htmlFor="FileName" className="mb-5">
                    Upload your photos{" "}
                  </label>
                  <div className="flex gap-2 mb-5">
                    <input type="file" ref={upload} />
                  </div>
                  <label htmlFor="FileName" className="mb-5">
                    Bio{" "}
                  </label>
                  <div className="flex gap-2 mb-5">
                    <textarea
                      rows={4}
                      cols={30}
                      placeholder="Enter your Bio"
                      autoFocus={true}
                      maxLength={120}
                      className="border-solid border-2  border-black p-2"
                      ref={textbox}
                    />
                  </div>
                  <div className="flex gap-5 justify-center">
                    <input
                      type="submit"
                      value="Cancel"
                      className="btn bg-slate-600 hover:bg-slate-400 cursor-pointer text-white"
                      onClick={onClose}
                    />
                    <input
                      type="submit"
                      value="Submit"
                      className="btn cursor-pointer"
                      onClick={submit}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
