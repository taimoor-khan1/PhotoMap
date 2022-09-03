import React from 'react';
import {RefreshControl, Alert} from 'react-native';
import {COLORS, FONTFAMILY, SCREENS} from '../constants';
import ErrorView from '../components/modals/ErrorView';
import {showMessage} from 'react-native-flash-message';

class utils {
  errorAlert(message) {
    showMessage({
      message: message,
      type: 'success',
      icon: 'warning',
      animated: true,
      style: {
        backgroundColor: COLORS.primary1,
      },
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
    });
  }
  successAlert(message) {
    showMessage({
      message: message,
      type: 'success',
      icon: 'success',
      animated: true,
      style: {
        backgroundColor: COLORS.green,
      },
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
    });
  }

  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        {text: 'NO', onPress: () => callback('error')},
        {text: 'YES', onPress: () => callback('success')},
      ],
      {cancelable: false},
    );
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={'Pull to Refresh'}
        tintColor={'blue'}
        colors={['white']}
        progressBackgroundColor={'blue'}
      />
    );
  }

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  showResponseError(error) {
    var authErrorRegex = /4[0-9][1-9]/g;
    var serverErrorRegex = /5[0-9][0-9]/g;

    if (error.message === 'Network Error') {
      return 'Please check your network';
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);
        // console.log(errorCode);
        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            var temp = response.data[Object.keys(response.data)[0]];
            error = JSON.stringify(temp).replace('[', '').replace(']', '');
          }
          return error;
        } else if (authErrorRegex.test(errorCode)) {
          return 'Authentication failed';
        } else if (serverErrorRegex.test(errorCode)) {
          return 'Something went wrong with the server';
        }
      } else {
        return error;
      }
    }
  }

  showResponseError(error) {
    if (error.message === 'Network Error') {
      let error = 'Please check your network';
      return error;
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);
        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            error = response.data;
          }
          return error;
        } else if (errorCode === '405') {
          return 'API method not allowed!';
        } else if (errorCode === '404') {
          return 'API not found!';
        } else if (errorCode === '401') {
          return error.response.data.message;

          // let errorResData = JSON.parse(error.response.request._response).message;
          // for (const [, value] of Object.entries(errorResData)) {
          //   return value[0];
          // }
        } else {
        }
      }
    }
  }
  showResponseError(error) {
    if (error.message === 'Network Error') {
      let error = 'Please check your network';
      return error;
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);
        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            error = response.data;
          }
          return error;
        } else if (errorCode === '405') {
          return 'API method not allowed!';
        } else if (errorCode === '404') {
          return 'API not found!';
        } else if (errorCode === '401') {
          return error.response.data.message;

          // let errorResData = JSON.parse(error.response.request._response).message;
          // for (const [, value] of Object.entries(errorResData)) {
          //   return value[0];
          // }
        } else {
        }
      }
    }
  }
}

export default new utils();
