const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_offline)
  .then(() => {
    console.log("Connection Successfully With Code_details DB");
  })
  .catch((err) => {
    console.log(err);
  });

/* The `let code_detail = new mongoose.Schema({ ... });` block is defining a Mongoose schema named
`code_detail` for a collection in MongoDB. This schema specifies the structure of documents that
will be stored in the collection. Each field in the schema corresponds to a key-value pair in the
documents. */

let code_detail = new mongoose.Schema({
  userid:{
    type: String,
    required: true,
  },
  code_id:{
    type: String,
    required: true,
  },
  file_name:{
    type: String,
    required: true
  },
  created:{
    type: String,
  },
  updated:{
    type: String,
  },
  web_id:{
    type: String
  },
  public_url:{
    type: String
  },
  community_id:{
    type: String,
  }
});

let codeDetail = new mongoose.model("Code_detail",code_detail);
module.exports=codeDetail