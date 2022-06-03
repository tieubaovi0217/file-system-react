import { configureStore } from '@reduxjs/toolkit';

import authSlice from 'slices/auth';
import fileSlice from 'slices/file';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    file: fileSlice.reducer,
  },
});

export default store;
