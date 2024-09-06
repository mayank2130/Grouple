export interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string;
  }
  
  export interface Test {
    id: string;
    name: string;
    questions: Question[];
  }
  