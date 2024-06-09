const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User=require('../../database/user')
const follow= express.Router();


follow.post("/", (req, res) => {
let {token,follower_id}=req.body
let data=jwt.verify(token,process.env.secect_key);
const play=async()=>{
    try {
        let userid=data.userid
        let res12=await User.find({userid})
        let array=res12[0].follows
        let bool=false
        for(let i=0;i<array.length;i++){
            if(array[i]==follower_id){
                bool=true
                break;
            }
        }
            if(!bool){
                let follow=await User.updateOne({userid},{
                    $push:{
                        follows:follower_id
                    }
                })
                let follower=await User.updateOne({follower_id},{
                    $push:{
                        followers:userid
                    }
                })
                console.log(follow,follower);
        res.send({
            msg:"Follow add successfully",
            code:200
        })
            }
            else{
                res.status(500)
                res.send({
                    msg:"You already follow this person",
                    code:500
                })
            }
    } catch (error) {
        res.status(404)
            res.send({
                msg:"Error Exit",
                code:404
            })
            console.log(error.message);
    }
}
})

module.exports =follow;