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

    setUserAvatarURL(state, action) {
      state.user.avatarUrl = action.payload;
    },

    setContactInfo(state, { payload }) {
      state.user.phoneNumber = payload.phoneNumber;
      state.user.address = payload.address;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
