const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const { decode,encode } = require('html-entities');
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { Code, Combine_code, Codecss, Codejs } = require("../../database/code");
const webid = express.Router();
/**
 * req:{token,code_id,webid}
 * res:{code:200.msg:public successfully,public_url}
 */
webid.post("/", (req, res) => {
    let {token,code_id,webid}=req.body
    let data=jwt.verify(token,process.env.secect_key);
let play=async()=>{
    try {
        let res25=await codeDetail.find({code_id})
    if(res25.length!=0 && data.userid==res25[0].userid){
webid=webid.split(' ').join('_')
// console.log(webid);

let web=await Combine_code.find({webid});
// console.log(web);
if(web.length==0){
    let res21=await Codecss.find({code_id})      
    let res22=await Codejs.find({code_id}) 
    let res23=await Code.find({code_id}) 
const encodedHtml=res23[0].html
let html=decode(encodedHtml)
let css=res21[0].css
let js=res22[0].js
let combined_code='<style>'+css+'</style>'+html+'<script>'+js+'</script>'
combined_code=encode(combined_code)
let combo=new Combine_code({
    code_id,
    webid,
    combined_code
})
let url='http://localhost:9000/user/live/public/'+webid
let save=await combo.save()
res.send({
    code:200,msg:"public successfully",
    public_url:url
})
}
else{
    res.status(404)
        res.send({
            msg:"This Webid is already exited. ",
            code:404
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
            msg:"Error Exit",
            code:404
        })
        console.log(error.message);
    }
}
play()
})

module.exports = webid;