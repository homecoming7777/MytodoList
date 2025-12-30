import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
export default function Tasks() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  

  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false,
        date: date || todayStr,
      },
    ]);
    setInput("");
    setDate("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDate(todo.date);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? { ...t, text: editText, date: editDate || todayStr }
          : t
      )
    );
    setEditingId(null);
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTodos = todos.filter((t) => {
    if (selectedDate) return t.date === selectedDate;
    if (filter === "all") return true;
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    if (filter === "today") return t.date === todayStr;
  });

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  return (
   <>

    <Navbar />
    <div className="min-h-screen bg-black text-white p-6 max-w-md mx-auto"> 
      <h1 className="text-3xl font-semibold text-center mb-6">Todo List</h1>

      {/* Input */}
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Task description"
          className="flex-1 bg-gray-900 border border-gray-700 p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-900 border border-gray-700 p-2 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-white text-black px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {["all", "active", "completed", "today"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-gray-700" : "bg-gray-800"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="mt-6 space-y-3">
        {filteredTodos.map((t) => (
           <li
           key={t.id}
           className="bg-gray-900 p-3 rounded flex flex-col md:flex-row justify-between items-start md:items-center"
           >
            {editingId === t.id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full items-start md:items-center">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-gray-800 border border-gray-700 p-1 rounded flex-1"
                />
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="bg-gray-800 border border-gray-700 p-1 rounded"
                />
                <button
                  onClick={() => saveEdit(t.id)}
                  className="bg-white text-black px-3 rounded"
                  >
                  Save
                </button>
              </div>
            ) : (
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleCompleted(t.id)}
                    className="w-5 h-5"
                    />
                  <span
                    className={`${t.completed ? "line-through text-gray-500" : ""}`}
                    >
                    {t.text}
                  </span>
                </div>

                <div className="flex gap-2 items-center mt-2 md:mt-0 flex-wrap">
                  <span className="text-gray-400 text-sm">{t.date}</span>
                  <button onClick={() => startEdit(t)}>Edit</button>
                  <button onClick={() => deleteTodo(t.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Simple Calendar */}
      <div className="mt-8 flex flex-wrap gap-1 justify-center">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
          const dateStr = `${new Date().getFullYear()}-${String(
             new Date().getMonth() + 1
            ).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const hasTask = todos.some((t) => t.date === dateStr);
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(dateStr)}
              className={`w-10 h-10 rounded ${
                selectedDate === dateStr
                  ? "bg-purple-600"
                  : hasTask
                  ? "border-2 border-purple-500"
                  : "bg-gray-800"
              }`}
            >
              {d}
            </button>
          );
         })}
      </div>

      {selectedDate && (
        <button
          onClick={() => setSelectedDate(null)}
          className="mt-4 px-4 py-2 bg-gray-700 rounded"
        >
          Clear Date Filter
        </button>
      )}
    </div>
         </>
  );
}
