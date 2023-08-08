import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints
export const GIFApi = createApi({
  reducerPath: 'GIFApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tenor.googleapis.com/v2' }),
  tagTypes: ['GIF'],
  //
  endpoints: (builder) => ({
    //
    getGifCategory: builder.query({
      query: () =>
        `/categories?key=AIzaSyA_txpXQGN4Y9jWf0tqjbrRfy-ng4zrp4c&client_key=thedebuggerssma`,
      providesTags: ['GIF'],
    }),

    selectedGif: builder.query({
      query: (newTerm) =>
        `/search?q=${newTerm}&key=AIzaSyA_txpXQGN4Y9jWf0tqjbrRfy-ng4zrp4c&client_key=thedebuggerssma&limit=${12}`,
      providesTags: ['GIF'],
    }),
  }),
});

export const { useGetGifCategoryQuery, useLazySelectedGifQuery } = GIFApi;
