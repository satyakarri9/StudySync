import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, Award, Flame, Brain } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { useApp } from '../contexts/AppContext';

const Analytics = () => {
  const { analytics, streak, xp } = useApp();

  // Mock data for charts
  const weeklyStudyData = [
    { day: 'Mon', minutes: 45, subject: 'CS' },
    { day: 'Tue', minutes: 60, subject: 'Math' },
    { day: 'Wed', minutes: 30, subject: 'Physics' },
    { day: 'Thu', minutes: 75, subject: 'CS' },
    { day: 'Fri', minutes: 50, subject: 'Chemistry' },
    { day: 'Sat', minutes: 90, subject: 'CS' },
    { day: 'Sun', minutes: 40, subject: 'Math' },
  ];

  const quizPerformanceData = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 72 },
    { week: 'Week 3', score: 68 },
    { week: 'Week 4', score: 78 },
    { week: 'Week 5', score: 82 },
    { week: 'Week 6', score: 85 },
  ];

  const subjectDistribution = [
    { name: 'Computer Science', value: 40, color: '#8B5CF6' },
    { name: 'Mathematics', value: 25, color: '#3B82F6' },
    { name: 'Physics', value: 20, color: '#10B981' },
    { name: 'Chemistry', value: 15, color: '#F59E0B' },
  ];

  // Generate streak calendar (GitHub-style)
  const generateStreakCalendar = () => {
    const weeks = 12;
    const daysPerWeek = 7;
    const calendar = [];

    for (let week = 0; week < weeks; week++) {
      const weekDays = [];
      for (let day = 0; day < daysPerWeek; day++) {
        // Random intensity for demo (0-4)
        const intensity = Math.floor(Math.random() * 5);
        weekDays.push(intensity);
      }
      calendar.push(weekDays);
    }

    return calendar;
  };

  const streakCalendar = generateStreakCalendar();

  const getIntensityColor = (intensity) => {
    const colors = [
      'bg-gray-800',
      'bg-primary-900/30',
      'bg-primary-700/50',
      'bg-primary-500/70',
      'bg-primary-400',
    ];
    return colors[intensity];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg">
          <p className="text-white font-medium">{payload[0].value} minutes</p>
          <p className="text-gray-400 text-sm">{payload[0].payload.day}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard 📊</h1>
            <p className="text-gray-400">Track your progress and study patterns</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card hover>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-primary-400" />
                </div>
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Current Streak</h3>
              <p className="text-3xl font-bold text-white">{streak || 7} days</p>
              <p className="text-xs text-green-400 mt-2">↑ Keep it up!</p>
            </Card>

            <Card hover>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Total Study Time</h3>
              <p className="text-3xl font-bold text-white">{Math.floor((analytics.totalStudyTime || 1250) / 60)}h</p>
              <p className="text-xs text-gray-400 mt-2">This month</p>
            </Card>

            <Card hover>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Focus Score</h3>
              <p className="text-3xl font-bold text-white">{analytics.focusScore}%</p>
              <p className="text-xs text-green-400 mt-2">↑ +5% from last week</p>
            </Card>

            <Card hover>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Quiz Accuracy</h3>
              <p className="text-3xl font-bold text-white">{analytics.quizAccuracy}%</p>
              <p className="text-xs text-gray-400 mt-2">Average score</p>
            </Card>
          </div>

          {/* Streak Calendar */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Study Streak Calendar</h2>
                <p className="text-sm text-gray-400">Your activity over the past 12 weeks</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${getIntensityColor(i)}`} />
                ))}
                <span>More</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-flex gap-1">
                {streakCalendar.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((intensity, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)} hover:ring-2 hover:ring-primary-400 transition-all cursor-pointer`}
                        title={`${intensity} study sessions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Study Time */}
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Weekly Study Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyStudyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="minutes" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Quiz Performance Over Time */}
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Quiz Performance Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={quizPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Subject Distribution */}
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Study Time by Subject</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {subjectDistribution.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                      <span className="text-gray-300">{subject.name}</span>
                    </div>
                    <span className="text-white font-medium">{subject.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {[
                  { icon: '🏆', title: 'Week Warrior', desc: '7-day study streak', color: 'text-yellow-400' },
                  { icon: '🎯', title: 'Quiz Master', desc: '90% quiz accuracy', color: 'text-green-400' },
                  { icon: '📚', title: 'Knowledge Hunter', desc: '10 lectures completed', color: 'text-blue-400' },
                  { icon: '⚡', title: 'Speed Learner', desc: '5 hours in one day', color: 'text-purple-400' },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 glass-light rounded-lg">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className={`font-semibold ${achievement.color}`}>{achievement.title}</p>
                      <p className="text-xs text-gray-400">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Study Goals */}
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Weekly Goals</h2>
              <div className="space-y-6">
                {[
                  { label: 'Study Time', current: 18, target: 20, unit: 'hours', color: 'bg-primary-500' },
                  { label: 'Quizzes', current: 12, target: 15, unit: 'completed', color: 'bg-blue-500' },
                  { label: 'Focus Score', current: 85, target: 90, unit: '%', color: 'bg-green-500' },
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">{goal.label}</span>
                      <span className="text-sm text-white font-medium">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${goal.color} transition-all duration-500`}
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm">
                  <Brain className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-white font-medium">Keep pushing!</p>
                    <p className="text-gray-400 text-xs">You're 90% to your weekly goal</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
