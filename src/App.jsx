import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sun, Moon } from 'lucide-react';
import { useSelector } from 'react-redux';

// Layout components
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingScreen from './components/common/LoadingScreen';

// Page components with lazy loading
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./features/auth/LoginScreen'));
const Register = lazy(() => import('./features/auth/RegisterScreen'));
const ForgotPassword = lazy(() => import('./features/auth/ForgotPassword'));
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AccountDetails = lazy(() => import('./features/accounts/AccountDetails'));
const TransactionHistory = lazy(() => import('./features/accounts/TransactionHistory'));
const FundTransfer = lazy(() => import('./features/transfers/FundTransfer'));
const BillPayments = lazy(() => import('./features/payments/BillPayments'));
const LoanApplication = lazy(() => import('./features/loans/LoanApplication'));
const LoansOverview = lazy(() => import('./features/loans/LoansOverview'));
const LoanDetails = lazy(() => import('./features/loans/LoanDetails'));
const GoldMortgage = lazy(() => import('./features/gold/GoldMortgage'));
const CustomerSupport = lazy(() => import('./features/support/CustomerSupport'));
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));
const UserManagement = lazy(() => import('./features/admin/UserManagement'));
const LoanApplications = lazy(() => import('./features/admin/LoanApplications'));
const UserProfile = lazy(() => import('./features/profile/UserProfile'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? savedTheme === 'dark' : prefersDark;
  });

  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200 transition-colors shadow-soft"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        toastClassName="rounded-lg shadow-lg font-medium"
      />

      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
          </Route>
          
          {/* Protected app routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/accounts/:id" element={isAuthenticated ? <AccountDetails /> : <Navigate to="/login" />} />
            <Route path="/transactions" element={isAuthenticated ? <TransactionHistory /> : <Navigate to="/login" />} />
            <Route path="/transfer" element={isAuthenticated ? <FundTransfer /> : <Navigate to="/login" />} />
            <Route path="/bill-payments" element={isAuthenticated ? <BillPayments /> : <Navigate to="/login" />} />
            
            {/* Loan routes */}
            <Route path="/loans" element={isAuthenticated ? <LoansOverview /> : <Navigate to="/login" />} />
            <Route path="/loans/apply" element={isAuthenticated ? <LoanApplication /> : <Navigate to="/login" />} />
            <Route path="/loans/:id" element={isAuthenticated ? <LoanDetails /> : <Navigate to="/login" />} />
            
            {/* Gold mortgage routes */}
            <Route path="/gold" element={isAuthenticated ? <GoldMortgage /> : <Navigate to="/login" />} />
            
            {/* Support routes */}
            <Route path="/support" element={isAuthenticated ? <CustomerSupport /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          </Route>
          
          {/* Admin routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin/users" element={isAuthenticated && user?.role === 'admin' ? <UserManagement /> : <Navigate to="/login" />} />
            <Route path="/admin/loans" element={isAuthenticated && user?.role === 'admin' ? <LoanApplications /> : <Navigate to="/login" />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;