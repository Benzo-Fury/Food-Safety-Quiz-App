import { useState, useEffect, useCallback } from 'react';
import { AdminLayout, QuestionForm, QuestionList } from '../components/admin';
import { LoadingSpinner, ErrorMessage, Button } from '../components/ui';
import {
  fetchAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../services/questions';
import type { QuestionRow } from '../types/database';

type ViewMode = 'list' | 'create' | 'edit';

export function AdminDashboard() {
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingQuestion, setEditingQuestion] = useState<QuestionRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const loadQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAllQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleCreate = () => {
    setEditingQuestion(null);
    setViewMode('create');
  };

  const handleEdit = (question: QuestionRow) => {
    setEditingQuestion(question);
    setViewMode('edit');
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setViewMode('list');
  };

  const handleSave = async (data: Omit<QuestionRow, 'id' | 'created_at'>) => {
    setIsSaving(true);
    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, data);
      } else {
        await createQuestion(data);
      }
      await loadQuestions();
      setViewMode('list');
      setEditingQuestion(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    setIsDeleting(id);
    try {
      await deleteQuestion(id);
      await loadQuestions();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete question');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <AdminLayout>
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-10">
          <LoadingSpinner message="Loading questions..." />
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-md p-10">
          <ErrorMessage message={error} onRetry={loadQuestions} />
        </div>
      ) : viewMode === 'list' ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
              <p className="text-gray-500 text-sm mt-1">
                {questions.length} question{questions.length !== 1 ? 's' : ''} in the quiz
              </p>
            </div>
            <Button onClick={handleCreate}>Add Question</Button>
          </div>

          {questions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <p className="text-gray-500 mb-4">No questions yet</p>
              <Button onClick={handleCreate}>Create your first question</Button>
            </div>
          ) : (
            <QuestionList
              questions={questions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          )}
        </>
      ) : (
        <QuestionForm
          question={editingQuestion}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      )}
    </AdminLayout>
  );
}
