import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Target, TrendingUp, Moon, Sun } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'LectureGPT',
      description: 'Upload lectures and get AI-generated summaries, flashcards, and practice questions',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'FocusFlow',
      description: '25-minute focused study sessions with adaptive quizzes and attention tracking',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Track Progress',
      description: 'Gamified learning with XP points, streaks, and detailed analytics',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="glass p-3 rounded-full hover:scale-110 transition-transform"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-primary-400" />}
        </button>
      </div>

      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-0 right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="glass-light px-4 py-2 rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">AI-Powered Study Companion</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Transform Your
            </span>
            <br />
            <span className="text-white">Study Sessions with AI</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
            Upload lectures, get organized study plans, and boost your productivity with adaptive AI quizzes and focus tracking
          </p>

          <div className="flex gap-4 justify-center mb-16 animate-slide-up">
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Start Free
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative animate-fade-in">
            <Card className="max-w-4xl mx-auto overflow-hidden" hover>
              <div className="aspect-video bg-gradient-to-br from-primary-900/30 to-blue-900/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-24 h-24 text-primary-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-400">StudySync AI Dashboard Preview</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Excel</h2>
          <p className="text-gray-400 text-lg">Powerful features designed for modern students</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <Card className="max-w-3xl mx-auto text-center gradient-primary">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-white/90 mb-8">Join thousands of students already studying smarter with AI</p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
            Get Started Now
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative z-10 container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2025 StudySync AI. Built with AI for students.</p>
      </div>
    </div>
  );
};

export default LandingPage;
