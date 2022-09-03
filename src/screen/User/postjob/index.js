import React, {useState, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import ButtonRadius10 from '../../../components/ButtonRadius10';
import MessageEditText from '../../../components/MessageEditText';
import NormalHeader from '../../../components/NormalHeader';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SIZES,
  STYLES,
} from '../../../constants';
import EditText from './../../../components/EditText';
import ModalDropdown from 'react-native-modal-dropdown';
import {Icon} from 'native-base';
import {openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {show, hide} from '../../../redux/Silices/Loader';
import {useDispatch, useSelector} from 'react-redux';
import utils from '../../../utils';
import axios from 'axios';
import {store} from '../../../redux/store';
import {getCurrentLocation, locationPermission} from '../../../helper/index';
import Geolocation from '@react-native-community/geolocation';

export default function PostJob() {
  const dispatcher = useDispatch();
  // const Category = useSelector((state) => state.Category.data);
  // const [categories, setCategories] = useState(Category);

  const [screenLoad, setScreenLoad] = useState(false);
  const [eventCaption, setEventCaption] = useState('');
  const [eventCategoryID, setEventCategoryID] = useState(null);
  const [rateRequired, setRateRequired] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [permission, setPermission] = useState('');
  const [borderColor, setBorderColor] = useState(COLORS.blackWithOpacity);
  const [selectedoption, setselectedoption] = useState('');
  const [showPermission, setShowPermission] = useState(false);

  useEffect(() => {
    getLiveLocation();
    setTimeout(() => {
      setScreenLoad(true);
    }, 3000);
  }, []);

  const getLiveLocation = async () => {
    // await setLocPermission(locationPermission());
    const locPermission = await locationPermission();
    setPermission(locPermission);
    // console.log("location permission ===========>", permission);

    if (locPermission == 'granted') {
      const Location = await getCurrentLocation();
      setLatitude(Location.latitude);
      setLongitude(Location.longitude);
      // console.log("Location =========>", Location);
    }
  };

  // Get permission status for iOS
  const getPermissionStatus = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        console.log('location result: ', result);
        checkStatusForIos(result);
      })
      .catch(error => {
        setShowPermission(true);
      });
  };

  // Check Permision Status if Granted then Get Location if Denied Again Put Request For Allow Location Permission
  const checkStatusForIos = async result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        setShowPermission(true);
        break;
      case RESULTS.DENIED:
        RequestPermission();
        break;
      case RESULTS.LIMITED:
        setShowPermission(true);
        break;
      case RESULTS.GRANTED:
        // getUserAccessToken();
        break;
      case RESULTS.BLOCKED:
        WhenInUseLocation();
        break;
    }
  };

  // Request For location Permision in Ios only
  const RequestPermission = async () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      checkStatusForIos(result);
    });
  };

  // Request For location Permision in Ios only
  const WhenInUseLocation = async () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      if (result === 'granted') {
        checkStatusForIos(result);
      } else if (result === 'blocked') {
        setShowPermission(true);
      }
    });
  };

  ////////////// upload job///////////////
  const uploadJob = () => {
    if (utils.isEmptyOrSpaces(eventCaption)) {
      utils.errorAlert('Please select event caption!');
    } else if (utils.isEmpty(selectedoption)) {
      utils.errorAlert('Please select event category!');
    } else if (utils.isEmptyOrSpaces(rateRequired)) {
      utils.errorAlert('Please fill rate!');
    } else if (utils.isEmptyOrSpaces(location)) {
      utils.errorAlert('Please fill location!');
    } else if (utils.isEmptyOrSpaces(address)) {
      utils.errorAlert('Please fill address!');
    } else if (utils.isEmptyOrSpaces(availability)) {
      utils.errorAlert('Please fill availability!');
    } else if (utils.isEmptyOrSpaces(description)) {
      utils.errorAlert('Please fill description!');
    } else {
      const data = {
        event_caption: eventCaption,
        category_id: selectedoption.id,
        rate_required: rateRequired,
        location: location,
        lantitude: latitude,
        longitude: longitude,
        address: address,
        availability: availability,
        description: description,
      };
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      axios
        .post(
          CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.POST_JOB,
          formData,
          {
            headers: {
              Authorization: store.getState().Auth.accessToken,
            },
          },
        )
        .then(response => {
          setEventCaption('');
          setAddress('');
          setAvailability('');
          setDescription('');
          setRateRequired('');
          setLocation('');
          utils.successAlert('Successfully Upload');
          console.log('responseeee', response.data.message);
        })
        .catch(err => {
          if (longitude === '' || latitude === '') {
            utils.errorAlert(' kindly allow location permission for post job');
          } else {
            utils.errorAlert(err.Error);
          }
          console.log('errrrr', err);
          // utils.errorAlert(err.Error);
        });
    }
  };

  // ==================get EVENT ID==============
  const getEventCatagoryID = title => {
    const index = CATEGORIES.findIndex(i => i.name === title);
    setselectedoption(CATEGORIES[index]);
  };

  return (
    <View style={[STYLES.container, {}]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[FONTS.boldFont22, {color: COLORS.black}]}>Post Job</Text>
      </View>
      {!screenLoad ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={SIZES.fifty * 1.5} color={COLORS.primary1} />
        </View>
      ) : permission != 'granted' ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.boldFont18, {color: COLORS.primary1}]}>
            Sorry! You are able to Post a job
          </Text>
          <ButtonRadius10
            onPress={() => openSettings()}
            label="Allow Permission"
            style={{margin: SIZES.twenty * 2}}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{}}
          contentContainerStyle={{paddingBottom: SIZES.fifty * 5}}
          overScrollMode="never">
          <View
            style={{
              paddingVertical: SIZES.fifteen,
              paddingHorizontal: SIZES.fifteen,
            }}>
            {/* Event Caption view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Event Caption
              </Text>

              <EditText
                value={eventCaption}
                onChangeText={text => {
                  setEventCaption(text);
                }}
                placeholder="Wedding"
                hasIcon
                name="calendar"
                type={FONTFAMILY.Entypo}
              />
            </View>
            {/* Event Caption view end */}

            {/*  Event Category view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Event Category
              </Text>

              <ModalDropdown
                options={Options}
                style={{}}
                showsVerticalScrollIndicator={false}
                defaultValue={'Choose an option'}
                // defaultIndex={0}
                textStyle={[
                  FONTS.mediumFont14,
                  {
                    color: COLORS.blackWithOpacity,
                    marginRight: SIZES.twenty * 1.8,
                    marginTop: SIZES.five,
                  },
                ]}
                dropdownStyle={{
                  width: '95%',
                  height: SIZES.ten * 15,
                  marginTop:
                    Platform.OS === 'android' ? -SIZES.twentyFive : SIZES.five,
                  borderWidth: 1,
                  borderColor: COLORS.blackWithOpacity,
                  borderRadius: SIZES.ten * 1,
                  overflow: 'hidden',
                }}
                dropdownTextStyle={{
                  backgroundColor: COLORS.white,
                  color: COLORS.blackWithOpacity,
                  fontSize: SIZES.ten * 1.8,
                }}
                dropdownTextHighlightStyle={{
                  color: COLORS.blackWithOpacity,
                  fontSize: SIZES.ten * 1.8,
                }}
                renderButtonText={txt => {
                  getEventCatagoryID(txt);
                }}>
                <View
                  style={{
                    //   backgroundColor: 'red',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.fifteen,
                    height: 60,
                    borderRadius: SIZES.twenty,
                    borderColor: borderColor,
                    marginVertical: SIZES.five,
                    overflow: 'hidden',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="calendar"
                      type={FONTFAMILY.Entypo}
                      style={{
                        color: COLORS.blackWithOpacity,
                        marginRight: SIZES.ten,
                        fontSize: SIZES.twenty,
                      }}
                    />
                    <Text
                      style={[
                        FONTS.mediumFont14,
                        {color: COLORS.blackWithOpacity},
                      ]}>
                      {selectedoption.name}
                    </Text>
                  </View>
                  <Icon
                    name="down"
                    type={FONTFAMILY.AntDesign}
                    style={{
                      color: COLORS.blackWithOpacity,
                      marginRight: SIZES.ten,
                      fontSize: SIZES.twenty,
                    }}
                  />
                </View>
              </ModalDropdown>
            </View>
            {/*  Event Category view end */}

            {/* Rate Required view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Rate Required
              </Text>

              <EditText
                value={rateRequired}
                onChangeText={text => {
                  setRateRequired(text);
                }}
                placeholder="Type here"
                hasIcon
                name="dollar"
                type={FONTFAMILY.FontAwesome}
              />
            </View>
            {/* Rate Required view end */}

            {/*   Location view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Location
              </Text>

              <EditText
                value={location}
                onChangeText={text => {
                  setLocation(text);
                }}
                placeholder="Type here"
                hasIcon
                name="ios-location-outline"
                type={FONTFAMILY.Ionicons}
              />
            </View>
            {/*   Location view end */}

            {/* Address view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Address
              </Text>

              <EditText
                value={address}
                onChangeText={text => {
                  setAddress(text);
                }}
                placeholder="Type here"
                hasIcon
                name="map"
                type={FONTFAMILY.Entypo}
              />
            </View>
            {/*   Address view end */}

            {/*Availability view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Availability
              </Text>

              <EditText
                value={availability}
                onChangeText={text => {
                  setAvailability(text);
                }}
                placeholder="Type here"
                hasIcon
                name="clock"
                type={FONTFAMILY.Fontisto}
              />
            </View>
            {/*  Availability view end */}

            {/*Description view start */}
            <View style={{}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginVertical: SIZES.fifteen},
                ]}>
                Description
              </Text>

              <MessageEditText
                value={description}
                onChangeText={text => {
                  setDescription(text);
                }}
                placeholder="Type here"
              />
            </View>
            {/*  Availability view end */}

            <ButtonRadius10
              onPress={() => uploadJob()}
              label="Post"
              style={{marginTop: SIZES.twenty * 2}}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
const Options = ['Party', 'Wedding', 'Event', 'Modelling'];
const CATEGORIES = [
  {
    id: '1',
    name: 'Party',
  },
  {
    id: '2',
    name: 'Wedding',
  },
  {
    id: '3',
    name: 'Event',
  },
  {
    id: '4',
    name: 'Modelling',
  },
];
