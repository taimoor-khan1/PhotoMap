import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const Content = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.GET_CONTENT, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

export default ContentServices = { Content };
