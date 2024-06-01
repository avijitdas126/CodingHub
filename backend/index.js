/* The code snippet you provided is setting up a Node.js Express server with some necessary
dependencies. Here's what each line is doing: */
const express=require('express')
const mongoose=require('mongoose')
var cors = require('cors')
const app=express()
require('dotenv').config()
const check_token=require('./controller/auth/check_token')
const login=require('./controller/auth/login')
const signup=require('./controller/auth/signup')
const get_user=require('./controller/auth/getUser')
const forget_password=require('./controller/auth/forget_password')
const get_all_users=require('./controller/auth/get_all_users')
/* Middleware */
app.use(cors())
app.use(express.json())

/*---Express Router---*/
app.use('/user/signup',get_all_users)
app.use('/user/get_user',get_user)
app.use('/user/signup',signup)
app.use('/user/login',login)
app.use('/user/check_token',check_token)
app.use('/user/forget_password',forget_password)


/* This code snippet is defining an error-handling middleware function in the Express application. When
an error occurs in the application, this middleware function will be called with four arguments:
`err`, `req`, `res`, and `next`. */

app.use((err,req,res,next)=>{
    if(err.message){
        res.status(500);
        res.send({
                msg:"Intial Error",
                code:500
            })
        console.log(err.message);
    }
    else{
        console.log(err);
        res.send({
            msg:"Intial Error",
            code:500
        })
    }
    }
)
app.listen(process.env.port,()=>{
    console.log('Running at server port '+process.env.port);
})

