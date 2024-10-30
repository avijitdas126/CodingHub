const express=require('express')
require('dotenv').config()
const User=require('../../database/user')
const get_user=express.Router()
get_user.get('/get_all_users/:client_id',(req,res)=>{
let client_id=req.params.client_id;
let play=async()=>{
    try {
        let data=await User.find({client_id})
        res.status(200)
        res.send(data)
    } catch (error) {
        res.status(404)
        console.log(error.message);
        res.send({
            msg:"SomeThing Wrong",
            code:404
        }) 
    }
}
play()
})
module.exports=get_user