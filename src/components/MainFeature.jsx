import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Icons
const CreditCardIcon = getIcon('credit-card');
const SmartphoneIcon = getIcon('smartphone');
const IdCardIcon = getIcon('id-card');
const ArrowRightIcon = getIcon('arrow-right');
const EyeIcon = getIcon('eye');
const EyeOffIcon = getIcon('eye-off');
const ShieldCheckIcon = getIcon('shield-check');

const authMethods = [
  { id: 'phone', name: 'Phone Number', icon: SmartphoneIcon, placeholder: 'Enter your registered phone number' },
  { id: 'debit', name: 'Debit Card', icon: CreditCardIcon, placeholder: 'Enter your 16-digit debit card number' },
  { id: 'crn', name: 'CRN Number', icon: IdCardIcon, placeholder: 'Enter your Customer Reference Number' }
];

const MainFeature = () => {
  const [selectedMethod, setSelectedMethod] = useState('phone');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [securityTips, setSecurityTips] = useState([]);

  // Format based on selected method
  const formatInput = (value) => {
    if (selectedMethod === 'phone') {
      // Format phone number: (XXX) XXX-XXXX
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        let formatted = '';
        if (match[1]) formatted += `(${match[1]}`;
        if (match[2]) formatted += `) ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;
        return formatted;
      }
      return cleaned;
    } else if (selectedMethod === 'debit') {
      // Format card number: XXXX XXXX XXXX XXXX
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
      if (match) {
        let formatted = '';
        if (match[1]) formatted += match[1];
        if (match[2]) formatted += ` ${match[2]}`;
        if (match[3]) formatted += ` ${match[3]}`;
        if (match[4]) formatted += ` ${match[4]}`;
        return formatted.trim();
      }
      return cleaned;
    } else {
      // CRN number (alphanumeric)
      return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }
  };

  const handleInputChange = (e) => {
    const formatted = formatInput(e.target.value);
    setInputValue(formatted);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // First step validation
    if (!showPasswordField) {
      if (inputValue.trim() === '') {
        setErrorMessage('Please enter your authentication details');
        return;
      }
      
      // Validate based on method
      if (selectedMethod === 'phone' && !inputValue.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
        setErrorMessage('Please enter a valid phone number');
        return;
      } else if (selectedMethod === 'debit' && !inputValue.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
        setErrorMessage('Please enter a valid 16-digit card number');
        return;
      } else if (selectedMethod === 'crn' && inputValue.length < 6) {
        setErrorMessage('CRN number must be at least 6 characters');
        return;
      }
      
      // Success! Show password field
      setShowPasswordField(true);
      return;
    }
    
    // Password validation
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    
    // Success!
    toast.success('Authentication successful! Redirecting to your dashboard...');
    
    // Reset form
    setTimeout(() => {
      setInputValue('');
      setPassword('');
      setShowPasswordField(false);
    }, 2000);
  };

  // Security tips that rotate
  useEffect(() => {
    const tips = [
      "Never share your password or PIN with anyone",
      "Enable biometric authentication for extra security",
      "Check your account regularly for unauthorized transactions",
      "Use a strong, unique password for your banking app",
      "Be cautious of phishing attempts requesting your banking details",
      "Update your app regularly for the latest security features"
    ];
    
    setSecurityTips(tips);
    
    const interval = setInterval(() => {
      setSecurityTips(prevTips => {
        const firstTip = prevTips[0];
        return [...prevTips.slice(1), firstTip];
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-10"
    >
      <div className="neu-card max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheckIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Secure Login</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
            Choose your preferred authentication method
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {authMethods.map(method => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethod(method.id);
                  setInputValue('');
                  setErrorMessage('');
                  setShowPasswordField(false);
                }}
                className={`py-3 px-4 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  selectedMethod === method.id 
                    ? 'bg-primary text-white shadow-lg transform scale-105' 
                    : 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <method.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!showPasswordField ? (
              <motion.div
                key="input-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <label className="label" htmlFor="auth-input">
                  {authMethods.find(m => m.id === selectedMethod)?.name}
                </label>
                <input
                  id="auth-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={authMethods.find(m => m.id === selectedMethod)?.placeholder}
                  className="input"
                  autoComplete="off"
                />
              </motion.div>
            ) : (
              <motion.div
                key="password-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <label className="label" htmlFor="password-input">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password-input"
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    className="input pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-secondary text-sm mb-4"
            >
              {errorMessage}
            </motion.p>
          )}
          
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <span>{showPasswordField ? 'Sign In' : 'Continue'}</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={securityTips[0]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-2"
            >
              <ShieldCheckIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {securityTips[0]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default MainFeature;