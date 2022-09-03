import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import ButtonRadius10 from "../../components/ButtonRadius10";
import EditText from "../../components/EditText";
import MyTouchableOpacity from "../../components/MyTouchableOpacity";
import Row from "../../components/Row";
import BackArrow from "../../components/BackArrow";
import OTPInputView from "@twotalltotems/react-native-otp-input";
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
} from "../../constants";
import axios from "axios";
import utils from "../../utils";
import { store } from "../../redux/store";
import SignUp from "./SignUp";
import { show, hide } from "../../redux/Silices/Loader";
import { useDispatch } from "react-redux";

export default function Verification(props) {
  const dispatcher = useDispatch();

  const { navigation, route } = props;
  const { email, ScreenName } = route?.params;

  const [code, setCode] = useState("");

  const emptyCode = (text) => {
    Alert.alert("Please enter valid code ");
  };

  // =====================verify user ======================
  const VerifyUser = () => {
    dispatcher(show());

    const data = {
      email: email,
      otp: code,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.VERIFY_OTP,
        formData,
        {
          headers: {
            Authorization: store.getState().Auth.accessToken,
          },
        }
      )
      .then((response) => {
        if (ScreenName === SCREENS.ForgetPassword) {
          navigation.navigate(SCREENS.ResetPassword, { email });
          dispatcher(hide());
        } else {
          utils.successAlert("Account create Successfully");
          navigation.navigate(SCREENS.Splash);
          dispatcher(hide());
        }
      })

      .catch((err) => {
        let errormsg = utils.showResponseError(err);
        utils.errorAlert(errormsg);
        dispatcher(hide());
      });
  };

  return (
    <View style={STYLES.container}>
      <View
        style={{
          height: height,
          width: width,
          paddingHorizontal: SIZES.fifteen,
        }}
      >
        {/* ======================== HEADER HERE ======================== */}
        <BackArrow />
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              FONTS.mediumFont18,
              { color: COLORS.BLACK, textAlign: "center" },
            ]}
          >
            Verification
          </Text>
          <Image
            source={IMAGES.LogoPhotoMap}
            resizeMode="contain"
            style={{
              height: SIZES.twentyFive * 3,
              width: SIZES.twentyFive * 8.5,
              alignSelf: "center",
            }}
          />

          <Text
            style={[
              FONTS.mediumFont14,
              { color: COLORS.brownGrey, textAlign: "center" },
            ]}
            numberOfLines={2}
          >
            Enter your verification code that we {"\n"}sent you through you
            email
          </Text>
        </View>
        {/* ======================== TEXTINPUTS HERE ======================== */}
        <View style={{}}>
          <View style={{ marginTop: SIZES.twentyFive * 1.5 }}>
            <OTPInputView
              style={{
                width: "100%",
                height: SIZES.twenty * 5,
              }}
              pinCount={4}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                setCode(code);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                // console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        </View>

        {/* ======================== BUTTONS HERE ======================== */}
        <View style={{ marginTop: SIZES.fifteen * 3 }}>
          <ButtonRadius10
            label={"Verify"}
            style={{ marginTop: SIZES.fifteen }}
            onPress={() => {
              if (code === "" || code.length < 4 || null) {
                emptyCode(code);
              } else {
                VerifyUser();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: COLORS.brownGrey,
    fontSize: SIZES.twentyFive,
    color: COLORS.black,
    fontFamily: FONTFAMILY.Light,
  },
  underlineStyleHighLighted: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: COLORS.aquaMarine,
    fontSize: SIZES.twentyFive,
    fontFamily: FONTFAMILY.Light,
  },
});
