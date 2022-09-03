import axios from 'axios';
import {CONSTANTS, SCREENS} from '../../constants';
import utils from '../../utils';
import {store} from '../store';
import {useNavigation} from '@react-navigation/native';

const login = (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', 2);

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    console.log('errrrrrr=========>', error);
    throw error;
  };

  return axios
    .post(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.LOGIN, formData)
    .then(onSuccess)
    .catch(onFailure);

  return fetch(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.LOGIN, {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(onSuccess)
    .catch(onFailure);
};

const Vendorlogin = (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', 5);

  const onSuccess = ({data}) => {
    console.log(data);
    return data;
  };

  const onFailure = error => {
    console.log('errrrrrr=========> vendor', error);
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.VENDOR_LOGIN,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);

  return fetch(
    CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.VENDOR_LOGIN,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(onSuccess)
    .catch(onFailure);
};

const Applelogin = (name, email, idToken) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('social_token', social_token);
  formData.append('verified_by', 'apple');

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.APPLE_LOGIN,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};
const Facebooklogin = (name, email, social_token) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('social_token', social_token);
  formData.append('verified_by', 'facebook');

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.FACEBOOK_LOGIN,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const Googlelogin = (name, email, idToken) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('social_token', idToken);
  formData.append('verified_by', 'google');

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    const errMsg = utils.showResponseError(error);
  };

  return axios
    .post(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.GOOGLE_LOGIN,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const logout = async () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.LOGOUT, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const SignUpVender = async (
  name,
  email,
  phoneNo,
  address,
  password,
  password_confirmation,
  about,
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('password_confirmation', password_confirmation);
  formData.append('verified_by', 'email');
  formData.append('about_me', about);
  formData.append('phone', phoneNo);
  // formData.append("address", address);
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.SIGN_UP_VENDER,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const SignUpUser = async (
  name,
  email,
  phoneNo,
  address,
  password,
  password_confirmation,
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phoneNo);
  formData.append('address', address);
  formData.append('password', password);
  formData.append('password_confirmation', password_confirmation);
  formData.append('verified_by', 'email');
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.SIGN_UP_USER,

      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const authService = {
  login,
  Vendorlogin,
  Facebooklogin,
  logout,
  Googlelogin,
  SignUpUser,
  Applelogin,
  SignUpVender,
};

export default authService;
