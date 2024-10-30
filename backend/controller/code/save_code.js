const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const { encode } = require('html-entities');
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { Code, Codecss, Codejs } = require("../../database/code");
const save_code = express.Router();
/**
 * req:{token,code_id,html,css,js}
 * res:{code:200,msg:created succesfully}
 * 
 */

save_code.post("/", (req, res) => {
    const {token,code_id,html,css,js}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    const play=async()=>{
        try {
      let res25=await codeDetail.find({code_id})
    //   console.log(res25,data);
      const encodedHtml = encode(html);
      if(res25.length!=0 && data.userid==res25[0].userid){
        let res21=await Codecss.find({code_id})      
        let res22=await Codejs.find({code_id}) 
        let res23=await Code.find({code_id}) 
        if(res21.length!=0){
            let dat5=await Codecss.updateOne({code_id},{
                $set:{
                    css
                }
            })

            console.log(dat5);
                  }
                  else{
                    let css1=new Codecss({
                        code_id,
                        css,
                      })
                      let save=await css1.save()
                  }
                  if(res22.length!=0){
                    let dat5=await Codejs.updateOne({code_id},{
                        $set:{
                            js
                        }
                    })
                    console.log(dat5);
                  }
                  else{
                    let js1=new Codejs({
                        code_id,
                        js,
                      })
                      let save1=await js1.save()
                  }
                  if(res23.length!=0){
                    
                    let dat5=await Code.updateOne({code_id},{
                        $set:{
                            html:encodedHtml
                        }
                    })
                    console.log(dat5);
                  }
                  else{
                    let html1=new Code({
                        code_id,
                        html:encodedHtml
                      })
                      let save2=await html1.save()
                  }
                  res.status(200)
                  res.send({
                    msg:"Code saved successfully",
                    code:200
                  })
      }
      else{
        res.status(404)
        res.send({
            msg:"Invalid Token",
            code:404
        })
      }
      
        } catch (error) {
            res.status(404)
            res.send({
                msg:"Error Exit",
                code:404
            })
            console.log(error.message);
        }
    }
        play()

    

});
module.exports = save_code;
