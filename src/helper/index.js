import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import RNLocation from 'react-native-location';

export const getCurrentLocation = async () =>
  new Promise(async (resolve, reject) => {
    await Geolocation.getCurrentPosition(
      position => {
        // console.log("location", position);
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(cords);
      },
      error => {
        console.log('nhi do ga ==== ', error);
        reject(error.message);
      },
      {timeout: 150000, enableHighAccuracy: true},
    );
  });

export const getIosLocation = () => {
  new Promise(async (resolve, reject) => {
    RNLocation.subscribeToSignificantLocationUpdates(([locations]) => {
      TackingUser(locations);
    });
  });
};

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result === 'granted') {
            return resolve('granted');
          }
          reject('Permission not 0 granted');
        })
        .catch(error => {
          return reject(error);
        });
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          return reject(error);
        });
    }
  });

const showError = message => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export {showError, showSuccess};
