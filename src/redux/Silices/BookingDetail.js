import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";

import BookingDetailServices from "../services/BookingDetail.servies";
const initialState = {
  data: [],
};

export const BookingDetail = createAsyncThunk(
  CONSTANTS.API_CALLS.BOOKING_Details,
  async (dunnydata, thunk) => {
    try {
      const response = await BookingDetailServices.BookingDetail();
      thunk.dispatch(
        BookingDetailSlice.actions.saveDate(response.data.booking)
      );
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const BookingDetailSlice = createSlice({
  name: "BookingDetail",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveDate } = BookingDetailSlice.actions;
export default BookingDetailSlice.reducer;
