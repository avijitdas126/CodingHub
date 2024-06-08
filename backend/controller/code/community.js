const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const { encode } = require('html-entities');
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const communitydb=require('../../database/community')
const community = express.Router();

/**
 * req:{token,code_id}
 * res:{code:200,msg:publish code in community}
 */

community.post("/", (req, res) => {
let {token,code_id}=req.body
let data=jwt.verify(token,process.env.secect_key);
let play=async()=>{
    try {
        let res25=await codeDetail.find({code_id})
        // let res26=await communitydb.find({code_id})
        if(res25.length!=0 && data.userid==res25[0].userid){
      let community_id=uuidv4()
      let saving=await codeDetail.updateOne({code_id},{
        $set:{
            community_id
        }
      })
let comm_data=new communitydb({
    community_id,
    code_id
})
let save=await comm_data.save()
res.send({
    msg:"Publish this file in community",
    code:200
})
//process---end1
        }
        else{
            res.status(404)
            res.send({
                msg:"Invalid Token",
                code:404
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
play()

})

module.exports = community;