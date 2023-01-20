import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postComment = createAsyncThunk(
  'comments/postComment',
  async (data) => {
    const response = await fetch('/api/post-comment', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let resData = await response.json();
    console.log('🚀 ~ file: Comm.js:17 ~ resData', resData);

    return resData;
  }
);

const comm = createSlice({
  name: 'comm',
  initialState: { comments: [], status: 'idle', error: null, loading: false },
  reducers: {
    doComment: (state, action) => {
      console.log('🚀 Comm.js:29 ~ state', state);
      console.log('🚀 Comm.js:30 ~ action', action);

      //   state.comments = [...state.comments, action.payload];
    },
  },
  extraReducers: {
    [postComment.pending]: (state) => {
      state.loading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("🚀 Comm.js:49 ~ state", state)
      console.log("🚀 Comm.js:49 ~ action", action)
      // state.isLoggedIn = action.payload.isLoggedIn;
      // state.username = action.payload.username;
      // state.id = action.payload._id;
      state.comments = action.payload;
    },
    [postComment.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export let CommActions = comm.actions;
export default comm;
