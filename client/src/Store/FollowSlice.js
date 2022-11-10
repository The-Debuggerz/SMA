import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Follow User
export const followUser = createAsyncThunk(
  'followuser/user',
  async (username) => {
    try {
      const res = await fetch('/api/follow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      let data = await res.json();
      console.log('🚀 followSlice:Data', data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Unfollow User
export const unFollowUser = createAsyncThunk(
  'unfollowuser/user',
  async (username) => {
    try {
      const res = await fetch('/api/unfollow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      let data = await res.json();
      console.log('🚀 unfollowSlice:Data', data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Get user by username
export const userprofile = createAsyncThunk(
  'profilebyname/user',
  async (username) => {
    try {
      const res = await fetch(`/api/user/${username}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      // console.log(data);

      if (res.status === 401) {
        throw new Error(res.error);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const followSlice = createSlice({
  name: 'follow',
  initialState: {
    following: [],
    followers: [],
    name: '',
    username: '',
    posts: 0,
    followStatus: false,
    loading: true,
  },
  extraReducers: {
    // User Profile
    [userprofile.pending]: (state) => {
      state.loading = true;
    },

    [userprofile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.following = payload.user.following;
      state.followers = payload.user.followers;
      state.name = payload.user.name;
      state.username = payload.user.username;
      state.followStatus = payload.followStatus;
    },

    [userprofile.rejected]: (state) => {
      state.loading = false;
    },

    // Follow User
    [followUser.pending]: (state) => {
      state.loading = true;
    },

    [followUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.following = payload.target.following;
      state.followers = payload.target.followers;
      state.followStatus = payload.followStatus;
    },

    [followUser.rejected]: (state) => {
      state.loading = false;
    },

    // Unfollow User
    [unFollowUser.pending]: (state) => {
      state.loading = true;
    },

    [unFollowUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.following = payload.target.following;
      state.followers = payload.target.followers;
      state.followStatus = payload.followStatus;
    },

    [unFollowUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export let followAction = followSlice.actions;
export default followSlice;
