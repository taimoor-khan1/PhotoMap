import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import utils from '../../utils';
import authService from '../services/Auth.servies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../../constants';

// import { useSelector } from "react-redux";

const initialState = {
  accessToken: null,
  role: null,
};
// const userType = useSelector((state) => state.user.userType);

// ================FaceBook login ==============
export const Facebooklogin = createAsyncThunk(
  CONSTANTS.API_CALLS.FACEBOOK_LOGIN,
  async ({name, email, social_token}, thunk) => {
    try {
      const response = await authService.Facebooklogin(
        name,
        email,
        social_token,
      );
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      saveAccessTokenToStorage(response.data.token);
      saveUserTypeToStorage(response.data.roles[0].name);
      thunk.dispatch(authSlice.actions.saverole(response.data.roles[0].name));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
      // throw err;
    }
  },
);
export const Applelogin = createAsyncThunk(
  CONSTANTS.API_CALLS.APPLE_LOGIN,
  async ({name, email, idToken}, thunk) => {
    try {
      const response = await authService.Applelogin(name, email, idToken);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      saveAccessTokenToStorage(response.data.token);
      saveUserTypeToStorage(response.data.roles[0].name);
      thunk.dispatch(authSlice.actions.saverole(response.data.roles[0].name));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
      // throw err;
    }
  },
);

// ==================google=========================
export const Googlelogin = createAsyncThunk(
  CONSTANTS.API_CALLS.GOOGLE_LOGIN,
  async ({name, email, idToken}, thunk) => {
    try {
      const response = await authService.Googlelogin(name, email, idToken);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      saveAccessTokenToStorage(response.data.token);
      saveUserTypeToStorage(response.data.roles[0].name);
      thunk.dispatch(authSlice.actions.saverole(response.data.roles[0].name));

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      // utils.errorAlert(err);
      // throw err;
    }
  },
);

// ===================user Login==============
export const login = createAsyncThunk(
  CONSTANTS.API_CALLS.LOGIN,
  async ({email, password}, thunk) => {
    try {
      const response = await authService.login(email, password);
      console.log('responseeee', response);
      if (response.status == 1) {
        thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
        saveAccessTokenToStorage(response.data.token);
        saveUserTypeToStorage(response.data.roles[0].name);
        thunk.dispatch(authSlice.actions.saverole(response.data.roles[0].name));
      } else if (response.status == 2) {
        utils.errorAlert('kindly Verify ');
      } else {
        utils.errorAlert('something went wrong');
      }

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      console.log('login errr dekhaaa dy bhai', err);
      utils.errorAlert(err);
      // throw err;
    }
  },
);

// ===================Vender Login =================
export const Vendorlogin = createAsyncThunk(
  CONSTANTS.API_CALLS.VENDOR_LOGIN,
  async ({email, password}, thunk) => {
    try {
      const response = await authService.Vendorlogin(email, password);
      console.log('responseeee', response);
      if (response.status == 1) {
        thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
        saveAccessTokenToStorage(response.data.token);
        saveUserTypeToStorage(response.data.roles[0].name);
        thunk.dispatch(authSlice.actions.saverole(response.data.roles[0].name));
      } else if (response.status == 2) {
        utils.errorAlert('kindly Verify ');
      } else {
        utils.errorAlert('something went wrong');
      }

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      console.log('Vendorlogin dekhaaa dy bhai', err);
      utils.errorAlert(err);
      // utils.errorAlert(err);
      // throw err;
    }
  },
);

// ================SignUpVendor=================
export const SignUpVendor = createAsyncThunk(
  CONSTANTS.API_CALLS.SIGN_UP_VENDER,
  async (
    {name, email, phoneNo, address, password, password_confirmation, about},
    thunk,
  ) => {
    try {
      const response = await authService.SignUpVender(
        name,
        email,
        phoneNo,
        address,
        password,
        password_confirmation,
        about,
      );
    } catch (error) {
      // let err = utils.showResponseError(error);
      throw err;
    }
  },
);

// ============UserSignUp=====================

export const UserSignUp = createAsyncThunk(
  CONSTANTS.API_CALLS.SIGN_UP_USER,
  async (
    {name, email, phoneNo, address, password, password_confirmation},
    thunk,
  ) => {
    try {
      const response = await authService.SignUpUser(
        name,
        email,
        phoneNo,
        address,
        password,
        password_confirmation,
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      // console.log("error============", err);
      // throw err;
    }
  },
);

// ===================logout=================

export const logout = createAsyncThunk(
  CONSTANTS.API_CALLS.LOGOUT,
  async ({dummyData}, thunk) => {
    try {
      const response = await authService.logout();
      thunk.dispatch(authSlice.actions.removeAccessToken());

      thunk.dispatch(authSlice.actions.deleteRole());
      removeUserTypeFromStorage();

      showSimpleMessage('success', {
        message: response.message,
      });

      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const removeAccessTokenFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.USER);
};

const removeUserTypeFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.USERTYPE);
};

const saveAccessTokenToStorage = accessToken => {
  AsyncStorage.setItem(CONSTANTS.USER, JSON.stringify(accessToken));
};

const saveUserTypeToStorage = type => {
  AsyncStorage.setItem(CONSTANTS.USERTYPE, JSON.stringify(type));
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saverole: (state, action) => {
      state.role = action.payload;
    },
    deleteRole: (state, action) => {
      state.role = null;
    },
    saveAccessToken: (state, action) => {
      let accessToken = action.payload;
      state.accessToken = accessToken;
      // saveAccessTokenToStorage(accessToken);
    },
    removeAccessToken: (state, action) => {
      state.accessToken = null;
      removeAccessTokenFromStorage();
    },
  },
});
export const {saveAccessToken, removeAccessToken, saverole, deleteRole} =
  authSlice.actions;
export default authSlice.reducer;
