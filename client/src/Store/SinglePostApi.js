import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const SinglePostApi = createApi({
  reducerPath: 'singlePost',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    //
    singlePost: builder.query({
      query: (id) => `/single-post/${id}`,
      providesTags: ['Post'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSinglePostQuery } = SinglePostApi;
