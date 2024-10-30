const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User=require('../../database/user')
const follow= express.Router();

follow.post("/", (req, res) => {
let {token,name,bio,avatar_url}=req.body
const play=async()=>{
    try {
       
        let data=jwt.verify(token,process.env.secect_key);
        let userid=data.userid
        let update=await User.updateOne({userid},{
            $set:{
                avatar_url,
                name,
                bio
            }
        })
console.log(update);
res.status(200)
res.send({
    msg:"User Profile updated Successfully",
    code:200
})  
    } catch (error) {
        res.status(404)
            res.send({
                msg:"Error Exit",
                code:404
            })
            console.log(error.message);
    }
}
play()
})

module.exports =follow;