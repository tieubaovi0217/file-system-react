import { configureStore } from '@reduxjs/toolkit';

import authSlice from '../slices/auth';
import fileBrowserSlice from '../slices/fileBrowser';

const store = configureStore({
  reducer: {
    fileBrowser: fileBrowserSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
