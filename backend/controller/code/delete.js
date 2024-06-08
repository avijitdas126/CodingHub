const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { decode } = require("html-entities");
const codeDetail = require("../../database/code_details");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { Code, Combine_code, Codecss, Codejs } = require("../../database/code");
const delete_1 = express.Router();
/**
 * req:{token,code_id,webid_bool}
 * res:{code:200,msg:deleted code successfully}
 */
delete_1.post("/", (req, res) => {
  let { token, code_id, webid_bool } = req.body;
  let data = jwt.verify(token, process.env.secect_key);
  let play = async () => {
    try {
      let res25 = await codeDetail.find({ code_id });
      if (res25.length != 0 && data.userid == res25[0].userid) {
        let res21 = await Codecss.deleteOne({ code_id });
        let res22 = await Codejs.deleteOne({ code_id });
        let res23 = await Code.deleteOne({ code_id });
        if (webid_bool) {
          let res26=await codeDetail.deleteOne({ code_id });
          let res24 = await Combine_code.deleteOne({ code_id });
        }
        res.send({
          code: 200,
          msg: "deleted code successfully",
        });
      } else {
        res.status(404);
        res.send({
          msg: "Invalid Token",
          code: 404,
        });
      }
    } catch (error) {
      res.status(404);
      res.send({
        msg: "Error Exit",
        code: 404,
      });
      console.log(error.message);
    }
  };
  play();
});
module.exports = delete_1;
