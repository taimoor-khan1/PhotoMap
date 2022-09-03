import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const Photographer = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.PHOTO_GRAPHERS, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const SinglePhotographer = (id) => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.SINGLE_PHOTO_GRAPHER,
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

export default PhotographerServices = { Photographer, SinglePhotographer };
