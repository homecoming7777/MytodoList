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

  return (
    <li className="bg-gray-900 p-3 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
      {editingId === todo.id ? (
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
          <input
            type="time"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
            className="bg-gray-800 border border-gray-700 p-1 rounded"
          />
          <button
            onClick={() => saveEdit(todo.id)}
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
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              className="w-5 h-5"
            />
            <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.text}
            </span>
          </div>

          <div className="flex gap-2 items-center mt-2 md:mt-0 flex-wrap">
            {todo.date && <span className="text-gray-400 text-sm">{todo.date}</span>}
            {todo.time && <span className="text-gray-400 text-sm">{todo.time}</span>}
            <button onClick={() => startEdit(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-400">
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
