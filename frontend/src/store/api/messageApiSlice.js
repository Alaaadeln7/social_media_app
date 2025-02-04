import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { socket } from "../../utils/socket";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/api/chat/",
    credentials: "include",
  }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (receiverId) => `/${receiverId}`,
      providesTags: ["Message"],
    }),
    sendMessage: builder.mutation({
      query: (values) => ({
        url: `/send/${values.receiverId}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;