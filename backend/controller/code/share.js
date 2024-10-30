const express = require("express");
const app = express.Router();
let uuid = require("uuid");
const { decode } = require("html-entities");
require("dotenv").config();
let code_detail=require('../../database/code_details')
const { Code, Codecss, Codejs, Share } = require("../../database/code");
app.post("/post", (req, res) => {
  let { code_id, file_name, profile } = req.body;
  let play = async () => {
    try {
      let data = await Share.find({ code_id });
      if (data.length == 0) {
        let id = uuid.v4();

        let share = new Share({
          id,
          code_id,
          file_name,
          profile,
        });

        let save = await share.save();
        console.log(save);
        res.status(200);
        res.send({ url: `${process.env.url_frontend}${id}` });
      } else {
        res.status(200);
        res.send({ url: `${process.env.url_frontend}${data[0].id}` });
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

app.post("/:id", (req, res) => {
  let id = req.params.id;
  let play = async () => {
    try {
      let code_id1 = await Share.find({ id });
      let code_id = code_id1[0].code_id;
      let html = await Code.find({ code_id });
      html = html[0].html;
      html = decode(html);
      let css = await Codecss.find({ code_id });
      css = css[0].css;
      let js = await Codejs.find({ code_id });
      js = js[0].js;
      let userid=await code_detail.find({code_id})
// console.log("code_id "+code_id)
      res.status(200);
      res.send({ html, css, js, file_name: code_id1[0].file_name,profile:code_id1[0].profile,details:userid });
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
app.post("/url", (req, res) => {
  let { code_id } = req.body;
  let play = async () => {
    try {
      let id = await Share.find({ code_id });
      res.status(200);
      res.send({ url: `${process.env.url_frontend}${id[0].id}` });
    } catch (error) {
      res.status(404);
      res.send({
        msg: "Please hit /share/post",
        code: 404,
      });
      console.log(error.message);
    }
  };
  play();
});
app.post("/delete", (req, res) => {
  let { code_id, id } = req.body;
  let play = async () => {
    try {
      let result = await Share.deleteOne({ code_id, id });
      res.status(200);
      res.send({ msg: "Deleted sucessfully", code: 200 });
    } catch (error) {
      res.status(404);
      res.send({
        msg: "Error Exit",
        code: 404,
      });
      console.log(error.message);
    }
    play();
  };
});
module.exports = app;
