const joi = require("joi");

const todoPost = joi.object({
  title: joi.string().min(3).max(30).required(),
  desc: joi.string().min(6).max(30).required(),
  //completed: joi.boolean().required(),
});

exports.todoPost = todoPost;
