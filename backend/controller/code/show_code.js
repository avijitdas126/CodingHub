const express=require('express')
require('dotenv').config()
const create_a_file=express.Router()
create_a_file.get('/',(req,res)=>{
    res.send('Done1')
})
module.exports=create_a_file