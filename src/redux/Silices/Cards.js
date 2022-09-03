import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import CardsServices from "../services/Cards.servies";

const initialState = {
  data: null,
};

export const Cards = createAsyncThunk(
  CONSTANTS.API_CALLS.GET_CARDS,
  async (dunnydata, thunk) => {
    try {
      const response = await CardsServices.Cards();
      thunk.dispatch(CardsSlice.actions.saveDate(response.data));
      return response.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);
const CardsSlice = createSlice({
  name: "Cards",
  initialState,
  reducers: {
    saveDate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { saveDate } = CardsSlice.actions;
export default CardsSlice.reducer;
