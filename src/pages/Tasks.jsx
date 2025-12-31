import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoItem from "../components/TodoItem";

export default function Tasks() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Low");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [editTags, setEditTags] = useState("");
  const [editNotes, setEditNotes] = useState("");

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
        time,
        priority,
        tags,
        notes,
      },
    ]);
    setInput("");
    setDate("");
    setTime("");
    setPriority("Low");
    setTags("");
    setNotes("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDate(todo.date);
    setEditTime(todo.time || "");
    setEditPriority(todo.priority || "Low");
    setEditTags(todo.tags || "");
    setEditNotes(todo.notes || "");
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              text: editText,
              date: editDate || todayStr,
              time: editTime,
              priority: editPriority,
              tags: editTags,
              notes: editNotes,
            }
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
      <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
        <div className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col md:grid md:grid-cols-3 lg:grid lg:grid-cols-1 gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Task description"
            className="w-full flex-1 bg-gray-800 border border-gray-700 p-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            onClick={addTodo}
            className="bg-red-600 w-full hover:bg-red-700 active:bg-red-800 transition px-4 py-2 rounded-lg font-semibold"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {["all", "active", "completed", "today"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full font-medium transition ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-4">
          {filteredTodos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              toggleCompleted={toggleCompleted}
              startEdit={startEdit}
              deleteTodo={deleteTodo}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              editDate={editDate}
              setEditDate={setEditDate}
              editTime={editTime}
              setEditTime={setEditTime}
              editPriority={editPriority}
              setEditPriority={setEditPriority}
              editTags={editTags}
              setEditTags={setEditTags}
              editNotes={editNotes}
              setEditNotes={setEditNotes}
              saveEdit={saveEdit}
            />
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
            const dateStr = `${new Date().getFullYear()}-${String(
              new Date().getMonth() + 1
            ).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const hasTask = todos.some((t) => t.date === dateStr);
            return (
              <button
                key={d}
                onClick={() => setSelectedDate(dateStr)}
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  selectedDate === dateStr
                    ? "bg-red-600 text-white"
                    : hasTask
                    ? "border-2 border-red-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
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
            className="mt-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            Clear Date Filter
          </button>
        )}
      </div>
    </>
  );
}
