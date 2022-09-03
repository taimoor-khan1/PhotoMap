import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Card from '../../../components/Card';
import CircularImage from '../../../components/CircularImage';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import ProfileHeader from '../../../components/ProfileHeader';
import Row from '../../../components/Row';
import UserImageWithCrown from '../../../components/UserImageWithCrown';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState(1);
  const navigation = useNavigation();
  const USERDATA = useSelector(state => state.Profile.data);
  const BOOKING_DATA = useSelector(state => state.BookingDetail.data);

  const [BookingDetail, setBookingDetail] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setBookingDetail(BOOKING_DATA);
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    }, [BOOKING_DATA]),
  );

  const ViewPersonalInfo = props => (
    <Row
      style={{
        justifyContent: 'space-between',
        paddingVertical: SIZES.ten,
      }}>
      <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>
        {props.prop}
      </Text>
      <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
        {props.value}
      </Text>
    </Row>
  );

  const rendorBookoingDetails = ({item}) => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.fifteen,
            padding: SIZES.ten,
            borderRadius: SIZES.fifteen,
          },
        ]}>
        <Row style={{alignItems: 'center'}}>
          <UserImageWithCrown
            image={CONSTANTS.API_CALLS.IMAGE_URL + item?.vendor?.image}
          />
          <View style={{marginHorizontal: SIZES.ten}}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
              Ms. {item?.vendor?.name}
            </Text>
            <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
              Party photoshot inspiration
            </Text>
            <Text style={[FONTS.lightFont10, {color: COLORS.primary1}]}>
              {item?.address}
            </Text>
          </View>
        </Row>

        <Row style={{marginTop: SIZES.fifteen}}>
          <View style={{flex: 1}}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.black}]}>
              Date & Time
            </Text>
            <Text style={[FONTS.lightFont12, {color: COLORS.primary1}]}>
              {item?.booking_date}
              {'  '}
              {item?.booking_time}
            </Text>
          </View>
          <View style={{}}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.black}]}>
              Booking Fee
            </Text>
            <Text style={[FONTS.lightFont12, {color: COLORS.primary1}]}>
              ${item?.vendor?.price}
            </Text>
          </View>
        </Row>
      </View>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}
      <ProfileHeader
        title="Profile"
        isBright
        onEditeIconPressed={() => {
          navigation.navigate(SCREENS.UserEditProfile);
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.twentyFive,
          borderTopRightRadius: SIZES.twentyFive,
          marginTop: SIZES.twenty,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}>
        <Row
          style={{
            alignItems: 'center',
            marginTop: SIZES.twenty,
          }}>
          <CircularImage
            image={{
              uri: CONSTANTS.API_CALLS.IMAGE_URL + USERDATA?.records?.image,
            }}
            style={{
              height: SIZES.twenty * 3.5,
              width: SIZES.twenty * 3.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <View style={{}}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
              {USERDATA?.records?.name}
            </Text>
            <Text style={[FONTS.lightFont10, {color: COLORS.primary1}]}>
              {USERDATA?.records?.address}
            </Text>
          </View>
        </Row>
        <Row
          style={{
            marginRight: SIZES.fifty * 2,
            justifyContent: 'space-between',
            padding: SIZES.fifteen,
          }}>
          <MyTouchableOpacity onPress={() => setSelectedTab(1)}>
            <Text
              style={[
                selectedTab === 1 ? FONTS.boldFont16 : FONTS.mediumFont12,
                {
                  color: selectedTab === 1 ? COLORS.primary1 : COLORS.brownGrey,
                },
              ]}>
              Personal Info
            </Text>
            <View
              style={[
                styles.tabLine,
                {
                  height: selectedTab === 1 ? 3 : 0,
                },
              ]}
            />
          </MyTouchableOpacity>
          <MyTouchableOpacity onPress={() => setSelectedTab(2)}>
            <Text
              style={[
                selectedTab === 2 ? FONTS.boldFont16 : FONTS.mediumFont12,
                {
                  color: selectedTab === 2 ? COLORS.primary1 : COLORS.brownGrey,
                },
              ]}>
              Booking Details
            </Text>
            <View
              style={[
                styles.tabLine,
                {
                  height: selectedTab === 2 ? 3 : 0,
                },
              ]}
            />
          </MyTouchableOpacity>
        </Row>
        <View style={{height: SIZES.twenty}} />
        {selectedTab === 1 ? (
          <View style={{paddingHorizontal: SIZES.fifteen}}>
            <ViewPersonalInfo
              prop={'Full Name'}
              value={USERDATA?.records?.name}
            />
            <ViewPersonalInfo prop={'Email'} value={USERDATA?.records?.email} />
            <ViewPersonalInfo
              prop={'Phone No.'}
              value={USERDATA?.records?.phone}
            />
            <ViewPersonalInfo
              prop={'Address'}
              value={USERDATA?.records?.address}
            />
          </View>
        ) : (
          <FlatList
            data={[...BOOKING_DATA].reverse()}
            // inverted={true}
            renderItem={rendorBookoingDetails}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SIZES.fifteen,
              paddingBottom: SIZES.twenty * 8,
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabLine: {
    width: 55,
    borderRadius: 10,
    marginTop: SIZES.five,
    backgroundColor: COLORS.crimson,
  },
});

const Data = [
  {
    id: 1,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    id: 2,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    id: 3,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
  {
    id: 4,
    name: 'John Andrew',
    number: '1 min ago',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  },
];
