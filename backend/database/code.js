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
html(decoded),
html_link:[],
css_link:[],
js_link:[],
combined_code
 */
let code = new mongoose.Schema({
  code_id:{
    type: String,
    required: true,
  },
  html:{
    type: String,
    required: true
  },
  html_link:{
    type: Array,
  },
  css_link:{
    type: Array,
  },
  js_link:{
    type: Array,
  },
  combined_code:{
    type: String,
  },
 
});
/**
 * code_id,
html(decoded),
combined_code
 * 
 */
let codehtml = new mongoose.Schema({
    code_id:{
      type: String,
      required: true,
    },
    html:{
      type: String,
      required: true
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
let Codehtml = new mongoose.model("Codehtml",codehtml);
let Codecss = new mongoose.model("Codecss",codecss);
let Codejs = new mongoose.model("Codejs",codejs);
module.exports={Code,Codehtml,Codecss,Codejs}