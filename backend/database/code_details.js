const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_live)
  .then(() => {
    console.log("Connection Successfully With User DB");
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
    type: Number,
  },
  updated:{
    type: Number,
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
/* `let User= new mongoose.model("User",code_detail);` is creating a Mongoose model named "User" based
on the schema defined in the `code_detail` variable. This model will be used to interact with the
MongoDB collection named "users" and perform operations like creating, reading, updating, and
deleting documents in that collection. */
let codeDetail = new mongoose.model("User",code_detail);
module.exports=codeDetail