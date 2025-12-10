import { supabase } from '../lib/supabase';
import type { AuditLogRow, AuditLogInsert } from '../types/database';

export async function fetchAuditLogs(): Promise<AuditLogRow[]> {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch audit logs: ${error.message}`);
  }

  return (data ?? []) as AuditLogRow[];
}

export async function createAuditLog(log: AuditLogInsert): Promise<void> {
  const { error } = await supabase.from('audit_logs').insert(log);

  if (error) {
    console.error('Failed to create audit log:', error.message);
  }
}
