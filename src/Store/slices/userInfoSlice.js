import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  userInfor: [],
};
export const userInforSlice = createSlice({
  name: 'userInfor',
  initialState,
  reducers: {
    updateUserInfor: (state, actions) => {
      state.userInfor = actions.payload;
      // state.user = [...current(state.user), actions.payload];
    },
  },
});

export const {updateUserInfor} = userInforSlice.actions;

export default userInforSlice.reducer;
