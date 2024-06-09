const express=require('express')
require('dotenv').config()
const {Code,Codehtml,Codecss,Codejs}=require('../../database/code')
const get_code=express.Router()
get_code.get('/css/:id/:no',(req,res)=>{
    let id=req.params.id;
    let no=req.params.no
    // console.log(id,no);
    const play=async()=>{
     try {
         let codehtml=await Codecss.find({code_id:id})
         let rawhtml=0;
         if(codehtml.length!=0){
             if(no<=3 && no!=0){
                 rawhtml=codehtml[no-1].css
                //  console.log(rawhtml);
                 res.send(rawhtml)
             
             }
             else{
                 res.status(404)
                 res.send({
                     msg:"Invalid id or no",
                     code:404
                 })
             }
 
         }
         else{
             res.status(404)
             res.send({
                 msg:"Invalid id or no",
                 code:404
             })
         }
 
 // let rawcss=codecss[no-1].css
     } catch (error) {
         res.status(404)
         res.send({
             msg:"Error Exits",
             code:404
         })
         console.log(error.message);
     }
    }
    play()
})
get_code.get('/js/:id/:no',(req,res)=>{
    let id=req.params.id;
    let no=req.params.no
    //console.log(id,no);
    const play=async()=>{
     try {
        //  let code=await Code.find({code_id:id})
         let codehtml=await Codejs.find({code_id:id})
         // let codecss=await Codecss.find({code_id:id})
         // let codejs=await Codejs.find({code_id:id})
         let rawhtml=0;
         if(codehtml.length!=0){
             if(no<=3 && no!=0){
                 rawhtml=codehtml[no-1].js
                 res.send(rawhtml)
             
             }
             else{
                 res.status(404)
                 res.send({
                     msg:"Invalid id or no",
                     code:404
                 })
             }
         }
         else{
             res.status(404)
             res.send({
                 msg:"Invalid id or no",
                 code:404
             })
         }
 
 // let rawcss=codecss[no-1].css
     } catch (error) {
         res.status(404)
         res.send({
             msg:"Error Exits",
             code:404
         })
         console.log(error.message);
     }
    }
    play()
})
module.exports=get_code