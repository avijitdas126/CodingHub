const express=require('express')
const jwt=require('jsonwebtoken')
let uuid=require('uuid')
const bcrypt=require('bcryptjs')
require('dotenv').config()
const User=require('../../database/user')
const axios=require('axios')
const signup=express.Router()
/*
  req: {avatar_url, name,email,password,}
  res:{token}
*/

signup.post('/',(req,res)=>{
 let {avatar_url,client_id,name,email,password}=req.body;
if(!avatar_url){
    avatar_url=null
}

password=bcrypt.hashSync(password,Number(process.env.salt))
let userid=uuid.v4()
let payload={userid,client_id,password}
let token=jwt.sign(payload,process.env.secect_key)
let data={userid,name,client_id,email,token,password,avatar_url}
let play=await
const savedataIndb=async()=>{
    try {
        // let res = await axios.post('/user/get_all_users/'+client_id)
        // console.log(res);
        const dbdata=new User(data)
        const save=await dbdata.save();
        console.log(save);
        res.status(200)
        res.send({
            msg:"SignUp SuccessFully Done",
            token,
            code:200
        })
    } catch (error) {
        // let res = await axios.post('http://localhost:9000/user/get_all_users/'+client_id)
        // console.log(res);
        res.status(404)
        console.log(error.message);
        res.send({
            msg:"SomeThing Wrong",
            code:404
        }) 
    }
}
savedataIndb()
})

module.exports=signup;
