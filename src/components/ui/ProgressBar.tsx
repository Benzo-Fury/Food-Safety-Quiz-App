interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="bg-gray-100 px-7 py-5 border-b border-gray-200">
      <div className="bg-gray-200 h-2 rounded overflow-hidden mb-2.5">
        <div
          className="bg-gradient-to-r from-mcd-yellow to-mcd-red h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-sm text-gray-500 text-center">
        Question {current + 1} of {total}
      </div>
    </div>
  );
}
