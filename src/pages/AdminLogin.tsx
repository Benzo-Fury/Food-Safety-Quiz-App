import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/admin';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/ui';

export function AdminLogin() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mcd-yellow to-mcd-red p-5 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-2xl p-10">
          <LoadingSpinner message="Loading..." />
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return <LoginForm />;
}
