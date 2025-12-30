export default function TodoItem({
  todo,
  toggleCompleted,
  startEdit,
  deleteTodo,
  editingId,
  editText,
  setEditText,
  editDate,
  setEditDate,
  editTime,
  setEditTime,
  saveEdit,
}) {
  const today = new Date().toISOString().slice(0, 10);
  const isToday = todo.date === today;

  return (
    <li className="bg-gray-900 border border-gray-800 p-3 rounded-lg flex flex-col gap-2">
      {editingId === todo.id ? (
        /* EDIT MODE */
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="bg-gray-800 border border-gray-700 p-2 rounded flex-1 text-white"
            placeholder="Task title"
          />

          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />

          <input
            type="time"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
            className="bg-gray-800 border border-gray-700 p-2 rounded text-white"
          />

          <button
            onClick={() => saveEdit(todo.id)}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 rounded text-white active:scale-95 transition"
          >
            Save
          </button>
        </div>
      ) : (
        /* VIEW MODE */
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              className="w-5 h-5 accent-indigo-600"
            />

            <span
              className={`text-sm md:text-base ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "text-white"
              }`}
            >
              {todo.text}
            </span>

            {isToday && (
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-600 text-white">
                Today
              </span>
            )}
          </div>

          <div className="flex gap-3 items-center text-sm text-gray-400 flex-wrap">
            {todo.date && <span>{todo.date}</span>}
            {todo.time && <span>{todo.time}</span>}

            <button
              onClick={() => startEdit(todo)}
              className="hover:text-white transition"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
