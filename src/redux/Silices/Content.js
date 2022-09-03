import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import ContentServices from "../services/Content.servies";
const initialState = {
  data: null,
};

export const Conetnt = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_CONTENT,
  async (dunnydata, thunk) => {
    try {
      const response = await ContentServices.Content();
      thunk.dispatch(ContentSlice.actions.saveDate(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const ContentSlice = createSlice({
  name: "Content",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveDate } = ContentSlice.actions;
export default ContentSlice.reducer;
