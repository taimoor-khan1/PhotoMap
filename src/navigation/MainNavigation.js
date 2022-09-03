import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Modal,
  View,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Login from '../screen/Auth/Login';
import {COLORS, CONSTANTS, IMAGES, SCREENS} from '../constants';
import SignUp from '../screen/Auth/SignUp';
import EditProfile from '../screen/User/profile/EditProfile';
import Splash from '../screen/Auth/Splash';
import AllReviews from '../screen/Vendor/allReviews/AllReviews';
import DrawerNavigator from './drawer';
import Verification from './../screen/Auth/Verification';
import ForgotPassword from './../screen/Auth/ForgotPassword';
import ResetPassword from './../screen/Auth/ResetPassword';
import CreateAccount from '../screen/Auth/CreateAccount';
import Pricing from '../screen/Auth/Pricing';
import ChangePassword from '../screen/User/profile/ChangePassword';
import Nearby from '../screen/User/nearby/index';
import NearByMapView from '../screen/User/nearby/NearByMapView';
import ConfirmBooking from '../screen/User/ConfirmBooking';
import RateAndReview from '../screen/User/Rating/RateAndReview';
import PhotographerProfile from '../screen/User/PhotographerProfile/PhotographerProfile';
import PortFolio from './../screen/User/portfolio/index';
import {useDispatch, useSelector} from 'react-redux';
import UserMainLayout from './../screen/User/home/MainLayout';
import Search from './../screen/search/Search';
import VendorMainLayout from './../screen/Vendor/home/MainLayout';
import UserEditProfile from '../screen/User/profile/EditProfile';
import VendorEditProfile from '../screen/Vendor/PhotographerProfile/EditProfile';
import VendorSignUp from '../screen/Auth/VendorSignUp';
import UploadFiles from '../screen/Auth/UploadFiles';
import VendorProfile from '../screen/Vendor/PhotographerProfile/PhotographerProfile';
import VendorPortFolio from './../screen/Vendor/portfolio/index';
import JobDetails from '../screen/Vendor/JobDetails';
import FilterLocation from '../screen/User/FilterLocation';
import SelectCard from '../screen/Payment/SelectCard';
import AddCard from '../screen/Payment/AddCard';

import {getStatusBarHeight} from 'react-native-status-bar-height';
// import Loader from "../components/Loader";
// ===========LottieView=============
import LottieView from 'lottie-react-native';

// ========redux===========
import {Profile, GetVendorprofile} from '../redux/Silices/Profile';

import {
  Photographers,
  SinglePhotoGrapher,
} from '../redux/Silices/Photographers';
import {Conetnt} from '../redux/Silices/Content';
import {saveAccessToken, saverole} from '../redux/Silices/Auth';
import {RecentJobs, AppliedJob, BestJobs} from '../redux/Silices/Jobs';
import {Category} from '../redux/Silices/Category';
import {show, hide} from '../redux/Silices/Loader';
import {BookingDetail} from '../redux/Silices/BookingDetail';
import {Notification} from '../redux/Silices/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginAccount from '../screen/Auth/LoginAccount';

