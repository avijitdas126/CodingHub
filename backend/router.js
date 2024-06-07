/* The code snippet you provided is setting up a Node.js Express server with some necessary
dependencies. Here's what each line is doing: */
const express=require('express')
const app=express()
require('dotenv').config()

const check_token=require('./controller/auth/check_token')
const login=require('./controller/auth/login')
const signup=require('./controller/auth/signup')
const get_user=require('./controller/auth/getUser')
const forget_password=require('./controller/auth/forget_password')
const get_all_users=require('./controller/auth/get_all_users')

const see_code=require('./controller/code/show_code')
const save_code=require('./controller/code/save_code')
const get_code=require('./controller/code/get_code')
const webid=require('./controller/code/webid')
const public=require('./controller/code/public')
const create_a_file=require('./controller/code/create_a_file')
/*---Express Router---*/
app.use('/signup/get',get_all_users)
app.use('/get_user',get_user)
app.use('/signup',signup)
app.use('/login',login)
app.use('/check_token',check_token)
app.use('/forget_password',forget_password)
app.use('/code/new/project',create_a_file)
app.use('/get',get_code)
app.use('/code/savecode',save_code)
app.use('/code/showcode',see_code)
app.use('/live/public',webid)
app.use('/code',public)
module.exports=app