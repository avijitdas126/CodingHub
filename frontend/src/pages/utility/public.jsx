/* The above code is a React functional component named `Public`. It is a form component that allows
users to submit data to a server. Here is a summary of what the code is doing: */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formjs, Component } from "./Formjs";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
const Public = () => {
  let { name, id, mode = 1 } = useParams();
  const [data, setdata] = useState({
    code_id: id,
    token: Cookies.get("token"),
    title: "",
    description: "",
    tags: [],
  });
  const [count, setcount] = useState(0);
  const [load, setload] = useState(false);

  const navi = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://codinghub-5gt0.onrender.com/user/live/community/showcode",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: Cookies.get("token"),
              community_id: id,
            }),
          }
        );
        const result = await response.json();
        // details

        setdata((prevData) => ({
          ...prevData,
          ["code_id"]: result?.community_details?.[0].code_id,
          ["title"]: result?.community_details?.[0].title,
          ["tags"]: result?.community_details?.[0].tags,
          ["description"]: result?.community_details?.[0].description,
        }));
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    if (mode == 0) {
      fetchData();
    }
  }, [mode]);

  const handleChange = (data1, data) => {
    if (data1.includes("tags")) {
      let a = data.split(",");
      setdata((prevData) => ({
        ...prevData,
        [data1]: a,
      }));
    } else {
      setdata((prevData) => ({
        ...prevData,
        [data1]: data,
      }));
    }
  };
  const handledes = (e) => {
    if (e.target.value.length == 0) {
      e.preventDefault();
      setdata((prevData) => ({
        ...prevData,
        ["description"]: "",
      }));
      setcount(0);
    } else if (e.target.value.length >= 160) {
      e.preventDefault();
      setdata((prevData) => ({
        ...prevData,
        ["description"]: e.target.value,
      }));
      alert("Please give a short and catchy decription within 160 words");
    } else if (e.target.value.length != 0) {
      e.preventDefault();
      setdata((prevData) => ({
        ...prevData,
        ["description"]: e.target.value,
      }));
      setcount(e.target.value.length);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const play = async () => {
      setload(true);
      try {
        if (data.title.length && data.description.length && data.tags.length) {
          let res = await fetch(
            "https://codinghub-5gt0.onrender.com/user/live/community/post",
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
          let { code, msg, public_url } = json;
          setload(false);
          if (Number(code) == 200) {
            toast.success(msg);
            setTimeout(() => {
              navi("/dashboard");
            }, 3000);
            // setreload(!reload);
          } else {
            toast.error(msg);
          }
        } else {
          toast.error("Must be fill out all details");
          setload(false);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    };
    const play1 = async () => {
      setload(true);
      try {
        if (data.title.length && data.description.length && data.tags.length) {
          let res = await fetch(
            "https://codinghub-5gt0.onrender.com/user/live/community/edit",
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
          let { code, msg, public_url } = json;
          setload(false);
          if (Number(code) == 200) {
            toast.success(msg);
            setTimeout(() => {
              navi("/community");
            }, 3000);
            // setreload(!reload);
          } else {
            toast.error(msg);
          }
        } else {
          toast.error("Must be fill out all details");
          setload(false);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    };
    if (mode == 1) {
      play();
    } else {
      play1();
    }
  };
  return (
    <>
      {load && (
        <>
          <div className="fixed top-[35%] right-[42%] bg-[#a195959c] p-8 rounded">
            <img
              src="/code_loader.gif"
              alt="loader"
              width={40}
              height={40}
              className=""
            />
          </div>
        </>
      )}

      <center>
        <h1 className="font-bold text-2xl py-5 hover:bg-raisin_black-300 hover:text-white w-[80%] mt-5 rounded hover:shadow ">
          Do you want to public this file <kbd>{name}</kbd> in Community?
        </h1>
      </center>
      <div className="  text-white min-w-[90%] bg-amber-700 rounded m-10">
        <form action="" className="pt-10 grid gap-5">
          <Component
            type="text"
            key={1}
            label={"Title"}
            placeholder={"Enter the Title"}
            name={"title"}
            onChange={handleChange}
            required={true}
            maxlength={40}
            value={data.title}
            display={true}
            disabled={false}
          />

          <div className="flex flex-col md:flex-row gap-4 justify-center my-5 items-center p-5">
            <label htmlFor="des" className="mr-2 text-center font-bold text-xl">
              Description:
            </label>
            <textarea
              name="description"
              cols={60}
              placeholder="Enter the description"
              onChange={handledes}
              className="p-2 text-black rounded w-full md:w-auto"
              rows={8}
              required={true}
              value={data.description}
            ></textarea>
            <span>{count}/160</span>
          </div>

          <Component
            type="text"
            key={2}
            label={"Tags"}
            maxlength={50}
            placeholder={"Enter tags"}
            name={"tags"}
            required={false}
            onChange={handleChange}
            value={data.tags.join(",")}
            display={true}
            disabled={false}
          />
          <p className="text-center font-semibold text-xl">
            <kbd>*Add tags using comma*</kbd>
          </p>
          <div className="flex gap-5 justify-center py-5">
            <button
              type="reset"
              className="bg-white px-8 py-2 font-bold hover:shadow-2xl text-black rounded"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg- px-8 py-2 font-bold hover:shadow-2xl rounded bg-medium_slate_blue-100"
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Public;
