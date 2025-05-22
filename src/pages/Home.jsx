import { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import { toast } from 'react-toastify';

const ShieldLockIcon = getIcon('shield-lock');
const FingerPrintIcon = getIcon('fingerprint');
const BankIcon = getIcon('landmark');

const Home = () => {
  const [accountBalance, setAccountBalance] = useState(12567.89);

  const handleQuickAction = (action) => {
    toast.success(`${action} action initiated successfully!`);
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-primary py-6 md:py-8">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldLockIcon className="w-7 h-7 text-white" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">SecureVault</h1>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FingerPrintIcon className="w-6 h-6" />
              <span className="hidden md:inline font-medium">Biometric ID</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mt-6 md:mt-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <BankIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Account Overview</h2>
          </div>

          <div className="glass rounded-2xl p-6 mb-6">
            <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">Available Balance</p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            
            <div className="grid grid-cols-3 gap-3 mt-4">
              {['Transfer', 'Pay Bills', 'Add Money'].map((action) => (
                <button 
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className="btn-primary py-2 px-3 text-sm rounded-lg"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        <MainFeature />
      </main>
    </div>
  );
};

export default Home;