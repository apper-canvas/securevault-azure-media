import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatHistory: [],
  supportTickets: [],
  loading: false,
  error: null,
  activeChatSession: null,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    fetchChatHistorySuccess: (state, action) => {
      state.chatHistory = action.payload;
    },
    fetchSupportTicketsSuccess: (state, action) => {
      state.supportTickets = action.payload;
    },
    sendMessageStart: (state) => {
      state.loading = true;
    },
    sendMessageSuccess: (state, action) => {
      state.loading = false;
      state.chatHistory = [...state.chatHistory, action.payload];
    },
    createSupportTicketSuccess: (state, action) => {
      state.supportTickets = [...state.supportTickets, action.payload];
    },
  },
});

export const { fetchChatHistorySuccess, fetchSupportTicketsSuccess, sendMessageStart, sendMessageSuccess, createSupportTicketSuccess } = supportSlice.actions;
export default supportSlice.reducer;