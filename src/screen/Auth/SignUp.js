import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BackArrow from '../../components/BackArrow';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import CountryPicker from 'react-native-country-picker-modal';
import Row from '../../components/Row';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';
import {Icon} from 'native-base';

// ==========redux=========
import {UserSignUp} from '../../redux/Silices/Auth';
import {useDispatch} from 'react-redux';
import {show, hide} from '../../redux/Silices/Loader';
import axios from 'axios';
import utils from '../../utils';

export default function SignUp(props) {
  const dispatcher = useDispatch();
  const {navigation, route} = props;
  const {USERTYPE} = route?.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setpassword_confirmation] = useState('');

  const [isCountryCodePickerVisible, setisCountryCodePickerVisible] =
    useState(false);
  const [countryCode, setCountryCode] = useState('1');
  const [countryFlag, setcountryFlag] = useState('US');
  const [borderColor, setBorderColor] = useState(COLORS.blackWithOpacity);

  /* ======== Country Code Picker toggle============*/

  const toggleIsCountryCodePickerVisible = () => {
    setisCountryCodePickerVisible(!isCountryCodePickerVisible);
  };

  /* ========= onSelecting on Country Methood */

  const onSelect = country => {
    setCountryCode(country.callingCode[0]);
    setcountryFlag(country.cca2);
  };

  const SignUpUser = async () => {
    dispatcher(show());
    const data = {
      name: name,
      email: email,
      phone: phoneNo,
      address: address,
      password: password,
      password_confirmation: password_confirmation,
      verified_by: 'email',
      role: USERTYPE,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.SIGN_UP_USER,
        formData,
      )
      .then(({data}) => {
        console.log('success msg when sign up', data?.message);
        utils.successAlert('The Verification link has been sent to your email');
        navigation.navigate(SCREENS.OTP, {email});
        dispatcher(hide());
      })
      .catch(error => {
        let errormsg = utils.showResponseError(error);
        console.log('err msg when signup===========>', errormsg);
        utils.errorAlert('Email Already exists');
        dispatcher(hide());
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{backgroundColor: COLORS.white}}
      contentContainerStyle={{paddingBottom: 100}}
      overScrollMode="never">
      {/* <View style={[STYLES.container]}> */}
      {/* ======================== HEADER HERE ======================== */}

      <View
        style={{
          justifyContent: 'center',
          marginTop: SIZES.fifteen + getStatusBarHeight(),
          paddingHorizontal: SIZES.fifteen,
        }}>
        <Text
          style={[
            FONTS.mediumFont18,
            {color: COLORS.BLACK, textAlign: 'center'},
          ]}>
          Sign Up
        </Text>
        <Image
          source={IMAGES.LogoPhotoMap}
          resizeMode="contain"
          style={{
            height: SIZES.twentyFive * 3,
            width: SIZES.twentyFive * 8.5,
            alignSelf: 'center',
          }}
        />

        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.brownGrey, textAlign: 'center'},
          ]}>
          Enter your details below
        </Text>
      </View>
      {/* ======================== TEXTINPUTS HERE ======================== */}
      <View
        style={{
          paddingVertical: SIZES.fifteen,
          paddingHorizontal: SIZES.fifteen,
        }}>
        <View style={{}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            Full Name
          </Text>

          <EditText
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter Full Name"
            hasIcon
            name="person-outline"
            type={FONTFAMILY.Ionicons}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen * 1.5}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            Email Address
          </Text>

          <EditText
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Enter Email"
            hasIcon
            name="mail"
            type={FONTFAMILY.AntDesign}
          />
        </View>
        <Text
          style={[
            FONTS.mediumFont14,
            {
              color: COLORS.primary1,
              marginBottom: SIZES.fifteen,
              marginTop: SIZES.fifteen * 1.5,
            },
          ]}>
          Phone No.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
            borderRadius: SIZES.ten,
            borderWidth: 1,
            borderColor: borderColor,
            justifyContent: 'space-between',
          }}
          activeOpacity={1}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => toggleIsCountryCodePickerVisible()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.fifteen,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CountryPicker
                onSelect={onSelect}
                countryCode={countryFlag}
                visible={isCountryCodePickerVisible}
                withCallingCode
                theme={{
                  fontFamily: FONTFAMILY.Medium,
                  resizeMode: 'contain',
                }}
              />
              <Text style={[FONTS.mediumFont14, {color: COLORS.BLACK}]}>
                +{countryCode}
              </Text>
              <Icon
                type={FONTFAMILY.Ionicons}
                name={'chevron-down'}
                style={{
                  color: COLORS.BLACK,
                  fontSize: 20,
                  marginLeft: SIZES.five,
                }}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            value={phoneNo}
            onChangeText={text => setphoneNo(text)}
            selectionColor={COLORS.primary1}
            placeholderTextColor={COLORS.blackWithOpacity}
            placeholder="Enter Phone Number"
            style={[
              FONTS.mediumFont14,
              {
                flex: 1,
                color: COLORS.black,
              },
            ]}
            onFocus={() => {
              setBorderColor(COLORS.primary1);
            }}
            onBlur={() => {
              setBorderColor(COLORS.blackWithOpacity);
            }}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen * 1.5}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            Address
          </Text>

          <EditText
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Type Here"
            hasIcon
            name="location-pin"
            type={FONTFAMILY.SimpleLineIcons}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen * 1.5}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            Password
          </Text>

          <EditText
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Enter password"
            password
            hasIcon
            name="lock-open"
            type={FONTFAMILY.SimpleLineIcons}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen * 1.5}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            Re-type Password
          </Text>

          <EditText
            value={password_confirmation}
            onChangeText={text => setpassword_confirmation(text)}
            placeholder="Re-type Password"
            password
            hasIcon
            name="lock-open"
            type={FONTFAMILY.SimpleLineIcons}
          />
        </View>
        <ButtonRadius10
          label={'Sign Up'}
          style={{marginTop: SIZES.twenty * 2}}
          onPress={
            () => SignUpUser()
            // props.navigation.replace(SCREENS.DrawerNavigator, {
            //   userType: "user",
            // })
          }
        />
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.twentyFive * 1.8,
          }}>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.brownGrey, textAlign: 'center'},
            ]}>
            Already have an account?{'  '}
          </Text>
          <Text
            style={[FONTS.mediumFont12, {color: COLORS.primary1}]}
            onPress={() =>
              props.navigation.navigate(SCREENS.Login, {USERTYPE: USERTYPE})
            }>
            Log In
          </Text>
        </Row>
      </View>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
});
