import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const profile = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.GET_PROFILE, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};
const GetVendorprofile = (id) => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.GET_VENDOR_PROFILE,
      {
        headers: {
          Authorization: store.getState().Auth.accessToken,
        },
      }
    )
    .then(onSuccess)
    .catch(onFailure);
};

const authProfile = {
  profile,
  GetVendorprofile,
};

export default authProfile;
