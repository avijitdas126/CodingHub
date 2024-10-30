const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_offline)
  .then(() => {
    console.log("Connection Successfully With Community DB");
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * community_id: uuid(12),
favarite,
code_id:code_id
no_of_comments:
 * 
 */
  let community = new mongoose.Schema({
    userid:{
      type: String,
      required: true,
    },
    code_id: {
      type: String,
      required: true,
    },
    title:{
      type: String,
      required: true,
    },
    description:{
      type: String,
    },
    created:{
      type: String,
    },
    no_of_comment: {
      type: Array,
    },
    favarite: {
      type: Array,
    },
    community_id: {
      type: String,
      required: true,
    },
    tags:{
      type: Array,
    },
    views:{
      type: Array, 
    }
  });
  
  let codeDetail = new mongoose.model("Community", community);
  module.exports = codeDetail;