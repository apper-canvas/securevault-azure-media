import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goldLoans: [],
  goldRate: null,
  loading: false,
  error: null,
};

const goldSlice = createSlice({
  name: 'gold',
  initialState,
  reducers: {
    fetchGoldLoansStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGoldLoansSuccess: (state, action) => {
      state.loading = false;
      state.goldLoans = action.payload;
    },
    fetchGoldLoansFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchGoldRateSuccess: (state, action) => {
      state.goldRate = action.payload;
    },
    applyGoldLoanStart: (state) => {
      state.loading = true;
    },
    applyGoldLoanSuccess: (state, action) => {
      state.loading = false;
      state.goldLoans = [...state.goldLoans, action.payload];
    },
  },
});

export const { fetchGoldLoansStart, fetchGoldLoansSuccess, fetchGoldLoansFailure, fetchGoldRateSuccess, applyGoldLoanStart, applyGoldLoanSuccess } = goldSlice.actions;
export default goldSlice.reducer;