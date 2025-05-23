// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    username: null,
    lastChatId: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
    },
    setLastChat: (state, action) => {
      state.lastChatId = action.payload;
    },
    resetLastChat: (state) => {
      state.lastChatId = 'default';
    },
  },
});

export const { login, logout, setLastChat, resetLastChat  } = authSlice.actions;
export default authSlice.reducer;