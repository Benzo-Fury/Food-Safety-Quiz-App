import { Button } from '../ui';
import type { QuestionRow } from '../../types/database';

interface QuestionListProps {
  questions: QuestionRow[];
  onEdit: (question: QuestionRow) => void;
  onDelete: (id: number) => void;
  isDeleting: number | null;
}

export function QuestionList({ questions, onEdit, onDelete, isDeleting }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-mcd-red text-white text-xs font-bold px-2 py-1 rounded">
                  Q{index + 1}
                </span>
                <span className="text-xs text-gray-400">ID: {question.id}</span>
              </div>
              <p className="text-gray-800 font-medium mb-3 line-clamp-2">{question.question}</p>
              <div className="flex flex-wrap gap-2">
                {question.options.map((option, optIndex) => (
                  <span
                    key={optIndex}
                    className={`text-xs px-2 py-1 rounded ${
                      optIndex === question.correct
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {option.length > 30 ? option.slice(0, 30) + '...' : option}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" onClick={() => onEdit(question)} className="text-sm py-2 px-3">
                Edit
              </Button>
              <button
                onClick={() => onDelete(question.id)}
                disabled={isDeleting === question.id}
                className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
              >
                {isDeleting === question.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
