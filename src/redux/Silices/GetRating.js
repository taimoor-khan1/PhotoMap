import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import RatingServices from "../services/Rating.servies";
const initialState = {
  data: null,
};

export const Ratings = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_RATING_REVIEWS,
  async (id, thunk) => {
    try {
      const response = await RatingServices.Rating(id);
      thunk.dispatch(RatingSlice.actions.saveDate(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);

      // throw err;
    }
  }
);
const RatingSlice = createSlice({
  name: "Ratings",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveDate } = RatingSlice.actions;
export default RatingSlice.reducer;
