const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_offline)
  .then(() => {
    console.log("Connection Successfully With User DB");
  })
  .catch((err) => {
    console.log(err);
  });

/* The code `let user = new mongoose.Schema({ ... });` is defining a Mongoose schema for a user in a
MongoDB database. */
let user = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,//editable
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,//editable
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  followers: {
    type: Array,
  },
  follows: {
    type: Array,
  },
  bio: {
    type: String,//editable
  },
  views:{
    type: Array,
  }
});
/* `let User = new mongoose.model("User", user);` is creating a Mongoose model named "User" based on
the schema defined in the variable `user`. This model will be used to interact with the "User"
collection in the MongoDB database. The model allows you to perform CRUD operations (Create, Read,
Update, Delete) on the "User" collection by providing an interface to interact with the database
documents that adhere to the defined schema. */
let User= new mongoose.model("User",user);
module.exports=User
