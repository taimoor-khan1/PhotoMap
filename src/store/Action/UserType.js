import { USER_TYPE } from "../ActionType";

export const setSelectedUser = (userType) => {
  return (dispatch) => {
    dispatch({
      type: USER_TYPE,
      userType: userType,
    });
  };
};
