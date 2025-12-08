import { Button, InfoItem } from '../ui';

interface StartScreenProps {
  totalQuestions: number;
  passingScore: string;
  onStart: () => void;
}

export function StartScreen({ totalQuestions, passingScore, onStart }: StartScreenProps) {
  return (
    <div className="text-center p-10 px-5 animate-fadeIn">
      <h2 className="text-2xl text-gray-800 mb-5">Welcome to the Food Safety Quiz</h2>
      <p className="text-gray-500 mb-7 leading-relaxed">
        Test your knowledge of McDonald's food safety procedures and standards. This quiz covers
        critical topics from the Food Safety Rationale document.
      </p>

      <div className="bg-gray-50 rounded-xl p-5 mb-7 text-left">
        <InfoItem label="Total Questions" value={String(totalQuestions)} />
        <InfoItem label="Time Limit" value="None" />
        <InfoItem label="Passing Score" value={passingScore} />
      </div>

      <Button onClick={onStart}>Start Quiz</Button>
    </div>
  );
}
