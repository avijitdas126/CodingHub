const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_offline)
  .then(() => {
    console.log("Connection Successfully With Comment DB");
  })
  .catch((err) => {
    console.log(err);
  });
/**
 * 
 * community_id,
 * comment_id,
 *sender_id:user_id,
  comment_data,
  mention_id:comment_id
 */
let comment = new mongoose.Schema({
    community_id:{
    type: String,
    required: true,
  },
  comment_id:{
    type: String,
    required: true
  },
  created:{
    type: String,
  },
  sender_id:{
    type:String ,
  },
  comment_data:{
    type:String,
  },
  mention_id:{
    type:String ,
  },
  avatar_url:{
    type:String ,
  },
  name:{
    type:String ,
  },
});
let Comment = new mongoose.model("Comment",comment);

module.exports=Comment