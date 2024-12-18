const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const { decode } = require('html-entities');
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { Code, Combine_code, Codecss, Codejs } = require("../../database/code");
const webid = express.Router();
express.static(__dirname)
webid.get("/:webid", (req, res) => {
let webid=req.params.webid;
let play=async()=>{
    try {
let data=await Combine_code.find({webid})
if(data.length!=0){
let value=data[0].combined_code;
value=decode(value)
res.status(200)
res.send(value)
        }
       else{
        res.status(404)
        res.sendFile(__dirname+'/404.html')
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