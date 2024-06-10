const express = require("express");
require("dotenv").config();
const jwt=require('jsonwebtoken')
const codeDetail=require('../../database/code_details')
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { decode } = require('html-entities');
const {Code,Codehtml,Codecss,Codejs}=require('../../database/code')
const communitydb=require('../../database/community');
const community = express.Router();

/**
 * req:{token,code_id}
 * res:{code:200,msg:publish code in community}
 */

community.post("/post", (req, res) => {
let {title,description,token,code_id,tags}=req.body
let data=jwt.verify(token,process.env.secect_key);
let play=async()=>{
    try {
        let res25=await codeDetail.find({code_id})
        let userid=data.userid
        let date=moment().format('lll'); 
        if(res25.length!=0 && data.userid==res25[0].userid){
      let community_id=uuidv4()
      let saving=await codeDetail.updateOne({code_id},{
        $set:{
            community_id
        }
      })
let comm_data=new communitydb({
    userid,
    title,
    description,
    community_id,
    created:date,
    code_id,
    tags
})
let save=await comm_data.save()
res.send({
    msg:"Publish this file in community",
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
})

// popular--->

community.post("/popular", (req, res) => {
    let {token}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    let play=async()=>{
        try {
let userid=data.userid            
let array=[]
let res22=await communitydb.find({})
res22.map((elem)=>{
let result=0;
let no_of_comment=(elem.no_of_comment).length
let favarite=(elem.favarite).length
result=no_of_comment*150+favarite*90
if(result>200){
    array.push(elem)
}
})
res.send(array)
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
    })

    //recent--->
    
    community.post("/recent", (req, res) => {
        let {token}=req.body
        let data=jwt.verify(token,process.env.secect_key);
        let play=async()=>{
            try {           
    let array=[]
    let res22=await communitydb.find({})
    res22.map((elem)=>{
const format = 'MMM D, YYYY h:mm A';
const time = moment(elem.created, format);
const beforeTime = moment();
const afterTime = beforeTime.clone().subtract(30, 'days');
if(time.isBetween(afterTime,beforeTime)){
array.push(elem)
}
    })
    res.send(array)
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
})

// all community --->

community.post("/all", (req, res) => {
    let {token}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    let play=async()=>{
try {
    let res22=await communitydb.find({})
res.send(res22)
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
})

//edit --->

community.post("/edit", (req, res) => {
    let {title,description,token,code_id,tags}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    let play=async()=>{
        try {
            let res25=await codeDetail.find({code_id})
            let userid=data.userid
            if(res25.length!=0 && data.userid==res25[0].userid){
                let comm_data=await communitydb.updateOne({},{
                    $set:{
                        title,
                        description,
                        tags
                    }
                  
                })
                res.send({
                    msg:"Updated Successfully",
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
})

community.post('/showcode',(req,res)=>{
    let {token,community_id}=req.body
    let data=jwt.verify(token,process.env.secect_key);
    let play=async()=>{
        try {
            let res25=await communitydb.find({community_id})
            let code_id=res25[0].code_id
            let res21=await Codecss.find({code_id})      
            let res22=await Codejs.find({code_id}) 
            let res23=await Code.find({code_id})
if(data.userid!=res25[0].userid){
    let views=await communitydb.updateOne({userid},{
        $push:{
            views:data.userid
        }
    })
}
if(res23.length!=0){
    const encodedHtml=res23[0].html
    let data={
    html:decode(encodedHtml),
    css:res21[0].css,
    js:res22[0].js,
    community_details:res25
    }
    res.send(data)
            }
            else{
                res.send({
                    html:"",
                    css:"",
                    js:"",
                    community_details:res25
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
})


module.exports = community;