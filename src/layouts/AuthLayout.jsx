import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary to-primary-dark">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center text-white">
            <Shield className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">SecureVault</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;