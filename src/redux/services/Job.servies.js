import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const RecentJobs = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.RECENT_JOBS, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const AppliedJobs = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.APPLIED_JOB_LIST, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};
const BestJobs = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.BEST_JOBS, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

export default JobServices = { RecentJobs, AppliedJobs, BestJobs };
