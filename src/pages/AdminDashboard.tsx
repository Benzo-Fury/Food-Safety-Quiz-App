import { useState, useEffect, useCallback } from 'react';
import { AdminLayout, QuestionForm, QuestionList, AuditLog } from '../components/admin';
import { LoadingSpinner, ErrorMessage, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../services/questions';
import type { QuestionRow } from '../types/database';

type Tab = 'questions' | 'audit';
type ViewMode = 'list' | 'create' | 'edit';

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'bg-mcd-red text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('questions');
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
    if (tab === 'questions') {
      loadQuestions();
    }
  }, [loadQuestions, tab]);

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
    if (!user) return;

    const auditUser = { id: user.id, email: user.email ?? 'unknown' };

    setIsSaving(true);
    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, data, auditUser);
      } else {
        await createQuestion(data, auditUser);
      }
      await loadQuestions();
      setViewMode('list');
      setEditingQuestion(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this question?')) return;

    const auditUser = { id: user.id, email: user.email ?? 'unknown' };

    setIsDeleting(id);
    try {
      await deleteQuestion(id, auditUser);
      await loadQuestions();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete question');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setViewMode('list');
    setEditingQuestion(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-2 mb-6">
        <TabButton active={tab === 'questions'} onClick={() => handleTabChange('questions')}>
          Questions
        </TabButton>
        <TabButton active={tab === 'audit'} onClick={() => handleTabChange('audit')}>
          Audit Log
        </TabButton>
      </div>

      {tab === 'audit' ? (
        <AuditLog />
      ) : isLoading ? (
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
