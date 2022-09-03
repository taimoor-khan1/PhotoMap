import React, { useState } from "react";
import {
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
import { show, hide } from "../../redux/Silices/Loader";
import { useDispatch } from "react-redux";
import axios from "axios";
import utils from "../../utils";

export default function ForgotPassword(props) {
  const { navigation } = props;
  const dispatcher = useDispatch();
  const ScreenName = SCREENS.ForgetPassword;
  const [email, setEmail] = useState("");

  const ForgetPasswordUser = async () => {
    dispatcher(show());
    if (email === "") {
      utils.errorAlert("enter Email");
      dispatcher(hide());
    } else {
      const data = {
        email: email,
      };

      axios
        .get(
          CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.FORGOT_PASSWORD,
          // data
          {
            params: { email: email },
          }
        )
        .then(({ data }) => {
          utils.successAlert(data?.message);
          navigation.navigate(SCREENS.OTP, { email, ScreenName });
        })
        .catch((error) => {
          console.log("errrorrrr", utils.showResponseError(error));
          let errormsg = utils.showResponseError(error);
          utils.errorAlert(errormsg.email);
        });
      dispatcher(hide());
    }
  };

  return (
    <View style={STYLES.container}>
      {/* <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
      /> */}
      <View
        style={{
          height: height,
          width: width,
          paddingHorizontal: SIZES.fifteen,
        }}
      >
        <BackArrow />
        {/* ======================== HEADER HERE ======================== */}
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
            Forgot Password?
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
            Enter your email & we will send {"\n"}you a verification code
          </Text>
        </View>

        {/* ======================== TEXTINPUTS HERE ======================== */}
        <View style={{}}>
          <View style={{ marginTop: SIZES.twentyFive * 1.5 }}>
            <Text
              style={[
                FONTS.mediumFont14,
                { color: COLORS.primary1, marginBottom: SIZES.fifteen },
              ]}
            >
              Email Address
            </Text>

            <EditText
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter Email"
              hasIcon
              name="mail"
              type={FONTFAMILY.AntDesign}
            />
          </View>
        </View>

        {/* ======================== BUTTONS HERE ======================== */}
        <View style={{ marginTop: SIZES.fifteen * 3 }}>
          <ButtonRadius10
            label={"Continue"}
            style={{ marginTop: SIZES.fifteen }}
            onPress={() => {
              ForgetPasswordUser();
              // props.navigation.navigate(SCREENS.OTP, { email });
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
