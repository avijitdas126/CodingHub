import { Loader, Search, UploadIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Asset from "./assets";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function Uploads(props) {
  let navigator = useNavigate();
  const { isbox = false, className = "" } = props;
  const [link, setLink] = useState("");
  const [image_list, setimage_list] = useState([]);
  const [isload_list, setisload_list] = useState(true);
  const [isUpload, setisUpload] = useState(false);
  const [body, setBody] = useState({});
  const [url, seturl] = useState("");
  const [load, setload] = useState(true);
  const [isSearch, setisSearch] = useState(false);
  const [count, setcount] = useState(1);
  const [network_img, setnetwork_img] = useState([]);
  const [btn1, setbtn1] = useState(true);
  const [btn2, setbtn2] = useState(false);
  const [search, setsearch] = useState("coding");
  const [apiKeyIndex, setApiKeyIndex] = useState(0);
  let submit = useRef("");
  let file = useRef("");
  const handle = (e) => {
    e.preventDefault();
    let image = file.current.files[0];
    if (!image) {
      alert("Please select a file to upload");
      return;
    }
    if (
      image.name.includes("png") ||
      image.name.includes("jpg") ||
      image.name.includes("gif") ||
      image.name.includes("bmp") ||
      image.name.includes("webp") ||
      image.name.includes("avif") ||
      image.name.includes("jfif")
    ) {
      if (image.size / 1024 < 1024 * 10) {
        setisUpload(true);
        const apiKey = [
          `${import.meta.env.REACT_APP_ASSET_1}`,
          `${import.meta.env.REACT_APP_ASSET_2}`,
          `${import.meta.env.REACT_APP_ASSET_3}`,
          `${import.meta.env.REACT_APP_ASSET_4}`,
          `${import.meta.env.REACT_APP_ASSET_5}`,
          `${import.meta.env.REACT_APP_ASSET_6}`,
        ]; // Replace with your ImgBB API key
        let random = Math.floor(Math.random() * 6);
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);
        setLink(`https://api.imgbb.com/1/upload?key=${apiKey[random]}`);
        setBody(formData);
      } else {
        alert("Maximum file size 10MB");
      }
    } else {
      alert(
        "Invalid format\nInstruction\n* JPG, PNG ,BMP ,GIF ,WEBP, AVIF ,JFIF file extensions\n* Maximum file size 10MB"
      );
    }
  };

  useEffect(() => {
    if (link && body) {
      fetch(link, {
        method: "POST",
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
            post_assert(
              data.data.url,
              data.data.id,
              data.data.title,
              Cookies.get("token")
            );
          } else {
            toast.error("Upload failed");
          }
        })
        .catch((error) => {
          toast.error("Upload failed");
          setisUpload(false);
          console.error("Error uploading image:", error);
        });
    }
  }, [link, body]);

  // Upload image metadata to the database
  const post_assert = async (url, id, name, token) => {
    if (!token) navigator("/login");
    try {
      const response = await fetch(
        `https://codinghub-5gt0.onrender.com/user/assert/uploads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, url, token }),
        }
      );

      if (!response.ok) throw new Error("Failed to post image metadata");

      const data = await response.json();
      setisUpload(true);
      toast.success(data.msg);

      setisload_list(!isload_list);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to upload metadata");
      setisUpload(false);
      console.error("Error posting image metadata:", error);
    }
  };
  //get uploaded list
  useEffect(() => {
    let play = async () => {
      try {
        let token = Cookies.get("token");
        if (!token) navigator("/login");
        const response = await fetch(`https://codinghub-5gt0.onrender.com/user/assert`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        console.log(data);
        setimage_list(data);
      } catch (error) {
        toast.error("Failed to get Assets");
        setisUpload(false);
        console.log(error);
      }
    };
    play();
  }, [isload_list]);

  //fetching network image
  useEffect(() => {
    const play = async () => {
      try {
        if (search.trim().length === 0) {
          setsearch("coding");
        }

        const apiKey = [
          import.meta.env.REACT_APP_Access_Key,
          import.meta.env.REACT_APP_Access_Key1,
          import.meta.env.REACT_APP_Access_Key2,
          import.meta.env.REACT_APP_Access_Key3,
          import.meta.env.REACT_APP_Access_Key4,
        ];
        const currentKey = apiKey[apiKeyIndex];

        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${search}&client_id=${currentKey}&page=${count}`
        );

        if (!response.ok) throw new Error("Failed to fetch images");
        setApiKeyIndex((prev) => (prev + 1) % apiKey.length); // Rotate key index
        const data = await response.json();

        // Handle logic for new searches vs pagination
        setnetwork_img((prev) =>
          load || isSearch || count == 1
            ? data.results
            : [...prev, ...data.results]
        );

        // Reset search state after new search
        if (isSearch) {
          setcount(1);
          setisSearch(false);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setload(false);
      }
    };

    play();
  }, [load, count, isSearch]);

  return (
    <>
      {!isbox ? (
        <div
          className={`mt-20 bg-raisin_black-100 text-white p-2   rounded m-2 ${className}`}
        >
          <form className="text-center">
            <div
              className=" grid justify-items-center gap-8 text-center justify-center  uppercase bg-raisin_black-700 text-white font-bold
           p-4 m-2 select-none cursor-pointer"
            >
           
              
              <input type="file" ref={file} className='text-[80%]'/>

            
         

             <div>
             {isUpload && (
                <>
                  <Loader className="animate-spin" />
                </>
              )}
              
              </div> 
            </div>
            <input
              type="Submit"
              value="Submit"
              ref={submit}
              onClick={handle}
              className="bg-slate-300 text-black p-3 m-2 cursor-pointer font-bold rounded"
            />
            <div className="bg-raisin_black-900 pb-3 text-black">
              <h2 className="font-black text-start mb-2 p-2 text-2xl underline">
                Instruction:
              </h2>

              <div className="font-serif font-extrabold text-start p-2">
                <ul>
                  <li>
                    * JPG, PNG ,BMP ,GIF ,WEBP, AVIF ,JFIF file extensions
                  </li>
                  <li> * Maximum file size 10MB</li>
                </ul>
              </div>
            </div>
          </form>
          <img src={url} alt="" />
          <div className="flex flex-wrap gap-4 justify-around mt-5 p-4">
            {image_list.length != 0 ? (
              <>
                {image_list.map((elem, index) => {
                  return (
                    <>
                      <Asset
                        url={`${elem.url}`}
                        index={`${elem.id}`}
                        isNetwork={true}
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <center>
                  <p>No item is not uploaded</p>
                </center>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`mt-20 h-[50%] overflow-y-auto grid   w-[85%]  lg:w-2/5 gap-8 text-center  bg-raisin_black-700 text-white font-bold
           py-4 m-2 ${className}`}
          >
            <form className="text-center  ">
              <div className=" select-none cursor-pointer grid gap-[1.1rem] justify-center justify-items-center">
                <center>
                  <input
                    type="file"
                    ref={file}
                    className="text-[80%] lg:text-[100%]  text-center"
                  />
                </center>
                <input
                  type="Submit"
                  value="Submit"
                  ref={submit}
                  onClick={handle}
                  className="bg-slate-300  text-black p-3  cursor-pointer font-bold rounded"
                />
                {isUpload && (
                  <>
                    <p className="animate-spin">
                      <Loader />
                    </p>
                  </>
                )}
              </div>
            </form>

            <div>
              <div className="flex justify-around  bg-raisin_black-800">
                <p
                  className={`${
                    btn1 ? "active_nav cursor-pointer" : "p-2 cursor-pointer"
                  }`}
                  onClick={(e) => {
                    setbtn1(true);
                    setbtn2(false);
                  }}
                >
                  Upload
                </p>
                <p
                  className={`${
                    btn2 ? "active_nav cursor-pointer" : "p-2 cursor-pointer"
                  }`}
                  onClick={(e) => {
                    setbtn2(true);
                    setbtn1(false);
                  }}
                >
                  Network's Image
                </p>
              </div>
              {!btn1 && (
                <div className="pt-4 flex justify-center items-baseline ">
                  <div className=" text-black outline-none flex justify-center items-baseline ">
                    <input
                      type="text"
                      className="p-2  "
                      height={15}
                      placeholder="Searching anything...."
                      onChange={(e) => {
                        setload(true);
                        setsearch(e.target.value);
                        setisSearch(true);
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="py-4 flex flex-wrap gap-2 px-2   ">
                {btn1 ? (
                  <>
                    {image_list.length != 0 ? (
                      <>
                        {image_list.map((elem, index) => {
                          return (
                            <>
                              <Asset
                                url={`${elem.url}`}
                                index={`${elem.id}`}
                                isNetwork={true}
                              />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <center>
                          <p>No item is not uploaded</p>
                        </center>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {load ? (
                      <>
                        <center>
                          <Loader className="animate-spin" />
                        </center>
                      </>
                    ) : (
                      <>
                        {network_img.map((elem, index) => {
                          return (
                            <>
                              <Asset
                                url={elem.urls.regular}
                                index={index + 1}
                                isNetwork={true}
                              />
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
              {console.log(load, isSearch, count)}
              {console.log(network_img)}
              {!btn1 && (
                <div
                  className="btn cursor-pointer"
                  onClick={() => {
                    setcount((value) => value + 1);
                  }}
                >
                  {" "}
                  Load{" "}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Uploads;
