const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const communitydb=require('../../database/community')
const favarite = express.Router();

/**
 * req:{token,code_id}
 * res:{code:200,msg:publish code in community}
 */

favarite.post("/", (req, res) => {
let {token,community_id}=req.body
let data=jwt.verify(token,process.env.secect_key);
const play=async()=>{
    try {
        let userid=data.userid
        let save=await communitydb.updateOne({community_id},{
            $push:{
                favarite:userid
            }
        })
console.log(save);
res.status(200)
res.send({
    msg:"Like added successfully",
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
module.exports = favarite;