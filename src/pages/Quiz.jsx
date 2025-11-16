import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, X, Award, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useApp } from '../contexts/AppContext';

const Quiz = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { addXP, addStudySession } = useApp();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mock quiz questions
  const questions = [
    {
      question: "What is supervised learning in machine learning?",
      options: [
        "Learning from labeled data with input-output pairs",
        "Learning without any guidance or labels",
        "Learning through trial and error",
        "Learning by clustering similar data points"
      ],
      correct: 0,
      explanation: "Supervised learning uses labeled training data where the model learns from input-output pairs to make predictions."
    },
    {
      question: "Which of the following is NOT a supervised learning algorithm?",
      options: [
        "Linear Regression",
        "Decision Trees",
        "K-Means Clustering",
        "Support Vector Machines"
      ],
      correct: 2,
      explanation: "K-Means Clustering is an unsupervised learning algorithm, while the others are supervised learning methods."
    },
    {
      question: "What is the main goal of a classification algorithm?",
      options: [
        "To predict continuous numerical values",
        "To group similar items together",
        "To predict categorical labels or classes",
        "To reduce dimensionality of data"
      ],
      correct: 2,
      explanation: "Classification algorithms aim to predict categorical labels or classes for given input data."
    },
    {
      question: "In supervised learning, what is the training data used for?",
      options: [
        "To test the final model",
        "To teach the model patterns and relationships",
        "To validate hyperparameters",
        "To reduce overfitting"
      ],
      correct: 1,
      explanation: "Training data is used to teach the model patterns and relationships between inputs and outputs."
    },
    {
      question: "What does overfitting mean in machine learning?",
      options: [
        "The model performs well on all data",
        "The model is too simple",
        "The model memorizes training data but fails on new data",
        "The model trains too quickly"
      ],
      correct: 2,
      explanation: "Overfitting occurs when a model memorizes the training data too well and fails to generalize to new, unseen data."
    }
  ];

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (index) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === currentQ.correct;

    if (isCorrect) {
      setScore(score + 1);
      const xpGained = 50;
      addXP(xpGained);

      // Show XP animation
      setShowXPAnimation(true);
      setTimeout(() => setShowXPAnimation(false), 2000);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      addStudySession({
        topic: "Machine Learning Quiz",
        score: score + 1,
        totalQuestions,
        duration: 25,
        xpEarned: (score + 1) * 50,
      });
    }
  };

  const isCorrect = selectedAnswer === currentQ.correct;
  const accuracy = ((score / totalQuestions) * 100).toFixed(0);

  if (quizCompleted) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center">
              <div className="w-24 h-24 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete! 🎉</h1>

              <div className="grid grid-cols-3 gap-6 my-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Score</p>
                  <p className="text-3xl font-bold text-white">{score}/{totalQuestions}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Accuracy</p>
                  <p className="text-3xl font-bold text-primary-400">{accuracy}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">XP Earned</p>
                  <p className="text-3xl font-bold text-green-400">+{score * 50}</p>
                </div>
              </div>

              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full gradient-primary transition-all duration-1000"
                  style={{ width: `${accuracy}%` }}
                />
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retake Quiz
                </Button>
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Performance Breakdown</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Correct Answers</span>
                  <span className="text-green-400 font-medium">{score}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Wrong Answers</span>
                  <span className="text-red-400 font-medium">{totalQuestions - score}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Time Spent</span>
                  <span className="text-gray-300 font-medium">25 minutes</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* XP Animation */}
          {showXPAnimation && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in">
              <div className="text-center">
                <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent animate-pulse">
                  +50 XP
                </div>
                <div className="text-white text-xl mt-2">🌟 Great job! 🌟</div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span className="text-gray-400 text-sm">
                Score: {score}/{totalQuestions}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {currentQuestion + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">{currentQ.question}</h2>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQ.correct;
                const showCorrect = showFeedback && isCorrectAnswer;
                const showWrong = showFeedback && isSelected && !isCorrectAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`
                      w-full p-4 rounded-lg text-left transition-all duration-300 flex items-center gap-3
                      ${!showFeedback && 'glass-light hover:bg-white/10 hover:border-primary-500/50'}
                      ${isSelected && !showFeedback && 'border-primary-500 bg-primary-500/10'}
                      ${showCorrect && 'border-green-500 bg-green-500/20'}
                      ${showWrong && 'border-red-500 bg-red-500/20'}
                      ${showFeedback && 'cursor-not-allowed'}
                    `}
                  >
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${!showFeedback && isSelected && 'border-primary-500'}
                        ${!showFeedback && !isSelected && 'border-gray-600'}
                        ${showCorrect && 'border-green-500 bg-green-500'}
                        ${showWrong && 'border-red-500 bg-red-500'}
                      `}
                    >
                      {showCorrect && <Check className="w-4 h-4 text-white" />}
                      {showWrong && <X className="w-4 h-4 text-white" />}
                    </div>

                    <span
                      className={`
                        flex-1 font-medium
                        ${!showFeedback && 'text-gray-300'}
                        ${showCorrect && 'text-green-400'}
                        ${showWrong && 'text-red-400'}
                      `}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`mt-6 p-4 rounded-lg animate-fade-in ${
                isCorrect ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isCorrect ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct! 🎉' : 'Incorrect 😔'}
                    </p>
                    <p className="text-gray-300 text-sm">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Next Button */}
          {showFeedback && (
            <Button
              onClick={handleNext}
              className="w-full animate-fade-in"
            >
              {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card className="text-center">
              <TrendingUp className="w-6 h-6 text-primary-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{score}</p>
              <p className="text-xs text-gray-400">Correct</p>
            </Card>
            <Card className="text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{score * 50}</p>
              <p className="text-xs text-gray-400">XP Earned</p>
            </Card>
            <Card className="text-center">
              <Check className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{accuracy}%</p>
              <p className="text-xs text-gray-400">Accuracy</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
