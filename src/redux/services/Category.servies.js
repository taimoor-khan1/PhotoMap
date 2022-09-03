import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const Category = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.CATEGORY, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const CategoryByVender = (id) => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.GET_CATEGORY_BY_VENDER,
      {
        params: { categoryID: id },
        headers: {
          Authorization: store.getState().Auth.accessToken,
        },
      }
    )
    .then(onSuccess)
    .catch(onFailure);
};

export default CategoryServices = { Category, CategoryByVender };
