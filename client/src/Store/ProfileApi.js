import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const ProfileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    //
    getProfile: builder.query({
      query: (userbyname) => `/profile/${userbyname}`,
      providesTags: ['User', 'Post'],
    }),

    followUser: builder.mutation({
      query: (username) => ({
        url: `/follow`,
        method: 'PUT',
        body: {
          username: username,
        },
      }),
      invalidatesTags: ['User'],
    }),

    unfollowUser: builder.mutation({
      query: (username) => ({
        url: `/unfollow`,
        method: 'PUT',
        body: {
          username: username,
        },
      }),
      invalidatesTags: ['User'],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: `/create-post`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),

    updateProfilePic: builder.mutation({
      query: (data) => ({
        url: `/update-profile-pic`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/delete-post`,
        method: 'DELETE',
        body: {
          postID: id,
        },
      }),
      invalidatesTags: ['Post'],
    }),

    Like: builder.mutation({
      query: (postID) => ({
        url: `/like`,
        method: 'POST',
        body: {
          postID: postID,
        },
      }),
      invalidatesTags: ['User'],
    }),

    Unlike: builder.mutation({
      query: (postID) => ({
        url: `/unlike`,
        method: 'DELETE',
        body: {
          postID: postID,
        },
      }),
      invalidatesTags: ['User'],
    }),

    postComment: builder.mutation({
      query: ({ text, ...postId }) => ({
        url: `/post-comment`,
        method: 'POST',
        body: {
          text,
          ...postId,
        },
      }),
      invalidatesTags: ['Post'],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/delete-comment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useLikeMutation,
  useUnlikeMutation,
  usePostCommentMutation,
  useUpdateProfilePicMutation,
  useDeleteCommentMutation,
} = ProfileApi;
