import { useState } from 'react'
import './App.css'

interface Module {
  title: string
  duration: string
  topics: string[]
  learningObjectives: string[]
}

interface Course {
  title: string
  description: string
  level: string
  totalDuration: string
  modules: Module[]
  prerequisites: string[]
  assessments: string[]
}

function App() {
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('intermediate')
  const [duration, setDuration] = useState('4')
  const [isGenerating, setIsGenerating] = useState(false)
  const [course, setCourse] = useState<Course | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [showApiInput, setShowApiInput] = useState(false)

  const generateCourse = async () => {
    if (!topic.trim()) {
      alert('Please enter a course topic')
      return
    }

    if (!apiKey.trim()) {
      setShowApiInput(true)
      return
    }

    setIsGenerating(true)
    setCourse(null)

    const prompt = `Generate a comprehensive course curriculum for the topic: "${topic}"

Target Level: ${level}
Total Duration: ${duration} weeks

Please provide a structured course in the following JSON format:
{
  "title": "Course title",
  "description": "Brief course description (2-3 sentences)",
  "level": "${level}",
  "totalDuration": "${duration} weeks",
  "prerequisites": ["prerequisite 1", "prerequisite 2"],
  "modules": [
    {
      "title": "Module title",
      "duration": "X hours",
      "topics": ["topic 1", "topic 2", "topic 3"],
      "learningObjectives": ["objective 1", "objective 2"]
    }
  ],
  "assessments": ["assessment type 1", "assessment type 2"]
}

Create ${Math.max(3, parseInt(duration))} modules appropriate for the ${level} level. Each module should have 3-5 topics and 2-3 learning objectives.

Return ONLY the JSON object, no additional text.`

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert curriculum designer. Generate well-structured educational courses. Always respond with valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0].message.content

      // Parse the JSON response
      const courseData = JSON.parse(content)
      setCourse(courseData)
    } catch (error) {
      console.error('Error generating course:', error)
      alert('Error generating course. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            MIT Course Generator
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Create comprehensive course curricula on any topic using AI.
            Choose your knowledge level and duration to get a customized learning path.
          </p>
        </header>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-700">
          {/* API Key Input */}
          {showApiInput && (
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-slate-500 text-xs mt-1">
                Your API key is stored locally and never sent to our servers.
              </p>
            </div>
          )}

          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Course Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Machine Learning, Web Development, Data Science..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Level Selection */}
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Knowledge Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['basic', 'intermediate', 'expert'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                    level === lvl
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="mb-8">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Course Duration: <span className="text-blue-400 font-bold">{duration} weeks</span>
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-slate-500 text-xs mt-1">
              <span>1 week</span>
              <span>12 weeks</span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCourse}
            disabled={isGenerating}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              isGenerating
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Course...
              </span>
            ) : (
              'Generate Course'
            )}
          </button>
        </div>

        {/* Course Output */}
        {course && (
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            {/* Course Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-3">{course.title}</h2>
              <p className="text-slate-400 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm capitalize">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  {course.totalDuration}
                </span>
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start text-slate-300">
                      <span className="text-yellow-500 mr-2">•</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modules */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Course Modules</h3>
              {course.modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      <span className="text-blue-400 mr-2">Module {index + 1}:</span>
                      {module.title}
                    </h4>
                    <span className="text-slate-500 text-sm">{module.duration}</span>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-slate-400 mb-2">Topics:</h5>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-slate-400 mb-2">Learning Objectives:</h5>
                    <ul className="space-y-1">
                      {module.learningObjectives.map((obj, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Assessments */}
            {course.assessments && course.assessments.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Assessments</h3>
                <ul className="space-y-2">
                  {course.assessments.map((assessment, index) => (
                    <li key={index} className="flex items-start text-slate-300">
                      <span className="text-purple-500 mr-2">•</span>
                      {assessment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
