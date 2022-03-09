import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    logout(state) {
      localStorage.removeItem('token');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
