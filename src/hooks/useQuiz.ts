import { useState, useCallback, useMemo } from 'react';
import type { Question, QuizState } from '../types/quiz';

const QUIZ_SIZE = 20;

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function shuffleQuestionOptions(question: Question): Question {
  const correctAnswer = question.options[question.correct];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    ...question,
    options: shuffledOptions,
    correct: newCorrectIndex,
  };
}

function selectRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(shuffleQuestionOptions);
}

export function useQuiz(originalQuestions: Question[]) {
  const [state, setState] = useState<QuizState>(() => ({
    currentQuestion: 0,
    score: 0,
    userAnswers: [],
    isStarted: false,
    isFinished: false,
    questions: selectRandomQuestions(originalQuestions, QUIZ_SIZE),
  }));

  const startQuiz = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isStarted: true,
    }));
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setState((prev) => {
      const newAnswers = [...prev.userAnswers];
      newAnswers[prev.currentQuestion] = answerIndex;

      const isCorrect = answerIndex === prev.questions[prev.currentQuestion].correct;
      const newScore = isCorrect ? prev.score + 1 : prev.score;

      return {
        ...prev,
        userAnswers: newAnswers,
        score: newScore,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestion >= prev.questions.length - 1) {
        return { ...prev, isFinished: true };
      }
      return { ...prev, currentQuestion: prev.currentQuestion + 1 };
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1),
    }));
  }, []);

  const restartQuiz = useCallback(() => {
    setState({
      currentQuestion: 0,
      score: 0,
      userAnswers: [],
      isStarted: false,
      isFinished: false,
      questions: selectRandomQuestions(originalQuestions, QUIZ_SIZE),
    });
  }, [originalQuestions]);

  const currentQuestionData = useMemo(
    () => state.questions[state.currentQuestion],
    [state.questions, state.currentQuestion]
  );

  return {
    state,
    currentQuestionData,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    restartQuiz,
  };
}
