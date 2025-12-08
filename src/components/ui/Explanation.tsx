interface ExplanationProps {
  text: string;
  show: boolean;
}

export function Explanation({ text, show }: ExplanationProps) {
  if (!show) return null;

  return (
    <div className="mt-5 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg animate-fadeIn">
      <div className="font-semibold text-blue-700 mb-2">Explanation</div>
      <div className="text-gray-600 leading-relaxed text-sm">{text}</div>
    </div>
  );
}
