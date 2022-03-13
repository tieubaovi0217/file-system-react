import { createSlice } from '@reduxjs/toolkit';

const initialFileBrowserState = {
  data: [],
  filteredData: [],
  path: '',
};

const fileBrowserSlice = createSlice({
  name: 'fileBrowser',
  initialState: initialFileBrowserState,
  reducers: {
    setData(state, action) {
      state.path = action.payload.path;
      state.data = action.payload.data;
      state.filteredData = action.payload.data;
    },

    filterData(state, action) {
      if (action.payload.trim().length === 0) state.filteredData = state.data;
      console.log('here');
      state.filteredData = state.filteredData.filter((item) =>
        item.name.startsWith(action.payload),
      );
    },
  },
});

export const fileBrowserActions = fileBrowserSlice.actions;

export default fileBrowserSlice;
