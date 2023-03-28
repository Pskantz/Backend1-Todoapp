const express = require("express");
const register = express.Router();
const db = require("../db/db");
const { authSchema } = require("../model/authSchema");

register.post("/", (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  let validation = authSchema.validate(req.body);
  if (validation.error) {
    res.json({ message: validation.error.details[0].message });
    return;
  }

  const query = "INSERT INTO users (username, password) VALUES (?, ?);";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("succes");
    }
  });
});

module.exports = register;
