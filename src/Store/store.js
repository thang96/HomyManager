import {configureStore} from '@reduxjs/toolkit';
import resourceSlice from './slices/resourceSlice';
import tokenSlice from './slices/tokenSlice';
import userInfoSlice from './slices/userInfoSlice';
import commonSlice from './slices/commonSlice';
import statusSlice from './slices/statusSlice';

export const store = configureStore({
  reducer: {
    userInfor: userInfoSlice,
    token: tokenSlice,
    resource: resourceSlice,
    common: commonSlice,
    status: statusSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
