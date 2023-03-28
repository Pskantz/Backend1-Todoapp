const express = require("express");

const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const register = require("./Auth/register");
const login = require("./Auth/login");
const addTodo = require("./routes/todo");
const getTodo = require("./routes/getTodo");
const deleteTodo = require("./routes/deleteTodo");
const updateTodo = require("./routes/update");
app.use(
  session({
    key: "userId",
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,

    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 1000 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/todo", updateTodo);
app.use("/register", register);
app.use("/login", login);
app.use("/createtodo", addTodo);
app.use("/todos", getTodo);
app.use("/deletetodo", deleteTodo);
app.listen(4000, () => {
  console.log("server running on 4000");
});
