import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [analytics, setAnalytics] = useState({
    focusScore: 85,
    totalStudyTime: 1250, // in minutes
    quizAccuracy: 78,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('studysync_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setLectures(data.lectures || []);
      setStudySessions(data.studySessions || []);
      setXp(data.xp || 0);
      setStreak(data.streak || 0);
      setAnalytics(data.analytics || analytics);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const data = {
      lectures,
      studySessions,
      xp,
      streak,
      analytics,
    };
    localStorage.setItem('studysync_data', JSON.stringify(data));
  }, [lectures, studySessions, xp, streak, analytics]);

  const addLecture = (lecture) => {
    const newLecture = {
      id: Date.now(),
      ...lecture,
      uploadedAt: new Date().toISOString(),
    };
    setLectures([newLecture, ...lectures]);
    return newLecture;
  };

  const addStudySession = (session) => {
    const newSession = {
      id: Date.now(),
      ...session,
      completedAt: new Date().toISOString(),
    };
    setStudySessions([newSession, ...studySessions]);
    return newSession;
  };

  const addXP = (points) => {
    setXp(prev => prev + points);
  };

  const updateStreak = () => {
    // Check if user studied today
    const today = new Date().toDateString();
    const lastSession = studySessions[0];
    if (lastSession && new Date(lastSession.completedAt).toDateString() === today) {
      setStreak(prev => prev + 1);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        lectures,
        addLecture,
        studySessions,
        addStudySession,
        xp,
        addXP,
        streak,
        updateStreak,
        analytics,
        setAnalytics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
