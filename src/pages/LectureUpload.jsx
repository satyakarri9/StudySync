import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileAudio, FileVideo, FileText, Check, Loader, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useApp } from '../contexts/AppContext';

const LectureUpload = () => {
  const navigate = useNavigate();
  const { addLecture } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiResults, setAiResults] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    simulateUpload(file);
  };

  const simulateUpload = async (file) => {
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    setUploading(false);
    setProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock AI results
    const results = {
      title: file.name.replace(/\.[^/.]+$/, ""),
      summary: "This lecture covers fundamental concepts in the subject area, including key theories, practical applications, and important case studies. The material builds upon previous knowledge and introduces new frameworks for understanding complex topics.",
      keyConcepts: [
        "Fundamental Principles and Core Theories",
        "Practical Applications and Real-world Examples",
        "Advanced Concepts and Future Implications",
        "Critical Analysis and Problem-solving Approaches"
      ],
      flashcards: [
        { question: "What is the main concept discussed?", answer: "Core principles of the subject matter" },
        { question: "How does this apply in practice?", answer: "Through real-world applications and case studies" },
        { question: "What are the key takeaways?", answer: "Understanding of fundamental and advanced concepts" }
      ],
      quizQuestions: [
        {
          question: "Which of the following best describes the core concept?",
          options: ["Option A - Correct answer", "Option B", "Option C", "Option D"],
          correct: 0
        },
        {
          question: "What is a practical application of this theory?",
          options: ["Option A", "Option B - Correct answer", "Option C", "Option D"],
          correct: 1
        }
      ],
      youtubeLinks: [
        { title: "Introduction to the Topic", url: "https://youtube.com/example1" },
        { title: "Advanced Concepts Explained", url: "https://youtube.com/example2" },
        { title: "Practical Applications", url: "https://youtube.com/example3" }
      ]
    };

    setAiResults(results);
    setProcessing(false);

    // Save to app context
    addLecture({
      ...results,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  };

  const getFileIcon = (file) => {
    if (!file) return <Upload className="w-12 h-12" />;

    if (file.type.startsWith('audio/')) return <FileAudio className="w-12 h-12 text-green-400" />;
    if (file.type.startsWith('video/')) return <FileVideo className="w-12 h-12 text-blue-400" />;
    if (file.type.includes('pdf')) return <FileText className="w-12 h-12 text-red-400" />;
    return <FileText className="w-12 h-12 text-gray-400" />;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Upload Lecture</h1>
            <p className="text-gray-400">Upload your lecture files and let AI do the magic ✨</p>
          </div>

          {/* Upload Area */}
          {!aiResults && (
            <Card className="mb-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="audio/*,video/*,.pdf"
                  onChange={handleChange}
                />

                {!file ? (
                  <>
                    <div className="w-20 h-20 rounded-full glass mx-auto mb-6 flex items-center justify-center text-gray-400">
                      <Upload className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Drop your lecture file here
                    </h3>
                    <p className="text-gray-400 mb-6">or click to browse</p>
                    <label htmlFor="file-upload">
                      <Button as="span" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                    <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <FileAudio className="w-5 h-5" /> Audio
                      </span>
                      <span className="flex items-center gap-2">
                        <FileVideo className="w-5 h-5" /> Video
                      </span>
                      <span className="flex items-center gap-2">
                        <FileText className="w-5 h-5" /> PDF
                      </span>
                    </div>
                  </>
                ) : uploading || processing ? (
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-full glass mx-auto flex items-center justify-center">
                      {getFileIcon(file)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{file.name}</h3>
                      <p className="text-gray-400">
                        {uploading ? 'Uploading...' : processing ? 'Processing with AI...' : ''}
                      </p>
                    </div>
                    {uploading && (
                      <div className="max-w-md mx-auto">
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{progress}%</p>
                      </div>
                    )}
                    {processing && (
                      <div className="flex items-center justify-center gap-3 text-primary-400">
                        <Loader className="w-6 h-6 animate-spin" />
                        <span className="text-sm">AI is analyzing your lecture...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 mx-auto flex items-center justify-center">
                      <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Upload Complete!</h3>
                    <p className="text-gray-400">Processing your lecture with AI...</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* AI Results */}
          {aiResults && (
            <div className="space-y-6 animate-fade-in">
              <Card className="gradient-primary">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">AI Processing Complete!</h2>
                </div>
                <p className="text-white/90">Your lecture has been analyzed and organized for optimal studying</p>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-white mb-4">Summary</h3>
                <p className="text-gray-300 leading-relaxed">{aiResults.summary}</p>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-white mb-4">Key Concepts</h3>
                <ul className="space-y-2">
                  {aiResults.keyConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {concept}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-white mb-4">Flashcards ({aiResults.flashcards.length})</h3>
                <div className="grid gap-4">
                  {aiResults.flashcards.slice(0, 2).map((card, index) => (
                    <div key={index} className="p-4 glass-light rounded-lg">
                      <p className="text-primary-400 font-medium mb-2">Q: {card.question}</p>
                      <p className="text-gray-300">A: {card.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-white mb-4">Related YouTube Videos</h3>
                <div className="space-y-3">
                  {aiResults.youtubeLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 glass-light rounded-lg hover:bg-white/10 transition-all group"
                    >
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {link.title}
                      </p>
                    </a>
                  ))}
                </div>
              </Card>

              <div className="flex gap-4">
                <Button onClick={() => navigate('/study/1')} className="flex-1">
                  Start Study Session
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LectureUpload;
