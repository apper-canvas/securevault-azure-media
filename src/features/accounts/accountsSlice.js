import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    fetchAccountsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAccountsSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
    },
    fetchAccountsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const { fetchAccountsStart, fetchAccountsSuccess, fetchAccountsFailure, selectAccount } = accountsSlice.actions;
export default accountsSlice.reducer;