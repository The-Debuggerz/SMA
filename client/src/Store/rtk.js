import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (userbyname) => `/profile/${userbyname}`,
      providesTags: ['User'],
    }),

    followUser: builder.mutation({
      query: (username) => ({
        url: `/follow`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      }),
      invalidatesTags: ['User'],
    }),

    unfollowUser: builder.mutation({
      query: (username) => ({
        url: `/unfollow`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = profileApi;
