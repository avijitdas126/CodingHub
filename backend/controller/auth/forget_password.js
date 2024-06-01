const express=require('express')
const check_token=express.Router()

check_token.get('/',(req,res)=>{
    res.send('Done')
})
module.exports=check_token;