import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import { profileApi } from './rtk';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});

export default store;
