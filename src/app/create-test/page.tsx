"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Question, Test } from '@/types'

export default function CreateTest() {
  const [testName, setTestName] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'multiple-choice',
    options: ['', '', ''],
    correctAnswer: '',
  })
  const router = useRouter()

  const addQuestion = () => {
    if (currentQuestion.text && currentQuestion.correctAnswer) {
      setQuestions([...questions, { ...currentQuestion, id: Date.now().toString() } as Question])
      setCurrentQuestion({
        text: '',
        type: 'multiple-choice',
        options: ['', '', ''],
        correctAnswer: '',
      })
    }
  }

  const saveTest = () => {
    if (testName && questions.length > 0) {
      const test: Test = {
        id: Date.now().toString(),
        name: testName,
        questions,
      }
      const tests = JSON.parse(localStorage.getItem('tests') || '[]')
      localStorage.setItem('tests', JSON.stringify([...tests, test]))
      router.push('/')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Test</h1>
      <input 
        type="text" 
        value={testName} 
        onChange={(e) => setTestName(e.target.value)} 
        placeholder="Test Name"
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="mb-4">
        <input 
          type="text" 
          value={currentQuestion.text} 
          onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})} 
          placeholder="Question Text"
          className="w-full p-2 mb-2 border rounded"
        />
        <select 
          value={currentQuestion.type} 
          onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value as Question['type']})}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="short-answer">Short Answer</option>
        </select>
        {currentQuestion.type === 'multiple-choice' && (
          <div className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <input 
                key={index}
                type="text" 
                value={option} 
                onChange={(e) => {
                  const newOptions = [...(currentQuestion.options || [])]
                  newOptions[index] = e.target.value
                  setCurrentQuestion({...currentQuestion, options: newOptions})
                }} 
                placeholder={`Option ${index + 1}`}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
        )}
        <input 
          type="text" 
          value={currentQuestion.correctAnswer as string} 
          onChange={(e) => setCurrentQuestion({...currentQuestion, correctAnswer: e.target.value})} 
          placeholder="Correct Answer"
          className="w-full p-2 mt-2 border rounded"
        />
        <button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Add Question</button>
      </div>
      <div className="space-y-2">
        {questions.map((q, index) => (
          <div key={q.id} className="p-2 bg-gray-100 rounded">
            <span>{index + 1}. {q.text}</span>
          </div>
        ))}
      </div>
      <button onClick={saveTest} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Save Test</button>
    </div>
  )
}