import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';

export const userLoggedIn = createAsyncThunk('isLoggedIn/user', async () => {
  let res = await fetch('/api/isLoggedIn', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let data = await res.json();
  console.log('userLoggedIn:dispatchData', data);
  return data;
});

export const userLogout = createAsyncThunk('logout/user', async () => {
  console.log('logout function-authSlice');
  try {
    const res = await fetch('/api/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
    });

    const data = await res.json();
    console.log('login-data:', data);

    // navigate('/login', { replace: true });
    if (res.status !== 200) {
      throw new Error(res.error);
    }
  } catch (error) {
    console.log(error);
    // navigate('/login');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    id: null,
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.id = action.payload._id;
      console.log('Loggedin-state', state);
    },

    logout: (state, action) => {
      console.log(state);
      state.token = null;
      state.isLoggedIn = false;
      console.log('logout');
    },
  },
  extraReducers: {
    [userLoggedIn.pending]: (state, action) => {
      console.log('pending');
      state.loading = true;
    },
    [userLoggedIn.fulfilled]: (state, action) => {
      console.log('fulfilled');
      state.loading = false;
      state.isLoggedIn = action.payload.isLoggedIn;
      console.log('fulfilled-state', state.isLoggedIn);
    },
    [userLoggedIn.rejected]: (state, action) => {
      console.log('rejected');
      state.loading = false;
    },
    //logout
    [userLogout.pending]: (state, action) => {
      console.log('userLogout-pending');
      state.loading = true;
    },
    [userLogout.fulfilled]: (state, action) => {
      console.log('userLogout-fulfilled');
      state.loading = false;
      state.isLoggedIn = action.payload?.isLoggedIn;
      console.log('userLogout-fulfilled-state', state.isLoggedIn);
    },
    [userLogout.rejected]: (state, action) => {
      console.log('rejected');
      state.loading = false;
    },
  },
});

export let authActions = authSlice.actions;

export default authSlice;
