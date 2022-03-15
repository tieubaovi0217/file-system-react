import { createSlice } from '@reduxjs/toolkit';

const initialFileBrowserState = {
  data: [],
  filteredData: [],
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
      state.data = [...action.payload.data];
      state.filteredData = [...action.payload.data];
      state.totalSize = action.payload.totalSize;

      localStorage.setItem('currentPath', state.path);
    },

    filterData(state, action) {
      if (action.payload.trim().length === 0)
        state.filteredData = [...state.data];

      state.filteredData = state.data.filter((item) =>
        item.name.startsWith(action.payload),
      );
    },
  },
});

export const fileBrowserActions = fileBrowserSlice.actions;

export default fileBrowserSlice;
