import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9090/api/" , credentials:"include"}),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({ page, limit }) => `posts/?page=${page}&limit=${limit}`,
      providesTags: ["Post"],
      serializeQueryArgs: ({ endpointName }) => endpointName, 
      merge: (currentCache, newItems) => {
        if (newItems.posts) {
          currentCache.posts.push(...newItems.posts);
          currentCache.hasMore = newItems.hasMore;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getAllPostsFromUser: builder.query({
      query: (userId) => `posts/${userId}`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (values) => ({
        url: "posts/create",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (values) => ({
        url: "posts/update",
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts/delete/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    toggleLike: builder.mutation({
      query: (values) => ({
        url: "/like",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    createComment: builder.mutation({
      query: (values) => ({
        url: "/comment/create",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `comment/delete/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    updateComment: builder.mutation({
      query: ({ values }) => ({
        url: "/comment/update",
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    checkFollowing: builder.query({
      query: (receiverFollowingId) => `/follow/${receiverFollowingId}`,
      providesTags: ["Post"],
    }),
    makeFollow: builder.mutation({
      query: (receiverFollowingId) => ({
        url: `/follow/`,
        method: "POST",
        body: { receiverFollowingId },
      }),
      invalidatesTags: ["Post", "User"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetAllPostsFromUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useToggleLikeMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useCheckFollowingQuery,
  useMakeFollowMutation
} = postsApi;
