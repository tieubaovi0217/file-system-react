import { createSlice } from '@reduxjs/toolkit';

const initialFileBrowserState = {
  data: [],
  path: localStorage.getItem('currentPath') || '',
};

const fileBrowserSlice = createSlice({
  name: 'fileBrowser',
  initialState: initialFileBrowserState,
  reducers: {
    setData(state, action) {
      state.path = action.payload.path;
      state.data = action.payload.data;
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
