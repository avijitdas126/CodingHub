const express=require('express')
const jwt=require('jsonwebtoken')
let uuid=require('uuid')
const bcrypt=require('bcryptjs')
require('dotenv').config()
const User=require('../../database/user')
const forgetPassword=express.Router()

/**
 * req:{name,client_id,new_password}
 * res:{token}
 */

forgetPassword.post('/',(req,res)=>{
    let {client_id,new_password}=req.body
    let play=async()=>{
        try {
    let dat=await User.find({client_id})
    if(dat.length!=0){
        let password=bcrypt.hashSync(new_password,Number(process.env.salt))
        let result=await User.updateOne({client_id},{
            $set:{
                password
            }
        })
        let token=dat[0].token
        console.log(result);
        res.status(200)
        res.send({
            token,
            msg:"Password Updated Successfully!",
            code:200
        })
     }
     else{
        res.status(404)
        res.send({
            msg:"Invaild Credentials",
            code:404
        })  
     }
        } catch (error) {
            res.status(404)
            console.log(error.message);
            res.send({
                msg:"Invaild Credentials",
                code:404
            })  
        }
    }
    play()

})
module.exports=forgetPassword;