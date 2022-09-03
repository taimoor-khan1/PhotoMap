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
import { setUserType } from "../../redux/Silices/UserType";
import { useDispatch, useSelector } from "react-redux";
export default function LoginAccount(props) {
  const [selectedType, setSelectedType] = useState(0);

  const dispatcher = useDispatch();

  const setUser = (user) => {
    dispatcher(setUserType(user));
  };
  const USERTYPE = useSelector((state) => state.User.userType);

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
            Sign In With
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
        </View>

        {/* ======================== TEXTINPUTS HERE ======================== */}
        <Row
          style={{
            marginTop: SIZES.twentyFive * 1.5,
          }}
        >
          <View
            style={[
              styles.contView,
              {
                marginRight: SIZES.five,
                backgroundColor:
                  USERTYPE === CONSTANTS.PHOTO_GRAPHER
                    ? COLORS.primary1
                    : COLORS.transparent,
              },
            ]}
          >
            <MyTouchableOpacity
              onPress={() => setUser(CONSTANTS.PHOTO_GRAPHER)}
              style={styles.contImage}
            >
              <Image
                source={IMAGES.IconPhotography}
                resizeMode={"cover"}
                style={[
                  styles.image,
                  {
                    borderWidth: USERTYPE === CONSTANTS.PHOTO_GRAPHER ? 2 : 0,
                  },
                ]}
              />
            </MyTouchableOpacity>
            <Text
              style={[
                FONTS.mediumFont16,
                {
                  color:
                    USERTYPE === CONSTANTS.PHOTO_GRAPHER
                      ? COLORS.white
                      : COLORS.black,
                  marginVertical: SIZES.five,
                },
              ]}
            >
              Photographer
            </Text>
          </View>
          <View
            style={[
              styles.contView,
              {
                marginLeft: SIZES.five,
                backgroundColor:
                  USERTYPE === CONSTANTS.USER
                    ? COLORS.primary1
                    : COLORS.transparent,
              },
            ]}
          >
            <MyTouchableOpacity
              onPress={() => setUser(CONSTANTS.USER)}
              style={styles.contImage}
            >
              <Image
                source={IMAGES.IconUser}
                resizeMode={"cover"}
                style={[
                  styles.image,
                  {
                    borderWidth: USERTYPE === CONSTANTS.USER ? 2 : 0,
                  },
                ]}
              />
            </MyTouchableOpacity>
            <Text
              style={[
                FONTS.mediumFont16,
                {
                  color:
                    USERTYPE === CONSTANTS.USER ? COLORS.white : COLORS.black,
                  marginVertical: SIZES.five,
                },
              ]}
            >
              User
            </Text>
          </View>
        </Row>

        {/* ======================== BUTTONS HERE ======================== */}
        <View style={{ marginTop: SIZES.fifteen * 3 }}>
          <ButtonRadius10
            label={"Continue"}
            style={{ marginTop: SIZES.fifteen }}
            onPress={() => {
              if (USERTYPE === null) {
                // alert('Please Select Type ');
                return;
              }
              props.navigation.navigate(SCREENS.Login, { USERTYPE });
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    borderColor: COLORS.primary1,
    borderRadius: SIZES.twenty,
  },
  contImage: {
    height: SIZES.twentyFiveWidth * 7,
    width: "100%",
  },
  contView: {
    flex: 1,
    alignItems: "center",
    borderRadius: SIZES.twenty,
  },
});
