const express=require('express')
const mongoose=require('mongoose')
var cors = require('cors')
const app=express()
require('dotenv').config()
app.use(cors())



app.listen(process.env.port,()=>{
    console.log('Running at server port '+process.env.port);
})