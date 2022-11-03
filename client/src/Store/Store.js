import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import FollowSlice from './FollowSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    follow: FollowSlice.reducer,
  },
});

export default store;
