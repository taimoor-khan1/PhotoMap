import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import NotificationServices from "../services/Notification.servies";
const initialState = {
  data: null,
};

export const Notification = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_NOTIFICATION,
  async (dunnydata, thunk) => {
    try {
      const response = await NotificationServices.Notification();
      thunk.dispatch(NotificationSlice.actions.saveDate(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveDate } = NotificationSlice.actions;
export default NotificationSlice.reducer;
