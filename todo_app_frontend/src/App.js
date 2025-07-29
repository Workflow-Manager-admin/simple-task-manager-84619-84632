import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main Todo App component. Handles todo CRUD, completion, and UI.
 */
function App() {
  // Single source of truth for todo items.
  const [todos, setTodos] = useState(() => {
    // Persist in localStorage for demo/local mode.
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputTitle, setInputTitle] = useState("");
  const [inputDetail, setInputDetail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDetail, setEditingDetail] = useState("");
  const inputRef = useRef(null);

  // Sync todos to localStorage (simulate "local API").
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // PUBLIC_INTERFACE
  const handleAdd = (e) => {
    e.preventDefault();
    if (inputTitle.trim() === "") return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: inputTitle,
        detail: inputDetail,
        completed: false,
      },
    ]);
    setInputTitle("");
    setInputDetail("");
    inputRef.current && inputRef.current.focus();
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // PUBLIC_INTERFACE
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // PUBLIC_INTERFACE
  const handleEditInit = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
    setEditingDetail(todo.detail);
  };

  // PUBLIC_INTERFACE
  const handleEditSave = (id) => {
    if (editingTitle.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: editingTitle, detail: editingDetail }
          : todo
      )
    );
    setEditingId(null);
    setEditingTitle("");
    setEditingDetail("");
  };

  // PUBLIC_INTERFACE
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingDetail("");
  };

  return (
    <div className="todo-root">
      <header className="todo-header">
        <span className="todo-logo" aria-label="task calendar icon">🗓️</span>
        <h1 className="todo-title">TODO APP</h1>
      </header>
      <main className="todo-main">
        <form className="todo-add-form" onSubmit={handleAdd}>
          <input
            ref={inputRef}
            className="todo-input"
            type="text"
            placeholder="Title"
            maxLength={60}
            value={inputTitle}
            onChange={e => setInputTitle(e.target.value)}
            aria-label="Todo Title"
            required
          />
          <input
            className="todo-input"
            type="text"
            placeholder="Detail (optional)"
            maxLength={120}
            value={inputDetail}
            onChange={e => setInputDetail(e.target.value)}
            aria-label="Todo Detail"
          />
          <button className="todo-add-btn" type="submit">Add</button>
        </form>
        <ul className="todo-list">
          {todos.length === 0 && (
            <li className="todo-empty">No todos yet. Add your first!</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? " completed" : ""}`}
            >
              {editingId === todo.id ? (
                <div className="todo-edit-form">
                  <input
                    className="todo-input"
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                    aria-label="Edit Title"
                    maxLength={60}
                  />
                  <input
                    className="todo-input"
                    value={editingDetail}
                    onChange={e => setEditingDetail(e.target.value)}
                    placeholder="Detail (optional)"
                    maxLength={120}
                    aria-label="Edit Detail"
                  />
                  <div className="todo-actions-group">
                    <button className="todo-btn accent" onClick={() => handleEditSave(todo.id)} title="Save edit">💾</button>
                    <button className="todo-btn secondary" onClick={handleEditCancel} title="Cancel edit">✖️</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-item-info" onClick={() => handleToggle(todo.id)} tabIndex={0} role="checkbox" aria-checked={todo.completed}>
                    <span className={`todo-check ${todo.completed ? "checked" : ""}`} title="Toggle complete">
                      {todo.completed ? "✔️" : "⬜"}
                    </span>
                    <span className="todo-item-title">{todo.title}</span>
                  </div>
                  <div className="todo-item-detail">{todo.detail}</div>
                  <div className="todo-actions">
                    <button className="todo-btn accent" onClick={() => handleEditInit(todo)} title="Edit">
                      ✏️
                    </button>
                    <button className="todo-btn danger" onClick={() => handleDelete(todo.id)} title="Delete">
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
