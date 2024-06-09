const express=require('express')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const create_a_file=express.Router()
//-------------------------------------------------------
/**                                                      |
 * req:{token,newfile_name}                              |
 * res:{code:200,msg:sucess}                             |
 */                        //                            |
//--------------------------------------------------------
create_a_file.post('/',(req,res)=>{
    let {token,file_name}=req.body
    let fle={file_name:file_name+'.html'}
    let play=async()=>{
        try {
            let result=await codeDetail.find(fle)
             console.log(result);
            if(result.length==0){
                let code_id=uuidv4();
                let data=jwt.verify(token,process.env.secect_key);
                let userid=data.userid;
                let date=moment().format('lll'); 
                let payload={
                    userid,code_id,file_name:file_name+".html",created:date
                }
                console.log(payload);
                let resq= new codeDetail(payload)
                let save=await resq.save()
                res.send({
                    code_id,
                    msg:"File created successfully",
                    code:200
                })
            }
            else{
                console.log('error');
                res.status(404)
                res.send({
                    msg:"Error occured! File already exits.",
                    code:404
                })
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }
    play()
})
module.exports=create_a_file