import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/questions';
import type { Question } from '../types/quiz';

interface UseQuestionsResult {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
}

export function useQuestions(): UseQuestionsResult {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchQuestions();
        if (!cancelled) {
          setQuestions(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load questions');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { questions, isLoading, error };
}
