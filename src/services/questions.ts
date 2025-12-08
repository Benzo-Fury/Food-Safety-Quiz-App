import { supabase } from '../lib/supabase';
import type { Question } from '../types/quiz';
import type { QuestionRow } from '../types/database';

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
  question: Omit<QuestionRow, 'id' | 'created_at'>
): Promise<QuestionRow> {
  const { data, error } = await supabase.from('questions').insert(question).select().single();

  if (error) {
    throw new Error(`Failed to create question: ${error.message}`);
  }

  return data as QuestionRow;
}

export async function updateQuestion(
  id: number,
  updates: Partial<Omit<QuestionRow, 'id' | 'created_at'>>
): Promise<QuestionRow> {
  const { data, error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update question: ${error.message}`);
  }

  return data as QuestionRow;
}

export async function deleteQuestion(id: number): Promise<void> {
  const { error } = await supabase.from('questions').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete question: ${error.message}`);
  }
}
