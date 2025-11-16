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

      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="max-w-7xl mx-auto p-6 lg:p-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">Welcome back, Student! 👋</h1>
            <p className="text-lg text-gray-400">Ready to crush your study goals today?</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card hover>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                <Flame className="w-7 h-7 text-primary-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400 mb-2">Study Streak</p>
            <p className="text-4xl font-bold text-white mb-1">{streak || 7}</p>
            <p className="text-sm text-gray-500">days in a row 🔥</p>
          </Card>

          <Card hover>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Award className="w-7 h-7 text-blue-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400 mb-2">Total XP</p>
            <p className="text-4xl font-bold text-white mb-1">{xp || 2450}</p>
            <p className="text-sm text-gray-500">experience points ⭐</p>
          </Card>

          <Card hover>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-green-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400 mb-2">Focus Score</p>
            <p className="text-4xl font-bold text-white mb-1">{analytics.focusScore}%</p>
            <p className="text-sm text-gray-500">attention level 📈</p>
          </Card>

          <Card hover>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Clock className="w-7 h-7 text-purple-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400 mb-2">Study Time</p>
            <p className="text-4xl font-bold text-white mb-1">{Math.floor((analytics.totalStudyTime || 1250) / 60)}h</p>
            <p className="text-sm text-gray-500">this month ⏱️</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Focus Session */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="gradient-primary border-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Today's Focus Session</h2>
                  <p className="text-white/90 text-base">Ready to start a 25-minute study session?</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="lg" onClick={() => navigate('/upload')}>
                  Start Session
                </Button>
                <Button variant="ghost" size="lg">
                  View Schedule
                </Button>
              </div>
            </Card>

            {/* Recent Lectures */}
            <Card>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Recent Lectures</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/upload')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </div>
              <div className="space-y-4">
                {recentLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="p-5 rounded-xl border border-gray-800/50 hover:border-primary-500/30 hover:bg-gray-900/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-semibold text-base group-hover:text-primary-400 transition-colors">
                        {lecture.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        {lecture.subject}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {lecture.duration}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500">{lecture.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Weekly Progress Chart */}
          <div className="space-y-8">
            <Card>
              <h2 className="text-2xl font-bold text-white mb-8">Weekly Progress</h2>
              <div className="space-y-6">
                {weeklyProgress.map((day) => (
                  <div key={day.day}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-400">{day.day}</span>
                      <span className="text-sm font-semibold text-white">{day.minutes}m</span>
                    </div>
                    <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                      <div
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-8" onClick={() => navigate('/analytics')}>
                View Full Analytics
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-4 rounded-xl border border-gray-800/50 hover:border-primary-500/30 hover:bg-gray-900/50 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="text-white font-medium">Upload Lecture</span>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl border border-gray-800/50 hover:border-green-500/30 hover:bg-gray-900/50 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Play className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-white font-medium">Start Study Session</span>
                  </div>
                </button>
                <button className="w-full p-4 rounded-xl border border-gray-800/50 hover:border-blue-500/30 hover:bg-gray-900/50 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white font-medium">Review Flashcards</span>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
