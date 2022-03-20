import { createSlice } from '@reduxjs/toolkit';

const initialFileBrowserState = {
  data: [],
  totalSize: 0,
  path: localStorage.getItem('currentPath')
    ? localStorage.getItem('currentPath')
    : '',
};

const fileBrowserSlice = createSlice({
  name: 'fileBrowser',
  initialState: initialFileBrowserState,
  reducers: {
    setData(state, action) {
      state.path = action.payload.path;
      state.data = action.payload.data;
      state.totalSize = action.payload.totalSize;
    },

    popPath(state) {
      if (state.path.length > 0) {
        state.path = state.path.substring(0, state.path.lastIndexOf('/'));
      }
    },
  },
});

export const fileBrowserActions = fileBrowserSlice.actions;

export default fileBrowserSlice;
