import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Play, Pause, RotateCcw, Coffee, Eye, EyeOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';

const StudySession = () => {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const alertTimeoutRef = useRef(null);

  const totalTime = 25 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Mock study content
  const studyContent = {
    topic: "Introduction to Machine Learning",
    currentSection: "Supervised Learning Algorithms",
    content: `
      **Supervised Learning** is a type of machine learning where the model is trained on labeled data.

      Key algorithms include:
      - Linear Regression
      - Logistic Regression
      - Decision Trees
      - Random Forests
      - Support Vector Machines

      These algorithms learn from input-output pairs to make predictions on new, unseen data.
    `,
    keyPoints: [
      "Supervised learning uses labeled training data",
      "Models learn to map inputs to outputs",
      "Common applications: classification and regression",
      "Requires quality labeled datasets"
    ]
  };

  // Timer logic
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Timer completed - show quiz button
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Tab visibility tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        setIsFocused(false);
        setShowAlert(true);

        // Clear previous timeout
        if (alertTimeoutRef.current) {
          clearTimeout(alertTimeoutRef.current);
        }

        // Auto-hide alert after 3 seconds
        alertTimeoutRef.current = setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        setIsFocused(true);
        setShowAlert(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const startBreak = () => {
    setIsRunning(false);
    setTimeLeft(5 * 60); // 5 minute break
  };

  // Circular progress SVG
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Focus Alert */}
          {showAlert && (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
              <Card className="bg-yellow-500/20 border-yellow-500/50">
                <div className="flex items-center gap-3">
                  <EyeOff className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Stay focused! 👀</p>
                    <p className="text-sm text-gray-300">You switched tabs. Keep your focus on studying!</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{studyContent.topic}</h1>
            <p className="text-gray-400">Focus Session - {studyContent.currentSection}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timer Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <h2 className="text-xl font-bold text-white mb-6 text-center">Pomodoro Timer</h2>

                {/* Circular Timer */}
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <svg className="transform -rotate-90 w-64 h-64">
                    {/* Background circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-gray-800"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Time Display */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-5xl font-bold text-white">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                      {isRunning ? 'Studying...' : 'Paused'}
                    </div>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex gap-3 mb-4">
                  <Button
                    onClick={toggleTimer}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  <Button variant="outline" onClick={resetTimer}>
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={startBreak}
                >
                  <Coffee className="w-5 h-5" />
                  Take a Break (5 min)
                </Button>

                {/* Focus Indicator */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Focus Status</span>
                    <div className="flex items-center gap-2">
                      {isFocused ? (
                        <>
                          <Eye className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Focused</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm font-medium">Distracted</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quiz Button (shown when timer ends) */}
                {timeLeft === 0 && (
                  <Button
                    className="w-full mt-4 animate-pulse"
                    onClick={() => navigate('/quiz/1')}
                  >
                    Take Quiz Now! 🎯
                  </Button>
                )}
              </Card>
            </div>

            {/* Study Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h2 className="text-2xl font-bold text-white mb-4">{studyContent.currentSection}</h2>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {studyContent.content}
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-white mb-4">Key Points to Remember</h3>
                <ul className="space-y-3">
                  {studyContent.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="glass-light">
                <h3 className="text-lg font-semibold text-white mb-3">💡 Pro Tip</h3>
                <p className="text-gray-300">
                  Take notes while studying! Writing helps reinforce what you're learning and creates a reference for later review.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudySession;
