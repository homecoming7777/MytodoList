import { useState } from "react";

export default function Calendar({ todos, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const hasTask = (day) => {
    const dateStr = new Date(year, month, day).toISOString().slice(0, 10);
    return todos.some((t) => t.date === dateStr);
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="mt-10 p-4 bg-gray-900 rounded">
      <div className="flex justify-between items-center mb-4 text-white">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1))}
          className="px-2 py-1 bg-gray-800 rounded"
        >
          Prev
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(year, month + 1))}
          className="px-2 py-1 bg-gray-800 rounded"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-gray-400 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {days.map((day, idx) => {
          if (!day) return <div key={idx}></div>;
          const dateStr = new Date(year, month, day).toISOString().slice(0, 10);
          const isToday = dateStr === todayStr;
          const taskExists = hasTask(day);

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(dateStr)}
              className={`p-2 rounded ${
                isToday ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              } ${taskExists ? "border-2 border-purple-500" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
