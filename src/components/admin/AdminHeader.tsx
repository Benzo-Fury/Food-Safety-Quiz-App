import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui';

export function AdminHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-mcd-red text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/admin" className="text-xl font-bold hover:opacity-90 transition">
            Quiz Admin
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/admin"
              className="text-white/80 hover:text-white transition text-sm"
            >
              Questions
            </Link>
            <Link
              to="/"
              className="text-white/80 hover:text-white transition text-sm"
            >
              View Quiz
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/80">{user?.email}</span>
          <Button variant="secondary" onClick={signOut} className="text-sm py-2 px-4">
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
