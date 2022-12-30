import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const UsersPostApi = createApi({
  reducerPath: 'followingUsersPostApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['UserPost'],
  endpoints: (builder) => ({
    //
    followingUsersPost: builder.query({
      query: () => `/followingUsersPost`,
      providesTags: ['UserPost'],
    }),

    Like: builder.mutation({
      query: (postID) => ({
        url: `/like`,
        method: 'POST',
        body: {
          postID: postID,
        },
      }),
      invalidatesTags: ['UserPost'],
    }),

    Unlike: builder.mutation({
      query: (postID) => ({
        url: `/unlike`,
        method: 'DELETE',
        body: {
          postID: postID,
        },
      }),
      invalidatesTags: ['UserPost'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/delete-post`,
        method: 'DELETE',
        body: {
          postID: id,
        },
      }),
      invalidatesTags: ['UserPost'],
    }),

    editPost: builder.query({
      query: (id) => `/edit-post/${id}`,
      providesTags: ['UserPost'],
    }),

    postEditPost: builder.mutation({
      query: ({ id, ...text }) => ({
        url: `/edit-post`,
        method: 'PUT',
        body: {
          id,
          ...text,
        },
      }),
      invalidatesTags: ['UserPost'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFollowingUsersPostQuery,
  useLikeMutation,
  useUnlikeMutation,
  useDeletePostMutation,
  useEditPostQuery,
  usePostEditPostMutation,
} = UsersPostApi;
