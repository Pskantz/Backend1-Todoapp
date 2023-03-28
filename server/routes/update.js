const express = require("express");
const updateTodo = express.Router();
const db = require("../db/db");
const validateTodo = require("./validateTodo");

updateTodo.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  // Validate the completed field
  try {
    validateTodo({ completed });
  } catch (error) {
    return res.status(400).send(error.message);
  }

  const query = "UPDATE todolists SET completed=? WHERE list_id=?";

  if (!req.session.userId) {
    return res.sendStatus(404);
  }

  db.query(query, [completed, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = updateTodo;
