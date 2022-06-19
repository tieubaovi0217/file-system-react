import { createSlice } from '@reduxjs/toolkit';

const initialFileState = {
  type: '',
  url: '',
  name: '',
  isModalVisible: false,
};

const fileSlice = createSlice({
  name: 'file',
  initialState: initialFileState,
  reducers: {
    setFile(state, action) {
      state.type = action.payload.type;
      state.url = action.payload.url;
      state.isModalVisible = true;
      state.name = action.payload.name;
    },

    closeModal(state, action) {
      state.type = '';
      state.url = '';
      state.isModalVisible = false;
      state.name = '';
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice;
