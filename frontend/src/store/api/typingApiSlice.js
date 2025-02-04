import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { socket, subscribeToTyping, unsubscribeFromTyping } from '../../utils/socket';

export const typingApiSlice = createApi({
  reducerPath: 'typingApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:9090/api',
    credentials: 'include'
  }),
  tagTypes: ['Typing'],
  endpoints: (builder) => ({
    getTypingStatus: builder.query({
      query: (conversationId) => `/typing/${conversationId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const handleTyping = (data) => {
            updateCachedData((draft) => {
              const { conversationId, userId, isTyping } = data;
              return {
                ...draft,
                [userId]: isTyping
              };
            });
          };

          subscribeToTyping(handleTyping);

          await cacheEntryRemoved;
          unsubscribeFromTyping();
        } catch (err) {
          console.error('Error in typing status subscription:', err);
        }
      },
    }),
  }),
});

export const { useGetTypingStatusQuery } = typingApiSlice;
