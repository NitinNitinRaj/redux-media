import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums", //same as name in slice
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }), //its like axios api setup
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: ["Album"],
        query: (user) => {
          return {
            url: "/albums",
            params: { userId: user.id },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: ["Album"],
        query: (args) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: args.id,
              title: args.title,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
