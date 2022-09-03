import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const Rating = (id) => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.GET_RATING_REVIEWS,

      {
        params: { vendorID: id },
        headers: {
          Authorization: store.getState().Auth.accessToken,
        },
      }
    )
    .then(onSuccess)
    .catch(onFailure);
};

export default RatingServices = { Rating };
