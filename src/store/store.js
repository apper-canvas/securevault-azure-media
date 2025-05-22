import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import transactionsReducer from '../features/accounts/transactionsSlice';
import loansReducer from '../features/loans/loansSlice';
import goldReducer from '../features/gold/goldSlice';
import transfersReducer from '../features/transfers/transfersSlice';
import paymentsReducer from '../features/payments/paymentsSlice';
import supportReducer from '../features/support/supportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
    loans: loansReducer,
    gold: goldReducer,
    transfers: transfersReducer,
    payments: paymentsReducer,
    support: supportReducer
  }
});