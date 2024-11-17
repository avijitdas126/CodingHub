import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            <div className="flex justify-between">
              <a
                className="flex title-font font-medium text-white mb-4 md:mb-0"
                href="#"
              >
                <img src="./icons8-code-64.png" alt="icon" />
                <span className="ml-3 text-xl">CodeHub</span>
              </a>
              <div className="md:hidden">
                {isClose ? (
                  <button
                    className="p-1 bg-black h-fit"
                    onClick={() => {
                      setisClose(false);
                    }}
                  >
                    <Menu />
                  </button>
                ) : (
                  <button
                    className="p-1 bg-black h-fit"
                    onClick={() => {
                      setisClose(true);
                    }}
                  >
                    <X />
                  </button>
                )}
              </div>
            </div>
            <nav
              className={`md:ml-auto grid gap-3 md:flex flex-wrap text-base ${
                isClose ? "hidden" : "block"
              }`}
            >
              <a
                className="mr-5 active cursor-pointer p-2 hover:bg-slate-300 hover:text-black rounded-md"
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
              {Cookies.get("token") ? (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="items-center justify-start w-fit md:justify-around border-0 py-1 px-3 focus:outline-none btn rounded text-base mt-4 md:mt-0"
                >
                  <LogIn /> Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="items-center border-0 py-1 px-3 focus:outline-none btn rounded text-base mt-4 md:mt-0"
                >
                  <LogIn /> Signup
                </button>
              )}
            </nav>
          </div>
        </header>
        {/* Hero */}
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 pt-28 md:flex-row-reverse flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="./web.jpg"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
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
                    else navigate("signup");
                  }}
                  className="btn p-3 items-center font-bold"
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
            <h2 className="text-center text-4xl text-black">Explore Our Features</h2>
            <div className="mt-20 flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
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
              <div className="sm:order-none order-first h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                <Users />
              </div>
            </div>
            <button
              onClick={() => {
                if (Cookies.get("token")) navigate("/dashboard");
                else navigate("signup");
              }}
              className="flex mx-auto mt-20 btn border-0 py-2 px-8 focus:outline-none items-center font-bold rounded text-lg btn"
            >
              <BatteryCharging /> Get Started
            </button>
          </div>
        </section>
        {/* footer section */}
        <footer className="body-font bg-[#1A2130] text-white">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center">
              <img src="./icons8-code-64.png" alt="icon" />
              <span className="ml-3 text-xl">CodeHub</span>
            </a>
            <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
              &copy; 2024 CodeHub —{" "}
              <a
                href="#"
                className="ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @Avijitdas
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
