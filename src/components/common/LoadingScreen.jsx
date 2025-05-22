import { Shield } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-900 z-50">
      <div className="flex flex-col items-center">
        <Shield className="h-16 w-16 text-primary animate-pulse" />
        <div className="mt-8 flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '450ms' }}></div>
          <div className="h-3 w-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '600ms' }}></div>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-primary dark:text-primary-light">
          Loading...
        </h2>
        <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">
          Please wait while we prepare your secure banking environment
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;