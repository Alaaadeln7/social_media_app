import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9090/api/friends" , credentials:"include" }),
  tagTypes: ["Friend"],
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => "/",
      providesTags: ["Friend"]
    }),
    addFriend: builder.mutation({
      query: (values) => ({
        url: `/addFriend`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Friend"]
    }),
    removeFriend: builder.mutation({
      query: ({ friendId }) => ({
        url: `/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friend"]
    }),
    updateFriendStatus: builder.mutation({
      query: (values) => ({
        url: `/updateStatus`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Friend"]
    }),
    getFriendRequests: builder.query({
      query: () => "/getFriendRequests",
      providesTags: ["Friend"],
    }),
    getSuggestions: builder.query({
      query: () => `/getSuggestions`,
      providesTags: ["Friend"],
    })
  }),
});

export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
  useUpdateFriendStatusMutation,
  useGetFriendRequestsQuery,
  useGetSuggestionsQuery
} = friendsApi;
