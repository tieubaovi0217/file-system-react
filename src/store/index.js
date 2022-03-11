import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import fileBrowserSlice from './fileBrowser';

const store = configureStore({
  reducer: {
    fileBrowser: fileBrowserSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
