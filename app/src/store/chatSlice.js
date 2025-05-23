import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastChatId: 'default', // ID чата по умолчанию
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLastChat: (state, action) => {
      state.lastChatId = action.payload;
    },
    resetLastChat: (state) => {
      state.lastChatId = 'default';
    },
  },
});

export const { setLastChat, resetLastChat } = chatSlice.actions;
export default chatSlice.reducer;