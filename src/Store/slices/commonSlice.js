import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  commonStore: null,
  services: [],
  amenity: [],
  tenants: [],
  managers: [],
  bankAccounts: null,
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
    updateTenants: (state, actions) => {
      state.tenants = actions.payload;
    },
    updateManagers: (state, actions) => {
      state.managers = actions.payload;
    },
    updateBankAccounts: (state, actions) => {
      state.bankAccounts = actions.payload;
    },
  },
});

export const commonState = state => state?.common?.commonStore;
export const serviceState = state => state?.common?.services;
export const amenityState = state => state?.common?.amenity;
export const tenantState = state => state?.common?.tenants;
export const managerState = state => state?.common?.managers;
export const bankAccountState = state => state?.common?.bankAccounts;
export const {
  updateCommon,
  updateServices,
  updateAmenity,
  updateTenants,
  updateManagers,
  updateBankAccounts,
} = commonSlice.actions;
export default commonSlice.reducer;
