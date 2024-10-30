const express = require("express");
const jwt=require('jsonwebtoken')
require('dotenv').config()
const User=require('../../database/user')
let code_detail=require('../../database/code_details')
let communitydb=require('../../database/community')
const get_user = express.Router();

/**
 * req:token
 * res:{name,email,avatar_url:imgur_api,followers:[userid,.......],
 * follows:[userid,.......],bio: 100 letters,codes:[code_id,.......]
}
 */
get_user.post("/", (req, res) => {
    let {token,userid}=req.body
    let data=jwt.decode(token)
    console.log(data)
    let url='';
    let notown=false;
    let play=async()=>{
try {
    let userid1=data?.userid;
    if(userid!=userid1){
        let views=await User.updateOne({userid},{
            $push:{
                views:userid1
            }
        })
        notown=true
        console.log(views);
    }
    let dat=await User.find({userid})
    let codes=await code_detail.find({userid})
    let community=await communitydb.find({userid})
    if(dat.length!=0){
        let payload={
            name:dat[0].name,
            email:dat[0].email,
            username:dat[0].client_id,
            avatar_url:dat[0].avatar_url,
            followers:(dat[0].followers),
            follows:(dat[0].follows),
            bio:dat[0].bio,
            codes,
            community,
            views:dat[0].views,
            avatar_url_own:null
        }
        if(notown){
            url=await User.find({userid:userid1})
            url=url?.[0].avatar_url
            payload['avatar_url_own']=url
           
        }
        res.status(200)
        res.send(payload)
    }
    else{
        res.status(404)
        res.send({
            msg:"Invaild Credentials",
            code:404
        })
    }
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
