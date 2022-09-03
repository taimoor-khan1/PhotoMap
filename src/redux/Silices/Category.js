import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import CategoryServices from "../services/Category.servies";
const initialState = {
  data: null,
};

export const Category = createAsyncThunk(
  CONSTANTS.API_CALLS.CATEGORY,
  async (dunnydata, thunk) => {
    try {
      const response = await CategoryServices.Category();
      thunk.dispatch(CategorySlice.actions.saveDate(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
export const CategoryByVendor = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_CATEGORY_BY_VENDER,
  async (id, thunk) => {
    try {
      const response = await CategoryServices.CategoryByVender(id);
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveDate } = CategorySlice.actions;
export default CategorySlice.reducer;
