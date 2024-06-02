/* The code snippet you provided is setting up a Node.js Express server with some necessary
dependencies. Here's what each line is doing: */

const express=require('express')

const mongoose=require('mongoose')

var cors = require('cors')

const app=express()

require('dotenv').config()

let router=require('./router.js')

/* Middleware */
app.use(cors())

app.use(express.json())

app.use('/user',router)

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

