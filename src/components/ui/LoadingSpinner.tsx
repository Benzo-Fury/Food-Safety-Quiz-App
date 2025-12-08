interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-mcd-red rounded-full animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
