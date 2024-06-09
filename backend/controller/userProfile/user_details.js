const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User=require('../../database/user')
const follow= express.Router();

follow.post("/", (req, res) => {
let {token,name,email,bio}=req.body
let data=jwt.verify(token,process.env.secect_key);
const play=async()=>{
    try {
        let userid=data.userid
        let update=await User.updateOne({userid},{
            $set:{
                name,
                email,
                bio
            }
        })
console.log(update);
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