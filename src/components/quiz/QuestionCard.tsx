import { useState, useEffect } from 'react';
import { Option, Explanation, Button } from '../ui';
import type { Question } from '../../types/quiz';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  userAnswer: number | undefined;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious: boolean;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  userAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  showPrevious,
  isLastQuestion,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(userAnswer);
  const [showResult, setShowResult] = useState(userAnswer !== undefined);

  useEffect(() => {
    setSelectedOption(userAnswer);
    setShowResult(userAnswer !== undefined);
  }, [userAnswer, question]);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);

    setTimeout(() => {
      setShowResult(true);
      onSelectAnswer(index);
    }, 300);
  };

  const getOptionState = (index: number) => {
    if (!showResult) {
      return selectedOption === index ? 'selected' : 'default';
    }
    if (index === question.correct) {
      return 'correct';
    }
    if (selectedOption === index && index !== question.correct) {
      return 'incorrect';
    }
    return 'default';
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-xl text-gray-800 mb-7 leading-relaxed font-medium">
        {questionNumber}. {question.question}
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <Option
            key={index}
            text={option}
            onClick={() => handleSelect(index)}
            state={getOptionState(index)}
            disabled={showResult}
          />
        ))}
      </div>

      <Explanation text={question.explanation} show={showResult} />

      <div className="mt-7 flex gap-3 justify-between flex-col sm:flex-row">
        {showPrevious ? (
          <Button variant="secondary" onClick={onPrevious}>
            Previous
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={onNext} disabled={!showResult}>
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
}
