import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import { ProfileApi } from './ProfileApi';
import { UsersPostApi } from './UsersPostApi';
import { SinglePostApi } from './SinglePostApi';
import { GIFApi } from './GIFApi';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [UsersPostApi.reducerPath]: UsersPostApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [SinglePostApi.reducerPath]: SinglePostApi.reducer,
    [GIFApi.reducerPath]: GIFApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      UsersPostApi.middleware,
      ProfileApi.middleware,
      SinglePostApi.middleware,
      GIFApi.middleware,
    ]),
});

export default store;
