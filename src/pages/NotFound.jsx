import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const AlertTriangleIcon = getIcon('alert-triangle');
const HomeIcon = getIcon('home');

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full neu-card"
      >
        <AlertTriangleIcon className="w-16 h-16 mx-auto mb-6 text-secondary" />
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn btn-primary inline-flex items-center justify-center gap-2 w-full">
          <HomeIcon className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;