const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const { encode } = require('html-entities');
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const commentdb=require('../../database/comment')
const comment = express.Router();

comment.post("/post", (req, res) => {
let {token,code_id,comment,mention_id}=req.body
let data=jwt.verify(token,process.env.secect_key);
let play=async()=>{
    try {
        let res25=await codeDetail.find({code_id})
        if(res25.length!=0 && data.userid==res25[0].userid){
            let community_id=res25[0].community_id
if(mention_id.length==0){
let comments=new commentdb({
    community_id,
    // comment_id
    //process----end2---start----from---this---part-----
})
}else{

}


        }else{
            res.status(404)
            res.send({
                msg:"Invalid Token",
                code:404
            })
        }
    }
 catch (error) {
    res.status(404)
    res.send({
        msg:"Error Exits.",
        code:404
    })
    console.log(error.message);
}
    }
    play()
})
comment.post("/", (req, res) => {
    let {token,community_id}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    let play=async()=>{
        try {
            let res25=await codeDetail.find({community_id})
            if(res25.length!=0 && data.userid==res25[0].userid){
    
    
    
            }else{
                res.status(404)
                res.send({
                    msg:"Invalid Token",
                    code:404
                })
            }
        }
     catch (error) {
        res.status(404)
        res.send({
            msg:"Error Exits.",
            code:404
        })
        console.log(error.message);
    }
        }
        play()
    })

module.exports=comment