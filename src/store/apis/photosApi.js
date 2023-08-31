import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => ({ type: "Photo", id: photo.id }));
          tags.push({ type: "PhotosAlbum", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            method: "GET",
            url: "/photos",
            params: { albumId: album.id },
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => [
          { type: "PhotosAlbum", id: photo.albumId },
        ],
        query: (photo) => {
          return {
            method: "POST",
            url: "/photos",
            body: { url: photo.url, albumId: photo.albumId },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => [
          { type: "Photo", id: photo.id },
        ],
        query: (photo) => {
          return { method: "DELETE", url: `/photos/${photo.id}` };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
