import { useState, useEffect } from 'react';
import { Button } from '../ui';
import type { QuestionRow } from '../../types/database';

interface QuestionFormProps {
  question?: QuestionRow | null;
  onSave: (data: Omit<QuestionRow, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export function QuestionForm({ question, onSave, onCancel, isSaving }: QuestionFormProps) {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (question) {
      setQuestionText(question.question);
      setOptions(question.options.length >= 4 ? question.options : [...question.options, ...Array(4 - question.options.length).fill('')]);
      setCorrect(question.correct);
      setExplanation(question.explanation);
    }
  }, [question]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const filledOptions = options.filter((o) => o.trim() !== '');
    if (filledOptions.length < 2) {
      setError('Please provide at least 2 options');
      return;
    }

    if (!questionText.trim()) {
      setError('Question text is required');
      return;
    }

    if (!explanation.trim()) {
      setError('Explanation is required');
      return;
    }

    if (correct >= filledOptions.length) {
      setError('Correct answer index is invalid');
      return;
    }

    try {
      await onSave({
        question: questionText.trim(),
        options: filledOptions,
        correct,
        explanation: explanation.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save question');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question ? 'Edit Question' : 'New Question'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          rows={3}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mcd-yellow focus:border-transparent outline-none transition resize-none"
          placeholder="Enter the question text..."
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options (select the correct answer)
        </label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="correct"
                checked={correct === index}
                onChange={() => setCorrect(index)}
                className="w-4 h-4 text-mcd-red focus:ring-mcd-yellow"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mcd-yellow focus:border-transparent outline-none transition"
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          At least 2 options are required. Leave blank to use fewer options.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={4}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mcd-yellow focus:border-transparent outline-none transition resize-none"
          placeholder="Explain why this is the correct answer..."
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button disabled={isSaving} type="submit">
          {isSaving ? 'Saving...' : question ? 'Update Question' : 'Create Question'}
        </Button>
      </div>
    </form>
  );
}
