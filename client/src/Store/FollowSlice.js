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
        // console.log(data.message);
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw new Error(error);
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
    userProfileLoading: true,
    // message: '',
  },
  extraReducers: {
    // User Profile
    [userprofile.pending]: (state) => {
      state.userProfileLoading = true;
    },

    [userprofile.fulfilled]: (state, { payload }) => {
      state.userProfileLoading = false;
      state.following = payload.user.following;
      state.followers = payload.user.followers;
      state.name = payload.user.name;
      state.username = payload.user.username;
      state.followStatus = payload.followStatus;
    },

    [userprofile.rejected]: (state, { error }) => {
      state.userProfileLoading = false;
      state.message = error.message;
    },

    // Follow User
    [followUser.pending]: (state) => {
      state.userProfileLoading = true;
    },

    [followUser.fulfilled]: (state, { payload }) => {
      state.userProfileLoading = false;
      state.following = payload.target.following;
      state.followers = payload.target.followers;
      state.followStatus = payload.followStatus;
    },

    [followUser.rejected]: (state) => {
      state.userProfileLoading = false;
    },

    // Unfollow User
    [unFollowUser.pending]: (state) => {
      state.userProfileLoading = true;
    },

    [unFollowUser.fulfilled]: (state, { payload }) => {
      state.userProfileLoading = false;
      state.following = payload.target.following;
      state.followers = payload.target.followers;
      state.followStatus = payload.followStatus;
    },

    [unFollowUser.rejected]: (state) => {
      state.userProfileLoading = false;
    },
  },
});

export let followAction = followSlice.actions;
export default followSlice;
