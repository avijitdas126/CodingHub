const express = require("express");
const jwt=require('jsonwebtoken')
require('dotenv').config()
const User=require('../../database/user')
const get_user = express.Router();

/**
 * req:token
 * res:{name,email,avatar_url:imgur_api,followers:[userid,.......],
 * follows:[userid,.......],bio: 100 letters,codes:[code_id,.......]
}
 */
get_user.post("/", (req, res) => {
    let {token}=req.body
    let data=jwt.decode(token)
    let play=async()=>{
try {
    let userid=data.userid;
    let client_id=data.client_id;
    let dat=await User.find({userid,client_id})
    if(dat.length!=0){
        let payload={
            name:dat[0].name,
            email:dat[0].email,
            avatar_url:dat[0].avatar_url,
            followers:dat[0].followers,
            follows:dat[0].follows,
            bio:dat[0].bio
            // codes:
        }
        res.send(payload)
    }
    else{
        res.status(404)
        res.send({
            msg:"Invaild Credentials",
            code:404
        })
    }
    //console.log(dat);
} catch (error) {
    res.status(404)
        res.send({
            msg:"Invaild Token",
            code:404
        })
}
    }
    play()
// console.log(data);    
});
module.exports = get_user;
