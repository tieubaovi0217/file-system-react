import { createSlice } from '@reduxjs/toolkit';

import { getUserFromLocalStorage } from 'common/localStorage';

const initialAuthState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: localStorage.getItem('token') ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    removeCredentials(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
