const express=require('express')
const app = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Assert } = require("../../database/code");
app.post('/uploads',(req,res)=>{
let {url,token,name,id}=req.body;

 let data = jwt.verify(token, process.env.secect_key);

 let play=async () => {
    try {
        let assert=new Assert({
            url,
            client_id:data.client_id,
            name,
            id
          })
          let save=await assert.save()
          // console.log(save)
          res.status(200);
          res.send({
       msg:"Uploaded Successfully",
       code:200
          })
    } catch (error) {
        res.status(404);
        res.send({
          msg: "Error Exit",
          code: 404,
        });
        console.log(error.message);
    }
}
 play()
})
app.post('/',(req,res)=>{
  let {token}=req.body;
 
  let data = jwt.verify(token, process.env.secect_key);

  let play=async () => {
  try {
    let result=await Assert.find({client_id:data.client_id})
    // console.log(result)
    res.status(200)
    res.send(
      result
    )
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Error Exit",
      code: 404,
    });
    console.log(error.message);
  }
}
 play()
})
app.post('/delete',(req,res)=>{
  let {token,id}=req.body;
  let data = jwt.verify(token, process.env.secect_key);
let play=async () => {
  try {
    let result=await Assert.deleteOne({client_id:data.client_id,id})
    // console.log(result)
    res.status(200)
   res.send({msg:"Deleted successfully",code:200})
  } catch (error) {
    res.status(404);
    res.send({
      msg: "Error Exit",
      code: 404,
    });
    console.log(error.message);
  }
}
play()
})
module.exports = app;