import { UploadIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Asset from "./assets";

function Upload() {
  let submit = useRef("");
  let file = useRef("");
  let handle = (e) => {
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
      image.name.includes("avif")||
      image.name.includes("jfif")
    ) {
        if((image.size/1024) < (1024*10)){
            const apiKey = "0e46481e8432562aecfba9f8fc88205e"; // Replace with your ImgBB API key
    const formData = new FormData();
    formData.append("image", file);

    
    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const imageUrl = data.data.url;
           // document.getElementById('response').innerHTML = `Image uploaded successfully: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
        } else {
            //document.getElementById('response').textContent = 'Image upload failed';
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        //document.getElementById('response').textContent = 'An error occurred while uploading the image';
    });

        }
     else{
        alert('Maximum file size 10MB')
     }
    } else {
      alert("Invalid format");
    }

    
  };
  return (
    <>
      <div className="w-1/3 bg-raisin_black-100 text-white p-2 rounded m-2 ">
        <form className="text-center">
          <div
            className=" flex gap-8 text-center justify-center  uppercase bg-raisin_black-700 text-white font-bold
           p-4 m-2 select-none cursor-pointer hover:bg-slate-300 hover:text-black"
          >
            <UploadIcon />
            <input type="file" ref={file} />
          </div>
          <input
            type="Submit"
            value="Submit"
            ref={submit}
            onClick={handle}
            className="bg-raisin_black-800 hover:bg-slate-300 text-black p-3 m-2 cursor-pointer font-bold rounded"
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
        <div className="flex flex-wrap gap-4 justify-between mt-5">
            {/* <Asset url="/download.jfif" index='1' />
            <Asset url="/download.jfif" index='1' />
            <Asset url="/download.jfif" index='1' />
            <Asset url="/download.jfif" index='1' /> */}
        </div>
      </div>
    </>
  );
}

export default Upload;
