import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Users, CreditCard, Home, BarChart3, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-surface-100 dark:bg-surface-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-primary text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/admin" className="text-xl font-bold">SecureVault Admin</Link>
            <button onClick={toggleSidebar} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            <Link to="/admin" className="flex items-center rounded-lg px-4 py-3 text-white hover:bg-primary-light">
              <BarChart3 className="mr-3 h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/users" className="flex items-center rounded-lg px-4 py-3 text-white hover:bg-primary-light">
              <Users className="mr-3 h-5 w-5" />
              <span>User Management</span>
            </Link>
            <Link to="/admin/loans" className="flex items-center rounded-lg px-4 py-3 text-white hover:bg-primary-light">
              <CreditCard className="mr-3 h-5 w-5" />
              <span>Loan Applications</span>
            </Link>
          </nav>

          <div className="px-4 py-6">
            <Link to="/" className="flex items-center rounded-lg px-4 py-3 text-white hover:bg-primary-light">
              <Home className="mr-3 h-5 w-5" />
              <span>Back to Main App</span>
            </Link>
            <button className="mt-4 flex w-full items-center rounded-lg px-4 py-3 text-white hover:bg-primary-light">
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;