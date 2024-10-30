import React, { useState, useEffect } from "react";
import { Formjs, Component } from "./Formjs";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
const MyErrorComponent = ({ message }) => <div>Error: {message}</div>;
const Webid = () => {
  let navi = useNavigate();
  let { id, name } = useParams();
  const [reload, setreload] = useState(false);
  const [user_detail, setuser_detail] = useState({});
  const [codes, setcodes] = useState([]);
  const [url, seturl] = useState("");
  const [data, setdata] = useState({
    code_id: id,
    token: Cookies.get("token"),
    bool: false,
  });

  const handleChange = (data1, data) => {
    setdata((prevData) => ({
      ...prevData,
      [data1]: data,
    }));
    setvalue(data);
  };

  const submit = (e) => {
    e.preventDefault();
    if (data["token"] === undefined) {
      navi("/login");
    }
    const play = async () => {
      try {
        let res = await fetch("http://localhost:9000/user/live/public", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let json = await res.json();
        console.log(json);
        let { code, msg, public_url } = json;

        if (Number(code) == 200) {
          seturl(public_url);
          toast.success(msg);
          setreload(!reload);
        } else {
          toast.error(msg);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    };
    play();
  };
  useEffect(() => {
    let data = { token: Cookies.get("token"), userid: Cookies.get("userid") };
    let play = async () => {
      try {
        let fetch_data = await fetch("http://localhost:9000/user/get_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let res = await fetch_data.json();
        setuser_detail(res);
        setcodes(res.codes);
        res.codes.map((elem) => {
          if (elem.code_id.includes(id)) {
            if (elem.public_url.length != 0) {
              seturl(elem.public_url);
            }
          }
        });
      } catch (error) {
        console.log("error");
      }
    };
    play();
  }, [reload]);
  const [value, setvalue] = useState("");
  return (
    <>
      <div className="text-white bg-electric_indigo-600 m-10">
        <form action="">
          <Component
            type="text"
            key={1}
            label={"File Name"}
            placeholder={"Enter File Name"}
            name={"filename"}
            required={true}
            display={true}
            value={name}
            disabled={true}
          />
          <Component
            type="text"
            key={2}
            label={"Unique Id"}
            onChange={handleChange}
            placeholder={"Enter Unique Id for url"}
            name={"webid"}
            required={true}
            display={true}
            autoFocus={true}
          />
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
            <ToastContainer />
          </div>
        </form>
      </div>
      {url && (
        <>
          <div className="flex gap-10 bg-slate-950 text-white text-xl p-4 rounded shadow hover:shadow-md hover:bg-slate-800 justify-center m-20">
            Your live url is :
            <Link
              to={url}
              className="font-extrabold font-serif underline hover:text-blue-600"
            >
              {url}
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Webid;