export default function MainNavigation() {
  const dispatcher = useDispatch();
  const Stack = createSharedElementStackNavigator();
  const token = useSelector(state => state.Auth.accessToken);
  const USERTYPE = useSelector(state => state.Auth.role);
  const USERDATA = useSelector(state => state.Profile.data);
  const Loading = useSelector(state => state.Loader.Loading);
  const [appLoading, setappLoading] = React.useState(true);

  useEffect(() => {
    getUserAccessToken();
  }, [token, USERTYPE]);

  // console.log("redux tokeeennnnnnn============>", token);
  /*  ************************ GET ACCESS TOKEN IN ASYNC *********************** */
  const getUserAccessToken = async () => {
    const value = await AsyncStorage.getItem(CONSTANTS.USER);
    const type = await AsyncStorage.getItem(CONSTANTS.USERTYPE);
    const accessToken = JSON.parse(value);

    const usertype = JSON.parse(type);

    if (
      accessToken !== undefined &&
      accessToken !== null &&
      usertype !== undefined &&
      usertype !== null
    ) {
      dispatcher(saveAccessToken(accessToken));
      dispatcher(saverole(usertype));
      getProfile();
      GetData();
    }

    setTimeout(() => {
      setappLoading(false);
    }, 3000);
  };

  const getProfile = async () => {
    if (token != null) {
      setTimeout(async () => {
        await dispatcher(Profile(''))
          .unwrap()
          .then(async _response => {
            await GetData();
          })
          .catch(error => {});
        dispatcher(hide());
      }, 3000);
    }
  };
  const GetData = async () => {
    if (USERTYPE === 'User') {
      dispatcher(Photographers(''));
      dispatcher(BookingDetail(''));
    } else {
      await dispatcher(GetVendorprofile(''));
      await dispatcher(RecentJobs(''));
      await dispatcher(AppliedJob(''));
      await dispatcher(BestJobs(''));
    }
    await dispatcher(Category(''));
    await dispatcher(Conetnt(''));
    await dispatcher(Notification(''));
  };
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={COLORS.transparent}
        barStyle={'dark-content'}
      />
      {appLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.primary1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={SCREENS.Splash}>
              {token === null || token === undefined ? (
                <>
                  <Stack.Screen name={SCREENS.Splash} component={Splash} />
                  <Stack.Screen
                    name={SCREENS.LoginAccount}
                    component={LoginAccount}
                  />
                  <Stack.Screen name={SCREENS.Login} component={Login} />
                  <Stack.Screen
                    name={SCREENS.CreateAccount}
                    component={CreateAccount}
                  />
                  <Stack.Screen name={SCREENS.OTP} component={Verification} />
                  <Stack.Screen name={SCREENS.SignUp} component={SignUp} />
                  <Stack.Screen
                    name={SCREENS.VendorSignUp}
                    component={VendorSignUp}
                  />
                  <Stack.Screen name={SCREENS.Pricing} component={Pricing} />
                  <Stack.Screen
                    name={SCREENS.UploadFiles}
                    component={UploadFiles}
                  />
                  <Stack.Screen
                    name={SCREENS.ForgetPassword}
                    component={ForgotPassword}
                  />
                  <Stack.Screen
                    name={SCREENS.ResetPassword}
                    component={ResetPassword}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name={SCREENS.DrawerNavigator}
                    component={DrawerNavigator}
                  />

                  {/* {USERTYPE === "User" ? (
                <Stack.Screen
                  name={SCREENS.UserMainLayout}
                  component={UserMainLayout}
                />
              ) : (
                <Stack.Screen
                  name={SCREENS.VendorMainLayout}
                  component={VendorMainLayout}
                />
              )} */}

                  <Stack.Screen
                    name={SCREENS.RateAndReview}
                    component={RateAndReview}
                  />

                  <Stack.Screen
                    name={SCREENS.ChangePassword}
                    component={ChangePassword}
                  />
                  <Stack.Screen
                    name={SCREENS.PortFolio}
                    component={PortFolio}
                    sharedElements={route => {
                      return [route.params.item.id];
                    }}
                  />
                  <Stack.Screen
                    name={SCREENS.AllReviews}
                    component={AllReviews}
                  />
                  <Stack.Screen name={SCREENS.Nearby} component={Nearby} />
                  <Stack.Screen
                    name={SCREENS.NearByMapView}
                    component={NearByMapView}
                  />
                  <Stack.Screen name={SCREENS.Search} component={Search} />
                  <Stack.Screen
                    name={SCREENS.SelectCard}
                    component={SelectCard}
                  />
                  <Stack.Screen name={SCREENS.AddCard} component={AddCard} />
                  <Stack.Screen
                    name={SCREENS.UserEditProfile}
                    component={UserEditProfile}
                  />
                  <Stack.Screen
                    name={SCREENS.VendorEditProfile}
                    component={VendorEditProfile}
                  />

                  <Stack.Screen
                    name={SCREENS.BookingDetails}
                    component={ConfirmBooking}
                  />

                  {/* <Stack.Screen
                name={SCREENS.VendorMainLayout}
                component={VendorMainLayout}
              /> */}
                  <Stack.Screen
                    name={SCREENS.PhotographerProfile}
                    component={PhotographerProfile}
                  />
                  <Stack.Screen
                    name={SCREENS.VendorProfile}
                    component={VendorProfile}
                  />
                  <Stack.Screen
                    name={SCREENS.VendorPortFolio}
                    component={VendorPortFolio}
                  />
                  <Stack.Screen
                    name={SCREENS.FilterLocation}
                    component={FilterLocation}
                  />
                  <Stack.Screen
                    name={SCREENS.JobDetails}
                    component={JobDetails}
                  />
                  {/* <Stack.Screen
                name={SCREENS.DrawerNavigator}
                component={DrawerNavigator}
              /> */}
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <Modal
            statusBarTranslucent
            animationType="fade"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            visible={Loading}
            transparent={true}>
            <LottieView
              source={IMAGES.Loader}
              autoPlay
              loop
              style={{backgroundColor: `${COLORS.black}25`}}
            />
          </Modal>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
