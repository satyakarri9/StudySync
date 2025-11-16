import { useNavigate } from 'react-router-dom';
import { Clock, Upload, Flame, TrendingUp, Play, FileText, Award } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useApp } from '../contexts/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { lectures, xp, streak, analytics } = useApp();

  // Mock data for demo
  const recentLectures = lectures.length > 0 ? lectures.slice(0, 3) : [
    { id: 1, title: 'Introduction to Machine Learning', subject: 'Computer Science', duration: '45 min', date: '2 hours ago' },
    { id: 2, title: 'Organic Chemistry Basics', subject: 'Chemistry', duration: '30 min', date: '1 day ago' },
    { id: 3, title: 'World War II History', subject: 'History', duration: '60 min', date: '2 days ago' },
  ];

  const weeklyProgress = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 40 },
  ];

  const maxMinutes = Math.max(...weeklyProgress.map(d => d.minutes));

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Student! 👋</h1>
          <p className="text-gray-400">Ready to crush your study goals today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-2xl">🔥</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Study Streak</h3>
            <p className="text-3xl font-bold text-white">{streak || 7} days</p>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total XP</h3>
            <p className="text-3xl font-bold text-white">{xp || 2450}</p>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Focus Score</h3>
            <p className="text-3xl font-bold text-white">{analytics.focusScore}%</p>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Study Time</h3>
            <p className="text-3xl font-bold text-white">{Math.floor((analytics.totalStudyTime || 1250) / 60)}h</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Focus Session */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="gradient-primary">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Today's Focus Session</h2>
                  <p className="text-white/80">Ready to start a 25-minute study session?</p>
                </div>
                <Play className="w-12 h-12 text-white/80" />
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => navigate('/upload')}>
                  Start Session
                </Button>
                <Button variant="ghost">
                  View Schedule
                </Button>
              </div>
            </Card>

            {/* Recent Lectures */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Lectures</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/upload')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>
              <div className="space-y-3">
                {recentLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="p-4 rounded-lg glass-light hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1 group-hover:text-primary-400 transition-colors">
                          {lecture.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {lecture.subject}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lecture.duration}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{lecture.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Weekly Progress Chart */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Weekly Progress</h2>
              <div className="space-y-4">
                {weeklyProgress.map((day) => (
                  <div key={day.day}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{day.day}</span>
                      <span className="text-sm font-medium text-white">{day.minutes}m</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6" onClick={() => navigate('/analytics')}>
                View Full Analytics
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg glass-light hover:bg-white/10 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-primary-400" />
                    <span className="text-white font-medium">Upload Lecture</span>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg glass-light hover:bg-white/10 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Start Study Session</span>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg glass-light hover:bg-white/10 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Review Flashcards</span>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
