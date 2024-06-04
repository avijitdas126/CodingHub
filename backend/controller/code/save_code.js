const express=require('express')
require('dotenv').config()
const {Code,Codehtml,Codecss,Codejs}=require('../../database/code')
const create_a_file=express.Router()
create_a_file.get('/',(req,res)=>{
    res.send('Done1')
})
module.exports=create_a_file