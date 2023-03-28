const express = require("express");
const getTodo = express.Router();
const db = require("../db/db");

getTodo.get("/", (req, res) => {
  const query = "SELECT * from todolists";

  if (!req.session.userId) {
    return res.sendStatus(404);
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = getTodo;
