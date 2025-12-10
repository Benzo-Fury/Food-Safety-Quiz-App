import { supabase } from '../lib/supabase';
import type { Question } from '../types/quiz';
import type { QuestionRow } from '../types/database';
import { createAuditLog } from './auditLog';

interface AuditUser {
  id: string;
  email: string;
}

export async function fetchQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('question, options, correct, explanation')
    .order('id');

  if (error) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }

  return (data ?? []) as Question[];
}

export async function fetchAllQuestions(): Promise<QuestionRow[]> {
  const { data, error } = await supabase.from('questions').select('*').order('id');

  if (error) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }

  return (data ?? []) as QuestionRow[];
}

export async function fetchQuestionById(id: number): Promise<QuestionRow | null> {
  const { data, error } = await supabase.from('questions').select('*').eq('id', id).single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch question: ${error.message}`);
  }

  return data as QuestionRow;
}

export async function createQuestion(
  question: Omit<QuestionRow, 'id' | 'created_at'>,
  user: AuditUser
): Promise<QuestionRow> {
  const { data, error } = await supabase.from('questions').insert(question).select().single();

  if (error) {
    throw new Error(`Failed to create question: ${error.message}`);
  }

  const created = data as QuestionRow;

  await createAuditLog({
    action: 'create',
    question_id: created.id,
    question_text: created.question,
    changes: { question: created },
    user_id: user.id,
    user_email: user.email,
  });

  return created;
}

export async function updateQuestion(
  id: number,
  updates: Partial<Omit<QuestionRow, 'id' | 'created_at'>>,
  user: AuditUser
): Promise<QuestionRow> {
  const oldQuestion = await fetchQuestionById(id);

  const { data, error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update question: ${error.message}`);
  }

  const updated = data as QuestionRow;

  await createAuditLog({
    action: 'update',
    question_id: id,
    question_text: updated.question,
    changes: { before: oldQuestion, after: updated },
    user_id: user.id,
    user_email: user.email,
  });

  return updated;
}

export async function deleteQuestion(id: number, user: AuditUser): Promise<void> {
  const question = await fetchQuestionById(id);

  const { error } = await supabase.from('questions').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete question: ${error.message}`);
  }

  if (question) {
    await createAuditLog({
      action: 'delete',
      question_id: id,
      question_text: question.question,
      changes: { deleted: question },
      user_id: user.id,
      user_email: user.email,
    });
  }
}
