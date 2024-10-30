import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  BarChart4,
  BatteryCharging,
  LogIn,
  Menu,
  Share2,
  Upload,
  Users,
  X,
} from "lucide-react";
const Index = () => {
  const navigate = useNavigate();
  const [isClose, setisClose] = useState(true);
  return (
    <>
      <div>
        {/* nav section */}
        <header className="text-white body-font bg-[#1A2130] fixed w-full">
          <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row ">
            <div className=" flex justify-between">
              <a
                className="flex title-font font-medium  text-white mb-4 md:mb-0"
                href="#"
              >
                <img src="./icons8-code-64.png" alt="icon" />
                <span className="ml-3 text-xl">CodeHub</span>
              </a>
              <div className="md:hidden">
                {isClose ? (
                  <>
                    <button
                      className="p-1 bg-black h-fit"
                      onClick={() => {
                        setisClose(false);
                      }}
                    >
                      <Menu />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="p-1 bg-black h-fit"
                      onClick={() => {
                        setisClose(true);
                      }}
                    >
                      <X />
                    </button>
                  </>
                )}
              </div>
            </div>
            <nav
              className={`md:ml-auto grid gap-3 md:flex flex-wrap  text-base ${
                isClose ? "hidden" : "block"
              }`}
            >
              <a
                className="mr-5 active  cursor-pointer p-2 hover:bg-slate-300  hover:text-black rounded-md"
                href="#"
              >
                Home
              </a>
              <a
                className="mr-5 cursor-pointer p-2 hover:bg-slate-300 hover:text-black rounded-md"
                href="#feature"
              >
                Feature
              </a>
              {Cookies.get("token").length != 0 ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    className=" items-center justify-start w-fit md:justify-around  border-0 py-1 px-3 focus:outline-none btn rounded text-base mt-4 md:mt-0"
                  >
                    <LogIn /> Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="items-center border-0 py-1 px-3 focus:outline-none btn rounded text-base mt-4 md:mt-0"
                  >
                    <LogIn /> Signup
                  </button>
                </>
              )}
            </nav>
          </div>
        </header>
        {/* Hero */}
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 pt-28  md:flex-row-reverse flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="./web.jpg"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2  lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Welcome to CodeHub
              </h1>
              <p className="mb-8 leading-relaxed">
                Your ultimate space to build, share, and collaborate in
                real-time. Code with ease, connect with the community, and bring
                your ideas to life with just a click. No hosting required – just
                code, share, and shine!
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (Cookies.get("token")) navigate("/dashboard");
                    else {
                      navigate("signup");
                    }
                  }}
                  className=" btn p-3 items-center font-bold "
                >
                  <BatteryCharging /> Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* feature */}
        <section className="text-gray-600 body-font mt-3" id="feature">
          <div className="container px-5 py-24 mx-auto">
            <h2 className="text-center text-4xl text-black ">
              Explore Our Features
            </h2>
            <div className="mt-20 flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="  h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <Share2 />
              </div>
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  Share Your Code in One Click
                </h2>
                <p className="leading-relaxed text-base">
                  Easily share your projects with others by generating a unique
                  URL. No need for external hosting!
                </p>
              </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  Community Support
                </h2>
                <p className="leading-relaxed text-base">
                  Follow developers, get followers, and collaborate in real-time
                  with like-minded coders.
                </p>
              </div>
              <div className=" sm:order-none order-first  h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500  flex-shrink-0">
                <Users />
              </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 sm:flex-row flex-col">
              <div className=" h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <Upload />
              </div>
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  Upload and Use Images in Your Code
                </h2>
                <p className="leading-relaxed text-base">
                  Upload image assets directly to CodeHub or use dummy network
                  images for quick prototypes.
                </p>
              </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto  border-gray-200 sm:flex-row flex-col">
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  Real-time Follow & Follower System
                </h2>
                <p className="leading-relaxed text-base">
                  Build your network within the community by following
                  developers and gaining followers.
                </p>
              </div>
              <div className=" sm:order-none order-first  h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500  flex-shrink-0">
                <BarChart4 />
              </div>
            </div>
            <button
              onClick={() => {
                if (Cookies.get("token")) navigate("/dashboard");
                else {
                  navigate("signup");
                }
              }}
              className="flex mx-auto mt-20 btn border-0 py-2 px-8 focus:outline-none items-center font-bold rounded text-lg btn"
            >
              <BatteryCharging /> Get Started
            </button>
          </div>
        </section>

        {/* footer section */}
        <footer className=" body-font bg-[#1A2130] text-white">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center ">
              <img src="./icons8-code-64.png" alt="icon" />
              <span className="ml-3 text-xl">CodeHub</span>
            </a>
            <p className="text-sm  sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              &copy; 2024 CodeHub —
              <a
                href="#"
                className=" ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @Avijitdas
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a>
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5 cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5 cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5 cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 ">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="w-5 h-5 cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
