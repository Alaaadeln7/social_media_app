import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  onlineUsers: [],
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    }
  },
});

export const { setUsers, setSelectedUser } =
  usersSlice.actions;
export default usersSlice.reducer;
