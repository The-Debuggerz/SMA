import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import { ProfileApi } from './ProfileApi';
import { UsersPostApi } from './UsersPostApi';
import { SinglePostApi } from './SinglePostApi';
import { GIFApi } from './GIFApi';
import { AllPostApi } from './AllPosts';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [UsersPostApi.reducerPath]: UsersPostApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [SinglePostApi.reducerPath]: SinglePostApi.reducer,
    [GIFApi.reducerPath]: GIFApi.reducer,
    [AllPostApi.reducerPath]: AllPostApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      UsersPostApi.middleware,
      ProfileApi.middleware,
      SinglePostApi.middleware,
      GIFApi.middleware,
      AllPostApi.middleware,
    ]),
});

export default store;
