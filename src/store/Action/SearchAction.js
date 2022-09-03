import { SEARCH_LOCATION, SHOW_BOTTOM_SHEET } from "../ActionType";

export const setSearchLocation = (Searchlocation) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_LOCATION,
      Searchlocation: Searchlocation,
    });
  };
};
export const setShowFilterBottomSheet = (ShowBottomSheet) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_BOTTOM_SHEET,
      ShowBottomSheet: ShowBottomSheet,
    });
  };
};
