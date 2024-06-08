const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_offline)
  .then(() => {
    console.log("Connection Successfully With User DB");
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
  sender_id:{
    type:String ,
  },
  comment_data:{
    type:String,
  },
  mention_id:{
    type:String ,
  },
});
let Comment = new mongoose.model("Comment",comment);

module.exports={Community,Comment}