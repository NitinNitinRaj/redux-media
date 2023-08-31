import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//dev only!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums", //same as name in slice
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await pause(1000); // for dev only
      return fetch(...args);
    },
  }), //its like axios api setup
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: { userId: user.id },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "Album", id: args.id }];
        },
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
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{ type: "Album", id: args.id }];
        },
        query: (args) => {
          return {
            url: `/albums/${args.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
