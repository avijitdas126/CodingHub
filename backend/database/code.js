const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_url_offline)
  .then(() => {
    console.log("Connection Successfully With Code DB");
  })
  .catch((err) => {
    console.log(err);
  });



/**
 * 
 * code_id,
html(encoded),
 */
let code = new mongoose.Schema({
  code_id:{
    type: String,
    required: true,
  },
  html:{
    type: String,
    required: true
  }
});
/**
 * code_id,
html(decoded),
combined_code
 * 
 */
let combined_code = new mongoose.Schema({
    code_id:{
      type: String,
      required: true,
    },
   webid:{
    type: String,
    required: true,
   },
    combined_code:{
      type: String,
    },
   
  });

  /**
   * code_id,
css(decoded)
   * 
   */
  let codecss = new mongoose.Schema({
    code_id:{
      type: String,
      required: true,
    },
    css:{
      type: String,
      required: true
    }
  });
  /**
   * code_id,
js(decoded),
   * 
   */
  let codejs = new mongoose.Schema({
    code_id:{
      type: String,
      required: true,
    },
    js:{
      type: String,
      required: true
    }
  });

let Code = new mongoose.model("Code",code);
let Combine_code = new mongoose.model("Combine_code",combined_code);
let Codecss = new mongoose.model("Codecss",codecss);
let Codejs = new mongoose.model("Codejs",codejs);
module.exports={Code,Combine_code,Codecss,Codejs}