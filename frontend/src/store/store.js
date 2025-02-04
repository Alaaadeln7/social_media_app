import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import { authApiSlice } from "./api/authApiSlice";
import { postsApi } from "./api/postsApiSlice";
import { friendsApi } from "./api/friendsApiSlice";
import { messageApi } from "./api/messageApiSlice";
import { typingApiSlice } from "./api/typingApiSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [typingApiSlice.reducerPath]: typingApiSlice.reducer,
    theme: themeSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      postsApi.middleware,
      friendsApi.middleware,
      messageApi.middleware,
      typingApiSlice.middleware
    ),
});

export default store;
