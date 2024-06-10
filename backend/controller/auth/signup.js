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
let payload={userid,client_id}
let token=jwt.sign(payload,process.env.secect_key,{expiresIn:'90 days'})
const savedataIndb=async()=>{
    try {
      let data1=await User.find({client_id})
      if(data1.length==0){
        let data={userid,name,client_id,email,token,password,avatar_url}
        const dbdata=new User(data)
        const save=await dbdata.save();
        res.status(200)
        res.send({
            msg:"SignUp SuccessFully Done",
            token,
            userid,
            code:200
        })
      }
      else{
        res.status(404)
        res.send({
            msg:"User Already Exits",
            code:404
        })
      }
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
