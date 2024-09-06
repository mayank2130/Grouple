"use client"

import { useState, useEffect } from 'react'
import { Question, Test } from '@/types'

export default function TakeTest() {
  const [tests, setTests] = useState<Test[]>([])
  const [currentTest, setCurrentTest] = useState<Test | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)

  useEffect(() => {
    const storedTests = JSON.parse(localStorage.getItem('tests') || '[]')
    setTests(storedTests)
  }, [])

  const startTest = (test: Test) => {
    setCurrentTest(test)
    setCurrentQuestion(test.questions[0])
    setCurrentQuestionIndex(0)
    setUserAnswers(new Array(test.questions.length).fill(''))
    setTestCompleted(false)
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentTest) {
      if (currentQuestionIndex < currentTest.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCurrentQuestion(currentTest.questions[currentQuestionIndex + 1])
      } else {
        setTestCompleted(true)
      }
    }
  }

  const calculateScore = () => {
    if (currentTest) {
      return currentTest.questions.reduce((score, question, index) => {
        return score + (question.correctAnswer === userAnswers[index] ? 1 : 0)
      }, 0)
    }
    return 0
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Take Test</h1>
      {!currentTest ? (
        <div className="space-y-2">
          {tests.map(test => (
            <button key={test.id} onClick={() => startTest(test)} className="w-full bg-blue-500 text-white px-4 py-2 rounded">
              {test.name}
            </button>
          ))}
        </div>
      ) : !testCompleted ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{currentTest.name}</h2>
          <p className="mb-4">{currentQuestion?.text}</p>
          {currentQuestion?.type === 'multiple-choice' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-2 rounded ${userAnswers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {currentQuestion?.type === 'true-false' && (
            <div className="space-x-2">
              <button 
                onClick={() => handleAnswer('true')}
                className={`px-4 py-2 rounded ${userAnswers[currentQuestionIndex] === 'true' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                True
              </button>
              <button 
                onClick={() => handleAnswer('false')}
                className={`px-4 py-2 rounded ${userAnswers[currentQuestionIndex] === 'false' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                False
              </button>
            </div>
          )}
          {currentQuestion?.type === 'short-answer' && (
            <input 
              type="text" 
              value={userAnswers[currentQuestionIndex]} 
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
          <button onClick={nextQuestion} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
            {currentQuestionIndex === currentTest.questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Test Completed</h2>
          <p className="mb-4">Your score: {calculateScore()} / {currentTest.questions.length}</p>
          <h3 className="text-xl font-bold mb-2">Review Answers:</h3>
          {currentTest.questions.map((question, index) => (
            <div key={question.id} className="mb-4 p-4 bg-gray-100 rounded">
              <p className="font-bold">{index + 1}. {question.text}</p>
              <p>Your answer: {userAnswers[index]}</p>
              <p>Correct answer: {question.correctAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}