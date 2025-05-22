import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transfers: [],
  beneficiaries: [],
  loading: false,
  error: null,
  transferType: 'IMPS', // IMPS or NEFT
};

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    fetchTransfersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransfersSuccess: (state, action) => {
      state.loading = false;
      state.transfers = action.payload;
    },
    fetchTransfersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBeneficiariesSuccess: (state, action) => {
      state.beneficiaries = action.payload;
    },
    addBeneficiarySuccess: (state, action) => {
      state.beneficiaries = [...state.beneficiaries, action.payload];
    },
    initiateTransferStart: (state) => {
      state.loading = true;
    },
    initiateTransferSuccess: (state, action) => {
      state.loading = false;
      state.transfers = [action.payload, ...state.transfers];
    },
    initiateTransferFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTransferType: (state, action) => {
      state.transferType = action.payload;
    },
  },
});

export const { fetchTransfersStart, fetchTransfersSuccess, fetchTransfersFailure, fetchBeneficiariesSuccess, addBeneficiarySuccess, initiateTransferStart, initiateTransferSuccess, initiateTransferFailure, setTransferType } = transfersSlice.actions;
export default transfersSlice.reducer;