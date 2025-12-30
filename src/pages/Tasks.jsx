import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoItem from "../components/TodoItem";

export default function Tasks() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  // For month navigation
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  // Browser notifications
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Save todos in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach((todo) => {
        if (!todo.completed && !todo.notified && todo.date && todo.time) {
          const todoDateTime = new Date(`${todo.date}T${todo.time}`);
          if (now >= todoDateTime && now - todoDateTime < 60000) {
            if (Notification.permission === "granted") {
              new Notification("Todo Reminder", { body: todo.text });
            }
            setTodos((prev) =>
              prev.map((t) =>
                t.id === todo.id ? { ...t, notified: true } : t
              )
            );
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
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
        time: time || "",
        notified: false,
      },
    ]);
    setInput("");
    setDate("");
    setTime("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggleCompleted = (id) =>
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDate(todo.date);
    setEditTime(todo.time || "");
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              text: editText,
              date: editDate || todayStr,
              time: editTime || "",
              notified: false,
            }
          : t
      )
    );
    setEditingId(null);
  };

  const filteredTodos = todos.filter((t) => {
    if (selectedDate) return t.date === selectedDate;
    switch (filter) {
      case "active":
        return !t.completed;
      case "completed":
        return t.completed;
      case "today":
        return t.date === todayStr;
      default:
        return true;
    }
  });

  // Calendar helpers
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const monthStart = new Date(calendarYear, calendarMonth, 1).getDay(); // 0-6, Sun-Sat

  const goPrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const goNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white p-6 max-w-md mx-auto">
        {/* Add task */}
        <div className="flex flex-col gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Task description"
            className="bg-gray-900 border border-gray-700 p-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-900 border border-gray-700 p-2 rounded flex-1"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-gray-900 border border-gray-700 p-2 rounded flex-1"
            />
          </div>
          <button
            onClick={addTodo}
            className="bg-white text-black py-2 rounded"
          >
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {["all", "active", "today", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setSelectedDate(null);
              }}
              className={`px-3 py-1 rounded ${
                filter === f ? "bg-gray-700" : "bg-gray-800"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo list */}
        <ul className="mt-6 space-y-3">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
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
              saveEdit={saveEdit}
            />
          ))}
        </ul>

        {/* Mini calendar */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <button onClick={goPrevMonth} className="px-3 py-1 bg-gray-700 rounded">
              Prev
            </button>
            <span>
              {new Date(calendarYear, calendarMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={goNextMonth} className="px-3 py-1 bg-gray-700 rounded">
              Next
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthStart }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
              const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(
                d
              ).padStart(2, "0")}`;
              const hasTask = todos.some((t) => t.date === dateStr);

              return (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setFilter("all");
                  }}
                  className={`w-10 h-10 rounded ${
                    selectedDate === dateStr
                      ? "bg-purple-600"
                      : hasTask
                      ? "border border-purple-500"
                      : "bg-gray-800"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <button
            onClick={() => setSelectedDate(null)}
            className="mt-4 w-full bg-gray-700 py-2 rounded"
          >
            Clear Date Filter
          </button>
        )}
      </div>
    </>
  );
}
