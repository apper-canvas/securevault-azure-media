import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  filters: {
    startDate: null,
    endDate: null,
    type: 'all',
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    fetchTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    fetchTransactionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure, updateFilters } = transactionsSlice.actions;
export default transactionsSlice.reducer;