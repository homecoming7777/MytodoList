import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { 
  Calendar, Target, CheckCircle2, Circle, 
  ChevronDown, ChevronRight, Plus, Edit2, 
  Trash2, CalendarDays, TrendingUp, Award,
  Clock, BarChart3
} from "lucide-react";

export default function GoalsPlanner() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    if (saved) return JSON.parse(saved);
    
    const currentYear = new Date().getFullYear();
    return [{
      id: currentYear,
      year: currentYear,
      months: []
    }];
  });

  const [expandedYears, setExpandedYears] = useState([]);
  const [expandedMonths, setExpandedMonths] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  
  const [showAddYear, setShowAddYear] = useState(false);
  const [showAddMonth, setShowAddMonth] = useState({ yearId: null, show: false });
  const [showAddWeek, setShowAddWeek] = useState({ monthId: null, show: false });
  const [showAddGoal, setShowAddGoal] = useState({ weekId: null, show: false });
  
  const [newYear, setNewYear] = useState(new Date().getFullYear() + 1);
  const [newMonth, setNewMonth] = useState("");
  const [newWeek, setNewWeek] = useState("");
  const [newGoal, setNewGoal] = useState("");
  
  const [editingGoal, setEditingGoal] = useState(null);
  const [editGoalText, setEditGoalText] = useState("");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const toggleYear = (yearId) => {
    setExpandedYears(prev => 
      prev.includes(yearId) 
        ? prev.filter(id => id !== yearId)
        : [...prev, yearId]
    );
  };

  const toggleMonth = (monthId) => {
    setExpandedMonths(prev => 
      prev.includes(monthId) 
        ? prev.filter(id => id !== monthId)
        : [...prev, monthId]
    );
  };

  const toggleWeek = (weekId) => {
    setExpandedWeeks(prev => 
      prev.includes(weekId) 
        ? prev.filter(id => id !== weekId)
        : [...prev, weekId]
    );
  };

  const addYear = () => {
    if (goals.some(g => g.year === newYear)) {
      alert("Year already exists!");
      return;
    }
    
    const newYearObj = {
      id: Date.now(),
      year: newYear,
      months: []
    };
    
    setGoals(prev => [...prev, newYearObj].sort((a, b) => a.year - b.year));
    setShowAddYear(false);
    setNewYear(newYear + 1);
  };

  const addMonth = () => {
    if (!newMonth) return;
    
    const monthObj = {
      id: Date.now(),
      name: newMonth,
      weeks: []
    };
    
    setGoals(prev => prev.map(year => 
      year.id === showAddMonth.yearId
        ? { ...year, months: [...year.months, monthObj] }
        : year
    ));
    
    setShowAddMonth({ yearId: null, show: false });
    setNewMonth("");
  };

  const addWeek = () => {
    if (!newWeek) return;
    
    const weekObj = {
      id: Date.now(),
      name: newWeek,
      goals: []
    };
    
    setGoals(prev => prev.map(year => ({
      ...year,
      months: year.months.map(month =>
        month.id === showAddWeek.monthId
          ? { ...month, weeks: [...month.weeks, weekObj] }
          : month
      )
    })));
    
    setShowAddWeek({ monthId: null, show: false });
    setNewWeek("");
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    
    const goalObj = {
      id: Date.now(),
      text: newGoal,
      completed: false
    };
    
    setGoals(prev => prev.map(year => ({
      ...year,
      months: year.months.map(month => ({
        ...month,
        weeks: month.weeks.map(week =>
          week.id === showAddGoal.weekId
            ? { ...week, goals: [...week.goals, goalObj] }
            : week
        )
      }))
    })));
    
    setShowAddGoal({ weekId: null, show: false });
    setNewGoal("");
  };

  const toggleGoalCompletion = (goalId, weekId, monthId, yearId) => {
    setGoals(prev => prev.map(year => 
      year.id === yearId
        ? {
            ...year,
            months: year.months.map(month =>
              month.id === monthId
                ? {
                    ...month,
                    weeks: month.weeks.map(week =>
                      week.id === weekId
                        ? {
                            ...week,
                            goals: week.goals.map(goal =>
                              goal.id === goalId
                                ? { ...goal, completed: !goal.completed }
                                : goal
                            )
                          }
                        : week
                    )
                  }
                : month
            )
          }
        : year
    ));
  };

  const deleteGoal = (goalId, weekId, monthId, yearId) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    
    setGoals(prev => prev.map(year => 
      year.id === yearId
        ? {
            ...year,
            months: year.months.map(month =>
              month.id === monthId
                ? {
                    ...month,
                    weeks: month.weeks.map(week =>
                      week.id === weekId
                        ? {
                            ...week,
                            goals: week.goals.filter(goal => goal.id !== goalId)
                          }
                        : week
                    )
                  }
                : month
            )
          }
        : year
    ));
  };

  const startEditGoal = (goal) => {
    setEditingGoal(goal.id);
    setEditGoalText(goal.text);
  };

  const saveEditGoal = (goalId, weekId, monthId, yearId) => {
    if (!editGoalText.trim()) return;
    
    setGoals(prev => prev.map(year => 
      year.id === yearId
        ? {
            ...year,
            months: year.months.map(month =>
              month.id === monthId
                ? {
                    ...month,
                    weeks: month.weeks.map(week =>
                      week.id === weekId
                        ? {
                            ...week,
                            goals: week.goals.map(goal =>
                              goal.id === goalId
                                ? { ...goal, text: editGoalText }
                                : goal
                            )
                          }
                        : week
                    )
                  }
                : month
            )
          }
        : year
    ));
    
    setEditingGoal(null);
  };

  const deleteYear = (yearId) => {
    if (!window.confirm("Are you sure you want to delete this year and all its contents?")) return;
    setGoals(prev => prev.filter(year => year.id !== yearId));
  };

  const deleteMonth = (monthId, yearId) => {
    if (!window.confirm("Are you sure you want to delete this month and all its contents?")) return;
    
    setGoals(prev => prev.map(year => 
      year.id === yearId
        ? { ...year, months: year.months.filter(month => month.id !== monthId) }
        : year
    ));
  };

  const deleteWeek = (weekId, monthId, yearId) => {
    if (!window.confirm("Are you sure you want to delete this week and all its goals?")) return;
    
    setGoals(prev => prev.map(year => 
      year.id === yearId
        ? {
            ...year,
            months: year.months.map(month =>
              month.id === monthId
                ? { ...month, weeks: month.weeks.filter(week => week.id !== weekId) }
                : month
            )
          }
        : year
    ));
  };

  const calculateProgress = (items) => {
    if (!items || items.length === 0) return { completed: 0, total: 0, percentage: 0 };
    
    let completed = 0;
    let total = 0;
    
    const countGoals = (goals) => {
      total += goals.length;
      completed += goals.filter(g => g.completed).length;
    };
    
    items.forEach(year => {
      year.months.forEach(month => {
        month.weeks.forEach(week => {
          countGoals(week.goals);
        });
      });
    });
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const overallProgress = calculateProgress(goals);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Goals Planner
            </h1>
            <p className="text-gray-400">Plan your goals hierarchically: Year → Month → Week → Goal</p>
            
            <div className="mt-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Overall Progress</h3>
                    <p className="text-sm text-gray-400">All years combined</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {overallProgress.completed}/{overallProgress.total}
                  </div>
                  <div className="text-sm text-gray-400">goals completed</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Completion Rate</span>
                  <span className="font-medium text-white">{overallProgress.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  Years
                </h2>
                <button
                  onClick={() => setShowAddYear(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Year
                </button>
              </div>

              {showAddYear && (
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6 animate-in slide-in-from-top-2 duration-200">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    Add New Year
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">
                        Year
                      </label>
                      <input
                        type="number"
                        value={newYear}
                        onChange={(e) => setNewYear(parseInt(e.target.value) || new Date().getFullYear())}
                        min={new Date().getFullYear()}
                        className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={addYear}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold flex-1"
                      >
                        Add Year
                      </button>
                      
                      <button
                        onClick={() => setShowAddYear(false)}
                        className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {goals.length === 0 ? (
                  <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No years added yet</h3>
                    <p className="text-gray-500">Start by adding a year to begin planning your goals</p>
                  </div>
                ) : (
                  goals.map(year => {
                    const yearProgress = calculateProgress([year]);
                    
                    return (
                      <div key={year.id} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
                        <div 
                          className="p-6 cursor-pointer hover:bg-gray-800/60 transition-all duration-200 flex items-center justify-between"
                          onClick={() => toggleYear(year.id)}
                        >
                          <div className="flex items-center gap-4">
                            {expandedYears.includes(year.id) ? (
                              <ChevronDown className="w-5 h-5 text-purple-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-purple-400" />
                            )}
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-600/20 rounded-lg">
                                <Calendar className="w-5 h-5 text-purple-400" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">{year.year}</h3>
                                <p className="text-sm text-gray-400">
                                  {yearProgress.completed}/{yearProgress.total} goals completed
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAddMonth({ yearId: year.id, show: true });
                              }}
                              className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200"
                              title="Add Month"
                            >
                              <Plus className="w-4 h-4 text-gray-300" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteYear(year.id);
                              }}
                              className="p-2 bg-gray-700/50 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                              title="Delete Year"
                            >
                              <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" />
                            </button>
                          </div>
                        </div>

                        {expandedYears.includes(year.id) && (
                          <div className="px-6 pb-6 space-y-4">
                            {showAddMonth.yearId === year.id && showAddMonth.show && (
                              <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-4">
                                <h4 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                                  <CalendarDays className="w-5 h-5 text-purple-500" />
                                  Add Month to {year.year}
                                </h4>
                                
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-400 block mb-2">
                                      Month
                                    </label>
                                    <select
                                      value={newMonth}
                                      onChange={(e) => setNewMonth(e.target.value)}
                                      className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                      <option value="" className="bg-gray-800">Select a month</option>
                                      {monthNames.map(month => (
                                        <option key={month} value={month} className="bg-gray-800">
                                          {month}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  <div className="flex gap-3">
                                    <button
                                      onClick={addMonth}
                                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-[0.98] transition-all duration-200 rounded-xl font-medium flex-1"
                                    >
                                      Add Month
                                    </button>
                                    
                                    <button
                                      onClick={() => setShowAddMonth({ yearId: null, show: false })}
                                      className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-[0.98] transition-all duration-200 rounded-xl font-medium flex-1"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {year.months.length === 0 ? (
                              <div className="text-center py-8 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                                <p className="text-gray-500">No months added yet. Add your first month!</p>
                              </div>
                            ) : (
                              year.months.map(month => {
                                const monthProgress = calculateProgress([{
                                  ...year,
                                  months: [month]
                                }]);
                                
                                return (
                                  <div key={month.id} className="bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden">
                                    <div 
                                      className="p-5 cursor-pointer hover:bg-gray-800/50 transition-all duration-200 flex items-center justify-between"
                                      onClick={() => toggleMonth(month.id)}
                                    >
                                      <div className="flex items-center gap-4">
                                        {expandedMonths.includes(month.id) ? (
                                          <ChevronDown className="w-4 h-4 text-blue-400" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 text-blue-400" />
                                        )}
                                        <div className="flex items-center gap-3">
                                          <div className="p-2 bg-blue-600/20 rounded-lg">
                                            <CalendarDays className="w-4 h-4 text-blue-400" />
                                          </div>
                                          <div>
                                            <h4 className="font-semibold text-white">{month.name}</h4>
                                            <p className="text-sm text-gray-400">
                                              {monthProgress.completed}/{monthProgress.total} goals
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setShowAddWeek({ monthId: month.id, show: true });
                                          }}
                                          className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                          title="Add Week"
                                        >
                                          <Plus className="w-4 h-4 text-gray-300" />
                                        </button>
                                        
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteMonth(month.id, year.id);
                                          }}
                                          className="p-2 bg-gray-700/50 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                          title="Delete Month"
                                        >
                                          <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" />
                                        </button>
                                      </div>
                                    </div>

                                    {expandedMonths.includes(month.id) && (
                                      <div className="px-5 pb-5 space-y-4">
                                        {showAddWeek.monthId === month.id && showAddWeek.show && (
                                          <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-5 mb-4">
                                            <h5 className="font-medium text-gray-300 mb-4 flex items-center gap-2">
                                              <Clock className="w-4 h-4 text-blue-500" />
                                              Add Week to {month.name}
                                            </h5>
                                            
                                            <div className="space-y-4">
                                              <div>
                                                <label className="text-sm font-medium text-gray-400 block mb-2">
                                                  Week Name/Number
                                                </label>
                                                <input
                                                  type="text"
                                                  value={newWeek}
                                                  onChange={(e) => setNewWeek(e.target.value)}
                                                  placeholder="e.g., Week 1, First Week, etc."
                                                  className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                />
                                              </div>
                                              
                                              <div className="flex gap-3">
                                                <button
                                                  onClick={addWeek}
                                                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 active:scale-[0.98] transition-all duration-200 rounded-xl font-medium flex-1"
                                                >
                                                  Add Week
                                                </button>
                                                
                                                <button
                                                  onClick={() => setShowAddWeek({ monthId: null, show: false })}
                                                  className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-[0.98] transition-all duration-200 rounded-xl font-medium flex-1"
                                                >
                                                  Cancel
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {month.weeks.length === 0 ? (
                                          <div className="text-center py-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                            <p className="text-gray-500">No weeks added yet. Add your first week!</p>
                                          </div>
                                        ) : (
                                          month.weeks.map(week => {
                                            const weekProgress = week.goals.filter(g => g.completed).length;
                                            const totalGoals = week.goals.length;
                                            
                                            return (
                                              <div key={week.id} className="bg-gray-800/20 border border-gray-700/50 rounded-xl overflow-hidden">
                                                <div 
                                                  className="p-4 cursor-pointer hover:bg-gray-800/40 transition-all duration-200 flex items-center justify-between"
                                                  onClick={() => toggleWeek(week.id)}
                                                >
                                                  <div className="flex items-center gap-4">
                                                    {expandedWeeks.includes(week.id) ? (
                                                      <ChevronDown className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                      <ChevronRight className="w-4 h-4 text-green-400" />
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                      <div className="p-2 bg-green-600/20 rounded-lg">
                                                        <Clock className="w-4 h-4 text-green-400" />
                                                      </div>
                                                      <div>
                                                        <h5 className="font-medium text-white">{week.name}</h5>
                                                        <p className="text-sm text-gray-400">
                                                          {weekProgress}/{totalGoals} goals completed
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  
                                                  <div className="flex items-center gap-3">
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowAddGoal({ weekId: week.id, show: true });
                                                      }}
                                                      className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                      title="Add Goal"
                                                    >
                                                      <Plus className="w-4 h-4 text-gray-300" />
                                                    </button>
                                                    
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteWeek(week.id, month.id, year.id);
                                                      }}
                                                      className="p-2 bg-gray-700/50 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                                      title="Delete Week"
                                                    >
                                                      <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" />
                                                    </button>
                                                  </div>
                                                </div>

                                                {expandedWeeks.includes(week.id) && (
                                                  <div className="px-4 pb-4 space-y-4">
                                                    {showAddGoal.weekId === week.id && showAddGoal.show && (
                                                      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-3">
                                                        <h6 className="font-medium text-gray-300 mb-4 flex items-center gap-2">
                                                          <Target className="w-4 h-4 text-green-500" />
                                                          Add Goal to {week.name}
                                                        </h6>
                                                        
                                                        <div className="space-y-4">
                                                          <div>
                                                            <label className="text-sm font-medium text-gray-400 block mb-2">
                                                              Goal Description
                                                            </label>
                                                            <input
                                                              type="text"
                                                              value={newGoal}
                                                              onChange={(e) => setNewGoal(e.target.value)}
                                                              placeholder="What do you want to achieve?"
                                                              className="w-full bg-gray-900/70 border border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                                              onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                                                            />
                                                          </div>
                                                          
                                                          <div className="flex gap-3">
                                                            <button
                                                              onClick={addGoal}
                                                              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-200 rounded-xl font-medium flex-1"
                                                            >
                                                              Add Goal
                                                            </button>
                                                            
                                                            <button
                                                              onClick={() => setShowAddGoal({ weekId: null, show: false })}
                                                              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 active:scale-[0.98] transition-all duration-200 rounded-xl font-medium flex-1"
                                                            >
                                                              Cancel
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )}

                                                    {week.goals.length === 0 ? (
                                                      <div className="text-center py-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                                        <p className="text-gray-500">No goals yet. Add your first goal!</p>
                                                      </div>
                                                    ) : (
                                                      <div className="space-y-3">
                                                        {week.goals.map(goal => (
                                                          <div 
                                                            key={goal.id}
                                                            className={`p-4 rounded-xl border transition-all duration-200 ${
                                                              goal.completed
                                                                ? 'bg-gray-800/20 border-gray-700/30 opacity-75'
                                                                : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60'
                                                            }`}
                                                          >
                                                            <div className="flex items-center gap-4">
                                                              <button
                                                                onClick={() => toggleGoalCompletion(goal.id, week.id, month.id, year.id)}
                                                                className="flex-shrink-0"
                                                              >
                                                                {goal.completed ? (
                                                                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                                ) : (
                                                                  <Circle className="w-5 h-5 text-gray-400 hover:text-green-400" />
                                                                )}
                                                              </button>
                                                              
                                                              <div className="flex-1 min-w-0">
                                                                {editingGoal === goal.id ? (
                                                                  <div className="space-y-3">
                                                                    <input
                                                                      type="text"
                                                                      value={editGoalText}
                                                                      onChange={(e) => setEditGoalText(e.target.value)}
                                                                      className="w-full bg-gray-900/70 border border-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                      onKeyDown={(e) => e.key === 'Enter' && saveEditGoal(goal.id, week.id, month.id, year.id)}
                                                                    />
                                                                    <div className="flex gap-2">
                                                                      <button
                                                                        onClick={() => saveEditGoal(goal.id, week.id, month.id, year.id)}
                                                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all duration-200"
                                                                      >
                                                                        Save
                                                                      </button>
                                                                      <button
                                                                        onClick={() => setEditingGoal(null)}
                                                                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-all duration-200"
                                                                      >
                                                                        Cancel
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                ) : (
                                                                  <p className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                                                    {goal.text}
                                                                  </p>
                                                                )}
                                                              </div>
                                                              
                                                              {editingGoal !== goal.id && (
                                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                                  <button
                                                                    onClick={() => startEditGoal(goal)}
                                                                    className="p-2 bg-gray-700/50 hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                                                                    title="Edit Goal"
                                                                  >
                                                                    <Edit2 className="w-4 h-4 text-gray-300 hover:text-blue-400" />
                                                                  </button>
                                                                  
                                                                  <button
                                                                    onClick={() => deleteGoal(goal.id, week.id, month.id, year.id)}
                                                                    className="p-2 bg-gray-700/50 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                                                    title="Delete Goal"
                                                                  >
                                                                    <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" />
                                                                  </button>
                                                                </div>
                                                              )}
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  Statistics
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600/20 rounded-lg">
                          <Award className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Total Goals</p>
                          <p className="text-sm text-gray-400">All years combined</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{overallProgress.total}</p>
                        <p className="text-sm text-gray-400">goals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Completed Goals</p>
                          <p className="text-sm text-gray-400">Achieved so far</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">{overallProgress.completed}</p>
                        <p className="text-sm text-gray-400">done</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-600/20 rounded-lg">
                          <Clock className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Pending Goals</p>
                          <p className="text-sm text-gray-400">Still to achieve</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">{overallProgress.total - overallProgress.completed}</p>
                        <p className="text-sm text-gray-400">remaining</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-300 mb-4">Yearly Breakdown</h3>
                    <div className="space-y-3">
                      {goals.map(year => {
                        const yearProgress = calculateProgress([year]);
                        return (
                          <div key={year.id} className="flex items-center justify-between">
                            <span className="text-gray-300">{year.year}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-400">
                                {yearProgress.completed}/{yearProgress.total}
                              </span>
                              <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                                  style={{ width: `${yearProgress.percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Quick Actions
                </h2>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setShowAddYear(true)}
                    className="w-full p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-purple-500/50 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-purple-600/20 group-hover:bg-purple-600/30 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-white">Add New Year</p>
                      <p className="text-sm text-gray-400">Start planning for a new year</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      if (goals.length > 0) {
                        const firstYear = goals[0];
                        setExpandedYears(prev => [...prev, firstYear.id]);
                        setShowAddMonth({ yearId: firstYear.id, show: true });
                      }
                    }}
                    disabled={goals.length === 0}
                    className={`w-full p-4 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                      goals.length > 0
                        ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-blue-500/50'
                        : 'bg-gray-800/20 border border-gray-800 cursor-not-allowed'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      goals.length > 0
                        ? 'bg-blue-600/20 group-hover:bg-blue-600/30'
                        : 'bg-gray-800/50'
                    }`}>
                      <CalendarDays className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${goals.length > 0 ? 'text-white' : 'text-gray-500'}`}>
                        Add Month to Current Year
                      </p>
                      <p className="text-sm text-gray-400">Plan monthly goals</p>
                    </div>
                  </button>
                  
                  <div className="text-xs text-gray-500 pt-4 border-t border-gray-800/50">
                    <p>Tip: Click on headers to expand/collapse sections</p>
                    <p className="mt-1">Goals are automatically saved to your browser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}