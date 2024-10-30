const express = require("express");
const jwt = require("jsonwebtoken");
let uuid = require("uuid");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../../database/user");
const axios = require("axios");
const signup = express.Router();
/*
  req: {avatar_url, name,email,password,}
  res:{token}
*/

signup.post("/", (req, res) => {
  let { avatar_url, client_id, name, email, password } = req.body;
  
  let color = [
    "3DC2EC",
    "402E7A",
    "4C3BCF",
    "4B70F5",
    "1A2130",
    "0C1844",
    "C80036",
    "26355D",
    "071952",
    "AF47D2",
    "088395",
    "402E7A",
    "222831",
    "393E46",
    "00ADB5",
  ];
  if(!avatar_url||avatar_url.includes('https://')){
    let first_letter_of_name=name.charAt(0,1).toUpperCase()
    let random=Math.floor(Math.random()*(color.length))
      avatar_url='https://dummyjson.com/image/400x400/'+color[random]+'/ffffff?text='+first_letter_of_name+'&fontSize=250'
  }
  password = bcrypt.hashSync(password, Number(process.env.salt));
  let userid = uuid.v4();
  let payload = { userid, client_id };
  let token = jwt.sign(payload, process.env.secect_key, {
    expiresIn: "90 days",
  });
  const savedataIndb = async () => {
    try {
      let data1 = await User.find({ client_id });
      if (data1.length == 0) {
        let data = {
          userid,
          name,
          client_id,
          email,
          token,
          password,
          avatar_url,
        };
        const dbdata = new User(data);
        const save = await dbdata.save();
        res.status(200);
        res.send({
          msg: "SignUp SuccessFully Done",
          token,
          code: 200,
        });
      } else {
        res.status(404);
        res.send({
          msg: "User Already Exits",
          code: 404,
        });
      }
    } catch (error) {
      res.status(404);
      console.log(error.message);
      res.send({
        msg: "SomeThing Wrong",
        code: 404,
      });
    }
  };
  savedataIndb();
});

module.exports = signup;
