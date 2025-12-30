import { useMemo } from "react";

export default function MiniCalendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayStr = today.toISOString().split("T")[0];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
        .toISOString()
        .split("T")[0];
      arr.push(date);
    }
    return arr;
  }, [year, month, firstDay]);

  const monthName = today.toLocaleString("default", { month: "long" });

  return (
    <aside className="w-64 bg-gray-900 text-white rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-4">
        {monthName} {year}
      </h3>

      <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map(d => (
          <div key={d} className="text-gray-400">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={i} />;

          const isToday = date === todayStr;
          const isSelected = date === selectedDate;

          return (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={`
                h-9 rounded-lg text-sm transition
                ${isSelected ? "bg-indigo-600" : "hover:bg-gray-800"}
                ${isToday ? "border border-indigo-400" : ""}
              `}
            >
              {date.split("-")[2]}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onSelectDate(todayStr)}
        className="mt-4 w-full text-xs text-indigo-400 hover:text-indigo-300"
      >
        Jump to Today
      </button>
    </aside>
  );
}
