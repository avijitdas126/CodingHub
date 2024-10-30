const express=require('express')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const check_token=express.Router()
/**
 * req:{token}
 * res:{bool}
 */
check_token.post('/',(req,res)=>{
   let {token}=req.body;
   let play=async()=>{
try {
    let data= jwt.verify(token,process.env.secect_key)
    res.status(200)
    res.send({
        bool:data
    })
} catch (error) {
    res.status(404)
    res.send({
        bool:false
    })
}
   }
   play()
})
module.exports=check_token;