const express = require("express");
const deleteTodo = express.Router();
const db = require("../db/db");
const { todoDelete } = require("../model/todoDelete");

deleteTodo.delete("/", (req, res) => {
  const userId = req.session.userId;
  const todolist = req.body.id;
  let validation = todoDelete.validate(req.body);
  if (validation.error) {
    res.json({ message: validation.error.details[0].message });
    return;
  }

  const query = "DELETE from todolists where list_id = ? and user_id = ?";

  db.query(query, [todolist, userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("deleted with id: ", userId, todolist);
    }
  });
});

module.exports = deleteTodo;
