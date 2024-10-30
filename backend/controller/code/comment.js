const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { encode } = require("html-entities");
const codeDetail = require("../../database/code_details");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const User=require('../../database/user')
const communitydb = require("../../database/community");
const commentdb = require("../../database/comment");
const comment = express.Router();

// post a comment
/**
 * {token,code_id,comment,mention_id}
 * {msg:"Comment added successfully",code:200}
 */

comment.post("/post", (req, res) => {
  let { token, community_id, comment, mention_id='' } = req.body;
  let data = jwt.verify(token, process.env.secect_key);
  let play = async () => {
    try {
      let res25 = await codeDetail.find({ community_id });
      let date = moment().format("lll");
      let comment_id = uuidv4();
      let userinfo=await User.find({userid:data.userid})
      if (mention_id.length == 0) {
        let comments = new commentdb({
          community_id,
          comment_id,
          created: date,
          avatar_url:userinfo[0].avatar_url,
          name:userinfo[0].name,
          sender_id: data.userid,
          comment_data: comment,
          mention_id: null,
        });
        let no = await communitydb.updateOne(
          { community_id },
          {
            $push: {
              no_of_comment: comment_id,
            },
          }
        );
        let save = await comments.save();
        console.log(save);
      } else {
        let comments = new commentdb({
          community_id,
          comment_id,
          created: date,
          sender_id: data.userid,
          comment_data: comment,
          mention_id,
        });
        let save = await comments.save();
        console.log(save);
      }
      res.status(200);
      res.send({
        msg: "Comment added successfully",
        code: 200,
      });
    } catch (error) {
      res.status(404);
      res.send({
        msg: "Error Exits.",
        code: 404,
      });
      console.log(error.message);
    }
  };
  play();
});

// get list of all comments
/**
 * {token,community_id}
 * {[]}
 */

comment.post("/", (req, res) => {
  let { token, community_id } = req.body;
  let data = jwt.verify(token, process.env.secect_key);
  let play = async () => {
    try {
      let res25 = await commentdb.find({ community_id });
      res.send(res25);
    } catch (error) {
      res.status(404);
      res.send({
        msg: "Error Exits.",
        code: 404,
      });
      console.log(error.message);
    }
  };
  play();
});
module.exports = comment;
