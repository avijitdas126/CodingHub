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
        ? `https://codinghub-5gt0.onrender.com/user/signup`
        : type.includes("login")
        ? `https://codinghub-5gt0.onrender.com/user/login`
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
     <div className="my-10 px-5 md:px-10 bg-electric_indigo-600 text-white py-10 rounded mx-auto max-w-4xl border-violet-900 border-solid border-2 shadow hover:shadow-lg">
  <h1 className="text-center text-3xl md:text-5xl font-bold underline pb-6">
    {title}
  </h1>

  <form onSubmit={handleSubmit}>
    <div className="grid gap-6 sm:gap-10 md:gap-12">
      {component.map((elem, index) => (
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
      ))}
    </div>

    <div className="flex gap-4 justify-center py-6">
      <button
        type="reset"
        className="bg-white px-6 py-2 font-bold hover:shadow-2xl text-black rounded"
      >
        Clear
      </button>
      <button
        type="submit"
        className="bg-medium_slate_blue-100 px-6 py-2 font-bold hover:shadow-2xl text-white rounded"
      >
        Submit
      </button>
    </div>
    <ToastContainer />
  </form>

  {type.includes("signup") && (
    <p className="text-center mt-4">
      <Link to="/login" className="text-white underline">
        Already have an account?
      </Link>
    </p>
  )}
  {type.includes("login") && (
    <p className="text-center mt-4">
      <Link to="/signup" className="text-white underline">
        Don't have an account?
      </Link>
    </p>
  )}
  
  {load && (
    <div className="flex justify-center mt-6">
      <Loader className="animate-spin text-white" />
    </div>
  )}
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
      <div
  className={`grid px-5 gap-2 ${!display && "hidden"} mb-2 overflow-hidden`}
>
  <div className="flex flex-col lg:flex-row gap-4 items-center">
    <label
      htmlFor={label}
      className="text-center font-bold text-lg md:text-xl w-full lg:w-auto"
    >
      {label}
    </label>
    <div className="flex items-center gap-2 border border-black rounded w-full bg-white px-3">
      <input
        type={typ}
        maxLength={maxlength}
        placeholder={placeholder}
        className="w-full p-2 text-black bg-transparent outline-none"
        onChange={handleChange}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        autoFocus={autoFocus}
      />
      {type.includes("password") && (
        <div>
          {isClick ? (
            <Eye onClick={hand} className="cursor-pointer text-black" />
          ) : (
            <EyeOff onClick={hand} className="cursor-pointer text-black" />
          )}
        </div>
      )}
    </div>
  </div>
</div>

    </>
  );
}

export { Formjs, Component };
