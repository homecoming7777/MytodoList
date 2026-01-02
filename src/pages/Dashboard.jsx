import { useState, useEffect } from "react";
import { 
  BarChart3, Calendar, CheckCircle2, Clock, 
  TrendingUp, AlertCircle, ListTodo, Target,
  BarChart as BarChartIcon, PieChart as PieChartIcon
} from "lucide-react";

export default function Dashboard({ todos }) {
  const [timeRange, setTimeRange] = useState('week');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Priority breakdown
  const highPriority = todos.filter(t => t.priority === 'High').length;
  const mediumPriority = todos.filter(t => t.priority === 'Medium').length;
  const lowPriority = todos.filter(t => t.priority === 'Low').length;
  
  // Today's tasks
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = todos.filter(t => t.date === todayStr);
  const todayCompleted = todayTasks.filter(t => t.completed).length;
  
  // Overdue tasks (tasks with date < today and not completed)
  const overdueTasks = todos.filter(t => 
    t.date < todayStr && !t.completed
  ).length;
  
  // Upcoming tasks (next 7 days)
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().slice(0, 10);
  const upcomingTasks = todos.filter(t => 
    t.date > todayStr && t.date <= nextWeekStr && !t.completed
  ).length;
  
  // Most productive day
  const tasksByDay = todos.reduce((acc, task) => {
    const day = new Date(task.date).toLocaleDateString('en-US', { weekday: 'short' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  
  const mostProductiveDay = Object.entries(tasksByDay)
    .sort(([,a], [,b]) => b - a)[0] || ['None', 0];
  
  // Average completion time (mock calculation based on creation date)
  const recentCompleted = todos
    .filter(t => t.completed)
    .slice(-10);
  
  // Categories from tags
  const allTags = todos.flatMap(t => 
    t.tags ? t.tags.split(',').map(tag => tag.trim().toLowerCase()) : []
  );
  const tagFrequency = allTags.reduce((acc, tag) => {
    if (tag) {
      acc[tag] = (acc[tag] || 0) + 1;
    }
    return acc;
  }, {});
  
  const topCategories = Object.entries(tagFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([tag, count]) => ({ tag, count }));
  
  // Recent activity (last 5 todos)
  const recentActivity = [...todos]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  // Productivity score (mock calculation)
  const productivityScore = Math.min(
    100,
    Math.round(
      (completedTasks * 1.5 + 
       (todos.filter(t => t.priority === 'High' && t.completed).length * 2) +
       (todayCompleted * 3)) / 
      Math.max(1, totalTasks) * 20
    )
  );

  const StatCard = ({ title, value, icon: Icon, change, color, subtitle }) => (
    <div className="bg-gray-800/40 overflow-x-auto backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color || 'text-white'}`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color?.replace('text-', 'bg-')}/10`}>
          <Icon className={`w-6 h-6 ${color || 'text-gray-400'}`} />
        </div>
      </div>
      {change && (
        <div className={`text-xs font-medium ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last period
        </div>
      )}
    </div>
  );

  const ProgressBar = ({ value, max = 100, color = 'bg-gradient-to-r from-red-600 to-pink-600', label }) => (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">{label}</span>
          <span className="font-medium text-white">{value}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Task Dashboard
              </h1>
              <p className="text-gray-400">Track your productivity and task management insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              <div className="flex bg-gray-800/50 rounded-xl p-1">
                {['day', 'week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex bg-gray-800/50 rounded-xl p-1">
                {['all', 'high', 'medium', 'low'].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setPriorityFilter(priority)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                      priorityFilter === priority
                        ? priority === 'high' ? 'bg-red-600/20 text-red-400 border border-red-500/30' :
                          priority === 'medium' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' :
                          priority === 'low' ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                          'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {priority === 'high' && <AlertCircle className="w-4 h-4" />}
                    {priority === 'medium' && <Target className="w-4 h-4" />}
                    {priority === 'low' && <CheckCircle2 className="w-4 h-4" />}
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            icon={ListTodo}
            color="text-blue-400"
            subtitle={`${completedTasks} completed`}
          />
          
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            icon={CheckCircle2}
            color="text-green-400"
            change={completionRate > 70 ? 12 : -5}
          />
          
          <StatCard
            title="Today's Tasks"
            value={todayTasks.length}
            icon={Calendar}
            color="text-yellow-400"
            subtitle={`${todayCompleted} completed`}
          />
          
          <StatCard
            title="Productivity Score"
            value={productivityScore}
            icon={TrendingUp}
            color="text-purple-400"
            change={productivityScore > 75 ? 8 : -3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5 text-red-500" />
                Task Distribution
              </h2>
              <span className="text-sm text-gray-400">By Priority & Status</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-4">Priority Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'High Priority', value: highPriority, total: totalTasks, color: 'bg-gradient-to-r from-red-600 to-red-500' },
                    { label: 'Medium Priority', value: mediumPriority, total: totalTasks, color: 'bg-gradient-to-r from-yellow-600 to-yellow-500' },
                    { label: 'Low Priority', value: lowPriority, total: totalTasks, color: 'bg-gradient-to-r from-green-600 to-green-500' },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="font-medium text-white">{item.value} tasks</span>
                      </div>
                      <ProgressBar 
                        value={totalTasks > 0 ? Math.round((item.value / totalTasks) * 100) : 0}
                        color={item.color}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-4">Task Status</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-600/20 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Completed</p>
                        <p className="text-sm text-gray-400">Tasks done</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
                      <p className="text-sm text-gray-400">{completionRate}% rate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-600/20 rounded-lg">
                        <Clock className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Pending</p>
                        <p className="text-sm text-gray-400">Tasks remaining</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-400">{pendingTasks}</p>
                      <p className="text-sm text-gray-400">{totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}% total</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-600/20 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Overdue</p>
                        <p className="text-sm text-gray-400">Past deadline</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-400">{overdueTasks}</p>
                      <p className="text-sm text-gray-400">Needs attention</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2 mb-6">
              <PieChartIcon className="w-5 h-5 text-red-500" />
              Insights & Analytics
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Most Productive Day</p>
                    <p className="text-sm text-gray-400">Based on task count</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {mostProductiveDay[0]}
                </p>
                <p className="text-center text-gray-400 text-sm mt-1">
                  {mostProductiveDay[1]} tasks scheduled
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700/50">
                <h3 className="font-medium text-gray-300 mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {topCategories.length > 0 ? (
                    topCategories.map(({ tag, count }, index) => (
                      <div key={tag} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            index === 0 ? 'bg-red-600/20' :
                            index === 1 ? 'bg-yellow-600/20' :
                            'bg-blue-600/20'
                          }`}>
                            <span className={`text-sm font-bold ${
                              index === 0 ? 'text-red-400' :
                              index === 1 ? 'text-yellow-400' :
                              'text-blue-400'
                            }`}>
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-gray-200 capitalize">{tag}</span>
                        </div>
                        <span className="text-white font-medium">{count} tasks</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-2">No categories yet</p>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Upcoming Tasks</p>
                      <p className="text-sm text-gray-400">Next 7 days</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{upcomingTasks}</span>
                </div>
                <ProgressBar 
                  value={Math.min(100, (upcomingTasks / Math.max(1, pendingTasks)) * 100)}
                  color="bg-gradient-to-r from-blue-600 to-cyan-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Recent Activity
            </h2>
            <span className="text-sm text-gray-400">Latest tasks</span>
          </div>
          
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-gray-800/50 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      task.completed ? 'bg-green-600/20' : 'bg-gray-700/50'
                    }`}>
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {task.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-400">{task.date}</span>
                        {task.time && (
                          <span className="text-sm text-gray-400">{task.time}</span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'High' ? 'bg-red-600/20 text-red-400' :
                          task.priority === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-green-600/20 text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {new Date(task.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className={`text-xs font-medium ${
                      task.completed ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Task Management Summary</h3>
              <p className="text-gray-400">
                You have {pendingTasks} pending tasks with {overdueTasks} overdue. 
                Your completion rate is {completionRate}% and productivity score is {productivityScore}/100.
                {productivityScore > 80 ? ' Keep up the great work!' : ' Try focusing on high priority tasks.'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{completionRate}%</div>
                <div className="text-sm text-gray-400">Completion</div>
              </div>
              <div className="h-12 w-px bg-gray-700/50" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{productivityScore}</div>
                <div className="text-sm text-gray-400">Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}