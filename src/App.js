import "./styles.css";

// TodoApp.jsx
import React, { useState } from "react";
import useTodoStore from "./useTodoStore";

const TodoApp = () => {
  const [inputText, setInputText] = useState("");

  // Selective subscriptions for optimal performance
  const addTodo = useTodoStore((state) => state.addTodo);
  const todos = useTodoStore((state) => state.getFilteredTodos());
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

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

      {/* Filter buttons */}
      <div className="filters">
        {["all", "active", "completed"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={filter === filterType ? "active" : ""}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <TodoList />
    </div>
  );
};

// TodoList.jsx
const TodoList = () => {
  // Only re-renders when filtered todos change
  const todos = useTodoStore((state) => state.getFilteredTodos());

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

// TodoItem.jsx
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
