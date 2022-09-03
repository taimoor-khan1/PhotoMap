import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import PhotographerServices from "../services/Photographers.servies";

const initialState = {
  data: null,
  SingleData: null,
};

export const Photographers = createAsyncThunk(
  CONSTANTS.API_CALLS.PHOTO_GRAPHERS,
  async (dunnydata, thunk) => {
    try {
      const response = await PhotographerServices.Photographer("");

      thunk.dispatch(PhotographersSlice.actions.saveDate(response.data));

      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
export const SinglePhotoGrapher = createAsyncThunk(
  CONSTANTS.API_CALLS.SINGLE_PHOTO_GRAPHER,
  async (id, thunk) => {
    try {
      const response = await PhotographerServices.SinglePhotographer(id);
      thunk.dispatch(PhotographersSlice.actions.saveSingleDate(response.data));

      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const PhotographersSlice = createSlice({
  name: "Photographers",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
    saveSingleDate: (state, action) => {
      state.SingleData = action.payload;
    },
  },
});

export const { saveDate } = PhotographersSlice.actions;
export default PhotographersSlice.reducer;
