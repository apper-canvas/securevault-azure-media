import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bills: [],
  paymentHistory: [],
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    fetchBillsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBillsSuccess: (state, action) => {
      state.loading = false;
      state.bills = action.payload;
    },
    fetchBillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    payBillStart: (state) => {
      state.loading = true;
    },
    payBillSuccess: (state, action) => {
      state.loading = false;
      state.paymentHistory = [action.payload, ...state.paymentHistory];
      state.bills = state.bills.filter(bill => bill.id !== action.payload.billId);
    },
  },
});

export const { fetchBillsStart, fetchBillsSuccess, fetchBillsFailure, payBillStart, payBillSuccess } = paymentsSlice.actions;
export default paymentsSlice.reducer;