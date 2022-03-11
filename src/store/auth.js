import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isAuthenticating: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    setIsAuthenticating(state, action) {
      state.isAuthenticating = action.payload;
    },

    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
