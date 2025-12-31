import { useState, useRef, useEffect } from "react";

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
  editPriority,
  setEditPriority,
  editTags,
  setEditTags,
  editNotes,
  setEditNotes,
  saveEdit,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [todo.text, expanded]);

  return (
    <li className="bg-gray-900 overflow-x-auto p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      {editingId === todo.id ? (
        <div className="flex flex-col md:grid gap-2 w-full items-start md:items-center">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded flex-1 min-w-0"
            placeholder="Task name"
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded"
          />
          <input
            type="time"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            placeholder="Tags"
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded min-w-0"
          />
          <input
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="Notes"
            className="bg-gray-800 w-full border border-gray-700 p-2 rounded min-w-0"
          />
          <button
            onClick={() => saveEdit(todo.id)}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3">
          
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              className="w-5 h-5 mt-1"
            />

            <div className="flex mr-5 flex-col min-w-0">
              <span
                ref={textRef}
                className={`
                  ${todo.completed ? "line-through text-gray-500" : ""}
                  ${expanded ? "" : "line-clamp-2"}
                  break-words whitespace-normal
                `}
              >
                {todo.text}
              </span>

              {isOverflowing && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs text-purple-400 mt-1 self-start"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex gap-2 items-center flex-wrap text-sm">
            {todo.date && <span className="text-gray-400">{todo.date}</span>}
            {todo.time && <span className="text-gray-400">{todo.time}</span>}
            {todo.priority && (
              <span
                className={`text-white px-2 py-0.5 rounded ${priorityColors[todo.priority]}`}
              >
                {todo.priority}
              </span>
            )}
            {todo.tags && (
              <span className="text-gray-400 break-words">{todo.tags}</span>
            )}
            {todo.notes && (
              <span className="text-gray-400 italic break-words">
                {todo.notes}
              </span>
            )}
            <button className="flex" onClick={() => startEdit(todo)}>Edit</button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
