import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import authProfile from "../services/Profile.servies";

const initialState = {
  data: null,
  vendordata: null,
};

export const Profile = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_PROFILE,

  async ({ dummydata }, thunk) => {
    try {
      const response = await authProfile.profile("");
      thunk.dispatch(profileSlice.actions.saveData(response.data));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
export const GetVendorprofile = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_VENDOR_PROFILE,

  async (dummy, thunk) => {
    try {
      const response = await authProfile.GetVendorprofile();
      thunk.dispatch(profileSlice.actions.saveVendorData(response.data));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      console.log("err yaha hy", err);
      // throw err;
    }
  }
);
export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.data = action.payload;
    },
    saveVendorData: (state, action) => {
      state.vendordata = action.payload;
    },
  },
});
export const { saveData, saveVendorData } = profileSlice.actions;
export default profileSlice.reducer;
