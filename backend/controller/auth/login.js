const express=require('express')
const jwt=require('jsonwebtoken')
let uuid=require('uuid')
const bcrypt=require('bcryptjs')
require('dotenv').config()
const User=require('../../database/user')
const login=express.Router()

/**
 * req:{client-id,token,password}
 * if(token==null)=>password=>token
 * 
 */


login.post('/',(req,res)=>{
let {client_id,token,password}=req.body
let play= async()=>{
    try {
        console.log(password);
        if(token.length!=0){
            let data=jwt.verify(token,process.env.secect_key)
            let userid=data.userid;
            let result=await User.find({userid})
            let password1=bcrypt.compareSync(password,result[0].password);
          //console.log(password,result);
          if(password1){
            res.send(token)
          }
          else{
            res.code(404)
            res.send({
                msg:"Invaild Password",
                code:404
            })
          }
          }
          else{
            let result=await User.find({client_id})
            if(result.length!=0){
                let password1=bcrypt.compareSync(password,result[0].password);
                if(password1){
                    res.send({token:result[0].token})
                  }
                  else{
                    res.code(404)
                    res.send({
                        msg:"Invaild Password",
                        code:404
                    })
                  }
            }
            else{
                res.status(404)
                res.send({
                    msg:"Invaild Credentials",
                    code:404
                })
            }
          }
    } catch (error) {
        let result=await User.find({client_id})
            if(result.length!=0){
                let userid=result[0].userid;
                let password1=bcrypt.compareSync(password,result[0].password);
                if(password1){
                let payload={userid,client_id}
                token=jwt.sign(payload,process.env.secect_key,{expiresIn:"90 days"})
                let res2=await User.updateOne({client_id},{
                    $set:{
                        token
                    }
                })
                //console.log(res2);
                    res.send({token,msg:"Updated Successfully"})
                  }
                  else{
                    res.code(404)
                    res.send({
                        msg:"Invaild Password",
                        code:404
                    })
                  }
            }
            else{
                res.status(404)
                res.send({
                    msg:"Invaild Credentials",
                    code:404
                })
            }
    }
   
}
play()
})
module.exports=login;