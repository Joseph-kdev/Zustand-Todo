import "./styles.css";
import React, { useState } from "react";
import useTodoStore from "./useTodoStore";

const TodoApp = () => {
  const [inputText, setInputText] = useState("");

  // Selective subscriptions for optimal performance
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodo(inputText.trim());
      setInputText("");
    }
  };

  return (
    <div className="todo-app">
      <h1>My Todo App</h1>

      {/* Add todo form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      {/* Todo list */}
      <TodoList />
    </div>
  );
};

const TodoList = () => {
  // Only re-renders when filtered todos change
  const todos = useTodoStore((state) => state.todos);

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}
