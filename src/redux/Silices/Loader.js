import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Loading: false,
};

export const LoadingSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    show: (state) => {
      state.Loading = true;
    },
    hide: (state) => {
      state.Loading = false;
    },
  },
});

export const { show, hide } = LoadingSlice.actions;
export default LoadingSlice.reducer;
