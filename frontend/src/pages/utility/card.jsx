import {
  Delete,
  Dot,
  LucideView,
  MessageSquarePlus,
  PersonStanding,
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react";

function Card(props) {
  let { file_name, user_name, client_id, file_id, des, bool } = props;
  const [like, setlike] = useState(false);
  const [act, setact] = useState(false);
  const handle = () => {
    setlike(!like);
  };
  const hand = () => {
    setact(!act);
  };
  let code = (
    <div className="flex w-1/4 justify-start gap-5 items-center my-4">
      <ThumbsUp onClick={handle} className={`${like && "like"}`} />

      <a href="">
        {" "}
        <MessageSquarePlus />
      </a>
    </div>
  );
  return (
    <>
      <div className=" cursor-pointer flex justify-between relative bg-electric_indigo-500 text-white px-2 py-1 m-3 rounded shadow hover:shadow-2xl">
        <div className="grid gap-1 m-2 w-3/4">
          <h2 className="font-bold text-2xl">
            <a href="#">
              {file_name}
              <kbd>.html</kbd>
            </a>
          </h2>
          <h6 className="text-xs font-extrabold tracking-widest text-gray-300">
            <a href="">{user_name}</a>
          </h6>
          <p className="text-gray-100 text-justify">
          {des}
          </p>
          {bool && code}
        </div>
        
        <div className={`cursor-pointer  ${bool? 'hidden':'block'}`} onClick={hand}>
          <svg viewBox="0 0 21 21" fill="currentColor" height="4em" width="4em">
            <g fill="currentColor" fillRule="evenodd">
              <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
              <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
              <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
            </g>
          </svg>
        </div>
        {!bool && (
        <div
          className={`bg-white absolute top-[4.5rem] z-50 right-[2.8rem] shadow-2xl text-black p-3 flex gap-4 ${
            act ? "block" : "hidden"
          }`}
        >
          <div className="grid gap-5 ">
            <div className="flex gap-3 hover:bg-gray-100 p-2">
              <LucideView /> Live Deploy
            </div>
            <div className="flex gap-3  hover:bg-gray-100 p-2">
              <PersonStanding /> Community
            </div>
            <div className="flex gap-3  hover:bg-gray-100 p-2">
              <Delete /> Delete
            </div>
          </div>
        </div>

        )}
      </div>
    </>
  );
}

export default Card;
