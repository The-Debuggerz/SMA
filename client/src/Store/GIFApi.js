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
        `/categories?key=${import.meta.env.VITE_GIF_API_KEY}&client_key=${
          import.meta.env.VITE_GIF_API_CLIENT_KEY
        }`,
      providesTags: ['GIF'],
    }),

    selectedGif: builder.query({
      query: (newTerm) =>
        `/search?q=${newTerm}&key=${
          import.meta.env.VITE_GIF_API_KEY
        }&client_key=${import.meta.env.VITE_GIF_API_CLIENT_KEY}&limit=${12}`,
      providesTags: ['GIF'],
    }),
  }),
});

export const { useGetGifCategoryQuery, useLazySelectedGifQuery } = GIFApi;
