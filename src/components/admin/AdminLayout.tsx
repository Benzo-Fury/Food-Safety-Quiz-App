import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
