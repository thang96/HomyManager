import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  status: null,
};
export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    updateStatus: (state, actions) => {
      state.status = actions.payload;
    },
  },
});

export const {updateStatus} = statusSlice.actions;

export const statusState = state => state?.status?.status;

export default statusSlice.reducer;
