const express = require("express");
const login = express.Router();
const db = require("../db/db");
const { authSchema } = require("../model/authSchema");

login.post("/", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  let validation = authSchema.validate({ username: name, password: password });
  if (validation.error) {
    res.json({ message: validation.error.details[0].message });
    return;
  }

  const query = "SELECT * FROM users WHERE username = ? and password = ?";

  db.query(query, [name, password], (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result.length > 0) {
      req.session.userId = result[0].user_id;
      res.cookie("userId", req.session.userId);

      res.send(result);
      req.session.save();
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = login;
