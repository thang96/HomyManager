import {configureStore} from '@reduxjs/toolkit';
import resourceSlice from './slices/resourceSlice';
import tokenSlice from './slices/tokenSlice';
import userInfoSlice from './slices/userInfoSlice';
import commonSlice from './slices/commonSlice';

export const store = configureStore({
  reducer: {
    userInfor: userInfoSlice,
    token: tokenSlice,
    resource: resourceSlice,
    common: commonSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
