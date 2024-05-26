import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    stepAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setName, stepAvatar } = activateSlice.actions;

export default activateSlice.reducer;
