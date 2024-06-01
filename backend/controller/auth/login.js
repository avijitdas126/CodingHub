const express=require('express')
const login=express.Router()
/**
 * req:{name,token,password}
 * if(token==null)=>password=>token
 * 
 */
login.get('/',(req,res)=>{
    
})
module.exports=login;