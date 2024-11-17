import React, { useEffect, useState } from "react";
import "../../index.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeOff, Loader } from "lucide-react";
function Formjs(props) {
  let navigator = useNavigate();
  let { title, component, type } = props;
  // get token from cookie using js-cookie packages
  const [data, setdata] = useState({
    token: Cookies.get("token"),
  });
  const [load, setload] = useState(false)
  console.log(data);
  const [submit, setsubmit] = useState(false);
  useEffect(() => {
    // Initialize the data object
    component.map((elem) => {
      setdata((olddata) => ({
        ...olddata,
        [elem.name]: "",
      }));
    });

    console.log(component, data);
  }, [component]);

  const handleChange = (name, value) => {
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmit(true);
    setload(true)
    console.log("Form submitted with data:", data);
  };
  useEffect(() => {
    console.log(submit)
    if (submit) {
      const url = type.includes("signup")
        ? `${import.meta.env.REACT_APP_SERVER}/user/signup`
        : type.includes("login")
        ? `${import.meta.env.REACT_APP_SERVER}/user/login`
        : "";
      if (data["token"] == undefined) {
        setdata((prevData) => ({
          ...prevData,
          ["token"]: "",
        }));
      }
      if (url) {
        console.log(url)
     let play=async () => {
      try {
        let res=await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        let resdata=await res.json()
        if(!res.ok) throw new Error(resdata.msg)
          Cookies.set("token", resdata.token, { expires: 90 });
        setload(false)
        toast.success(resdata.msg);
        console.log(resdata);
        navigator("/dashboard");
      } catch (error) {
        toast.error(error.message);
              setsubmit(false)
              setload(false)
      }
      
     }
     play()
      }
    }
  }, [submit, data, type]);

  return (
    <>
      <div className="my-10 md:mx-10 bg-electric_indigo-600 text-white py-10 rounded mx-auto w-[80%] border-violet-900 border-solid border-2 shadow hover:shadow-lg">
        <h1 className="text-center text-5xl font-bold underline pb-10">
          {title}
        </h1>

        <form onSubmit={handleSubmit}>
          {component.map((elem, index) => {
            return (
              <Component
                type={elem.type}
                key={index}
                label={elem.label}
                onChange={handleChange}
                placeholder={elem.placeholder}
                name={elem.name}
                data={data}
                required={elem.required}
                display={elem.display}
              />
            );
          })}

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
            >
              Submit
            </button>

            <ToastContainer />
          </div>
        </form>
        {type.includes("signup") && (
          <>
            <center>
              <Link
                to="/login"
                className="text-center mx-auto text-xl font-bold underline "
              >
                Already have a account?
              </Link>
            </center>
          </>
        )}
        {type.includes("login") && (
          <>
            <center>
              <Link
                to="/signup"
                className="text-center mx-auto text-xl font-bold underline "
              >
                Have no account?
              </Link>
            </center>
          </>
        )}
        {load?<>
       <center> <Loader className='animate-spin'/></center></>:<></>}
      </div>
    </>
  );
}
function Component(props) {
  let {
    type,
    label,
    placeholder,
    required,
    maxlength=20,
    data,
    autoFocus,
    name,
    onChange,
    display,
    disabled,
    value,
  } = props;
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };
  const [isClick, setisClick] = useState(false);
  const [typ, settype] = useState(type);
  const hand = () => {
    if (typ.includes("text")) {
      setisClick(false);
      settype("password");
    } else {
      setisClick(true);
      settype("text");
    }
  };
  return (
    <>
      <div className={`grid px-5 gap-2 ${!display && "hidden"} mb-2 overflow-hidden`}>
        <div className="text-center  flex gap-5 justify-center items-center ">
          <label htmlFor={label} className="mr-2 text-center font-bold text-xl">
            {" "}
            {label}
          </label>
          <div className="flex gap-5 border-solid border-black border-1 rounded w-[80%] lg:w-[40%] justify-between bg-white">
            <input
              type={typ}
              maxLength={maxlength}
              placeholder={placeholder}
              className="p-2   text-black bg-transparent outline-none"
              onChange={handleChange}
              name={name}
              required={required}
              disabled={disabled}
              value={value}
              autoFocus={autoFocus}
            />

            {type.includes("password") && (
              <>
                <div className="pt-2">
                  {isClick && (
                    <Eye
                      onClick={hand}
                      className="cursor-pointer text-black p-1"
                    />
                  )}
                  {!isClick && (
                    <EyeOff
                      onClick={hand}
                      className="cursor-pointer text-black p-1"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Formjs, Component };
