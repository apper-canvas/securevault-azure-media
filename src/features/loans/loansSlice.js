import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loans: [],
  applications: [],
  selectedLoan: null,
  loading: false,
  error: null,
};

const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    fetchLoansStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLoansSuccess: (state, action) => {
      state.loading = false;
      state.loans = action.payload;
    },
    fetchLoansFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    submitApplicationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitApplicationSuccess: (state, action) => {
      state.loading = false;
      state.applications = [...state.applications, action.payload];
    },
    submitApplicationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectLoan: (state, action) => {
      state.selectedLoan = action.payload;
    },
  },
});

export const { fetchLoansStart, fetchLoansSuccess, fetchLoansFailure, submitApplicationStart, submitApplicationSuccess, submitApplicationFailure, selectLoan } = loansSlice.actions;
export default loansSlice.reducer;