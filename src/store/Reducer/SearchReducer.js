import { SEARCH_LOCATION, SHOW_BOTTOM_SHEET } from "../ActionType";

const initialState = {
  Searchlocation: null,
  ShowBottomSheet: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_LOCATION:
      return {
        ...state,
        Searchlocation: action.Searchlocation,
      };
    case SHOW_BOTTOM_SHEET:
      return {
        ...state,
        ShowBottomSheet: action.ShowBottomSheet,
      };

    default:
      return state;
  }
};
