import { CONSTANTS, SCREENS } from "../../constants";
import { USER_TYPE } from "../ActionType";

const initialState = {
  userType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE:
      return {
        ...state,
        userType: action.userType,
      };

    default:
      return state;
  }
};
