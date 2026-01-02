import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoItem from "../components/TodoItem";
import Dashboard from "./Dashboard";
import { 
  BarChart3, Calendar, CheckCircle2, Clock, 
  TrendingUp, AlertCircle, ListTodo, Target,
  BarChart as BarChartIcon, PieChart as PieChartIcon,
  Grid3x3, List
} from "lucide-react";

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
  const [showDashboard, setShowDashboard] = useState(false);

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

  const clearAllCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const clearAllTodos = () => {
    if (window.confirm("Are you sure you want to delete all tasks? This cannot be undone.")) {
      setTodos([]);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* View Toggle Button */}
      <button
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed top-24 right-4 z-40 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-900/30 transition-all duration-200 flex items-center gap-2 group shadow-lg shadow-red-900/20"
      >
        {showDashboard ? (
          <>
            <List className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Show Tasks</span>
          </>
        ) : (
          <>
            <BarChart3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Show Dashboard</span>
          </>
        )}
      </button>

      {showDashboard ? (
        <Dashboard todos={todos} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Task Manager
              </h1>
              <p className="text-gray-400">Organize your day with precision</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-2 flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Total: <span className="font-bold text-white">{todos.length}</span></span>
                </div>
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Done: <span className="font-bold text-white">{todos.filter(t => t.completed).length}</span></span>
                </div>
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Pending: <span className="font-bold text-white">{todos.filter(t => !t.completed).length}</span></span>
                </div>
              </div>
            </header>

            {/* Task Input Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8 shadow-2xl shadow-red-900/10">
              <h2 className="text-xl font-semibold mb-6 text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Add New Task
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 block flex items-center gap-1">
                    <span>Task Description</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 block">Due Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    min={todayStr}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 block">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 block">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="Low" className="bg-gray-800">Low Priority</option>
                    <option value="Medium" className="bg-gray-800">Medium Priority</option>
                    <option value="High" className="bg-gray-800">High Priority</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 block">Tags</label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="work, personal, urgent..."
                    className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 block">Notes</label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional details..."
                    className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              
              <button
                onClick={addTodo}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold text-lg shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group"
              >
                <span>Add Task</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Filter and Actions Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                {["all", "active", "completed", "today"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                      filter === f
                        ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-900/30"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700"
                    }`}
                  >
                    <span className="capitalize">{f}</span>
                    {f === "today" && (
                      <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                        {todos.filter(t => t.date === todayStr).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearAllCompleted}
                  disabled={!todos.some(t => t.completed)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    todos.some(t => t.completed)
                      ? "bg-gray-800/50 text-gray-300 hover:bg-red-900/30 hover:text-red-400 border border-gray-700"
                      : "bg-gray-800/20 text-gray-500 cursor-not-allowed border border-gray-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Clear Completed
                </button>
                
                <button
                  onClick={clearAllTodos}
                  disabled={todos.length === 0}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    todos.length > 0
                      ? "bg-gray-800/50 text-gray-300 hover:bg-red-900/30 hover:text-red-400 border border-gray-700"
                      : "bg-gray-800/20 text-gray-500 cursor-not-allowed border border-gray-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-4 mb-10">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks found</h3>
                  <p className="text-gray-500">
                    {selectedDate 
                      ? `No tasks scheduled for ${selectedDate}` 
                      : filter !== "all" 
                        ? `No ${filter} tasks` 
                      : "Add your first task above"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
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
                </div>
              )}
            </div>

            {/* Calendar Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Monthly Calendar
                </h2>
                <span className="text-sm text-gray-400">
                  {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                  const dateStr = `${new Date().getFullYear()}-${String(
                    new Date().getMonth() + 1
                  ).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                  const hasTask = todos.some((t) => t.date === dateStr);
                  const isToday = dateStr === todayStr;
                  
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`aspect-square rounded-xl font-medium transition-all duration-200 flex flex-col items-center justify-center relative group ${
                        selectedDate === dateStr
                          ? "bg-gradient-to-br from-red-600 to-pink-600 text-white shadow-lg shadow-red-900/30"
                          : hasTask
                          ? "bg-gray-800/70 border-2 border-red-500/50 text-white hover:border-red-400 hover:bg-gray-700/70"
                          : "bg-gray-800/30 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700/50"
                      } ${isToday && selectedDate !== dateStr ? 'border-2 border-yellow-500/50' : ''}`}
                    >
                      <span className={`text-sm ${isToday && selectedDate !== dateStr ? 'font-bold text-yellow-400' : ''}`}>
                        {d}
                      </span>
                      {hasTask && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                      {isToday && (
                        <div className="absolute -bottom-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="mt-6 pt-6 border-t border-gray-700/50 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">
                      Showing tasks for <span className="text-white font-medium">{selectedDate}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {todos.filter(t => t.date === selectedDate).length} task(s) scheduled
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="px-5 py-2.5 bg-gray-700/50 hover:bg-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 border border-gray-600 hover:border-gray-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Stats Footer */}
            <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Active: {todos.filter(t => !t.completed).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span>Completed: {todos.filter(t => t.completed).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Today: {todos.filter(t => t.date === todayStr).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Total: {todos.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}