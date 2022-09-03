import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "",
};

export const userTypeSlice = createSlice({
  name: "userType",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});
export const { setUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
