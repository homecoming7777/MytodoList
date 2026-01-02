import { useState, useRef, useEffect } from "react";

export default function TodoItem({
  todo,
  toggleCompleted,
  startEdit,
  deleteTodo,
  editingId,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
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
  const descriptionRef = useRef(null);

  const priorityColors = {
    High: "bg-gradient-to-r from-red-600 to-red-500",
    Medium: "bg-gradient-to-r from-yellow-600 to-yellow-500",
    Low: "bg-gradient-to-r from-green-600 to-green-500",
  };

  const priorityIcons = {
    High: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    Medium: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    Low: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  useEffect(() => {
    if (descriptionRef.current && todo.description) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      );
    }
  }, [todo.description, expanded]);

  if (editingId === todo.id) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editing Task
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="text-sm font-medium text-gray-400 block">Task Name *</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter task name"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2 lg:col-span-2">
            <label className="text-sm font-medium text-gray-400 block">Description</label>
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter task description"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 block">Date</label>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 block">Time</label>
            <input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 block">Priority</label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
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
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              placeholder="work, personal, urgent..."
              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 block">Notes</label>
            <input
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Additional details..."
              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700/50">
          <button
            onClick={() => saveEdit(todo.id)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-green-900/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
          
          <button
            onClick={() => startEdit({})}
            className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <li className={`
      bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 
      rounded-2xl p-5 mb-3 transition-all duration-200
      hover:bg-gray-800/60 hover:border-gray-600/50 hover:shadow-xl hover:shadow-red-900/5
      ${todo.completed ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="relative mt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo.id)}
            className="
              w-6 h-6 rounded-xl cursor-pointer appearance-none
              border-2 border-gray-600 bg-gray-800/50
              checked:bg-gradient-to-r checked:from-green-500 checked:to-emerald-500
              checked:border-transparent
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
              transition-all duration-200
            "
          />
          {todo.completed && (
            <svg 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-3">
            {/* Task name and description */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className={`
                  text-lg font-bold break-words whitespace-normal
                  ${todo.completed ? "line-through text-gray-500" : "text-white"}
                `}>
                  {todo.name || "Untitled Task"}
                </h4>
                
                {todo.description && (
                  <>
                    <p
                      ref={descriptionRef}
                      className={`
                        text-gray-400 mt-1 break-words whitespace-normal
                        ${todo.completed ? "line-through" : ""}
                        ${expanded ? "" : "line-clamp-2"}
                        transition-all duration-200
                      `}
                    >
                      {todo.description}
                    </p>
                    
                    {isOverflowing && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-sm bg-gray-700/50 hover:bg-gray-700 px-3 py-1 rounded-lg font-medium text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 group"
                      >
                        {expanded ? (
                          <>
                            <span>Show less</span>
                            <svg className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Show more</span>
                            <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
              
              {/* Priority Badge */}
              {todo.priority && (
                <div className={`${priorityColors[todo.priority]} text-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-sm font-medium shadow-lg`}>
                  {priorityIcons[todo.priority]}
                  <span>{todo.priority}</span>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {/* Date & Time */}
              {(todo.date || todo.time) && (
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex items-center gap-2">
                    {todo.date && (
                      <span className="bg-gray-800/70 px-3 py-1 rounded-lg">
                        {todo.date}
                      </span>
                    )}
                    {todo.time && (
                      <span className="bg-gray-800/70 px-3 py-1 rounded-lg">
                        {todo.time}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              {todo.tags && (
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-lg">
                    {todo.tags}
                  </span>
                </div>
              )}

              {/* Notes */}
              {todo.notes && (
                <div className="flex items-start gap-2 text-gray-400">
                  <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="bg-gray-800/70 px-3 py-1 rounded-lg italic max-w-xs break-words">
                    {todo.notes}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => startEdit(todo)}
            className="
              p-2.5 rounded-xl bg-gray-700/50 hover:bg-blue-900/30 
              border border-gray-600 hover:border-blue-500/50
              text-gray-300 hover:text-blue-400
              transition-all duration-200 hover:scale-105
              group relative
            "
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="
              absolute -top-8 left-1/2 transform -translate-x-1/2
              bg-gray-800 text-xs text-white px-2 py-1 rounded
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              whitespace-nowrap
            ">
              Edit
            </span>
          </button>
          
          <button
            onClick={() => deleteTodo(todo.id)}
            className="
              p-2.5 rounded-xl bg-gray-700/50 hover:bg-red-900/30 
              border border-gray-600 hover:border-red-500/50
              text-gray-300 hover:text-red-400
              transition-all duration-200 hover:scale-105
              group relative
            "
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="
              absolute -top-8 left-1/2 transform -translate-x-1/2
              bg-gray-800 text-xs text-white px-2 py-1 rounded
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              whitespace-nowrap
            ">
              Delete
            </span>
          </button>
        </div>
      </div>
    </li>
  );
}