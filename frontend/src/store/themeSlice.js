import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: localStorage.getItem("chat-theme") || "light",
};
const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("chat-theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
