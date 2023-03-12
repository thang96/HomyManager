import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  commonStore: null,
  services: [],
  amenity: [],
};
export const commonSlice = createSlice({
  name: 'commonStore',
  initialState,
  reducers: {
    updateCommon: (state, actions) => {
      state.commonStore = actions.payload;
    },
    updateServices: (state, actions) => {
      state.services = actions.payload;
    },
    updateAmenity: (state, actions) => {
      state.amenity = actions.payload;
    },
  },
});

export const commonState = state => state?.common?.commonStore;
export const serviceState = state => state?.common?.services;
export const amenityState = state => state?.common?.amenity;
export const {updateCommon, updateServices, updateAmenity} =
  commonSlice.actions;
export default commonSlice.reducer;
