const express = require("express");
const addTodo = express.Router();
const db = require("../db/db");
const { todoPost } = require("../model/todoPost");

addTodo.post("/", (req, res) => {
  const userId = req.session.userId;
  const title = req.body.title;
  const desc = req.body.desc;

  let validation = todoPost.validate(req.body);
  if (validation.error) {
    res.json({ message: validation.error.details[0].message });
    return;
  }

  const query = `INSERT INTO todolists (title, description, completed, user_id) 
  VALUES (?, ?, 0, ${userId});`;

  if (!userId) {
    return res.sendStatus(550);
  }
  db.query(query, [title, desc], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

module.exports = addTodo;
