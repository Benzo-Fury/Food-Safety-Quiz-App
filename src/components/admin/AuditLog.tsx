import { useState, useEffect, useCallback } from 'react';
import { fetchAuditLogs } from '../../services/auditLog';
import { LoadingSpinner, ErrorMessage } from '../ui';
import type { AuditLogRow } from '../../types/database';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString();
}

function ActionBadge({ action }: { action: AuditLogRow['action'] }) {
  const styles = {
    create: 'bg-green-100 text-green-700',
    update: 'bg-blue-100 text-blue-700',
    delete: 'bg-red-100 text-red-700',
  };

  const labels = {
    create: 'Created',
    update: 'Updated',
    delete: 'Deleted',
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded ${styles[action]}`}>
      {labels[action]}
    </span>
  );
}

export function AuditLog() {
  const [logs, setLogs] = useState<AuditLogRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAuditLogs();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit logs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10">
        <LoadingSpinner message="Loading audit logs..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10">
        <ErrorMessage message={error} onRetry={loadLogs} />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <p className="text-gray-500">No audit logs yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <ActionBadge action={log.action} />
                <span className="text-xs text-gray-400">
                  {formatDate(log.created_at)}
                </span>
              </div>
              <p className="text-gray-800 font-medium text-sm line-clamp-1">
                {log.question_text}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                by {log.user_email}
              </p>
            </div>
            <button
              onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
              className="text-xs text-gray-500 hover:text-gray-700 shrink-0"
            >
              {expandedId === log.id ? 'Hide details' : 'Show details'}
            </button>
          </div>

          {expandedId === log.id && log.changes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto text-gray-600">
                {JSON.stringify(log.changes, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
