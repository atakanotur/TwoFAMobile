import {configureStore} from '@reduxjs/toolkit';

import authSlice from './auth';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
