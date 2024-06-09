const express=require('express')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const { decode } = require('html-entities');
const codeDetail=require('../../database/code_details')
const { Code, Codehtml, Codecss, Codejs } = require("../../database/code");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const see_code=express.Router()

/**
 * req:{token,code_id}
 * res:{html,css,js}
 */
see_code.post('/',(req,res)=>{
    let {token,code_id}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    let play=async()=>{
try {
    let res25=await codeDetail.find({code_id})
    if(res25.length!=0 && data.userid==res25[0].userid){
        let res21=await Codecss.find({code_id})      
        let res22=await Codejs.find({code_id}) 
        let res23=await Code.find({code_id})
        if(res23.length!=0){
const encodedHtml=res23[0].html
let data={
html:decode(encodedHtml),
css:res21[0].css,
js:res22[0].js
}
res.send(data)
        }
        else{
            res.send({
                html:"",
                css:"",
                js:""
                })
        }
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
        msg:"Error Exits.",
        code:404
    })
    console.log(error.message);
}
    }
    play()
})
module.exports=see_code