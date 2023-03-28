import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todo, setTodo] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:4000/todos").then((res) => {
      setTodo(res.data);
    });
  }, []);
  const onSubmit = () => {
    axios
      .post("http://localhost:4000/register", {
        name: name,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Login = () => {
    axios
      .post("http://localhost:4000/login", {
        name: loginName,
        password: loginPassword,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTodo = () => {
    axios
      .post("http://localhost:4000/createtodo", {
        title: title,
        desc: desc,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const deleteTodo = (ID) => {
    axios
      .delete("http://localhost:4000/deletetodo", {
        data: {
          id: ID,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const toggleTodo = (id, completed) => {
    axios
      .put(`http://localhost:4000/todo/${id}`, { completed: !completed })
      .then((res) => {
        setTodo((prevTodo) => {
          const newTodo = [...prevTodo];
          const todoIndex = newTodo.findIndex((todo) => todo.list_id === id);
          newTodo[todoIndex].completed = !completed;
          return newTodo;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h2>Register</h2>
      <label>Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Password</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      <div>
        <h2>Login</h2>
        <label>Name</label>
        <input type="text" onChange={(e) => setLoginName(e.target.value)} />
        <br />
        <label>Password</label>
        <input type="text" onChange={(e) => setLoginPassword(e.target.value)} />
        <button onClick={Login}>Submit</button>
      </div>

      <div>
        <h1>Todo List Form</h1>

        <label htmlFor="title">Title:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />

        <br />

        <label htmlFor="desc">Description:</label>
        <input type="text" onChange={(e) => setDesc(e.target.value)} />
        <button onClick={createTodo}>Klart</button>
        <div>
          todos:
          {todo.map((mytodos) => {
            return (
              <p key={mytodos.list_id}>
                <input
                  type="checkbox"
                  checked={mytodos.completed}
                  onChange={() =>
                    toggleTodo(mytodos.list_id, mytodos.completed)
                  }
                />
                title: {mytodos.title} desc: {mytodos.description}
                <button onClick={() => deleteTodo(mytodos.list_id)}>
                  Delete
                </button>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
