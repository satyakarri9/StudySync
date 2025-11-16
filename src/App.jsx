import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LectureUpload from './pages/LectureUpload';
import StudySession from './pages/StudySession';
import Quiz from './pages/Quiz';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen gradient-bg">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<LectureUpload />} />
              <Route path="/study/:lectureId" element={<StudySession />} />
              <Route path="/quiz/:sessionId" element={<Quiz />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
