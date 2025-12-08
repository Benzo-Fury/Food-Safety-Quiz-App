export interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  userAnswers: (number | undefined)[];
  isStarted: boolean;
  isFinished: boolean;
  questions: Question[];
}
