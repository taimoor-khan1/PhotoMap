import axios from "axios";
import { CONSTANTS } from "../../constants";
import { store } from "../store";

const BookingDetail = () => {
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.BOOKING_Details, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

export default BookingDetailServices = { BookingDetail };
