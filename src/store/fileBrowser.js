import { createSlice } from '@reduxjs/toolkit';

const initialFileBrowserState = {
  data: [],
  url: '',
  isLoading: false,
};

const fileBrowserSlice = createSlice({
  name: 'fileBrowser',
  initialState: initialFileBrowserState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },

    setUrl(state, action) {
      state.url = action.payload;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const fileBrowserActions = fileBrowserSlice.actions;

export default fileBrowserSlice;
