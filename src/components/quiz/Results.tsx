import { Button } from '../ui';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  passingPercentage: number;
  onRestart: () => void;
}

export function Results({ score, totalQuestions, passingPercentage, onRestart }: ResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= passingPercentage;

  let message = '';
  if (percentage >= 90) {
    message = 'Excellent Work!';
  } else if (percentage >= 80) {
    message = 'Well Done!';
  } else {
    message = 'Keep Studying!';
  }

  return (
    <div className="text-center p-10 px-5 animate-fadeIn">
      <div className="w-44 h-44 rounded-full bg-gradient-to-br from-mcd-yellow to-mcd-red mx-auto mb-7 flex flex-col items-center justify-center text-white shadow-lg shadow-black/20">
        <div className="text-5xl font-bold">{percentage}%</div>
        <div className="text-base opacity-90">Your Score</div>
      </div>

      <div className="text-2xl text-gray-800 mb-5 font-semibold">{message}</div>

      <div className="text-gray-500 mb-7 text-base">
        You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions
        correctly.
        <br />
        {passed ? (
          <span className="text-green-500">You have passed the quiz!</span>
        ) : (
          <span className="text-red-500">
            You need {passingPercentage}% to pass. Please review the material and try again.
          </span>
        )}
      </div>

      <Button onClick={onRestart}>Retake Quiz</Button>
    </div>
  );
}
