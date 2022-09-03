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
import axios from "axios";
import utils from "../../utils";

export default function ResetPassword(props) {
  const { navigation, route } = props;
  const { email } = route?.params;
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  // =====================ResetPAssword user ======================
  const ResetPasswordUser = () => {
    const data = {
      email: email,
      password: password,
      password_confirmation: Confirmpassword,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.RESET_PASSWORD,
        formData
      )
      .then((response) => {
        utils.successAlert(response.data.message);
        navigation.navigate(SCREENS.Splash);
      })

      .catch((err) => {
        let errormsg = utils.showResponseError(err);
        utils.errorAlert(errormsg);
      });
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
            Reset Password
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
          >
            Enter Password
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
              Password
            </Text>
            <EditText
              placeholder="Enter password"
              password
              hasIcon
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              name="lock-open"
              type={FONTFAMILY.SimpleLineIcons}
            />
            <Text
              style={[
                FONTS.mediumFont14,
                { color: COLORS.primary1, marginVertical: SIZES.fifteen },
              ]}
            >
              Confirm Password
            </Text>
            <EditText
              placeholder="Confirm password"
              password
              value={Confirmpassword}
              onChangeText={(text) => {
                setConfirmpassword(text);
              }}
              hasIcon
              name="lock-open"
              type={FONTFAMILY.SimpleLineIcons}
            />
          </View>
        </View>

        {/* ======================== BUTTONS HERE ======================== */}
        <View style={{ marginTop: SIZES.fifteen * 3 }}>
          <ButtonRadius10
            label={"Continue"}
            style={{ marginTop: SIZES.fifteen }}
            onPress={() => ResetPasswordUser()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
