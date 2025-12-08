import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="text-red-500 text-5xl mb-4">!</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>Try Again</Button>
      )}
    </div>
  );
}
